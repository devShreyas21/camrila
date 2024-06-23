// Third-party Imports
import { createSlice } from '@reduxjs/toolkit'

// Data Imports
import { events } from '@/fake-db/calendar'

const initialState = {
  events: events,
  filteredEvents: events,
  selectedEvent: null,
  selectedCalendars: ['Wedding', 'Engagement', 'Birthday', 'others']
}

const filterEvents = (events, selectedCalendars) => {
  return events.filter(event => selectedCalendars.includes(event.extendedProps?.calendar))
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = { ...action.payload, id: `${parseInt(state.events[state.events.length - 1]?.id ?? '') + 1}` }

      state.events.push(newEvent)
      state.filteredEvents.push(newEvent)
    },
    updateEvent: (state, action) => {
      state.events = state.events.map(event => {
        if (action.payload._def && event.id === action.payload._def.publicId) {
          return {
            id: event.id,
            title: action.payload._def.title,
            email: action.payload._def.email,
            phone: action.payload._def.phone,
            address: action.payload._def.address,
            venue: action.payload._def.venue,
            alternateNo: action.payload._def.alternateNo,
            allDay: action.payload._def.allDay,
            assignTo: action.payload._def.assignTo,
            function: action.payload._def.function,
            end: action.payload._instance.range.end,
            start: action.payload._instance.range.start,
            extendedProps: action.payload._def.extendedProps
          }
        } else if (event.id === action.payload.id) {
          return action.payload
        } else {
          return event
        }
      })
      state.filteredEvents = state.filteredEvents.map(event => {
        if (action.payload._def && event.id === action.payload._def.publicId) {
          return {
            id: event.id,
            title: action.payload._def.title,
            email: action.payload._def.email,
            phone: action.payload._def.phone,
            address: action.payload._def.address,
            venue: action.payload._def.venue,
            alternateNo: action.payload._def.alternateNo,
            asignTo: action.payload._def.assignTo,
            function: action.payload._def.function,
            allDay: action.payload._def.allDay,
            end: action.payload._instance.range.end,
            start: action.payload._instance.range.start,
            extendedProps: action.payload._def.extendedProps
          }
        } else if (event.id === action.payload.id) {
          return action.payload
        } else {
          return event
        }
      })
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload)
      state.filteredEvents = state.filteredEvents.filter(event => event.id !== action.payload)
    },
    selectedEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    filterCalendarLabel: (state, action) => {
      const index = state.selectedCalendars.indexOf(action.payload)

      if (index !== -1) {
        state.selectedCalendars.splice(index, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }

      state.events = filterEvents(state.filteredEvents, state.selectedCalendars)
    },
    filterAllCalendarLabels: (state, action) => {
      state.selectedCalendars = action.payload ? ['Wedding', 'Engagement', 'Birthday', 'Others'] : []
      state.events = filterEvents(state.filteredEvents, state.selectedCalendars)
    }
  }
})
export const { addEvent, updateEvent, deleteEvent, selectedEvent, filterCalendarLabel, filterAllCalendarLabels } =
  calendarSlice.actions
export default calendarSlice.reducer
