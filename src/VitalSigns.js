import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AirIcon from '@mui/icons-material/Air';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Avatar from '@mui/material/Avatar';

const VitalSigns = () => {
    const [valueTemperature, setTemperature] = useState(36);
    const [valueHeartRate, setHeartRate] = useState(60);
    const [valueRespiratoryRate, setRespiratoryRate] = useState(12);
    const [newsScore, setNewsScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(Math.floor(Math.random() * (38 - 36) + 36));
            setHeartRate(Math.floor(Math.random() * (90 - 50) + 50));
            setRespiratoryRate(Math.floor(Math.random() * (20 - 11) + 11));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const calculateValues = async () => {
            try {
                const response = await fetch("/api/calculate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        valueTemperature,
                        valueHeartRate,
                        valueRespiratoryRate
                    }),
                });
                const result = await response.json();
                setNewsScore(result.newsScore);
            } catch (error) {
                console.error(error);
            }
        };
        calculateValues();
    }, [valueTemperature, valueHeartRate, valueRespiratoryRate]);

    const handleButtonClick = () => {
        setTemperature(valueTemperature + 3);
        setHeartRate(valueHeartRate + 100);
        setRespiratoryRate(valueRespiratoryRate + 15);
    };

    return (
        <Box display={"flex"} flexDirection={"column"} m={2} p={2}>
            <Box display="flex" flexDirection="row" mb={2}>
                <Avatar sx={{ width: 70, height: 70, bgcolor: "primary.main" }}>
                    <PermContactCalendarIcon fontSize="large" color="white" />
                </Avatar>
                <Typography variant="h2" pl={2} pt={3}>Patient: Ralph Fiennes</Typography>
            </Box>
            <Box display="flex" mb={2} sx={{ padding: "20px", bgcolor: "secondary.main", borderRadius: "6px" }}>
                <ThermostatIcon color="primary" fontSize="large" />
                <Typography variant="h2" color="primary" pl={1} pt={1}>
                    Temperature: {valueTemperature}°C
                </Typography>
            </Box>
            <Box display="flex" mb={2} sx={{ padding: "20px", bgcolor: "secondary.main", borderRadius: "6px" }}>
                <MonitorHeartIcon color="primary" fontSize="large" />
                <Typography variant="h2" color="primary" pl={1} pt={1}>
                    Heart Rate: {valueHeartRate} bpm
                </Typography>
            </Box>
            <Box display="flex" mb={2} sx={{ padding: "20px", bgcolor: "secondary.main", borderRadius: "6px" }}>
                <AirIcon color="primary" fontSize="large" />
                <Typography variant="h2" color="primary" pl={1} pt={1}>
                    Respiratory Rate: {valueRespiratoryRate} breaths/min
                </Typography>
            </Box>
            <Button variant="outlined" onClick={handleButtonClick}>
                Simulate Emergency
            </Button>
            <Box pt={2}>
                {newsScore > 3 ? (
                    <Alert severity="warning"><Typography variant="h2">NEWS score is {newsScore}</Typography></Alert>
                ) : (
                    <Alert severity="info"><Typography variant="h2">NEWS score is {newsScore}</Typography></Alert>
                )}
            </Box>
        </Box>
    );
};

export default VitalSigns;
