import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Component, OnInit ,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDo } from './models/todo.model';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'ToDoListAngularAPI';
  todos: ToDo[] = [];
  newTodo: ToDo = {
    id:'',
    description:'',
    isCompleted:false
  };
  masterService = inject(MasterService);
 
  ngOnInit(): void {
    this.loadAllToDo();
  }

  loadAllToDo(){
    this.masterService.getAllTodos().subscribe({
      next: (todos) =>{
        this.todos=todos;
      }
      }
    )};

  addToDo(){
    this.masterService.addToDo(this.newTodo).subscribe(
      {next: (todo) =>{
        this.loadAllToDo();
      }}
    )
    this.newTodo.description ="";
 };

 onCompletedChange(id: string, todo: ToDo){
    todo.isCompleted= !todo.isCompleted;
    this.masterService.updateToDo(id, todo).subscribe({
      next: (response)=>{
        this.loadAllToDo();
      }
    })
 };

 deleteToDo(id:string){
  this.masterService.deleteToDo(id).subscribe({
    next: (response)=>{
      this.loadAllToDo();
    }
  })
 };
}
