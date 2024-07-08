'use client'

// 'use client'
import { Card, CardContent, Typography, Button, CardMedia, Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'; // Correct MUI Lab imports
import Tab from '@mui/material/Tab'; // Ensure correct import for Tab from MUI Lab
import React, { useState, useEffect } from 'react'
import ProfileCard from '@components/profileComponents/ProfileCard'
import ResetPassword from '@/components/profileComponents/ResetPassword';
import ContactUs from '@/components/profileComponents/ContactUs';
import { useRouter } from 'next/navigation';

const Profile = () => <ProfileCard />;
const Reset = () => <ResetPassword />;
const Projects = () => <ContactUs />;

export default function page() {

    const router = useRouter()

    const [Token, setToken] = useState('')

    useEffect(() => {
        // console.log(localStorage.getItem('accessToken'))
        if (!localStorage.getItem('accessToken')) {
            router.push('/login')
        }
        else {
            setToken(localStorage.getItem('accessToken'))
        }
    }, [])

    const [activeTab, setActiveTab] = useState('profile')

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    return (
        <div>
            {Token ? (<>
                <div>
                    <Card>
                        <CardMedia image="/images/pages/profile-banner.png" className='bs-[250px]' />
                        <CardContent className='flex justify-center flex-col items-center gap-6 md:items-end md:flex-row !pt-0 md:justify-start'>
                            <div className='flex rounded-bs-xl mbs-[-30px] mli-[-5px] border-[5px] border-be-0 border-backgroundPaper bg-backgroundPaper'>
                                <img height={120} width={120} src='/images/avatars/1.png' className='rounded' alt='Profile Background' />
                            </div>
                            <div className='flex is-full flex-wrap justify-start flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5'>
                                <div className='flex flex-col items-center sm:items-start gap-2'>
                                    <Typography variant='h4'>Shreyas</Typography>
                                    <div className='flex flex-wrap gap-6 gap-y-3 justify-center sm:justify-normal min-bs-[38px]'>
                                        <div className='flex items-center gap-2'>
                                            {/* {data?.designationIcon && <i className={data?.designationIcon} />} */}
                                            <Typography className='font-medium'>Lead</Typography>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <i className='ri-map-pin-line' />
                                            <Typography className='font-medium'>Pune</Typography>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <i className='ri-calendar-line' />
                                            <Typography className='font-medium'>11-2-1</Typography>
                                        </div>
                                    </div>
                                </div>
                                <Button variant='contained' className='flex gap-2'>
                                    <i className='ri-user-follow-line text-base'></i>
                                    <span>Connected</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='my-4'>
                        <Grid item xs={12} className='flex flex-col gap-6'>
                            <TabContext value={activeTab}>
                                <TabList onChange={handleChange} variant='scrollable' pill='true'>
                                    <Tab
                                        label={
                                            <div className='flex items-center gap-2'>
                                                <i className='ri-user-3-line text-lg' />
                                                Profile
                                            </div>
                                        }
                                        value='profile'
                                    />
                                    <Tab
                                        label={
                                            <div className='flex items-center gap-2'>
                                                <i className='ri-team-line text-lg' />
                                                Reset Password
                                            </div>
                                        }
                                        value='Reset'
                                    />
                                    <Tab
                                        label={
                                            <div className='flex items-center gap-2'>
                                                <i className='ri-computer-line text-lg' />
                                                Contact Us
                                            </div>
                                        }
                                        value='projects'
                                    />
                                    {/* <Tab
                    label={
                    <div className='flex items-center gap-2'>
                        <i className='ri-link-m text-lg' />
                        Connections
                    </div>
                    }
                    value='connections'
                /> */}
                                </TabList>

                                <TabPanel value='profile' className='p-0'>
                                    <Profile />
                                </TabPanel>
                                <TabPanel value='Reset' className='p-0'>
                                    <Reset />
                                </TabPanel>
                                <TabPanel value='projects' className='p-0'>
                                    <Projects />
                                </TabPanel>
                                {/* <TabPanel value='connections' className='p-0'>
                <Connections />
                </TabPanel> */}

                            </TabContext>
                        </Grid>
                    </Card>


                </div>
            </>) : (<>loading</>)}
        </div>
    )
}
