import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { REST_URL, RestDataSourceService } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class Model {

  private products: Product[] = new Array<Product>();
  private locator = (prod: Product, id: number) => prod.id==id;

  constructor(private restDataSourceService: RestDataSourceService){
    this.restDataSourceService.getData().subscribe( data => this.products = data);
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find( prod => prod.id==id);
  }

  saveProduct(prod: Product) {
    if(prod.id==0 || prod.id==null){
      this.restDataSourceService.saveProduct(prod).subscribe( p => this.products.push(p));
    } else {
      this.restDataSourceService.updateProduct(prod)
        .subscribe( p => {
          let index = this.products.findIndex( item => this.locator(item,p.id) );
        this.products.splice(index,1,p);
      } );
    }
  }

  deleteProduct(id: number) {
    this.restDataSourceService.deleteProduct(id).subscribe( p => {
      let index: number | undefined = this.products.findIndex( item => this.locator(item,id) );
      if(index > -1){
        this.products.splice(index,1);
      }
    } );
  }

  getNextProductId(id: number): number {
    let index = this.products.findIndex( p => this.locator(p,id) );
    if(index > -1) {
      return this.products[index+2<this.products.length ? index+1 : 0].id;
    } else {
      return id || 0;
    }
  }

  getPreviousProductId(id: number): number {
    let index = this.products.findIndex( p => this.locator(p,id) );
    if(index > -1) {
      return this.products[index>0 ? index-1 : this.products.length-1].id;
    } else {
      return id || 0;
    }
  }

}
