import { Card, CardContent, TextField, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

export default function CardOne({ data, onSave }) {

    // const [isEditing, setIsEditing] = useState(false);
    const [isEditing, setIsEditing] = useState({});
    const [values, setValues] = useState(data);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalValues, setOriginalValues] = useState(data); // Store initial values

    const handleEdit = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: true }));
        // setIsEditing(true);
    };

    const handleChange = (field, e) => {
        setValues((prevState) => ({ ...prevState, [field]: e.target.value }));
        setHasChanges(true); // Set hasChanges to true whenever there's a change
    };

    const handleBlur = (field) => {
        setIsEditing((prevState) => ({ ...prevState, [field]: false }));
        onSave(values);
    };

    const handleKeyPress = (field, e) => {
        if (e.key === 'Enter') {
            handleBlur(field);
        }
    };

    const handleSave = () => {
        onSave(values);
        setOriginalValues(values); // Update originalValues after saving
        setHasChanges(false); // Reset hasChanges after saving
    };

    const handleClear = () => {
        setValues(originalValues); // Revert to original values
        setHasChanges(false); // Hide buttons
    };

    return (
        <div>
            <Card style={{ width: "400px", margin: "10px" }}>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h4 className="text-center">Customer Details</h4>
                        </div>
                        <div>

                            {hasChanges && (
                                <>
                                    <IconButton onClick={handleClear}>
                                        <ClearIcon />
                                    </IconButton>
                                    <IconButton onClick={handleSave}>
                                        <CheckIcon />
                                    </IconButton>
                                </>
                            )}
                        </div>
                    </div>
                    {Object.keys(values).map((field) => (
                        <div key={field} onClick={() => handleEdit(field)} style={{ cursor: 'pointer', marginBottom: '8px' }}>
                            {isEditing[field] ? (
                                <TextField
                                    className='my-2'
                                    label={field}
                                    type="text"
                                    value={values[field]}
                                    onChange={(e) => handleChange(field, e)}
                                    onBlur={() => handleBlur(field)}
                                    onKeyPress={(e) => handleKeyPress(field, e)}
                                    autoFocus
                                />
                            ) : (
                                <Typography variant="body1">{values[field]}</Typography>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
