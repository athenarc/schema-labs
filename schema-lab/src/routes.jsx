import React, { useContext } from "react";
import { Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./Home";
import Auth from "./auth";
import Logout from "./auth/Logout";
import Dashboard from "./dashboard";
import Base from "./layouts/Base";
import { UserDetailsContext } from "./utils/components/auth/AuthProvider";
import UserPreferencesView from "./client/ClientPreferencesView";

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
            </Route>
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
    )
);

export default router;