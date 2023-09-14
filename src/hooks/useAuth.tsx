import { Navigate } from "react-router";

const useAuth = () => {
    const token = window.localStorage.getItem("session");

    if (!token) {
        return <Navigate to="/Login" />;
    }

    return '';
}

export default useAuth;