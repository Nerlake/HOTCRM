export type InvoiceDetails = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitprice: number;
  vatpercentage: number;
  totalprice: number;
  totalvat: number;
  vatrate: number;
  totalpricewithoutvat: number;
  invoiceid: string;
  createdon: string | Date;
  modifiedon: string | Date;
};
