"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </SessionProvider>
  );
}
