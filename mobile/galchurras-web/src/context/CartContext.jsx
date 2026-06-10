import { createContext, useContext, useEffect, useState } from 'react';
import { butcherShops } from '../data/mockData';

const CartContext = createContext(null);
const STORAGE_KEY = 'galchurras-cart';

export function CartProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const cartShopId = entries[0]?.shopId ?? null;

  // O carrinho aceita um açougue por vez; trocar de açougue esvazia o atual (com confirmação)
  const add = (entry) => {
    if (entries.length > 0 && cartShopId !== entry.shopId) {
      const currentShop = butcherShops.find((s) => s.id === cartShopId);
      const ok = window.confirm(
        `Seu carrinho tem itens de ${currentShop?.name || 'outro açougue'}. Esvaziar e começar um pedido neste açougue?`
      );
      if (!ok) return false;
      setEntries([{ ...entry, qty: 1 }]);
      return true;
    }
    setEntries((prev) => {
      const existing = prev.find((e) => e.key === entry.key);
      if (existing) return prev.map((e) => (e.key === entry.key ? { ...e, qty: e.qty + 1 } : e));
      return [...prev, { ...entry, qty: 1 }];
    });
    return true;
  };

  const addKit = (shopKit, { promo = false } = {}) =>
    add({
      key: `kit-${shopKit.id}`,
      type: 'kit',
      shopId: shopKit.shopId,
      name: shopKit.name,
      detail: shopKit.serves,
      badge: shopKit.badge,
      items: shopKit.items,
      price: shopKit.price,
      image: shopKit.image,
      promo,
    });

  const addItem = (shopId, item) =>
    add({
      key: `item-${item.id}`,
      type: 'item',
      shopId,
      name: item.name,
      detail: item.unit,
      price: item.price,
      image: null,
    });

  const increment = (key) =>
    setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, qty: e.qty + 1 } : e)));

  const decrement = (key) =>
    setEntries((prev) =>
      prev.flatMap((e) => (e.key !== key ? [e] : e.qty > 1 ? [{ ...e, qty: e.qty - 1 }] : []))
    );

  const remove = (key) => setEntries((prev) => prev.filter((e) => e.key !== key));
  const clear = () => setEntries([]);

  const count = entries.reduce((acc, e) => acc + e.qty, 0);
  const subtotal = entries.reduce((acc, e) => acc + e.price * e.qty, 0);
  const qtyOf = (key) => entries.find((e) => e.key === key)?.qty || 0;

  return (
    <CartContext.Provider
      value={{ entries, cartShopId, addKit, addItem, increment, decrement, remove, clear, count, subtotal, qtyOf }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
