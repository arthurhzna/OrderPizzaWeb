import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Username = () => {
    const username = useSelector((state: RootState) => state.user.username);

    if (!username) return null;

    return (
        <div>{username}</div>
    );

}