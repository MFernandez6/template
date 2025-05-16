"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleCloseNavMenu();
  };

  const menuItems = [
    { label: "What We Do", href: "/what-we-do" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/")}
          >
            ClaimSaver+
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
              {session && (
                <MenuItem onClick={() => handleNavigation("/dashboard")}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/")}
          >
            ClaimSaver+
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Auth buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {session ? (
              <Stack direction="row" spacing={2}>
                <Button
                  color="inherit"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              </Stack>
            ) : (
              <Button
                color="inherit"
                onClick={() => handleNavigation("/auth/signin")}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
