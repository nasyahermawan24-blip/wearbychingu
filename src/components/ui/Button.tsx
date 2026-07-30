interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        px-5
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-pink-500
        to-fuchsia-600
        hover:scale-[1.02]
        transition
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}