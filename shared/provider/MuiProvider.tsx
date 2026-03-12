"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 13,
  },
  palette: {
    mode: "light",
    background: {
      default: "#f8f9fa",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
  },
})

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
