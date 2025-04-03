import { useDispatch } from 'react-redux';
import { Button } from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';


export const UpdateItemQuantity = ({ pizzaId, currentQuantity }: { pizzaId: number, currentQuantity: number }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-2 md:gap-3">
        <Button
          onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        >
          -
        </Button>
            <span >{currentQuantity}</span>
        <Button
          onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        >
          +
        </Button>
      </div>
    );
};