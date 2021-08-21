import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScoreService } from '../score.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef<HTMLInputElement>;

  constructor(
    private score: ScoreService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
  }
  
  attemptPlayerAdd(): void {
    const success = this.score.addPlayer(this.inputElement.nativeElement.value);
    if (success) {
      this.inputElement.nativeElement.value = ``;
    } else {
      this.toast.sendToast(`Name must not be blank`);
    }
  }

}
