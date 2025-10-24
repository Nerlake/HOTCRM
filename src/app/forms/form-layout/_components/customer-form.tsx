"use client";
import { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function CustomerForm() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    sexe: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
  });

  // fonction pour mettre à jour chaque champ
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", form);
    // tu pourrais ici faire un fetch vers ton API
    // fetch("/api/customers", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <ShowcaseSection title="Informations client" className="!p-6.5">
      <form
        id="contact-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 xl:flex-row"
      >
        {/* Bloc gauche */}
        <div className="flex-1 space-y-4.5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Général
          </h3>
          <div className="flex flex-col gap-4.5 xl:flex-row">
            <InputGroup
              label="Prénom"
              type="text"
              placeholder="Marie"
              value={form.firstname}
              handleChange={(e) => handleChange("firstname", e.target.value)}
              className="w-full xl:w-1/2"
            />

            <InputGroup
              label="Nom"
              type="text"
              placeholder="DUPONT"
              value={form.lastname}
              handleChange={(e) =>
                handleChange("lastname", e.target.value?.toUpperCase())
              }
              className="w-full xl:w-1/2"
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
          </div>

          <InputGroup
            label="Email"
            type="email"
            placeholder="marie.dupont@example.com"
            value={form.email}
            handleChange={(e) => handleChange("email", e.target.value)}
            required
          />

          <InputGroup
            label="Numéro de téléphone"
            type="text"
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
            placeholder="10 rue de la Paix"
            value={form.street}
            handleChange={(e) => handleChange("street", e.target.value)}
          />

          <div className="flex flex-col gap-4.5 xl:flex-row">
            <InputGroup
              label="Code postal"
              type="text"
              placeholder="75001"
              value={form.postalCode}
              handleChange={(e) => handleChange("postalCode", e.target.value)}
              className="w-full xl:w-1/2"
            />
            <InputGroup
              label="Ville"
              type="text"
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
        </div>
      </form>

      <button
        type="submit"
        form="contact-form"
        className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
      >
        Enregistrer
      </button>
    </ShowcaseSection>
  );
}
