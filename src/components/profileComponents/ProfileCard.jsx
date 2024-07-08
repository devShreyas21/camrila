import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid, TextField, Input, InputLabel } from '@mui/material';
import axios from 'axios';
import { getSimpleDate } from '@/utils/date';

export default function ProfileCard() {

    const [ResData, setResData] = useState(null)

    const fetchData = async (tkn) => {
        const response = await axios.get('https://api.camrilla.com/payment-history', {
            headers: {
                'Authorization': tkn
            }
        })
        console.log(response.data.data)
        setResData(response.data.data)
    }

    useEffect(() => {
        const Token = localStorage.getItem('accessToken')
        fetchData(Token)
        // console.log(localStorage.getItem('accessToken'))
    }, [])

    return (
        <Grid container spacing={3} style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px" }}>
            {/* First Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Personal
                        </Typography>
                        {/* <InputLabel>Name</InputLabel> */}
                        {/* <Input value='Shreyas' disabled/> */}
                        <TextField
                            label="name"
                            value="Shreyas"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="email"
                            value="devshreyas@gmail.com"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="Mobile"
                            value="8530136842"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="Country"
                            value="India"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />
                    </CardContent>
                    {/* <Button size="small">Learn More</Button> */}
                </Card>
            </Grid>

            {/* Second Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            My Plan
                        </Typography>
                        <TextField
                            label="Plan"
                            value="Basic"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="Duration"
                            value="Lifetime"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="Amount"
                            value="Free"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />

                        <TextField
                            label="Activation Date"
                            value="23 may 2024"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            className='my-2'
                        />
                    </CardContent>
                    {/* <Button size="small">Learn More</Button> */}
                </Card>
            </Grid>

            {/* Third Card */}
            <Grid item xs={12} sm={6} md={4}>
                <Card style={{ height: "363px", overflowY: "scroll" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            History
                        </Typography>
                        {ResData && ResData.map((item, index) => (

                            <Card key={index} className='my-2'>
                                <CardContent>
                                    <Typography variant="h6" >Plan : {item.planName}</Typography>
                                    <Typography>Amount : {item.amount} </Typography>
                                    <Typography>Order Id : {item.orderId} </Typography>
                                    <Typography>Date :  {getSimpleDate(item.paymentDate)}</Typography>
                                    <Typography>Status :  {item.paymentStatus}</Typography>
                                </CardContent>

                            </Card>
                        ))}
                    </CardContent>
                    {/* <Button size="small">Learn More</Button> */}
                </Card>
            </Grid>
        </Grid>
    )
}
