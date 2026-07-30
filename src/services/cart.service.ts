import { CartItem } from "@/types/cart";

const CART_KEY = "wearbychingu-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const exist = cart.find(
    (product) => product.id === item.id
  );

  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(id: number) {
  const cart = getCart().filter(
    (item) => item.id !== id
  );

  saveCart(cart);
}

export function increaseQty(id: number) {
  const cart = getCart();

  const item = cart.find(
    (product) => product.id === id
  );

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
}

export function decreaseQty(id: number) {
  const cart = getCart();

  const item = cart.find(
    (product) => product.id === id
  );

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}