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
        <div>
          <div>
            <h2>Order #{id} status</h2>
    
            <div>
              {priority && (
                <span>
                  Priority
                </span>
              )}
              <span>
                {status} order
              </span>
            </div>
          </div>
    
          <div>
            <p>
              {deliveryIn >= 0
                ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                : 'Order should have arrived'}
            </p>
            <p>
              (Estimated delivery: {formatDate(estimatedDelivery)})
            </p>
          </div>
    
          <ul>
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
    
          <div>
            <p>
              Price pizza: {formatCurrency(orderPrice)}
            </p>
            {priority && (
              <p>
                Price priority: {formatCurrency(priorityPrice)}
              </p>
            )}
            <p>
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