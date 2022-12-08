import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../../app/store/configureStore";

export const BasketSummary = () => {
    const {basket} = useAppSelector(state=>state.basket);

    const subtotal = basket?.items.reduce((sum, item)=> sum + item.quantity*item.price,0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 50;
  return (
    <TableContainer component={Paper} variant={'outlined'} >
        <Table>
            <TableHead>

            </TableHead>
            <TableBody>
           
            <TableRow>
            <TableCell colSpan={2} align="center">Subtotal</TableCell>
            <TableCell align="center">${subtotal}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2} align="center">Delivery fee</TableCell>
            <TableCell align="center">${deliveryFee}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2} align="center">Total</TableCell>
            <TableCell align="center">${deliveryFee + subtotal}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={2} align="center">Orders over $100 qualify for free delivery</TableCell>
            </TableRow> 
            </TableBody>
        </Table>
    </TableContainer>
  )
}
