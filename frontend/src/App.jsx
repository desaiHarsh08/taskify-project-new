import React, { useState } from "react"
import Home from "./pages/Home"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root";
import HomeDefault from "./components/home/HomeDefault";
import AllTasks from "./pages/AllTasks";
import AllCustomers from "./pages/AllCustomers";
import Settings from "./pages/Settings";
import Task from "./pages/Task";
import AllTaskDefault from "./components/all-tasks/AllTaskDefault";
import FunctionView from "./pages/FunctionView";
import AllCustomersDefault from "./components/customers/AllCustomersDefault";
import Customer from "./pages/Customer";
import ForgetPassword from "./pages/ForgetPassword";
import ActivateAccount from "./pages/ActivateAccount";

const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Root /> },
        { path: "/forget-password", element: <ForgetPassword /> },
        { path: "/activate", element: <ActivateAccount /> },
        {
            path: "/home",
            element: <Home />,
            children: [
                { path: "", element: <HomeDefault /> },
                { 
                    path: "tasks", 
                    element: <AllTasks />,
                    children: [
                        { path: "", element: <AllTaskDefault /> },
                        { 
                            path: ":taskId", 
                            element: <Outlet />,
                            children: [
                                { path: "", element: <Task /> },
                                { path: ":functionId", element: <FunctionView /> },
                            ]
                        },
                    ]
                },
                { 
                    path: "customers", 
                    element: <AllCustomers />,
                    children: [
                        {
                            path: "",
                            element: <AllCustomersDefault />
                        },
                        {
                            path: ":customerId",
                            element: <Customer />
                        },

                    ] 
                },
                { path: "settings", element: <Settings /> },
            ]
        }
    ]);
    return <RouterProvider router={router} />
}

export default App