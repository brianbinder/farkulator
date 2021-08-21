import { Component, Input, HostBinding } from '@angular/core';
import { Player } from '../../interfaces';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() player: Player;
  @HostBinding(`class.active`) get active(): boolean {
    return this.score.activePlayer === this.player;
  }
  @HostBinding(`class.over-25k`) get over25k(): boolean {
    return this.player.score >= 25_000;
  }

  constructor(
    private score: ScoreService,
  ) { }

  // addToScore(): void {
  //   this.score.addToPlayer(this.player);
  // }

}
