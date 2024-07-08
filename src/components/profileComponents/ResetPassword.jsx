import React, { useState } from 'react'
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import axios from 'axios'

export default function ResetPassword() {

  const [isEmailShown, setIsEmailShown] = useState(false);
  const [isOldPasswordShown, setIsOldPasswordShown] = useState(false);
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClickShowEmail = () => {
    setIsEmailShown(!isEmailShown);
  };

  const handleClickShowOldPassword = () => {
    setIsOldPasswordShown(!isOldPasswordShown);
  };

  const handleClickShowNewPassword = () => {
    setIsNewPasswordShown(!isNewPasswordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://api.camrilla.com/user/reset-password',
        {
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      console.log(response);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    // <div>
    //   <Card>
    //     <CardHeader title='Change Password' className='pbe-6' />
    //     <CardContent>
    //       <form>
    //         <Grid container spacing={5}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               fullWidth
    //               label='Current Password'
    //               type={isCurrentPasswordShown ? 'text' : 'password'}
    //               InputProps={{
    //                 endAdornment: (
    //                   <InputAdornment position='end'>
    //                     <IconButton
    //                       size='small'
    //                       edge='end'
    //                       onClick={handleClickShowCurrentPassword}
    //                       onMouseDown={e => e.preventDefault()}
    //                     >
    //                       <i className={isCurrentPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
    //                     </IconButton>
    //                   </InputAdornment>
    //                 )
    //               }}
    //             />
    //           </Grid>
    //         </Grid>
    //         <Grid container className='mbs-0' spacing={5}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               fullWidth
    //               label='New Password'
    //               type={isNewPasswordShown ? 'text' : 'password'}
    //               InputProps={{
    //                 endAdornment: (
    //                   <InputAdornment position='end'>
    //                     <IconButton
    //                       size='small'
    //                       edge='end'
    //                       onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
    //                       onMouseDown={e => e.preventDefault()}
    //                     >
    //                       <i className={isNewPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
    //                     </IconButton>
    //                   </InputAdornment>
    //                 )
    //               }}
    //             />
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               fullWidth
    //               label='Confirm New Password'
    //               type={isConfirmPasswordShown ? 'text' : 'password'}
    //               InputProps={{
    //                 endAdornment: (
    //                   <InputAdornment position='end'>
    //                     <IconButton
    //                       size='small'
    //                       edge='end'
    //                       onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
    //                       onMouseDown={e => e.preventDefault()}
    //                     >
    //                       <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
    //                     </IconButton>
    //                   </InputAdornment>
    //                 )
    //               }}
    //             />
    //           </Grid>
    //           <Grid item xs={12} className='flex flex-col gap-4 pbs-6'>
    //             <Typography variant='h6' color='text.secondary'>
    //               Password Requirements:
    //             </Typography>
    //             <div className='flex flex-col gap-4'>
    //               <div className='flex items-center gap-2.5'>
    //                 <i className='ri-checkbox-blank-circle-fill text-[8px]' />
    //                 Minimum 8 characters long - the more, the better
    //               </div>
    //               <div className='flex items-center gap-2.5'>
    //                 <i className='ri-checkbox-blank-circle-fill text-[8px]' />
    //                 At least one lowercase & one uppercase character
    //               </div>
    //               <div className='flex items-center gap-2.5'>
    //                 <i className='ri-checkbox-blank-circle-fill text-[8px]' />
    //                 At least one number, symbol, or whitespace character
    //               </div>
    //             </div>
    //           </Grid>
    //           <Grid item xs={12} className='flex gap-4 pbs-6'>
    //             <Button variant='contained'>Save Changes</Button>
    //             <Button variant='outlined' type='reset' color='secondary'>
    //               Reset
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </div>
    <div>
      <Card>
        <CardHeader title="Change Password" className="pbe-6" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={handleClickShowEmail}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <i className={isEmailShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Old Password"
                  type={isOldPasswordShown ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={handleClickShowOldPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <i className={isOldPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type={isNewPasswordShown ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          edge="end"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <i className={isNewPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} className="flex flex-col gap-4 pbs-6">
                <Typography variant="h6" color="text.secondary">
                  Password Requirements:
                </Typography>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5">
                    <i className="ri-checkbox-blank-circle-fill text-[8px]" />
                    Minimum 8 characters long - the more, the better
                  </div>
                  <div className="flex items-center gap-2.5">
                    <i className="ri-checkbox-blank-circle-fill text-[8px]" />
                    At least one lowercase& one uppercase character
                  </div>
                  <div className="flex items-center gap-2.5">
                    <i className="ri-checkbox-blank-circle-fill text-[8px]" />
                    At least one number, symbol, or whitespace character
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} className="flex gap-4 pbs-6">
                <Button variant="contained" type="submit">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
