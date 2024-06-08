
import { Link } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';

export function PaginationLinks2({ currentPage, totalPages, location }) {
    return (
      <div>
        {currentPage > 2 && (
          <Link to={{ pathname: location.pathname, search: '?page=1' }}>First</Link>
        )}
        {currentPage > 1 && (
          <Link to={{ pathname: location.pathname, search: `?page=${currentPage - 1}` }}>previous</Link>
        )}
        {currentPage < totalPages && (
          <Link to={{ pathname: location.pathname, search: `?page=${currentPage + 1}` }}>next</Link>
        )}
        {currentPage < totalPages - 1 && (
          <Link to={{ pathname: location.pathname, search: `?page=${totalPages}` }}>last</Link>
        )}
      </div>
    );
  }

  export function PaginationLinks({ currentPage, totalPages, location }){
    return (<Box justifyContent={'center'} alignItems={"center"} display={"flex"}>
        <Pagination
      page={currentPage}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={{ pathname: location.pathname, search: `?page=${item.page}` }}
          {...item}
        />
      )}
    /></Box>);
  }