//react import

//mui import 
import {Card, Grid, Typography, CardContent, Box, Button, IconButton} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';

//component import
import Receipt from "../PersonalComponent/Receipt";
import TimeLine from "../PersonalComponent/TimeLine";

//import hooks
import { useEffect } from 'react'; 
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//functional component
const ManageBill = ({item}) => {
    //set state

    //fetch backend data
    const {UpdateBillStatus, ConfirmBill} = useBackend();

    //function define
    const handleEdit = () => {
        console.log("handle edit")
    }

    const handleStateForward = () => {
        console.log("handle change state", item.status, item.billId);
        UpdateBillStatus('add',item.billId,item.status);
    }

    const handleStateBackward = () => {
        console.log("handle backward")
        UpdateBillStatus('minus',item.billId,item.status);
    }

    //return
    return(
        <Card sx={{
            justifyContent:"center",
        }}>
            <CardContent sx={{
                display: "grid",
                gap: 1.5
            }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h6" component="div">
                        訂單編號：{item.userLineId}
                    </Typography>
                    <Grid item>
                        <IconButton
                            onClick={()=>{handleStateBackward()}}>
                            <ArrowLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={()=>{handleStateForward()}}>
                            <ArrowRightIcon />
                        </IconButton>
                        {/* <UpdateBillForm /> */}
                        {/* <IconButton
                            onClick={()=>{handleEdit()}}>
                            <EditIcon />
                        </IconButton> */}
                    </Grid>
                </Grid>
                <Box sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 3
                }}>
                    <Box sx={{
                        display: "grid",
                        gap:1
                    }}>
                        <Box>
                            <Receipt item={item.items} />
                        </Box>
                        <Typography variant="body1" component="div">
                            總價：{item.total}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "grid",
                        gap: 1
                    }}>
                        <Box>
                            <TimeLine status={item.status} payment={item.payment} />
                        </Box>
                        <Box sx={{
                            display: "grid",
                            gap: 1,
                            width: "100%"
                        }}>
                            <Typography variant="body2" component="div">
                                付款方式：{item.payment}
                            </Typography>
                            <Typography variant="body2" component="div">
                                包裝方式：{item.package}
                            </Typography>
                            <Typography variant="body2" component="div" sx={{
                                width: "100%",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                                }}>
                                地址：{item.address}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

//export 
export default ManageBill;
