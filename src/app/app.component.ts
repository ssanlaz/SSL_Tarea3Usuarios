import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBARComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBARComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SSL_Tarea3Usuarios';
}
