import { Component, Inject } from '@angular/core';
import { Model } from '../model/repository.model';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'myTable',
  templateUrl: 'table.component.html'
})
export class TableComponent {

  category: string = null;

  constructor(public model: Model, private activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe( params => {
      this.category = params['category'] || null;
    } );
  }

  getProducts(): Product[] {
    return this.model.getProducts()
           .filter( prod => this.category==null || prod.category==this.category );
  }

  get categories(): string[] {
    return this.model.getProducts()
            .map( p => p.category )
            .filter( (cat,index,array) => array.indexOf(cat)==index );
    // let valToReturn =  this.model.getProducts();
    // console.log( JSON.stringify(valToReturn));
    //
    // let valToReturn2 = valToReturn.map( p => p.category );
    // console.log( JSON.stringify(valToReturn2));
    //
    // let valToReturn3 = valToReturn2.filter( (cat,index,array) => array.indexOf(cat)==index );
    // console.log( JSON.stringify(valToReturn3));
    //
    // return valToReturn;

  }

  getProduct(id: number): Product | undefined {
    return this.model.getProduct(id);
  }

  deleteProduct(id: number | undefined) {
    this.model.deleteProduct(id);
  }

}
