import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class UsuariosService {
  
  //Llamada a la api 
  private Apiurl : string = 'https://peticiones.online/api/users';
  //Inyectamos el HttpClient
  httpClient = inject(HttpClient);

  constructor() {

   }

   //Metodo para sacar todos los usuarios de la API
  
    getAll(): Observable<Usuario[]> {
      return this.httpClient.get<{ results: Usuario[] }>(this.Apiurl).pipe(
        map(response => response.results) // Extraemos solo la propiedad "results"
      );
    }

   //Metodo para buscar por id, usando observables
    getById(_id : string): Observable<Usuario>{
       return this.httpClient.get<Usuario>((`${this.Apiurl}/${_id}`));
    }
    
    //metodo para insertar , usando observables
  
    insert (usuario : Usuario) : Observable<Usuario>{
     return this.httpClient.post<Usuario>(this.Apiurl,usuario);
    }

   //metodo para modificar
    update (usuario : Usuario) : Observable<Usuario>{
      return this.httpClient.put<Usuario>(this.Apiurl + "/" + usuario._id,usuario);
    }

    //metodo para eliminar uno por su id, usando observables
    delete(_id: string) : Observable<Usuario>{
       
      return this.httpClient.delete<Usuario>(`${this.Apiurl}/${_id}`);
    }
  }

