import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppToast } from './shared/components/app-toast/app-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppToast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('incident-web');
}
