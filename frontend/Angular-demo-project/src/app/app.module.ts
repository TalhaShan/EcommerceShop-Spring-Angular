import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes ,RouterModule} from '@angular/router';
//specific to genric path always the first mathc wins or return
const routes:Routes= [
{path: 'category/:id',component:ProductListComponent},
{path: 'category',component:ProductListComponent},
{path: 'products',component:ProductListComponent},
{path: '',redirectTo:'/products',pathMatch:'full'},
{path: '**',redirectTo:'/products',pathMatch:'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
