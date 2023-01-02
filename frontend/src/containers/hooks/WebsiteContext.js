import { useContext, createContext, useState, useEffect } from 'react'
import client from './wsConnect'

const WebsiteContext = createContext({
    status:     {},
    isManager:  false,
    userLineId: "",
    userData:   {}, 
    userBill:   [],
    bill:       {},
    shopping:   false,
    total:      0,
    currentBillId: "",
    categories: [],
    deadlines:  [],
    products:   [],
    checkManager: {},
    iflog: false,
    setIflog: {},
    stores: []
})

const Managers =[
    {
        name: "Yishin",
        id: "B10901121"
    },
    {
        name: "Cs",
        id: "B10901099"
    }, 
    {
        name: "LZT",
        id: "B10901111"
    }

]

const WebsiteProvider = (props) => {
    const [status, setStatus]           = useState({});
    const [isManager, setIsManager]     = useState(false);
    const [userLineId, setuserLineId]   = useState("ming"); //default: ming
    const [userData, setUserData]       = useState({});
    const [userBill, setUserBill]       = useState([]);
    const [shopping, setShopping]       = useState(false);
    const [bill, setBill]                 = useState({});
    const [currentBillId, setCurrentBillId] = useState("ming_2022-12-30T09:14:22.000Z");
    const [categories, setCategories]       = useState([]);
    const [deadlines, setDeadlines]         = useState([]);
    const [products, setProducts]           = useState([]);
    const [total, setTotal]                 = useState(0);
    const [iflog, setIflog]                 = useState(false);
    const [stores, setStores]               = useState([]);

    const checkManager = (input_name, id) => {
        const getName = Managers.find(({name})=>(name===input_name));
        if(!getName){
           return false
        }
        if(getName.id === id){
            setIsManager(true);
            return true
        }
        else{
            return false
        }

    }

    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task){
            case "init":{
                setuserLineId(payload.lineId);
                break;
            }
            case "status":{
                setStatus(payload);
                break;
            }
            case "userData":{
                setUserData(payload);
                break;
            }
            case "userBill":{
                setUserBill(payload);
                console.log('user bill fetched',)
                break;
            }
            case "bill":{
                setBill(payload);
                break;
            }
            case 'billId':{
                setCurrentBillId(payload);
                break;
            }
            case "categories":{
                setCategories(payload);
                console.log('catagories set to:',payload);
                break;
            }
            case "products":{
                setProducts(payload);
                break;
            }
            case "deadlines":{
                setDeadlines(payload);
                console.log('deadlines set to',payload);
                break;
            }
            case "userAvaliable":{
                setIflog(payload);
                break;
            }
            case "GotStores": {
                setStores(payload);
                break;
            }
            default : break;
        }
    }

    return (
        <WebsiteContext.Provider
            value={{
                status, userLineId, userData,  
                userBill, shopping, setShopping, currentBillId, 
                setCurrentBillId ,categories, products, bill, total, setTotal
                ,deadlines,checkManager, isManager, iflog, setIflog, stores
            }}
            {...props}
        />
    );
};

const useWebsite = ()=>useContext(WebsiteContext);
export { WebsiteProvider, useWebsite }