import { Component } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'myMessage',
  templateUrl: 'message.component.html'
})
export class MessageComponent {

  lastMessage: Message;

  constructor(messageService: MessageService, private router: Router){
    messageService.messages.subscribe( msg => this.lastMessage = msg);
    router.events
    .pipe(filter(evt=>evt instanceof NavigationEnd || evt instanceof NavigationCancel))
    .subscribe(evt=>this.lastMessage=null);
  }

}
