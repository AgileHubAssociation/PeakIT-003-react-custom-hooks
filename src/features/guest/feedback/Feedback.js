import React from 'react';
import Link from '@material-ui/core/Link';
import qrSrc from './qr.png';
import { Container, Typography } from '@material-ui/core';

export default function Feedback() {
    return (
        <Container align="center">
            <img src={qrSrc} alt="Feedback QR Code" />
            <Typography variant="h2">
                <Link href="http://bit.ly/peakit003-feedback">
                    http://bit.ly/peakit003-feedback
                </Link>
            </Typography>
            <iframe
                width="100%"
                height="600"
                src="http://bit.ly/peakit003-feedback"
                title="Feedback Form"
            ></iframe>
        </Container>
    );
}
