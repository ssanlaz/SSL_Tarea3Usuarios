import { Routes } from '@angular/router';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuariosViewComponent } from './pages/usuarios-view/usuarios-view.component';
import { UsuariosAltaComponent } from './pages/usuarios-alta/usuarios-alta.component';
import { UsuarioCardComponent } from './components/usuario-card/usuario-card.component';

export const routes: Routes = [

    {path:'home',component: UsuariosListComponent},
    {path: 'usuario/:_id',component:UsuariosViewComponent},
    {path: 'nuevoUsuario',component: UsuariosAltaComponent},
    {path:'actualizar/usuario/:_id',component: UsuariosAltaComponent},
    {path:'**',redirectTo: "home"},
    {path:'',pathMatch:"full",redirectTo:"home"},
];
