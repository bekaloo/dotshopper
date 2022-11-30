import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link, NavLink } from "react-router-dom"
import { useStoreContext } from "../context/StoreContext"
interface Props {
    themeSetter: () => void
    darkMode: boolean
}
const midlinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightlinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
    
]
const navStyles = {
    color:'inherit', 
    typography: 'h6',
    '&:hover':{
        color: 'grey.500',
        textDecoration: 'underline'
    },
    '&.active':{
        color: 'text.secondary',
        border: 'solid 1px white'
    }
}

const Header = ({ darkMode, themeSetter }: Props) => {
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item)=>sum+item.quantity,0);
    
     
    return (
        <AppBar position="static" >

            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant='h6' component={NavLink} to="/" sx={{textDecoration: 'none', color: 'inherit'}} >Ecommerce</Typography>
                <Switch
                    checked={darkMode}
                    onChange={themeSetter}
                />
                </Box>

                <List sx={{display: 'flex'}}>
                    {
                        midlinks.map(({title, path})=>(
                            <ListItem component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))
                    }
                </List>
                
                <List sx={{display: 'flex'}}>
                    <IconButton component={Link} to='/Basket' size="large" sx={{color:'inherit'}}>
                    <Badge badgeContent={itemCount} color='secondary' >
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                    {
                        rightlinks.map(({title, path})=>(
                            <ListItem component={NavLink}
                            to={path}
                            key={path}
                            sx={{
                                color:'inherit', 
                                typography: 'h6',
                                '&:hover':{
                                    color: 'grey.500',
                                    textDecoration: 'underline'
                                },
                                '&.active':{
                                    color: 'text.secondary',
                                    border: 'solid 1px white'
                                }
                            }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))
                    }
                </List>
            </Toolbar>

        </AppBar>
    )
}

export default Header