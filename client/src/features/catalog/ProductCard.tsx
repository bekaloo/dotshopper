import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from '@mui/material'
// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import agent from '../../app/api/agent';
import { Product } from '../../app/models/product';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync} from '../basket/basketSlice';
interface Props {
    product: Product
}
const ProductCard = ({ product }: Props) => {
    const {status} = useAppSelector(state=> state.basket)
    const dispatch = useAppDispatch()
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
                <LoadingButton loading={status.includes('pending'+product.id)} size="small" onClick={()=>dispatch(addBasketItemAsync({productId: product.id}))} >Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard