"use client"

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { Drawer, Box, TextField, Button, IconButton, FormControl, Input, InputLabel, FormHelperText, MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/navigation'
import { convertDMYToUnixTimestamp } from '@/utils/date'
import NoteAddIcon from '@mui/icons-material/NoteAdd'; // Import Note Add Icon
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'

import { Grid, Alert } from '@mui/material'
import OptionMenu from '@core/components/option-menu'
import { useEffect, useState } from 'react'
import { getDayOfWeekShort, getDayOfMonth, getSimpleTime, getMonthNameShort } from '@/utils/date'
import axios from 'axios'

export default function Leads(props) {
  const router = useRouter()
  const [resData, setResData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [view, setView] = useState('info');
  const [isAddLead, setIsAddLead] = useState(false);
  const [updatedFormValues, setUpdatedFormValues] = useState({});
  const [newLead, setNewLead] = useState({
    customerName: '',
    customerMobile: '',
    assignmentDateTime: '',
    customerEmail: '',
    customerAddress: '',
    totalAmount: '',
  });

  const handleAddLead = async () => {
    try {
      const body = {
        customerName: newLead.customerName,
        customerMobile: newLead.customerMobile,
        assignmentDateTime: convertDMYToUnixTimestamp(newLead.assignmentDateTime),
        customerEmail: newLead.customerEmail,
        customerAddress: newLead.customerAddress,
        totalAmount: newLead.totalAmount,
      };

      const response = await axios.post('https://api.camrilla.com/lead-manager/lead', body, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      console.log(response.data);
      setDrawerOpen(false);
      setIsAddLead(false);
      fetchData(); // Call fetchData to refresh the lead list
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleUpdateFormChange = (event) => {
    const { id, value } = event.target;
    setUpdatedFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleUpdateLeadClick = async () => {
    try {
      const updatedBody = {
        customerName: updatedFormValues.utitle,
        customerMobile: updatedFormValues.umobile,
        assignmentDateTime: updatedFormValues.udate,
        customerEmail: updatedFormValues.uemail,
        status: updatedFormValues.ustatus,
        customerAddress: updatedFormValues.uaddress,
        totalAmount: updatedFormValues.ubudget,
      };

      const response = await axios.put(`https://api.camrilla.com/lead-manager/lead/2`, updatedBody, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.camrilla.com/lead-manager/lead`, {
        headers: {
          'Authorization': props.token
        }
      });
      setResData(response.data.data);
      console.log(response.data.data);
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login')
        localStorage.setItem('accessToken', '');
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDivClick = (meeting) => {
    setSelectedMeeting(meeting);
    setView('info');
    setDrawerOpen(true);
  };

  const handleAddLeadClick = () => {
    setIsAddLead(true);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedMeeting(null);
    setIsAddLead(false);
  };

  return (

    <Card style={{ width: "700px" }}>
      <CardHeader title='Leads' action={<><Button variant='contained' color='primary' startIcon={<NoteAddIcon />} onClick={handleAddLeadClick}>Add Lead</Button> <OptionMenu options={['Refresh', 'Share', 'Reschedule']} /></>} />
      <CardContent className='flex flex-col gap-6' style={{ paddingBottom: "25px" }}>
        {resData ? (
          resData && resData.map((item, index) => (

            <div key={index} className='flex items-center gap-4' style={{ borderBottom: "2px solid black", paddingBottom: "10px", paddingLeft: "10px" }}>

              <div className='flex items-center gap-4'>
                <div style={{ width: "35px" }} onClick={() => handleDivClick(item)}>
                  <div style={{ textAlign: "center" }}>{getMonthNameShort(item.assignmentDateTime)}</div>
                  <div style={{ textAlign: "center" }}>{getDayOfMonth(item.assignmentDateTime)}</div>
                  <div style={{ textAlign: "center" }}>{getDayOfWeekShort(item.assignmentDateTime)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "130px" }} onClick={() => handleDivClick(item)}>
                    <Typography variant='body2'>
                      {item.customerName}
                    </Typography>
                  </div>
                  <div style={{ width: "100px" }} onClick={() => handleDivClick(item)}>
                    <Typography variant='body2'>
                      {getSimpleTime(item.assignmentDateTime)}
                    </Typography>
                  </div>
                  <div style={{ width: "170px" }}>
                    <Typography>
                      {item.customerAddress}
                    </Typography>
                  </div>
                  <div style={{ width: "200px" }}>
                    <Typography>
                      {item.customerEmail}
                    </Typography>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Typography>
                      {item.customerMobile}
                    </Typography>
                  </div>
                  <div style={{ width: "50px" }}>
                    <Typography>
                      {item.totalAmount}
                    </Typography>
                  </div>
                  <div style={{ width: "65px" }}>
                    <Typography>
                      {item.status}
                    </Typography>
                  </div>
                </div>
              </div>
              <div onClick={() => handleDivClick(item)}>
                <Chip label={item.assignmentType} color="primary" size='small' variant='tonal' />
              </div>

            </div>

          ))) : (<Typography variant="body1">No leads</Typography>)}
      </CardContent>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 300, padding: 2 }}>
          {isAddLead ? (
            <form>
              <Typography variant="h6" gutterBottom>
                <h2>Add Lead</h2>
              </Typography>
              <TextField label="Customer Name" fullWidth margin="normal" id="customerName" value={newLead.customerName}
                onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })} />
              <TextField label="Email" fullWidth margin="normal" id="email" value={newLead.customerEmail}
                onChange={(e) => setNewLead({ ...newLead, customerEmail: e.target.value })} />
              <TextField label="Phone Number" fullWidth margin="normal" id="phoneNumber" value={newLead.customerMobile}
                onChange={(e) => setNewLead({ ...newLead, customerMobile: e.target.value })} />
              <TextField label="Address" fullWidth margin="normal" id="address" value={newLead.customerAddress}
                onChange={(e) => setNewLead({ ...newLead, customerAddress: e.target.value })} />
              <FormControl fullWidth margin="normal">
                <InputLabel id="select-label">Select Option</InputLabel>
                <Select labelId="select-label" label="Select Option" id="selectedOption" value={newLead.assignmentType}
                  onChange={(e) => setNewLead({ ...newLead, assignmentType: e.target.value })}>
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Budget" fullWidth margin="normal" id="budget" value={newLead.totalAmount}
                onChange={(e) => setNewLead({ ...newLead, totalAmount: e.target.value })} />
              <TextField
                label="Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                id="date"
                value={newLead.assignmentDateTime}
                onChange={(e) => setNewLead({ ...newLead, assignmentDateTime: e.target.value })}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleAddLead}>
                Add Lead
              </Button>
            </form>
          ) : (
            <Card className="bs-full" id="editable">
              <CardHeader title="Update Lead" />
              <CardContent>
                {selectedMeeting ? (
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.utitle || selectedMeeting.customerName} // new state variable
                            id="utitle"
                            label="Title"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.udate || selectedMeeting.assignmentDateTime}
                            id="udate"
                            label="Title"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.uaddress || selectedMeeting.customerAddress}
                            id="uaddress"
                            label="Address"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.umobile || selectedMeeting.customerMobile}
                            id="umobile"
                            label="Mobile"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.uemail || selectedMeeting.customerEmail}
                            id="uemail"
                            label="Email"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.ubudget || selectedMeeting.totalAmount}
                            id="ubudget"
                            label="Budget"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <TextField
                            value={updatedFormValues.ustatus || selectedMeeting.status}
                            id="ustatus"
                            label="Status"
                            onChange={handleUpdateFormChange}
                          />
                        </FormControl>
                        <FormControl className="my-4">
                          <Button onClick={handleUpdateLeadClick}>Update Lead</Button>
                        </FormControl>
                      </div>
                    </div>
                  </div>

                ) : (<Typography variant="body1">No meeting selected</Typography>)}
              </CardContent>
            </Card>
          )}
        </Box>
      </Drawer>


    </Card >


  )
}
