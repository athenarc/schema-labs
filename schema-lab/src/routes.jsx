import React, { useContext } from "react";
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./Home";
import Auth from "./auth";
import Logout from "./auth/Logout";
import Dashboard from "./dashboard";
import Base from "./layouts/Base";
import { UserDetailsContext } from "./utils/components/auth/AuthProvider";
import UserPreferencesView from "./client/ClientPreferencesView";
import Details from "./dashboard/tasks/details";
import Executors from "./dashboard/tasks/details/Executors";
import Stdout from "./dashboard/tasks/details/Stdout";
import Outputs from "./dashboard/tasks/details/Outputs"
import Stderr from "./dashboard/tasks/details/Stderr"
import Inputs from "./dashboard/tasks/details/Inputs"
import Status from "./dashboard/tasks/details/Status"
import Name from "./dashboard/tasks/details/Name"

const ProtectedRoutes = () => {
    const { userDetails } = useContext(UserDetailsContext);
    if (userDetails) {
        return <Outlet />;
    }
    else {
        return <Navigate to={"/auth"} />;
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Base />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/logout" element={<Logout />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/preferences" element={<UserPreferencesView />} />
                <Route path="/task-details/:uuid" element={<Details />}>
                    <Route index element={<Name to="name" />} />
                    <Route path="name" element={<Name />} />
                    <Route path="status" element={<Status />} />
                    <Route path="executors" element={<Executors />} />
                    <Route path="stdout" element={<Stdout />} />
                    <Route path="stderr" element={<Stderr />} />
                    <Route path="inputs" element={<Inputs />} />
                    <Route path="outputs" element={<Outputs />} />
                </Route>
               
            </Route>
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
    )
);

export default router;