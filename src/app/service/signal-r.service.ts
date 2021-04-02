import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: any;

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/chart')
    .build();
    
    this.hubConnection
    .start()
    .then(() => console.log('Connected...'))
    .catch((err: any) => console.log('Found connection issue ' + err))
  }
}
