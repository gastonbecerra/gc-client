import React from 'react';
import { useState, useEffect } from 'react';

export const UserContext = React.createContext([]);

function UserContextProvider (props) {
    const [user, setUser] = useState(false);
    const [context, setContext] = useState(false);

    useEffect(()=>{
        console.log(context);
    },[context])

    return(
        <UserContext.Provider value={{
            user,
            setUser,
            context,
            setContext
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;