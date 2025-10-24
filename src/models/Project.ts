enum ProjectStatus {
  NEW,
  WAITING_INFO,
  PAUSED,
  CANCELED,
  DONE,
  IN_PROGRESS,
  READY_TO_ST,
}

export type Project = {
  id: string;
  name: string;
  customerid: string;
  status: ProjectStatus;
  deadline: string | Date;
  startdate: string | Date;
  enddate: string | Date;
  theoricaldeliverydate: string | Date;
  realdeliverydate: string | Date;
  totalprice: number;
  description: string;
  createdon: string | Date;
  modifiedon: string | Date;
};
