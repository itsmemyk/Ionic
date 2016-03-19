import {ElementRef,Component,ViewContainerRef,TemplateRef} from 'angular2/core'

@Component({
  selector: 'widget1',
  template: `
    <div>
      I'm widget 1
    </div>
  `,
  directives: []
})
export class Widget1 {
    
    static get parameters(){
        return [[ViewContainerRef],[TemplateRef]]
    }
    
    constructor(view,tmpl){
        this.view = view;
        this.tmpl = tmpl;
    }
    
    ngAfterContentInit(){
        console.log(this.view);   
        console.log(this.tmpl);
    }
}
