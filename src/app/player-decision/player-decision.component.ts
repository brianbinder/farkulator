import { Component } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-player-decision',
  templateUrl: './player-decision.component.html',
  styleUrls: ['./player-decision.component.scss']
})
export class PlayerDecisionComponent {

  constructor(
    public score: ScoreService,
  ) { }

}
