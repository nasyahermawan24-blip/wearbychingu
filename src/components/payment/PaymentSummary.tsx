import { OrderWithItems } from "@/types/order";

interface Props {
  order: OrderWithItems;
}

export default function PaymentSummary({
  order,
}: Props) {
  const formatPrice =
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  return (
    <div
      className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-8
      "
    >
      <p className="text-pink-500">
        Order ID
      </p>

      <p className="mt-2 break-all">
        {order.id}
      </p>

      <div className="mt-8 space-y-4">
        {order.order_items?.map(
          (item) => (
            <div
              key={item.id}
              className="border-b border-pink-900/20 pb-4"
            >
              <h3 className="font-semibold">
                {item.product_name}
              </h3>

              <p className="text-sm text-gray-400">
                Qty : {item.quantity}
              </p>

              <p className="mt-2 font-bold text-pink-500">
                {formatPrice.format(
                  item.subtotal
                )}
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <span>Total</span>

        <span className="font-bold text-pink-500">
          {formatPrice.format(
            order.total
          )}
        </span>
      </div>

      <div className="mt-4 flex justify-between">
        <span>Status</span>

        <span className="capitalize">
          {order.status}
        </span>
      </div>
    </div>
  );
}
