var id = 1

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

function updateLocalSave() {
    const element = document.getElementById("foot");
    localStorage.setItem("foot", element.innerHTML);
    const element2 = document.getElementById("body");
    localStorage.setItem("body", element2.innerHTML);
    localStorage.setItem("id", id);
    
}

function clean() {
    alert("This is going to reset everything sorry!! not really :D");
    localStorage.removeItem("foot");
    localStorage.removeItem("body");
    localStorage.removeItem("id");
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    const charForm = document.getElementById("char");
    const updateForm = document.getElementById("updateInit");


    document.getElementById("foot").innerHTML = localStorage.getItem("foot");
    document.getElementById("body").innerHTML = localStorage.getItem("body");
    id =  localStorage.getItem("id");

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
        updateLocalSave();
    });

    updateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const rolls = new FormData(e.target).entries();
        for (const roll of rolls) {
            
            const up = document.getElementById(roll[0]);
            up.setAttribute("roll", roll[1]);
        }
        const foot = document.getElementById("foot");
        const items = foot.children;
        for (var item of items) {
            if (item.firstChild == null) break;
            item.children[0].children[0].value = NaN;
            
        }
        console.log(items)
        orderRolls()
    });

    document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.remove-btn')) return;
        const items = document.querySelectorAll(`[id="${ev.target.parentNode.getAttribute('id')}"]`);
        items[0].remove();
        items[1].remove();
        updateLocalSave();
    });
});
