import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

const Contact = () => {
  const dispatch = useAppDispatch();
  const {data, title} = useAppSelector(state=>state.counter)
  return (
    <div> 
      {title} <br/> {data}
      <Button onClick={()=> dispatch(decrement(1))} variant="contained" color="error">Decrement</Button>
      <Button onClick={()=> dispatch(increment(1))} variant="contained" >Increment</Button>
      <Button onClick={()=> dispatch(increment(5))} variant="contained" color="secondary" >Increment by 5</Button>
     </div>

  )
}

export default Contact