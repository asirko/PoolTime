import { Injectable } from '@angular/core';

export class Param {
  type: string;
  number: number;
  hourRate: number;
}

@Injectable()
export class ParamsService {

  constructor() { }

  getParams(): Param[] {
    const paramsStr = localStorage.getItem('params');
    return paramsStr ? JSON.parse(paramsStr) : [];
  }

  setParams(params: Param[]): void {
    // todo delete value that does not exist any more
    localStorage.setItem('params', JSON.stringify(params));
  }

}
