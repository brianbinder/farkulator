import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PlayerComponent } from './player/player.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScorerComponent } from './scorer/scorer.component';
import { DetectEnterDirective } from './detect-enter.directive';
import { PlayerDecisionComponent } from './player-decision/player-decision.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';
import { ScoreService } from './score.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    PlayerComponent,
    NewPlayerComponent,
    ScorerComponent,
    DetectEnterDirective,
    PlayerDecisionComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    ScoreService,
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
