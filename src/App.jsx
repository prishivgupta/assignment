import React, { useEffect, useState } from 'react'
import './App.css'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';

const App = () => {

    const [alphabets, setAlphabets] = useState(true);
    const [numbers, setNumbers] = useState(false);
    const [special, setSpecial] = useState(false);

    const [error, setError] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');

    const [history, setHistory] = useState([]);

    useEffect(() => {

        let data = JSON.parse(localStorage.getItem('passwordData'));
        if (data) {
            setHistory(data)
        }
        
    }, []);

    const generatePassword = () => {

        if (alphabets || numbers || special) {
            
            setError('')
            
            var alphabetsChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var numbersChar = '0123456789';
            var specialChar = '!@#$%^&*()';
            var chars = '';
            var password = '';

            if (alphabets) {
                chars += alphabetsChar;
            }

            if (numbers) {
                chars += numbersChar;
            }

            if (special) {
                chars += specialChar;
            }

            for (var i = 0; i <= 7; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber +1);
            }

            setGeneratedPassword(password)

            if (history?.length > 4) {
                history.shift(password)
                history.push(password)
            } else {
                history.push(password)
            }

            localStorage.setItem('passwordData', JSON.stringify(history))

        } else {
            setError('Please select atleast 1 checkbox')
        }

    }

    return (
        
        <div >
            <Grid container className='container' rowGap={2}>

                <Grid item xs={12}>
                    <h2> Random Password Generator</h2>
                </Grid>
                
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={alphabets} onChange={() => setAlphabets(!alphabets)}/>} label="Include Alphabets" />
                        <FormControlLabel control={<Checkbox checked={numbers} onChange={() => setNumbers(!numbers)}/>} label="Include Numbers" />
                        <FormControlLabel control={<Checkbox checked={special} onChange={() => setSpecial(!special)}/>} label="Include Special Characters" />
                    </FormGroup>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => generatePassword()}>Generate Password</Button>
                </Grid>

                {
                    error &&
                    <Grid item xs={12}>
                        {error}
                    </Grid>
                }

                {
                    generatePassword &&
                    <Grid item xs={12}>
                        {generatedPassword}
                    </Grid>
                }
                
                {
                    history &&
                    <Grid item xs={12}>
                        <h3>Last 5 Results:</h3>
                        <br/>
                        {
                            history.map((h) => (
                                <li>{h}</li>
                            ))
                        }
                    </Grid>
                }
                

            </Grid>
        </div>

    )
}

export default App;
