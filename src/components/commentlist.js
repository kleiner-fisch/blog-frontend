import { useParams, Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { baseURL, getData,  decodeHTMLText} from '../my_util';
import {PaginationLinks} from './Pagination';
import Sorting from './Sorting';

import { BarLoader } from 'react-spinners';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';



function getURL(postId, page=1, order='desc') {
  return `${baseURL}/posts/${postId}/comments?page=${page - 1}&size=10&sort=date,${order}`

}


function Comment({comment}){ 
  return (<article className='comment'>
    <Typography variant='h6'>by  {comment.author} posted on {comment.date}</Typography>
    <Typography {...decodeHTMLText(comment.content)} /> 
    </article>);
}

function Commentlist(){
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [commentsPagination, setComments] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const location =  useLocation();
  // const navigate = useNavigate();


  const postId = params.postId;
  const order = searchParams.get('sort') == null ? 'desc' : searchParams.get('sort');
  const page = searchParams.get('page') == null ? 0 : parseInt(searchParams.get('page'));
  
  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(getURL(postId, page, order), { signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setComments(result);
        setLoading(false);

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [postId, page, order]);

  let result = null; 

  if (loading) {
    result = <BarLoader loading={loading} />;
  }else {
    const totalPages = parseInt(commentsPagination.page.totalPages);
    const currentPage = Math.min(parseInt(commentsPagination.page.number) + 1, totalPages);
    if(totalPages === 0){
      result = (<p>No comments yet</p>);
    } else {

      const orderComponent = <Sorting  currentOrder={order} location={location}/>

      const comments = commentsPagination._embedded.commentDTOes;
      const commentsComponents = comments.map(comment =>
        <Comment  key={comment.commentId} comment={comment} />
      );   

      const linksComponents = <PaginationLinks order={order} currentPage={currentPage} totalPages={totalPages} location={location} />
      result = <Box component={'section'}>{orderComponent} <Stack>{commentsComponents}</Stack> {linksComponents}</Box>;
    }
  }
  return  <section className='commentList' ><Typography variant='h4'>Comments</Typography>{result}</section>;
}


export default Commentlist;



