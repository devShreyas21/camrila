import React from 'react'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { Grid } from '@mui/material'
import Leads from '@components/leads/Leads'


export default function page() {
    return (
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
                    <Leads />
                </Grid>
            </div>
        </div>
    )
}
