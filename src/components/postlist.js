import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { baseURL, decodeHTMLText} from '../my_util';

import {PaginationLinks2, PaginationLinks} from './Pagination';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function Post({post}){ 
  return (<article className='post'>
    <Link to={`./${post.postId}/comments`}><h2>{post.title}</h2></Link>
    <Typography variant={'h3'}>by 
      <Link to={'/user/'+post.author.userId} >
        &nbsp;{post.author.username}&nbsp;
      </Link>
      posted on {post.date}
    </Typography>
    <Typography {...decodeHTMLText(post.content)} />
    </article>);
}

function getURL(page=1, order='desc') {
  return `${baseURL}/posts?page=${page - 1}&size=10&sort=date,${order}`

}

function Postlist(){
  const params = useParams();
  const [postsPagination, setPosts] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const location =  useLocation();

  const order = searchParams.get('order') == null ? 'desc' : searchParams.get('order');
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

  if (!postsPagination || !('_embedded' in postsPagination)) {
    return <div>Loading...</div>;  // Render a loading state while data is being fetched
  }else {
    const totalPages = parseInt(postsPagination.page.totalPages);
    const currentPage = parseInt(postsPagination.page.number) + 1;
    if(totalPages === 0){
      return (<p>No posts yet</p>);
    }

    const posts = postsPagination._embedded.postDTOes;  
    const postsComponents = posts.map(post =>
      <Post  key={post.postId} post={post} />
    );   

    const linksComponents = <PaginationLinks currentPage={currentPage} totalPages={totalPages} location={location} />
    return <Box component={'section'}>{postsComponents} {linksComponents}</Box>;
  }

}

export default Postlist;



