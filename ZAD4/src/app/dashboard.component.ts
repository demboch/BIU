import { Component, Output, EventEmitter, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Gun } from './app.component';



@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent { 
 
  @Output() 
  addToList = new EventEmitter();

  form: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      name:["", [Validators.minLength(4), Validators.maxLength(10)]],
      country:["", Validators.required]
    });
  }

  addGun():void{
      //console.log("emituje");
      if(this.form.dirty && this.form.valid)
      {
      this.addToList.emit({bron:this.form.value});  
      }
   }
}