"use client";
import React, { useState } from 'react'

import { Grid } from '@mui/material';
import { Card } from '@mui/material';

import CharacterCard from '@components/characterCard/CaracterCard'
import Table from '@components/table/Table'
import AppFullCalendar from '@/libs/styles/AppFullCalender';
import CalendarWrapper from '@/components/calendar/CalendarWrapper';
import ReduxProvider from '@/redux-store/ReduxProvider';

export default function Page() {

  const [Display, setDisplay] = useState('none')
  const [TableType, setTableType] = useState("")

  const clicked = (event) => {
    if (Display == 'none') {
      setTableType(event.currentTarget.id)
      setDisplay('block')
    }
    else {
      setTableType("")
      setDisplay('none')
    }
  }

  return <div>

    <Grid container spacing={6}>

      <Grid id="totalAssign" onClick={clicked} item xs={12} sm={6} md={3} >
        <CharacterCard
          title='Total Assignment'
          stats='1'
          trendNumber='15.6%'
          chipColor='primary'
          chipText={`Year of ${new Date().getFullYear()}`}
          src='/images/illustrations/characters/5.png'
        />
      </Grid>

      <Grid id="totalCost" onClick={clicked} item xs={12} sm={6} md={3}>
        <CharacterCard
          title='Total Cost'
          stats='8000'
          trendNumber='15.6%'
          chipColor='primary'
          chipText={`Year of ${new Date().getFullYear()}`}
          src='/images/illustrations/characters/2.png'
        />
      </Grid>

      <Grid id="totalPaymentRecieved" onClick={clicked} item xs={12} sm={6} md={3}>
        <CharacterCard
          title='Payment Recieved'
          stats='10000'
          trendNumber='15.6%'
          chipColor='primary'
          chipText={`Year of ${new Date().getFullYear()}`}
          src='/images/illustrations/characters/7.png'
        />
      </Grid>

      <Grid id="totalDuePayment" onClick={clicked} item xs={12} sm={6} md={3}>
        <CharacterCard
          title='Due Payment'
          stats='4900'
          trendNumber='15.6%'
          chipColor='primary'
          chipText={`Year of ${new Date().getFullYear()}`}
          src='/images/illustrations/characters/4.png'
        />
      </Grid>

    </Grid>


    <Grid item xs={12} md={8} className='max-md:order-3'>
      <Table display={Display} tableType={TableType} />
    </Grid>

    <Card className='my-4'>
      <AppFullCalendar>
        <ReduxProvider>
          <CalendarWrapper />
        </ReduxProvider>
      </AppFullCalendar>
    </Card>

  </div>
}
