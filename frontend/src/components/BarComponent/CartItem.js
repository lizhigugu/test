//react import
import { useNavigate } from 'react-router-dom';

//mui import
import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import {Card, CardContent, CardActionArea, Typography, Divider} from "@mui/material";

//test data import
import Bills from '../../test datas/Bills';

//hooks import
import { useState, useEffect } from 'react';
import useBackend from '../../containers/hooks/useBackend';
import { useWebsite } from '../../containers/hooks/WebsiteContext';

//functional component
const CartInclude = ({open ,setOpen}) => {

    //navigate define
    const navigate = useNavigate();
    
    //function define
    const handlePay = () => {
        setOpen(false);
        navigate("/check");
    }

    //fetch data
    const { GetBill, DeleteItemFromBill } = useBackend();
    const { bill, currentBillId, total, setTotal } = useWebsite();

    useEffect(()=>{
        let tot = 0;
        bill.items.map((value,index)=>(tot+=value.price*value.number))
        setTotal(tot);
    },[bill])

    const onDeleteItemFromBill= async(i)=>{
        console.log('deleting item '+i+' from bill'+currentBillId)
        DeleteItemFromBill(currentBillId, i);
    }

    return(
    <Box>
        <Box sx={{
        display:"flex",
        flexDirection:"column",
        paddingBlockEnd:"10px",
        paddingRight:"3%",
        paddingLeft:"3%",
        paddingTop: "2%"
        }}
        >
        <Box sx={{
            display: "grid",
            gap: 1
        }}>
            <Typography variant="h5" component="div">購物車明細</Typography>
            {bill.items.map((value,index)=>(
                <Card key={index}>
                <CardContent>
                    <Box sx={{
                    display: "grid",
                    gap: 1
                    }}>
                    <Box>
                        <Typography variant="h6" component="div">{value.name}</Typography>
                        <Typography variant="caption" component="div">{value.note}</Typography>
                    </Box>
                    {/* <ListItemText primary={value.name} secondary={value.note}/> */}
                    <Divider />
                    <Box sx={{
                    display: "grid",
                    }}>
                        <Typography variant="body2" component="div">選項：{value.option}</Typography>
                        <Typography variant="body2" component="div">數量：{value.number}</Typography>
                        <Typography variant="body2" component="div">金額：{value.price*value.number}</Typography>
                    </Box>
                    <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    }}>
                    <Button sx={{width:"50%",alignSelf:"flex-end"}}
                    variant="outlined"
                    color='error'
                    value={index}
                    //delete function
                    onClick={(e)=>{onDeleteItemFromBill(e.target.value)}}
                    >刪除此商品</Button>
                    </Box>
                    </Box>
                </CardContent>
                </Card>
            ))}
        </Box>
            <Typography variant="body1" component="div">總金額：{total}</Typography>
            <Button sx={{width:"50%",alignSelf:"flex-end"}}
            variant="contained"
            onClick={()=>{handlePay()}}>結帳</Button>
        </Box>
    </Box>
    )
}

//export 
export default CartInclude;