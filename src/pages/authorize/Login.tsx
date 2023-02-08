import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'contexts/user';
import { useApi } from 'hooks/useApi';


export const PageLogin = () => {
    const { data, error, loading, request } = useApi();
    const { isAuthorized, setUser, setAccessToken} = useUserContext();


    const onFinish = (values: any) => {
        // console.log('Success:', values);
        // setUser({
        //     userName: "admin"
        // });
        // window.location.href="/"
        request({
            url: "/api/login",
            body: values,
            method: "POST"
        }).then(x=>{
            setAccessToken(x.accessToken);
            // window.location.href="/"
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (isAuthorized)
        return <Navigate to={"/"} />

    return <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    }}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: "auto", boxShadow: "-4px 4px 11px 2px #00000026", borderRadius: 6, padding: 15 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {
                error && <div style={{ color: "red" }}>{error}</div>
            }
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    </div>
};