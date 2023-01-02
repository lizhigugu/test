import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog'
import {Card, CardContent, CardActionArea, Typography, Divider} from "@mui/material";


//test Data
import Bills from "../test datas/Bills.js"

export default function CartList({openCart, setOpenCart}) {
  const toggleDrawer = (open) => (event) => {
    setOpenCart(open);
  };

  const [PackageOption, setPackageOption] = React.useState('');
  const [PaymentOption, setPaymentOption] = React.useState('');
  // const [Open, setOpen] = React.useState("false");

  const handlePackage = (event) => {
    setPackageOption(event.target.value);
  };

  const handlePayment = (event) => {
    setPaymentOption(event.target.value);
  };

  const list = () => {
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
        {Bills[0].items.map((value,index)=>(
            <Card>
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
                <CardActionArea sx={{
                  display: "flex",
                  alignContent: "flex-end"
                }}>
                  <Button sx={{width:"50%",alignSelf:"flex-end"}}
                  variant="outlined"
                  color='error'
                  //delete function
                  //onClick={}
                  >刪除此商品</Button>
                  {/* <Divider></Divider> */}
                </CardActionArea>
                </Box>
              </CardContent>
            </Card>
        ))}
      </Box>
        <ListItemText primary={"總金額 "+Bills[0].total} sx={{paddingBlockEnd:"10px"}}/>
        <Button sx={{width:"50%",alignSelf:"flex-end"}}
        variant="contained"
        onClick={()=>{toggleDrawer(false)}}>結帳</Button>
    </Box>
    </Box>
    )
    };

  return (
          <Dialog
            open={openCart}
            onClose={()=>{setOpenCart(false)}}
            fullWidth={true}
          >
            {list()}
          </Dialog>
  );
}
