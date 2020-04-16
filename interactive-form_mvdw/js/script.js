/******************************
 *****Treehouse Project 3*****
 *****************************/

const activityField = document.querySelector('.activities');
const activityElements = document.querySelectorAll('.activities label input');
const paymentMenu = document.querySelector('#payment');

function autoFocusName(){
    const nameInput = document.querySelector('#name');
    nameInput.focus();
}
autoFocusName();
/**Function to hide other job role text box unless other is chosen from drop down menu.
 */
function hideOtherBox(){
    const selectJob = document.querySelectorAll('#title option');
    const otherDiv = document.querySelector('#othertext');
    if (selectJob[5].selected) {
        otherDiv.style.display = "";
    } else {
        otherDiv.style.display = "none";
    }
}
hideOtherBox();

/** Function to add event listener to the drop down list of jobs. 
 * Calls hideOtherBox() function to hide or display the other textbox as selection is made.
 */
function hideOtherboxLive(){
    const selectJob = document.querySelector('#title');
    selectJob.addEventListener("change", (e)=>{
        hideOtherBox();
    });
}
hideOtherboxLive();


/**Function to hide the color selection drop down menu until a choice has been made in the theme drop down menu.
* It also functions to grey out/disable color options that cannot be chosen with the corresponding theme menu.
*event listener calls the hideColors function upon change of the theme drop down menu
*/
function hideColors(){
    const themeSelect = document.querySelectorAll('#design option');
    const select = document.querySelector('#design');
    const colorDiv = document.querySelector("#colors-js-puns");
    const colorSelect = document.querySelectorAll('#color option');
  
if (themeSelect[0].selected){
    colorDiv.style.display = "none";
} else if (themeSelect[1].selected){
    colorDiv.style.display = "";
    for(var i = 0; i<colorSelect.length; i+=1){
        if(colorSelect[i].value === 'cornflowerblue' || colorSelect[i].value === 'darkslategrey' || colorSelect[i].value === 'gold'){
            colorSelect[i].disabled = false;
        } else {
            colorSelect[i].disabled = true;
        }
    }
} else if (themeSelect[2].selected){
    colorDiv.style.display = "";
    for(var j = 0; j<colorSelect.length; j+=1){
        if(colorSelect[j].value === 'cornflowerblue' || colorSelect[j].value === 'darkslategrey' || colorSelect[j].value === 'gold'){
            colorSelect[j].disabled = true;
        } else {
            colorSelect[j].disabled = false;
        }
    }
}
 
    select.addEventListener("change", (e)=>{
    hideColors();

    });

}
hideColors();

/*Function to add up total value of checked items and return it in the label.
*/
function activitySelector() {
    let total = 0;
    let totalLabel = document.querySelector('#total-label');
   
    totalLabel.textContent = "";
    for(var i = 0; i<activityElements.length; i+=1){
        if (activityElements[i].checked){
            total += parseInt(activityElements[i].dataset.cost);
        }
    }
    totalLabel.textContent = `Total due today: $${total}`;
}

/*Function to disable and turn colour of activities conflicting with selected activity to gray. 
*/
function conflictingActivities(){
    for(var k = 0; k< activityElements.length; k+=1){
        activityElements[k].disabled = false;
        activityElements[k].parentNode.style.color = '#000';
    }
    for(var i=0; i< activityElements.length; i+=1){
        if (activityElements[i].checked){
            for(var j = 0; j<activityElements.length; j+=1){
                if(activityElements[i].dataset.dayAndTime === activityElements[j].dataset.dayAndTime){
                    activityElements[j].disabled = true;
                    activityElements[j].parentNode.style.color = 'gray';
                    activityElements[i].parentNode.style.color = '#000';
                    activityElements[i].disabled = false;
                } else {
                    activityElements[j].disabled = false;
                }
            }
        }
    }

}

/*
Eventlistener on activity checkboxes that calls the activitySelector and conflictingActivities functions
*/
activityField.addEventListener("change", (e)=>{
    activitySelector();
    conflictingActivities();
});
activitySelector();
conflictingActivities();

/**Function to validate creditcard number. 
 * Checks for empty field as well as if the number is between 13 and 16 digits long.
 * Displays error message according to validation error.
 */
function creditcVal(){
    const creditcNum = document.querySelector('#cc-num');
    const creditNumError = document.querySelector('#ccnum_val');
    if(creditcNum.value === "") {
        creditNumError.textContent = "This field cannot be empty";
    } else if (/(^\d{13}$)/.test(creditcNum.value) 
            || /(^\d{14}$)/.test(creditcNum.value)
            || /(^\d{15}$)/.test(creditcNum.value) 
            || /(^\d{16}$)/.test(creditcNum.value)) {
        creditNumError.textContent = "";
    } else {
        creditNumError.textContent = "Please enter a number between 13 and 16 digits";
    }
}

/**Function to validate zip code. 
 * Checks for empty field as well as if the code is 5 digits long.
 * Displays error message according to validation error.
 */
function zipVal(){
    const zip = document.querySelector("#zip");
    const zipError = document.querySelector('#zip_val');
    if(zip.value === ""){
    zipError.textContent = "This field cannot be empty";
    } else if (/\d{5}/.test(zip.value)) {
    zipError.textContent = "";
    } else {
    zipError.textContent = "Please enter a 5 digit zip code";
}
}

/**Function to validate cvv number. 
 * Checks for empty field as well as if the number is 3 digits long.
 * Displays error message according to validation error.
 */
function cvvVal(){
    const cvv = document.querySelector('#cvv');
    const cvvError = document.querySelector('#cvv_val');
    if(cvv.value === ""){
        cvvError.textContent = "This field cannot be empty";
    } else if (/\d{3}/.test(cvv.value)){
        cvvError.textContent = "";
    } else {
        cvvError.textContent = "Please enter a 3 digit cvv"
    }

}

/**Function to add event listeners for live feedback for credit card number, zip code and cvv.
 * Calls validation functions as applicable
 * This function is called in the paymentMethod() function below, so it is only active when credit card option is chosen.
 */
function creditcLiveVal(){
    const creditcNum = document.querySelector('#cc-num');
    creditcNum.addEventListener("input", (e)=>{
        creditcVal();
    }); 

    const zip = document.querySelector("#zip");
    zip.addEventListener("input", (e) => {
        zipVal();
    })

    const cvv = document.querySelector('#cvv');
    cvv.addEventListener("input", (e)=>{
        cvvVal();
    });
}

/**Function to hide or display payment Div according to payment method selected from menu.
 * Calls validation functions as applicable
 */
function paymentMethod(){
    const paymentOptions = document.querySelectorAll('#payment option');
    const creditcardDiv = document.querySelector('#credit-card');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');
    paymentOptions[0].autofocus = true;
    if (paymentOptions[0].selected){
        creditcardDiv.style.display = "";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "none";
        creditcLiveVal();
    } else if (paymentOptions[1].selected){
        creditcardDiv.style.display = "none";
        paypalDiv.style.display = "";
        bitcoinDiv.style.display = "none";
    } else if (paymentOptions[2].selected){
        creditcardDiv.style.display = "none";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "";
    }

    }

// Event listener for change in payment menu. Calls paymentMethod().
paymentMenu.addEventListener("change", (e)=>{
    paymentMethod();
});
paymentMethod();

/**Function to validate name. 
 * Checks for atleast one character entered.
 * Displays error message according to validation error.
 */
function nameVal(){
    const nameInput = document.querySelector('#name');
    const namevalid = /./.test(nameInput.value);
    const nameError = document.querySelector('#name_val');
    if (namevalid){
        nameError.textContent = "";
    } else {
        nameError.textContent = "Please enter your name"
    }
}

/**Function to add event listener to name input, for live validation feedback.
 */
function nameLiveVal(){
    const nameInput = document.querySelector('#name');
    nameInput.addEventListener("input", (e)=>{
    nameVal();
});
}
nameLiveVal();

/**Function to validate email. 
 * Checks for valid email format.
 * Displays error message according to validation error.
 */
function emailVal(){
    const emailInput = document.querySelector('#mail');
    const emailValid = /^[^@]+@\w+\.\w/.test(emailInput.value);
    const emailError = document.querySelector('#email_val');
    if (emailValid){
        emailError.textContent = "";
    } else {
        emailError.textContent = "Please enter a valid email address"
    }
}

/**Function to add event listener to email input for live feedback.
 */
function emailLiveVal(){
    const emailInput = document.querySelector('#mail');
    emailInput.addEventListener("input", (e)=>{
    emailVal();
});
}
emailLiveVal();


/**Function to validate if at least one activity is chosen/checked. 
 * Displays error message according to validation error.
 */
function checkBoxChecked(){
    var checkboxes = 0;
    const checkBoxval = document.querySelector('#activities_val');
    for (var i = 0; i<activityElements.length; i+=1){
       if (activityElements[i].checked) {
           checkboxes += 1;
       }

    if (checkboxes === 0) {
        checkBoxval.textContent = "Please choose at least one option";
    } else {
        checkBoxval.textContent = "";
    }
}
}

/**Function to add event listener to the activity checkbox field for live feedback on errors.
 */
function checkboxLiveVal(){
    activityField.addEventListener("change", (e)=>{
        checkBoxChecked();
    });
}
checkboxLiveVal();

/**Function to validate all information before submission.
 * For purposes of this project, if all information is valid, the button will only refresh the page.  
 */
function registerButton(){
    const registerBut = document.querySelector('#register');
    registerBut.addEventListener("click", (e)=>{
        e.preventDefault();
        const paymentOptions = document.querySelectorAll('#payment option');
        if (paymentOptions[0].selected){
            creditcVal();
            zipVal();
            cvvVal();
        } 
        paymentMethod();
        nameVal();
        emailVal();
        checkBoxChecked();
        const creditNumError = document.querySelector('#ccnum_val');
        const zipError = document.querySelector('#zip_val');
        const cvvError = document.querySelector('#cvv_val');
        const nameError = document.querySelector('#name_val');
        const emailError = document.querySelector('#email_val');
        const checkBoxval = document.querySelector('#activities_val');
        if(creditNumError.textContent === "" 
            && zipError.textContent === "" 
            && cvvError.textContent === ""
            && nameError.textContent === ""
            && emailError.textContent === ""
            && checkBoxval.textContent === ""){
                location.reload();
            } else {
                alert("Please fill in all the neccessary fields");
                window.scrollTo(500, 100);
            }
    })

}
registerButton();