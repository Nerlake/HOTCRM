import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCustomers } from "@/components/Tables/fetch";
import { CustomersList } from "@/components/Tables/customers-list";
import { TopChannelsSkeleton } from "@/components/Tables/customers-list/skeleton";
import React, { Suspense } from "react";

export default async function ClientPage() {
  const data = await getCustomers();

  return (
    <>
      <Breadcrumb pageName="Clients" />
      <CustomersList data={data} />
      {/* <Suspense fallback={<TopChannelsSkeleton />}>
      </Suspense> */}
    </>
  );
}
