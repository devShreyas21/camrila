import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import { getSimpleDate } from '@/utils/date'

export default function Table(props) {

    useEffect(() => {
        console.log(props.data)
    }, [])

    return (
        <div style={{ display: `${props.display}` }}>
            {props.tableType == 'totalAssign' ?
                <Card className='my-4'>
                    <CardContent>
                        <h3 className='text-center mb-4 '>Total Assignments</h3>
                        <div className='overflow-x-auto'>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Client</th>
                                        <th className='text-center'>Event</th>
                                        <th className='text-center'>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data && props.data.map((item) => (
                                        <tr>
                                            <td className='text-center'>{item.customerName}</td>
                                            <td className='text-center'>{item.assignmentName}</td>
                                            <td className='text-center'>{item.totalAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                : <></>}


            {props.tableType == 'totalCost' ?
                <Card className='my-4'>
                    <CardContent>
                        <h3 className='text-center mb-4 '>Total Cost</h3>
                        <div className='overflow-x-auto'>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Client</th>
                                        <th className='text-center'>Event</th>
                                        <th className='text-center'>Price</th>
                                        <th className='text-center'>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data && props.data.map((item) => (
                                        <tr>
                                            <td className='text-center'>{item.customerName}</td>
                                            <td className='text-center'>{item.assignmentName}</td>
                                            <td className='text-center'>{item.totalAmount}</td>
                                            <td className='text-center'>{getSimpleDate(item.assignmentDateTime)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                : <></>}

            {props.tableType == 'totalPaymentRecieved' ?
                <Card className='my-4'>
                    <CardContent>
                        <h3 className='text-center mb-4 '>Total Payment Recieved</h3>
                        <div className='overflow-x-auto'>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Client</th>
                                        <th className='text-center'>Event</th>
                                        <th className='text-center'>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data && props.data.map((item) => (
                                        <tr>
                                            <td className='text-center'>{item.customerName}</td>
                                            <td className='text-center'>{item.assignmentName}</td>
                                            <td className='text-center'>{item.transactions.reduce((total, item2) => total + item2.receivedPayment, 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                : <></>}

            {props.tableType == 'totalDuePayment' ?
                <Card className='my-4'>
                    <CardContent>
                        <h3 className='text-center mb-4 '>Total Due Payments</h3>
                        <div className='overflow-x-auto'>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Client</th>
                                        <th className='text-center'>Event</th>
                                        <th className='text-center'>Price</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data && props.data.map((item) => (
                                        <tr>
                                            <td className='text-center'>{item.customerName}</td>
                                            <td className='text-center'>{item.assignmentName}</td>
                                            <td className='text-center'>
                                                {item.totalAmount - item.transactions.reduce((total, item2) => total + item2.receivedPayment, 0)}
                                            </td>
                                            <th className='text-center'>Email</th>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                : <></>}

        </div>
    )
}
