import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ImLab } from "react-icons/im";
import { MdOutlineRssFeed } from "react-icons/md";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { MdInput } from 'react-icons/md';
import { MdViewModule } from 'react-icons/md';
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";
import { saveModules, setSelectedModule } from "../../store/slices/modules";
import { useHistory } from "react-router-dom";

export default function ColumnNav() {
    let history = useHistory();
    const { modules } = useSelector(state => state.modulo);
    const dispatch = useDispatch();
    
    async function handleModuleNavigation (mod, indicator, id) {
        await dispatch(setSelectedModule(mod));
        await dispatch(setSelectedIndicator(indicator));
        history.push(
            {
                pathname: '/modulo',
                state: {  
                  id: id, 
                },
              }
        );
    }
  return (
             <div 
             className="aside">
                <ul 
                    className='aside-menu'
                >
            
                <li className='li-flex'>
                    <MdViewModule className="footer-icon mx-2 mt-1"/>
                    <Link to={'/'} className='link-nodeco'><p> Indicators</p> </Link>
                </li>
                {
                    modules &&
                    <ul>
                    {modules.map((mod,i)=> (
                        <li key={i} style={{wordBreak: 'break-word'}}>
                            {mod.indicators.length > 0 ?
                            <p 
                                onClick={()=>handleModuleNavigation(modules[i], modules[i].indicators[0], modules[i].indicators[0]._id)}
                                style={{
                                    color: '#1976D2',
                                    paddingLeft: '7px',
                                    wordBreak: 'break-word'
                                }}
                            >
                                {mod.module}
                            </p>
                            :
                            <p 
                                style={{
                                    color: 'grey',
                                    paddingLeft: '7px'
                                }}
                            >
                                {mod.module}
                            </p>
                            }
                        </li>
                    ))}
                    </ul>
                }
                <li className='li-flex'>   
                    <MdInput className="footer-icon mx-2 mt-1"/>
                    <Link to={'/inputs'} className='link-nodeco'> <p>Inputs</p> </Link>
                </li>
                <li className='li-flex'>   
                    <VscActivateBreakpoints className="footer-icon mx-2 mt-1"/>
                    <Link to={'/context'} className='link-nodeco'> <p>Contexts</p> </Link>
                </li>
                <li className='li-flex'>
                    <ImLab className="footer-icon mx-2 mt-1"/>    
                    <Link to={''} className='link-nodeco'> <p>Lab</p> </Link>
                </li>
                <li className='li-flex'>
                    <MdOutlineRssFeed className="footer-icon mx-2 mt-1"/>    
                    <Link to={'/coso'} className='link-nodeco'> <p>Feed</p> </Link>
                </li>
                </ul>
            </div>
  );
}
