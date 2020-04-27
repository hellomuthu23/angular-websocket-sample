import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  private _connectedSubject = new BehaviorSubject<boolean>(false);
  private _socketClient;

  constructor() {
    this.initializeConnection();
  }

  connected$(): Observable<boolean> {
    return this._connectedSubject.asObservable();
  }

  initializeConnection() {
    console.log('Init connection');
    this._socketClient = io(environment.websocketTestServer, {
      autoConnect: false,
    });

    this._socketClient.on('connect', (sock) => {
      console.log('connected');
      this._connectedSubject.next(true);
    });

    this._socketClient.on('connect_error', (error) => {
      console.error(error);
      this._connectedSubject.next(false);
    });

    this._socketClient.on('disconnect', (reason: string) => {
      console.log(reason);
      this._connectedSubject.next(false);
    });
  }

  connect(): void {
    this._socketClient.open();
  }

  listenOn(eventType: string, callback: any): void {
    this._socketClient.on(eventType, (data: any) => {
      callback(data);
    });
  }

  emit(eventType: string, data?: string): void {
    console.log(`Emitting on: ${eventType}, data: ${data}`);
    this._socketClient.emit(eventType, data);
  }
}
