import { NgModule } from '@angular/core';
import { MessageService } from './message.service';
import { MessageComponent } from './message.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, RouterModule],
  declarations: [MessageComponent],
  providers: [MessageService],
  exports: [MessageComponent]
})
export class MessageModule {

}
