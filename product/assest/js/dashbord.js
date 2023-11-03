const Product_fans=document.querySelector('.product_container');
const Add_pro=document.querySelector(".Add_pro");
const search=document.querySelector('.product-search-form');
const btn_search=document.querySelector('.search_pro');
const add_pro_btn=document.querySelector('.add_pro_btn ');
const update_pro_btn=document.querySelector('.up_pro_btn');

const url_Api=" http://localhost:3000/product";
async function get_Product_data(){
 let res=await fetch(`${url_Api}`);
 let data=await res.json();
 random_data(data);
}


get_Product_data();
addEventListener_pro();

let currmode='add';
let currproductup;

function random_data(data){
    let =temp="";
    data.forEach(element => {
        temp+=`
        <tr data-id="${element.id}" class="text-center">
            <td>${element.title}</td>
            <td>$${element.price}</td>
            <td class="w-25 h-25"><img class="w-50 h-50" src="../../assest/image/${element.photo}" alt="photo"></td>
            <td>${element.decs}</td>
            <td><button class="btn btn-primary pro_edit">Edit</button></td>
            <td><button class="btn btn-danger pro_remove">Delete</button></td>
        </tr>
        `
    });
    Product_fans.innerHTML=temp;
}

function addEventListener_pro(){
    
    Add_pro.addEventListener('submit',(e)=>{
        e.preventDefault();
        let Form_Data=Array.from(new FormData(Add_pro));
        const data={};
        Form_Data.forEach(filed=>{
            data[filed[0]]=filed[1];
        })
        if(currmode=='add'){

            addproApi(data)
        }
        else{
            EditproApi(data);
            currmode='add';
            add_pro_btn.classList.remove('d-none');
            update_pro_btn.classList.add('d-none');
        }
    }) 
    document.addEventListener('click',(e)=>{
        if (e.target.classList.contains('pro_edit')) {
            
            Edit_pro(e.target);
        }
        if (e.target.classList.contains('pro_remove')) {
            
            remove_pro(e.target)
        }
    })
    search.addEventListener('submit',(e)=>{
        e.preventDefault();
        search_pro(btn_search.value)
    })
}
async function search_pro(value){
    let res=await fetch(`${url_Api}?q=${value}`);
    let data=await res.json();
    random_data(data);
}
function addproApi(data){
    fetch(`${url_Api}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify(data)
    });
}
function remove_pro(btn) {
    const parent=btn.closest('tr');
    const id=parent.dataset.id;
    parent.remove();
    fetch(`${url_Api}/${id}`,{
    method:"DELETE"})
}

function EditproApi(data){
    fetch(`${url_Api}/${currproductup}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify(data)
    });
}

async function Edit_pro(btn){
    const parent=btn.closest('tr');
    const id=parent.dataset.id;
    const pro_opj=await get_Product_singl(id);
    let Form_Data=Array.from(new FormData(Add_pro));
    Form_Data.forEach(ele=>{
        const input=Add_pro.querySelector(`[name="${ele[0]}"]`);
        input.value=pro_opj[ele[0]];
    })
    currproductup=id;

    currmode='update';
    add_pro_btn.classList.add('d-none');
    update_pro_btn.classList.remove('d-none');

}
async function get_Product_singl(id){
    let res=await fetch(`${url_Api}/${id}`);
    let data=await res.json();
    return data;
}