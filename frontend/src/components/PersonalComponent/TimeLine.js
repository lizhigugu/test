//react import

//mui import
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

//const define
const steps_cash=[
    "請至購物車點選結帳以確認帳單",
    "訂單處理中",
    "購買完成 or 取消訂單",
    "官方出貨中",
    "已出貨"
]

const steps_card=[
    "請至購物車點選結帳以確認帳單",
    "訂單處理中",
    "購買完成 or 取消訂單",
    "匯款已成功對帳",
    "官方出貨中",
    "已出貨"
]

//functional component
const TimeLine = ({status, payment}) => {
    //set state

    //function define

    //const define
    const steps= (payment === "刷卡")? steps_card:steps_cash


    //return
    return(
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={status} alternativeLabel>
                {steps.map((label)=>(
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

//export
export default TimeLine;