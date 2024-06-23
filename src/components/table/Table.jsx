import React from 'react'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'

export default function Table(props) {
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
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                    </tr>
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
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>24-11-24</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>24-11-24</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>24-11-24</td>
                                    </tr>
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
                                        <th className='text-center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>done</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>done</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>done</td>
                                    </tr>
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
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>Email</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>Email</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>Shreyas</td>
                                        <td className='text-center'>Wedding</td>
                                        <td className='text-center'>5000</td>
                                        <td className='text-center'>Email</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                : <></>}

        </div>
    )
}
