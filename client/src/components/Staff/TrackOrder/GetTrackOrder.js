import React, { useEffect, useState } from 'react'
import TrackOrder from './TrackOrder'

export default function GetTrackOrder() {

    const [tracks, setTrackOrder] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:1880/tracking')
            .then((res) => res.json())
            .then((data) => setTrackOrder(data))
    }, [])

    return (
        <div>
            {tracks && <TrackOrder tracks={tracks} />}
        </div>
    )
}
