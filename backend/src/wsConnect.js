import { AddUser ,AddBillToUser, AddCategory, AddProductToCategory, AddItemToBill, ConfirmBill } from './functions/AddFunc'
import { UpdateUser, UpdateBillStatus, UpdateCategory, UpdateProduct } from './functions/UpdateFunc'
import { GetCategories, GetProductsByCategory, GetUserData, GetUserBill, GetBill } from './functions/GetFunc';
import { DeleteBill, DeleteCategory, DeleteUser, DeleteProduct, DeleteItemFromBill } from './functions/DeleteFunc'
import { getStores } from './functions/711Func';

//helper functions
const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
    console.log('send data called. (in wsConnect.js, line 5)');
}

export default {
    initData: (ws) => {
        console.log('data initialization called.')
    },
    onMessage: async (wss, ws, e) => {
        const [task, payload] = JSON.parse(e.data);
        switch (task) {
            //Add functions
            case 'AddUser':{
                AddUser(payload);
                break;
            }
            case 'AddCategory':{
                AddCategory(payload, ws);
                break;
            }
            case 'AddProductToCategory':{
                AddProductToCategory(payload,ws);
                break;
            }
            case 'AddBillToUser':{
                AddBillToUser(payload,ws);
                break;
            }
            case 'AddItemToBill':{
                const {BillId, item} = payload;
                AddItemToBill(BillId, item);
                break;
            }

            //Confirm functions
            case 'ConfirmBill':{
                ConfirmBill(payload,ws);
                GetBill(payload.billId,ws);
                break;
            }

            //Get functions
            case 'GetCategories':{
                GetCategories(ws);
                break;
            }
            case 'GetProductsByCategory':{
                GetProductsByCategory(payload,ws);
                break;
            }
            case 'GetUserData':{
                GetUserData(payload,ws);
                break;
            }
            case 'GetUserBill':{
                GetUserBill(payload,ws);
                break;
            }
            case 'GetBill':{
                GetBill(payload,ws);
                break;
            }

            //Update functions
            case 'UpdateUser':{
                UpdateUser(payload);
                break;
            }
            case 'UpdateCategory':{
                UpdateCategory(payload,ws);
                break;
            } 
            case 'UpdateProduct':{
                UpdateProduct(payload,ws);
                break;
            }
            case 'UpdateBillStatus':{
                UpdateBillStatus(payload,ws);
                GetUserBill('all',ws);
                break;
            }

            //delete functions
            case 'DeleteUser':{
                DeleteUser(payload);
                break;
            }
            case 'DeleteCategory':{
                DeleteCategory(payload,ws);
                break;
            } 
            case 'DeleteProduct':{
                DeleteProduct(payload.category,payload.name,ws);
                break;
            }
            case 'DeleteBill':{
                DeleteBill(payload.name, payload.category);
                break;
            }
            case 'DeleteItemFromBill':{
                DeleteItemFromBill(payload, ws);
                break;
            }
            case "GetStores":{
                getStores(payload,ws);
                break;
            }
        }
    }
}


