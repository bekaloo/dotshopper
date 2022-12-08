import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { AppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
    const {basket, status} = useAppSelector(state => state.basket)
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state=> productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state=>state.catalog)
    const [submitting, setSubmitting] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const item = basket?.items.find(item => item.productId === product?.id);
    const handleChange = (event: any)=>{
        if(event.target.value >= 0){
            setQuantity(parseInt(event.target.value))
        }
    }
    const handleUpdate = ()=>{
        setSubmitting(true);
        if(!item || quantity > item.quantity){
            const updateQuantity = item ? quantity-item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
            
           
        }else{
            const updateQuantity = item.quantity - quantity;
           dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
            
        }
         setSubmitting(false);
    }
    useEffect(() => {
     if(item) setQuantity(item.quantity)
     if(!product) dispatch(fetchProductAsync(parseInt(id!)))


    }, [id, item, dispatch, product])
    if(productStatus.includes('pending')) return <LoadingComponent message="Loading Product..." />
    if(!product) return <NotFound />
   

  return (
   <Grid container spacing={6} >
    <Grid item xs={5} >
    <img src={product.pictureUrl} alt={product.name} style={{width:"100%"}} />
    </Grid>
    <Grid item xs={6} >
        <Typography variant="h3" >
            {product.name}
        </Typography>
        <Divider sx={{mb: '2px'}} />
        <Typography variant="h4" >${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{product.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>{product.inventory}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={2} >
            <Grid xs={6} item>
                <TextField
                onChange={handleChange} 
                variant="outlined"
                type="number"
                label="Quantity in cart"
                fullWidth
                value={quantity}
                />
            </Grid>
            <Grid xs={6} item>
                <LoadingButton 
                disabled={quantity === item?.quantity || (!item && quantity === 0)}
                loading={status.includes('pending')} 
                onClick={handleUpdate} 
                size="large" 
                variant="contained" 
                fullWidth >{quantity>0? "Update Quantity" : "Add to Cart"}</LoadingButton>
</Grid>
        </Grid>
    </Grid>
   </Grid>
  )
}

export default ProductDetails