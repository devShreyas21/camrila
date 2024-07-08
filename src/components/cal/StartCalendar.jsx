import React, { useState, useEffect } from 'react'
import ReactDatePickerComponent from 'react-datepicker'

export default function StartCalendar() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            console.log(`Start Date: ${startDate}`);
            console.log(`End Date: ${endDate}`);
        }
    }, [startDate, endDate]);

    const handleSelect = (info) => {
        setStartDate(info.startStr);
        setEndDate(info.endStr);
    };

    return (
        <div>
            <ReactDatePickerComponent />
        </div>
    )
}

// import AddIcon from '@mui/icons-material/Add';

// import CardOne from '@components/sections/CardOne'
// import CardTwo from '@components/sections/CardTwo'
// import CardThree from '@components/sections/CardThree'
// import CardFour from '@components/sections/CardFour'

// const [data1, setData1] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '123-456-7890',
//     address: "a-15, Ruston Colony"
// });

// const [data2, setData2] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '123-456-7890',
//     alternatePhone: '9876543211'
// });

// const [data3, setData3] = useState({
//     name: 'John Doe',
//     assignTo: 'me'
// });

// const [data4, setData4] = useState([{
//     name: 'John Doe',
//     function: 'halad',
//     assign: 'me',
//     date: '03/02/2024',
//     time: '5:30 PM',
//     functions: []
// }]);

// const handleSave = (newData) => {
//     setData1(newData);
// };

// const handleSave2 = (newData) => {
//     setData2(newData);
// };

// const handleSave3 = (newData) => {
//     setData3(newData);
// };

// const handleSave4 = (newData) => {
//     setData4(newData);
// };


{/* <Grid container spacing={2}>
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
            </Grid> */}


{/* <Dialog open={formOpen} onClose={handleFormClose}>
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
            </Dialog> */}
