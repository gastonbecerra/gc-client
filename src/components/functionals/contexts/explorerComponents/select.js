import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React from 'react'

export default function select() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
    <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={age}
        onChange={handleChange}
    >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>
  )
}
