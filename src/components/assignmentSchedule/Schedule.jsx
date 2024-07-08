'use client '
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// MUI import 
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete';

import { Drawer, Box, TextField, Button, IconButton, Grid, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Tabs, Tab, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import DatePicker from 'react-datepicker';

import NoteAddIcon from '@mui/icons-material/NoteAdd'; // Import Note Add Icon
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'
import { convertUnixTimestamp } from '@/utils/date'

import Logo from '@/components/layout/shared/Logo'

import OptionMenu from '@core/components/option-menu'


import axios from 'axios'

import { getDayOfWeekShort, getDayOfMonth, getSimpleTime, getMonthNameShort } from '@/utils/date'
import padding from 'tailwindcss-logical/plugins/padding'
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

export default function Schedule(props) {

    const router = useRouter()

    const [ResData, setResData] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.camrilla.com/order/assignment?startDate=${props.startUnixDate}&endDate=${props.endUnixDate}`, {
                headers: {
                    'Authorization': props.token
                }
            });
            setResData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
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
    }, [props.startUnixDate, props.endUnixDate])

    const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer
    const [selectedMeeting, setSelectedMeeting] = useState(null); // State for selected meeting
    // const [note, setNote] = useState(''); // State for note content
    const [view, setView] = useState('info'); // State to differentiate between info and note view

    const [addAssignmentOpen, setAddAssignmentOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);

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


    const handleEdit = (cardId) => {
        setEditing((prevEditing) => ({ ...prevEditing, [cardId]: true }));
    };

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentVenue, setAssignmentVenue] = useState('');
    const [alternateContact, setAlternateContact] = useState('');
    const [dateAndTime, setDateAndTime] = useState(new Date());
    const [assigneeName, setAssigneeName] = useState('');
    const [assigneeEmail, setAssigneeEmail] = useState('');
    const [functions, setFunctions] = useState([]);
    const [functionName, setFunctionName] = useState('');
    const [functionDateTime, setFunctionDateTime] = useState(new Date());
    const [editing, setEditing] = useState({});
    const [errors, setErrors] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        assignmentName: '',
        assignmentVenue: '',
        alternateContact: '',
        dateAndTime: '',
        assigneeName: '',
        assigneeEmail: '',
    });

    // const handleAddFunction = () => {
    //     setFunctions((prevFunctions) => [
    //         ...prevFunctions,
    //         { functionName, functionDateTime },
    //     ]);
    //     setFunctionName('');
    //     setFunctionDateTime(new Date());
    // };

    const handleUpdate = async () => {
        const updateData = {
            customerName: selectedMeeting.customerName,
            customerMobile: selectedMeeting.customerMobile,
            customerEmail: selectedMeeting.customerEmail,
            customerAddress: selectedMeeting.customerAddress,
            assignmentAddress: selectedMeeting.assignmentAddress,
            assignmentName: selectedMeeting.assignmentName,
            assignmentDateTime: selectedMeeting.assignmentDateTime, // convert date to timestamp
            assignmentStatus: "Completed",
            contactPerson1Name: "",
            contactPerson1Mobile: "",
            contactPerson2Name: "",
            contactPerson2Mobile: "",
            assignToName: selectedMeeting.assignToName,
            assignToHandle: selectedMeeting.assignToHandle,
            assignmentNote: selectedMeeting.assignmentNote,
            totalAmount: 35000,
            reminderBeforedays: 1,
            reminderDate: "21-11-2018"
        };

        try {
            const response = await axios.put(`http://api.camrilla.com/order/assignment/${selectedMeeting.id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            });
            console.log(response.data);
            // Handle success response
        } catch (error) {
            console.error(error);
            // Handle error response
        }
    };

    const handleSave = async () => {
        if (
            customerName &&
            customerEmail &&
            customerPhone &&
            customerAddress &&
            assignmentName &&
            assignmentVenue &&
            alternateContact &&
            dateAndTime &&
            assigneeName &&
            assigneeEmail
        ) {
            // Form is valid, submit the data
            // console.log('Form submitted successfully!');
            const formData = {
                customerName,
                customerMobile: customerPhone,
                customerEmail,
                customerAddress,
                assignmentAddress: assignmentVenue,
                assignmentName,
                assignmentDateTime: dateAndTime.getTime(), // convert date to timestamp
                assignmentStatus: "Completed",
                contactPerson1Name: "",
                contactPerson1Mobile: "",
                contactPerson2Name: "",
                contactPerson2Mobile: "",
                assignToName: assigneeName,
                assignToHandle: assigneeEmail,
                assignmentNote: "",
                totalAmount: 0,
                reminderBeforedays: 1,
                reminderDate: "",
                functions: functions.map((func) => ({
                    functionName: func.functionName,
                    functionDateTime: func.functionDateTime.getTime(), // convert date to timestamp
                })),
            };
            try {
                const response = await axios.post(
                    `http://api.camrilla.com/order/assignment`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${props.token}`
                        }
                    }
                );
                console.log(response.data);
                // Handle success response
            } catch (error) {
                console.error(error);
                // Handle error response
            }
        } else {
            setErrors({
                customerName: customerName ? '' : 'Required',
                customerEmail: customerEmail ? '' : 'Required',
                customerPhone: customerPhone ? '' : 'Required',
                customerAddress: customerAddress ? '' : 'Required',
                assignmentName: assignmentName ? '' : 'Required',
                assignmentVenue: assignmentVenue ? '' : 'Required',
                alternateContact: alternateContact ? '' : 'Required',
                dateAndTime: dateAndTime ? '' : 'Required',
                assigneeName: assigneeName ? '' : 'Required',
                assigneeEmail: assigneeEmail ? '' : 'Required',
            });
        }
    };

    const [addFunctionOpen, setAddFunctionOpen] = useState(false);
    const [newFunctionName, setNewFunctionName] = useState('');
    const [newFunctionDateTime, setNewFunctionDateTime] = useState(new Date());
    const [newFunctionAssignTo, setNewFunctionAssignTo] = useState('');

    const handleOpenAddFunctionDialog = () => {
        setAddFunctionOpen(true);
    };

    const handleCloseAddFunctionDialog = () => {
        setAddFunctionOpen(false);
    };

    const handleAddFunction = async () => {
        const newFunction = {
            functionName: newFunctionName,
            functionDateTime: newFunctionDateTime.getTime(),
            assingTo: newFunctionAssignTo,
            assignToHandle: '',
        };
        try {
            const response = await axios.post(
                `http://api.camrilla.com/order/assignment/${selectedMeeting.id}/function`,
                newFunction,
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                    },
                }
            );
            console.log(response.data);
            // Handle success response
        } catch (error) {
            console.error(error);
            // Handle error response
        }
        handleCloseAddFunctionDialog();
    };

    const [addTransactionOpen, setAddTransactionOpen] = useState(false);
    const [newTransactionReceivedPayment, setNewTransactionReceivedPayment] = useState('');
    const [newTransactionReceivedDate, setNewTransactionReceivedDate] = useState(new Date());
    const [newTransactionPaymentNote, setNewTransactionPaymentNote] = useState('');

    const handleOpenAddTransactionDialog = () => {
        setAddTransactionOpen(true);
    };

    const handleCloseAddTransactionDialog = () => {
        setAddTransactionOpen(false);
    };

    const handleAddTransaction = async () => {
        const newTransaction = {
            receivedPayment: newTransactionReceivedPayment,
            receivedDate: newTransactionReceivedDate.getTime(),
            paymentNote: newTransactionPaymentNote,
        };
        try {
            const response = await axios.post(
                `http://api.camrilla.com/order/assignment/${selectedMeeting.id}/transaction`,
                newTransaction,
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                    },
                }
            );
            console.log(response.data);
            // Handle success response
        } catch (error) {
            console.error(error);
            // Handle error response
        }
        handleCloseAddTransactionDialog();
    };
    const [note, setNote] = useState(selectedMeeting?.assignmentNote || '');

    const handleDeleteFunction = async (assignmentId, functionId) => {
        try {
            const response = await axios.delete(`http://api.camrilla.com/order/assignment/${assignmentId}/function/${functionId}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            });
            console.log(response.data);
            // Update the functions state by removing the deleted function
            setFunctions(functions.filter((func) => func.id !== functionId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTransaction = async (assignmentId, transactionId) => {
        try {
            const response = await axios.delete(`http://api.camrilla.com/order/assignment/${assignmentId}/transaction/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            });
            console.log(response.data);
            // Update the transactions state by removing the deleted transaction
            setTransactions(transactions.filter((trans) => trans.id !== transactionId));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Card style={{ width: "700px" }}>
            <CardHeader title='Assignment Schedule' action={<><Button variant='contained' color='primary' onClick={() => setAddAssignmentOpen(true)}>Add Assignment</Button> <OptionMenu options={['Refresh', 'Share', 'Reschedule']} /></>} />
            <CardContent className='flex flex-col gap-6' style={{ paddingBottom: "25px" }}>
                {ResData && ResData.length > 0 ? (
                    ResData.map((item, index) => (

                        <div key={index} className='flex items-center gap-4' style={{ borderBottom: "2px solid black", paddingBottom: "10px", paddingLeft: "10px" }}>

                            {/* <CustomAvatar variant='rounded' src={item.avatarSrc} size={38} /> */}

                            <div className='flex items-center gap-4' >
                                <div style={{ width: "35px" }} onClick={() => handleDivClick(item)}>
                                    <div style={{ textAlign: "center" }}>{getMonthNameShort(item.assignmentDateTime)}</div>
                                    <div style={{ textAlign: "center" }}>{getDayOfMonth(item.assignmentDateTime)}</div>
                                    <div style={{ textAlign: "center" }}>{getDayOfWeekShort(item.assignmentDateTime)}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: "225px" }} onClick={() => handleDivClick(item)}>
                                        <Typography variant='body2'>{item.customerName}</Typography>
                                    </div>
                                    <div style={{ width: "100px" }} onClick={() => handleDivClick(item)}>
                                        <Typography variant='body2'> {item.assignmentAddress} </Typography>
                                    </div>
                                    <div style={{ width: "100px" }} onClick={() => handleDivClick(item)}>
                                        <Typography variant='body2'>{getSimpleTime(item.assignmentDateTime)}</Typography>
                                    </div>
                                    <div>
                                        <IconButton onClick={() => handleIconClick(item)} aria-label="add note">
                                            <NoteAddIcon style={{ color: 'red' }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => handleDivClick(item)}>
                                <Chip label={item.assignmentName} color='primary' size='small' variant='tonal' />
                            </div>

                        </div>

                    ))) : (
                    <div className='flex items-center gap-4' style={{ borderBottom: "2px solid black", paddingBottom: "10px", paddingLeft: "10px" }}>
                        <Typography variant='body2'>No Assignments</Typography>
                    </div>
                )}
            </CardContent>



            {/* drawer 1 */}
            <Drawer anchor='right' open={drawerOpen} onClose={handleDrawerClose}>
                <Box sx={{ width: "1200px", padding: 2 }}>
                    {selectedMeeting && view === 'info' && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingBottom: 10, alignItems: "center" }}>
                                <Typography variant='h6' style={{ marginLeft: "10px" }}>{selectedMeeting.assignmentName}</Typography>
                                <Logo></Logo>
                                <Typography variant='body2' style={{ marginRight: "10px" }}>{getSimpleTime(selectedMeeting.assignmentDateTime)} {getDayOfWeekShort(selectedMeeting.assignmentDateTime)}, {getMonthNameShort(selectedMeeting.assignmentDateTime)} {getDayOfMonth(selectedMeeting.assignmentDateTime)}</Typography>
                            </div>
                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Card>
                                                <CardContent onClick={() => handleEdit('card1')}>
                                                    <Typography variant='body2' style={{ textAlign: 'center', marginBottom: "20px" }}>
                                                        <h2>Customer Details</h2>
                                                    </Typography>

                                                    <TextField
                                                        label="Customer Name"
                                                        value={selectedMeeting.customerName}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerName: event.target.value }));
                                                        }}
                                                    />

                                                    <TextField
                                                        label="Assignment"
                                                        value={selectedMeeting.assignmentName}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, assignmentName: event.target.value }));
                                                        }}
                                                    />
                                                    <div style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8, width: "230px", marginBottom: "15px" }}>
                                                        <DatePicker
                                                            label="Date"
                                                            selected={selectedMeeting.assignmentDateTime}
                                                            value={selectedMeeting.assignmentDateTime}
                                                            onChange={(newDate) => {
                                                                setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, assignmentDateTime: newDate.getTime() }));
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </div>
                                                    <TextField
                                                        label="Customer Address"
                                                        value={selectedMeeting.customerAddress}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerAddress: event.target.value }));
                                                        }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card>
                                                <CardContent onClick={() => handleEdit('card2')}>
                                                    <Typography variant='body2' style={{ textAlign: 'center', marginBottom: "20px" }}>
                                                        <h2>Customer Contact Details</h2>
                                                    </Typography>
                                                    <TextField
                                                        label="Customer Address"
                                                        value={selectedMeeting.customerAddress}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerAddress: event.target.value }));
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Customer Mobile"
                                                        value={selectedMeeting.customerMobile}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerMobile: event.target.value }));
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Customer Alternate Number"
                                                        value={selectedMeeting.contactPerson1Mobile}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, contactPerson1Mobile: event.target.value }));
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Customer Email"
                                                        value={selectedMeeting.customerEmail}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerEmail: event.target.value }));
                                                        }}
                                                    />

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card style={{ height: "100%" }}>
                                                <CardContent onClick={() => handleEdit('card3')}>
                                                    <Typography variant='body2' style={{ textAlign: 'center', marginBottom: "20px" }}>
                                                        <h2>Assignee Details</h2>
                                                    </Typography>
                                                    <TextField
                                                        label="Customer Name"
                                                        value={selectedMeeting.customerName}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, customerName: event.target.value }));
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Customer Name"
                                                        value={selectedMeeting.assignToName}
                                                        style={{ marginBottom: "10px" }}
                                                        onChange={(event) => {
                                                            setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, assignToName: event.target.value }));
                                                        }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant='body2' style={{ textAlign: 'center', marginBottom: "20px" }}>
                                                <h2>Function Details</h2>
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {selectedMeeting.functions && selectedMeeting.functions.map((func, index) => (
                                                    <Grid item xs={4} key={index}>
                                                        <Card>
                                                            <CardContent onClick={() => handleEdit(`func-${index}`)}>
                                                                <TextField
                                                                    label="Function"
                                                                    value={func.functionName}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newFunctions = [...selectedMeeting.functions];
                                                                        newFunctions[index].functionName = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, functions: newFunctions }));
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="Date"
                                                                    value={convertUnixTimestamp(func.functionDateTime)}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newFunctions = [...selectedMeeting.functions];
                                                                        newFunctions[index].functionDateTime = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, functions: newFunctions }));
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="Assign to"
                                                                    value={func.assingTo}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newFunctions = [...selectedMeeting.functions];
                                                                        newFunctions[index].assingTo = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, functions: newFunctions }));
                                                                    }}
                                                                />
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() => handleDeleteFunction(selectedMeeting.id, func.id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                                <Grid item xs={4}>
                                                    <Button variant='contained' color='primary' onClick={handleOpenAddFunctionDialog}>
                                                        Add Function
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    </Card>

                                </Grid>

                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant='body2' style={{ textAlign: 'center', marginBottom: "20px" }}>
                                                <h2>Transaction Details</h2>
                                            </Typography>
                                            <Grid container spacing={2}>

                                                {selectedMeeting.transactions && selectedMeeting.transactions.map((transaction, index) => (
                                                    <Grid item xs={4} key={index}>
                                                        <Card>
                                                            <CardContent onClick={() => handleEdit(`transaction-${index}`)}>
                                                                <TextField
                                                                    label="Recieved"
                                                                    value={transaction.receivedPayment}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newTransactions = [...selectedMeeting.transactions];
                                                                        newTransactions[index].receivedPayment = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, transactions: newTransactions }));
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="Payment note"
                                                                    value={transaction.paymentNote}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newTransactions = [...selectedMeeting.transactions];
                                                                        newTransactions[index].paymentNote = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, transactions: newTransactions }));
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="Date & Time"
                                                                    value={convertUnixTimestamp(transaction.receivedDate)}
                                                                    style={{ marginBottom: "10px" }}
                                                                    onChange={(event) => {
                                                                        const newTransactions = [...selectedMeeting.transactions];
                                                                        newTransactions[index].receivedDate = event.target.value;
                                                                        setSelectedMeeting((prevMeeting) => ({ ...prevMeeting, transactions: newTransactions }));
                                                                    }}
                                                                />
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() => handleDeleteTransaction(selectedMeeting.id, transaction.id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                                <Grid item xs={4}>

                                                    <Button variant='contained' color='primary' onClick={handleOpenAddTransactionDialog}>
                                                        Add Transaction
                                                    </Button>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    </Card>

                                </Grid>

                                <Grid item xs={12}>
                                    <Card style={{ height: '250px' }}>
                                        <Typography variant='body2' gutterBottom style={{ marginTop: "10px", textAlign: "center" }}>
                                            <h2>Add Note</h2>
                                        </Typography>
                                        <CardContent>

                                            <>
                                                <ReactQuill value={note} onChange={setNote} className='my-3' style={{ height: '100px' }} />
                                            </>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                                <Button variant='contained' color='primary' onClick={handleUpdate}>Update</Button>
                                &nbsp;
                                <Button variant='outlined' color='primary' onClick={handleDrawerClose}>Cancel</Button>
                            </Box>

                        </div>
                    )}
                </Box>
            </Drawer>
            <Dialog open={addTransactionOpen} onClose={handleCloseAddTransactionDialog}>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Received Payment"
                        value={newTransactionReceivedPayment}
                        onChange={(event) => setNewTransactionReceivedPayment(event.target.value)}
                    />
                    <DatePicker
                        selected={newTransactionReceivedDate}
                        onChange={(date) => setNewTransactionReceivedDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                    />
                    <TextField
                        label="Payment Note"
                        value={newTransactionPaymentNote}
                        onChange={(event) => setNewTransactionPaymentNote(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={handleAddTransaction}>
                        Add
                    </Button>
                    <Button variant='outlined' color='primary' onClick={handleCloseAddTransactionDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={addFunctionOpen} onClose={handleCloseAddFunctionDialog}>
                <DialogTitle>Add Function</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Function Name"
                        value={newFunctionName}
                        onChange={(event) => setNewFunctionName(event.target.value)}
                    />
                    <DatePicker
                        selected={newFunctionDateTime}
                        onChange={(date) => setNewFunctionDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                    />
                    <TextField
                        label="Assign to"
                        value={newFunctionAssignTo}
                        onChange={(event) => setNewFunctionAssignTo(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={handleAddFunction}>
                        Add
                    </Button>
                    <Button variant='outlined' color='primary' onClick={handleCloseAddFunctionDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            <Drawer anchor='right' open={addAssignmentOpen} onClose={() => setAddAssignmentOpen(false)}>
                <Box sx={{ width: "600px", padding: 2 }}>
                    <DialogTitle>Add Assignment</DialogTitle>
                    <DialogContent>
                        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                            <Tab label="Customer Details" />
                            <Tab label="Assignment Details" />
                            <Tab label="Assignee Details" />
                        </Tabs>
                        {tabValue === 0 && (
                            <Box sx={{ padding: 2 }}>
                                <TextField
                                    label="Customer Name"
                                    value={customerName}
                                    onChange={(event) => setCustomerName(event.target.value)}
                                    error={errors.customerName !== ''}
                                    helperText={errors.customerName}
                                    style={{ marginRight: "20px", marginBottom: "20px" }}
                                />
                                <TextField
                                    label="Customer Email"
                                    value={customerEmail}
                                    onChange={(event) => setCustomerEmail(event.target.value)}
                                    error={errors.customerEmail !== ''}
                                    helperText={errors.customerEmail}
                                    style={{ marginBottom: "20px" }}
                                />
                                <br />
                                <TextField
                                    label="Customer Phone"
                                    value={customerPhone}
                                    onChange={(event) => setCustomerPhone(event.target.value)}
                                    error={errors.customerPhone !== ''}
                                    helperText={errors.customerPhone}
                                    style={{ marginRight: "20px", marginBottom: "20px" }}
                                />

                                <TextField
                                    label="Customer Address"
                                    value={customerAddress}
                                    onChange={(event) => setCustomerAddress(event.target.value)}
                                    error={errors.customerAddress !== ''}
                                    helperText={errors.customerAddress}
                                    style={{ marginBottom: "20px" }}
                                />
                            </Box>
                        )}
                        {tabValue === 1 && (
                            <Box sx={{ padding: 2 }}>
                                <FormControl style={{ width: "235px", marginRight: "20px" }} >
                                    <InputLabel id="assignment-name-label">Assignment Name</InputLabel>
                                    <Select
                                        labelId="assignment-name-label"
                                        value={assignmentName}
                                        onChange={(event) => setAssignmentName(event.target.value)}
                                        error={errors.assignmentName !== ''}
                                    >
                                        <MenuItem value="Wedding">Wedding</MenuItem>
                                        <MenuItem value="Engagement">Engagement</MenuItem>
                                        <MenuItem value="Birthday">Birthday</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Assignment Venue"
                                    value={assignmentVenue}
                                    onChange={(event) => setAssignmentVenue(event.target.value)}
                                    error={errors.assignmentVenue !== ''}
                                    helperText={errors.assignmentVenue}
                                    style={{ marginBottom: "20px" }}
                                />
                                <br />
                                <TextField
                                    label="Alternate Contact"
                                    value={alternateContact}
                                    onChange={(event) => setAlternateContact(event.target.value)}
                                    error={errors.alternateContact !== ''}
                                    helperText={errors.alternateContact}
                                    style={{ marginRight: "20px", marginBottom: "20px" }}
                                />

                                <DatePicker
                                    selected={dateAndTime}
                                    onChange={(date) => setDateAndTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    style={{ marginBottom: "20px" }}
                                />
                            </Box>
                        )}
                        {tabValue === 2 && (
                            <Box sx={{ padding: 2 }}>
                                <TextField
                                    label="Assignee Name"
                                    value={assigneeName}
                                    onChange={(event) => setAssigneeName(event.target.value)}
                                    error={errors.assigneeName !== ''}
                                    helperText={errors.assigneeName}
                                    style={{ marginRight: "20px" }}
                                />

                                <TextField
                                    label="Assignee Email"
                                    value={assigneeEmail}
                                    onChange={(event) => setAssigneeEmail(event.target.value)}
                                    error={errors.assigneeEmail !== ''}
                                    helperText={errors.assigneeEmail}
                                />

                                <Typography variant="h6" gutterBottom>
                                    Function Details
                                </Typography>
                                <TextField
                                    label="Function Name"
                                    value={functionName}
                                    onChange={(event) => setFunctionName(event.target.value)}
                                    error={errors.functionName !== ''}
                                    helperText={errors.functionName}
                                    style={{ marginRight: "20px" }}
                                />

                                <DatePicker
                                    selected={functionDateTime}
                                    onChange={(date) => setFunctionDateTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    style={{ marginBottom: "20px" }}
                                />

                                <Button variant="contained" color="primary" onClick={handleAddFunction}>
                                    Add Function
                                </Button>

                                {functions && (
                                    <ul>
                                        {functions.map((func, index) => (
                                            <li key={index}>
                                                {func.functionName} - {func.functionDateTime.toLocaleString()}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={handleSave}>Save</Button>
                        <Button variant='outlined' color='primary' onClick={() => setAddAssignmentOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Drawer>

        </Card >
    )
}
