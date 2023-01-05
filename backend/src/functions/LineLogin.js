import axios from "axios";
import jwtDecode from "jwt-decode";
import { AddUser } from "./AddFunc";
import { GetUserData } from "./GetFunc";


const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    //console.log('send data called in getFunc.');
}

const loginLine = async (input, ws) => {
    console.log("in loginLine");

    const fb= async (callback)=>{
        const feedback = await axios({
            method: 'post',
            url: 'https://api.line.me/oauth2/v2.1/token',
            data: {
                grant_type: 'authorization_code',
                code: callback(),
                redirect_uri: 'https://test-production-fc86.up.railway.app/login',
                client_id: '1657771320',
                client_secret: '87e9ecd48401b88aa9feab300724ea3a'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
        let data = jwtDecode(feedback.id_token);
        return({
            name: data.name,
            lineId: data.sub
        })
    }

    console.log("in");
    AddUser(fb(input), ws);
    GetUserData(fb(input).lineId, ws)

    //console.log("feedback: ", feedback);
    // console.log("name: ", data.name);
    // console.log("sub: ", data.sub);
    // //const iflog = await GetUserData(data.sub, ws);
    // //console.log(iflog);
    // if(!iflog){
    // };

}

export { loginLine };


