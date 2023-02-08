import React, { createContext, useContext } from "react";

export type User = {
    username: string;
}

export type UserContextType = {
    user?: User,
    isAuthorized?: boolean,
    accessToken?: string;
    setUser: (user: User) => void,
    setAccessToken: (token: string) => void,
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({} as any);

export const useUserContext = () => {
    return useContext(UserContext);
}

const accessToken = localStorage.getItem("AccessToken");

export const UserProvider: React.FC<{ children: any }> = ({ children }) => {
    const [value, setValue] = React.useState<UserContextType>({ accessToken } as any);
    React.useEffect(() => {
        fetch("/api/login-info", {
            headers: {
                "Authorization": value.accessToken ?? ''
            }
        }).then(response => response.json())
            .then(data => setValue({
                ...value,
                user: data,
                isAuthorized: !!data.username
            } as any))
    }, [value.accessToken])
    value.setUser = (user) => {
        setValue({
            user: user,
            isAuthorized: true
        } as any)
    };

    value.setAccessToken = (token) => {
        setValue({
            ...value,
            accessToken: token
        })

        localStorage.setItem("AccessToken", token)
    };

    value.logout = () => {
        setValue({} as any);
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

