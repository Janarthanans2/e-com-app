export const getAllProducts=()=>{
   return fetch('https://dummyjson.com/products')
.then(res => res.json())
  }

  export const getProductsByCategory=(category)=>{
    return fetch(`https://dummyjson.com/products/category/${category}`)
    .then(res => res.json())             
  }

  export const getCart=()=>{
   return fetch('https://dummyjson.com/carts/1')
   .then(res => res.json())
  }

  export const addToProduct=()=>{
    return fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '',
        description:'',
        category:'',
        price:'',
        discountPercentage:'',
        rating:''
      })
    })
    .then(res => res.json())
    .then(console.log);
 };
 
  export const addToCart=(id)=>{
     return fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              id: id,
              quantity: 1,
            }
          ]
        })
      })
      .then(res => res.json())
  };

  
