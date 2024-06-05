import 'bootstrap/dist/css/bootstrap.min.css';

import { useLoaderData, Link } from 'react-router-dom';

import {getViewURL, decodeHTMLText, PaginationLinks}  from './my_util';




function Post({post}){ 
  const postURL = post._links.self.href;
  const commentsURL = post._links.comments.href;

  const userURL =  post.author._links.self.href;
  const userPostsURL = post.author._links.userPosts.href;

  return (<article className='post'>
    <Link to={getViewURL(postURL)}><h2>{post.title}</h2></Link>
    <h3>by 
      <Link to={getViewURL(userURL)} >
        &nbsp;{post.author.username}&nbsp;
      </Link>
      posted on {post.date}
    </h3>
    <p {...decodeHTMLText(post.content)} />
    </article>);
}


function Postlist(){
  const postsPage = useLoaderData();

  if ('_embedded' in postsPage) {
    const posts = postsPage._embedded.postDTOes;
    const links = postsPage._links;
  
    const postsComponents = posts.map(post =>
      <Post  key={post.postId} post={post} />
    );   

    const linksComponents = <PaginationLinks urls={links} />
    return  <section className='postlist' ><div>{postsComponents} {linksComponents}</div></section>;
  } else {
    return <span>loading...</span>;
  }

}

export default Postlist;


