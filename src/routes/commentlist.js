import 'bootstrap/dist/css/bootstrap.min.css';

import { useLoaderData, Link } from 'react-router-dom';

import {getViewURL, decodeHTMLText, PaginationLinks}  from './my_util';




function Comment({comment}){ 
  return (<article className='comment'>
    <h3>by  {comment.author} posted on {comment.date}</h3>
    <p {...decodeHTMLText(comment.content)} />
    </article>);
}


function Commentlist(){
  const commentsPage = useLoaderData();

  // const data = context.data;
  if ('_embedded' in commentsPage) {
    const comments = commentsPage._embedded.commentDTOes;
    let links = commentsPage._links;

    const commentsComponents = comments.map(comment =>
      <Comment  key={comment.commentId} comment={comment} />
    );   

    const linksComponents = <PaginationLinks urls={links} />
    return  <section className='commentList' ><div>{commentsComponents} {linksComponents}</div></section>;
  } else {
    return <span>No comments yet</span>;
  }

}
  
export default Commentlist;



