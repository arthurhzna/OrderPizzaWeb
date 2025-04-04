import { useFetcher, ActionFunctionArgs } from 'react-router-dom';
import {Button} from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { OrderData } from '../../types';

export const UpdateOrder = ( {order} : {order : OrderData} ) => {
    const fetcher = useFetcher();
    return (
      <fetcher.Form method="PATCH" >
        <Button >Make priority</Button>
      </fetcher.Form>
    );
}

export async function action( {params} : ActionFunctionArgs) {
    const data = { priority: true };
    const orderId = params.orderId;
    if (!orderId) throw Error('Order ID is required');
    await updateOrder(orderId, data);
    return null;
  }