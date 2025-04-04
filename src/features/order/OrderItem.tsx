import { formatCurrency } from '../../utils/helpers';
import {OrderProps} from "../../types"

export const OrderItem = ({ item, isLoadingIngredients, ingredients } : OrderProps ) => {
    const { quantity, name, totalPrice } = item;
    return (
        <li>
        <div>
          <p>
            <span>{quantity}&times;</span> {name}
          </p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        <p>
          {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
        </p>
      </li>
        
    )
} 
