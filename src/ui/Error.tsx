import { useRouteError } from "react-router-dom";
import {LinkButton} from "./LinkButton";
import {RouterError} from "../types";

export const Error = () => {
    const error  = useRouteError() as RouterError;
    console.log(error);
    return (
    <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
        <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>

    );
}