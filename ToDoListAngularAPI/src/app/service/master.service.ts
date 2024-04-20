import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl:string='https://localhost:7027';
  constructor(private http: HttpClient) { 
  }
  getAllTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl+'/api/ToDo');
  }

  addToDo(newToDoId: ToDo): Observable<ToDo>{
    newToDoId.id = "0";
    return this.http.post<ToDo>(this.apiUrl + '/api/ToDo',newToDoId);
  }
  
  updateToDo(id: string, todo:ToDo): Observable<ToDo>{
    return this.http.put<ToDo>(this.apiUrl+'/api/ToDo/' +id, todo);
  }

  deleteToDo(id:string): Observable<ToDo>{
    return this.http.delete<ToDo>(this.apiUrl+'/api/ToDo/' +id);
  }
}
