import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import NotFound from '../components/404/404';
import AddQuestion from '../features/trivia/AddQuestion';
import { Login, Register } from '../features/guest/auth';
import Hero from '../features/guest/home/Hero';
import Home from '../features/guest/home/Home';
import Copyright from '../components/Copyright';
import Feedback from '../features/guest/feedback/Feedback';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function GuestLayoyt() {
    const classes = useStyles();
    const { pathname } = useLocation();
    const mdSize = pathname === '/' ? 8 : 12;

    return (
        <Container maxWidth="lg">
            <Header title="Blog" />
            <main>
                <Routes>
                    <Route path="/" element={<Hero />} />
                </Routes>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={mdSize}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="questions/add"
                                element={<AddQuestion />}
                            />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="feedback" element={<Feedback />} />
                            <Route
                                path="*"
                                element={<NotFound parent="admin" />}
                            />
                        </Routes>
                    </Grid>
                    <Routes>
                        <Sidebar />
                    </Routes>
                </Grid>
            </main>
            <Copyright />
        </Container>
    );
}
