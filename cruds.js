// get all inputs
var inputs = document.getElementsByTagName('input');
console.log(inputs);
var title = inputs[0];
var price = inputs[1];
var taxes = inputs[2];
var ads = inputs[3];
var discount = inputs[4];
var count = inputs[5];
var category = inputs[6];
var search = inputs[7];

// get all btn
var btns = document.getElementsByTagName('button');
console.log(btns);
var createBtn = btns[0];
var searchTitleBtn = btns[1];
var searchPriceBtn = btns[2];
var deleteAllBtn = btns[3];

// get total text
const totalNumber = document.getElementById('total');
console.log(totalNumber);

// Calc total
function calcTotal() {
    let total = (+price.value + +taxes.value + +ads.value) - ((+discount.value / 100) * (+price.value + +taxes.value + +ads.value));
    console.log(total);
    totalNumber.innerHTML = Math.ceil(total);
}

var objectsArray = localStorage.product ? JSON.parse(localStorage.product) : [];

// create products
createBtn.addEventListener("click", function() {
    calcTotal();
        var productObject = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: totalNumber.innerHTML,
            category: category.value
        };
        objectsArray.push(productObject);
    localStorage.setItem("product", JSON.stringify(objectsArray));
    clear();
    showProducts();
});

// Clear inputs after creating a product
function clear() {
    for (let i = 0; i < 7; i++) {
        inputs[i].value = '';
    }
    totalNumber.innerHTML = 'Total';
    totalNumber.style.fontWeight = 'bold';
}

// Show products
function showProducts() {
    let table = '';
    for (let i = 0; i < objectsArray.length; i++) { 
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${objectsArray[i].title}</td>
            <td>${objectsArray[i].price}</td>
            <td>${objectsArray[i].taxes}</td>
            <td>${objectsArray[i].ads}</td>
            <td>${objectsArray[i].discount}</td>
            <td>${objectsArray[i].total}</td>
            <td>${objectsArray[i].category}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="editProduct(${i})">Update</button>
                <button type="button" class="btn btn-primary" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}

// Delete one item
function deleteProduct(i) {
    console.log(i);
    objectsArray.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(objectsArray));
    showProducts();
}

// Delete all items
function deleteAll() {
    objectsArray = []; //clear array
    localStorage.removeItem('product'); //clear local storage
    showProducts();
}
deleteAllBtn.addEventListener("click", deleteAll);

// Edit a product
function editProduct(i) {
    title.value = objectsArray[i].title;
    price.value = objectsArray[i].price;
    taxes.value = objectsArray[i].taxes;
    ads.value = objectsArray[i].ads;
    discount.value = objectsArray[i].discount;
    category.value = objectsArray[i].category;
    calcTotal();
    deleteProduct(i);  // Remove the item and let user create a new one
    createBtn.innerHTML='Update Product'
}
createBtn.innerHTML='Create Product';

var searchOption; //title or Category
function searchBy(id){
    console.log(id);
    if(id == 'byTitle'){
        searchOption = 'title';
        console.log( searchOption);
        search.placeholder = 'Search By Title'; 
    }
    if(id == 'byCategory'){
        searchOption = 'category';
        console.log( searchOption);
        search.placeholder = 'Search By Category'; 
    }
};


// filter by title or price
function filterBy(value){


    // filter by tilte
    if(searchOption = 'title'){
         let table='';
        for(let i =0; i<objectsArray.length; i++){
            if(objectsArray[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${objectsArray[i].title}</td>
                    <td>${objectsArray[i].price}</td>
                    <td>${objectsArray[i].taxes}</td>
                    <td>${objectsArray[i].ads}</td>
                    <td>${objectsArray[i].discount}</td>
                    <td>${objectsArray[i].total}</td>
                    <td>${objectsArray[i].category}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="editProduct(${i})">Update</button>
                        <button type="button" class="btn btn-primary" onclick="deleteProduct(${i})">Delete</button>
                    </td>
                </tr>`;
            }
            document.getElementById('tbody').innerHTML = table;
        }
    }


    // filter by category

    if(searchOption = 'category'){
        let table='';
       for(let i =0; i<objectsArray.length; i++){
           if(objectsArray[i].category.includes(value)){
               table += `
               <tr>
                   <td>${i + 1}</td>
                   <td>${objectsArray[i].title}</td>
                   <td>${objectsArray[i].price}</td>
                   <td>${objectsArray[i].taxes}</td>
                   <td>${objectsArray[i].ads}</td>
                   <td>${objectsArray[i].discount}</td>
                   <td>${objectsArray[i].total}</td>
                   <td>${objectsArray[i].category}</td>
                   <td>
                       <button type="button" class="btn btn-primary" onclick="editProduct(${i})">Update</button>
                       <button type="button" class="btn btn-primary" onclick="deleteProduct(${i})">Delete</button>
                   </td>
               </tr>`;
           }
           document.getElementById('tbody').innerHTML = table;
       }
   }

}

showProducts();
