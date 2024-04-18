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



const DataContext = createContext({});

function App() {
  const [data, setData] = useState({});
  const [dataType, setDataType] = useState('POST_LIST');
  const [url, setURL] = useState('http://localhost:8080/blog/api/v1/posts');

  // getData('http://localhost:8080/blog/api/v1/posts').then(jsonData => setData(jsonData));

  useEffect(() => {
    getData('http://localhost:8080/blog/api/v1/posts').then(response => {setData(response)});
    }, []
  );

  switch (dataType) {
    case 'POST_LIST':
      return (  <DataContext.Provider value={{'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'url': url, 'setURL':setURL  }}>
        <div className="App">
          <header className="App-header">
          <h1>Hello, world!</h1>
              <p>Learn React!!</p>
          </header>
          {/* <section className='posts' > 
            <Post className='post' title={posts[0].title} content={posts[0].content} />
            <Post className='post' title={posts[1].title} content={posts[1].content} />
           </section> */}
          <section className='postlist' ><div> <Postlist data={data}/></div> </section>
          </div>
          </DataContext.Provider>);
    case 'SINGLE_POST':

      break;

    case 'USER_LIST':

      break;
    case 'SINGLE_USER':

      break;
    default:
      throw new Error('unexcepted type: ' + dataType);
  }
}


// function Post({post}){ 
//   return (<article className='post'>
//     <LinkButton link={post._links.self}> <h2>{post.title}</h2></LinkButton>
//     <a href= rel="noreferrer"> </a> 
//     <h3>by <a href={post.author._links.self} rel="noreferrer"> {post.author.username}</a> posted on {post.date}</h3>
//     {/* console.log({content}) */}
//     <p>{post.content}</p>
//     </article>);
// }

function LinkButton({url, children, myType}){
  // {'data': data, 'setData': setData, 'dataType': dataType, 'setDataType':setDataType , 'url': url, 'setURL':setURL  }
  const context = useContext(DataContext);
  const onClick = () => {
    getData(url).then(response => {
      context.setData(response);
      context.setDataType(myType);
    });
    
  };
  return <button onClick={onClick} className='linkButton'>
          {children}
        </button>

}

function Post({post}){ 
  return (<article className='post'>
    <LinkButton url={post._links.self} myType='SINGLE_POST' ><h2>{post.title}</h2></LinkButton> 
    <h3>by 
      <LinkButton url={post.author._links.self} myType='SINGLE_USER'>
        {post.author.username}
      </LinkButton> 
      posted on {post.date}
    </h3>
    <p>{post.content}</p>
    </article>);
}

function PaginationLinks({jsonLinks}){
  console.log(jsonLinks);
  Object.keys(jsonLinks).forEach(element => {
    console.log("element: " + element);
    console.log("element: " + jsonLinks[element].href);
    // console.log("key: " + element.key);
    // console.log("key: " + element.index);
  });
  return <span className="paginationLinks">
  {Object.keys(jsonLinks).map((key, index) => (
        <LinkButton key={jsonLinks[key].href}  url={jsonLinks[key].href} myType='POST_LIST' >
          {key}
        </LinkButton> 
      // <a className="paginationLink" key={jsonLinks[key].href} href={jsonLinks[key].href}>{key}</a>
  ))}</span>;
}


function Postlist({data, setURL, setData}){
  // return <>{posts.map(function(post) {
  //   return <Post key={post.postId} className='post' content={post.content} title={post.title} />
  // })}</>;   
  // debugger;
  if ('_embedded' in data) {
    const posts = data._embedded.postDTOes;
    const links = data._links;
  
    const postsComponents = posts.map(post =>
      <Post  key={post.postId} post={post} />
    );   
    const linksComponents = <PaginationLinks jsonLinks={links}/>
  
    return <div>{postsComponents} {linksComponents}</div>;
  } else {
    return <span>loading...</span>;
  }

}




export default App;



