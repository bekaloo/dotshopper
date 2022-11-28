import { Button, Divider, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useLocation, useNavigate } from "react-router-dom"

const ServerError = () => {
    const history = useNavigate();
    const {state} = useLocation();
  return (
    <Container component={Paper} >
        {
            state?.error ?(
                <>
                <Typography variant="h5" gutterBottom >Server Error</Typography>
                <Divider/>
                <Typography  >{state.error.detail || "Internal Server Error"}</Typography>
                </>
            ):
            (<Typography variant="h5" gutterBottom >Server bla Error</Typography>)
        }
        <Button variant="contained" onClick={()=> history('/catalog')} >Back to Catalog</Button>
    </Container>
  )
}

export default ServerError