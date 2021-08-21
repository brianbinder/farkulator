import { Component, OnInit, HostBinding } from '@angular/core';

import { ScoreService } from '../score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @HostBinding(`class.adding-players`) addingPlayers(): boolean {
    return !this.score.gameHasStarted;
  }
  
  constructor(
    public score: ScoreService,
  ) { }

  ngOnInit() {
    // this.addTestPlayers();
  }

  addTestPlayers(): void {
    [
      `Jerry`,
      `Jimmy`,
      `Johnny`,
    ].forEach(this.score.addPlayer.bind(this.score));
  }

  undo(): void {
    this.score.undo();
  }

}
