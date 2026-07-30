"use client";

import { useEffect, useState } from "react";

import { getOrderById } from "@/services/order.service";
import { OrderWithItems } from "@/types/order";

import PaymentSummary from "./PaymentSummary";
import UploadProof from "./UploadProof";

interface Props {
  orderId: string;
}

export default function PaymentForm({
  orderId,
}: Props) {
  const [order, setOrder] =
    useState<OrderWithItems | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const data =
          await getOrderById(Number(orderId));

        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (Number.isInteger(Number(orderId)) && Number(orderId) > 0) {
      loadOrder();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        Loading...
      </section>
    );
  }

  if (!order) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        Order tidak ditemukan.
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold">
        Pembayaran
      </h1>

      <div className="mt-10 space-y-8">

        <PaymentSummary
          order={order}
        />

        <UploadProof
          order={order}
        />

      </div>

    </section>
  );
}
