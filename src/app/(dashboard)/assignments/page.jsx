'use client'
import React from 'react'
import { Grid } from '@mui/material'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import Schedule from '@/components/assignmentSchedule/Schedule'

export default function page() {
    return (
        <div>

            <div className="row" style={{ display: "flex", justifyContent: "space-around" }}>

                <div className="col-md-4">
                    <Grid item xs={12} sm={6} md={4}>
                        <AppReactDatepicker
                            inline
                            // onChange={date => calendarApi.gotoDate(date)}
                            boxProps={{
                                className: 'flex justify-center is-full',
                                sx: { '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' } }
                            }}
                        />
                    </Grid>
                </div>
                <div  >
                    <Grid item xs={12} sm={12} md={8}>
                        <Schedule />
                    </Grid>
                </div>

            </div>


        </div>
    )
}
