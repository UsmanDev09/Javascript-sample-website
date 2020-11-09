// for(let i=0;i<2;i++){
/* const cartWrap = document.querySelector('.cartWrap');
const cartProduct = document.querySelector('.cartProduct');
const image = document.createElement('img');
const productDescriptionPara = document.createElement('p');
const productDescription = localStorage.getItem('productname');
const imageSrc = localStorage.getItem('image');
image.src = imageSrc;
image.style.height = '150px';
image.style.width = '150px';
productDescriptionPara.innerHTML = productDescription;
cartProduct.appendChild(image);
cartProduct.appendChild(productDescriptionPara); */

// }
let total =0 ;
let totalQuantity;
const cartItems = document.querySelector('.cartItems');
const cartProduct = document.querySelector('.cartProduct');
const cartProduct0 = document.querySelector('.cartProduct0');
const image = document.querySelector('.cartProduct0 > img');
const productDescriptionPara = document.querySelector('.product-description');
const productPricePara = document.querySelector('.product-price');
const productQuantityPara = document.querySelector('.product-quantity'); 
const productTotalPara = document.querySelector('.product-total');
const productDescription = localStorage.getItem('productname').split(',');
const productPrice = localStorage.getItem('productprice').split(',');
const productQuantity = localStorage.getItem('quantity').split(',');
const imageSrc = localStorage.getItem('image').split(',');
for(let j=0;j<productDescription.length;j++){
   
    if(j!=0){
    let cln = cartProduct0.cloneNode(true);
    cln.classList = 'cartProduct0';
    cartProduct.appendChild(cln);
    }else{
        cartProduct0.style.display = 'flex';
    }
    findIndex = productDescription.findIndex(function(names){return names == `${productDescription[j]}`});
    
image.src = imageSrc[j];
productDescriptionPara.innerHTML = productDescription[j];
productPricePara.innerHTML = productPrice[j];
productQuantityPara.innerHTML = 'Quantity:' + ' ' + productQuantity[findIndex];
total = parseInt(productQuantity[findIndex]) * parseInt(productPrice[j].slice(1,4));
document.querySelector('button').classList.add(j);
productTotalPara.innerHTML = 'Total:' + ' '+ '$' + '' + total;  

}
const orderValuePara = document.querySelector('.order-value');
const discountPara = document.querySelector('.discount');
const deliveryPara = document.querySelector('.delivery');
const totalPara = document.querySelector('.totall');
orderValuePara.innerHTML =  'Order Value:' + '$' + total;
discountPara.innerHTML = 'Discount:' + ' ' + '$ 0';
deliveryPara.innerHTML = 'Delivery:' + ' ' +  'FREE';
totalQuantity = localStorage.getItem('cartNumber');
totalPara.innerHTML = 'Total:' + ' ' + '$' + (total * totalQuantity);
let remove = document.querySelectorAll('.remove');
for(let i=0;i<remove.length;i++){
    remove[i].addEventListener('click',function(){
        let itemtoberemoved = remove[i].parentElement.childNodes[3].childNodes[1].childNodes[1].innerHTML;
        let searchProductName = localStorage.getItem('productname').split(',');
        let searchProductPrice = localStorage.getItem('productprice').split(',');
        let searchProductImage = localStorage.getItem('image').split(',');
        let searchIndex = searchProductName.findIndex(function(names){
                return names === itemtoberemoved;
        })
        searchProductName.splice(searchIndex,1);
        searchProductPrice.splice(searchIndex,1);
        searchProductImage.splice(searchIndex,1);
        localStorage.setItem('productname',searchProductName.join(','));
        localStorage.setItem('productprice',searchProductPrice.join(','));
        localStorage.setItem('image',searchProductImage.join(','));
        remove[i].parentElement.remove();
        console.log(searchProductName.length);
        if(searchProductName.length === 0){
            cartProduct0.style.display = 'none';
            cartProduct.style.height = 0 + 'px';
        cartItems.style.height = 500 + 'px';
        document.querySelector('.checkout').style.height = 0 + 'px';
        totalPara.innerHTML = 'Total:' + '$0';
        deliveryPara.innerHTML = 'Delivery:' + 'FREE';
        discountPara.innerHTML = 'Discount:' + '0';
        orderValuePara.innerHTML = 'Order Value:' + '0';
        localStorage.setItem('cartNumber',0);
        // cartProduct0.style.display = 'none';
        }
    })
}

window.addEventListener('resize',function(){
    if(productDescription.length!=0){
        cartProduct.style.height = (productDescription.length * 150 + (40*productDescription.length-1)) + 40 + 'px';
        cartItems.style.height = cartProduct.style.height;
        document.querySelector('.checkout').style.height = 280 + 'px';
    }
})