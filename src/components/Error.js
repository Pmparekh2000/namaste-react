import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log('error is', error);
    return (
        <div>
            <h1>Oops!!!</h1>
            <h2>Something went wrong!!</h2>
            <h3>Error data - {error.data}</h3>
            <h3>Error data - {error.error.message}</h3>
            <h3>Error data - {error.status}</h3>
            <h3>Error data - {error.statusText}</h3>
        </div>
    );
};

export default Error;
