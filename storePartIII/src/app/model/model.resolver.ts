import { Injectable } from '@angular/core';
import { Model } from './repository.model';
import { RestDataSourceService } from './rest.datasource';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message.model';

@Injectable()
export class ModelResolver {

  constructor(private model: Model, private dataSource: RestDataSourceService, private messageService: MessageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>{
    if(this.model.getProducts().length==0){
      this.messageService.reportMessage(new Message('Waiting for data from the back end...',false));
      return this.dataSource.getData();
    } else {
      return null;
    }
  }

}
