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
import { Project } from "@/models/Project";

type SortKey = "name" | "totalprice" | "createdon";
type SortDir = "asc" | "desc";

export function ProjectListCustomer({
  className,
  data,
}: {
  className?: string;
  data: Project[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdon");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // 1) filter
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return data.filter((c) => c.name.toLowerCase().includes(term));
  }, [data, search]);

  // 2) sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let A: any = a[sortKey];
      let B: any = b[sortKey];

      if (sortKey === "createdon") {
        A = dayjs(A).valueOf();
        B = dayjs(B).valueOf();
      }
      // name: localeCompare for better alpha sort
      if (sortKey === "name") {
        const cmp = String(A).localeCompare(String(B), undefined, {
          sensitivity: "base",
        });
        return sortDir === "asc" ? cmp : -cmp;
      }
      // numbers & timestamps
      const cmp = (A as number) - (B as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // 3) header click handler
  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
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
      {/* <InputGroup
        label=""
        placeholder="Rechercher un projet..."
        type="text"
        handleChange={(e) => setSearch(e.target.value)}
      /> */}

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            {/* Fullname */}
            <TableHead
              role="columnheader"
              aria-sort={ariaSort("name")}
              className="min-w-[120px] !text-left"
            >
              <button
                type="button"
                onClick={() => toggleSort("name")}
                className="inline-flex items-center hover:underline"
              >
                Nom
                <SortIcon active={sortKey === "name"} dir={sortDir} />
              </button>
            </TableHead>

            {/* Total spent */}
            <TableHead
              role="columnheader"
              aria-sort={ariaSort("totalprice")}
              className="!text-right"
            >
              <button
                type="button"
                onClick={() => toggleSort("totalprice")}
                className="inline-flex items-center hover:underline"
              >
                Prix TTC
                <SortIcon active={sortKey === "totalprice"} dir={sortDir} />
              </button>
            </TableHead>

            {/* Last order date */}
            <TableHead role="columnheader" aria-sort={ariaSort("createdon")}>
              <button
                type="button"
                onClick={() => toggleSort("createdon")}
                className="inline-flex items-center hover:underline"
              >
                Crée le
                <SortIcon active={sortKey === "createdon"} dir={sortDir} />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((project) => (
            <TableRow
              key={project.id}
              className="cursor-pointer text-center text-base font-medium text-dark transition-colors hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
              onClick={() => router.push(`/clients/${project.id}`)}
            >
              <TableCell className="flex min-w-fit items-center gap-3 text-left">
                {project.name}
              </TableCell>

              <TableCell className="!text-right text-green-light-1">
                {standardFormat(project.totalprice)}€
              </TableCell>

              <TableCell>
                {dayjs(project.createdon).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
