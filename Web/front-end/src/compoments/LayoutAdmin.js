import { Col, Menu, Row } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function LayoutAdmin({ children }) {

    const location = useLocation()

    return (
        <Row gutter={[32, 32]} justify='center'>
            <Col span={20}>
                <Menu mode="horizontal" selectedKeys={location.pathname}>
                    <Menu.Item key="/user">
                        <Link to='/user'>User</Link>
                    </Menu.Item>
                    <Menu.Item key="/contact">
                        <Link to='/contact'>Contact</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            <Col span={20}>
                {children}
            </Col>
        </Row>
    )
}
