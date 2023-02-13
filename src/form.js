import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Form = () => {
    const [valueTemperature, setValueTemperature] = React.useState('');
    const [valueHeartRate, setValueHeartRate] = React.useState('');
    const [valueRespiratoryRate, setValueRespiratoryRate] = React.useState('');
    const [newsScore, setNewsScore] = React.useState(0);
    const [temperatureError, setTemperatureError] = React.useState(false);
    const [heartRateError, setHeartRateError] = React.useState(false);
    const [respiratoryRateError, setRespiratoryRateError] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setTemperatureError(false);
        setHeartRateError(false);
        setRespiratoryRateError(false);

        if ( // This is error handling
            (valueTemperature < 31 || valueTemperature > 42) ||
            (valueHeartRate < 25 || valueHeartRate > 220) ||
            (valueRespiratoryRate < 3 || valueRespiratoryRate > 60)
        ) {
            setTemperatureError(valueTemperature < 31 || valueTemperature > 42);
            setHeartRateError(valueHeartRate < 25 || valueHeartRate > 220);
            setRespiratoryRateError(valueRespiratoryRate < 3 || valueRespiratoryRate > 60);
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
            m={2} p={2}
            noValidate
            autoComplete="off">
            <Box display="flex" flexDirection="column" mb={2}>
                <Typography variant='h2' color={"primary"} pb={2} >Body Temperature</Typography>
                <TextField
                    label="Degrees Celcius"
                    variant="outlined"
                    value={valueTemperature}
                    onChange={(e) => setValueTemperature(e.target.value)}
                    error={temperatureError}
                    helperText={temperatureError ? 'Temperature must be between 31 and 42' : ''}
                />
            </Box>
            <Box display="flex" flexDirection="column" mb={2} pt={2}>
                <Typography variant='h2' color={"primary"} pb={2} >Heart Rate</Typography>
                <TextField
                    label="Beats per minute"
                    variant="outlined"
                    value={valueHeartRate}
                    onChange={(e) => setValueHeartRate(e.target.value)}
                    error={heartRateError}
                    helperText={heartRateError ? 'Heart Rate must be between 25 and 220' : ''} />
            </Box>
            <Box display="flex" flexDirection="column" mb={2} pt={2}>
                <Typography variant='h2' color={"primary"} pb={2} >Respiratory Rate</Typography>
                <TextField
                    label="Breaths per minute"
                    variant="outlined"
                    value={valueRespiratoryRate}
                    onChange={(e) => setValueRespiratoryRate(e.target.value)}
                    error={respiratoryRateError}
                    helperText={respiratoryRateError ? 'Respiratory Rate must be between 3 and 60' : ''}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={'space-between'} mt={4}>
                <Button variant="contained" style={{ width: "64%", padding: "12px" }} type="submit" onClick={handleSubmit}>
                    Calculate NEWS
                </Button>
                <Button variant="outlined" style={{ width: "34%", padding: "12px" }} type="button" onClick={handleClear}>
                    Reset
                </Button>
            </Box>
            <Box display="flex" mt={4} sx={{ height: "50px" }}>
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

