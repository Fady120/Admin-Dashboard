import React, {useState} from 'react';

export const ThemeContext = React.createContext();

export function ThemeProvider1(Props){
    const [mode, setMode] = useState("dark");

    return (
        <ThemeContext.Provider value={{mode, setMode}}>
            {Props.children}
        </ThemeContext.Provider>
    );

}