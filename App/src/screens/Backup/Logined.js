import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../Api/SupabaseApi';

export default function Logined() {
    const removeUser = () => {
        supabase.auth.signOut()
    }
    return (
        <View>
            <Text>Logined</Text>
            <Button onPress={removeUser}>Logout</Button>
        </View>
    )
}

const styles = StyleSheet.create({})