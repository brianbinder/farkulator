import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-scorer',
  templateUrl: './scorer.component.html',
  styleUrls: ['./scorer.component.scss']
})
export class ScorerComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef<HTMLInputElement>;

  constructor(
    public score: ScoreService,
  ) { }

  ngOnInit() {
  }

  addToScore(): void {
    const score = +this.inputElement.nativeElement.value;
    if (score) {
      this.score.addToRunning(score);
    }
    this.resetRunning();
  }
  
  reset(): void {
    this.score.resetRunningTotal();
    this.resetRunning();
  }
  
  resetRunning(): void {
    this.inputElement.nativeElement.value = '';    
  }

}
