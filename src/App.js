import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect } from 'react';
import { useState, useContext } from 'react';


import './index.css';


// async function getData(url, setData) {
//   // debugger;
//   const response = await fetch(url);
//   const body = await response.json();
//   setData(body);
// }

function getData(url) {

  // return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //         'Accept': 'application/json',
  //     },
  // })
  //     .then(response => response.json())
  //     .then(response => setData(response));

      return fetch(url)
        .then(response => {return response.json()});
  }


  const SINGLE_USER = 'SINGLE_USER';
  const POST_LIST = 'POST_LIST';
  const USER_LIST = 'USER_LIST';
  const SINGLE_POST = 'SINGLE_POST';


const DataContext = createContext({});

function App() {
  const [data, setData] = useState({});
  const [dataType, setDataType] = useState(POST_LIST);
  const [trigger, setTrigger] = useState(true);

  // getData('http://localhost:8080/blog/api/v1/posts').then(jsonData => setData(jsonData));

  useEffect(() => {
    getData('http://localhost:8080/blog/api/v1/posts').then(response => {setData(response)});
    }, []
  );

  switch (dataType) {
    case POST_LIST:
      return (  <DataContext.Provider value={{'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'trigger': trigger, 'setTrigger':setTrigger  }}>
        <div className="App">
          <header className="App-header">
          </header>
          <section className='postlist' ><div> <Postlist postsPage={data}/></div> </section>
          </div>
          </DataContext.Provider>);
    case SINGLE_POST:
      return ( <DataContext.Provider value={{'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'trigger': trigger, 'setTrigger':setTrigger  }}>
          <div className="App">
            <header className="App-header">
            </header>
            <section className='singlePost'> <Post post={data} /></section>
            <section className='commentsList'> <Commentlist commentsPage={data.comments} /></section>
          </div>
        </DataContext.Provider>);

    case USER_LIST:
      // Here we show a list of all users
      return (  <DataContext.Provider value={{'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'trigger': trigger, 'setTrigger':setTrigger  }}>
        <div className="App">
          <header className="App-header">
          </header>
          <section className='userlist' ><div> <Userlist usersPage={data}/></div> </section>
          </div>
          </DataContext.Provider>);
    case SINGLE_USER:
      // here we show a single user, along with a list of their posts
      return (  <DataContext.Provider value={{'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'trigger': trigger, 'setTrigger':setTrigger  }}>
        <div className="App">
          <header className="App-header">
          </header>
          <section className='singleUser'> <User user={data} /></section>
          <section className='userPosts' ><div> <Postlist postsPage={data.userPosts}/></div> </section>
          </div>
          </DataContext.Provider>);
    default:
      throw new Error('unexcepted type: ' + dataType);
  }
}

function LinkButton({onClick, children, myType}){
  return <button onClick={onClick} className='linkButton'>
          {children}
        </button>
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
    <p>{post.content}</p>
    </article>);
}


function Userlist({usersPage}){
  const { data, setData, dataType, setDataType , setTrigger, trigger } = useContext(DataContext);
  if ('_embedded' in usersPage) {
    const users = usersPage._embedded.userDTOes;
    const links = usersPage._links;
  
    const usersComponents = users.map(user =>
      <User  key={user.postId} user={user} />
    );   
    // What should the pagination links to when clicked? Update the posts data
    const update = (newUsers) => {
      setData(newUsers);
      setTrigger(!trigger);
    };
    const linksComponents = <PaginationLinks urls={links} update={update} />
    return  <section className='userlist' ><div>{usersComponents} {linksComponents}</div></section>;
  } else {
    return <span>loading...</span>;
  }

}


function User({user}){ 
  const { data, setData, dataType, setDataType ,trigger, setTrigger  } = useContext(DataContext);
  const userURL = user._links.userPosts.href;
  const userPostsURL = user._links.self.href;
  const onUserClick = () => {
    Promise.all([getData(userURL), getData(userPostsURL)])
      .then(values => {
        values[0]['userPosts'] = values[1];
        setData(values[0]);
        setDataType(SINGLE_USER);
        setTrigger(!trigger);
      });
  };

  return (<article className='user'>
    <LinkButton onClick={onUserClick} ><h4>{user.username}</h4></LinkButton> 
    <h4>{user.mail}</h4>
    </article>);
}


function Comment({comment}){ 
return (<article className='comment'>
  <h3>by  {comment.author} posted on {comment.date}</h3>
  <p>{comment.content}</p>
  </article>);
}

/* 
  Creates links for going to next or previous page. On click data is pulled from the url, and then pushed into the update function.
  PaginationLinks do not change the type of the top level component 
  (i.e. when currently showing pages of comments, clicking on a pagination link continues showing pages of comments).
*/
function PaginationLinks({urls, update}){
  // Creates for a url a function that is called on click
  const onClick = (url) => { return () => (
    getData(url).then(response => {
      update(response);
        // context.setData(response);
    }));
  };
  const linkKeys = ['self', 'first', 'prev', 'next', 'last'];
  return <span className="paginationLinks">
  {Object.keys(urls).filter((key) => linkKeys.includes(key)).map((key, index) => (
        <span className="paginationLink" key={urls[key].href + '-' + key + 'span'}  >
        <LinkButton key={urls[key].href + '-' + key + 'button'}  onClick={onClick(urls[key].href)} >
          {key}
        </LinkButton></span>
  ))}</span>;
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

function Postlist({postsPage}){
  const { data, setData, dataType, setDataType , setTrigger, trigger } = useContext(DataContext);
  if ('_embedded' in postsPage) {
    const posts = postsPage._embedded.postDTOes;
    const links = postsPage._links;
  
    const postsComponents = posts.map(post =>
      <Post  key={post.postId} post={post} />
    );   
    // What should the pagination links to when clicked? Update the posts data
    const update = (newPosts) => {
      if(dataType === SINGLE_USER){
        data.userPosts = newPosts;
        setData(data);
        setTrigger(!trigger);
      }else if (dataType === POST_LIST) {
        setData(newPosts);
        setTrigger(!trigger);
      } else {
        throw new Error('unexpected data type');
      }
    };
    const linksComponents = <PaginationLinks urls={links} update={update} />
    return  <section className='postlist' ><div>{postsComponents} {linksComponents}</div></section>;
  } else {
    return <span>loading...</span>;
  }

}




export default App;



