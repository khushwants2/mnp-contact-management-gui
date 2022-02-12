import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../app.globalconstants';
import { CompaniesListDD, MNPContactManagementDTO } from '../home/home';
@Injectable({
  providedIn: 'root',
})
export class CreateNewContactService {
  apiEndpoints: string = GlobalConstants.apiURL;
  homeController: string = GlobalConstants.mnpContactManagementControllerName;
  getMNPContanctManagementById: string =
    GlobalConstants.getMNPContanctManagementById;
  saveMNPContactManagement: string = GlobalConstants.SaveMNPContanctManagement;

  constructor(private http: HttpClient) {}

  getMNPContanctManagementByIdDTO(
    id: number
  ): Observable<MNPContactManagementDTO> {
    return this.http.get<MNPContactManagementDTO>(
      this.apiEndpoints +
        this.homeController +
        this.getMNPContanctManagementById +
        '/' +
        id
    );
  }

  SaveMNPContactManagement(data: MNPContactManagementDTO): Observable<any> {
    console.log('in Save MNP', data);
    let url: string =
      this.apiEndpoints + this.homeController + this.saveMNPContactManagement;

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    return this.http.post(url, body, { headers: headers });
  }
}
