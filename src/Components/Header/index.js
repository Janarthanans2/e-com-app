import {Menu,  Typography} from "antd";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getCart } from "../../API";


function AppHeader() {

    const navigate =useNavigate()
    const onMenuClick=(item)=>{
        navigate(`/${item.key}`); 
    }
    return( 
    <div className="appHeader">
        <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal" 
        items={[
            {
            label:"Home",
            key:"",
        },
        {
            label:"Groceries",
            key:"groceries",
           
        
        },
        {
            label:"Furniture",
         key:"furniture"
     },
        {
            label:"Fragrances",
            key:"fragrances"
        },
        
        {
            label:"Beauty",
            key:"beauty",
        },
    ]}
    />
    
    <Typography.Title>Store</Typography.Title>

        </div>
     
    );
  }

  function AppCart(){
    const[cartDrawerOpen,setCartDrawerOpen]=useState(false);
    const[checkoutDrawerOpen,setCheckDrawerOpen]=useState(false);
    const[cartItems,setCartItems]=useState([]);
    useEffect(()=>{
        getCart().then(res=>{
        setCartItems(res.products)
        })
    },[])
    const onConfirmOrder=(values)=>{
        console.log({values});
        setCartDrawerOpen(false)
        setCheckDrawerOpen(false)
        message.success("you order has been placed successfully.")
    };
    return(
        <div>
            
            <Badge onClick={()=>{
                setCartDrawerOpen(true)
            }} count={5} className="shoppingCart" >
                <Button/>
            </Badge>
            <Drawer open={cartDrawerOpen} onClose={()=>{
                setCartDrawerOpen(false)
            }}
            title="Your Cart"
            contentWrapperStyle={{width:500}}
            >
                <Table 
                pagination={false}
                columns={[
                    {
                    title:'Title',
                    dataIndex:'title'
                },
                {
                    title:'Price',
                    dataIndex:'price',
                    render:(value)=>{
                        return <span>${value}</span>;
                    },
                },
                {
                    title:'Quantity',
                    dataIndex:'quantity',
                    render:(value,record)=>{
                        return <InputNumber min={0} 
                        defaultValue={value} 
                        onChange={(value)=>{
                           setCartItems((pre)=> 
                            pre.map(cart=>{
                                if(record.id === cart.id){
                                    cart.total=cart.price * value
                                }
                                return cart
                            })
                        );
                        }}></InputNumber>
                    }
                },
                {
                    title:'Total',
                    dataIndex:'total',
                    render:(value)=>{
                        return <span>${value}</span>;
                    },
                },
                ]}
                dataSource={cartItems}
                summary={(data)=>{
                 const total = data.reduce((pre,current)=>{
                    return pre+current.total
                   },0)
                    return <span>Total:{total}</span>
                }}
                />
                <Button onClick={()=>{
                    setCheckDrawerOpen(true);
                }} type="primary">Checkout your Cart</Button>
            </Drawer>
            <Drawer open={checkoutDrawerOpen} onClose={()=>{
                setCheckDrawerOpen(false);
            }}
                title="Confirm Order"
            >
                <Form onFinish={onConfirmOrder}>
                    <Form.Item rules={[{
                        required:true,
                        message:'Please enter your name'
                    }]} label='Full Name' name='full_name'>
                        <Input placeholder="Enter your full name.."/>
                    </Form.Item>
                    <Form.Item rules={[{
                        required:true,
                        message:'Please enter valid email'
                    }]}
                    label='Email' name='full_email'>
                        <Input placeholder="Enter your email.."/>
                    </Form.Item>
                    <Form.Item rules={[{
                        required:true,
                        message:'Please enter your address'
                    }]}
                    label='Address' name='full_address'>
                        <Input placeholder="Enter your full address.."/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
                    </Form.Item>
                    <Typography.Paragraph type="secondary">More methods coming soon</Typography.Paragraph>
                    <Button type="primary" htmlType="submit">Confirm Order</Button>
                </Form>
            </Drawer>
        </div> 
    )
  }

  export default AppHeader;
