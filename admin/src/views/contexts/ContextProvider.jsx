import {createContext, useContext, useState} from "react";

const StateContext =  createContext({
    user: null,
    token: null,
    error: {
        message: null,
        show: false
    },
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ({children}) => {
    const [ user, setUser ] = useState({})
    const [ token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const [ error, setError ] = useState({message: '', show: false})

    const showError = (message) => {
        setError({message, show: true})
        setTimeout(() => {
            setError({message: '', show: false})
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            error,
            showError
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
