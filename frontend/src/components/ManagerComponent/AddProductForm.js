//react import 
import {useState} from "react";

//mui import 
import Button from '@mui/material/Button';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { MenuItem, Box, Divider, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

//component import
import OptionTextField from "./OptionTextField";

//hook import 
import useBackend from "../../containers/hooks/useBackend";
import { Typography } from "antd";
import PostAdd from "@mui/icons-material/PostAdd";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//test const define
const category = [
    {
        value: "spring",
        label: "spring"
    },
    {
        value: "Summer",
        label: "summer"
    },
    {
        value: "Winter",
        label: "winter"
    },
    {
        value: "Autumn",
        label: "autumn"
    }
]


//functional component
const AddProductForm = () => {
    //call hook
    const {AddProductToCategory} = useBackend();
    const {categories}=useWebsite();

    //set state
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs(""));
    const [name, setName] = useState("");
    const [whichCategory, setWhichCategory] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [price, setPrice] = useState("");
    const [note, setNote] = useState("");
    const [type, setType] = useState("");
    const [optionType, setOptionType] = useState("");
    const [optionNum, setOptionNum] = useState(0);
    const [options, setOptions] = useState([]);



    //function define
    const Cancel = () => {
        setDate(dayjs(""));
        setOpen(false);
    }

    const handleOptions = (newNum) => {
        setOptionNum(newNum);
        if(options.length<=newNum){
            let newArr = [...options];
            for(let i=0; i<(newNum-options.length); i++){
                newArr[newArr.length] = {}
            }
            setOptions(newArr);
        }
        else{
            let newArr = [];
            for(let i=0 ; i<newNum; i++){
                newArr[newArr.length] = options[i];
            }
            setOptions(newArr);
        }
    }

    const onAddProduct = ()=>{
        if (!name || !whichCategory || !photoURL || !price || !type || !optionNum){
            return;
        }
        let ops = []
        options.map((obj,i)=>(ops[i]={
            option:obj.option,
            bought:obj.bought,
            sold:0,
            buyers:[]
        }))
        console.log('ops',ops)
        const Product = {
            name: name,
            category: whichCategory,
            URL: photoURL,
            price: price,
            note: note,
            product_type: type,
            option_type: optionNum,
            options: ops
        }
        console.log("Product: ", Product);
        AddProductToCategory(Product);
        setOpen(false);
        

    }

    //return
    return(
        <Box>
            <IconButton 
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={()=>{setOpen(true)}}
                >
                <AddIcon />
            </IconButton>
        <Dialog 
            open={open} 
            onClose={()=>{setOpen(false)}} 
            fullWidth={true}
            >
            <DialogTitle>增新商品品項</DialogTitle>
            <DialogContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                <Box sx={{
                    display: "grid", 
                    gap: 1
                }}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="商品名稱"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <TextField
                    id="outlined-select-category"
                    select
                    required
                    margin="dense"
                    label="商品種類"
                    value={whichCategory}
                    onChange={(e)=>{setWhichCategory(e.target.value)}}
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="商品照片網址"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={photoURL}
                    onChange={(e)=>{setPhotoURL(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="商品價格"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="category_name"
                    label="備註"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={note}
                    onChange={(e)=>{setNote(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="商品類型"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={type}
                    onChange={(e)=>{setType(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="option_type"
                    label="選項類型"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={optionType}
                    onChange={(e)=>{setOptionType(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="選項數量"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={optionNum}
                    onChange={(e)=>{handleOptions(e.target.value)}}
                />
                </Box>
                {optionNum? 
                <Box sx={{
                    display: "grid",
                    gap: 1
                }}>
                <Divider />
                <Typography variant="h6" component="div">選項增新</Typography>
                <DialogContent sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns: "1fr 1fr"
                }}>
                    {options.map((value,index)=>(
                        <OptionTextField options={options} setOptions={setOptions}  num={index} key={index} isUpdate={false}/>
                    ))}
                </DialogContent>
                </Box>:<></>}
            </DialogContent>
            
            <DialogContent sx={{
                display: "grid",
                gap: 1
            }}>

                
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{Cancel()}}>取消</Button>
            <Button onClick={()=>{onAddProduct()}}>增新</Button>
            </DialogActions>
        </Dialog>
        </Box>
    )
}

export default AddProductForm;