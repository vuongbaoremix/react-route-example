import { createBrowserRouter } from 'react-router-dom';
import { Main } from 'pages/Main';
import { Header } from 'components/layout/Header';
import { PageLogin } from 'pages/authorize/Login';
import { ContainerExample1, ContainerExample2, ContainerExample3 } from 'components/Container';
 
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <PageLogin/>
    },
    {
    path: "/",
    element: <Main />,
    children:[ 
    {
        path: 'ex1', 
        element: <ContainerExample1/>
    },
    {
        path: 'ex2', 
        element: <ContainerExample2/>
    },
    {
        path: 'ex3', 
        element: <ContainerExample3/>
    }
]
}]);