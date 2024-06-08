import sanitizeHtml from 'sanitize-html';


export const baseURL = 'http://localhost:8080/blog/api/v1';

export  function getData(url) { 
        return fetch(url)
          .then(response => {return response.json()});
    }

  /**
 * returns the text wrapped in an react-attribute that safely renders HTML symbols
 * 
 * The return object needs to be set to the propert dangerouslySetInnerHTML,
 * i.e. <p dangerouslySetInnerHTML=decodeHTMLText(htmlText) />
 * @param {*} text 
 * @returns 
 */
  export function decodeHTMLText(text){
    return {dangerouslySetInnerHTML:{__html:sanitizeHtml(text)}};
  }

