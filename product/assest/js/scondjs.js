const container_fan=document.querySelector(".card_pro");
const sidebar=document.querySelector(".slider_pro");
const search=document.querySelector('.product-search-form');
const btn_search=document.querySelector('.search_pro');
const sideBar=document.querySelector(".single-show");
const singleShowContent = document.querySelector(".show-content");
const sideBarCloseBtn = document.querySelector(".close-btn");


const cart = JSON.parse(localStorage.getItem('cart')) || [];
const url_api="http://localhost:3000/product";

async function get_data(){
    let resp=await fetch(`${url_api}`);
    let data=await resp.json();
   
    display_Fans(data); 
}
async function getSingleShowData(id) {
    const res = await fetch(`http://localhost:3000/product/${id}`);
    const data = await res.json();
    renderSingleShow(data);
  }
  get_data();
function display_Fans(data){ 
    let temp="";
    data.forEach(data => {
        temp+=`
        <div data-id="${data.id}" class="info_cooler   m-3 mt-5 mb-5 h-auto">
            <div class="cooler_img  ">
                <img  src="./assest/image/${data.photo}" alt="photo">
            </div>
            <div class="info-cooler-water">
                <h3>${data.title} </h3>
                <h4><span> price:</span>$${data.price}.</h4>
                <p class="">${data.decs}</p>
                <button href="#" class="btn btn-primary w-100 " >Add to cart</button>
            </div> 
        </div>`
});
container_fan.innerHTML=temp;
addEvents()
}
function addEvents() {
    const cards = document.querySelectorAll(".info_cooler ");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        sideBar.classList.add("active");
        getSingleShowData(card.dataset.id);
      });
    });
  }

  function renderSingleShow(data) {
  
  
    
  
    singleShowContent.innerHTML = `
    <div class="cooler_img_show ">
        <img class="w-100 h-100" src="./assest/image/${data.photo}" alt="photo">
    </div>
    <div class="info-cooler-water_show w-100">
        <h3>${data.title}</h3>
        <h4><span> price:</span>$${data.price}.</h4>
        <p class="">${data.decs}</p>
          <button href="#" class="btn btn-primary w-100 add-to-cart" >Add to cart</button>
        
    </div> 

    `;
  }
  sideBarCloseBtn.addEventListener("click", () => {
    sideBar.classList.remove("active");
  });

search.addEventListener('submit',(e)=>{
    e.preventDefault();
    search_pro(btn_search.value)
});
async function search_pro(value){
    let res=await fetch(`http://localhost:3000/product?q=${value}`);
    let data=await res.json();
    display_Fans(data);
}
