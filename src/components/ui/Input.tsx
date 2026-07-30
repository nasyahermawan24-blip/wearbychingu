interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-zinc-800
        px-4
        py-3
        text-white
        focus:border-pink-500
        focus:outline-none
      "
    />
  );
}