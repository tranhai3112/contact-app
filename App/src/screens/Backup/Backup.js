import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Button, CheckBox, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginApi, registerApi, supabase } from '../../Api/SupabaseApi';

export default function Backup() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState()
    const [checked, setChecked] = React.useState(false);

    const login = async () => {
        setLoading(true)
        const { user, error } = await loginApi(
            email,
            password
        )

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    useEffect(() => {
        getUrl()
    }, [])

    const getUrl = async () => {
        const a = await Linking.getInitialURL()
        console.log(a);
    }

    const register = async () => {
        setLoading(true)
        const { user, error } = await registerApi(
            email,
            password
        )

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Button style={[styles.button, styles.buttonLoginGoogle]}>
                    <Icon name="logo-google" size={20} color="white" /> <Text> Login with Google</Text>
                </Button>
                <Button style={styles.button} >
                    <Icon name="logo-apple" size={20} color="white" /> <Text> Login with Apple</Text>
                </Button>
                <Button style={styles.button} >
                    <Icon name="call" size={20} color="white" /> <Text> Login with Phone</Text>
                </Button>

                <Input
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={nextValue => setEmail(nextValue)}
                />

                <Input
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={nextValue => setPassword(nextValue)}
                />

                <CheckBox
                    style={styles.input}
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}>
                    I have an account
                </CheckBox>

                {checked ?
                    <Button style={styles.button} onPress={login}>
                        Login
                    </Button>
                    :
                    <Button style={styles.button} onPress={register}>
                        Register
                    </Button>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    buttonLoginGoogle: {
        backgroundColor: '#d0463b',
        borderColor: "#d0463b"
    },
    button: {
        marginBottom: 20
    },
    input: {
        marginBottom: 20
    }
})