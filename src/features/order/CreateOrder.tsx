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
        <div>
        <h2>Ready to order? Let's go!</h2>
  
        {/* <Form method="POST" action="/order/new"> */}
        <Form method="POST">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
  
          <div>
            <label>Phone number</label>
            <div>
              <input type="tel"  name="phone" required />
              {formErrors?.phone && (
                <p>
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>
  
          <div>
            <label>Address</label>
            <div>
              <input
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {addressStatus === 'error' && (
                <p>
                  {errorAddress}
                </p>
              )}
            </div>
  
            {!position.latitude && !position.longitude && (
              <span>
                <Button
                  disabled={isLoadingAddress}
                  onClick={handleSubmit}>   
                  Get position
                </Button>
              </span>
            )}
          </div>
  
          <div>
            <input
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
  
            <Button disabled={isSubmitting || isLoadingAddress}>
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
  