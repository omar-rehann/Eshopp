let menu = document.querySelector(".toggle");;
let links = document.querySelector(".links");
let darkmode = document.querySelector(".dark");
let shopitem = document.querySelector(".shop");
let closeaside = document.querySelector(".close");
let aside = document.querySelector(".move");
let section = document.querySelector(".box-slider");
let allbox = document.querySelectorAll(".box-slider .box");
let right = document.querySelector(".right");
let left = document.querySelector(".left");
let index = 0;
let timer;
menu.onclick = function() {
    links.classList.toggle("active");
    if (links.classList.contains("active")) {
        menu.classList.remove("fa-bars");
        menu.classList.add("fa-x")
    } else {
        menu.classList.add("fa-bars");
        menu.classList.remove("fa-x")
    }
}
shopitem.onclick = function() {
    aside.classList.toggle("active")

}
closeaside.onclick = function() {
    aside.classList.remove("active")

}

right.addEventListener("click", function() {
    index++;
    clearTimeout(timer)
    update();
});

left.addEventListener("click", function() {
    index--;
    clearTimeout(timer)
    update();
});

function update() {
    if (index > allbox.length) {
        index = 1;
    } else if (index < 1) {
        index = allbox.length;
    }
    section.style.transform = `translateX(-${(index-1)*100}%)`;
    timer = setTimeout(() => {
        index++;
        update();
    }, 1000);
}

update();
fetch("item.json").then(response => response.json())
    .then((data) => {
        let parent = document.querySelector(".content_product");
        let allcontent = '';
        allproduct = data;
        data.forEach((product) => {
            allcontent += `
               <div class="col-md-6 col-lg-3">
                    <div class="box">
                        <div class="image text-center bg-light rounded">
                            <img src="${product.img}" style="width: 137px;text-align: center;" alt="product image">
                        </div>
                        <div class="name">
                            <h4>${product.name}</h4>
                        </div>
                        <div class="price">
                            <h4>${product.price}</h4>
                        </div>
                        <div class="icon">
                            <i class="fa-solid fa-cart-shopping shop" onclick="additem(${product.id})"></i>
                        </div>
                    </div> 
                </div>
            `;
        });

        parent.innerHTML = `<div class="row m-2">${allcontent}</div>`;
    })
    .catch(() => {
        console.log("Please Try Again");
    });

var allproduct = [];
var pushproduct = [];

function additem(id) {
    let product = allproduct.find(item => item.id === id);
    if (product) {
        pushproduct.push(product);
        getitem();
    } else {
        console.log("Product not found");
    }
}

function getitem() {
    let addelement = "";
    let chooseelement = document.querySelector(".item-add");
    let num = document.querySelector(".num_product");
    let len = document.querySelector(".length");

    if (pushproduct.length > 0) {
        for (let i = 0; i < pushproduct.length; i++) {
            let itemonly = pushproduct[i];
            addelement += `
                 <div class="item">
                        <div class="image">
                            <img src="${itemonly.img}" alt="product image">
                        </div>
                        <div class="name">
                            <h5>${itemonly.name}</h5> 
                            <h5>${itemonly.price}</h5> 
                        </div>
                        <div class="delete">
                    <i class="fa-solid fa-basket-shopping remove" onclick="remove(${i.id})"></i>
                        </div>
                </div>
                `;
            num.innerHTML = 0;


        }
        chooseelement.innerHTML = addelement;
        num.innerHTML = pushproduct.length
        len.innerHTML = "Add Item In card =" + pushproduct.length


    }

}

function remove(index) {
    pushproduct.splice(index, 1);
    getitem();
}