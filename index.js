let myLeads = []
const inputEl = document.getElementById("input-el");
const inputbtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabTbn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
inputbtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
});
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function render(lead) {
    let listItem = "";
    for (let i = 0; i < lead.length; i++) {
        listItem += `<li>
        <a target="_blank" href="${lead[i]}">
        ${lead[i]}
        </a>
        </li>`
    }
    ulEl.innerHTML = listItem;
}

tabTbn.addEventListener("click", function(){
   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})