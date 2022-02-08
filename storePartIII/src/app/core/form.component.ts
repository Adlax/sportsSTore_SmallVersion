import { Component, Inject } from '@angular/core';
import { Product } from '../model/product.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { NgForm } from '@angular/forms';
import { Model } from '../model/repository.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "myForm",
  templateUrl: "form.component.html",
  styleUrls: ["form.component.css"],
})
export class FormComponent {

  editing: boolean = false;
  product: Product = new Product();
  originalProduct: Product = new Product();

  constructor(public model: Model, activatedRoute: ActivatedRoute, private router: Router){
    activatedRoute.params.subscribe( params => {
      this.editing = params['mode']=="edit";
      let id = params['id'];
      if(id != null){
        Object.assign(this.product,this.model.getProduct(id) || new Product());
        Object.assign(this.originalProduct,this.product);
      }
    } );
  }

  submitForm(form: NgForm){
    if(form.valid){
      this.model.saveProduct(this.product);
      this.originalProduct = this.product;
      this.router.navigateByUrl('/');
    }
  }

  // resetForm() {
  //   this.product = new Product();
  // }

}
