import { Component, Output, EventEmitter, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Gun } from './app.component';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/subscribe';



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

    // this.form.valueChanges
    //     .map((value) => {
    //         value.firstName = value.firstName.toUpperCase();
    //         return value;
    //     })
    //     .filter((value) => this.form.valid)
    //     .subscribe((value) => {
    //        console.log("Model Driven Form valid value: vm = ",JSON.stringify(value));
    //     });
  }

  addGun():void{
      //console.log("emituje");
      if(this.form.dirty && this.form.valid)
      {
      this.addToList.emit({bron:this.form.value});  
      }
   }

   reset() {
    this.form.reset();
}
}


