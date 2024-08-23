import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AppState } from 'react-native'
import { router } from 'expo-router'

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
const SessionContext = createContext(
        {session:null}
)

export const useSessionContext=()=>useContext(SessionContext)

const SessionProvider = ({children}) => {
        const [session, setSession] = useState(null)
        useEffect(() => {
                const {data: { subscription }} = supabase.auth.onAuthStateChange(
                  (event, session) => {

                    if (event === 'SIGNED_OUT') {
                      setSession(session)
                    } else if (session) {
                      setSession(session)
                    }
                  })
            
                return () => {
                  subscription.unsubscribe()
                }
              }, []);
        return (
                <SessionContext.Provider value={{session:session}}>{children}</SessionContext.Provider>
        )
}

export default SessionProvider