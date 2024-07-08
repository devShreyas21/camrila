import React from 'react'

export default function WelcomeComponent(props) {
    return (
        <div>{props.user.email}</div>
    )
}
