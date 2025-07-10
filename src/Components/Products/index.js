import { useEffect, useState } from "react"
import { getAllProducts,getProductsByCategory,addToCart } from "../../API"
import { Card, List,Image, Typography, Badge, Rate, Button, message, Select } from "antd";
import { useParams } from "react-router-dom";

function Products(){
    const param = useParams()
    const [items,setItems]=useState([])
    const[sortOrder,setSortOrder]=useState('az')
    useEffect(()=>{
       (param ?.categoryId ? getProductsByCategory(param.categoryId)
         : getAllProducts()).then(res=>{
        setItems(res.products);
        });
    },[param]);

    const getSortedItems=()=>{
        const sortedItems=[...items]
        sortedItems.sort((a,b)=>{
            if(sortOrder === 'az'){
                return a.title > b.title ? 1:  a.title === b.title ? 0:-1
            }
            else if(sortOrder === 'za'){
                return a.title < b.title ? 1:  a.title === b.title ? 0:-1
            }
            else if(sortOrder === 'lowHigh'){
                return a.price > b.price ? 1:  a.price === b.price ? 0:-1
            }
            else if(sortOrder === 'highLow'){
                return a.price < b.price ? 1:  a.price === b.price ? 0:-1
            }
        })
        return sortedItems;
    }

    return( 
    <div className="ProductsContainer">
        <div>
            <Typography.Text>View Items Sorted By:</Typography.Text>
            <Select 
            onChange={(value)=>{
                setSortOrder(value)
            }}
            defaultValue={"az"}
            options={[{
                label:"Alphabetically a-z",
                value:'az'
            },
            {
                label:"Alphabetically z-a",
                value:'za'
            },
            {
                label:"Price Low to High",
                value:'lowHight'
            },
            {
                label:"Price High to Low  ",
                value:'highLow'
            },
            ]}></Select>
        </div>
        <List 
        grid={{column:3}}
        renderItem={(product,index)=>{
            return(
                <Badge.Ribbon
                className="itemCardBadge"
                text={product.discountPercentage}
                color="pink"
                >
            <Card 
            className="itemCard"
            title={product.title}
             key={index}  
            cover={<Image className="itemCardImage" src={product.thumbnail}></Image>}
              actions={[
              <Rate allowHalf disabled value={product.rating}/>,
            <AddToCartButton item={product}/>
        ]}
              >
                    <Card.Meta title={
                        <Typography.Paragraph>
                            Price:${product.price}
                            <Typography.Text  delete type="danger">
                            ${parseFloat(
                                 product.price + 
                                 product.price*product.discountPercentage/100
                                 ).toFixed(2)}
                            </Typography.Text>
                            </Typography.Paragraph>
                        }
                        description={<Typography.Paragraph ellipsis={{rows:2,expandable:true,symbol:'more'}}>{product.description}</Typography.Paragraph>}
                        >
                    </Card.Meta>
                </Card>
                </Badge.Ribbon>
            );
        }} 
        dataSource={getSortedItems()}
        ></List>
         </div>
         );
}

function AddToCartButton({item}) { 
    const addProductToCart=()=>{
        addToCart(item.id).then(res=>{
          message.success(`${item.title} has been added Cart!`)
        })
    }
    return <Button type="link" onClick={()=>{
        addProductToCart()
    }}
    >Add to Cart</Button>;
}

export default Products;