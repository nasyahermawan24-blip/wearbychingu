import { notFound } from "next/navigation";

import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/services/product.service";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(Number(id));
  } catch (error) {
    console.error(error);
    notFound();
  }

  return <ProductDetail product={product} />;
}
