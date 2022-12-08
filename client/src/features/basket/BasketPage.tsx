import { Add, Delete, Remove } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketSummary } from "./BasketSummary";

export const BasketPage = () => {

    const { basket,status, remove } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch()
    

        
    if (!basket) return <Typography variant="h3">Your Basket Is Empty</Typography>
    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Subtotal(g)</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map((item) => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center' >
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={status === "pendingRemoval" + item.productId}
                                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId}))} >
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status === "pendingAdd" + item.productId}
                                    onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} >
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="center">${item.price}</TableCell>
                            <TableCell align="center">${item.price * item.quantity}</TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={remove === "Delete" + item.productId}
                                    onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))}
                                    color="error" >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container marginTop={1} >
            <Grid xs={6} item/>
        <Grid  xs={6} item>
            <BasketSummary />
            <Button variant="contained" size="large" fullWidth component={Link} to="/checkout" >Checkout</Button>
        </Grid>
        </Grid>
        </>
    );

}
