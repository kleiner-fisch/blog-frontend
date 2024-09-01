import { Link } from 'react-router-dom';
import { Typography, List, ListItem } from '@mui/material';



export function Home() {
    return (<>
        <Typography variant={'h1'}>Home</Typography>
        <Link to={'./posts'}><h2>To the posts</h2></Link>
        <List>
            <ListItem>
                <Typography variant="body1">
                    This is a small blog created to learn some web development skills.
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="body1">
                    The blog data is downloaded from a publicly available data store,
                    and made available via a RESTful API:&nbsp;
                    <Link to='https://hody-blog.azurewebsites.net/blog/api/v1/swagger-ui/index.html'>
                        API swagger documentation
                    </Link>
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="body1">
                    The view is documented here:&nbsp;
                    <Link to='https://github.com/kleiner-fisch/blog-frontend'>
                        https://github.com/kleiner-fisch/blog-frontend
                    </Link>
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="body1">
                    The blog API is documented here:&nbsp;
                    <Link to='https://github.com/kleiner-fisch/blog'>
                        https://github.com/kleiner-fisch/blog
                    </Link>
                </Typography>            
            </ListItem>
        </List>

    </>);
} 
