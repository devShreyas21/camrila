import React from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import classnames from 'classnames'


export default function Pricing() {
  return (
    <div style={{ display: "flex", }}>
      <CardContent
        style={{ width: "400px", marginInline: "100px" }}
        className={classnames('relative border rounded-xl flex flex-col gap-5 pbs-[3.75rem] ', {
          'border-primary': true, // Assuming the plan is popular
        })}
      >
        <Chip
          color='primary'
          label='Basic'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
        <div className='text-center flex flex-col gap-2'>
          <Typography variant='h1'>Free</Typography>
          <Typography>Forever</Typography>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>5 Free Assignments</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>5 Free Leads To Manage</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>5 Free Assignment Notes</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Assignment Reminder</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Personalized Assignment Calendar</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>One Touch Payment Report</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Send Due Payments Reminders</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Send Payment Receipts</Typography>
          </div>
        </div>
        <Button
          fullWidth
          color={false ? 'success' : 'primary'}
          variant={true ? 'contained' : 'outlined'}
        >
          {false ? 'Your Current Plan' : 'Upgrade'}
        </Button>
      </CardContent>

      <CardContent
        style={{ width: "400px" }}
        className={classnames('relative border rounded-xl flex flex-col gap-5 pbs-[3.75rem] ', {
          'border-primary': true, // Assuming the plan is popular
        })}
      >
        <Chip
          color='error'
          label='Professional'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
        <div className='text-center flex flex-col gap-2'>
          <Typography variant='h1'>₹ 1499<sub style={{ fontSize: "18px" }}>/Year</sub></Typography>
          <Typography><s>₹ 1499</s></Typography>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Unlimited Assignments</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Unlimited Leads To Manage</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Unlimited Assignment Notes</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Assignment Reminder</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Personalized Assignment Calendar</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>One Touch Payment Report</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Send Due Payments Reminders</Typography>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='inline-flex'>
              <i className='ri-checkbox-blank-circle-line text-sm' />
            </span>
            <Typography>Send Payment Receipts</Typography>
          </div>
        </div>
        <Button
          fullWidth
          color={false ? 'success' : 'primary'}
          variant={true ? 'contained' : 'outlined'}
        >
          {false ? 'Your Current Plan' : 'Upgrade'}
        </Button>
      </CardContent>

    </div>
  )
}
