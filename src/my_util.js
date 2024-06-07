

/* 
  Creates links for going to next or previous page. On click data is pulled from the url, and then pushed into the update function.
  PaginationLinks do not change the type of the top level component 
  (i.e. when currently showing pages of comments, clicking on a pagination link continues showing pages of comments).
*/
export function PaginationLinks({urls, update}){
    // Creates for a url a function that is called on click
    const onClick = (url) => { return () => (
      getData(url).then(response => {
        update(response);
          // context.setData(response);
      }));
    };
    const linkKeys = ['self', 'first', 'prev', 'next', 'last'];
    return <span className="paginationLinks">
    {Object.keys(urls).filter((key) => linkKeys.includes(key)).map((key, index) => (
          <span className="paginationLink" key={urls[key].href + '-' + key + 'span'}  >
          <LinkButton key={urls[key].href + '-' + key + 'button'}  onClick={onClick(urls[key].href)} >
            {key}
          </LinkButton></span>
    ))}</span>;
  }

export function LinkButton({onClick, children, myType}){
    return <button onClick={onClick} className='linkButton'>
            {children}
          </button>
}

// async function getData(url, setData) {
//   // debugger;
//   const response = await fetch(url);
//   const body = await response.json();
//   setData(body);
// }

export function getData(url) {

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