// toggle menu start

const menu__bar = document.querySelector('.icon_header');
const menu__List = document.querySelector('.list_header ul');
const menu__List_li = document.querySelectorAll('.list_header ul li a');
const search=document.querySelector('.product-search-form');
const btn_search=document.querySelector('.search_pro');
menu__bar.addEventListener('click' ,function(){
    menu__List.classList.toggle ('toggle__menu__bar')
});
function handleActiveul() {
    menu__List_li.forEach((li) =>
      li.addEventListener("click", (e) => {
        removeActiveClass();
        e.target.classList.add("active");
      })
    );
  }
  handleActiveul();
function removeActiveClass(e) {
    menu__List_li .forEach((li) => {
      li.classList.remove("active");
    });
  }




const container_fan=document.querySelector(".container_fan");
const url_api="http://localhost:3000/";
async function get_data(proprty){
    // let proprty=proprty
    let resp=await fetch(`${url_api}${proprty}`);
    let data=await resp.json();
    display_water_cooler(data)
}  
get_data("product");






// ///////////////////
function display_water_cooler(data){ 
    data=data.slice(0 , 8);
    let temp="";
    data.forEach(show => {
        temp+=`
        <div class="info_cooler ">
        <div class="cooler_img">
            <img src="./assest/image/${show.photo}" alt="">
        </div>
        <div class="info-cooler-water">
            <h3>${show.title}</h3>
            <h4><span> price:</span>$${show.price}.</h4>
            <p>${show.decs}</p>
            <button id="add-cooler">Add Card</button>
        </div> 
    </div>`
});
document.querySelector("#container_cooler-water").innerHTML=temp;
}

search.addEventListener('submit',(e)=>{
  e.preventDefault();
  search_pro(btn_search.value)
});
async function search_pro(value){
let res=await fetch(`http://localhost:3000/product?q=${value}`);
let data=await res.json();
display_water_cooler(data);
}