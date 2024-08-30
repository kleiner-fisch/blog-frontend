import { Link} from 'react-router-dom';
import  Typography  from '@mui/material/Typography';

export function Home(){
    return (<>
        <Typography variant={'h1'}>Home</Typography>
        <Typography variant="body1">
            This is a small blog created to learn some web development skills.
        </Typography>
        <Typography variant="body1">
            The blog data is downloaded from a publicly available data store, 
            and made available via a RESTful API: 
            <Link to='https://hody-blog.azurewebsites.net/blog/api/v1/swagger-ui/index.html'>
                https://hody-blog.azurewebsites.net/blog/api/v1/swagger-ui/index.html
            </Link> 
        </Typography>

        <Typography variant="body1">
            The view is documented here:
                <Link to='https://github.com/kleiner-fisch/blog-frontend'>
                    https://github.com/kleiner-fisch/blog-frontend
                </Link> 
        </Typography>
        <Typography variant="body1">
            The blog API is documented here:  
                <Link to='https://github.com/kleiner-fisch/blog'>
                    https://github.com/kleiner-fisch/blog
                </Link> 
        </Typography>
        <Link to={'./posts'}><h2>Blog</h2></Link>
    </>);
} 
