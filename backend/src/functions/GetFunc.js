import BillModel from '../models/Bill'
import UserModel from '../models/User'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    console.log('send data called in getFunc.');
}

const GetCategories = async(ws)=>{
    const categories = await CategoryModel.aggregate([
        { $group: { _id: null, category_names: { $push: "$name" } } }])
    sendData(["categories",categories[0].category_names],ws);
    
    //send category deadlines
    const deadlines = await CategoryModel.aggregate([
        { $group: { _id: null, category_dl:{ $push:"$deadline" }}}])
    sendData(["deadlines",deadlines[0].category_dl],ws);
}

const GetProductsByCategory = async(category, ws)=>{
    let query = category==='all'? {}:{category}
    ProductModel.find(query, async function(err, obj){
        if(obj.length){
            sendData(["products",obj],ws);
        }
        else{
            sendData(["products",[]],ws);
        }
    })
    //sendData(["products",obj[0].products],ws);
}

const GetUserData = async(userLineId, ws)=>{
    UserModel.find({userLineId:userLineId}, async function(err, obj){
        if(obj.length){
            sendData(["userData",obj[0]], ws);
            sendData(["userAvaliable", true], ws);
        }
        else{
            console.log("user not found ;_;");
            sendData(["userAvaliable", false], ws);
        }
    })
}

const GetUserBill = async(userLineId, ws)=>{
    let query = userLineId==='all'? {}:{userLineId}
    BillModel.find(query, async function(err, obj){
        if(obj.length){
            console.log('in get user bill', obj);
            sendData(["userBill",obj],ws);
        }
        else{
            sendData(["userBill",[]],ws);
        }
    })
}

const GetBill = async(billId, ws)=>{
    BillModel.find({billId}, async function(err, obj){
        if(obj.length){
            sendData(["bill",obj[0]],ws);
        }
        else{
            sendData(["bill",[]],ws);
        }
    })
}

export {GetCategories, GetProductsByCategory, GetUserData, GetUserBill, GetBill}