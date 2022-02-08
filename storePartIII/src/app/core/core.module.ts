import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { FormComponent } from './form.component';
import { TableComponent } from './table.component';
import { Subject } from 'rxjs';
import { FormatStatePipe } from './state.pipe';
import { MessageModule } from '../message/message.module';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';
import { Model } from '../model/repository.model';
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './productCount.component';
import { CategoryCountComponent } from './categoryCount.component';
import { NotFoundComponent } from './notFound.component';
import { UnsavedGuard } from './unsaved.guard';

@NgModule({
    imports: [BrowserModule, FormsModule, ModelModule, MessageModule, RouterModule],
    declarations: [TableComponent, FormComponent, FormatStatePipe, ProductCountComponent, CategoryCountComponent, NotFoundComponent],
    exports: [ModelModule, TableComponent, FormComponent],
    providers: [UnsavedGuard],
})
export class CoreModule {

}
