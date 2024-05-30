import React, { createContext, useState } from 'react';

export const UserDetailsContext = createContext({});

const AuthProvider = props => {
    const [userDetails, setUserDetails] = useState(null)

    return <UserDetailsContext.Provider value={{userDetails,setUserDetails}}>
        {props.children}
    </UserDetailsContext.Provider>
}

export default AuthProvider;