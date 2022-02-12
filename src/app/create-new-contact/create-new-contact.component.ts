import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../app.globalconstants';
import { CompaniesListDD, MNPContactManagementDTO } from '../home/home';
import { ReturnResults } from './create-new-contact';
import { CreateNewContactService } from './create-new-contact.service';
declare let alertify: any;

@Component({
  selector: 'app-create-new-contact',
  templateUrl: './create-new-contact.component.html',
  providers: [CreateNewContactService],
  styleUrls: ['./create-new-contact.component.css'],
})
export class CreateNewContactComponent implements OnInit {
  createNewContactFormGroup: FormGroup;
  mnpContactManagementID: number = 0;
  mnpContactManagementDTO: MNPContactManagementDTO;
  companiesListDD: CompaniesListDD[];

  constructor(
    private createNewContactService: CreateNewContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companiesListDD = JSON.parse(
      localStorage.getItem(GlobalConstants.LocalStorage_CompaniesDD)
    );

    this.createNewContactFormGroup = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      contactName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(250),
      ]),
      lastDateContacted: new FormControl(new Date(), [Validators.required]),
      jobTitle: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      companyId: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(150),
      ]),
      comments: new FormControl(null, [Validators.maxLength(250)]),
    });

    console.log('Passing Parameter ID: ' + this.route.snapshot.params['id']);
    this.mnpContactManagementID = this.route.snapshot.params['id'];
    if (this.mnpContactManagementID == undefined)
      this.mnpContactManagementID = 0;

    if (this.mnpContactManagementID != 0) {
      this.createNewContactService
        .getMNPContanctManagementByIdDTO(this.mnpContactManagementID)
        .subscribe((data) => {
          console.log('getMNPContanctManagementByIdDTO', data);
          this.mnpContactManagementDTO = data;
          this.createNewContactFormGroup.setValue(data);
        });
    }
  }

  onSubmit() {
    console.log(this.createNewContactFormGroup.value);
    this.createNewContactService
      .SaveMNPContactManagement(this.createNewContactFormGroup.value)
      .subscribe((responseData) => {
        console.log(responseData);
        if (responseData.message == 'Contact Saved Succeessfully') {
          alertify
            .alert('MNP Contact Management', responseData.message, function () {
              alertify.success(responseData.message);
            })
            .resizeTo('60%', 350)
            .set({
              onshow: null,
              onclose: function (routers = this.router) {},
            });
          this.router.navigate(['/home']);
        }
      });
  }

  onReset() {
    this.createNewContactFormGroup.reset();
  }
}
