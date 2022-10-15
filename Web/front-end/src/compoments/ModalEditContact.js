import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { supabaseServer } from '../database/Database';

export default function ModalEditContact({ record, getAllContact, ...props }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [msg, setMsg] = useState()

    console.log(record);

    const showModalEditContact = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const EditContact = async (values) => {
        const firstName = values.firstName
        const lastName = values.lastName
        const phone = values.phone

        const { data, error } = await supabaseServer.from('contact')
            .update({ firstName, lastName, phone })
            .match('id', record.id)
        if (error) {
            setMsg(error.message)
        }
        else {
            getAllContact()
            handleCancel()
            message.success('Edited');
        }
    }

    return (
        <>
            <Button type='link' onClick={showModalEditContact}>
                Edit
            </Button>

            <Modal title="Edit contact" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form
                    layout='vertical'
                    name="basic"
                    onFinish={EditContact}
                    initialValues={{
                        lastName: record.lastName,
                        firstName: record.firstName,
                        phone: record.phone
                    }}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input />
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
