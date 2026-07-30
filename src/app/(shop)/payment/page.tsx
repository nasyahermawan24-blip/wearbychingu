import PaymentForm from "@/components/payment/PaymentForm";

interface Props {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function PaymentPage({
  searchParams,
}: Props) {
  const { order } =
    await searchParams;

  return (
    <PaymentForm
      orderId={order ?? ""}
    />
  );
}