import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'  

import './index.css';

import {Home } from './components/home';
import {About} from './components/about';
import {Contact} from './components/contact';

import Post from './components/single_post'
import Postlist from './components/postlist'

/*
  - posts/:postId?page=1 (page refers to comments page)
  - posts?page=1&userId=3 (default page is 0, userId has no default, allows to filter by user)
  - user/:userId
  - users?page=1
*/

function App() {
  return (<Router>
    <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/posts/" element={<Postlist />} /> 
        <Route path="/posts/:postId/comments" element={<Post/>} />
        // {/* <Route path="/users" component={Userlist} /> */}
      </Routes>
  </Router>);
    }




export default App;



