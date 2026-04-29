import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../model/todo';
import { snakbarservice } from '../services/snakbar.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private snakbar : snakbarservice) { }

  ngOnInit(): void {
  }

  @ViewChild('todoitem') todoitem !: ElementRef;
  isineditmode: boolean = true;
  editobj! : Itodo;

  todoArr: Array<Itodo> = [
    { todoItem: 'HTML', id: '1' },
    { todoItem: 'CSS', id: '2' },
    { todoItem: 'JAVASCRIPT', id: '3' },
    { todoItem: 'TYPESCRIPT', id: '4' },
    { todoItem: 'ANGULAR', id: '5' },
    { todoItem: 'REACT', id: '6' },
    { todoItem: 'NODEJS', id: '7' },
    { todoItem: 'EXPRESS', id: '8' },
    { todoItem: 'MONGODB', id: '9' },
    { todoItem: 'BOOTSTRAP', id: '10' }
  ];

  trackbyfun(index: number, item: Itodo): string {
    return item.id;
  }

  ontodoadd() {
    if (this.todoitem.nativeElement.value != '') {
      let val = this.todoitem.nativeElement.value
      let newobj: Itodo = {
        todoItem: val,
        id: Date.now().toString()
      }
      this.todoArr.unshift(newobj)

      this.todoitem.nativeElement.value = '';

      this.snakbar.OpenSnakbar(`The todo item ${val} is added successfully...`)
    }
  }

  onremove(id: string) {
    let getconfirm = confirm('Are you sure do you want to delete this...');
    if (getconfirm) {
      let getindex = this.todoArr.findIndex((ele) => ele.id === id)

      let val = this.todoArr.splice(getindex, 1)

      this.snakbar.OpenSnakbar(`The todo item ${val[0].todoItem} is removed successfully...`)
    }
  }

  onEdit(todo:Itodo){
    this.editobj = todo;
    this.todoitem.nativeElement.value = todo.todoItem

    this.isineditmode = false
  }

  onUpdate(){
    let updated_obj : Itodo= {
      todoItem:this.todoitem.nativeElement.value,
      id:this.editobj.id
    }

    let getindex = this.todoArr.findIndex((ele) => ele.id === this.editobj.id)
    this.todoArr[getindex] = updated_obj;

    this.todoitem.nativeElement.value = ''
    this.isineditmode = true;

    this.snakbar.OpenSnakbar(`The todo item ${updated_obj.todoItem} is updated successfully...`)
  }
}
