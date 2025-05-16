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
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function Pricing() {
  const pricingInfo = [
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      title: "Our Flat Fee",
      description: [
        "One-time payment of $500",
        "No hidden fees or charges",
        "Transparent pricing structure",
        "No additional costs",
        "Full service included",
      ],
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40 }} />,
      title: "Traditional Costs",
      description: [
        "Average auto policy: $10,000",
        "Attorney contingency fee: 33%",
        "Net to victim: Less than $7,000",
        "Additional processing costs",
        "Hidden fees and charges",
      ],
    },
    {
      icon: <CompareArrowsIcon sx={{ fontSize: 40 }} />,
      title: "ClaimSaver+ Advantage",
      description: [
        "Keep 95% of your settlement",
        "No contingency fees",
        "Transparent flat rate",
        "Professional service",
        "Maximum recovery for you",
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
            Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Transparent, Fair, and Cost-Effective
          </Typography>
        </Container>
      </Box>

      {/* Pricing Section */}
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
          {pricingInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                        {info.icon}
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
                        {info.title}
                      </Typography>
                    </Stack>
                    <List sx={{ flex: 1, p: 0, minHeight: "200px" }}>
                      {info.description.map((item, itemIndex) => (
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

        {/* Value Proposition Section */}
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            maxWidth: "800px",
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 4,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose ClaimSaver+?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "text.secondary",
            }}
          >
            In Florida, the average auto policy payout is $10,000. With
            traditional methods, after a 33% attorney contingency fee, victims
            are left with less than $7,000 before additional processing costs.
            ClaimSaver+ revolutionizes this process with our flat $500 fee,
            allowing you to keep 95% of your settlement.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              fontSize: "1.2rem",
            }}
          >
            More Money in Your Pocket, Less Stress in Your Life
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
