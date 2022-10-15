import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../compoments/LayoutAdmin';
import ModalEditUser from '../compoments/ModalEditUser';
import { supabaseServer } from '../database/Database';
import Highlighter from 'react-highlight-words';

export default function User() {



    const [form] = Form.useForm();
    const [dataUser, setDataUser] = useState([])
    const [loadingTable, setLoadingTable] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getAllUser()
    }, [])

    const showModalCreateUser = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getAllUser = async () => {
        setLoadingTable(true)
        const { data, error } = await supabaseServer.auth.api.listUsers()
        if (data) {
            setDataUser(data)
        }
        setLoadingTable(false)
    }

    const deleteUser = async (id) => {

        Modal.confirm({
            title: 'Notification',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete the user?',
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk: async () => {
                const { error } = await supabaseServer
                    .from('contact')
                    .delete()
                    .eq('user_id', id)

                const { error: errorDeleteUser } = await supabaseServer.auth.api.deleteUser(
                    id
                )
                if (error || errorDeleteUser) {
                    message.error('Server error');
                } else {

                    getAllUser()
                }
            }
        });

    }

    const CreateUser = async (values) => {
        const email = values.email
        const password = values.password
        const { data: user, error } = await supabaseServer.auth.api.createUser({ email, password })

        if (error) {
            message.error(error.message);
        } else {
            getAllUser()
            handleCancel()
            form.resetFields();
        }
    }


    //START SEARCH USER

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //end search email user

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Create At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            render: (_, record) => <>
                <ModalEditUser record={record} getAllUser={getAllUser} />
                <Button type="link" onClick={() => deleteUser(record.id)}>
                    Delete
                </Button>
                <Link to='/contact' state={{ user_id: record.id, email: record.email }}><Button type="link">
                    Contact
                </Button></Link>
            </>
        },
    ];

    return (
        <LayoutAdmin>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Button type='primary' onClick={showModalCreateUser}>Create User</Button>
                </Col>

                <Modal title="Create user" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                    <Form
                        form={form}
                        layout='vertical'
                        name="form"
                        onFinish={CreateUser}
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

                <Col span={24}>
                    <Table dataSource={dataUser} columns={columns} pagination={{ position: ['bottomCenter'] }} bordered loading={loadingTable} />
                </Col>
            </Row>
        </LayoutAdmin>
    )
}


