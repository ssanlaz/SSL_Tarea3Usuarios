import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-alta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios-alta.component.html',
  styleUrl: './usuarios-alta.component.css'
})
export class UsuariosAltaComponent {

//Para saber si es insertar o actualizar
metodo : string = "Insertar";

// Para el formulario tipo reactive con validaciones
usuarioForm : FormGroup;
//Inyectamos los servicios y los router 
usuarioSer = inject(UsuariosService);
ActivatedRoute = inject(ActivatedRoute);
router = inject(Router);

constructor(){
 this.usuarioForm = new FormGroup({

  first_name: new FormControl(null,[Validators.required,Validators.minLength(3)]),   
  last_name: new FormControl(null,[Validators.required,Validators.minLength(3)]) ,
  email: new FormControl(null,[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
  username: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  password: new FormControl(null,[Validators.required,Validators.minLength(5)]),
  image: new FormControl(null,[Validators.required,Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/)]),
},[]);

}


ngOnInit(): void {
  this.ActivatedRoute.params.subscribe((params: any) => {
    if (params._id) {
      this.metodo = "Actualizar";

      // Hacemos la petición al servicio y nos suscribimos al observable
  this.usuarioSer.getById(params._id).subscribe((response : Usuario) => {
   console.log(response);

   this.usuarioForm =new  FormGroup({
     _id: new FormControl(response._id,[]),
    first_name : new FormControl(response.first_name,[Validators.minLength(3)]),
    last_name : new FormControl(response.last_name,[Validators.minLength(3)]),
    email:  new FormControl(response.email,[Validators.required]),
    username:  new FormControl(response.username,[Validators.minLength(3)]),
    password: new FormControl(response.password,[Validators.minLength(5)]),
    image: new FormControl(response.image,[Validators.required]),
        },[]);
        this.usuarioForm.markAllAsTouched();
       });
     }
   });
 }



checkControl(FormControlName : string, validator : string): boolean | undefined{
  return this.usuarioForm.get(FormControlName)?.hasError(validator) && this.usuarioForm.get(FormControlName)?.touched
}

//metodo para enviar el formulario de alta o de actualizacion del usuario
  onSubmit() {
    
      if (this.usuarioForm.valid) {
        const usuario: Usuario = this.usuarioForm.value;
    
        if (this.metodo === "Actualizar") {
          // Actualizar usuario existente
          this.usuarioSer.update(usuario).subscribe(
            () => {
              Swal.fire({
                title: "¡Usuario actualizado!",
                text: "El usuario se ha actualizado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
              }).then(() => {
                this.router.navigate(['/home']); // Redirigir al home después de aceptar la alerta
              });
            },
            (error) => {
              console.error("Error al actualizar el usuario:", error);
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el usuario.",
                icon: "error",
                confirmButtonText: "Aceptar"
              });
            }
          );
        } else {
          // Insertar nuevo usuario
          this.usuarioSer.insert(usuario).subscribe(
            () => {
              Swal.fire({
                title: "¡Usuario creado!",
                text: "El usuario se ha registrado correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar"
              }).then(() => {
                this.router.navigate(['/home']); // Redirigir al home después de aceptar la alerta
              });
            },
            (error) => {
              console.error("Error al crear el usuario:", error);
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al registrar el usuario.",
                icon: "error",
                confirmButtonText: "Aceptar"
                 });
                });
               }
              } 
             }
           }


