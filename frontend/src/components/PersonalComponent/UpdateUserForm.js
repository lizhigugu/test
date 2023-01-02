//react import 
import {useState, useEffect} from "react";

//mui import 
import Button from '@mui/material/Button';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Autocomplete } from "@mui/material";

//component import
import BasicDateTimePicker from "../ManagerComponent/DateTimePicker";

//hook import 
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//functional component
const UpdateUserForm = ({setRelog}) => {
    
    //call hook
    const { userLineId, userData } = useWebsite();
    const { GetUserData, UpdateUser } = useBackend();

    //set state
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(dayjs(""));
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(()=>{
        GetUserData(userLineId);
        setName(userData.name);
        setPhone(userData.phoneNumber);
        setAddress(userData.address);
    },[])
    
    //function define
    const Cancel = () => {
        setOpen(false);
    }

    const onUpdateUser = ()=>{
        const newUser = {
            lineId:userLineId, 
            name:name, 
            address:address, 
            phoneNumber:phone};
        UpdateUser(newUser);
        setRelog(true);
        setOpen(false);
    }

    const CountyOption=["台北市","新北市","基隆市","宜蘭縣",
    "桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣",
    "南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市",
    "屏東縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣","海南諸島"
    ]

    //return
    return(
        <>
        <IconButton color="primary" aria-label="upload picture" 
            component="label" onClick={()=>{setOpen(true)}} sx={{height:30,width:30}}>
            <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={()=>{Cancel()}}>
            <DialogTitle>修改個人資料</DialogTitle>
            <DialogContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="姓名"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category_name"
                    label="電話"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                />
                <Autocomplete
                id="COUNTY"
                margin='dense'
                options={CountyOption}
                sx={{gridColumnStart:1,gridColumnEnd:2}}
                renderInput={(params) => <TextField {...params} label="台灣縣市" 
                helperText="輸入門市所在縣市"/>}
                >
                </Autocomplete>
                <Autocomplete
                    id="category_name"
                    //aria-required
                    margin="dense"
                    options={["台大","師大"]}
                    sx={{gridColumnStart:2,gridColumnEnd:3}}
                    onChange={(e, option) => {setAddress(option)}}
                    renderInput={(params) => <TextField {...params} label="門市" 
                    helperText="輸入 店號/門市名稱/道路名稱 查找" autoFocus/>}
                    value={address}
                >
                </Autocomplete>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{Cancel()}}>取消</Button>
            <Button onClick={()=>{onUpdateUser()}}>確認</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default UpdateUserForm; 