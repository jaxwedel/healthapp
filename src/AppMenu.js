import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AppMenu({ showVitalSigns, setShowVitalSigns }) {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <HealthAndSafetyIcon fontSize='large' />
                    <Typography variant="h1" pl={2} component="div" sx={{ flexGrow: 1 }}>
                        NEWS Score App
                    </Typography>
                    <FormControlLabel control={<Switch color='secondary' onClick={() => setShowVitalSigns(!showVitalSigns)} />} label="Activate Sensor" />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
