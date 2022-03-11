import React, {useState, useEffect} from 'react'
import Notdienst from './Notdienst';
import NotdienstNoMap from './NotdienstNoMap';
import NotdienstPortrait from './NotdienstPortrait';

const Notdienste = (props) => {
    const [state, setState] = useState({portrait: false})

    useEffect(() => {
        setState({
            portrait: window.innerHeight > window.innerWidth
        });
        window.addEventListener('orientationchange', function () {
            setState({
                portrait: window.innerHeight > window.innerWidth
            });
        });
        window.addEventListener('resize', function () {
            setState({
                portrait: window.innerHeight > window.innerWidth
            });
        });
    }, [])

    return (
        <div className='row h-100 main'>
            {
            props.notdienste.map((notdienst, i) => {
                if (state.portrait) {
                    return <NotdienstPortrait notdienst={notdienst} key={i}/>
                } else if (!props.showMap) {
                    return <NotdienstNoMap notdienst={notdienst} key={i}/>
                } else {
                    return <Notdienst notdienst={notdienst} key={i}/>
                }
            })
        } </div>
    )
}

export default Notdienste;
