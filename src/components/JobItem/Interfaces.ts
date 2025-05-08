export interface IJobItem {
  applicationDate: string;
  companyName: string;
  companyWebsite: string;
  generalInfo: string;
  jobAd: string;
  positionName: string;
  progression: string;
  requestedSalary: string;
  status: string;
  id?: string;
  userId?: string;
}

export interface JobItemProps {
  job: IJobItem;
  searchQuery?: string;
  mode?: "view" | "edit";
}

export type JobItemKeys = (keyof Omit<IJobItem, 'id' | 'userId'>)[];