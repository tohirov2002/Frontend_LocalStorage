
const elForm = document.querySelector(".form")
const elInput = document.querySelector(".input")
const elInput1 = document.querySelector(".input1")
const elBtn = document.querySelector(".btn")
const ItemId = document.querySelector(".item")
const elLIst = document.querySelector(".list")

elForm.addEventListener("submit", function(evt) {
    elLIst.innerHTML = ""
    evt.preventDefault(); 
    
   if(ItemId.value) {
       item = JSON.parse(localStorage.getItem(ItemId.value))
       
       item.name = elInput.value
       item.price = elInput1.value
   } else{
    item = {
        name: elInput.value,
        price: elInput1.value
    }
    
    ItemId.value = Date.now()
   }

    localStorage.setItem(ItemId.value, JSON.stringify(item))
    
    elForm.reset();
    
    ItemId.value = ""

    rednderFun();
})

function rednderFun() {
    for(let key in localStorage) {
        if(localStorage.hasOwnProperty(key)){
            const Item = JSON.parse(localStorage.getItem(key))
            console.log(Item);
            let elItem = document.createElement("li") 
            let elTitle = document.createElement("span")           
            let elText = document.createElement("span")           
            let elBtn = document.createElement("button")  
            let elAdd = document.createElement("button")  
            let elInp =  document.createElement("input")
            
            elTitle.textContent = ` Name:  ${Item.name}`
            elText.textContent = ` ;Price:  $${Item.price}`
            elBtn.textContent = "Delete"
            elAdd.textContent = "add"
            elInp.type = "checkbox"
            elBtn.style.backgroundColor = "red"
            elItem.append(elBtn,elInp,elTitle,elText,elAdd)
            elLIst.appendChild(elItem)
            elAdd.style.marginLeft = "15px"
            elAdd.addEventListener("click", () => {
                elInput.value = Item.name
                elInput1.value = Item.price
                ItemId.value = key
            })
            elInp.addEventListener("click", () => {
                elTitle.classList.toggle("check-btn")
                elText.classList.toggle("check-btn")
            })
            elBtn.addEventListener("click",() => {
               localStorage.removeItem(key);
               elItem.style.display = "none"
            })
        }
    }
}
rednderFun()

