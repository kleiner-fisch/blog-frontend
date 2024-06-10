import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function Sorting({currentOrder, location}){
    const newOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    // const url = new URL(...{ pathname: location.pathname, search: `?page=1&sort=date,${newOrder}` });
    return (<Button component={Link} to={{ pathname: location.pathname, search: `?page=1&sort=${newOrder}` }}>{`order: ${currentOrder}`}</Button>);
  }
  
  export default Sorting;