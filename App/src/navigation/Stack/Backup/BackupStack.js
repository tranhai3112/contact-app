import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Backup from '../../../screens/Backup/Backup'
import Logined from '../../../screens/Backup/Logined'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { supabase } from '../../../Api/SupabaseApi'

const Stack = createNativeStackNavigator()

export default function BackupStack() {

    const [session, setSession] = useState()

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log(supabase.auth.session());
        })
    }, [])

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {session && session.user ? (
                <Stack.Screen name='Logined' component={Logined} />
            ) : (
                <Stack.Screen name='Backup' component={Backup} />
            )}
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})