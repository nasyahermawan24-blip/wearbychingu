"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="mb-10 flex justify-center">

      <input
        type="text"
        placeholder="🔍 Search Sweater..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          max-w-xl
          rounded-2xl
          border
          border-pink-900/40
          bg-zinc-900
          px-5
          py-4
          text-white
          placeholder:text-gray-500
          outline-none
          transition
          focus:border-pink-500
          focus:ring-2
          focus:ring-pink-500/30
        "
      />

    </div>
  );
}