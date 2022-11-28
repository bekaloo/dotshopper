import { Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import agent from "../../app/api/agent"

const About = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const getValidationError = ()=>{
    agent.TestErrors.getValidationError()
    .then(()=>console.log("this must not appear"))
    .catch((error)=>setValidationErrors(error))
  }
  return (
    <div>
      <Container>
        <Typography gutterBottom variant="h2" >
    <ButtonGroup fullWidth>
    <Button variant="contained" onClick={()=>agent.TestErrors.get400Error().catch(error=>console.log(error)) }  > Test 400</Button>
    <Button variant="contained" onClick={()=>agent.TestErrors.get401Error().catch(error=>console.log(error)) }  > Test 401</Button>
    <Button variant="contained" onClick={()=>agent.TestErrors.get404Error().catch(error=>console.log(error)) }  > Test 404</Button>
    <Button variant="contained" onClick={()=>agent.TestErrors.get500Error().catch(error=>console.log(error)) }  > Test 500</Button>
    <Button variant="contained" onClick={()=>getValidationError() } > Test Validation</Button>
    </ButtonGroup>
    {
      validationErrors.length > 0 && 
      <Alert severity="error" >
        <AlertTitle>Validation Errors</AlertTitle>
        <List>
          {
            validationErrors.map(error=>(
              <ListItem key={error} >
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Alert>
    }
        </Typography>
      </Container>
    </div>
  )
}

export default About