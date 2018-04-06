import { ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Pool, TimersService } from '../timers.service';

@Component({
  selector: 'pt-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() pool: Pool;
  formattedDuration: string;
  price: number;

  @HostBinding('class.started') get isStarted(): boolean { return !!this.pool.startAt; }
  @HostBinding('class.paused') get isPaused(): boolean {
    return !!this.getWholeDuration() && !this.pool.startAt;
  }

  constructor(private timersService: TimersService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    setInterval(() => this.updateTimer(), 250);
  }

  updateTimer(): void {
    this.updateFormattedDuration();
    this.updatePrice();
  }

  updateFormattedDuration(): void {
    const wholeTime = this.getWholeDuration();
    if (!wholeTime) {
      this.formattedDuration = '';
    } else {
      const seconds = Math.floor(wholeTime / 1000) % 60;
      const minutes = Math.floor(wholeTime / 60000) % 60;
      const hours = Math.floor(wholeTime / 3600000) % 60;
      if (hours) {
        this.formattedDuration = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes) {
        this.formattedDuration = `${minutes}m ${seconds}s`;
      } else {
        this.formattedDuration = `${seconds}s`;
      }
    }
  }

  updatePrice(): void {
    const wholeTime = this.getWholeDuration();
    this.price = wholeTime ? wholeTime / 3600000 * this.pool.hourRate : 0;
  }

  startTimer(): void {
    this.pool.startAt = new Date().getTime();
    this.timersService.savePoolTime(this.pool);
  }

  pauseTimer(): void {
    this.pool.cumulateTime = this.getWholeDuration();
    this.pool.startAt = 0;
    this.timersService.savePoolTime(this.pool);
  }

  resetTimer(): void {
    if (!this.pool.startAt) {
      this.pool.cumulateTime = 0;
      this.pool.startAt = 0;
      this.timersService.savePoolTime(this.pool);
    }
  }

  private getWholeDuration (): number {
    const previouslyCumulated = this.pool.cumulateTime || 0;
    const currentlyStartAt = this.pool.startAt || 0;
    const newPortion = currentlyStartAt ? new Date().getTime() - currentlyStartAt : 0;
    return previouslyCumulated + newPortion;
  }

}
