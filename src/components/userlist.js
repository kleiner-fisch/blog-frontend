import 'bootstrap/dist/css/bootstrap.min.css';

import { useLoaderData, Link } from 'react-router-dom';

import {getViewURL, decodeHTMLText, PaginationLinks}  from './my_util';



function Userlist(){
  const usersPage = useLoaderData();

  if ('_embedded' in usersPage) {
    const users = usersPage._embedded.userDTOes;
    const links = usersPage._links;
  
    const usersComponents = users.map(user =>
      <User  key={user.userId} user={user} />
    );   
    const linksComponents = <PaginationLinks urls={links} />
    return  <section className='userlist' ><div>{usersComponents} {linksComponents}</div></section>;
  } else {
    return <span>loading...</span>;
  }

}


function User({user}){ 

  const userURL = user._links.userPosts.href;

  return (<article className='user'>
    <Link to={getViewURL(userURL)} ><h4>{user.username}</h4></Link> 
    <h4>{user.mail}</h4>
    </article>);
}



export default Userlist;



