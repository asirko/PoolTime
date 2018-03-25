import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { Pool, TimersService } from './timers.service';

@Component({
  selector: 'pt-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.scss']
})
export class TimersComponent implements OnInit, AfterViewInit {

  pools: Pool[];

  constructor(private timersService: TimersService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.pools = this.timersService.getPools();
  }

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;
    const base = Math.floor(Math.sqrt(this.pools.length + 1));
    const nbColumns = base * base >= this.pools.length + 1 ? base : base + 1;
    const nbRows = nbColumns * base >= this.pools.length + 1 ? base : base + 1;
    host.style['grid-template-columns'] = `repeat(${nbColumns}, 1fr)`;
    host.style['grid-template-rows'] = `repeat(${nbRows}, 1fr)`;
  }
}
