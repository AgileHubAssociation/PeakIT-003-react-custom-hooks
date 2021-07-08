import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    buttonSpacer: {
        marginRight: theme.spacing(1),
    },
    linkActive: {
        '&.active': {
            color: theme.palette.primary.light,
        },
    },
}));

const links = [
    { title: 'Home', url: '/' },
    { title: 'Feedback', url: '/feedback' },
];

export default function Header() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    PeakIT - React Hooks Workshop 2020
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.buttonSpacer}
                    component={NavLink}
                    to="/login"
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    to="/register"
                    component={NavLink}
                >
                    Register
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                className={classes.toolbarSecondary}
            >
                {links.map((link) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={link.title}
                        variant="body2"
                        className={clsx(
                            classes.toolbarLink,
                            classes.linkActive
                        )}
                        end
                        to={link.url}
                        component={NavLink}
                    >
                        {link.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};
