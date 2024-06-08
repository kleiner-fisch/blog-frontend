import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams, Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { baseURL, getData,  decodeHTMLText} from '../my_util';


function getURL(postId, page=1, order='desc') {
  return `${baseURL}/posts/${postId}/comments?page=${page - 1}&size=10&sort=date,${order}`

}


function Comment({comment}){ 
  return (<article className='comment'>
    <h6>by  {comment.author} posted on {comment.date}</h6>
    <p {...decodeHTMLText(comment.content)} />
    </article>);
}

function Commentlist(){
  const params = useParams();
  const [commentsPagination, setComments] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const location =  useLocation();
  const navigate = useNavigate();

  const postId = params.postId;
  const order = searchParams.get('order') == null ? 'desc' : searchParams.get('order');
  const page = searchParams.get('page') == null ? 0 : parseInt(searchParams.get('page'));
  
  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(getURL(postId, page, order), { signal });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setComments(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [params, searchParams, postId, page, order]);

  let result = null; 

  if (!commentsPagination) {
    result = <div>Loading...</div>;  // Render a loading state while data is being fetched
  }else {
    const totalPages = parseInt(commentsPagination.page.totalPages);
    const currentPage = parseInt(commentsPagination.page.number) + 1;
    if(result == null && totalPages === 0){
      result = (<p>No comments yet</p>);
    } else if(result == null && page > totalPages){

      // TODO 
      // The following approach to redericting in case of too large page number does not work. 
      // The problem is that for some reason the fetched data is inconsistent with the data used to fetch it.
      // That is, page is not equal to the page number in the fetched data (stored in commentsPagination.page.number)
      // So, for now, instead of redirecting we simply show that for this page number there is no data, and we show for which there is
      // The problem somehow seems to be that clicking a link, or being redirected there does works differently 
      // from the user inserting the URL and hitting enter. 
      // Because, when I show the link below and have the user click it, the problem persists.
      const link = <Link to={{ pathname:location.pathname, search: `?page=${totalPages}` }}>{`page ${totalPages}`}</Link>

      result = (<p>{`For page ${page} there are no comments. Please go to page ${totalPages}`}</p>);

      // forward to last page with entries
      // navigate(`${location.pathname}?page=${totalPages}`);
      // return null;
    }else {

      const comments = commentsPagination._embedded.commentDTOes;
      const commentsComponents = comments.map(comment =>
        <Comment  key={comment.commentId} comment={comment} />
      );   

      const linksComponents = <PaginationLinks currentPage={currentPage} totalPages={totalPages} location={location} />
      result = <div>{commentsComponents} {linksComponents}</div>;
    }
  }
  return  <section className='commentList' ><h3>Comments</h3>{result}</section>;
}


function PaginationLinks({ currentPage, totalPages, location }) {
  return (
    <div>
      {currentPage > 2 && (
          <Link to={{ pathname:location.pathname, search: '?page=1' }}>First</Link>
      )}
      {currentPage > 1 && (
          <Link to={{ pathname:location.pathname, search: `?page=${currentPage - 1}` }}>previous</Link>
      )}        
      {currentPage < totalPages && (
          <Link to={{ pathname:location.pathname, search: `?page=${currentPage + 1}` }}>next</Link>
      )}
      {currentPage < totalPages -1 && (
          <Link to={{ pathname:location.pathname, search: `?page=${totalPages}` }}>last</Link>        
      )}
    </div>
  );
}

  
export default Commentlist;



