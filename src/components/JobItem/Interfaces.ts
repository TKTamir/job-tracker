export interface IJobItem {
  applicationDate: string;
  companyName: string;
  companyWebsite: string;
  generalInfo: string;
  id: number | null;
  jobAd: string;
  positionName: string;
  progression: string;
  requestedSalary: string;
  status: string;
  userId: number | null;
}

export interface JobItemProps {
  job: IJobItem;
  searchQuery: string;
}

export type JobItemKeys = (keyof Omit<IJobItem, 'id' | 'userId'>)[];