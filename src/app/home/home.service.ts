import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../app.globalconstants';
import { CompaniesListDD, MNPContactManagementDTO } from './home';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiEndpoints: string = GlobalConstants.apiURL;
  homeController: string = GlobalConstants.mnpContactManagementControllerName;
  comapniesDD: string = GlobalConstants.getCompaniesDD;
  getMNPContanctManagementList: string =
    GlobalConstants.getMNPContanctManagementList;

  constructor(private http: HttpClient) {}

  getCompaniesListDD(): Observable<CompaniesListDD[]> {
    return this.http.get<CompaniesListDD[]>(
      this.apiEndpoints + this.homeController + this.comapniesDD
    );
  }

  getMNPContactManagementList(): Observable<MNPContactManagementDTO[]> {
    return this.http.get<MNPContactManagementDTO[]>(
      this.apiEndpoints +
        this.homeController +
        this.getMNPContanctManagementList
    );
  }
}
