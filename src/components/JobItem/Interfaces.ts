export interface IJobItem {
  id?: number;
  applicationDate: string;
  companyName: string;
  companyWebsite: string;
  generalInfo: string;
  jobAd: string;
  positionName: string;
  progression: string;
  requestedSalary: string;
  status: string;
}

export interface JobItemProps {
  job: IJobItem;
}