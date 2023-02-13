import React, { useState } from "react";
import Form from "./form.js";
import VitalSigns from "./VitalSigns.js";
import AppMenu from './AppMenu.js';
import { Container, Paper, Box } from '@mui/material';
import "./App.css";

function App() {
  const [showVitalSigns, setShowVitalSigns] = useState(false);
  return <Container sx={{
    width: '960px'
  }}>
    <AppMenu showVitalSigns={showVitalSigns} setShowVitalSigns={setShowVitalSigns} />
    <Box sx={{
      pt: 4,
      display: 'flex',
      flexdirection: 'column',
      justifyContent: 'space-between',
    }}>
      <Paper elevation={3} sx={{ width: '440px' }}>
        <Form />
      </Paper>
      <Paper elevation={3} sx={{ width: '440px' }}>
        {showVitalSigns && <VitalSigns />}
      </Paper>
    </Box >
  </Container >;
}

export default App;
