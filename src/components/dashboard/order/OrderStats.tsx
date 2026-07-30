"use client";

interface Props {
  orders: {
    status?: string;
  }[];
}

export default function OrderStats({
  orders,
}: Props) {
  const total = orders.length;

  const pending = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const processing = orders.filter(
    (o) => o.status === "processing"
  ).length;

  const completed = orders.filter(
    (o) => o.status === "completed"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "Processing",
      value: processing,
    },
    {
      title: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className="
          rounded-3xl
          border
          border-pink-900/30
          bg-zinc-950
          p-6
          "
        >
          <p className="text-gray-400">
            {card.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-pink-500">
            {card.value}
          </h2>
        </div>
      ))}

    </div>
  );
}