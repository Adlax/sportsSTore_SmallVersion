import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MessageService } from '../message/message.service';
import { FormComponent } from './form.component';
import { Subject, Observable } from 'rxjs';
import { Message } from '../message/message.model';

@Injectable()
export class UnsavedGuard {

  constructor(private messageService: MessageService, private router: Router){

  }

  canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, formComponent: FormComponent): Observable<boolean> | boolean {
    if(formComponent.editing) {
      if(['name','category','price'].some(prop=>formComponent.product[prop]!=formComponent.originalProduct[prop])) {
        let subject = new Subject<boolean>();
        let responses: [string,(string)=>void][] = [
          ['Yes', ()=>{subject.next(true);subject.complete();}],
          ['No', ()=>{this.router.navigateByUrl(this.router.url);subject.next(false);subject.complete();}]
        ];
        this.messageService.reportMessage(new Message('Changes were saved?', true, responses));
        return subject;
      }
    }
    return true;
  }

}
