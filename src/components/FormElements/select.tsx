"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useEffect, useId, useMemo, useState } from "react";

type Item = { value: string; label: string };

type BaseProps = {
  label: string;
  items: Item[];
  prefixIcon?: React.ReactNode;
  className?: string;
  /** mode contrôlé */
  value?: string;
  onValueChange?: (value: string) => void;
};

/** Conserve la compatibilité: placeholder XOR defaultValue */
type PropsType =
  | (BaseProps & { placeholder?: string; defaultValue: string })
  | (BaseProps & { placeholder: string; defaultValue?: string });

export function Select({
  items,
  label,
  defaultValue,
  placeholder,
  prefixIcon,
  className,
  value, // nouveau
  onValueChange, // nouveau
}: PropsType) {
  const id = useId();

  // Détermine si quelque chose est sélectionné (pour la classe de texte)
  const hasValue = useMemo(() => {
    // contrôlé
    if (value !== undefined) return value !== "";
    // non contrôlé (via defaultValue) -> true si défini
    return Boolean(defaultValue && defaultValue !== "");
  }, [value, defaultValue]);

  // Si tu veux garder l'effet visuel actuel:
  const [isOptionSelected, setIsOptionSelected] = useState(hasValue);
  useEffect(() => setIsOptionSelected(hasValue), [hasValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOptionSelected(true);
    onValueChange?.(e.target.value);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <label
        htmlFor={id}
        className="block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        {prefixIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {prefixIcon}
          </div>
        )}

        <select
          id={id}
          // Mode contrôlé si `value` est fourni, sinon non contrôlé avec `defaultValue`
          {...(value !== undefined
            ? { value }
            : { defaultValue: defaultValue || "" })}
          onChange={handleChange}
          className={cn(
            "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
            isOptionSelected && "text-dark dark:text-white",
            prefixIcon && "pl-11.5",
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
      </div>
    </div>
  );
}
