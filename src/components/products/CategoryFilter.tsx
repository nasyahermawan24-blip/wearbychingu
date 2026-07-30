"use client";

const categories = [
  "All",
  "Oversized",
  "Winter",
  "Premium",
  "Korean Style",
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`
            rounded-full
            px-6
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300
            ${
              selected === category
                ? "bg-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.45)]"
                : "border border-pink-900/40 bg-zinc-900 text-gray-300 hover:border-pink-500 hover:text-white"
            }
          `}
        >
          {category}
        </button>
      ))}

    </div>
  );
}