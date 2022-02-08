import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from './message/message.service';
import { Message } from './message/message.model';

@Injectable()
export class LoadGuard {

  loaded: boolean = false;

  constructor(private messageService: MessageService, private router: Router){
  }

  canLoad(route: Route): Promise<boolean> | boolean {
    return this.loaded || new Promise<boolean>((resolve,reject)=>{
      let responses: [string,(string)=>void][] = [
        [
          'yes',()=>{
                    this.loaded = true;
                    resolve(true);
                    }
        ],
        [
          'No', ()=>{
                    this.router.navigateByUrl(this.router.url);
                    resolve(false);
                    }
        ]
      ];
      this.messageService.reportMessage(new Message('Load the module?',false,responses));
    });
  }

}
