"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SecurityIcon from "@mui/icons-material/Security";
import SupportIcon from "@mui/icons-material/Support";

export default function WhoWeAre() {
  const theme = useTheme();

  const values = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: "Our Mission",
      description:
        "To simplify the accident claim process and help victims recover the compensation they deserve through innovative technology and expert legal support.",
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: "Our Vision",
      description:
        "To become the leading platform for accident victims, providing seamless access to legal resources and ensuring fair compensation for all.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Our Values",
      description:
        "We are committed to transparency, integrity, and putting our clients first. We believe in making legal support accessible to everyone.",
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: "Our Support",
      description:
        "Our dedicated team is available to assist you throughout your recovery journey, providing personalized support and guidance.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, md: 10 },
          mb: { xs: 4, md: 8 },
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
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Who We Are
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              maxWidth: 800,
              mx: "auto",
              opacity: 0.9,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            Your Trusted Partner in Accident Recovery
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About ClaimSaver+
          </Typography>
          <Stack
            spacing={4}
            sx={{
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                color: "text.secondary",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60px",
                  height: "3px",
                  background:
                    "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  borderRadius: "2px",
                },
              }}
            >
              ClaimSaver+ is a revolutionary platform designed to simplify the
              process of filing no-fault accident forms and recovering
              compensation for accident victims. We understand that dealing with
              the aftermath of an accident can be overwhelming, which is why
              we&apos;ve created a user-friendly solution that connects you with
              experienced attorneys nationwide.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              Our platform combines cutting-edge technology with expert legal
              knowledge to ensure that you receive the support and compensation
              you deserve. We believe that everyone should have access to
              quality legal representation, regardless of their circumstances.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              At ClaimSaver+, we&apos;re committed to making the legal process
              as smooth and stress-free as possible. Our team of professionals
              works tirelessly to ensure that your case receives the attention
              it deserves, and we&apos;re here to guide you every step of the
              way.
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 6 },
          }}
        >
          <Box
            component="img"
            src="/images/family.jpg"
            alt="ClaimSaver+ Family"
            sx={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        </Box>

        {/* Family Story Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mt: { xs: 6, md: 10 },
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Family Story
          </Typography>
          <Stack
            spacing={4}
            sx={{
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              ClaimSaver+ was born from a personal experience. After our family
              faced the challenges of navigating the complex world of accident
              claims and legal fees, we realized there had to be a better way.
              We created this platform to help families like ours avoid the
              financial burden of traditional legal services during already
              difficult times.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                color: "text.secondary",
              }}
            >
              Our mission is simple: to make quality legal support accessible
              and affordable for every family. We believe that when life throws
              unexpected challenges your way, you shouldn&apos;t have to worry
              about the cost of getting the help you deserve.
            </Typography>
          </Stack>
        </Box>

        {/* Values Section */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 6,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Core Values
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ maxWidth: "1200px", mx: "auto" }}
          >
            {values.map((value, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    width: "100%",
                    maxWidth: "500px",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction="column"
                      spacing={3}
                      alignItems="center"
                      textAlign="center"
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          bgcolor: "primary.light",
                          opacity: 0.1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src="/images/logo-red-blue.jpg"
                          alt="ClaimSaver+ Logo"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.8,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "primary.main",
                            zIndex: 1,
                          }}
                        >
                          {value.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: "1.1rem",
                        }}
                      >
                        {value.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
