import React from 'react'

function Footer(props) {
    return (
        <div id="footer" className='w-100'>
            <div className='w-100 footer-grid text-center'>
                <div className="first">{"Zuletzt aktualisiert: " + props.lastRefresh.toLocaleTimeString()}</div>
                <div className="second">
                    <strong>Ein Service der Landesapothekerkammer Baden-W\xFCrttemberg.</strong>
                </div>
            </div>
        </div>
    )
}

export default Footer
