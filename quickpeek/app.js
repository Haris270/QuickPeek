
// Wait for the DOM to load before adding event listeners or focusing elements
document.addEventListener("DOMContentLoaded", function () {
    // Focus on the textarea when the popup is opened
    const textBoxElement = document.getElementById("user-input");
    if (textBoxElement) {
        textBoxElement.focus();
    }

    // Add event listener for the form submission
    document.getElementById("myForm").addEventListener("submit", main);
});
//document.getElementById("myForm").addEventListener("submit", main);  //event-listener for the submit button

//the main function - runs when "Submit" button is pressed

async function main(e)
{
    e.preventDefault();
    const userInput = document.getElementById("user-input").value;                                   //Get user input from the Text-Box
    const responseElement = document.getElementById("response")              //the element to display the response

    //Validate User Input
    if (!validateInput(userInput)){
        responseElement.innerHTML = "Please Enter Something." 
        responseElement.style.display = "block";
        return;
    }
    
    //Show a Loading message while the API processes
    responseElement.innerHTML = "Loading...";
    responseElement.style.display = "block";
  
    //call startSession() to create session with Prompt API
    responseElement.innerHTML =  await startSession("Tell me very briefly: " + userInput);  

    return;

}

//Check if User Input is an Empty String
function validateInput(input)
{
    return input && (input.trim() !== "");
}


async function startSession(userInput) 
{
    
    try
    {
        //check availability of the Model
        const {available} = await ai.assistant.capabilities();
        if (available === "readily")
            {
                const session = await ai.assistant.create();  //create a session with Prompt API
                const result = await session.prompt(userInput);  //pass userInput to the API

                return result;
            }
        else
            return "AI Assistant not available. Please try later";
    } 

    catch(error)
    {
        console.log("An error occured while calling the Prompt API : " , error);
        return "An error occurred. Please try again."
    }
}
