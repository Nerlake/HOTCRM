"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "@/components/FormElements/InputGroup";

type SortKey = "fullname" | "totalspent" | "lastorderdate" | "email";
type SortDir = "asc" | "desc";

/** Type conforme au retour de getCustomers() */
export type CustomerListItem = {
  id: string;
  fullname: string;
  totalspent: number;
  lastorderdate: Date | null; // peut être null si aucune facture
  email: string;
};

export function CustomersList({
  className,
  data,
}: {
  className?: string;
  data: CustomerListItem[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("fullname");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // 1) filter
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return data.filter((c) => c.fullname.toLowerCase().includes(term));
  }, [data, search]);

  // 2) sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let A: unknown = a[sortKey];
      let B: unknown = b[sortKey];

      if (sortKey === "lastorderdate") {
        // nulls en dernier
        const aTs = a.lastorderdate
          ? dayjs(a.lastorderdate).valueOf()
          : -Infinity;
        const bTs = b.lastorderdate
          ? dayjs(b.lastorderdate).valueOf()
          : -Infinity;
        const cmp = aTs - bTs;
        return sortDir === "asc" ? cmp : -cmp;
      }

      if (sortKey === "fullname") {
        const cmp = String(A).localeCompare(String(B), undefined, {
          sensitivity: "base",
        });
        return sortDir === "asc" ? cmp : -cmp;
      }

      // totalspent
      const cmp = (A as number) - (B as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // 3) header click handler
  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const ariaSort = (key: SortKey): "none" | "ascending" | "descending" =>
    key !== sortKey ? "none" : sortDir === "asc" ? "ascending" : "descending";

  const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
    <span className="ml-1 inline-block select-none text-xs opacity-70">
      {active ? (dir === "asc" ? "▲" : "▼") : "⇵"}
    </span>
  );

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <InputGroup
        label=""
        placeholder="Rechercher un client..."
        type="text"
        handleChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead
              role="columnheader"
              aria-sort={ariaSort("fullname")}
              className="min-w-[120px] !text-left"
            >
              <button
                type="button"
                onClick={() => toggleSort("fullname")}
                className="inline-flex items-center hover:underline"
              >
                Nom <SortIcon active={sortKey === "fullname"} dir={sortDir} />
              </button>
            </TableHead>

            <TableHead
              role="columnheader"
              aria-sort={ariaSort("email")}
              className="!text-right"
            >
              <button
                type="button"
                onClick={() => toggleSort("email")}
                className="inline-flex items-center hover:underline"
              >
                Email
                <SortIcon active={sortKey === "email"} dir={sortDir} />
              </button>
            </TableHead>

            <TableHead
              role="columnheader"
              aria-sort={ariaSort("totalspent")}
              className="!text-right"
            >
              <button
                type="button"
                onClick={() => toggleSort("totalspent")}
                className="inline-flex items-center hover:underline"
              >
                Total dépensé{" "}
                <SortIcon active={sortKey === "totalspent"} dir={sortDir} />
              </button>
            </TableHead>

            <TableHead
              role="columnheader"
              aria-sort={ariaSort("lastorderdate")}
            >
              <button
                type="button"
                onClick={() => toggleSort("lastorderdate")}
                className="inline-flex items-center hover:underline"
              >
                Date de dernière commande{" "}
                <SortIcon active={sortKey === "lastorderdate"} dir={sortDir} />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer text-center text-base font-medium text-dark transition-colors hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
              onClick={() => router.push(`/clients/${customer.id}`)}
            >
              <TableCell className="flex min-w-fit items-center gap-3 text-left">
                {customer.fullname}
              </TableCell>
              <TableCell className="!text-right">{customer.email}</TableCell>

              <TableCell className="!text-right text-green-light-1">
                {standardFormat(customer.totalspent)}€
              </TableCell>

              <TableCell>
                {customer.lastorderdate
                  ? dayjs(customer.lastorderdate).format("DD/MM/YYYY")
                  : "—"}
              </TableCell>
            </TableRow>
          ))}

          {sorted.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-6 text-center text-sm text-gray-500"
              >
                Aucun client trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
