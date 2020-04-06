import React from 'react';
import Button from '@material-ui/core/Button';

export function MyButton(props){


  return (
    <Button variant="contained"  onClick={props.handleClick} color="primary" disableElevation>
      Refresh Data
    </Button>
  );
  
  }