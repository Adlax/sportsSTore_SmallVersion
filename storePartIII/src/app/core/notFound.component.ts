import { Component } from '@angular/core';

@Component({
  selector: 'myNotFound',
  template: `
    <h3 class="bg-danger text-white p-2">Sorry, somethin went wrong</h3>
    <button class="btn btn-primary" routerLink="/">Start over</button>
  `
})
export class NotFoundComponent {
  
}
