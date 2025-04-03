import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import {DeleteItem} from './DeleteItem';
import {UpdateItemQuantity} from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import { CartItemProps } from '../../types';

export const CartItem = ({item}: {item : CartItemProps}) => {
    const { pizzaId, name, quantity, totalPrice } = item;

    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

    return ( 
        <li>
        <p>
          {quantity}&times; {name}
        </p>
        <div>
          <p>{formatCurrency(totalPrice)}</p>
  
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </li>
    );
}