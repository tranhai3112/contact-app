import React from 'react'
import { Button } from 'antd';
import { useAuth } from '../compoments/Auth';
import { supabase } from '../database/Database';

function Home() {
    const auth = useAuth();

    const logout = () => {
        auth.logout()
    }

    const getContact = async () => {
        const data = await supabase
            .from('contact')
            .select()
        console.log(data);
    }

    return (
        <>HOME
            <Button onClick={logout}>
                Logout
            </Button>

            <Button onClick={getContact}>
                Get
            </Button>
        </>
    )
}

export default Home