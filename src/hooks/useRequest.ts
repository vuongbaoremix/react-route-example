import { useUserContext } from "contexts/user";
import React from "react";


export type RequestType = {
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: any,
    headers?: any
};


export const useRequest = <T>({ url, method, body, headers }: RequestType) => {
    const [data, setData] = React.useState<T | undefined>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | undefined>();
    const { accessToken } = useUserContext();

    const callRequest = () => {
        if (!loading)
            setLoading(true);

        fetch(url, {
            method: method, // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                "Authentication": accessToken,
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((response) => response.json())
            .then(rp => {
                setData(rp);
            }).catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    return {
        data,
        loading,
        error,
        request: callRequest
    }
}