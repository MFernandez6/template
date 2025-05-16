"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function WhatWeDo() {
  const services = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      title: "No-Fault Accident Form Filing",
      description: [
        "Easy-to-use form submission interface",
        "Secure document upload system",
        "Real-time form validation",
        "Automated error checking",
        "Instant submission confirmation",
      ],
    },
    {
      icon: <GavelIcon sx={{ fontSize: 40 }} />,
      title: "Attorney Matching",
      description: [
        "Nationwide network of experienced attorneys",
        "Specialized in no-fault accident cases",
        "Intelligent matching algorithm",
        "Attorney profiles and ratings",
        "Free initial consultation",
      ],
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Document Management",
      description: [
        "Cloud-based document storage",
        "End-to-end encryption",
        "Easy document sharing with attorneys",
        "Version control and history",
        "Mobile access to documents",
      ],
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      title: "Recovery Assistance",
      description: [
        "Insurance negotiation support",
        "Medical expense tracking",
        "Wage loss documentation",
        "Property damage assessment",
        "Settlement agreement review",
      ],
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          mb: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: "url('/images/long-logo-ClaimSaver.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              color: "white",
            }}
          >
            What We Do
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Comprehensive Accident Recovery Services
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Container
        maxWidth="lg"
        sx={{
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "1200px", width: "100%" }}
        >
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  width: "100%",
                  maxWidth: "500px",
                  mx: "auto",
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack spacing={2} sx={{ height: "100%" }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        color: "white",
                        minHeight: "100px",
                      }}
                    >
                      <Box sx={{ color: "white", flexShrink: 0 }}>
                        {service.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.2,
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Stack>
                    <List sx={{ flex: 1, p: 0, minHeight: "200px" }}>
                      {service.description.map((item, itemIndex) => (
                        <ListItem key={itemIndex} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.2,
                                textAlign: "left",
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
