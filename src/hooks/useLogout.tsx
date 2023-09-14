import { Navigate } from "react-router";

const useLogout = () => {
    return () => {
        window.localStorage.setItem("user", "");
        window.localStorage.setItem("session", "");
    };
}

export default useLogout;