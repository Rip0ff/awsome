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

document.addEventListener("DOMContentLoaded", () => {
    const charForm = document.getElementById("char");
    const updateForm = document.getElementById("updateInit");

    charForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const text = makeCap(getData(e.target))
        if (text === "") return; // makes sure that there is something in the input field
        // creates the obects

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
    });

    document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.remove-btn')) return;
        const items = document.querySelectorAll(`[id="${ev.target.parentNode.getAttribute('id')}"]`);
        items[0].remove();
        items[1].remove();
    });
});
