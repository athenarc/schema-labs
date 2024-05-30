import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../utils/components/auth/AuthProvider";

const Logout = () => {
    const { setUserDetails } = useContext(UserDetailsContext);
    const navigate = useNavigate();
    useEffect(() => {
        setUserDetails(null);
        navigate('/')
    }, []);
    return null;
}

export default Logout;