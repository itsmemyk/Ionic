import {Page,IONIC_DIRECTIVES} from 'ionic-angular';
import {Decorator,Component,EventEmitter} from 'angular2/core';

@Component({
    selector:'todo-list',
    template:`
        <ion-list>
            <ion-item *ngFor="#td of data">
                <ion-label class="todo-{{td.done}}">{{td.text}}</ion-label>
                <ion-checkbox [(ngModel)]="td.done"></ion-checkbox>
            </ion-item>
        </ion-list>
    `,
    styles:[`
        .todo-true {
            text-decoration:line-through;
        }
    `],
    directives:[IONIC_DIRECTIVES],
    inputs:["data"]    
})
export class ToDoList{
    constructor(){
        
    }
}

@Component({
    selector:'todo-form',
    template:`
        <form (ngSubmit)="addToDo()">
            <ion-item>
                <ion-label floating>Todo Task</ion-label>
                <ion-input [(ngModel)]="task" type="text"></ion-input>
            </ion-item>
            <button m-l-20 m-t-10 pink>Add</button>
        </form>
    `,
    directives:[IONIC_DIRECTIVES],
    outputs:['newTodo']
})
export class ToDoForm{
    constructor(){
        this.newTodo = new EventEmitter();
        this.task = '';        
    }
    
    addToDo(){
        this.newTodo.next({text:this.task,done:false});
        this.task = '';
    }
}

@Page({
    templateUrl:'build/pages/todo/todo.html',
    directives:[ToDoList,ToDoForm]
})

export class TodoApp {
    
    constructor(){
        this.todo = [{'text':'first note',done:true},{'text':'second note',done:false}];
        
    }
    
    get remain(){
        return this.todo.reduce((count,todo) => count + +!todo.done,0);
    }
    
    addNewTodo(newTask){
        this.todo.push(newTask);
    }
    
    test(str){
        console.log(eval(str));
    }
}