import {LinkButton} from '../../ui/LinkButton';
import {Button} from '../../ui/Button';
import {CartItem} from './CartItem';
import {EmptyCart} from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { RootState } from '../../store';

export const Cart = () => {
    const username = useSelector((state: RootState) => state.user.username);
    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    if (!cart.length) return <EmptyCart />;

    return (
        <div>
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2>Your cart, {username}</h2>

            <ul>
            {cart.map((item) => (
                <CartItem item={item} key={item.pizzaId} />
            ))}
            </ul>
            <div >
            <Button to="/order/new">
                Order pizzas
            </Button>

            <Button onClick={() => dispatch(clearCart())}>
                Clear cart
            </Button>
        </div>

        </div>

    );
}