import 'bootstrap/dist/css/bootstrap.min.css';

import { useLoaderData, Link } from 'react-router-dom';
import {getViewURL, decodeHTMLText}  from './my_util';



function User(){ 
  const user = useLoaderData();

  const userURL = user._links.userPosts.href;

  return (<div><article className='user'>
    <Link to={getViewURL(userURL)} ><h4>{user.username}</h4></Link> 
    <h4>{user.mail}</h4>
    </article>
    <section className='userPosts'>
      
    </section>
    </div>);
}


export default User;



