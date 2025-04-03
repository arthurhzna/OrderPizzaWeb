import { CreateUser } from "../features/user/CreateUser"
import { useSelector } from "react-redux";
import { RootState } from "../store"; 
import { Button } from "../ui/Button";

export const Home = () => {
    const username = useSelector((state: RootState) => state.user.username);
    return (
        <div>
            <h1>The best pizza.</h1>
            <br/>
            <span>Straight out of the oven, straight to you.</span>
            {username === '' ? (
                <CreateUser />
            ) : (
                <Button to="/menu">
                    Continue ordering, {username}
                </Button>
            )}
        </div>
    );
}