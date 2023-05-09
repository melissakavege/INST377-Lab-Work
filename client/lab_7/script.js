function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list){
    console.log('fired injectHTML')
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item) => {
        const str =
        target.innerHTML += str
    })
}

function filterList(list, query){
    return list.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery);
    })
}

function cutRestaurantList(list){
    console.log('fired cut list')
    const range = [...Array(15).keys()];
    return newArray = range.map((item) =>{
        const index = getRandomIntInclusive(0, list.length -1);
        return list[index]
    })
}

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
  
      Ask the TAs if you need help with this
    */
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterDataButton = document.querySelector('#filter');
    const localDataButton = document.querySelector('#data_load')
    const generateListButton = document.querySelector('#generate')
    const textfield = document.querySelector('#resto')
    

    const loadAnimation = document.querySelector('#data_load_animation')
    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden'); 
    // Add a querySelector that targets your filter button here
    let storedList = [];

    let currentList = []; // this is "scoped" to the main event function
    
   
      
      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    localDataButton.addEventListener('click', async (SubmitEvent) =>{
      console.log('Loading data');
      loadAnimation.style.display = 'inline-block'; 
  
      // Basic GET request - this replaces the form Action
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      storedList = await results.json();
      if (storedList.length > 0) {
        generateListButton.classList.remove('hidden')
    }

      loadAnimation.style.display = 'none';
      console.table(storedList); 
    });
      
    filterlDataButton.addEventListener('click', (event) =>{
        console.log('clicked filterButton');
        const FormData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);



        console.log(formProps);

        const newList = filterList(currentList, formProps.resto);

        console.log(newList);
        injectHTML(newListt);
    })

    generateListButton.addEventListener('click', (event) => {
        console.log('generate new list');
        currentList = cutRestaurantList(storedList)
        console.log(currentList);
        injectHTML(currentListt);
    })

    textfield.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        const newList = filterList(currentList, event.target.value)
        console.log(newList);
        injectHTML(newListt);
    })
  

}
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  