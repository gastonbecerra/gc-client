import React, {useState} from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Dashboard from './dashboard';
import LabHome from './lab/labHome';

export default function HomeTab() {
    const [key, setKey] = useState('modules');

    return (
        <div id="home-tabs">
        <Tabs 
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
            
            <Tab eventKey="lab" title="Lab">
                <LabHome/>
            </Tab>
            
            <Tab eventKey="modules" title="Modules">
                <Dashboard/>
            </Tab>
            
            <Tab eventKey="feed" title="Feed">
                Feed
            </Tab>
        </Tabs>
        </div>
        
    )
}
