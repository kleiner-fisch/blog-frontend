
import { useParams, Link } from 'react-router-dom';
import { decodeHTMLText, baseURL, isSet}  from '../my_util';

import Commentlist from './commentlist';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { BarLoader } from 'react-spinners';


//- posts/:postId/:commentsPage


function getURL(postId) {
  return `${baseURL}/posts/${postId}`

}

function Post(){ 
  const params = useParams();
  const postId = params.postId;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
    
  useEffect(() => {
    // Fetch data based on the current page
    const fetchData = async () => {
      const url = getURL(postId);
      const response = await fetch(getURL(postId));
      const result = await response.json();
      setPost(result);
      setLoading(false);
    };

    fetchData();
  },[postId]);

  if (loading) {
    return <BarLoader loading={loading} />;
  }

  const userId = post.author.userId;

  return (<div><article className='post'>
      <Typography variant={"h5"} {...decodeHTMLText(post.title)} />
      <Typography variant={'h6'}>by&nbsp;
      <Link to={'/users/' + userId} >
        {post.author.username}
      </Link>
      &nbsp;posted on {post.date}
    </Typography>
    <p {...decodeHTMLText(post.content)} />
    </article>
      <Commentlist />
    </div>);
}


export default Post;



