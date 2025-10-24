export type QuoteDetails = {
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
  quoteid: string;
  createdon: string | Date;
  modifiedon: string | Date;
};
