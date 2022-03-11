import React, {useEffect, useState} from 'react'

function Clock() {

    const [state, setState] = useState({time: new Date()});

    useEffect(() => {
        const timer = setInterval(updateTime, 500)
        return () => {
            clearInterval(timer);
        }
    }, [])

    const updateTime = () => {
        setState({time: new Date()})
    }

    return (
        <div>
            <h3 className='clock'>
                { state.time.toLocaleTimeString('de-DE', { hour : '2-digit', minute : '2-digit' }).replace(/:\d{2}\s/, ' ') + " Uhr"} 
            </h3>
        </div>
    )
}

export default Clock
