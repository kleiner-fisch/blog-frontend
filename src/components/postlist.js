
import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { baseURL, decodeHTMLText} from '../my_util';

import {PaginationLinks} from './Pagination';
import Sorting from './Sorting';

import { BarLoader } from 'react-spinners';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';



function Post({post}){ 
  return (<article className='post'>
    <Link to={`./${post.postId}/comments`}>
      <Typography variant={"h5"} {...decodeHTMLText(post.title)} />
      </Link>
    <Typography variant={'h6'}>by&nbsp; 
      <Link to={'/user/'+post.author.userId} >
        {post.author.username}
      </Link>
      &nbsp;posted on {post.date}
    </Typography>
    <Typography {...decodeHTMLText(post.content)} />
    </article>);
}

function getURL(page=1, order='desc') {
  return `${baseURL}/posts?page=${page - 1}&size=10&sort=date,${order}`

}

function Postlist(){
  const params = useParams();
  const [postsPagination, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location =  useLocation();

  const order = searchParams.get('sort') == null ? 'desc' : searchParams.get('sort');
  const page = searchParams.get('page') == null ? 0 : parseInt(searchParams.get('page'));
  
  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(getURL(page, order), { signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setPosts(result);
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
  }, [params, searchParams, page, order]);

  if(loading) {
    return <BarLoader loading={loading} />;
  // if (!postsPagination || !('_embedded' in postsPagination)) {
  //   return <div>Loading...</div>;  // Render a loading state while data is being fetched
  }else {
    const totalPages = parseInt(postsPagination.page.totalPages);
    const currentPage = parseInt(postsPagination.page.number) + 1;
    if(totalPages === 0){
      return (<p>No posts yet</p>);
    }

    const orderComponent = <Sorting  currentOrder={order} location={location}/>
    const posts = postsPagination._embedded.postDTOes;  
    const postsComponents = posts.map(post =>
      <Post  key={post.postId} post={post} />
    );   

    const linksComponents = <PaginationLinks order={order} currentPage={currentPage} totalPages={totalPages} location={location} />
    return <Box component={'section'}>{orderComponent}<Stack>{postsComponents}</Stack> {linksComponents}</Box>;
  }

}

export default Postlist;



