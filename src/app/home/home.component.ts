import { Component, OnInit } from '@angular/core';
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

  constructor(private homeservie: HomeService) {}

  ngOnInit(): void {
    this.SetLocalStorage();
    this.getMNPContactManagementListData();
  }

  SetLocalStorage(): void {
    this.homeservie.getCompaniesListDD().subscribe((list) => {
      console.log('CompaniesDD', list);
      this.companiesListDD = list;
      localStorage.setItem('CompaniesDD', JSON.stringify(list));
    });
  }

  getMNPContactManagementListData() {
    this.homeservie.getMNPContactManagementList().subscribe((list) => {
      console.log('mnpContactManagementDTO', list);
      this.mnpContactManagementDTO = list;
    });
  }
}
