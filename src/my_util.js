import sanitizeHtml from 'sanitize-html';
import { Link } from 'react-router-dom';


export const baseURL = 'http://localhost:8080/blog/api/v1';

export  function getData(url) { 
        return fetch(url)
          .then(response => {return response.json()});
    }

  /**
 * returns the text wrapped in an react-attribute that safely renders HTML symbols
 * @param {*} text 
 * @returns 
 */
  export function decodeHTMLText(text){
    return {dangerouslySetInnerHTML:{__html:sanitizeHtml(text)}};
  }
  
  // export function PaginationLinks({urls}){
  //   const linkKeys = ['self', 'first', 'prev', 'next', 'last'];
  //   return <span className="paginationLinks">
  //   {Object.keys(urls).filter((key) => linkKeys.includes(key)).map((key, index) => (
  //         <span className="paginationLink" key={urls[key].href + '-' + key + 'span'}  >
  //           <Link key={urls[key].href + '-' + key + 'button'}  to={getViewURL(urls[key].href)} >
  //             {key}
  //           </Link>
  //         </span>
  //   ))}</span>;
  // }