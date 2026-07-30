"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
      rounded-2xl
      border
      border-pink-900/30
      bg-zinc-950
      px-5
      py-3
      "
    >
      <option value="all">
        Semua Status
      </option>

      <option value="pending">
        Pending
      </option>

      <option value="processing">
        Processing
      </option>

      <option value="completed">
        Completed
      </option>

      <option value="cancelled">
        Cancelled
      </option>
    </select>
  );
}