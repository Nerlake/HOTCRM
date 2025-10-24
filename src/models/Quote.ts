enum QuoteStatus {
  DRAFT,
  SENT,
  SIGNED,
  EXPIRED,
  CANCELED,
  REJECTED,
}

export type Quote = {
  id: string;
  quotenumber: string;
  name: string;
  customerid: string;
  projectid: string;
  totalprice: number;
  totalvat: number;
  totalpricewithoutvat: number;
  emissiondate: string | Date;
  duedate: string | Date;
  signeddate: string | Date;
  billingstreet: string;
  billingcity: string;
  billingpostalcode: string;
  billingcountry: string;
  deliverystreet: string;
  deliverycity: string;
  deliverypostalcode: string;
  deliverycountry: string;
  status: QuoteStatus;
  createdon: string | Date;
  modifiedon: string | Date;
};
