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
    <Navbar id="footer" class="align" bg="light" variant="dark">
        <div>
            <MdViewModule className="footer-icon"/>
            <div><Link to={"/"}><span>Indicators</span></Link></div>
        </div>
        
        <div>
            <MdInput className="footer-icon"/>
            <div><Link to={"/"}>Inputs</Link></div>
        </div>
        
        <div>
            <VscActivateBreakpoints className="footer-icon"/>
            <div><Link to={"/"}>Contexts</Link></div>
            
        </div>
        <div>
            <ImLab className="footer-icon"/>
            <div><Link to={"/"}>Lab</Link></div>
        </div>
        <div>
            <MdOutlineRssFeed className="footer-icon"/>
            <div><Link to={"/"}>Feed</Link></div>
        </div>
    </Navbar>
    </>


    )
}
