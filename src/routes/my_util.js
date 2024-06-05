import sanitizeHtml from 'sanitize-html';
import { Link } from 'react-router-dom';

/**
 * modifies the given url to a url local to the view. 
 * This local url is then redirected by routing to the location of the data
 * @param {*} url 
 */
export function getViewURL(url){
    const VIEW_BASE_URL = "http://localhost:5000"
    let urlObj = new URL(url);
    const path = urlObj.pathname.replace('/api/', '/view/');
    return VIEW_BASE_URL + path + urlObj.search;
  
  }

  /**
 * returns the text wrapped in an react-attribute that safely renders HTML symbols
 * @param {*} text 
 * @returns 
 */
  export function decodeHTMLText(text){
    return {dangerouslySetInnerHTML:{__html:sanitizeHtml(text)}};
  }
  
  export function PaginationLinks({urls}){
    const linkKeys = ['self', 'first', 'prev', 'next', 'last'];
    return <span className="paginationLinks">
    {Object.keys(urls).filter((key) => linkKeys.includes(key)).map((key, index) => (
          <span className="paginationLink" key={urls[key].href + '-' + key + 'span'}  >
            <Link key={urls[key].href + '-' + key + 'button'}  to={getViewURL(urls[key].href)} >
              {key}
            </Link>
          </span>
    ))}</span>;
  }