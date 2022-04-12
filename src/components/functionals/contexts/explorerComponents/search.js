import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Search({ onSearchTextChange, searchText }) {
  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0.6, width: '90vw' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="standard-basic" 
        variant="filled" 
        data-testid="filterInput"
        placeholder="Enter Context Name"
        value={searchText}
        onChange={onSearchTextChange}
      />
    </Box>
    </>
  );
}

export default Search;
