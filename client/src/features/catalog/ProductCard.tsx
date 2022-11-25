import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
import { Link } from 'react-router-dom';
import { Product } from '../../app/models/product';
interface Props {
    product: Product
}
const ProductCard = ({ product }: Props) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }} >
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>

                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.main' }
                }}
            />
            <CardMedia
                image={product.pictureUrl}
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.main' }}
                title={product.name}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
        // <List>
        //         <ListItem >
        //             <ListItemAvatar>
        //                 <Avatar src={product.pictureUrl} />
        //             </ListItemAvatar>
        //             <ListItemText>{product.name} -- {product.price}</ListItemText>
        //         </ListItem>

        // </List>
    )
}

export default ProductCard