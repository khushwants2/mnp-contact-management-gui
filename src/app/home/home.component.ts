import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../app.globalconstants';
import { CompaniesListDD, MNPContactManagementDTO } from './home';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  companiesListDD: CompaniesListDD[];
  mnpContactManagementDTO: MNPContactManagementDTO[];

  constructor(private homeservie: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.SetLocalStorage();
    this.getMNPContactManagementListData();
  }

  SetLocalStorage(): void {
    this.homeservie.getCompaniesListDD().subscribe((list) => {
      console.log('CompaniesDD', list);
      this.companiesListDD = list;
      localStorage.setItem(
        GlobalConstants.LocalStorage_CompaniesDD,
        JSON.stringify(list)
      );
    });
  }

  getMNPContactManagementListData() {
    this.homeservie.getMNPContactManagementList().subscribe((list) => {
      console.log('mnpContactManagementDTO', list);
      this.mnpContactManagementDTO = list;
    });
  }

  getCompaniesName(id: number): string {
    let companyName: string = '';
    for (let i = 0; i < this.companiesListDD.length; i++) {
      if (this.companiesListDD[i].id == id) {
        return this.companiesListDD[i].comapanyname;
      }
    }
    return companyName;
  }
  onEdit(id: number) {
    this.router.navigate(['/create-new-contact', id]);
  }
}
