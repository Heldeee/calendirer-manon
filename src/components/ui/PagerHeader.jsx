import { Box, Typography, Button } from "@mui/material";

export const PAGER_HEADER_HEIGHT = 88;

export default function PagerHeader({ eyebrow, label, action }) {
  return (
    <Box
      sx={{
        height: PAGER_HEADER_HEIGHT,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        bgcolor: "transparent",
        borderBottom: "1px solid rgba(227,154,166,0.15)",
      }}
    >
      <Box>
        <Typography variant="overline" color="text.secondary" fontWeight={600}>
          {eyebrow}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: "1.5rem", textTransform: "capitalize" }}>
          {label}
        </Typography>
      </Box>

      {action && (
        <Button
          onClick={action.onClick}
          size="small"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            color: "primary.dark",
            bgcolor: "rgba(227,154,166,0.15)",
            px: 1.5,
            "&:hover": { bgcolor: "rgba(227,154,166,0.25)" },
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}