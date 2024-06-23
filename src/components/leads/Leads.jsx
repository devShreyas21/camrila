"use client"

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Drawer, Box, TextField, Button, IconButton, FormControl, Input, InputLabel, FormHelperText } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'; // Import Note Add Icon
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'

import { Dropdown, MenuButton, Menu, MenuItem } from '@mui/material'

import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'


export default function Leads() {

  const data = [
    {
      time: "10:00 am",
      title: 'Call with Woods',
      subtitle: '21',
      month: 'Jul',
      chipLabel: 'Wedding',
      chipColor: 'primary',
      address: "ll colony",
      budget: "55k",
      status: "New"
    },
    {
      time: "9:00 am",
      title: 'Conference call',
      subtitle: '24',
      month: 'Jul',
      chipLabel: 'Others',
      chipColor: 'success',
      address: "KJ colony",
      budget: "10k",
      status: "In progres"
    },
    {
      time: "9:30 am",
      title: 'Meeting with Mark',
      subtitle: '28',
      month: 'Jul',
      chipLabel: 'Engagement',
      chipColor: 'error',
      address: "RR colony",
      budget: "20k",
      status: "Converted"
    },
    {
      time: "7:30 pm",
      title: 'Meeting with Oakland',
      subtitle: '03',
      month: 'Aug',
      chipLabel: 'Birthday',
      chipColor: 'secondary',
      address: "RK colony",
      budget: "80k",
      status: "Closed"
    },
    {
      time: '11:00 am',
      title: 'Meeting in Oakland',
      subtitle: '14',
      month: 'Aug',
      chipLabel: 'Engagement',
      chipColor: 'error',
      address: "VJ colony",
      budget: "20k",
      status: "new"
    },
    {
      time: "11:00 am",
      title: 'Meeting with Carl',
      address: "Ruston colony",
      budget: "50k",
      subtitle: '05',
      month: 'Aug',
      chipLabel: 'Wedding',
      chipColor: 'primary',
      status: "Converted"
    }
  ]

  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
  const [selectedMeeting, setSelectedMeeting] = useState(null); // State for selected meeting
  const [note, setNote] = useState(''); // State for note content
  const [view, setView] = useState('info'); // State to differentiate between info and note view

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
  }


  return (
    <div>
      <Card>
        <CardHeader title='Leads' action={<OptionMenu options={['Refresh', 'Share', 'Reschedule']} />} />
        <CardContent className='flex flex-col gap-6' style={{ paddingBottom: "25px" }}>
          {data.map((item, index) => (

            <div key={index} className='flex items-center gap-4' style={{ borderBottom: "2px solid black", paddingBottom: "10px", paddingLeft: "10px" }}>

              {/* <CustomAvatar variant='rounded' src={item.avatarSrc} size={38} /> */}

              <div className='flex items-center gap-4'>
                <div style={{ width: "35px" }} onClick={() => handleDivClick(item)}>
                  <div>{item.subtitle}</div>
                  <div>{item.month}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "230px" }} onClick={() => handleDivClick(item)}>
                    <Typography variant='body2'>
                      {item.title} &nbsp; [{item.time}] &nbsp;
                    </Typography>
                  </div>
                  <div style={{ width: "170px" }}>
                    <Typography>
                      {item.address}
                    </Typography>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Typography>
                      {item.budget}
                    </Typography>
                  </div>
                  <div style={{ width: "65px" }}>
                    <Typography>
                      {item.status}
                    </Typography>
                  </div>
                  {/* <div>
                          <IconButton onClick={() => handleIconClick(item)} aria-label="add note">
                          <NoteAddIcon style={{ color: 'red' }} />
                          </IconButton>
                      </div> */}
                </div>
              </div>
              <div onClick={() => handleDivClick(item)}>
                <Chip label={item.chipLabel} color={item.chipColor} size='small' variant='tonal' />
              </div>

            </div>

          ))}
        </CardContent>

        <Drawer anchor='right' open={drawerOpen} onClose={handleDrawerClose}>
          <Box sx={{ width: 300, padding: 2 }}>
            {selectedMeeting && view === 'info' && (
              <>
                <Card className='bs-full' id='editable'>
                  <CardHeader
                    title='Update Lead'
                  // action={<OptionMenu options={['Refresh', 'Share', 'Update']} />}
                  // subheader={
                  //   <div className='flex items-center gap-2'>
                  //     <span>Total 42.5k Sales</span>
                  //     <span className='flex items-center text-success font-medium'>
                  //       +18%
                  //       <i className='ri-arrow-up-s-line text-xl' />
                  //     </span>
                  //   </div>
                  // }
                  />
                  <CardContent>
                    <div className='flex flex-wrap justify-between gap-4'>

                      <div className='flex items-center gap-3'>
                        <div>
                          {/* <Typography variant='h5'>{selectedMeeting.title}</Typography> */}
                          {/* <Typography>{selectedMeeting.subtitle} {selectedMeeting.month} {selectedMeeting.time}</Typography> */}
                          <FormControl className='my-4'>
                            <TextField value={selectedMeeting.title} id="title" label='Title' />
                          </FormControl>
                          <FormControl className='my-4'>
                            <TextField value={selectedMeeting.address} label='Address' />
                          </FormControl>
                          <FormControl className='my-4'>
                            <TextField value={selectedMeeting.budget} label='Budget' />
                          </FormControl>
                          <FormControl className='my-4'>
                            <TextField value={selectedMeeting.status} label='Status' />
                          </FormControl>
                          <FormControl className='my-4'>
                            <TextField value={selectedMeeting.chipLabel} label='Event' />
                          </FormControl>
                          <FormControl className='my-4'>
                            <Button onClick={() => console.log(document.getElementById('title').value)}>Update Lead</Button>
                          </FormControl>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>

              </>
            )}
            {/* {selectedMeeting && view === 'note' && (
            <>
              <Typography variant='h6' gutterBottom>
                Add Note
              </Typography>
              <ReactQuill value={note} onChange={setNote} className='my-3' style={{ height: '300px' }} />
              <Button variant='contained' color='primary' fullWidth>
                Save Note
              </Button>
            </>
          )} */}
          </Box>
        </Drawer>


      </Card>


    </div>
  )
}
