import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getCustomersView } from "@/components/Tables/fetch";
import { CustomersList } from "@/components/Tables/customers-list";
import { TopChannelsSkeleton } from "@/components/Tables/customers-list/skeleton";
import React, { Suspense } from "react";
import { Button } from "@/components/ui-elements/button";
import { MessageOutlineIcon, PencilSquareIcon } from "@/assets/icons";
import Link from "next/link";

export default async function ClientPage() {
  const data = await getCustomersView();

  return (
    <>
      <Breadcrumb pageName="Clients" />
      <div className="mb-6 flex justify-end">
        <Link href="/clients/new">
          <Button
            label="Ajouter un client"
            variant="primary"
            shape="rounded"
            size="small"
            icon={<PencilSquareIcon />}
            className="justify-end"
          />
        </Link>
      </div>
      <CustomersList data={data} />
    </>
  );
}
