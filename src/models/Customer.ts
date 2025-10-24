enum CustomerType {
  LEAD,
  CUSTOMER,
}

enum CustomerStatus {
  ACTIVE,
  INACTIVE,
}

export type Customer = {
  id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  email?: string;
  phone?: string;
  gender: Gender;
  totalspent: number;
  lastorderdate: string | Date;
  sportid: string;
  street: string;
  city: string;
  postalcode: string;
  country: string;
  type: CustomerType;
  status: CustomerStatus;
  createdon: string | Date;
  modifiedon: string | Date;
};
