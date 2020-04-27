import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketClientService } from './services/socket-client.service';
import { SocketSampleComponent } from './socket-sample/socket-sample.component';

@NgModule({
  declarations: [AppComponent, SocketSampleComponent],
  imports: [BrowserModule],
  providers: [SocketClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
