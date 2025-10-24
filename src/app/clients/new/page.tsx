import { CustomerForm } from "@/app/forms/form-layout/_components/customer-form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ClientDetailsPageClient from "@/components/Client/ClientDetailsPageClient";
import React from "react";

export default async function page() {
  return (
    <>
      <Breadcrumb pageName="Nouveau client" />
      <CustomerForm />
    </>
  );
}
