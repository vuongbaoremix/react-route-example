import { useUserContext } from "contexts/user";
import React from "react";
import { RequestType } from "./useRequest";

export const useApi = <T>() => {
    const [data, setData] = React.useState<T | undefined>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>();
    const { accessToken } = useUserContext();

    const callRequest = (rq: RequestType) => {
        if (!loading)
            setLoading(true);

        return fetch(rq.url, {
            method: rq.method, // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                "Authentication": accessToken,
                ...rq.headers
            },
            body: rq.body ? JSON.stringify(rq.body) : undefined,
        })
            .then((response) => response.json())
            .then(rp => {
                setData(rp);

                return rp;
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