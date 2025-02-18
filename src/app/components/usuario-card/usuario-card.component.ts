import { Component, inject, Input } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { BotonesComponent } from '../botones/botones.component';


@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {

 @Input() miUsuario !: Usuario;



}
