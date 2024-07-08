'use client'
import React, { useState, useEffect } from 'react'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { CardContent, Grid } from '@mui/material'
import Leads from '@components/leads/Leads'
import { useRouter } from 'next/navigation'
import { Card } from '@mui/material'

export default function page() {

    const router = useRouter()

    const [Token, setToken] = useState('')

    useEffect(() => {
        // console.log(localStorage.getItem('accessToken'))
        if (!localStorage.getItem('accessToken')) {
            router.push('/login')
        }
        else {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    return (
        <Card>
            <CardContent>

                <div>
                    {Token ? (<>
                        <div className='row' style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="col-md-4">
                                <AppReactDatepicker
                                    inline
                                    // onChange={date => calendarApi.gotoDate(date)}
                                    boxProps={{
                                        className: 'flex justify-center is-full',
                                        sx: { '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' } }
                                    }}
                                />
                            </div>

                            <div className="col-md-8">
                                <Grid xs={12}>
                                    {/* <MeetingSchedule /> */}
                                    <Leads token={Token} />
                                </Grid>
                            </div>
                        </div>
                    </>) : (<>loading</>)}
                </div>
            </CardContent>
        </Card>
    )
}
