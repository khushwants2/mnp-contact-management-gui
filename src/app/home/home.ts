export interface CompaniesListDD {
  id: number;
  ComapnayName: string;
}

export interface MNPContactManagementDTO {
  id: number;
  ContactName: string;
  Address: string;
  LastDateContacted: Date;
  JobTitle: string;
  Phone: number;
  CompanyId: number;
  Email: string;
  Comments: string;
}
