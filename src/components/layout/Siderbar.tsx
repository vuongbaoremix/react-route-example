import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const Siderbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onSelect={(ev) => {
                navigate("/ex" + ev.key)
            }}
            items={[
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'nav 1',
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'nav 2',
                },
                {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'nav 3',
                },
            ]}
        />
    </Sider>
}