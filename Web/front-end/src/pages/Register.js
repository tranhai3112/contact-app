import React, { useState } from 'react';
import { useAuth } from "../compoments/Auth"
import { Button, Col, Form, Input, Row } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Register() {
    const auth = useAuth()
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const email = values.email
        const password = values.password
        const signUp = await auth.register(email, password)
        if (signUp.error) {
            setMessage(signUp.error.message)
        } else {
            navigate('/')
        }
    };

    return (
        <Row justify='center' align='middle' className='login_form'>
            <Col>
                <Row justify='center'>
                    <Col>
                        <h1>Sign up to Contact</h1>
                    </Col>
                    <Col span={24}>

                        <Form
                            name="basic"
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <div className='massage'>{message}</div>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type="primary" htmlType="submit">
                                    Sign up
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col>
                        You have account? <Link to='/'>Sign in</Link>
                    </Col>
                </Row>
            </Col >
        </Row >
    )
}
