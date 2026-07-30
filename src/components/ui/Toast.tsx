interface ToastProps {
  message: string;
}

export default function Toast({
  message,
}: ToastProps) {

  if (!message) return null;

  return (

    <div
      className="
      fixed
      top-6
      right-6
      z-50
      rounded-xl
      bg-green-500
      px-6
      py-3
      text-white
      shadow-xl
      "
    >
      {message}
    </div>

  );

}