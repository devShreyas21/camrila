import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import classnames from 'classnames'
import axios from 'axios'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

export default function Pricing() {

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [ResData, setResData] = useState(null)

  const fetchData = async () => {
    const token = localStorage.getItem('accessToken')
    const response = await axios.get('http://api.camrilla.com/user-plan', { headers: { Authorization: `Bearer ${token}` } })
    setResData(response.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [showPopup, setShowPopup] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };
  }, [])


  const proceedClick = async () => {
    console.log(`Plan: ${selectedPlan.planName}`);
    console.log(`Total amount: ₹ ${selectedPlan.finalAmount}`);
    console.log(`Coupon code: ${couponCode}`);
    console.log(`Subscription period: From ${new Date().toLocaleDateString()} to ${new Date(Date.now() + 31536000000).toLocaleDateString()}`);

    const response = await axios.post('http://api.camrilla.com/initiate-payment-request', {
      "id": 1,
      "discountCouponCode": "2020"
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

    console.log(response.data)

    const razorpayOptions = {
      key: response.data.data.razorPayKey, // Replace with your Razorpay key ID
      amount: 100, // Amount in paise (e.g., 1000 for ₹10)
      currency: response.data.data.currency,
      name: response.data.data.planName,
      description: response.data.data.planDescription,
      // image: 'https://example.com/logo.png', Replace with your logo URL
      handler: (payresponse) => {
        // Handle payment response
        console.log(payresponse);
        // You can also update your database or perform other actions here
      },
      prefill: {
        name: 'John Doe',
        email: response.data.data.email,
        contact: response.data.data.mobile
      },
      notes: {
        plan: response.data.data.planName,
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp1 = new Razorpay(razorpayOptions);
    rzp1.open();

    rzp1.on('payment.success', (payment_id) => {
      setPaymentSuccess(true);
      setTimer(setTimeout(() => {
        setPaymentSuccess(false);
      }, 5000)); // hide popup after 5 seconds

      const bearerToken = localStorage.getItem('accessToken');
      const orderId = `camrilla_34_${payment_id}`; // Use the payment ID to construct the order ID
      const requestBody = { orderId };

      fetch('http://api.camrilla.com/update-payment-response', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    });
  }

  return (
    <div style={{ display: "flex" }}>
      {ResData && ResData.availablePlans.map((plan, index) => (
        <CardContent
          key={index}
          style={{ width: "400px", marginInline: "70px" }}
          className={classnames('relative border rounded-xl flex flex-col gap-5 pbs-[3.75rem] ', {
            'border-primary': true, // Assuming the plan is popular
          })}
        >
          <Chip
            color={plan.planName === 'Basic' ? 'primary' : 'error'}
            label={plan.planName}
            size='small'
            className='absolute block-start-4 inline-end-5'
            variant='tonal'
          />
          <div className='text-center flex flex-col gap-2'>
            <Typography variant='h1'>{plan.monthlyAmount === 0 ? 'Free' : `₹ ${plan.finalAmount}`}<sub style={{ fontSize: "18px" }}>/Year</sub></Typography>
            {plan.planDescription && <Typography>₹ {plan.monthlyAmount}</Typography>}
          </div>
          <div className='flex flex-col gap-4'>
            {plan.feature && plan.feature.split(',').map((feature, index) => (
              <div key={index} className='flex items-center gap-2.5'>
                <span className='inline-flex'><i className='ri-checkbox-blank-circle-line text-sm' /></span>
                <Typography>{feature.replace(/"/g, '').trim()}</Typography>
              </div>
            ))}
          </div>
          {plan.planName === 'Professional' && (
            <Button
              fullWidth
              color='primary'
              variant='contained'
              onClick={() => { setShowPopup(true); setSelectedPlan(plan); console.log(selectedPlan) }}
            >
              Upgrade
            </Button>
          )}
        </CardContent>
      ))}

      {selectedPlan ? (

        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <DialogTitle>{selectedPlan.planName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Yearly subscription
              <br />
              From {new Date().toLocaleDateString()} to {new Date(Date.now() + 31536000000).toLocaleDateString()}
              <br />
              Total amount: ₹ {selectedPlan.finalAmount}
            </DialogContentText>
            <div>
              <label>Coupon code:</label>
              <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <button onClick={() => console.log(`Coupon code applied: ${couponCode}`)}>Apply</button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={proceedClick}>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      ) : (<p></p>)}

      {paymentSuccess && (
        <Dialog open={paymentSuccess} onClose={() => setPaymentSuccess(false)}>
          <DialogTitle>Payment Successful!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your payment has been successfully processed.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
