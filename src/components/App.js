import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AdminLayout, GuestLayout } from '../layouts';

function App() {
    return (
        <Routes>
            <Route path="/*" element={<GuestLayout />} />
            <ProtectedRoute path="admin/*" element={<AdminLayout />} />
        </Routes>
    );
}

export default App;
