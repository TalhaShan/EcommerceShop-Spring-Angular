import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  // private orderUrl ='http://localhost:8080/api/orders';

  private orderUrl = environment.backendBaseUrl + '/orders';
  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {

    const orderHistoryData = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryData);
  }


}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}
