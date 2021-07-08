import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedinIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
}));

const social = [
    {
        name: 'GitHub',
        icon: GitHubIcon,
        url: 'https://github.com/PaulNegoescu',
    },
    {
        name: 'Facebook',
        icon: FacebookIcon,
        url: 'https://www.facebook.com/negoescu.paul/',
    },
    {
        name: 'LinkedIn',
        icon: LinkedinIcon,
        url: 'https://www.linkedin.com/in/paulnegoescu/',
    },
];

export default function Sidebar() {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                    About Me
                </Typography>
                <Typography paragraph>
                    I am the Head of Web Technologies and Managed Services at a
                    big company in Brasov, but in my heart I am, and always will
                    be, a web developer.
                </Typography>
                <Typography paragraph>
                    I am also a passionate trainer for both the very joung and
                    the very young at heart, loving to share my experience with
                    Scratch, JavaScript, React and anything else with anyone
                    who’d listen, both at work and during other endevours.
                </Typography>
                <Typography paragraph>
                    I'm a fun-loving person and make all the wrong jokes in all
                    the „right” situations.
                </Typography>
            </Paper>

            <Typography
                variant="h6"
                gutterBottom
                className={classes.sidebarSection}
            >
                Social
            </Typography>
            {social.map(({ icon: Icon, name, url }) => (
                <Link
                    display="block"
                    variant="body1"
                    href={url}
                    target="_blank"
                    key={name}
                >
                    <Grid container direction="row" alignItems="center">
                        <Icon />
                        &nbsp;
                        {url}
                    </Grid>
                </Link>
            ))}
        </Grid>
    );
}
