import { Component, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {

//Inyectamos el service y el router para que funcionen las rutas
  usuarioSer = inject(UsuariosService);
  router = inject(Router);
 
// Hacemos un input del padre al componenete hijo 
@Input() _id !: string;
@Input() parent !: string;
@Input() miUsuario !: Usuario;

constructor(){

  this._id = "";
  this.parent= "";
}

//Metodo borrar usuario , usando sweet alert para los mensajes de alerta

  borrarUsuario(_id: string) {
    console.log("Intentando eliminar usuario con ID:", _id);
    console.log("Usuario actual:", this.miUsuario);

    Swal.fire({
      title: `¿Deseas borrar al usuario ${this.miUsuario.first_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioSer.delete(_id).subscribe(
          () => { // Si la API devuelve una respuesta vacía o sin error, asumimos éxito
            Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente', 'success').then(() => {
              this.router.navigate(['/home']); // Redirigir al listado
            });
          },
          (error) => { // Manejo de error en caso de fallo
            console.error('Error al eliminar usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error').then(() => {
              this.router.navigate(['/usuario',_id]);
            });
          }
        );
      }
    });
  }
  
  
  }

