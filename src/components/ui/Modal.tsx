interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-zinc-900
          border
          border-pink-500/20
          rounded-2xl
          w-full
          max-w-lg
          p-6
        "
      >
        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold text-pink-500">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-white"
          >
            ✕
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}