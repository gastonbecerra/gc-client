import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ImLab } from "react-icons/im";
import { MdOutlineRssFeed } from "react-icons/md";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { MdInput } from 'react-icons/md';
import { MdViewModule } from 'react-icons/md';

export default function Footer() {
    return (

    <>
    <Navbar id="footer" bg="white" variant="dark">
        <div>
        <Link to={"/"}>
            <MdViewModule className="footer-icon"/>
            <div><span>Indicators</span></div>
            </Link>
        </div>
        
        <div>
            <Link to={"/inputs"}>
            <MdInput className="footer-icon"/>
            <div>Inputs</div>
            </Link>
        </div>
        
        <div>
        <Link to={"/context"}>
            <VscActivateBreakpoints className="footer-icon"/>
            <div>Contexts</div>
        </Link>
            
        </div>
        <div>
        <Link to={"/"}>
            <ImLab className="footer-icon"/>
            <div>Lab</div>
        </Link>
        </div>
        <div>
            <Link to={"/events"}>
            <MdOutlineRssFeed className="footer-icon"/>
            <div>Feed</div>
            </Link>
        </div>
    </Navbar>
    </>


    )
}
