import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { ErrorExceptionResultBase } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';
import { CmsNotificationModel } from '../models/cmsNotificationModel';
// import {Notification} from '../models/notification';
//karavi import { ProductService } from './product.service';
//https://medium.com/@aym003.hit/notifications-system-in-net-6-and-angular-with-signalr-
//https://github.com/aym003/NotificationHubPartOne




@Injectable({
  providedIn: 'root'
})
export class CmsSignalrService {
  private hubConnection!: signalR.HubConnection;
  constructor(private toastr: ToastrService,
    //karavi public productService: ProductService
  ) {

  }
  public connected = false;

  public startConnection(onConnected: any): void {
    const token = localStorage.getItem('userToken');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.cmsServerConfig.configHubServerPath + 'notify', {
        headers: {
          "Authorization2": token
        },
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connected = true;
        if (onConnected)
          onConnected;
      })
      .catch(err => console.log('Error while starting connection: ' + err));

  }
  public login(token: string) {
    this.hubConnection.invoke("login", token)
  }
  public addListenerMessage = (xFunc: any) => {
    this.hubConnection.on('ActionSendMessageToClient', (notification: CmsNotificationModel) => {
      this.toastr.warning(notification.title, notification.body + " " + notification.sound);
      if (!xFunc)
        xFunc;
    });
  }
  public addListenerActionLogin = () => {
    //ErrorExceptionResult<CoreTokenMicroServiceViewModel>
    this.hubConnection.on('ActionLogin', (model: any) => {

      console.log('ActionLogin');
      console.log(model);
      this.toastr.warning("وارد شدید");
    });
  }
  public addListenerActionLogout = () => {
    this.hubConnection.on('ActionLogout', (model: ErrorExceptionResultBase) => {
      console.log('ActionLogout');
      console.log(model);

      this.toastr.warning("خارج شدید");

    });
  }

  public subscribeToProduct(productId: string) {
    this.hubConnection.invoke("SuscribeToProduct", productId)
  }
}
