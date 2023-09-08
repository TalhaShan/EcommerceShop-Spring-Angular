import { Component } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent {
salesPersonList:SalesPerson[]=[
new SalesPerson("talha","farriah","fartalh@gmail.com",100),
new SalesPerson("porche","bmw","bmw@gmail.com",100),
new SalesPerson("talha","audi","audi@gmail.com",100)
];
}
