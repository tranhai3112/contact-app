import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import LayoutAdmin from '../compoments/LayoutAdmin'
import ModalEditContact from '../compoments/ModalEditContact';
import { supabaseServer } from '../database/Database';

export default function Contact() {

    const location = useLocation()

    const user_id = location.state?.user_id
    const email = location.state?.email

    const [dataContact, setDataContact] = useState([])
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm();


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModalCreateUser = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        getContact()
    }, [])

    const getContact = async () => {
        setLoading(true)
        if (user_id) {
            const { data: contact, error } = await supabaseServer
                .from('contact')
                .select()
                .eq('user_id', user_id)
            if (error) {
                return message.error(error.message);
            }
            setDataContact(contact)
        } else {
            const { data: contact, error } = await supabaseServer
                .from('contact')
                .select()
            if (error) {
                return message.error(error.message);
            }

            setDataContact(contact);
        }
        setLoading(false)
    }

    const CreateContact = async (values) => {
        const firstName = values.firstName
        const lastName = values.lastName
        const phone = values.phone
        const { error } = await supabaseServer.from('contact').insert([
            { user_id, firstName, lastName, phone }
        ])

        if (error) {
            message.error(error.message);
        } else {
            getContact()
            handleCancel()
            form.resetFields();
        }
    }

    const deleteContact = async (id) => {

        Modal.confirm({
            title: 'Notification',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete the contact?',
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk: async () => {
                const { error } = await supabaseServer
                    .from('contact')
                    .delete()
                    .eq('id', id)

                if (error) {
                    return message.error(error.message);
                } else {
                    getContact()
                }
            }
        });

    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'User Id',
            dataIndex: 'user_id',
            key: 'user_id'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },

        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'operation',
            render: (_, record) => <>
                <ModalEditContact record={record} getAllContact={getContact} />
                <Button type="link" onClick={() => deleteContact(record.id)}>
                    Delete
                </Button>
            </>
        },
    ];

    return (
        <LayoutAdmin>
            <Row gutter={[24, 24]}>
                {
                    email ? <>
                        <Col span={24}>
                            Email: {email}
                        </Col>
                        <Col span={24}>
                            <Button type='primary' onClick={showModalCreateUser}>Create Contact</Button>
                        </Col>



                        <Modal title="Create contact" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                            <Form
                                form={form}
                                layout='vertical'
                                name="form"
                                onFinish={CreateContact}
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
                                    <InputNumber />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Create
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                        :
                        <Col span={24}>
                            All Contacts
                        </Col>
                }

                <Col span={24}>
                    <Table dataSource={dataContact} columns={columns} pagination={{ position: ['bottomCenter'] }} bordered loading={loading} />
                </Col>
            </Row>
        </LayoutAdmin >
    )
}
