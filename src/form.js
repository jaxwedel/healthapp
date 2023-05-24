import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const CustomTextField = ({ label, value, onChange, error, helperText }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            type="number"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
        />
    );
}

const isValueInRange = (value, min, max) => {
    return value >= min && value <= max;
}

const SPACING = 2;

const Form = () => {
    const [valueTemperature, setValueTemperature] = useState('');
    const [valueHeartRate, setValueHeartRate] = useState('');
    const [valueRespiratoryRate, setValueRespiratoryRate] = useState('');
    const [newsScore, setNewsScore] = useState(0);
    const [temperatureError, setTemperatureError] = useState(false);
    const [heartRateError, setHeartRateError] = useState(false);
    const [respiratoryRateError, setRespiratoryRateError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTemperatureError(false);
        setHeartRateError(false);
        setRespiratoryRateError(false);

        if (
            !isValueInRange(valueTemperature, 31, 42) ||
            !isValueInRange(valueHeartRate, 25, 220) ||
            !isValueInRange(valueRespiratoryRate, 3, 60)
        ) {
            setTemperatureError(!isValueInRange(valueTemperature, 31, 42));
            setHeartRateError(!isValueInRange(valueHeartRate, 25, 220));
            setRespiratoryRateError(!isValueInRange(valueRespiratoryRate, 3, 60));
        } else {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ valueTemperature, valueHeartRate, valueRespiratoryRate }),
            });

            const data = await response.json();
            setNewsScore(data.newsScore);
        }
    };

    const handleClear = () => {
        setValueTemperature('');
        setValueHeartRate('');
        setValueRespiratoryRate('');
        setNewsScore(0);
        setTemperatureError(false);
        setHeartRateError(false);
        setRespiratoryRateError(false);
    };

    return (
        <Box
    component="form"
    m={SPACING}
    p={SPACING}
    noValidate
    autoComplete="off"
>

            <Box display="flex" flexDirection="column" mb={SPACING}>
                <Typography variant='h2' color={"primary"} pb={SPACING} >Body Temperature</Typography>
                <CustomTextField
                    label="Degrees Celcius"
                    value={valueTemperature}
                    onChange={(e) => setValueTemperature(e.target.value)}
                    error={temperatureError}
                    helperText={temperatureError ? 'Temperature must be between 31 and 42' : ''}
                />
            </Box>
            <Box display="flex" flexDirection="column" mb={SPACING} pt={SPACING}>
                <Typography variant='h2' color={"primary"} pb={SPACING} >Heart Rate</Typography>
                <CustomTextField
                    label="Beats per minute"
                    value={valueHeartRate}
                    onChange={(e) => setValueHeartRate(e.target.value)}
                    error={heartRateError}
                    helperText={heartRateError ? 'Heart Rate must be between 25 and 220' : ''}
                />
            </Box>
            <Box display="flex" flexDirection="column" mb={SPACING} pt={SPACING}>
                <Typography variant='h2' color={"primary"} pb={SPACING} >Respiratory Rate</Typography>
                <CustomTextField
                    label="Breaths per minute"
                    value={valueRespiratoryRate}
                    onChange={(e) => setValueRespiratoryRate(e.target.value)}
                    error={respiratoryRateError}
                    helperText={respiratoryRateError ? 'Respiratory Rate must be between 3 and 60' : ''}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={'space-between'} mt={SPACING * 2}>
                <Button
    variant="contained"
    style={{ width: "64%", padding: "12px" }}
    type="button"
    onClick={handleSubmit}
>
    Calculate NEWS
</Button>

                <Button variant="outlined" style={{ width: "34%", padding: "12px" }} type="button" onClick={handleClear}>
                    Reset
                </Button>
            </Box>
            <Box display="flex" mt={SPACING * 2} sx={{ height: "50px" }}>
                {(
                    newsScore !== 0 && (
                        <Alert severity="success" sx={{ width: "100%" }}>
                            <Typography variant="h2">NEWS Score: {newsScore}</Typography>
                        </Alert>
                    )
                )}
            </Box>

        </Box>

    );

};

export default Form;