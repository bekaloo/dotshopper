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
import { useParams } from "react-router-dom"
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

const ProductDetails = () => {
    const {basket,setBasket,removeItem} = useStoreContext()
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
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
            agent.Basket.addItem(product?.id!, updateQuantity)
            .then(basket=>setBasket(basket))
            .catch(error=>console.log(error))
            .finally(()=> setSubmitting(false))

        }else{
            const updateQuantity = item.quantity - quantity;
            agent.Basket.removeItem(item.productId, updateQuantity)
            .then(()=> removeItem(product?.id!, updateQuantity))
            .catch(error=> console.log(error))
            .finally(()=>setSubmitting(false))
        }
    }
    useEffect(() => {
     if(item) setQuantity(item.quantity)
     agent.Catalog.details(parseInt(id!))
      .then(response=> setProduct(response))
      .catch(error=> console.log(error))
      .finally(()=> setLoading(false))


    }, [id, item])
    if(loading) return <LoadingComponent message="Loading Product..." />
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
                disabled={quantity === item?.quantity || !item && quantity === 0}
                loading={submitting} 
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