import React, { useState, forwardRef, useCallback, useEffect } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControl from '@mui/material/FormControl'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Slice Imports
import { addEvent, deleteEvent, updateEvent, selectedEvent } from '@/redux-store/slices/calendar'

// Vars
const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
    title: '',
    email: '',
    phone: '',
    address: '',
    extendedProps: {
        calendar: ''
    },
    venue: '',
    alternateNo: '',
    start: '',
    end: '',
    allDay: false,
    assignTo: '',
    function: ''
}

export default function AddEventSideBar(props) {

    const { calendarStore, dispatch, addEventSidebarOpen, handleAddEventSidebarToggle } = props

    // States
    const [values, setValues] = useState(defaultState)

    const PickersComponent = forwardRef(({ ...props }, ref) => {
        return (
            <TextField
                inputRef={ref}
                fullWidth
                {...props}
                label={props.label || ''}
                className='is-full'
                error={props.error}
            />
        )
    })

    // Hooks
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const {
        control,
        setValue,
        clearErrors,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ defaultValues: defaultState })


    const resetToStoredValues = useCallback(() => {
        if (calendarStore.selectedEvent !== null) {
            const event = calendarStore.selectedEvent

            setValue('title', event.title || '')
            setValue('email', event.email || '')
            setValue('phone', event.phone || '')
            setValue('address', event.address || '')
            setValue('venue', event.venue || '')
            setValue('alternateNo', event.alternateNo || '')
            setValue('assignTo', event.assignTo || '')
            setValue('function', event.function || '')

            setValues({
                title: event.title || '',
                email: event.email || '',
                phone: event.phone || '',
                address: event.address || '',
                calendar: event.extendedProps.calendar || 'Wedding',
                venue: event.venue || '',
                alternateNo: event.alternateNo || '',
                assignTo: event.assignTo || '',
                function: event.function || '',
                allDay: event.allDay,
                endDate: event.end !== null ? event.end : event.start,
                startDate: event.start !== null ? event.start : new Date()
            })
        }
    }, [setValue, calendarStore.selectedEvent])

    const resetToEmptyValues = useCallback(() => {
        setValue('title', '')
        setValue('email', '')
        setValue('phone', '')
        setValue('address', '')
        setValue('venue', '')
        setValue('alternateNo', '')
        setValue('assignTo', '')
        setValue('function', '')
        setValues(defaultState)
    }, [setValue])

    const handleSidebarClose = () => {
        setValues(defaultState)
        clearErrors()
        dispatch(selectedEvent(null))
        handleAddEventSidebarToggle()
    }

    const onSubmit = data => {
        const modifiedEvent = {
            url: values.url,
            display: 'block',
            title: data.title,
            email: data.email,
            phone: data.phone,
            address: data.address,
            venue: data.venue,
            alternateNo: data.alternateNo,
            end: values.endDate,
            allDay: values.allDay,
            start: values.startDate,
            extendedProps: {
                calendar: capitalize(values.calendar),
            },
            assignTo: data.assignTo,
            function: data.function
        }

        if (
            calendarStore.selectedEvent === null ||
            (calendarStore.selectedEvent !== null && !calendarStore.selectedEvent.title.length)
        ) {
            dispatch(addEvent(modifiedEvent))
        } else {
            dispatch(updateEvent({ ...modifiedEvent, id: calendarStore.selectedEvent.id }))
        }

        handleSidebarClose()
    }

    const handleDeleteButtonClick = () => {
        if (calendarStore.selectedEvent) {
            dispatch(deleteEvent(calendarStore.selectedEvent.id))
        }

        // calendarApi.getEventById(calendarStore.selectedEvent.id).remove()
        handleSidebarClose()
    }

    const handleStartDate = date => {
        if (date > values.endDate) {
            setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
        }
    }

    const RenderSidebarFooter = () => {
        if (
            calendarStore.selectedEvent === null ||
            (calendarStore.selectedEvent && !calendarStore.selectedEvent.title.length)
        ) {
            return (
                <div className='flex gap-4 ' style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <Button type='submit' variant='contained'>
                        Add
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={resetToEmptyValues}>
                        Reset
                    </Button>
                </div>
            )
        } else {
            return (
                <div className='flex gap-4' style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <Button type='submit' variant='contained'>
                        Update
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={resetToStoredValues}>
                        Reset
                    </Button>
                </div>
            )
        }
    }

    const ScrollWrapper = isBelowSmScreen ? 'div' : PerfectScrollbar

    useEffect(() => {
        if (calendarStore.selectedEvent !== null) {
            resetToStoredValues()
        } else {
            resetToEmptyValues()
        }
        console.log(calendarStore.events)
    }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, calendarStore.selectedEvent])




    return (
        <Drawer
            anchor='right'
            open={addEventSidebarOpen}
            onClose={handleSidebarClose}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: ['100%', 1000] } }}
        >
            <Box className='flex justify-between items-center sidebar-header pli-5 plb-4 border-be'>
                <Typography variant='h5' style={{ marginRight: "auto", marginLeft: "auto" }}>
                    {calendarStore.selectedEvent && calendarStore.selectedEvent.title.length ? 'Update Event' : 'Add Event'}
                </Typography>
                {calendarStore.selectedEvent && calendarStore.selectedEvent.title.length ? (
                    <Box className='flex items-center' sx={{ gap: calendarStore.selectedEvent !== null ? 1 : 0 }}>
                        <IconButton size='small' onClick={handleDeleteButtonClick}>
                            <i className='ri-delete-bin-7-line text-2xl' />
                        </IconButton>
                        <IconButton size='small' onClick={handleSidebarClose}>
                            <i className='ri-close-line text-2xl' />
                        </IconButton>
                    </Box>
                ) : (
                    <IconButton size='small' onClick={handleSidebarClose}>
                        <i className='ri-close-line text-2xl' />
                    </IconButton>
                )}
            </Box>
            <ScrollWrapper
                {...(isBelowSmScreen
                    ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
                    : { options: { wheelPropagation: false, suppressScrollX: true } })}
            >
                <Box className='sidebar-body p-5'>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <div className="row" style={{ display: "flex", justifyContent: "center" }}>

                            <div className="col-md-4 " style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Title'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.title && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Email'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.email && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='phone'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Phone'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.phone && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='address'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Address'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.address && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                            </div>

                            <div className="col-md-4" style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>

                                <FormControl fullWidth className='mbe-5'>
                                    <InputLabel id='event-calendar'>Calendar</InputLabel>
                                    <Select
                                        label='Calendar'
                                        value={values.calendar}
                                        labelId='event-calendar'
                                        onChange={e => setValues({ ...values, calendar: e.target.value })}
                                    >
                                        <MenuItem value='Personal'>Wedding</MenuItem>
                                        <MenuItem value='Business'>Engagement</MenuItem>
                                        <MenuItem value='Family'>Birthday</MenuItem>
                                        <MenuItem value='Holiday'>Others</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='venue'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Venue'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.venue && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>


                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='alternateNo'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Alternet Number'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.alternateNo && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>


                                <div className='mbe-5'>
                                    <AppReactDatepicker
                                        selectsStart
                                        id='event-start-date'
                                        endDate={values.endDate}
                                        selected={values.startDate}
                                        startDate={values.startDate}
                                        showTimeSelect={!values.allDay}
                                        dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                                        customInput={<PickersComponent label='Start Date' registername='startDate' />}
                                        onChange={date => setValues({ ...values, startDate: new Date(date) })}
                                        onSelect={handleStartDate}
                                    />
                                </div>


                            </div>

                            <div className="col-md-4" style={{ display: "flex", flexDirection: "column" }}>

                                <div className='mbe-5'>
                                    <AppReactDatepicker
                                        selectsEnd
                                        id='event-end-date'
                                        endDate={values.endDate}
                                        selected={values.endDate}
                                        minDate={values.startDate}
                                        startDate={values.startDate}
                                        showTimeSelect={!values.allDay}
                                        dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                                        customInput={<PickersComponent label='End Date' registername='endDate' />}
                                        onChange={date => setValues({ ...values, endDate: new Date(date) })}
                                    />
                                </div>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='assignTo'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Assign to'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.assignTo && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                                <FormControl fullWidth className='mbe-5'>
                                    <Controller
                                        name='function'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                label='Function'
                                                value={value}
                                                onChange={onChange}
                                                {...(errors.function && { error: true, helperText: 'This field is required' })}
                                            />
                                        )}
                                    />
                                </FormControl>

                            </div>
                        </div>

                        <div className='flex items-center'>
                            <RenderSidebarFooter />
                        </div>

                    </form>
                </Box>
            </ScrollWrapper>
        </Drawer>
    )
}
