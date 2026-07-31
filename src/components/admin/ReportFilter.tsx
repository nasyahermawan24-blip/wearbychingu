"use client";

import { ReportFilter } from "@/types/filter";

interface Props {
  value: ReportFilter;
  onChange: (value: ReportFilter) => void;
}

const filters: {
  label: string;
  value: ReportFilter;
}[] = [
  {
    label: "Hari Ini",
    value: "today",
  },
  {
    label: "7 Hari",
    value: "7days",
  },
  {
    label: "30 Hari",
    value: "30days",
  },
  {
    label: "Tahun Ini",
    value: "year",
  },
];

export default function ReportFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((item) => (

        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`
            rounded-xl
            px-5
            py-2.5
            text-sm
            font-semibold
            transition
            ${
              value === item.value
                ? "bg-pink-600 text-white"
                : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
            }
          `}
        >
          {item.label}
        </button>

      ))}

    </div>
  );
}