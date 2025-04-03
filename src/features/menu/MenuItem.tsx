import { useDispatch, useSelector } from 'react-redux';
import {Button} from '../../ui/Button';
import {PizzaProps} from "../../types"
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import {UpdateItemQuantity} from "../cart/UpdateItemQuantity";
import {DeleteItem} from "../cart/DeleteItem";

export const MenuItem = ({pizza} : {pizza:PizzaProps}) => {
    const dispatch = useDispatch();
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    const currentQuantity = useSelector(getCurrentQuantityById(id));
    const isInCart = currentQuantity > 0;

    function handleAddToCart() {
        const newItem = {
          pizzaId: id,
          name : name,
          quantity: 1,
          unitPrice : unitPrice,
          totalPrice: unitPrice * 1,
        };
        console.log(newItem);
        dispatch(addItem(newItem));
      }

        return (
            <li className="flex gap-4 py-2">
            <img
              src={imageUrl}
              alt={name}
            />
            <div >
              <p >{name}</p>
              <p >
                {ingredients.join(', ')}
              </p>
              <div >
                {!soldOut ? (
                  <p >{formatCurrency(unitPrice)}</p>
                ) : (
                  <p >
                    Sold out
                  </p>
                )}
                {isInCart && (
                    <div>
                    <UpdateItemQuantity
                        pizzaId={id}
                        currentQuantity={currentQuantity}
                    />
                    <DeleteItem pizzaId={id} />
                    </div>
                )}

                {!soldOut && !isInCart && (
                    <Button onClick={handleAddToCart}>
                    Add to cart
                    </Button>
                )}
              </div>
            </div>
          </li>
        );
}