"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 8,
        mt: "auto",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #1976d2 0%, #ffffff 100%)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: "1.25rem",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.9)" }} />
                <Link
                  href="mailto:info@claimsaverplus.com"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                    transition: "color 0.2s",
                  }}
                >
                  info@claimsaverplus.com
                </Link>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon sx={{ color: "rgba(255, 255, 255, 0.9)" }} />
                <Link
                  href="tel:+17864173869"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                    transition: "color 0.2s",
                  }}
                >
                  (786) 417-3869
                </Link>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <LocationOnIcon
                  sx={{ color: "rgba(255, 255, 255, 0.9)", mt: 0.5 }}
                />
                <Typography>
                  123 Biscayne Blvd
                  <br />
                  Miami, FL 33132
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: "1.25rem",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {[
                { text: "What We Do", href: "/what-we-do" },
                { text: "Who We Are", href: "/who-we-are" },
                { text: "Pricing", href: "/pricing" },
                { text: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                    transition: "color 0.2s",
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* About & Social */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: "1.25rem",
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              About ClaimSaver+
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ mb: 3, opacity: 0.9 }}
            >
              Dedicated to helping accident victims maximize their settlements
              while minimizing unnecessary costs.
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontStyle: "italic", mb: 3 }}
            >
              Established 2020
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                  transition: "color 0.2s",
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                  transition: "color 0.2s",
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                  transition: "color 0.2s",
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  "&:hover": { color: "rgba(255, 255, 255, 0.7)" },
                  transition: "color 0.2s",
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} ClaimSaver+. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
