import { Component } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer, ChangeDetectorRef } from '@angular/core';
import { Model } from '../model/repository.model';

@Component({
  selector: 'myCategoryCount',
  templateUrl: 'categoryCount.component.html'
})
export class CategoryCountComponent {

  count: number = 0;
  differ: KeyValueDiffer<any,any>;

  constructor(private model: Model, private keyValueDiffers: KeyValueDiffers){

  }

  ngOnInit() {
    this.differ = this.keyValueDiffers
                      .find(this.model.getProducts())
                      .create();
  }

  updateCount() {
    this.count = this.model.getProducts()
                 .map( p => p.category )
                 .filter( (cat,index,array) => array.indexOf(cat)==index )
                 .length;
  }

  ngDoCheck() {
    if(this.differ.diff(this.model.getProducts()) != null) {
      this.updateCount();
    }
  }

}
