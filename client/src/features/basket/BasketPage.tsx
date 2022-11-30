import { Add, Delete, Remove } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext"
import { BasketSummary } from "./BasketSummary";

export const BasketPage = () => {

    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({ loading: false, name: '' });
    const handleAdd = (productId: number, name: string) => {
        setStatus({ loading: true, name });

        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => {
                setStatus({ loading: false, name: '' });
              
            })

    }
    const handleRemove = (productId: number, quantity: number, name: string) => {
        setStatus({ loading: true, name })
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }


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
                                    loading={status.loading && status.name === "rem" + item.name}
                                    onClick={() => handleRemove(item.productId, 1, "rem" + item.name)} >
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton
                                    loading={status.loading && status.name === "add" + item.name}
                                    onClick={() => handleAdd(item.productId, "add" + item.name)} >
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="center">${item.price}</TableCell>
                            <TableCell align="center">${item.price * item.quantity}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    onClick={() => handleRemove(item.productId, item.quantity, "del")}
                                    color="error" >
                                    <Delete />
                                </IconButton>
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
