import { Box } from '@mui/material';

// Decorative vector props stay outside all touch targets and readable content.
export default function KittyAccent({ kind = 'bow', sx = {} }) {
  return <Box component="svg" viewBox="0 0 64 48" aria-hidden="true" focusable="false" sx={{ width: 30, height: 24, flexShrink: 0, pointerEvents: 'none', ...sx }}>
    {kind === 'bow' ? <g stroke="#CA879A" strokeWidth="2" strokeLinejoin="round">
      <path d="M29 24C18 10 5 7 5 19v11c0 13 14 7 24-3" fill="#F6CEDB" />
      <path d="M35 24C46 10 59 7 59 19v11c0 13-14 7-24-3" fill="#F6CEDB" />
      <path d="m12 21 15 4-15 5m40-9-15 4 15 5" fill="none" opacity=".5" />
      <rect x="26" y="18" width="12" height="15" rx="5" fill="#EBAFC3" />
    </g> : <g fill="#EDC2CF"><path d="M32 38 13 21C0 8 20-2 32 12 44-2 64 8 51 21Z" /><path d="m9 35 2 5 5 2-5 2-2 4-2-4-5-2 5-2Zm46-31 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" /></g>}
  </Box>;
}
