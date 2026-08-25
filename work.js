const objects = document.querySelectorAll('div'); 


/*
<div class="body">
    <div class="object">
        <p class="icon">⋮⋮</p>
        <p class="name">This is a test</p>
        <button class="delete">Remove</button>
    </div>
</div>
*/




function addChar() {
    const form = document.getElementById('addChar');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target); 

        const data = Object.fromEntries(formData.entries()); 

        console.log(data); 

    });
}
document.getElementById('addChar').addEventListener('submit', function(event) {
  // 1. Stop the page from reloading
  event.preventDefault(); 
  
  // 2. Gather the form data automatically
  const formData = new FormData(event.target);
  
  // 3. Convert it to a clean JavaScript object for testing
  const data = Object.fromEntries(formData.entries());
  
  // 4. Print it to the console to verify it works
  console.log("Form submitted successfully!", data);
});
