import React from 'react'
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material'

export default function page() {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h4'>Feedback</Typography>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            rows={4}
                            multiline
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
                        <Button variant='contained' type='submit'>
                            Submit
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}
