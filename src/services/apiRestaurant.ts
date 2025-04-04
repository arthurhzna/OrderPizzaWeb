import { PizzaProps, MenuData, Order } from "../types";

const API_URL = 'https://react-fast-pizza-api.jonas.io/api';


export async function getMenu(): Promise<PizzaProps[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw new Error("Failed getting menu");

  const { data }: MenuData = await res.json();
  return data;
}

export async function getOrder(id : string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder : Order ) {
  try { 
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(orderid: string, updateObj: { priority: boolean }) {
  try {
    const res = await fetch(`${API_URL}/order/${orderid}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}