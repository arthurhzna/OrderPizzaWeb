import { Link } from 'react-router-dom';
import {SearchOrder} from '../features/order/SearchOrder';
import {Username} from '../features/user/Username';

export const Header = () => {
    return  (
        <header>
        <Link to="/">
          Fast React Pizza Co.
        </Link>
  
        <SearchOrder />
        <Username />
      </header>
    );
}