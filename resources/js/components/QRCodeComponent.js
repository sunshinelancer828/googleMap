import React from 'react'
import { useQRCode } from 'next-qrcode';

function QRCodeComponent(props) {
    const {inputRef} = useQRCode({
        text: "https://www.google.com/maps/search/?api=1&query=" + props.notdienst.lat + "," + props.notdienst.lng,
        options: {
            width: props.width,
            height: props.height,
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            level: "L"
        }
    });


    return (
        <canvas ref={inputRef}/>
    )
}

export default QRCodeComponent
