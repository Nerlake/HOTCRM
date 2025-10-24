import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCustomersView } from "@/components/Tables/fetch";
import { CustomersList } from "@/components/Tables/customers-list";
import { TopChannelsSkeleton } from "@/components/Tables/customers-list/skeleton";
import React, { Suspense } from "react";

export default async function ClientPage() {
  const data = await getCustomersView();

  return (
    <>
      <Breadcrumb pageName="Clients" />
      <CustomersList data={data} />
    </>
  );
}
