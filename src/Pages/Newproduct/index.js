import { Button, Drawer, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { addToProduct } from "../../API";

function Newproduct() {
        const[addnewproduct,setAddnewproduct]=useState([]);

        useEffect(()=>{
            addToProduct().then(res=>{
                setAddnewproduct()
            })},[]);

            
  return (
    <div>
           <Button onClick={()=>{ setAddnewproduct(true);
                }} type="primary">New</Button>
        <Drawer open={addnewproduct} onClose={()=>{setAddnewproduct();
            }}
                title="Add New Product"
                contentWrapperStyle={{width:500}}>
                <Form >
                <Form.Item rules={[{ required:true,
                    }]} label='Title' name='Title' >
                        <Input placeholder="" /></Form.Item>
                    <Form.Item rules={[{ required:true,
                    }]} label='Description' name='Description'>
                        <Input placeholder="" /></Form.Item>
                    <Form.Item rules={[{ required:true,
                    }]} label='Category' name='Category'>
                        <Input placeholder="" /></Form.Item>
                        <Form.Item rules={[{ required:true,
                    }]} label='Price' name='Price'>
                        <Input placeholder="" /></Form.Item>
                    <Form.Item rules={[{ required:true,
                    }]} label='DiscountPercentage' name='DiscountPercentage'>
                            <Input placeholder=""/></Form.Item>
                    <Form.Item rules={[{ required:true,
                    }]} label='Rating' name='Rating'>
                            <Input placeholder="" /></Form.Item>

                    <Button type="primary" htmlType="submit"  onClick={()=>{
                        addToProduct()
                    }}>Add New</Button>
                </Form>
            </Drawer>
        </div>
    )
  }
  
export default Newproduct;

