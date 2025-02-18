import { Component, inject } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { BotonesComponent } from "../../components/botones/botones.component";

@Component({
  selector: 'app-usuarios-view',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './usuarios-view.component.html',
  styleUrl: './usuarios-view.component.css'
})
export class UsuariosViewComponent {

  miUsuario !: Usuario;

  UsuarioSer = inject(UsuariosService);
 
  activatedRoute = inject(ActivatedRoute)
  

  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let _id: string = params['_id'];  // Obtiene el ID de la URL

      if (_id) {
        this.UsuarioSer.getById(_id).subscribe(
          (usuario) => {
            this.miUsuario = usuario;
            console.log('Usuario cargado:', this.miUsuario); // Verifica que se recibe el usuario
          },
          (error) => {
            console.error('Error al cargar usuario:', error);
          }
        );
      }
    });
}
}