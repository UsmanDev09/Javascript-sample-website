
productClickedArray =[];
let sum;
if(localStorage.getItem('productname') == null){
    console.log('usman');
    productNameArray = [];
    productPriceArray = [];
    productImageArray = [];
    productQuantityArray = [0];
    
    }else{
        productNameArray = localStorage.getItem('productname').split(',');
        productPriceArray = localStorage.getItem('productprice').split(',');
        productImageArray = localStorage.getItem('image').split(',');
        productQuantityArray = localStorage.getItem('quantity').split(',');
    }
const cart = (productName,productPrice,productImage)=>{
    console.log(localStorage.getItem('productname'));
    
    let totalItems = localStorage.getItem('cartNumber');
    if(totalItems){
        localStorage.setItem('cartNumber',++totalItems);
    }else{
        localStorage.setItem('cartNumber',1);   
        totalItems = 1;
    }
    
    productNameArray.push(productName);
    productPriceArray.push(productPrice);
    productImageArray.push(productImage);
    localStorage.setItem('image',productImageArray.join(','));
    localStorage.setItem('productname',productNameArray.join(','));
    localStorage.setItem('productprice',productPriceArray.join(','));
    return totalItems;
}

const quantityCart = (productQuantity,index) =>{
    if(localStorage.getItem('quantity') == null){
        productQuantityArray = [0];
    }else{
        productQuantityArray = localStorage.getItem('quantity').split(',');
    }
    productQuantityArray[index] = productQuantity;
    localStorage.setItem('quantity',productQuantityArray.join(','));
    return productQuantity;
}
const onloadCart = () => {
    let totalItems = localStorage.getItem('cartNumber');
    let productNameString = localStorage.getItem('productname');
    let productPriceString = localStorage.getItem('productprice');
    let productQuantityString = localStorage.getItem('quantity');
   if(productNameString && productPriceString && productQuantityString){
        productNameString = productNameString.split(',');
        productPriceString = productPriceString.split(',');
        productQuantityString =  productQuantityString.split(',');
        for(let y=0;y<productNameString.length;y++){
            const paraName= document.createElement('p');
            const paraPrice = document.createElement('p');
            const paraQuantity = document.createElement('p');
            
            paraName.innerHTML = productNameString[y];
            paraPrice.innerHTML = productPriceString[y];
            paraQuantity.innerHTML = productQuantityString[y];
            document.querySelector('.details').firstElementChild.appendChild(paraName) ; 
            document.querySelector('.details').firstElementChild.nextElementSibling.appendChild(paraPrice) ;
            console.log(y,document.querySelector('.details').lastElementChild.childNodes[y]);
            
                document.querySelector('.details').lastElementChild.appendChild(paraQuantity)
            
        }
}

if(totalItems)
    document.querySelector('.productnumber').innerHTML =`(${totalItems})`;
else
    document.querySelector('.productnumber').innerHTML =`(0)`;
}

let productsInformationArray = [];
let  information = document.querySelectorAll('.information');
let select = document.querySelectorAll('.select');
for(let i =0;i<information.length;i++){
        productsInformationArray.push({
            image : window.getComputedStyle(select[i]).backgroundImage.slice(4, -1).replace(/"/g, ""),
            name: information[i].firstElementChild.innerHTML,
            price: information[i].lastElementChild.innerHTML,
            quantity: 0
    });    
}
onloadCart();
const addtoCart = document.querySelectorAll('.add-cart');


for(let j=0;j<addtoCart.length;j++){
addtoCart[j].addEventListener("click",function(){
    if(localStorage.getItem('clicked') != null){
        productClickedArray = localStorage.getItem('clicked').split(',');
    }
        if(productClickedArray[j] != "wasClicked"){
            productClickedArray[j] = 'wasClicked';
            localStorage.setItem('clicked',productClickedArray.join(','));
            addtoCart[j].classList.add('wasClicked');
            const pname = document.createElement('p');
            const pprice = document.createElement('p');
            const pquantity = document.createElement('p');
            let cartItems = cart(productsInformationArray[j].name,productsInformationArray[j].price,productsInformationArray[j].image);
            pname.innerHTML = productsInformationArray[j].name ;
            pprice.innerHTML = productsInformationArray[j].price;
            pquantity.innerHTML = ++productsInformationArray[j].quantity;
            findIndex = productNameArray.findIndex(function(names){
                return  `${productsInformationArray[j].name}` === names });
                quantityCart(productsInformationArray[j].quantity,findIndex);
            document.querySelector('.details').firstElementChild.appendChild(pname) ; 
            document.querySelector('.details').firstElementChild.nextElementSibling.appendChild(pprice);
            console.log(document.querySelector('.details').firstElementChild.nextElementSibling.nextElementSibling);
            document.querySelector('.details').lastElementChild.appendChild(pquantity);
        }else{
           
            findIndex = productNameArray.findIndex(function(names){
                return  `${productsInformationArray[j].name}` === names });
                quantityCart(++productsInformationArray[j].quantity,findIndex);
            if(document.querySelector('.details').lastElementChild.childNodes[findIndex+1]){
                document.querySelector('.details').lastElementChild.childNodes[findIndex+1].innerHTML = productsInformationArray[j].quantity;
            }
        }
        
       sum = localStorage.getItem('cartNumer');
        document.querySelector('.productnumber').innerHTML =`(${sum})`;

    
       
})
}

const body = document.querySelector('body');
const lerp = (current,previous,ease) => (current*(1-ease) +  ease*previous);
let docScroll = window.pageYOffset;
const getPageYScroll = () => 
{
    docScroll = window.pageYOffset; 
}
window.addEventListener('scroll', getPageYScroll);

class SmoothScroll {

   
 constructor(){
    this.DOM = {main: document.querySelector('main')};
    this.DOM.scrollingElement = this.DOM.main.querySelector('div[data-scroll]');
    this.scrollingProperties = {
         translationY : {
            previous : 0,
            current : 0,
            ease : 0.1,
            setValue : () => docScroll
 }
};
this.setBodySize();
 this.initialiseScrollingProperties();
 this.styleMain();

 this.translateScrollingElement();
 this.render();
    this.initEvents();
}
initialiseScrollingProperties(){
    for (const key in this.scrollingProperties ) {
        this.scrollingProperties[key].current = this.scrollingProperties[key].previous = this.scrollingProperties[key].setValue();
      console.log(this.scrollingProperties[key].setValue());
     
    }  
    this.translateScrollingElement();
}
 styleMain() {
    this.DOM.main.style.position = 'fixed';
    this.DOM.main.style.overflow = 'hidden';
    this.DOM.main.style.width = '100%';
}
translateScrollingElement(){
    this.DOM.scrollingElement.style.transform = 'translateY('+ (-1*this.scrollingProperties.translationY.previous) +'px)';
}
// to bring scrollbar back 
setBodySize(){
   
    body.style.height = this.DOM.scrollingElement.scrollHeight + 'px';
}
initEvents() {
    window.addEventListener('resize', () => this.setBodySize());
}
render(){
 
    for (const key in this.scrollingProperties) {
        this.scrollingProperties[key].current = this.scrollingProperties[key].setValue();
       
        this.scrollingProperties[key].previous = lerp(this.scrollingProperties[key].previous,this.scrollingProperties[key].current,this.scrollingProperties[key].ease);
    }
    this.translateScrollingElement();
    requestAnimationFrame(() => this.render());
}
}

new SmoothScroll();