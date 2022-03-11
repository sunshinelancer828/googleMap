import React from 'react'
import QRCodeComponent from './QRCodeComponent';

function Notdienst(props) {
    const datumOptionen = {
        year: "numeric",
        month: "2-digit",
        weekday: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };

    return (
        <div className='col-md-12 col-xs-12 h-25 pbt-10'>
            <div className='pharmacyBox'>
                <div className='col-md-9 col-sm-8 col-xs-8'>
                    <div className='pharmacyName text-left'>
                        <div><span className='fit'>{props.notdienst.index + " " + props.notdienst.name}</span></div>
                    </div>
                    <div className='row redBackground text-left'>
                        <p className='pharmacyAdress QRCodePadding fitSmall'>
                            {props.notdienst.strasse + ", " + props.notdienst.plz + " " + props.notdienst.stadt + (props.notdienst.ot && props.notdienst.ot !== '' && '(' + props.notdienst.ot + ')')} <br/> {" Telefon: " + props.notdienst.tel}
                        </p>
                    </div>
                </div>
                <div className='col-md-3 col-sm-4 col-xs-4 text-right' style={{paddingRight: '0px', zIndex: 9999}}>
                    <QRCodeComponent notdienst={props.notdienst} width="100" height="100"/>
                </div>
                <div className='pharmacyFooter'>
                    <div className='col-xs-10' style={{padding: '0px'}}>
                        <h5 className='fitSmall text-left'>{ "Dienstbereit bis " + props.notdienst.bis}</h5>
                    </div>
                    <div className='col-xs-2' style={{textAlign: "right", padding: "0px"}}>
                        <h5 className='fitSmall'>{props.notdienst.entfernung.text}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notdienst
