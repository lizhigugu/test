//react import 
import {useState} from "react";

//mui import
import {Avatar, Box, Card, Divider, Grid, TextField, Typography, InputAdornment, Button} from "@mui/material";

//hook import
import { useWebsite } from "./hooks/WebsiteContext";

//import navigate
import { useNavigate } from "react-router-dom";

//functional component 
const Login = () => {
    //set state
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    //hook import
    const { checkManager } = useWebsite();

    //navigate define
    const navigate =useNavigate();

    //function define
    const handleLogin = () => {
        if(!id || !name){
            return
        }
        const ifM=checkManager(name, id);
        console.log("if manager: ", ifM);
        navigate("/buying")

    }

    return(
        <Box sx={{
            display: "grid",
            gap: 1,
            width: "100%",
            justifyContent: "center"
        }}>
            <Typography variant="h5" component="div" justifySelf="center">買家登入</Typography>
            <Divider sx={{width: "100%"}}/>
            <TextField
                variant="outlined"
                label="使用者名稱"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
                variant="outlined"
                label="使用者ID"
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
            />
            <Button variant="contained" onClick={()=>{handleLogin()}}>
                登入
            </Button>

        </Box>
        // <Grid container justifyContent="center" direction="column">
        //     <Card>
        //         <Typography variant="h5" component="div">買家登入</Typography>
        //         <Divider />
        //     </Card>
        //     <Grid item>
                
        //     </Grid>
        //     <Grid item>
        //         <TextField
        //                 autoFocus
        //                 required
        //                 margin="dense"
        //                 id="category_name"
        //                 label="使用者名稱"
        //                 type="text"
        //                 variant="outlined"
        //                 value={name}
        //                 onChange={(e)=>{setName(e.target.value)}}
        //             />
        //     </Grid>
        //     <Grid>
        //         <TextField
        //                 autoFocus
        //                 required
        //                 margin="dense"
        //                 id="category_name"
        //                 label="使用者ID"
        //                 type="text"
        //                 variant="outlined"
        //                 value={id}
        //                 onChange={(e)=>{setId(e.target.value)}}
        //                 />
        //     </Grid>

        // </Grid>
    )
}

//export 
export default Login;