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

document.getElementById("char").addEventListener("submit", function (e) {
    e.preventDefault();
   
    const text = getData(e.target)
    if (text != ""){
        const test = document.createElement("div");
        const text2 = document.createElement("p");
        const butt = document.createElement("button");
        test.classList.add("object");
        text2.classList.add("name");
        butt.classList.add("remove");
        text2.textContent = makeCap(text);
        butt.textContent = "remove";
        test.appendChild(text2);
        test.appendChild(butt);
        document.getElementById("body").append(test);
    }
});