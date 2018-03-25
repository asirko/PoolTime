import { Injectable } from '@angular/core';
import { Param, ParamsService } from '../params/params.service';

export class Pool {
  name: string;
  hourRate: number;
  startAt?: number;
  cumulateTime?: number;
}

@Injectable()
export class TimersService {

  constructor(private paramsService: ParamsService) { }

  getPools(): Pool[] {
    return this.paramsService
      .getParams()
      .map(p => this.getPoolsFromParam(p))
      .reduce((accu, current) => [...accu, ...current], []);
  }

  private getPoolsFromParam(param: Param): Pool[] {
    return Array.apply(null, Array(param.number))
      .map((useless, i) => param.number > 1 ? ' ' + (i + 1) : '')
      .map(strIndex => param.type + strIndex)
      .map(name => localStorage.getItem(name) || `{"name":"${name}"}`)
      .map(strPool => JSON.parse(strPool))
      .map(pool => Object.assign(pool, { hourRate: param.hourRate })); // should update hourRate any way!
  }

  savePoolTime(pool: Pool): void {
    localStorage.setItem(pool.name, JSON.stringify(pool));
  }

}
