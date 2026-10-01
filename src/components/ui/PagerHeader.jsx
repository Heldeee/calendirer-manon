import { Box, Typography, Button } from "@mui/material";
import KittyAccent from './KittyAccent';

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
        px: { xs: 2.5, sm: 3 },
        bgcolor: "transparent",
        borderBottom: "1px solid rgba(227,154,166,0.15)",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={500} sx={{ fontSize: '.65rem', letterSpacing: 2, lineHeight: 1.5 }}>
          {eyebrow}
        </Typography>
        <KittyAccent sx={{ width: 23, height: 18 }} />
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, textTransform: "capitalize", color: '#665257', mt: .5 }}>
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
