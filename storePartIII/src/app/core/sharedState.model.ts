import { InjectionToken } from '@angular/core';

export const SHARED_STATE = new InjectionToken('shared_state');

export enum MODES {
  CREATE, EDIT
}

export class SharedState {

  // mode: MODES = MODES.EDIT;
  // id: number | undefined;

  constructor(public mode: MODES, public id?: number){

  }

}
