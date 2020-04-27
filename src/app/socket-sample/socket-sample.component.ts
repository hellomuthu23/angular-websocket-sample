import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, share, shareReplay, tap } from 'rxjs/operators';

import { SocketClientService } from '../services/socket-client.service';

@Component({
  selector: 'app-socket-sample',
  templateUrl: './socket-sample.component.html',
  styleUrls: ['./socket-sample.component.scss'],
})
export class SocketSampleComponent implements OnInit {
  incomingMessage: string = '';
  socketConnected = false;

  pongMessage = '';

  constructor(private socketClientService: SocketClientService) {}

  ngOnInit(): void {
    this.socketClientService.connected$().subscribe((connected) => {
      console.log(connected);
      if (connected) {
        this.socketConnected = true;
        this.socketClientService.listenOn('pong-message', (data) => {
          console.log(data);
          this.pongMessage = data;
        });
        this.socketClientService.listenOn('live-message', (data) => {
          console.log(data);
          this.incomingMessage = data + '\n' + this.incomingMessage;
        });
      } else {
        connected = false;
      }
    });
  }

  connect(): void {
    this.socketClientService.connect();
  }

  ping(pingMessage: string): void {
    this.socketClientService.emit('ping-message', pingMessage);
  }

  private receiver(data: string) {
    console.log('data', data);
  }
}
