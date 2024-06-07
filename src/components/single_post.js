import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect } from 'react';
import { useState, useContext } from 'react';
import sanitizeHtml from 'sanitize-html';
import { LinkButton, PaginationLinks, getData } from '../my_util';


import './index.css';



const DataContext = createContext({});






/**
 * returns the text wrapped in an react-attribute that safely renders HTML symbols
 * @param {*} text 
 * @returns 
 */
function decodeHTMLText(text){
  return {dangerouslySetInnerHTML:{__html:sanitizeHtml(text)}};
}


/* On click on the post title the post, and its comments are loaded and shown (no matter if that is already shown).
  On click on the username the user is loaded and shown.
*/
function Post({post}){ 
  const { data, setData, dataType, setDataType ,trigger, setTrigger  } = useContext(DataContext);
  const postURL = post._links.self.href;
  const commentsURL = post._links.comments.href;
  const onPostClick = () => {
    Promise.all([getData(postURL), getData(commentsURL)])
      .then(values => {
        values[0]['comments'] = values[1];
        // values[0]['comments'] = values[1];
        setData(values[0]);
        setDataType(SINGLE_POST);
        setTrigger(!trigger);
    });
  };

  const userURL =  post.author._links.self.href;
  const userPostsURL = post.author._links.userPosts.href;
  const onUserClick = () => {
    Promise.all([getData(userURL), getData(userPostsURL)])
      .then(values => {
        values[0]['userPosts'] = values[1];
        setData(values[0]);
        setDataType(SINGLE_USER);
        setTrigger(!trigger);
        });
  };

  return (<article className='post'>
    <LinkButton onClick={onPostClick} ><h2>{post.title}</h2></LinkButton> 
    <h3>by 
      <LinkButton onClick={onUserClick} >&nbsp;{post.author.username}&nbsp;</LinkButton> 
      posted on {post.date}
    </h3>
    <p {...decodeHTMLText(post.content)} />
    </article>);
}


function Comment({comment}){ 
return (<article className='comment'>
  <h3>by  {comment.author} posted on {comment.date}</h3>
  {/* <p>{comment.content}</p> */}
  <p {...decodeHTMLText(comment.content)} />

  </article>);
}



function Commentlist({commentsPage}){
  const { data, setData, dataType, setDataType , setTrigger, trigger } = useContext(DataContext);
  // const data = context.data;
  if ('_embedded' in commentsPage) {
    const comments = commentsPage._embedded.commentDTOes;
    let links = commentsPage._links;

    const commentsComponents = comments.map(comment =>
      <Comment  key={comment.commentId} comment={comment} />
    );   
    // What should the pagination links to when clicked? Update the comments data
    const update = (newComments) => {
      const dataCopy = data;
      dataCopy.comments = newComments;
      setTrigger(!trigger);
      // setData(Object.assign(data, {'comments' : newComments}));

      // data.comments = newComments;
      setData(dataCopy);
    };

    const linksComponents = <PaginationLinks urls={links} update={update} />
    return  <section className='commentList' ><div>{commentsComponents} {linksComponents}</div></section>;
  } else {
    return <span>No comments yet</span>;
  }

}




export default App;



