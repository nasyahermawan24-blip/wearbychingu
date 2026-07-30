import { supabase } from "@/lib/supabase";
import { PaymentWithOrder } from "@/types/payment";

export async function uploadPaymentProof(
  file: File
) {
  const ext =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}.${ext}`;

  const filePath =
    `proofs/${fileName}`;

  const { error } =
    await supabase.storage
      .from("payment-proofs")
      .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("payment-proofs")
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function createPayment(
  payment: {
    order_id: number;
    payment_method: string;
    proof_url: string;
  }
) {

  const { data, error } =
    await supabase
      .from("payments")
      .insert({
        order_id: payment.order_id,
        payment_method:
          payment.payment_method,
        proof_url: payment.proof_url,
        status: "pending",
      })
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

}

export async function getPayments(): Promise<PaymentWithOrder[]> {

  const { data, error } =
    await supabase
      .from("payments")
      .select(`
        *,
        orders(
          id,
          total,
          status,
          receiver_name,
          phone,
          user_id,
          profiles(
            full_name,
            phone
          )
        )
      `)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PaymentWithOrder[];

}

export async function verifyPayment(
  id: number,
  status: string
) {

  const { error } =
    await supabase
      .from("payments")
      .update({
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

}
