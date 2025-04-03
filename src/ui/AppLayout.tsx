import {Header} from './Header';
import {Loader} from './Loader';
import {CartOverview} from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';

export const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    return (
        <div>
            {isLoading && <Loader/>}
            <Header/>
            <div>
                <main>
                    <Outlet/>
                </main>
            </div>
            <CartOverview />
        </div>
        
    )
}