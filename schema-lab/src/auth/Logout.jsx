import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";
import { rmCookie } from "../utils/cookies";

const Logout = () => {
    const { setUserDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();
    useEffect(() => {
        setUserDetails(null);
        rmCookie();
        navigate('/')
    }, []);
    return null;
}

export default Logout;