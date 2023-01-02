//react import

//mui import
import {Grid, Typography, Box, Divider, List} from "@mui/material"

//component import 
import ManageBill from "./ManageBill";

//test data import 
import Bills from "../../test datas/Bills";

//hooks import
import { useEffect, useState } from 'react';
import useBackend from "../../containers/hooks/useBackend";
import { useWebsite } from "../../containers/hooks/WebsiteContext";

//functional component
const ModifyBills = () => {

    const {userBill} = useWebsite();
    const [renderBill, setRenderBill] = useState([]);

    useEffect(()=>{
        setRenderBill(userBill);
    },[])
    useEffect(()=>{
        console.log('userBill modified.',userBill);
        setRenderBill(userBill);
    },[userBill])

    return(
        <Box>
            <Box sx={{
                display: "grid",
                gap: 1
            }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" component="div">
                            訂單管理
                        </Typography>
                    </Grid> 
                </Grid>
                <Divider />
                <List sx={{
                    display: "grid",
                    gap: 1
                }}>
                    {renderBill.map((value, index)=>(
                        <ManageBill item={value} key={index} />
                    ))}
                </List>
            </Box>

        </Box>
    )
}

export default ModifyBills;