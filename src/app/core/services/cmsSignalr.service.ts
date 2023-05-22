import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { CmsNotificationModel } from '../models/cmsNotificationModel';
// import {Notification} from '../models/notification';
//karavi import { ProductService } from './product.service';
//https://medium.com/@aym003.hit/notifications-system-in-net-6-and-angular-with-signalr-b58858523c84
@Injectable({
  providedIn: 'root'
})
export class CmsSignalrService {


  private hubConnection!: signalR.HubConnection;

  constructor(private toastr: ToastrService,
    //karavi public productService: ProductService
  ) {

  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7132/Notify', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addProductListner = () => {
    this.hubConnection.on('SendMessage', (notification: CmsNotificationModel) => {
      this.showNotification(notification);
      //karavi  this.productService.get();
    });
  }

  showNotification(notification: CmsNotificationModel) {
    this.toastr.warning(notification.message, notification.productID + " " + notification.productName);
  }
}
