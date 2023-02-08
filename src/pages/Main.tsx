import { Layout } from "antd";
import { Header } from "components/layout/Header";
import { Siderbar } from "components/layout/Siderbar";
import { useUserContext } from "contexts/user";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const Main =()=>{
    const {isAuthorized} = useUserContext();
    if(!isAuthorized)
        return <Navigate to={"/login"}/>

    return <Layout className="main" style={{width:"100%", height: "100%"}}> 
        <Header/>
        <Layout>
            <Siderbar/>
            <Layout>
                <Outlet/>
            </Layout>
        </Layout>
    </Layout>
}