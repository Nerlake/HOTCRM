enum InvoiceStatus {
  DRAFT,
  SENT,
  SIGNED,
  EXPIRED,
  CANCELED,
  REJECTED,
}

export type Invoice = {
  id: string;
  invoicenumber: string;
  customerid: string;
  quoteid: string;
  projectid: string;
  totalprice: number;
  totalvat: number;
  totalpricewithoutvat: number;
  emissiondate: string | Date;
  signeddate: string | Date;
  billingstreet: string;
  billingcity: string;
  billingpostalcode: string;
  billingcountry: string;
  deliverystreet: string;
  deliverycity: string;
  deliverypostalcode: string;
  deliverycountry: string;
  status: InvoiceStatus;
  createdon: string | Date;
  modifiedon: string | Date;
};
