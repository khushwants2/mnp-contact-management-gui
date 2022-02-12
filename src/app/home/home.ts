export interface CompaniesListDD {
  id: number;
  comapanyname: string;
}

export interface MNPContactManagementDTO {
  id: number;
  contactName: string;
  address: string;
  lastDateContacted: Date;
  jobTitle: string;
  phone: number;
  companyId: number;
  email: string;
  comments: string;
}
