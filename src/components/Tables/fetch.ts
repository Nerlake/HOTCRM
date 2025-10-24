import * as logos from "@/assets/logos";
import { prisma } from "@/lib/prisma";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}

// components/Tables/fetch.ts

type CustomerRow = {
  id: string;
  firstname: string;
  lastname: string;
  totalspent: number;
  lastorderdate: Date | null;
  email: string;
};

export async function getCustomersView(): Promise<
  {
    id: string;
    fullname: string;
    email: string;
    totalspent: number;
    lastorderdate: Date | null;
  }[]
> {
  const rows = await prisma.$queryRaw<CustomerRow[]>`
    SELECT
      c."id"                              AS "id",
      c."firstname"                       AS "firstname",
      c."lastname"                        AS "lastname",
      c."email"                           AS "email",
      COALESCE(SUM(p."amount")::double precision, 0) AS "totalspent",
      MAX(i."issueDate")                  AS "lastorderdate"
    FROM "Customer" c
    LEFT JOIN "Invoice"  i ON i."customerId" = c."id"
    LEFT JOIN "Payment"  p ON p."invoiceId"  = i."id"
    GROUP BY c."id", c."firstname", c."lastname"
    ORDER BY c."lastname" ASC, c."firstname" ASC;
  `;

  return rows.map((r) => ({
    id: r.id,
    fullname: `${r.firstname} ${r.lastname}`.trim(),
    totalspent: r.totalspent ?? 0,
    lastorderdate: r.lastorderdate,
    email: r.email,
  }));
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      sport: true,
      projects: {
        include: {
          quotes: {
            include: {
              lines: true,
            },
            orderBy: { createdAt: "asc" },
          },
          invoices: {
            include: {
              lines: true, // ✅ InvoiceLine[]
              payments: true, // ✅ Payment[]
            },
            orderBy: { issueDate: "asc" },
          },
        },
      },
      quotes: {
        include: { lines: true }, // si tu veux aussi les devis non liés à un projet
        orderBy: { createdAt: "desc" },
      },
      invoices: {
        include: { lines: true, payments: true },
        orderBy: { issueDate: "desc" },
      },
    },
  });

  if (!customer) return null;

  // calculs utiles (basés sur les paiements)
  const totalSpent = customer.invoices.reduce((sum, inv) => {
    const paid = inv.payments.reduce((s, p) => s + Number(p.amount), 0);
    return sum + paid;
  }, 0);

  const lastOrderDate =
    customer.invoices.length > 0
      ? new Date(
          Math.max(
            ...customer.invoices
              .map((inv) => inv.issueDate)
              .filter(Boolean)
              .map((d) => new Date(d!).getTime()),
          ),
        )
      : null;

  return {
    id: customer.id,
    firstname: customer.firstname,
    lastname: customer.lastname,
    fullname: `${customer.firstname} ${customer.lastname}`.trim(),
    email: customer.email,
    phone: customer.phone,
    gender: customer.gender,
    sport: customer.sport,
    address: {
      street: customer.street,
      postalCode: customer.postalCode,
      city: customer.city,
      country: customer.country,
    },
    totalSpent,
    lastOrderDate,
    projects: customer.projects,
    quotes: customer.quotes,
    invoices: customer.invoices,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
}
