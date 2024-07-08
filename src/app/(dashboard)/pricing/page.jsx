'use client'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Pricing from '@/components/pricing/Pricing'
import { useRouter } from 'next/navigation'

export default function Page() {

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

    const theme = useTheme()

    return (
        <div>
            {Token ? (<>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Typography variant='h4'>Pricing Plans</Typography>
                        <div className='flex items-center text-center flex-col sm:mbe-[4rem]'>
                            <Typography>
                                All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your
                                needs.
                            </Typography>
                        </div>
                    </div>
                    <Grid container spacing={6}>
                        <Grid >
                            <Pricing />
                        </Grid>
                    </Grid>
                </div>
            </>) : (<>loading</>)}
        </div>
    )
}
