"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Cari ID Order atau Nama Customer..."
      className="
      w-full
      rounded-2xl
      border
      border-pink-900/30
      bg-zinc-950
      px-5
      py-3
      outline-none
      focus:border-pink-500
      "
    />
  );
}