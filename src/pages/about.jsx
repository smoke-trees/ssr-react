import React, { Component } from 'react'
import global from "./about.css"
import about from "./global.css"

export class About extends Component {
    render() {
        return (
            <div className='heading'>
                This is the about page
                <div className='subheading'>
                    This is the sub heading
                </div>
            </div>
        )
    }
}

export default About    