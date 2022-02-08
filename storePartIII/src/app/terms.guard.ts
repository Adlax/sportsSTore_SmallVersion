import { Injectable } from '@angular/core';
import { MessageService } from './message/message.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Message } from './message/message.model';

@Injectable()
export class TermsGuard {

  constructor(public messageService: MessageService, public router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if(route.params['mode']=='create'){
      return new Promise<boolean>((resolve)=>{
        let responses: [string, ()=>void][] = [['Yes',()=>resolve(true)],['No',()=>resolve(false)]];
        this.messageService.reportMessage(new Message('Do you accept terms and conditions?', false, responses));
      });
    } else {
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if(route.url.length > 0 && route.url[route.url.length-1].path=='categories'){
      return new Promise<boolean>((resolve,reject)=>{
        let responses: [string, (string)=>void][] = [['Yes',()=>resolve(true)],['Nop',()=>resolve(false)]];
        this.messageService.reportMessage(new Message('Do you want to see the categories counter component ?', false, responses));
      });
    } else {
      return true;
    }
  }

}
