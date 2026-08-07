import { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import GlassCard from "../ui/GlassCard";

const STORAGE_KEY = "calendrier_unlocked";
const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD;

export default function PasswordGate({ children }) {
    const [unlocked, setUnlocked] = useState(
        () => sessionStorage.getItem(STORAGE_KEY) === "true"
    );
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    if (unlocked) return children;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === APP_PASSWORD) {
            sessionStorage.setItem(STORAGE_KEY, "true");
            setUnlocked(true);
        } else {
            setError(true);
            setInput("");
        }
    };

    return (
        <Box
            sx={{
                height: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, #FDF6F3 0%, #FCEFF1 100%)",
                px: 3,
            }}
        >
            <GlassCard sx={{ width: "100%", maxWidth: 320, py: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5} alignItems="center">
                        <Typography variant="h1" sx={{ fontSize: "1.3rem" }}>
                            Accès privé
                        </Typography>
                        <TextField
                            type="password"
                            fullWidth
                            autoFocus
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(false); }}
                            error={error}
                            helperText={error ? "Mot de passe incorrect" : " "}
                            placeholder="Mot de passe"
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: "12px", py: 1.2 }}>
                            Entrer
                        </Button>
                    </Stack>
                </form>
            </GlassCard>
        </Box>
    );
}