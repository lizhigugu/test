//test datas for frontend testing//
import Products from "../../test datas/Products"
import Bills from "../../test datas/Bills";
//////////////////////////////////

const useBackendTest = () => {

    //--Category handling functions--//
    const AddCategory = (Category) => {
        console.log("Adding category...");
    }
    const GetProductsByCategory = (name) => {
        console.log("getting products by category "+name+" ...");
        console.log("products returned:", Products)
        return Products
    }

    //--Product handling functions--//
    const AddProductToCategory = (Category, Product) => {
        console.log("Adding product to category...");
    }

    const UpdateProduct = (ProductId, newProduct)=>{
        console.log("Updating Product...");
    }

    const GetProductById = (ProductId) =>{
        console.log("getting product by id "+ProductId)
        console.log("product fetched:",Products[ProductId])
        return Products[ProductId]
    }


    //--Bill handling functions--//
    const AddItemToBill = (item)=>{
        console.log("adding item to bill...");
    }

    //userLineId, items(list of items), packing(包裝), payment(付款方式), address(地址)
    const AddBillToUser = (userLineId, items, packing, payment, address)=>{
        console.log("Adding Bill to User...");
    }
    
    //return a list of user's bill
    const GetUserBill = (userLineId)=>{
        console.log("Getting UserBill...");
        return Bills
    }

    //return a list of bill based on input filters
    const FindBill = (filters)=>{
        console.log("Finding Bill...");
    }


    //user updates address
    const UpdateBillAddress = (userLineId, billId, newAddr)=>{
        console.log("Updating Bill Address...");
    }
   

    return {
        AddCategory, GetProductsByCategory,
        AddProductToCategory, UpdateProduct, GetProductById,
        AddItemToBill, AddBillToUser, GetUserBill, FindBill, UpdateBillAddress,
    };
};

export default useBackendTest;

//sendData(["AddUser",{name:name, address:address}]);