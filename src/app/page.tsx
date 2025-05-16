"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "primary.main",
        }}
      >
        {/* Background Logo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          <Image
            src="/images/long-logo-ClaimSaver.jpg"
            alt="ClaimSaver Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Welcome to ClaimSaver+
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                mb: 1,
              }}
            >
              Your trusted partner in accident recovery
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => router.push("/dashboard")}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 8px rgba(0,0,0,0.2)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Video Section */}
      <Box sx={{ py: 8, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
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
              How ClaimSaver+ Works
            </Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: "800px",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                "& video": {
                  width: "100%",
                  height: "auto",
                  display: "block",
                },
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              >
                <source src="/images/Whiteboard.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
          Why Choose ClaimSaver+?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mt: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Easy Document Management
                </Typography>
                <Typography>
                  Upload and manage all your accident-related documents in one
                  secure place.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Expert Attorney Matching
                </Typography>
                <Typography>
                  Get connected with experienced attorneys who specialize in
                  your type of case.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Real-Time Updates
                </Typography>
                <Typography>
                  Stay informed about your case progress with instant
                  notifications and updates.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
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
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Join thousands of accident victims who have successfully recovered
              with ClaimSaver+
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/dashboard")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 8px rgba(0,0,0,0.2)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Start Your Recovery
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
