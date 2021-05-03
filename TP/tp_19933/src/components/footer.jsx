import React, { Component } from 'react';

class Footer extends Component {
    state = {};
    render() {
        return (
            <>
                <footer className="text-center text-lg-start secondary-background-color mt-4">
                    <div className="text-center p-3">
                        <a className="text-white" href="https://pedropita.com/">© 2021 Pedro Pita: https://pedropita.com</a>
                    </div>
                </footer>
            </>
        )
    }
}

export default Footer;