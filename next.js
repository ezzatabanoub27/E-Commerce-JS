let title =document.getElementById('title');
let price =document.getElementById('price');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let taxes =document.getElementById('taxes');
let total =document.getElementById('total');
let count =document.getElementById('count');
let cateogry =document.getElementById('cateogry');
let submit =document.getElementById('submit');

//console.log(title,price,ads,discound,taxes,total,count,cateogry,submit);

function gettotal() 
{
    
    if (price.value != '') 
    {
        let result =(+price.value + +taxes.value + +ads.value) - +discount.value;

        total.innerHTML = result;
        
    }
    
}









///////////// save the new product into local storage 

let productdata;

if (localStorage.product != null) {
    
    productdata =JSON.parse(localStorage.product)
}
else{
    productdata =[];

}

showData()

////////////create new product

submit.onclick =function ()
 {
   let newPro = {

    title : title.value,
    price : price.value,
    ads:ads.value,
    discount:discount.value,
    taxes :taxes.value,
    cateogry :cateogry.value,
    total:total.innerHTML,
    count:count.value,

                  }
                  if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                        productdata.push(newPro);
                        
                    }
                   
                    
                }else{
                    productdata.push(newPro);
                }
                  productdata.push(newPro);
                  localStorage.setItem("product" , JSON.stringify(productdata));

                  clearData();
                  showData() 


                  
    }
   

/////////////clear all data after create 
    function clearData(params) {
        title.value='';
        taxes.value='';
        ads.value='';
        cateogry.value='';
        discount.value='';
        price.value='';
        count.value='';
        total.innerHTML='';

        
    }


    /////////////// show data at the table 

    function showData() 
    {
        let table='';
        for (let i = 0; i < productdata.length; i++) {
            table +=`  
            
            <tr>
                <th>${i}</th>
                <th>${productdata[i].title}</th>
                <th>${productdata[i].price}</th>
                <th>${productdata[i].taxes}</th>
                <th>${productdata[i].ads}</th>
                <th>${productdata[i].discount}</th>
                <th>${productdata[i].total}</th>
                <th><button  id="update">update</button></th>
                <th><button onclick="DeleteData(${i})" id="delet">delete</button></th>




            </tr>`;
            
        }
       

        document.getElementById('tbody').innerHTML=table;
    }
    

    function DeleteData(i) 
    {
        productdata.splice(i,1);
        localStorage.product=JSON.stringify(productdata);
        showData();
    
        
    }

    let deleted=document.getElementById('deleteall');
    if(productdata.length > 0){
        deleted.innerHTML=`<button onclick="DeleteAll()">Delete All</button>`
        

    }else{
        deleted.innerHTML='';
    }


    function DeleteAll() 
    {
        productdata.splice(0);
        localStorage.clear();
        showData();
        
    }