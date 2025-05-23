import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation, ActionFunctionArgs } from 'react-router-dom';
import { RootState } from "../../store"
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import {EmptyCart} from '../cart/EmptyCart';
import { Button } from '../../ui/Button';
import { fetchAddress } from '../user/userSlice';
import { AppDispatch } from '../../store';  
import {formatCurrency} from '../../utils/helpers';
import {FormErrors, Order} from '../../types';
import { createOrder } from "../../services/apiRestaurant";
import store from '../../store';

const isValidPhone = (str: string) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );

export const CreateOrder = () => {
    const [withPriority, setWithPriority] = useState<boolean>(false);
    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation();
    const isLoadingAddress = addressStatus === 'loading';
    const isSubmitting = navigation.state === 'submitting';

    const formErrors = useActionData();
    const dispatch = useDispatch<AppDispatch>();

    
    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);

    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;
  
    if (!cart.length) return <EmptyCart />;

    function handleSubmit() {  // Remove the event parameter
        dispatch(fetchAddress());  // Remove e.preventDefault()
    }

    return (
        <div className="px-4 py-6">
        <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
  
        {/* <Form method="POST" action="/order/new"> */}
        <Form method="POST">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label  className="sm:basis-40">First Name</label>
            <input
              className="input grow"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
  
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label  className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input  className="input w-full" type="tel"  name="phone" required />
              {formErrors?.phone && (
                <p>
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>
  
          <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="grow">
              <input
                className="input w-full"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {addressStatus === 'error' && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>
  
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={handleSubmit}>   
                  Get position
                </Button>
              </span>
            )}
          </div>
  
          <div className="mb-12 flex items-center gap-5">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              checked={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="font-medium">
              Want to yo give your order priority?
            </label>
          </div>
  
          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.longitude && position.latitude
                  ? `${position.latitude},${position.longitude}`
                  : ''
              }
            />
  
            <Button disabled={isSubmitting || isLoadingAddress} type="primary">
              {isSubmitting
                ? 'Placing order....'
                : `Order now from ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      </div>
    );
}



export async function action({ request } : ActionFunctionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
  
    const order = {
      ...data,
      cart: JSON.parse(data.cart as string),
      priority: data.priority === 'true',
    } as Order;
  
    console.log(order);
  
    const errors : FormErrors = {};
    if (!isValidPhone(order.phone))
      errors.phone =
        'Please give us your correct phone number. We might need it to contact you.';
  
    if (Object.keys(errors).length > 0) return errors;
  
    // If everything is okay, create new order and redirect
    const newOrder = await createOrder(order);
  
    // Do NOT overuse
    store.dispatch(clearCart());
  
    return redirect(`/order/${newOrder.id}`);
  }
  