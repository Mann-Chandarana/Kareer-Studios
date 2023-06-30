import React from 'react';

function Footer() {
    return (
        <>
            <footer id='footer' className='footer'>
                <div className='copyright'>
                    &copy; Copyright{' '}
                    <strong>
                        <span>Kareer Studio</span>
                    </strong>
                    . All Rights Reserved
                </div>
                <div className='credits'>
                    Designed by <a href='/'>Charusat University</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;
