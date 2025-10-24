"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

type State = { ok: boolean; message?: string };

const schema = z.object({
  customerId: z.string().optional(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.email(),
  phone: z.string().optional().default(""),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  street: z.string().optional().default(""),
  postalCode: z.string().optional().default(""),
  city: z.string().optional().default(""),
  country: z.string().optional().default(""),
});

// Utilitaire: lire FormData -> objet typé
function parseFormData(formData: FormData) {
  const raw = {
    customerId: formData.get("customerId")?.toString() || undefined,
    firstname: formData.get("firstname")?.toString() ?? "",
    lastname: formData.get("lastname")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    // UI en minuscule -> enum DB en MAJ
    gender: (formData.get("sexe")?.toString() ?? "").toUpperCase(),
    street: formData.get("street")?.toString() ?? "",
    postalCode: formData.get("postalCode")?.toString() ?? "",
    city: formData.get("city")?.toString() ?? "",
    country: formData.get("country")?.toString() ?? "",
  };
  return schema.parse(raw);
}

export async function upsertCustomerAction(
  prev: State,
  formData: FormData,
): Promise<State> {
  try {
    const input = parseFormData(formData);

    if (input.customerId) {
      // UPDATE
      const c = await prisma.customer.update({
        where: { id: input.customerId },
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          phone: input.phone,
          gender: input.gender, // "MALE" | "FEMALE" | "OTHER"
          street: input.street,
          postalCode: input.postalCode,
          city: input.city,
          country: input.country,
        },
      });

      revalidatePath(`/clients/${c.id}`); // si tu as des pages qui le lisent
      redirect(`/clients/${c.id}`); // retour vers la page client
    } else {
      // CREATE
      const c = await prisma.customer.create({
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          phone: input.phone,
          gender: input.gender,
          street: input.street,
          postalCode: input.postalCode,
          city: input.city,
          country: input.country,
        },
      });

      revalidatePath(`/clients`);
      redirect(`/clients/${c.id}`);
    }
  } catch (e: any) {
    return { ok: false, message: e.message ?? "Erreur inconnue" };
  }
}
