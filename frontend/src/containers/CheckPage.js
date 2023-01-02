//react import 
import React from 'react'

//mui import 
import { Card, CardContent, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'
import  Divider  from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

//component import 
import Receipt from '../components/PersonalComponent/Receipt';

//navigate import
import { useNavigate } from 'react-router-dom';

//test Data
import Bills from "../test datas/Bills"
import { Grid } from 'antd';
import Item from 'antd/es/list/Item';
//import { isEnumType } from 'graphql';
import Input from 'antd/es/input/Input';

//hooks import
import { useWebsite } from './hooks/WebsiteContext'; 
import useBackend from './hooks/useBackend';

//711
//import {getStories} from '../../../backend/src/711/711stores';

//functional component
const CheckPage = () => {
    //set state
    const [PackageOption, setPackageOption] = React.useState('');
    const [PaymentOption, setPaymentOption] = React.useState('');
    const [Phone, setPhone] = React.useState('');
    const [Infm, setInfm] = React.useState({btn:"修改",state:true,color:"error"});
    const [value, setValue] = React.useState("");
    const [name, setName] = React.useState('');
    const [appearAddress, setAAddress] = React.useState("");
    const [address, setAddress] = React.useState('');
    const [county, setCounty] = React.useState("");
    
    //hooks
    const {bill, total, currentBillId, userData, stores} = useWebsite();
    const {ConfirmBill, GetStores} = useBackend();
    const navigate = useNavigate();

    React.useEffect(()=>{
        console.log('use effect called.');
        setPhone(userData.phoneNumber);
        setName(userData.name);
        setValue(userData.address);
    },[])

    //function define
    const handlePackage = (event) => {
        setPackageOption(event.target.value);
    };

    const handlePayment = (event) => {
        setPaymentOption(event.target.value);
    };

    const handlePhone = (e) => {
          setPhone(e.target.value);
    };
    const handleName = (e)=> {
        setName(e.target.value);  
    }

    const handleInfmChange=()=>{
        //setModified(true);
        if(Infm.state){
            setInfm({btn:"確認",state:false,color:"success"})
        }
        else{
            setInfm({btn:"修改",state:true,color:"error"})
        }
    }

    const onHandleCheckout=()=>{
        const BillInfo = {
            billId  : currentBillId,
            package : PackageOption,
            payment : PaymentOption,
            phone   : Phone,
            receiver    : name,
            address : value,
            total   :total,
        }
        ConfirmBill(BillInfo);
        navigate("/personal/bills")
    }


    const CountyOption=["台北市","新北市","基隆市","宜蘭縣",
    "桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣",
    "南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市",
    "屏東縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣","海南諸島"
    ]

    const list=()=>{
        return(
            <Box sx={{display:"grid",gap:1.5,gridColumnStart:1,gridColumnEnd:3}}>
                <Typography variant='h5'>結帳</Typography>
                <Receipt item={bill.items||[]} />
                <Box>
                    <Typography variant='h6' sx={{display:"flex",flexDirection:"row"}}>總金額</Typography>
                    <Typography variant='body2' sx={{display:"flex",flexDirection:"row-reverse"}}>{total}</Typography>
                </Box>
                <Divider></Divider>
            </Box>
        )
    }
        
    //return
    return(
        <Card sx={{width:"100%"}}>
            <CardContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                {list()}
                <TextField
                    id="PaymentSelect"
                    select
                    margin="dense"
                    value={PaymentOption}
                    label="付款方式"
                    onChange={(e)=>{handlePayment(e)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                        <MenuItem value={"貨到付款"}>貨到付款</MenuItem>
                        <MenuItem value={"匯款"}>匯款</MenuItem>
                </TextField>
                <TextField
                    id="PackageSelect"
                    select
                    margin="dense"
                    label="包材"
                    defaultValue={PackageOption}
                    onChange={(e)=>{handlePackage(e)}}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                        <MenuItem value={"紙箱"}>紙箱</MenuItem>
                        <MenuItem value={"破壞袋"}>破壞袋</MenuItem>
                </TextField>
                <Divider sx={{gridColumnStart:1,gridColumnEnd:3}}></Divider>
                <Typography variant="body1" sx={{gridColumnStart:1}}>收件人資訊</Typography>
                <Button variant="contained" color={Infm.color} onClick={(e)=>handleInfmChange()} sx={{gridColumnStart:2}}>{Infm.btn}</Button>
                <TextField
                    required
                    id="ReceiverName"
                    margin="dense"
                    label="姓名"
                    disabled={Infm.state}
                    //defaultValue="小名"
                    onChange={(e)=>{handleName(e)}}
                    value={name}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                </TextField>
                <TextField
                    required
                    id="ReceiverPhone"
                    margin="dense"
                    label="手機"
                    disabled={Infm.state}
                    defaultValue={Phone}
                    onChange={(e)=>{handlePhone(e)}}
                    inputMode="tel"
                    value={Phone}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}
                >
                </TextField>
                <TextField
                    id="outlined-select-category"
                    select
                    required
                    margin="dense"
                    label="縣市"
                    value={county}
                    onChange={(e)=>{setCounty(e.target.value);GetStores(e.target.value)}}
                    sx={{gridColumnStart:1,gridColumnEnd:2}}
                    helperText="輸入縣市所在門市"
                    disabled={Infm.state}
                >
                    {CountyOption.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-category"
                    select
                    required
                    margin="dense"
                    label="門市"
                    value={appearAddress}
                    onChange={(e)=>{setAAddress(e.target.value);setAddress(e.target.value)}}
                    sx={{gridColumnStart:2,gridColumnEnd:3}}
                    helperText="輸入 店號/門市名稱/道路名稱 查找"
                    disabled={Infm.state}
                >
                    {stores.map((option) => (
                        <MenuItem key={option.name} value={option.id}>
                        {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <Autocomplete
                    disablePortal
                    id="ReceiverAddress"
                    margin="dense"
                    disabled={Infm.state}
                    options={["台大","師大"]}
                    //defaultValue={"小名"}
                    // options={[1,3,6,5,7]}
                    sx={{gridColumnStart:2,gridColumnEnd:3,marginTop:"7.5px"}}
                    onChange={(e, option) => setFieldValue(option)}
                    renderInput={(params) => <TextField {...params} label="門市" 
                    helperText="輸入 店號/門市名稱/道路名稱 查找" required/>}

                >
                </Autocomplete> */}
                <Button variant="contained" 
                    disabled={!Infm.state} 
                    onClick={onHandleCheckout}
                    sx={{gridColumnStart:1,gridColumnEnd:3}}>
                    結帳</Button>
            </CardContent>
        </Card>
    )

}


//export 
export default CheckPage;