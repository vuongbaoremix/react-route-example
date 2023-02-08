import React from 'react';
import { Button, MenuProps } from 'antd';
import { Layout, Menu, } from 'antd';
import { useUserContext } from 'contexts/user';

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

export const Header = () => {
    const { user, logout, isAuthorized } = useUserContext();

    return <Layout.Header className="header">
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}

        <span style={{ color: "white", marginRight: 15 }}>
            {user?.username}

        </span>
        {
            isAuthorized && <Button onClick={logout}>Logout</Button>
        }
    </Layout.Header>
}