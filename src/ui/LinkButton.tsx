import { Link, useNavigate } from 'react-router-dom';
import {LinkButtonProps} from '../types';


export const LinkButton = ({children, to}: LinkButtonProps) => {
    const navigate = useNavigate();

    if (to === '-1')
        return (
          <button onClick={() => navigate(-1)}>
            {children}
          </button>
        );

    return (
        <Link to={to}>
            {children}
        </Link>
    );
}