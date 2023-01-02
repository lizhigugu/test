import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BillSchema = Schema({
    userLineId: { type: String, required: true },
    billId:  { type:String },
    items:   [{ type: {name: String, price: Number, number: Number, option: String, note:String}}],
    total:   { type: Number },
    package: { type: String },
    payment: { type: String },
    address: { type: String },
    receiver: { type:String },
    phone:    { type:String },
    status:  { type: Number, default:0} 
}, {
    collection: 'Bill',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}) 

const BillModel = mongoose.model('Bill', BillSchema)

export default BillModel