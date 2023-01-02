// mui import
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';

// react import
import {useState} from "react";
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";
import { useNavigate } from "react-router-dom";

// functional component
const ProductDrawer = ({item, handleClose}) => {
    // set state
    const [option, setOption] = useState("");
    const [number, setNumber] = useState(0);
    const [optionChosed, setOptionChosed] = useState("");
    const [note, setNote]     = useState("");

    //import backend functions
    const {AddItemToBill} = useBackend();
    const {iflog} = useWebsite();

    //useNavigate
    const navigate = useNavigate();

    // handle add item to bill
    // suppose global state known. default: userLineId:ming
    // currentBillId: ming_2022-12-30T09:14:22.000Z
    const onAddItemToBill = (name, price, option, number, note)=>{
        const item = {name, price, option, number, note}
        const BillId = 'ming_2022-12-30T09:14:22.000Z'
        console.log("adding item to bill", item, BillId);
        AddItemToBill(BillId, item);
    }

    // function
    const handleChange = (event) => {
        setOption(event.target.value);
    };

    return(
        <div>
        <Box
          sx={{backgroundColor:'#b0bec5',
          display:"flex",
          flexDirection:"row",
          justifyContent:"center"
          }}
          //onClick={toggleDrawer(anchor, false)}
          //onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{
                width: 300,
                height:300,
                margin:"20px",
                backgroundColor: 'primary.dark',
            }}>
                <img src={item.URL} width="300px" height="300px"></img>
            </Box>
            <Box sx={{flexDirection:"column",
                    display:"flex",
                    backgroundColor:'#b0bec5',
                    justifyContent:"space-between",
                    justifyItems:"center",
                    paddingBottom:"10px"}}>
                <Box sx={{flexDirection:"display",
                          alignContent:"center",
                          margin:"10px"}}>
                    <ListItemText primary={item.name} secondary={item.category}/>
                </Box>
                <TextField label="數量"
                    helperText="請輸入數量"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                    type:"number",
                    defaultValue:1,
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                    onChange={(e)=>{setNumber(e.target.value)}}
                    value={number}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">選項</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={option}
                    label="選項"
                    value={optionChosed}
                    onChange={(e)=>{setOptionChosed(e.target.value)}}>
                        {item.options.map((e)=>(<MenuItem value={e.option}>{e.option}</MenuItem>))}
                    </Select>
                </FormControl>
                <TextField 
                    id="standard-basic" 
                    label="備註" 
                    variant="standard" 
                    size="small"
                    onChange={(e)=>{setNote(e.target.value)}}
                />
                <Button sx={{width:"50%",alignSelf:"flex-end",m: 1, width: '15ch'}}
                variant="outlined"
                onClick={()=>{
                    handleClose(false);
                    if(!iflog){
                        navigate("/login")
                        return
                    }
                    onAddItemToBill(item.name, item.price, optionChosed, number, note);
                }}>加入購物車</Button>
            </Box>
        </Box>
        </div>
    )
}

//export
export default ProductDrawer;
