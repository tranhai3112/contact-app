import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { supabaseServer } from '../database/Database';

export default function ModalEditUser({ record, getAllUser, ...props }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [msg, setMsg] = useState()

    const showModalEditUser = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const EditUser = async (values) => {
        const email = values.email
        const password = values.password
        const { data, error } = await supabaseServer.auth.api.updateUserById(
            record.id,
            { password, email }
        )
        if (error) {
            setMsg(error.message)
        }
        else {
            getAllUser()
            handleCancel()
            message.success('Edited');
        }
    }

    return (
        <>
            <Button type='link' onClick={showModalEditUser}>
                Edit
            </Button>

            <Modal title="Edit user" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form
                    layout='vertical'
                    name="basic"
                    initialValues={{ email: record.email }}
                    onFinish={EditUser}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className='message'>{msg}</div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
