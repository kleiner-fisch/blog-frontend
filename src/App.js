import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { BrowserRouter as Router, Route, Routes, Redirect , Link} from 'react-router-dom'  

import './index.css';

import {Home } from './components/home';
import {About} from './components/about';
import {Contact} from './components/contact';

import Post from './components/single_post';
import Postlist from './components/postlist';

import Error404 from './error-page';

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
        <Route path="*" element={<NotFoundPage />} />
        // {/* <Route path="/users" component={Userlist} /> */}
      </Routes>
  </Router>);
    }


    const NotFoundPage = () => (

      <div>
    
        <h1>404 - Page Not Found</h1>
    
        <p>The page you are looking for does not exist.</p>
        <Link to={'/'}><h2>Home</h2></Link>

      </div>
    
    );




export default App;



