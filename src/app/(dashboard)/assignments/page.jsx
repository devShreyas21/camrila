'use client'
import React, { useState, useEffect } from 'react'
import { Card, Grid, CardContent } from '@mui/material'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import Schedule from '@/components/assignmentSchedule/Schedule'
import { useRouter } from 'next/navigation';
import { startOfMonth, endOfMonth } from 'date-fns'

export default function page() {

    const router = useRouter()

    const [Token, setToken] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [startUnixDate, setStartUnixDate] = useState(startOfMonth(new Date()).getTime())
    const [endUnixDate, setEndUnixDate] = useState(endOfMonth(new Date()).getTime())

    useEffect(() => {
        // console.log(localStorage.getItem('accessToken'))
        if (!localStorage.getItem('accessToken')) {
            router.push('/login')
        }
        else {
            setToken(localStorage.getItem('accessToken'))
        }
        const currentDate = new Date();
        setStartUnixDate(startOfMonth(currentDate).getTime());
        setEndUnixDate(endOfMonth(currentDate).getTime());
    }, [])

    const handleDateChange = (date) => {
        const startDate = startOfMonth(date);
        const endDate = endOfMonth(date);
        console.log(`Start Date (Unix milliseconds): ${startDate.getTime()}`);
        console.log(`End Date (Unix milliseconds): ${endDate.getTime()}`);
        setStartUnixDate(startDate.getTime());
        setEndUnixDate(endDate.getTime());
        setSelectedDate(date);
    }

    return (
        <Card>
            <CardContent>
                <div>
                    {Token ? (
                        <div className="row" style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="col-md-4">
                                <Grid item xs={12} sm={6} md={4}>
                                    <AppReactDatepicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        inline
                                        onMonthChange={(date) => {
                                            const startDate = startOfMonth(date);
                                            const endDate = endOfMonth(date);
                                            setStartUnixDate(startDate.getTime());
                                            setEndUnixDate(endDate.getTime());
                                        }}
                                        // onChange={date => calendarApi.gotoDate(date)}
                                        boxProps={{
                                            className: 'flex justify-center is-full',
                                            sx: { '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' } }
                                        }}
                                    />
                                </Grid>
                            </div>
                            <div>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Schedule token={Token} startUnixDate={startUnixDate} endUnixDate={endUnixDate} />
                                </Grid>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
