import { useFetcher, useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import {formatCurrency, formatDate, calcMinutesLeft} from '../../utils/helpers';
import {getOrder} from "../../services/apiRestaurant"
import {OrderItem} from "./OrderItem"
import { useEffect } from 'react';
import {UpdateOrder} from './UpdateOrder';
import { OrderData } from '../../types';



export const Order = () => {
    const order = useLoaderData() as OrderData;
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
      } = order;
    console.log(order);
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    const fetcher = useFetcher();

    useEffect(
      function () {
        if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      },
      [fetcher]
    );

    return (
        <div className="space-y-8 px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Order #{id} status</h2>
    
            <div className="space-x-2">
              {priority && (
                <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                  Priority
                </span>
              )}
              <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                {status} order
              </span>
            </div>
          </div>
    
          <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
            <p className="font-medium">
              {deliveryIn >= 0
                ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                : 'Order should have arrived'}
            </p>
            <p className="text-xs text-stone-500">
              (Estimated delivery: {formatDate(estimatedDelivery)})
            </p>
          </div>
    
          <ul className="dive-stone-200 divide-y border-b border-t">
            {cart.map((item) => (
              <OrderItem
                item={item}
                key={item.pizzaId}
                isLoadingIngredients={fetcher.state === 'loading'}
                ingredients={
                  fetcher?.data?.find((el: { id: number, ingredients: string[] }) => el.id === item.pizzaId)
                    ?.ingredients ?? []
                }
              />
            ))}
          </ul>
    
          <div className="space-y-2 bg-stone-200 px-6 py-5">
            <p className="text-sm font-medium text-stone-600">
              Price pizza: {formatCurrency(orderPrice)}
            </p>
            {priority && (
              <p className="text-sm font-medium text-stone-600">
                Price priority: {formatCurrency(priorityPrice)}
              </p>
            )}
            <p className="font-bold">
              To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
            </p>
          </div>
    
          {!priority && <UpdateOrder order={order} />}
        </div>
      );
}

export async function loader({ params }: LoaderFunctionArgs) {
    const orderId = params.orderId;
    if (!orderId) {
        throw new Error('Order ID is required');
    }
    const order = await getOrder(orderId);
    return order;
}