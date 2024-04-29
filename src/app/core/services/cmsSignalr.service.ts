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
        console.log('signalR Connection started');
        this.connected = true;
        //if (onActionConnected)
        // onActionConnected;
      })
      .catch(err => console.log('Error while signalR starting connection: ' + err));

  }
  public login(token: string) {
    this.hubConnection.invoke("login", token)
  }
  public logout() {
    this.hubConnection.invoke("logout")
  }

  public addListenerMessage = (xFunc: any) => {
    this.hubConnection.on('ActionSendMessageToClient', (notification: CmsNotificationModel) => {
      notification.title = notification.title + " " + new Date().toLocaleTimeString();
      switch (notification.icon) {
        case 'info':
          this.toastr.info(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
        case 'warning':
          this.toastr.warning(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
        case 'success':
          this.toastr.success(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
        case 'show':
          this.toastr.show(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
        case 'error':
          this.toastr.error(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
        default:
          this.toastr.info(notification.content, notification.title, { positionClass: 'toast-top-center', timeOut: 0 });
          break;
      }
      // web-push generate-vapid-keys --json
      //{"publicKey":"BKxkwx4CTSU2psDIs5LDX08P7hEwsbgDZa2hjJqLjUj_gmjg0cOD1vSkqMtBfBZ52RvFXl1R55FIVrj5eUMbx1Q","privateKey":"El0I7GEeskNmXn5qrPppzz80_LCEF0zkcCt76_R_SEo"}
      if (notification.contentJson?.length > 0) {
        try {
          var actionConfig = JSON.parse(notification.contentJson);
          if (actionConfig && actionConfig.action?.length > 0) {
            if (actionConfig.action == 'UpadteOnlineList') {

            }
          }
        }
        catch {

        }
      }

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
