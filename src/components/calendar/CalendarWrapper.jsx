'use client'
import React from 'react'
import { useState } from 'react'

import { useMediaQuery } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import SideBarLeft from './SideBarLeft'
import Calendar from './Calendar'
import AddEventSideBar from './AddEventSideBar'

// CalendarColors Object
const calendarsColor = {
    Wedding: 'error',
    Engagement: 'primary',
    Birthdya: 'warning',
    Others: 'success',
}


export default function CalendarWrapper() {

    // States
    const [calendarApi, setCalendarApi] = useState(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

    // Hooks
    const dispatch = useDispatch()
    const calendarStore = useSelector(state => state.calendarReducer)
    const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

    return (
        <>
            <SideBarLeft
                mdAbove={mdAbove}
                dispatch={dispatch}
                calendarApi={calendarApi}
                calendarStore={calendarStore}
                calendarsColor={calendarsColor}
                leftSidebarOpen={leftSidebarOpen}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleAddEventSidebarToggle={handleAddEventSidebarToggle}
            />
            <div className='p-5 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded-e-xl max-md:rounded-s-xl'>
                <Calendar
                    dispatch={dispatch}
                    calendarApi={calendarApi}
                    calendarStore={calendarStore}
                    setCalendarApi={setCalendarApi}
                    calendarsColor={calendarsColor}
                    handleLeftSidebarToggle={handleLeftSidebarToggle}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
            </div>
            <AddEventSideBar
                dispatch={dispatch}
                calendarApi={calendarApi}
                calendarStore={calendarStore}
                addEventSidebarOpen={addEventSidebarOpen}
                handleAddEventSidebarToggle={handleAddEventSidebarToggle}
            />
        </>
    )
}
