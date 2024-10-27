// /src/components/Footer.js

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/logo.svg'; // Ensure this path is correct
import NewsletterForm from './NewsletterForm'; // Import the NewsletterForm

const logoStyle = {
  width: '157px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'© '}
      <Link href="/" color="inherit">
        Healing Homoeopathy
      </Link>{' '}
      {new Date().getFullYear()}
      {'. All rights reserved.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: 'background.paper',
        py: { xs: 4, sm: 8 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              mb: { xs: 4, sm: 0 },
            }}
          >
            <img
              src={logo} // Update with the actual path to your logo
              style={logoStyle}
              alt="Healing Homoeopathy Logo"
            />
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Subscribe to our newsletter for updates and wellness tips.
            </Typography>
            <NewsletterForm /> {/* Replacing the form with NewsletterForm component */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Sitemap
            </Typography>
            <Link href="/" color="text.secondary">
              Home
            </Link>
            <Link href="/about" color="text.secondary">
              About Us
            </Link>
            <Link href="/services" color="text.secondary">
              Services
            </Link>
            <Link href="/blogs" color="text.secondary">
              Blogs
            </Link>
            <Link href="/contact" color="text.secondary">
              Contact Us
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Support
            </Typography>
            <Link href="/faq" color="text.secondary">
              FAQ
            </Link>
            <Link href="/terms" color="text.secondary">
              Terms of Service
            </Link>
            <Link href="/privacy" color="text.secondary">
              Privacy Policy
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Get Involved
            </Typography>
            <Link href="/careers" color="text.secondary">
              Careers
            </Link>
            <Link href="/volunteer" color="text.secondary">
              Volunteer
            </Link>
            <Link href="/donate" color="text.secondary">
              Donate
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@healinghomoeopathy.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +123 456 7890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Wellness Lane, Health City
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Copyright />
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              href="https://facebook.com"
              aria-label="Facebook"
              sx={{ color: 'text.secondary' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              aria-label="Twitter"
              sx={{ color: 'text.secondary' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://linkedin.com"
              aria-label="LinkedIn"
              sx={{ color: 'text.secondary' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
