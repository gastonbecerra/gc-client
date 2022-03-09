import { Typography } from '@mui/material';
import React, {useState} from 'react'
import '../context.scss';
import ResultsList from './contextResultsList';
import Search from './search';

export default function ExplorerTab() {
  
  const [searchText, setSearchText] = useState('');
  
  const onSearchTextChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value);
  };

  return (
    <>
    <div className='search-wrapper'>
        <Typography variant="h">Buscador</Typography>
        <div className="">
        
        <section id="search-box">
          <Search            
            searchText={searchText}
            onSearchTextChange={onSearchTextChange}
          />
          
        </section>
          <ResultsList searchText={searchText} />
      </div>

    </div>
    </>
  )
}


/*
        <h5>Listado</h5>
        <strong>modal</strong>
        <li>modal
            <ul>
                <li>descripcion</li>
                <li>scope</li>
                <li>subs</li>
                <li>vars</li>
                <li>samples</li>
                <li>feed</li>
                <li>users</li>
            </ul>
        </li>
        <strong></strong>
*/