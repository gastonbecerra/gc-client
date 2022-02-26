import './modulos.scss';
import React,{ useEffect, useState } from "react";
import SelectContext from "./selectContext";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";
import { useHistory } from "react-router-dom";
import InnerModule from "./innerModule";
import ColumnNav from "../layout/columnNav";

export default function Modulo(){
    let history = useHistory();
    const dispatch = useDispatch();
    const { selectedModule } = useSelector(state => state.modulo);
    const { indicator: indicator_name } = useSelector(state => state.indicator.selectedIndicator);
    const { selectedIndicator } = useSelector(state => state.indicator)
    const { selectedContext: context_id } = useSelector(state => state.context)
    const { username : user_id} = useSelector(state => state.user)

    useEffect(()=>{
        if(selectedModule == false || selectedIndicator == false)  history.push('/')
    },[])

    useEffect(()=>{
        ![false, undefined].includes(selectedIndicator.indicator && context_id) &&
            dispatch(fetchIndicatorByUser(selectedIndicator.indicator, context_id, user_id));
    },[selectedIndicator, context_id])

    // UI Logic
    const [value, setValue] = useState(indicator_name);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className="main">

        <ColumnNav/>
        
        <div className="wrap-content">
        <div className='content'>

        <div className="inner-content">

            <TabContext value={value} style={{border: 'solid 1px lightgray'}}>
            
            <div id='tab-container'>
            <TabList 
                onChange={handleChange} 
                aria-label="lab API tabs example" 
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example">
                {selectedModule &&
                    selectedModule.indicators &&
                    selectedModule.indicators.map((indicator, i)=>(
                        <Tab label={indicator.indicator} key={i} value={indicator.indicator} onClick={()=> dispatch(setSelectedIndicator(indicator))}/>
                    ))
                }
            </TabList>
            </div>
            <SelectContext/>



            
            {selectedModule &&
                selectedModule.indicators &&
                selectedModule.indicators.map((indicator, i)=>(
                    <TabPanel value={indicator.indicator} key={i}>
                        <InnerModule indicator={selectedIndicator}/>
                    </TabPanel>
                ))
            }
            
            </TabContext>

            </div>
        </div>
        </div>
            
        </div>
    )
}

