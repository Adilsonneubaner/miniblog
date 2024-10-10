import {app, db} from '../firebase/config'

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth(app)

    function checkIfIsCancelled() {
        if(cancelled){
            return
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            
            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage
            if(error.message.includes('Password')){
                systemErrorMessage = 'A senha deve ter no mínimo 6 caracteres.'
            }else if( error.message.includes('email-already')){
                systemErrorMessage = 'E-mail já cadastrado.'
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }

            setLoading(false)

            setError(systemErrorMessage)
        }

    }

    // logout
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // login
    const login = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)

            setLoading(false)
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("invalid-credential")){
                systemErrorMessage = 'Usuário não encontrado ou senha incorreta'
            }else{
                systemErrorMessage = 'Ocorreu um erro, tente mais tarde'
            }

            setError(systemErrorMessage)

            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}