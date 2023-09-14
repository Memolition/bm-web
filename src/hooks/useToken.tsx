import { Navigate } from "react-router";

const useToken = () => {
    const token = window.localStorage.getItem("session");

    return token;
}

export default useToken;