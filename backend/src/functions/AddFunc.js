import BillModel from '../models/Bill'
import UserModel from '../models/User'
import ItemModel from '../models/Item'
import CategoryModel from '../models/Category'
import ProductModel from '../models/Product'

import { GetCategories, GetProductsByCategory } from './GetFunc'

//notice frontend 
const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    console.log('send data called in getFunc.');
}

//helper functions
const appendProduct = (category, product) => {
    CategoryModel.find({name:category}, async function(err, obj){
        if(obj.length){
            console.log('This category has already been created. good!');
            obj[0].products = [...obj[0].products,product]
            await obj[0].save();
        }
        else{
            console.log('category does not exist.');
            const model = new CategoryModel({name:category});
            model.products = [product];
            await model.save();
        }
    })
}

const AddUser = (User)=>{
    UserModel.find({lineId:User.lineId}, async function(err, obj){
        if(obj.length){
            console.log('This LineId has already registered.');
        }
        else{
            console.log('registering new user...');
            await new UserModel({
                name:       User.name,
                lineId:     User.lineId,
                address:    User.address,
                phoneNumber:User.phoneNumber,
            }).save();
        }
    })
}

const AddBillToUser = async(userLineId,ws)=>{
    console.log('adding bill to user', userLineId)
    const bill = await new BillModel({
        userLineId: userLineId,
        billId:     '',
        items:      [],
        total:      0,
        package:    '',
        payment:    '',
        address:    ''
    });
  
    const id = userLineId+"_"+JSON.stringify(bill._id.getTimestamp()).replace(/"/g, '')
    bill.billId = id
    sendData(["billId",id],ws);
    bill.save();
}

const AddCategory = async(Category,ws)=>{
    console.log(Category);
    CategoryModel.find({name:Category.cat_name}, async function(err, obj){
        if(obj.length){
            console.log('This category has already been created');
        }
        else{
            console.log('creating new category...');
            await new CategoryModel({name:Category.cat_name, deadline:Category.deadLine,products:[]}).save();
            await GetCategories(ws);
        }
    })
    
}

const AddProductToCategory = (Product,ws)=>{
    ProductModel.find({name:Product.name, category:Product.category}, async function(err, obj){
        if(obj.length){
            console.log('This product is already in the category.');
        }
        else{
            console.log('creating new product...',Product);
            await new ProductModel(Product).save();
            appendProduct(Product.category, Product.name);
            GetProductsByCategory(Product.category,ws);
        }
    })
}

const AddItemToBill = (BillId, item) => {
    console.log('adding item to bill...', item, BillId);
    BillModel.find({billId:BillId}, async function(err, obj){
        if(obj.length){
            console.log('Bill found. adding item to bill...');
            obj[0].items = [...obj[0].items, item]
            await obj[0].save();
        }
        else{
            console.log('Bill not found ;_;');
        }
    })
}

const ConfirmBill = (BillInfo, ws)=>{
    console.log('confirming bill...');
    BillModel.find({billId:BillInfo.billId}, async function(err, obj){
        if(obj.length){
            console.log('bill found :)');
            obj[0].package=BillInfo.package;
            obj[0].payment=BillInfo.payment;
            obj[0].address=BillInfo.address;
            obj[0].receiver=BillInfo.receiver;
            obj[0].phone=BillInfo.phone;
            obj[0].status=1 ;
            obj[0].total=BillInfo.total;
            await obj[0].save();
        }
        else console.log('bill not found ;_;');
    })
}

export {AddUser ,AddBillToUser, AddCategory, AddProductToCategory, AddItemToBill, ConfirmBill}