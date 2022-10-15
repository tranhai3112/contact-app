
import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../database/Database";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const userLocalStorage = JSON.parse(localStorage.getItem('supabase.auth.token'))
    const [user, setUser] = useState(userLocalStorage?.currentSession.user)

    const login = async (email, password) => {
        const { error, user } = await supabase.auth.signIn({ email, password })

        if (error) {
            console.log(error)
        }

        return { error, user }
    }

    const register = async (email, password) => {
        const { error, user } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log(error)
        }

        return { error }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        }

        setUser(null)
    }

    useEffect(() => {
        const user = supabase.auth.user()
        setUser(user)

        const auth = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user)
            }

            if (event === 'SIGNED_OUT') {
                setUser(null)
            }
        })

        return () => auth.data.unsubscribe()

    }, [])

    return {
        user,
        login,
        logout,
        register
    }

}