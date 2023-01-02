//react import 
import Box from "@mui/material/Box";
import {Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Typography, List, Button, Dialog } from "@mui/material";
import {useState} from "react";
import SortDialog from "../SortDialog";
import ChangeAddress from "../ChangeAddress";

//mui import 

//component import 
import Receipt from "./Receipt";
import TimeLine from "./TimeLine";

//import hooks

//functional component
const Bill = ({item, id}) => {
    //set state
    const [openCard, setOpenCard] = useState(false);
    const [Submit,setSubmit] = useState(false);
    const [ChangeAddressOpen,setChangeAddressOpen]=useState(false);
    //fetch backend data
   

    //function define

    //const define


    //return 
    return(
        <Card sx={{
            justifyContent:"center",
        }}>
            <CardContent sx={{
                display: "grid",
                gap: 1.5
            }}>
            <Typography variant="h6" component="div">
                訂單編號：{item.billId}
            </Typography>
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
                            gridTemplateColumns: "1fr 1fr 1fr"
                            }}>
                            地址：{item.address}
                            {(item.product_type&&item.status <= 3&&(!Submit))? <Button variant="outlined" size="small" align="right" onClick={()=>{setOpenCard(true)}}>參與配卡</Button>:<Button disabled variant="outlined" size="small" align="right">參與配卡</Button>}
                            {(item.status <= 3)? <Button variant="outlined" size="small" align="right" onClick={()=>{setChangeAddressOpen(true)}}>地址修改</Button>:<Button disabled variant="outlined" size="small" align="right">地址修改</Button>}
                        </Typography>
                        <Dialog
                            open={openCard}
                            fullWidth={true}
                            sx={{display:"grid"}}
                        >
                        <SortDialog item={item.items}/>
                            <Button variant="contained" color="success" onClick={()=>{setSubmit(true);setOpenCard(false)}}>提交</Button>
                        </Dialog>
                        <Dialog
                            open={ChangeAddressOpen}
                            fullWidth={true}
                            sx={{display:"grid"}}
                        >
                        <ChangeAddress/>
                        <Button variant="contained" color="success" onClick={(e)=>{setChangeAddressOpen(false)}}>確認</Button>
                        </Dialog>
                    </Box>
                </Box>
            </Box>
            </CardContent>
        </Card>
    )
}

//export 
export default Bill;