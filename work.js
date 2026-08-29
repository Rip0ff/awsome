var id = 1

// Build the expiration date string:
var expiration_date = new Date();
var cookie_string = '';
expiration_date.setFullYear(expiration_date.getFullYear() + 1);
// Build the set-cookie string:
cookie_string = "test_cookies=true; path=/; expires=" + expiration_date.toUTCString();
// Create or update the cookie:
document.cookie = cookie_string;



function getData(form) {
    var formData = new FormData(form);
    var values = [];
    for (var pair of formData.entries()) {
        values.push(pair[1]);
    }
   return values
}


function makeCap(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

function orderRolls() {
    const parent = document.getElementById("body");
    const objects = parent.children;
    const elements = document.createDocumentFragment();
    
    const indices = Array.from({ length: objects.length }, (_, i) => ({
        index: i,
        roll: parseInt(objects[i].getAttribute("roll"))
    }));
    
    indices.sort((a, b) => b.roll - a.roll);
    
    indices.forEach(item => {
        elements.appendChild(objects[item.index].cloneNode(true));
    });
    
    parent.innerHTML = "";
    parent.appendChild(elements);
}

document.addEventListener("DOMContentLoaded", () => {
    const charForm = document.getElementById("char");
    const updateForm = document.getElementById("updateInit");

    charForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const text = makeCap(getData(e.target))
        if (text === "") return; // makes sure that there is something in the input field
        // creates the obects
        charForm.children[0].value = "";

        const mainItemHTML = `
            <div class="object" id="${id}" roll="0" index="0">
                <p class="name">${text}</p>
                <button class="remove-btn"">Remove</button>
            </div>
        `;
       
        const footItemHTML = `
            <div class="scroll-item" id="${id}">
                <label>${text}
                    <input name="${id}" type="number" min="-2" max="30" width="10px">
                </label>
            </div>
        `;
        // adds objects to page
        const footer = document.getElementById('foot');
        footer.insertAdjacentHTML('beforeend', footItemHTML);
        const header = document.getElementById('body');
        header.insertAdjacentHTML('beforeend', mainItemHTML);
        
        id++;
    });

    updateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const rolls = new FormData(e.target).entries();
        for (const roll of rolls) {
            
            const up = document.getElementById(roll[0]);
            up.setAttribute("roll", roll[1]);
        }
        const lay = document.getElementById("layout");
        const items = lay.children
        items.forEach(function(val){
            
        });
        console.log(items)
        orderRolls()
    });

    document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.remove-btn')) return;
        const items = document.querySelectorAll(`[id="${ev.target.parentNode.getAttribute('id')}"]`);
        items[0].remove();
        items[1].remove();
    });
});
