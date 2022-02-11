import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-contact',
  templateUrl: './create-new-contact.component.html',
  styleUrls: ['./create-new-contact.component.css'],
})
export class CreateNewContactComponent implements OnInit {
  createNewContact: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.createNewContact = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(250),
      ]),
      lastdatecontacted: new FormControl(new Date(), [Validators.required]),
      jobtitle: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      company: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(150),
      ]),
      comments: new FormControl(null, [Validators.maxLength(250)]),
    });
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {}
}
