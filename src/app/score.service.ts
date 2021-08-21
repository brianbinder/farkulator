import { Injectable } from '@angular/core';
import { Player, Move } from '../interfaces';
import { ToastService } from './toast.service';

const cacheId = `current-farkle-game`;
const scoreTarget = 25_000;
function nTimes(n: number, callback): void {
  [...Array(n).keys()].forEach(() => callback());
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  // User must enter names and click 'start game'

  gameHasStarted = false;
  activePlayer: Player;
  history: number[] = [];
  runningScore = 0;
  players: Player[] = [];

  moves: Move[] = [];

  get noPlayerHasScored(): boolean {
    return this.players.reduce((total, player) => total + player.score, 0) === 0;
  }

  constructor(
    private toast: ToastService,
  ) {
    this.addToRunning = this.thenSave(this.addToRunning);
    this.bank = this.thenSave(this.bank);
    this.farkle = this.thenSave(this.farkle);
    this.resetRunningTotal = this.thenSave(this.resetRunningTotal);
    this.undo = this.undo.bind(this);
    this.initializeScore();
  }

  initializeScore(): void {
    const currentGame = localStorage.getItem(cacheId);
    if (currentGame) {
      try {
        const game = JSON.parse(currentGame);
        this.gameHasStarted = game.gameHasStarted;
        this.players = game.players;
        this.moves = game.moves;
        this.runningScore = game.runningScore;
        this.history = game.history;
        this.activePlayer = this.players.find(p => p.name === game.activePlayer);
      } catch (err) {
        this.startNewGame();
      }
    } else {
      this.startNewGame();
    }
  }

  startNewGame(alreadyConfirmed = true): void {
    if (alreadyConfirmed || confirm(`Are you sure you want to quite the current game?\nDoing so is irreversible!`)) {
      this.gameHasStarted = false;
      this.activePlayer = null;
      this.history = [];
      this.runningScore = 0;
      this.players = [];
      this.moves = [];
    }
  }

  thenSave(callback) {
    return (...args) => {
      callback.call(this, ...args);
      this.save();
    };
  }
  
  save(): void {
    const game = {
      gameHasStarted: this.gameHasStarted,
      activePlayer: this.activePlayer.name,
      history: this.history,
      runningScore: this.runningScore,
      players: this.players,
      moves: this.moves,
    }
    localStorage.setItem(cacheId, JSON.stringify(game));
  }

  start(): void {
    this.gameHasStarted = true;
    this.activePlayer = this.players[0];
    this.moves.push({ action: `start-game` });
  }

  addPlayer(name = ''): boolean {
    if (!Array.isArray(this.players)) {
      this.players = [];
    }
    name = name.trim();
    if (name) {
      if (this.players.filter(p => p.name === name).length === 0) {
        this.players.push({ name, score: 0 });
        this.moves.push({ action: `add-player`, player: name });
        return true;
      } else {
        this.toast.sendToast(`Player name must be unique`);
        return false;
      }
    }
    return false;
  }

  addToRunning(score: number): void {
    this.history.push(score);
    this.runningScore += score;
    this.moves.push({ action: `add-roll`, score });
  }

  bank(): void {
    this.activePlayer.score += this.runningScore;
    if (this.activePlayer.score >= scoreTarget) {
      nTimes(5, () => this.toast.sendToast(`${this.activePlayer.name} is over ${scoreTarget}!`));
    }
    this.moves.push({ action: `add-score`, player: this.activePlayer.name, score: this.runningScore, history: this.history });
    this.nextPlayer();
  }

  farkle(): void {
    this.moves.push({ action: `farkle`, history: this.history, score: this.runningScore, player: this.activePlayer.name })
    this.history = [];
    this.runningScore = 0;
    this.nextPlayer();
  }

  nextPlayer(): void {
    let nextIndex = this.players.indexOf(this.activePlayer) + 1;
    if (nextIndex >= this.players.length) {
      nextIndex = 0;
    }
    this.activePlayer = this.players[nextIndex];
  }

  resetRunningTotal(): void {
    this.moves.push({ action: `reset-total`, history: this.history, score: this.runningScore });
    this.history = [];
    this.runningScore = 0;
  }


  undo(): void {
    const move = this.moves.pop();
    if (!move) {
      return;
    }
    if (move.action === `add-player`) {
      this.players = this.players.filter(p => p.name !== move.player);
      this.toast.sendToast(`Removed player ${move.player}`);
    } else if (move.action === `add-roll`) {
      if (this.history.slice(-1)[0] === move.score) {
        this.history.pop();
        this.runningScore -= move.score;
        this.toast.sendToast(`Removed score ${move.score}`);
      }
    } else if (move.action === `add-score`) {
      const player = this.players.find(p => p.name === move.player);
      player.score -= move.score;
      this.activePlayer = player;
      this.history = move.history;
      this.runningScore = this.history.reduce((total, roll) => total + roll, 0);
      this.toast.sendToast(`Removed ${move.score} from ${move.player}`);
    } else if (move.action === `farkle`) {
      this.runningScore = move.score;
      this.history = move.history;
      this.activePlayer = this.players.find(p => p.name === move.player);
      this.toast.sendToast(`Unfarkled ${move.player}`);
    } else if (move.action === `start-game`) {
      this.gameHasStarted = false;
      this.toast.sendToast(`Resuming "create player" mode`);
    } else if (move.action === `reset-total`) {
      this.history = move.history;
      this.runningScore = move.score;
      this.toast.sendToast(`Restored running total`);
    }
  }
}
