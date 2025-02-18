import { Component, inject } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioCardComponent } from "../../components/usuario-card/usuario-card.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [UsuarioCardComponent,NgxPaginationModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {


  misUsuarios : Usuario[];
 UsuarioSer = inject(UsuariosService);

 // Variables para la paginación
 page: number = 1; // Página actual
 pageSize: number = 3; // Usuarios por página

 constructor(){
  this.misUsuarios = [];
 }

//metodo para sacar todos los usarios , llamando al service
 ngOnInit(): void{
  this.UsuarioSer.getAll().subscribe((data : Usuario[]) => {
    this.misUsuarios = data;
  })
 }
}
