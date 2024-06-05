import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Root from "./routes/root";

// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Postlist from './routes/postlist';
import Post from './routes/single_post';
import Commentlist from './routes/commentlist';
import Userlist from './routes/userlist';

const baseURL = "http://localhost:8080/blog/api/v1";

const base_route = "/blog/view/v1/";
const router = createBrowserRouter([
  {
    path: "/",
    element:  <Postlist />,
    errorElement: <ErrorPage />,
    loader: fetchRoot,

  },
  {
    path: base_route + "posts",
    element: <Postlist />,
    errorElement: <ErrorPage />,
    loader: fetchPosts
  },{
  path: base_route + "users",
  element: <Userlist />,
  errorElement: <ErrorPage />,
  loader: fetchUsers
} ,
  {
    path: base_route + "posts/users/:userId",
    element: <Postlist />,
    errorElement: <ErrorPage />,
    loader: fetchUserPosts
  } ,
  {
    path: base_route + "posts/:postId",
    element: <Post />,
    errorElement: <ErrorPage />,
    loader: fetchPost,
    children: [{
      index: true,
      element: <Commentlist />,
      loader: fetchComments,
      errorElement: <ErrorPage />
    },{
      path: "comments",
      element: <Commentlist />,
      loader: fetchComments,
      errorElement: <ErrorPage />
    }
    ]
  } 
]);

// export function getViewURL(url){
//     const VIEW_BASE_URL = "http://localhost:5000"
//     let urlObj = new URL(url);
//     const path = urlObj.pathname.replace('/api/', '/view/');
//     return VIEW_BASE_URL + path + urlObj.search;
  
//   }


// function view2api(url){
//   const apiPath = url.pathname.replace('/view/', '/api/');
//   return new URL("http://localhost:8080" + apiPath + url.search);
// }


function fetchRoot () {
  const url = new URL("http://localhost:8080/blog/api/v1/posts");
  return fetch(url.href).then(response => {
    console.log(response);
    return response.json()});
}

function fetchPost ({params}) {
  // console.log(request);
  const apiURL = new URL(baseURL + "/posts/" + params.postId);
  return fetch(apiURL).then(response => {
    console.log(response);
    return response.json()});
}

function fetchUserPosts ({params}) {
  // console.log(request);
  const apiURL = new URL(baseURL + "/posts/users/" + params.postId);
  return fetch(apiURL).then(response => {
    console.log(response);
    return response.json()});
}

function fetchUsers({params}) {
  // console.log(request);
  const apiURL = new URL(baseURL + "/users" );
  return fetch(apiURL).then(response => {
    console.log(response);
    return response.json()});
}

function fetchPosts ({params}) {
  // console.log(request);
  const apiURL = new URL(baseURL + "/posts" + params.search);
  return fetch(apiURL).then(response => {
    console.log(response);
    return response.json()});
}

// function fetchData ({request}) {
//   const apiURL = view2api(new URL(request.url));
//   return fetch(apiURL).then(response => {
//     console.log(response);
//     return response.json()});
// }

function fetchComments ({params, request}) {
  console.log(params, request);
  let searchParams = ""; 
  if ( typeof request !== 'undefined' && request !== null) {
    searchParams = new URL(request.url).searchParams;
  }
  const apiURL = new URL(baseURL + "/posts/" + params.postId + "/comments?" + searchParams );
  return fetch(apiURL).then(response => {
    console.log(response);
    return response.json()});
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
