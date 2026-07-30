import { supabase } from "@/lib/supabase";

import {
  Order,
  OrderItem,
  OrderWithItems,
} from "@/types/order";

export async function createOrder(
  order: Order,
  items: OrderItem[]
) {
  // ============================
  // DEBUG
  // ============================
  console.log("========== CREATE ORDER ==========");
  console.log("ORDER YANG AKAN DISIMPAN:", order);
  console.log("ITEMS:", items);

  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  console.log("HASIL INSERT:", data);
  console.log("ERROR INSERT:", error);

  if (error) {
    throw new Error(error.message);
  }

  const orderItems = items.map((item) => ({
    ...item,
    order_id: data.id,
  }));

  console.log("ORDER ITEMS YANG AKAN DISIMPAN:", orderItems);

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(orderItems);

  console.log("ERROR ITEM:", itemError);

  if (itemError) {
    throw new Error(itemError.message);
  }

  console.log("========== ORDER BERHASIL ==========");

  return data;
}

export async function getMyOrders(
  userId: string
): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  console.log("GET MY ORDERS:", data);
  console.log("GET MY ORDERS ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as OrderWithItems[];
}

export async function getAllOrders(): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .order("created_at", {
      ascending: false,
    });

  console.log("GET ALL ORDERS:", data);
  console.log("GET ALL ORDERS ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as OrderWithItems[];
}

export async function updateOrderStatus(
  id: number,
  status: string
) {
  console.log("UPDATE ORDER:", id, status);

  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  console.log("UPDATE ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getOrderById(
  id: number
): Promise<OrderWithItems> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .eq("id", id)
    .single();

  console.log("GET ORDER BY ID:", data);
  console.log("GET ORDER BY ID ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Order tidak ditemukan.");
  }

  return data as OrderWithItems;
}
