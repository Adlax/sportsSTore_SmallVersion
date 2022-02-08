import { Component } from '@angular/core';
import { Model } from '../model/repository.model';
import { KeyValueDiffers, KeyValueDiffer, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector:'myProductCount',
  templateUrl: 'productCount.component.html',
})
export class ProductCountComponent {

  count: number = 0;
  differ: KeyValueDiffer<any,any>;
  category: string;

  constructor(private model: Model, private keyValueDiffers: KeyValueDiffers, private changeDetectorRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute){
    activatedRoute.pathFromRoot
    .forEach( route => {
                  route.params.subscribe( params => {
                    if(params['category']!=null){
                      this.category = params['category'];
                      this.updateCount();
                    }
                  } );
    } );
  }

  ngOnInit() {
    this.differ = this.keyValueDiffers
                  .find(this.model.getProducts())
                  .create();
  }

  updateCount() {
    this.count = this.model.getProducts().filter( p => this.category==null || p.category==this.category ).length;
  }

  ngDoCheck() {
    if(this.differ.diff(this.model.getProducts()) != null){
      this.updateCount();
    }
  }

}
