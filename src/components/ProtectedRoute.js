import React, { useEffect, useRef } from 'react';
import { Route, useNavigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const navigate = useNavigate();
    const isLoggedIn = true;
    const timeout = useRef(null);

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        if (!isLoggedIn) {
            timeout.current = setTimeout(() => navigate('/login'), 1000);
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    return <Route {...props} />;
}
