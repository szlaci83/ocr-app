import { Component } from '@angular/core';

export const LOCALHOST = '0.0.0.0';
export const HOST = 'laszlo-codes.com'
export const SERVERHOST = '35.178.142.206';
export const H = LOCALHOST;
export const PORT = '4567';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  host = HOST;
  port = PORT;
}
