import React,{ useEffect, useState } from "react";
import SelectContext from "./selectContext";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";
import { useHistory } from "react-router-dom";
import InnerModule from "./innerModule";

export default function Modulo(props){
    let history = useHistory();
    const dispatch = useDispatch();
    let tabs = ["Inputs", "Indicator", "Info", "Muestra"];
    const { selectedModule } = useSelector(state => state.modulo);
    const { indicator: indicator_name } = useSelector(state => state.indicator.selectedIndicator);
    const { selectedIndicator } = useSelector(state => state.indicator)
    const { selectedContext: context_id } = useSelector(state => state.context)

    useEffect(()=>{
        if(selectedModule == false && selectedIndicator == false)  history.push('/')
    },[])

    useEffect(()=>{
        if(selectedIndicator.indicator !== false && context_id !== false) dispatch(fetchIndicatorByUser(selectedIndicator.indicator, context_id, 'Gastón'));
    },[selectedIndicator])

    useEffect(()=>{
        if(selectedIndicator.indicator !== false && context_id !== false) dispatch(fetchIndicatorByUser(selectedIndicator.indicator, context_id, 'Gastón'));
    },[context_id])

    // UI Logic
    const [value, setValue] = useState(indicator_name);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <>

        <Box sx={{ maxWidth: 480, bgcolor: 'background.paper' }}>

        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange} 
            aria-label="lab API tabs example" 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">
            {selectedModule &&
                selectedModule.indicators &&
                selectedModule.indicators.map((indicator, i)=>(
                    <Tab label={indicator.indicator} value={indicator.indicator} onClick={()=> dispatch(setSelectedIndicator(indicator))}/>
                ))
            }
          </TabList>
          <SelectContext/>

        </Box>
        {selectedModule &&
            selectedModule.indicators &&
            selectedModule.indicators.map((indicator, i)=>(
                <TabPanel value={indicator.indicator} key={i}>
                    {/* {indicator.indicator} */}
                    {/* { selectedIndicator !== false && selectedIndicator !== undefined && <InnerModule indicator = {selectedIndicator}/>} */}
                    <InnerModule indicator={selectedIndicator}/>
                </TabPanel>
            ))
        }
        </TabContext>
        </Box>

        
        
        
        {/*                                 
        <Container className="indicador-container">
            <Indicator/>
            <Inputer/>
            <Info/>
        </Container>

         */}
        </>
    )
}

