"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CustomerForm } from "@/app/forms/form-layout/_components/customer-form";
import { ProjectListCustomer } from "@/components/Tables/project-list-customer";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  sexe: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export default function ClientDetailsPageClient({
  customerId,
  initial,
  projectData,
}: {
  customerId: string;
  initial: FormValues; // valeurs initiales pour le form
  projectData: {
    id: string;
    name: string;
    status: string;
    createdAt: string | Date;
  }[];
}) {
  const tabs = [
    { id: "contact", label: "Informations générales" },
    { id: "projets", label: "Projets" },
  ];
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <>
      <Breadcrumb pageName="Détails du client" />

      <div className="flex flex-col gap-6">
        <div className="border-b border-stroke dark:border-dark-3">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-t-lg px-4 py-2 text-sm font-medium transition-colors",
                  "text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary",
                  activeTab === tab.id &&
                    "border-b-2 border-primary text-primary dark:text-primary",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-2">
          {activeTab === "contact" && (
            <div className="animate-fade-in">
              <CustomerForm initial={initial} customerId={customerId} />
            </div>
          )}

          {activeTab === "projets" && (
            <div className="animate-fade-in rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-dark-2">
              <h2 className="mb-3 text-lg font-semibold text-dark dark:text-white">
                Projets
              </h2>
              <ProjectListCustomer data={[]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
