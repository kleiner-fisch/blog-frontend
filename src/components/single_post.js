import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams, Link } from 'react-router-dom';
import { decodeHTMLText, baseURL, isSet}  from '../my_util';

import Commentlist from './commentlist';
import { useState, useEffect } from 'react';

//- posts/:postId/:commentsPage


function getURL(postId) {
  return `${baseURL}/posts/${postId}`

}

function Post(){ 
  const params = useParams();
  const postId = params.postId;

  const [post, setPost] = useState(null);
    
  useEffect(() => {
    // Fetch data based on the current page
    const fetchData = async () => {
      const url = getURL(postId);
      const response = await fetch(getURL(postId));
      const result = await response.json();
      setPost(result);
    };

    fetchData();
  },[]);

  if (!post) {
    return <div>Loading...</div>;  // Render a loading state while data is being fetched
  }

  const userId = post.author.userId;

  return (<div><article className='post'>
      <h2>{post.title}</h2>
    <h3>by 
      <Link to={'/users/' + userId} >
        &nbsp;{post.author.username}&nbsp;
      </Link>
      posted on {post.date}
    </h3>
    <p {...decodeHTMLText(post.content)} />
    </article>
      <Commentlist />
    </div>);
}


export default Post;



