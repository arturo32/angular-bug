import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestOneComponent} from "./components/test-one/test-one.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestOneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test234';
}
