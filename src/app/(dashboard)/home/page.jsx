"use client";
import React, { useState, useEffect } from 'react'
import './style.css'
import { Drawer, Grid } from '@mui/material';
import { Card, Button, CardContent, TextField, Box, Select, MenuItem, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { format } from 'date-fns';
import listPlugin from '@fullcalendar/list'
import CharacterCard from '@components/characterCard/CaracterCard'
import Table from '@components/table/Table'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker';
import { convertUnixTimestamp, convertDMYToUnixTimestamp } from '@/utils/date';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import AppFullCalendar from '@/libs/styles/AppFullCalender';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {

  const [Event, setEvent] = useState(0)
  const [PaymentRecieved, setPaymentRecieved] = useState(0)
  const [TotalAmount, setTotalAmount] = useState(0)
  const [DueAmount, setDueAmount] = useState(0)
  const [Assignments, setAssignments] = useState([])

  const [selectedEvents, setSelectedEvents] = useState(['All', 'Wedding', 'Engagement', 'Birthday']); // Initialize with all events selected
  const [filteredEvents, setFilteredEvents] = useState(Assignments);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.camrilla.com/order/assignment?startDate=1717220557000&endDate=1719807716000', {
        headers: { 'Authorization': localStorage.getItem('accessToken') }
      })

      const data = response.data.data

      setAssignments(data)

      setFilteredEvents(data)

      setEvent(data.length)

      let totalReceivedPayment = 0;
      data.forEach(item => {
        item.transactions.forEach(transaction => {
          totalReceivedPayment += transaction.receivedPayment;
        });
      });

      setPaymentRecieved(totalReceivedPayment)

      let totalAmt = 0;
      data.forEach(item => {
        totalAmt += item.totalAmount;
      });

      setTotalAmount(totalAmt)

      let dueAmount = 0
      data.forEach(item => {
        let a = item.totalAmount
        let b = 0
        item.transactions.forEach(item1 => {
          b += item1.receivedPayment
        })
        dueAmount += a - b
      })

      setDueAmount(dueAmount)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login')
        localStorage.setItem('accessToken', '');
      } else {
        console.error(error)
      }
    }
  }

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedEvents((prevEvents) => [...prevEvents, value]);
    } else {
      setSelectedEvents((prevEvents) => prevEvents.filter((event) => event !== value));
    }
    filterEvents(); // Call filterEvents immediately
  };

  const filterEvents = () => {
    // if (selectedEvents.includes('All')) {
    //   setFilteredEvents(Assignments);
    // } else {
    //   setFilteredEvents(Assignments.filter((event) => selectedEvents.includes(event.assignmentName)));
    // }
    if (selectedEvents.includes('All')) {
      setFilteredEvents(Assignments);
    } else {
      setFilteredEvents(Assignments.filter((event) => selectedEvents.includes(event.assignmentName)));
    }
  };

  const router = useRouter()

  const [Token, setToken] = useState('')

  useEffect(() => {
    fetchData()
    if (!localStorage.getItem('accessToken')) {
      router.push('/login')
    }
    else {
      setToken(localStorage.getItem('accessToken'))
    }
  }, [])

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [updatedEvent, setUpdatedEvent] = useState({});

  const [addEventDrawerOpen, setAddEventDrawerOpen] = useState(false);


  const initialFormState = {
    name: '',
    email: '',
    address: '',
    event: '',
    venue: '',
    phone: '',
    alternateMobile: '',
    assignTo: '',
    date: '', // Ensure default state includes date as an empty string
  };

  const [addEventForm, setAddEventForm] = useState(initialFormState);
  const handleAddEventChange = (event) => {
    const { name, value } = event.target;
    setAddEventForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const deleteAssignment = async () => {
    console.log(selectedEvent.extendedProps.assignment.id)
    const id = selectedEvent.extendedProps.assignment.id
    const apiUrl = `http://api.camrilla.com/order/assignment/${id}`;
    const token = localStorage.getItem('accessToken'); // assuming props.token contains the Bearer token

    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      // handle success response
    } catch (error) {
      console.error(error);
      // handle error response
    }
  }


  return <div>

    {Token ? (
      <>
        <Grid container spacing={6}>

          <Grid id="totalAssign" onClick={clicked} item xs={12} sm={6} md={3} >
            <CharacterCard
              title='Total Assignment'
              stats={Event}
              trendNumber='15.6%'
              chipColor='primary'
              chipText={`Year of ${new Date().getFullYear()}`}
              src='/images/illustrations/characters/5.png'
            />
          </Grid>

          <Grid id="totalCost" onClick={clicked} item xs={12} sm={6} md={3}>
            <CharacterCard
              title='Total Cost'
              stats={TotalAmount}
              trendNumber='15.6%'
              chipColor='primary'
              chipText={`Year of ${new Date().getFullYear()}`}
              src='/images/illustrations/characters/2.png'
            />
          </Grid>

          <Grid id="totalPaymentRecieved" onClick={clicked} item xs={12} sm={6} md={3}>
            <CharacterCard
              title='Payment Recieved'
              stats={PaymentRecieved}
              trendNumber='15.6%'
              chipColor='primary'
              chipText={`Year of ${new Date().getFullYear()}`}
              src='/images/illustrations/characters/7.png'
            />
          </Grid>

          <Grid id="totalDuePayment" onClick={clicked} item xs={12} sm={6} md={3}>
            <CharacterCard
              title='Due Payment'
              stats={DueAmount}
              trendNumber='15.6%'
              chipColor='primary'
              chipText={`Year of ${new Date().getFullYear()}`}
              src='/images/illustrations/characters/4.png'
            />
          </Grid>

        </Grid>


        <Grid item xs={12} md={8} className='max-md:order-3'>
          <Table display={Display} tableType={TableType} data={Assignments} />
        </Grid>

        <AppFullCalendar style={{ marginTop: "20px" }}>
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* column one */}
                <Grid item xs={9} sm={6} md={3}>
                  <div style={{ height: "60px", display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <div style={{}}>
                      <Button style={{ width: "250px" }} variant="contained" color="primary" onClick={() => {
                        setAddEventForm(initialFormState);
                        setAddEventDrawerOpen(true);
                      }}> + Add Event</Button>
                    </div>
                  </div>
                  <div>
                    <AppReactDatepicker inline />
                  </div>
                  <Grid container spacing={1} style={{ marginLeft: "20px" }}>
                    <div>
                      <Typography style={{ fontSize: "1.5rem", fontWeight: "500", marginTop: "20px" }}>Event Filters</Typography>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedEvents.includes('All')}
                              onChange={handleCheckboxChange}
                              value="All"
                            />
                          }
                          label="All"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedEvents.includes('Wedding')}
                              onChange={handleCheckboxChange}
                              value="Wedding"
                            />
                          }
                          label="Wedding"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedEvents.includes('Engagement')}
                              onChange={handleCheckboxChange}
                              value="Engagement"
                            />
                          }
                          label="Engagement"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedEvents.includes('Birthday')}
                              onChange={handleCheckboxChange}
                              value="Birthday"
                            />
                          }
                          label="Birthday"
                        />
                      </Grid>
                    </div>
                  </Grid>

                </Grid>

                {/* column two */}
                <Grid item xs={3} sm={6} md={9} style={{ paddingLeft: "25px" }} >
                  <div style={{ borderLeft: '1px solid #ccc', paddingLeft: "25px" }}>
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                      headerToolbar={{
                        displayEventTime: false,
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth',
                      }}
                      // events={Assignments.map((assignment) => ({
                      //   title: assignment.assignmentName, // or any other relevant field
                      //   start: new Date(convertUnixTimestamp(assignment.assignmentDateTime)), // convert Unix timestamp to a Date object
                      //   end: new Date(convertUnixTimestamp(assignment.assignmentDateTime + 3600000)),
                      //   assignment
                      // }))}
                      events={filteredEvents.map((assignment) => ({
                        title: assignment.assignmentName, // or any other relevant field
                        start: new Date(convertUnixTimestamp(assignment.assignmentDateTime)), // convert Unix timestamp to a Date object
                        end: new Date(convertUnixTimestamp(assignment.assignmentDateTime + 3600000)),
                        assignment
                      }))}
                      eventClick={(arg) => {
                        const selectedEvent = arg.event;
                        const existingEventData = selectedEvent.extendedProps.assignment;
                        setUpdatedEvent({ ...existingEventData }); // Initialize updatedEvent with existing data
                        setSelectedEvent(selectedEvent);
                        setDrawerOpen(true);
                      }}
                      dateClick={(arg) => {
                        const selectedDate = arg.date;
                        const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Use date-fns to format the date
                        setAddEventForm({
                          ...initialFormState,
                          date: formattedDate, // Prefill the date field
                        });
                        setAddEventDrawerOpen(true);
                      }}
                      initialView="dayGridMonth"
                    />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </AppFullCalendar>


      </>
    ) : (<>loading</>)
    }

    <Drawer anchor='right' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      {selectedEvent && (
        <div style={{ marginInline: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", marginBottom: "10px" }}>
            <div>
              <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>Update Form</h2>
            </div>
            <div>
              <DeleteIcon onClick={deleteAssignment} />
            </div>
          </div>
          <Box mb={2}>
            <TextField label="Name" value={updatedEvent.customerName || selectedEvent.extendedProps.assignment.customerName}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, customerName: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Email" value={updatedEvent.customerEmail || selectedEvent.extendedProps.assignment.customerEmail}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, customerEmail: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Address" value={updatedEvent.customerAddress || selectedEvent.extendedProps.assignment.customerAddress}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, customerAddress: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Event" value={updatedEvent.assignmentName || selectedEvent.extendedProps.assignment.assignmentName}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, assignmentName: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Venue" value={updatedEvent.assignmentAddress || selectedEvent.extendedProps.assignment.assignmentAddress}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, assignmentAddress: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Phone" value={updatedEvent.customerMobile || selectedEvent.extendedProps.assignment.customerMobile}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, customerMobile: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Alternate Mobile" value={updatedEvent.contactPerson1Mobile || selectedEvent.extendedProps.assignment.contactPerson1Mobile}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, contactPerson1Mobile: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Assign To" value={updatedEvent.assignToName || selectedEvent.extendedProps.assignment.assignToName}
              onChange={(e) => {
                setUpdatedEvent({ ...updatedEvent, assignToName: e.target.value });
              }}
              fullWidth />
          </Box>
          <Box mb={2}>
            <Button variant='contained' onClick={() => {
              const updatedAssignment = { ...updatedEvent };
              const assignmentId = selectedEvent.extendedProps.assignment.id;
              axios.put(`http://api.camrilla.com/order/assignment/${assignmentId}`, updatedAssignment, {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              })
                .then(response => {
                  console.log(response);
                  // handle success response
                })
                .catch(error => {
                  console.error(error);
                  // handle error response
                });
            }}>Update Event</Button>
          </Box>
        </div>
      )}
    </Drawer>

    {/* drawer 2 */}
    <Drawer anchor='right' open={addEventDrawerOpen} onClose={() => setAddEventDrawerOpen(false)}>
      <div style={{ marginInline: "20px" }}>
        <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>Add Event Form</h2>
        <Box mb={2}>
          <TextField label="Name" name="name"
            value={addEventForm.name}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="Email" name="email"
            value={addEventForm.email}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="Address" name="address"
            value={addEventForm.address}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          {/* <TextField label="Event" name="event"
            value={addEventForm.event}
            onChange={handleAddEventChange}
            fullWidth /> */}
          <Select
            label="Event"
            name="event"
            selected='Event'
            value={addEventForm.event}
            onChange={handleAddEventChange}
            fullWidth
          >
            <MenuItem value='Wedding'>Wedding</MenuItem>
            <MenuItem value='Engagement'>Engagement</MenuItem>
            <MenuItem value='Birthday'>Birthday</MenuItem>
          </Select>
        </Box>
        <Box mb={2}>
          <TextField label="Venue" name="venue"
            value={addEventForm.venue}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="Phone" name="phone"
            value={addEventForm.phone}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="Alternate Mobile" name="alternateMobile"
            value={addEventForm.alternateMobile}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <TextField label="Assign To"
            name="assignTo"
            value={addEventForm.assignTo}
            onChange={handleAddEventChange}
            fullWidth />
        </Box>
        <Box mb={2}>
          <input type="date" name="date"
            value={addEventForm.date}
            onChange={handleAddEventChange} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px", width: "100%", fontSize: "100%" }} id="" />
        </Box>
        <Box mb={2}>
          <Button variant='contained' onClick={() => {
            const eventData = {
              customerName: addEventForm.name,
              customerMobile: addEventForm.phone,
              customerEmail: addEventForm.email,
              customerAddress: addEventForm.address,
              assignmentAddress: addEventForm.venue,
              assignmentName: addEventForm.event,
              assignmentDateTime: convertDMYToUnixTimestamp(addEventForm.date), // convert date to Unix timestamp
              assignmentStatus: "Pending",
              contactPerson1Name: "",
              contactPerson1Mobile: "",
              contactPerson2Name: "",
              contactPerson2Mobile: "",
              assignToName: addEventForm.assignTo,
              assignToHandle: "MeTo",
              assignmentNote: "",
              totalAmount: 35000,
              reminderBeforedays: 1,
              reminderDate: "21-11-2018"
            };

            axios.post('http://api.camrilla.com/order/assignment', eventData, {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            })
              .then(response => {
                console.log(response);
                // handle success response
              })
              .catch(error => {
                console.error(error);
                // handle error response
              });
          }}>Add Event</Button>
        </Box>
      </div>
    </Drawer>

  </div >
}
