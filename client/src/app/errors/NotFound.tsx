import { Button, Divider, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
   <Container component={Paper} >
    <Typography variant="h3" gutterBottom >Whoops -- ፎሮፎር 404</Typography>
    <Divider/>
    <Button variant="contained" component={Link} to='/catalog' >Back to Catalog</Button>
   </Container>
  )
}
