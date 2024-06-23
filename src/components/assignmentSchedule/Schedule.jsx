'use client '
import React, { useState } from 'react'

// MUI import 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Drawer, Box, TextField, Button, IconButton, Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'; // Import Note Add Icon
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'
import AddIcon from '@mui/icons-material/Add';

import OptionMenu from '@core/components/option-menu'
import CardOne from '@components/sections/CardOne'
import CardTwo from '@components/sections/CardTwo'
import CardThree from '@components/sections/CardThree'
import CardFour from '@components/sections/CardFour'

// Vars
const data = [
    {
        time: "10:00 am",
        title: 'Call with Woods',
        subtitle: '21',
        month: 'Jul',
        chipLabel: 'Wedding',
        chipColor: 'primary',
        address: "Colony, Pune"
    },
    {
        time: "9:00 am",
        title: 'Conference call',
        subtitle: '24',
        month: 'Jul',
        chipLabel: 'Others',
        chipColor: 'success',
        address: "wk Colony, Pune"
    },
    {
        time: "9:30 am",
        title: 'Meeting with Mark',
        subtitle: '28',
        month: 'Jul',
        chipLabel: 'Engagement',
        chipColor: 'error',
        address: "PK Colony, Pune"
    },
    {
        time: "7:30 pm",
        title: 'Meeting with Oakland',
        subtitle: '03',
        month: 'Aug',
        chipLabel: 'Birthday',
        chipColor: 'secondary',
        address: "VK Colony, Pune"
    },
    {
        time: '11:00 am',
        title: 'Meeting in Oakland',
        subtitle: '14',
        month: 'Aug',
        chipLabel: 'Engagement',
        chipColor: 'error',
        address: "DK Colony, Pune"
    },
    {
        time: "11:00 am",
        title: 'Meeting with Carl',
        subtitle: '05',
        month: 'Aug',
        chipLabel: 'Wedding',
        chipColor: 'primary',
        address: "Rk Colony, Pune"
    }
]

export default function Schedule() {

    const [data1, setData1] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: "a-15, Ruston Colony"
    });

    const [data2, setData2] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        alternatePhone: '9876543211'
    });

    const [data3, setData3] = useState({
        name: 'John Doe',
        assignTo: 'me'
    });

    const [data4, setData4] = useState({
        name: 'John Doe',
        function: 'halad',
        assign: 'me',
        date: '03/02/2024',
        time: '5:30 PM'
    });

    const handleSave = (newData) => {
        setData1(newData);
    };

    const handleSave2 = (newData) => {
        setData2(newData);
    };

    const handleSave3 = (newData) => {
        setData3(newData);
    };

    const handleSave4 = (newData) => {
        setData4(newData);
    };

    const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
    const [selectedMeeting, setSelectedMeeting] = useState(null); // State for selected meeting
    const [note, setNote] = useState(''); // State for note content
    const [view, setView] = useState('info'); // State to differentiate between info and note view
    const [formOpen, setFormOpen] = useState(false);

    const handleDivClick = (meeting) => {
        setSelectedMeeting(meeting); // Set the selected meeting
        setView('info'); // Set view to info
        setDrawerOpen(true); // Open the Drawer
    };

    const handleIconClick = (meeting) => {
        setSelectedMeeting(meeting); // Set the selected meeting
        setDrawerOpen(true); // Open the Drawer
        setView('note')
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false); // Close the Drawer
        setSelectedMeeting(null); // Clear the selected meeting
        setNote(''); // Clear the note content

    };


    const handleFormOpen = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission and update data4 or add new function

        // Example logic to update data4 with form values
        const formData = new FormData(event.target);
        const newData = {
            name: event.target.elements.functionName.value,
            assignTo: event.target.elements.assignedTo.value,
            date: event.target.elements.date.value,
            time: event.target.elements.time.value,
        };

        setData4(newData); // Update state with new data for CardFour
        handleFormClose(); // Close the form dialog

        console.log(data4)

    };


    return (
        <Card>
            <CardHeader title='Assignment Schedule' action={<OptionMenu options={['Refresh', 'Share', 'Reschedule']} />} />
            <CardContent className='flex flex-col gap-6' style={{ paddingBottom: "25px" }}>
                {data.map((item, index) => (

                    <div key={index} className='flex items-center gap-4' style={{ borderBottom: "2px solid black", paddingBottom: "10px", paddingLeft: "10px" }}>

                        {/* <CustomAvatar variant='rounded' src={item.avatarSrc} size={38} /> */}

                        <div className='flex items-center gap-4' >
                            <div style={{ width: "35px" }} onClick={() => handleDivClick(item)}>
                                <div>{item.subtitle}</div>
                                <div>{item.month}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "180px" }} onClick={() => handleDivClick(item)}>
                                    <Typography variant='body2'>{item.title}</Typography>
                                </div>
                                <div style={{ width: "150px" }} onClick={() => handleDivClick(item)}>
                                    <Typography variant='body2'> {item.address} </Typography>
                                </div>
                                <div style={{ width: "50px" }} onClick={() => handleDivClick(item)}>
                                    <Typography variant='body2'>{item.time}</Typography>
                                </div>
                                <div>
                                    <IconButton onClick={() => handleIconClick(item)} aria-label="add note">
                                        <NoteAddIcon style={{ color: 'red' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => handleDivClick(item)}>
                            <Chip label={item.chipLabel} color={item.chipColor} size='small' variant='tonal' />
                        </div>

                    </div>

                ))}
            </CardContent>

            <Drawer anchor='right' open={drawerOpen} onClose={handleDrawerClose}>
                <Box sx={{ width: { xs: 300, sm: 500, md: 800 }, padding: 2 }}>
                    {selectedMeeting && view === 'info' && (
                        <div style={{ display: "flex" }}>
                            {/* <Typography variant='h6' gutterBottom>
                Meeting Details
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Title:</strong> {selectedMeeting.title}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Date:</strong> {selectedMeeting.subtitle} {selectedMeeting.month}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Time:</strong> {selectedMeeting.time}
              </Typography>
              <Typography variant='body1' gutterBottom>
                <strong>Type:</strong> {selectedMeeting.chipLabel}
              </Typography> */}

                            {/* <CardOne data={data1} onSave={handleSave} />

              <CardTwo data={data2} onSave={handleSave2}/>

              <CardThree data={data3} onSave={handleSave3}/>

              <CardFour data={data4} onSave={handleSave4}/> */}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CardOne data={data1} onSave={handleSave} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CardTwo data={data2} onSave={handleSave2} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CardThree data={data3} onSave={handleSave3} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} style={{ display: "flex", alignItems: "start" }}>
                                    <CardFour data={data4} onSave={handleSave4} />
                                    <IconButton onClick={handleFormOpen} aria-label="add function">
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </div>
                    )}
                    {selectedMeeting && view === 'note' && (
                        <>
                            <Typography variant='h6' gutterBottom>
                                Add Note
                            </Typography>
                            <ReactQuill value={note} onChange={setNote} className='my-3' style={{ height: '300px' }} />
                            <Button variant='contained' color='primary' fullWidth>
                                Save Note
                            </Button>
                        </>
                    )}
                </Box>
            </Drawer>

            <Dialog open={formOpen} onClose={handleFormClose}>
                <DialogTitle>Add New Function</DialogTitle>
                <form onSubmit={handleFormSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Please fill in the details for the new function.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Function Name"
                            fullWidth
                            variant="standard"
                            name="functionName" // Name attribute for form data extraction
                        />
                        <TextField
                            margin="dense"
                            label="Assigned To"
                            fullWidth
                            variant="standard"
                            name="assignedTo" // Name attribute for form data extraction
                        />
                        <TextField
                            margin="dense"
                            label="Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            name="date" // Name attribute for form data extraction
                        />
                        <TextField
                            margin="dense"
                            label="Time"
                            type="time"
                            fullWidth
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            name="time" // Name attribute for form data extraction
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFormClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Card>
    )
}
