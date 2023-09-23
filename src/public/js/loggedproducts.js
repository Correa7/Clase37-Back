
const existingCart = document.querySelector(".userCart");

const API_URL = "http://localhost:8080/api/cart"  
 
async function addProductToCart(id){
    const url = API_URL + `/${existingCart?.id}/product/${id}`
    console.log(url)
    const data = {}
    if(existingCart){
    const options = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
    .then((response)=> response.json())
    .then(()=>{
        alert('Product added successfully')
    })
    .catch((error)=>{
        console.error("Error:", error)
    })
}else{
    alert('Login first to be  to add products to the cart')
    }


}

