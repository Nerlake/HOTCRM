"use client";

import { useActionState, useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { upsertCustomerAction } from "@/components/Client/ClientActions";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  sexe: string; // "male" | "female" | "other"
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

const EMPTY_FORM: FormValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  sexe: "",
  street: "",
  postalCode: "",
  city: "",
  country: "",
};

export function CustomerForm({
  initial,
  customerId,
}: {
  initial?: FormValues;
  customerId?: string;
}) {
  const isEdit = Boolean(customerId);
  const [form, setForm] = useState<FormValues>(initial ?? EMPTY_FORM);
  const initialState = { ok: false as const, message: "" };

  const [state, formAction] = useActionState(
    upsertCustomerAction,
    initialState,
  );

  const handleChange = (key: keyof FormValues, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <ShowcaseSection title="Informations client" className="!p-6.5">
      {/* ✅ Le formulaire sans bouton */}
      <form
        id="contact-form"
        action={formAction}
        className="flex flex-col gap-6 xl:flex-row"
      >
        {isEdit && <input type="hidden" name="customerId" value={customerId} />}

        {/* Bloc gauche */}
        <div className="flex-1 space-y-4.5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Général
          </h3>

          <div className="flex flex-col gap-4.5 xl:flex-row">
            <InputGroup
              label="Prénom"
              type="text"
              name="firstname"
              placeholder="Marie"
              value={form.firstname}
              handleChange={(e) => handleChange("firstname", e.target.value)}
              className="w-full xl:w-1/2"
              required
            />

            <InputGroup
              label="Nom"
              type="text"
              name="lastname"
              placeholder="DUPONT"
              value={form.lastname}
              handleChange={(e) =>
                handleChange("lastname", e.target.value?.toUpperCase())
              }
              className="w-full xl:w-1/2"
              required
            />

            <Select
              label="Sexe"
              placeholder="Sélectionner le sexe"
              value={form.sexe}
              onValueChange={(val) => handleChange("sexe", val)}
              items={[
                { label: "Homme", value: "male" },
                { label: "Femme", value: "female" },
                { label: "Non spécifié", value: "other" },
              ]}
            />
            <input type="hidden" name="sexe" value={form.sexe} />
          </div>

          <InputGroup
            label="Email"
            type="email"
            name="email"
            placeholder="marie.dupont@example.com"
            value={form.email}
            handleChange={(e) => handleChange("email", e.target.value)}
            required
          />

          <InputGroup
            label="Numéro de téléphone"
            type="text"
            name="phone"
            placeholder="06 12 34 56 78"
            value={form.phone}
            handleChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Bloc droite */}
        <div className="flex-1 space-y-4.5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Adresse
          </h3>

          <InputGroup
            label="Rue"
            type="text"
            name="street"
            placeholder="10 rue de la Paix"
            value={form.street}
            handleChange={(e) => handleChange("street", e.target.value)}
          />

          <div className="flex flex-col gap-4.5 xl:flex-row">
            <InputGroup
              label="Code postal"
              type="text"
              name="postalCode"
              placeholder="75001"
              value={form.postalCode}
              handleChange={(e) => handleChange("postalCode", e.target.value)}
              className="w-full xl:w-1/2"
            />

            <InputGroup
              label="Ville"
              type="text"
              name="city"
              placeholder="Paris"
              value={form.city}
              handleChange={(e) => handleChange("city", e.target.value)}
              className="w-full xl:w-1/2"
            />
          </div>

          <Select
            label="Pays"
            placeholder="Sélectionner un pays"
            value={form.country}
            onValueChange={(val) => handleChange("country", val)}
            items={[
              { label: "France", value: "France" },
              { label: "Belgique", value: "Belgique" },
              { label: "Suisse", value: "Suisse" },
            ]}
          />
          <input type="hidden" name="country" value={form.country} />
        </div>
      </form>

      {/* ✅ Le bouton est maintenant en dehors du form */}
      <div className="mt-6 w-full">
        <button
          type="submit"
          form="contact-form" // ⬅️ relie le bouton au <form id="contact-form" />
          className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEdit ? "Mettre à jour" : "Créer"}
        </button>
      </div>

      {/* Message retour action */}
      {state?.message && (
        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
          {state.message}
        </p>
      )}
    </ShowcaseSection>
  );
}
