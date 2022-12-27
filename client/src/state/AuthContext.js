import React, {useState, useEffect} from 'react';

export const AuthContext = React.createContext();

export function AuthProvider(Props){
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const email = localStorage.getItem('email');
        const id = localStorage.getItem('id');

        if(email){
            setAuth({email, id});
        }

    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {Props.children}
        </AuthContext.Provider>
    );

}