import { Link } from 'react-router-dom';
import {ButtonProps} from '../types';

export const Button = ({ children, disabled, to, onClick }: ButtonProps) => {

    if (to)
        return (
            <Link to={to} >
                {children}
            </Link>
        );

    if (onClick)
        return (
            <button onClick={onClick} disabled={disabled}>
                {children}
            </button>
        );

    return (
        <button disabled={disabled}>
            {children}
        </button>
    );
}