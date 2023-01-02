import {Modal, Form, Input} from 'antd'
import {useState, useEffect} from 'react'

const OptionModal = ({ optionNums, open, onCreate, onCancel }) => {
    
    const dummyArray = new Array(parseInt(optionNums)).fill("");
    const [optionArray, setOptionArray] = useState();
    const [optionForm] = Form.useForm();
    const [boughtForm] = Form.useForm();

    useEffect(()=>{
        console.log(optionArray);
        onCreate(optionArray);
    },[optionArray])

    const convertArray = ()=> {
        const options = optionForm.getFieldValue();
        const boughts = boughtForm.getFieldValue();
        console.log(options,boughts,options[0]);
        setOptionArray(dummyArray.map((e,i)=>(
            {option:options[i], bought:boughts[i], sold:0, buyers:[]}
        )))
    }
    return (
        <Modal
            open={open}
            title="Create product options"
            okText="Confirm & Add product"
            cancelText="Cancel (go back & modify product)"
            onCancel={onCancel}
            onOk={() => {
                convertArray();    
            }}
        >
            <div style={{display:"flex"}}>
                <Form form={optionForm} layout="vertical"
                    name="form_in_modal">
                    {dummyArray.map((e,i)=>(
                        <Form.Item //not sure where to put form
                            name={i}
                            label={"option "+(i+1)}
                            key={i}
                            rules={[
                            {
                                required: true,
                                message: 'Error: Please enter required option!',
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                    ))}
                </Form>
                <Form form={boughtForm} layout="vertical"
                    name="form_in_modal">
                    {dummyArray.map((e,i)=>(
                        <Form.Item //not sure where to put form
                            name={i}
                            label={"Option "+(i+1)+" bought"}
                            key={i}
                            rules={[
                            {
                                required: true,
                                message: 'Please enter the amount of product you bought.',
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                    ))}
                </Form>
            </div>
        </Modal>
    );
};

export default OptionModal