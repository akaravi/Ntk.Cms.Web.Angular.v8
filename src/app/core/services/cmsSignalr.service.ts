import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { CmsNotificationModel, ErrorExceptionResultBase } from 'ntk-cms-api';
import { environment } from 'src/environments/environment';

// import {Notification} from '../models/notification';
//karavi import { ProductService } from './product.service';
//https://medium.com/@aym003.hit/notifications-system-in-net-6-and-angular-with-signalr-
//https://github.com/aym003/NotificationHubPartOne

@Injectable({
  providedIn: 'root'
})
export class CmsSignalrService {
  constructor(private toastr: ToastrService,
  ) {
    // {
    //   // timeOut: 0,
    //   timeOut: 5000,
    //   enableHtml: true,
    //   positionClass: 'toast-bottom-right',
    //   // positionClass: "toast-bottom-full-width",
    //   preventDuplicates: true,
    //   closeButton: true,
    //   // extendedTimeOut: 0,
    //   extendedTimeOut: 1000,
    // }
  }
  public connected = false;
  private hubConnection!: signalR.HubConnection;
  public startConnection(onActionConnected: any): void {
    const token = localStorage.getItem('userToken');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.cmsServerConfig.configHubServerPath + 'notify', {
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
        if (onActionConnected)
          onActionConnected;
      })
      .catch(err => console.log('Error while starting connection: ' + err));

  }
  public login(token: string) {
    this.hubConnection.invoke("login", token)
  }
  public logout() {
    this.hubConnection.invoke("logout")
  }

  public addListenerMessage = (xFunc: any) => {
    this.hubConnection.on('ActionSendMessageToClient', (notification: CmsNotificationModel) => {
      this.toastr.info(notification.title, notification.content, { positionClass: 'toast-top-center', timeOut: 0 });
      if (!xFunc)
        xFunc;
    });
  }
  public addListenerActionLogin = () => {
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
