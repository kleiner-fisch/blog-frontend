import 'bootstrap/dist/css/bootstrap.min.css';

import { useLoaderData, Link } from 'react-router-dom';
import {getViewURL, decodeHTMLText}  from './my_util';

import { Outlet } from 'react-router-dom';
import Commentlist from './commentlist';



function Post(){ 
  const post = useLoaderData();

  const postURL = post._links.self.href;
  const commentsURL = post._links.comments.href;

  const userURL =  post.author._links.self.href;
  const userPostsURL = post.author._links.userPosts.href;

  return (<div><article className='post'>
      <Link to={getViewURL(postURL)}><h2>{post.title}</h2></Link>
    <h3>by 
      <Link to={getViewURL(userURL)} >
        &nbsp;{post.author.username}&nbsp;
      </Link>
      posted on {post.date}
    </h3>
    <p {...decodeHTMLText(post.content)} />
    </article>
      <div id="detail">
        <Outlet />
      </div>
    </div>);
}


export default Post;



