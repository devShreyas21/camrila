'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Alert } from '@mui/material'

export default function page() {

    const router = useRouter()

    const [Token, setToken] = useState('')
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        // console.log(localStorage.getItem('accessToken'))
        if (!localStorage.getItem('accessToken')) {
            router.push('/login')
        }
        else {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    const clicked = async () => {
        const feedback = document.getElementById('message').value
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`,
            },
        };
        try {
            const response = await axios.post('http://api.camrilla.com/user-feedback', { feedback }, requestOptions);
            setResponseMessage('Feedback submitted successfully!');
            document.getElementById('message').value = ''
            console.log(response);
        } catch (error) {
            setResponseMessage('Failed to submit feedback. Please try again.');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div>
            {Token ? (<>
                <div>
                    <Card>
                        <CardContent>
                            <Typography variant='h4'>Feedback</Typography>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    rows={4}
                                    multiline
                                    id="message"
                                    label='Message'
                                    placeholder='Bio...'
                                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                                    style={{ width: "500px", marginBottom: "10px", marginTop: "10px" }}
                                // InputProps={{
                                //   startAdornment: (
                                //     <InputAdornment position='start'>
                                //       <i className='ri-message-2-line' />
                                //     </InputAdornment>
                                //   )
                                // }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' type='submit' onClick={clicked}>
                                    Submit
                                </Button>
                            </Grid>
                            {responseMessage && (
                                <Grid item xs={12} style={{ marginTop: "10px" }}>
                                    <Alert severity={responseMessage.includes('successfully') ? 'success' : 'error'}>
                                        {responseMessage}
                                    </Alert>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </>) : (<></>)}
        </div>
    )
}
