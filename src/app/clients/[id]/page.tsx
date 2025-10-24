// app/clients/[id]/page.tsx

import ClientDetailsPageClient from "@/components/Client/ClientDetailsPageClient";
import { getCustomerById } from "@/components/Tables/fetch";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const c = await getCustomerById(id);
  if (!c) return <div>Client introuvable</div>;

  const initial = {
    firstname: c.firstname ?? "",
    lastname: c.lastname ?? "",
    email: c.email ?? "",
    phone: c.phone ?? "",
    sexe: (c.gender || "").toLowerCase(),
    street: c.address.street ?? "",
    postalCode: c.address.postalCode ?? "",
    city: c.address.city ?? "",
    country: c.address.country ?? "",
  };

  const projectData = c.projects.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    createdAt: p.createdAt,
  }));

  return (
    <ClientDetailsPageClient
      customerId={c.id}
      initial={initial}
      projectData={projectData}
    />
  );
}
