import React from 'react'
import {Card, Typography, Box} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {CardContent} from '@mui/material';

export default function ChangeAddress() {

    const [Phone, setPhone] = React.useState('');
    const [Value, setValue] = React.useState("");
    const [Name, setName] = React.useState("");

    const CountyOption=["台北市","新北市","基隆市","宜蘭縣",
    "桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣",
    "南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市",
    "屏東縣","花蓮縣","台東縣","澎湖縣","金門縣","連江縣","海南諸島"
    ]

  const list = () => {
    return(
        <CardContent sx={{
            display: "grid",
            gap: 1.5
        }}>
            <Typography variant="body1" sx={{gridColumnStart:1}}>收件人資訊</Typography>
            <Autocomplete
            disablePortal
            id="COUNTY"
            margin='dense'
            options={CountyOption}
            sx={{gridColumnStart:1,gridColumnEnd:2}}
            renderInput={(params) => <TextField {...params} label="台灣縣市" 
            helperText="輸入門市所在縣市"/>}
            >
            </Autocomplete>
            <Autocomplete
                disablePortal
                id="ReceiverAddress"
                margin="dense"
                options={["台大","師大"]}
                //defaultValue={"小名"}
                sx={{gridColumnStart:2,gridColumnEnd:3}}
                onChange={(e, option) => setValue(option)}
                renderInput={(params) => <TextField {...params} label="門市" 
                helperText="輸入 店號/門市名稱/道路名稱 查找"/>}
            >
            </Autocomplete>
            <TextField
                id="ReceiverName"
                margin="dense"
                label="姓名"
                onChange={(e)=>{setName(e)}}
                sx={{gridColumnStart:1,gridColumnEnd:3}}
            >
            </TextField>
            <TextField
                id="ReceiverPhone"
                margin="dense"
                label="手機"
                onChange={(e)=>{setPhone(e)}}
                inputMode="tel"
                sx={{gridColumnStart:1,gridColumnEnd:3}}
            >
            </TextField>
        </CardContent>
    )};

  return (
    <Box sx={{width:"100%"}}>
        {list()}
    </Box>
  );
}