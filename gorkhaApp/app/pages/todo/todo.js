import {Platform,Page,IONIC_DIRECTIVES} from 'ionic-angular';
import {Decorator,Component,EventEmitter} from 'angular2/core';
import {AxelorRestService} from './../../services/axelor.rest';

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
    directives:[ToDoList,ToDoForm],
    providers:[AxelorRestService]
})

export class TodoApp {
    
    static get parameters(){
        return [[Platform],[AxelorRestService]];
    }
    
    constructor(platform,rest){
        this.todo = [{'text':'first note',done:true},{'text':'second note',done:false}];
    
        // rest.login().subscribe((done)=>{
        //     rest.fields("com.axelor.code.db.Code").map(res=>res.json()).subscribe((data)=>{
        //         console.log(data);
        //     });   
        // })                 
    }
    
    get remain(){
        return this.todo.reduce((count,todo) => count + +!todo.done,0);
    }
    
    addNewTodo(newTask){
        this.todo.push(newTask);
    }
    
    test(str){
    }
    trace(){
        console.log("dhkfhf");
    }
}