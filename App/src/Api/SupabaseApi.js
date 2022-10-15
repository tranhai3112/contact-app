import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ktfwmsobnsvqenqdjvdw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Zndtc29ibnN2cWVucWRqdmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyMTIwNDMsImV4cCI6MTk3NTc4ODA0M30.epZpfJNd2Urx9VrjtIE7diRCcywwUBNkxgqS_6MV4l8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
});

export const loginApi = async (email, password) => {

    let { data, error } = await supabase.auth.signIn({
        email,
        password
    })
    if (data) {
        await AsyncStorage.setItem('user', JSON.stringify(data))
    }
    return { data, error }
}

export const registerApi = async (email, password) => {

    let { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    return { data, error }
}