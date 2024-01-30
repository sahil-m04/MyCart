import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://addtocartdatabase-87a0c-default-rtdb.asia-southeast1.firebasedatabase.app/"
} 
const app = initializeApp(appSettings)
const database = getDatabase(app)
const ShoppingList = ref(database, "Cart")


const inputFieldEl  = document.getElementById("input-field")
const buttonEl = document.getElementById("add-btn")
const ShoppingListEl = document.getElementById("shopping-list")

buttonEl.addEventListener("click" , function(){
    let inputvalue = inputFieldEl.value
    push (ShoppingList, inputvalue)
    console.log(`${inputvalue} added to Database`)
    EmptyField()

})
function EmptyField() {
    inputFieldEl.value = ""
}
function appendShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function(){
        let ExactLocationInDB = ref(database, `Cart/${itemID}`)
        remove(ExactLocationInDB)
    })
    ShoppingListEl.append(newEl)
}
onValue(ShoppingList, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i=0; i<itemsArray.length; i++){

            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendShoppingList(currentItem)
    }
    }
    else {
        ShoppingListEl.innerHTML = "No Items Yet..."
    }
    
    
})

function clearShoppingListEl() {
    ShoppingListEl.innerHTML=""
}