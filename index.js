// input
const billBlock = document.querySelector(".bill-block")
const billInput = document.querySelector("#bill-amount")
const cashBlock = document.querySelector(".cash-block")
const cashInput = document.querySelector("#cash-given")
const message = document.querySelector("#message")
const changeTable = document.querySelector(".table")
const checkBtn = document.querySelector("#checkBtn")
const errorMsg = document.querySelector("#error-message")
const numberOfNotes = document.querySelectorAll(".no-of-notes");


// available notes array
const availableNotes = [2000, 500, 100, 20, 10, 5, 1];
cashBlock.style.display = "none";
checkBtn.style.display = "none";
changeTable.style.display = "none";
billInput.addEventListener('click', function showblock(){
	cashBlock.style.display = "flex";
})
cashInput.addEventListener('click', function showblock(){
	checkBtn.style.display = "block";
})
// event listner function
checkBtn.addEventListener("click", function validateBillAndCashAmount(e) {
	e.preventDefault();
	hideMessage();
	if(Number(billInput.value) <= 0 || Number(cashInput.value) <= 0){
		showMessage("Please enter a valid amount!");
	}
	else if(Number(cashInput.value) >= Number(billInput.value)){
		showMessage(`Amount to be retrurned: ₹${cashInput.value - billInput.value}`)
		const amountToBeReturned = cashInput.value - billInput.value;
		calculateChange(amountToBeReturned);
		changeTable.style.display = "block";
	}
	else{
		changeTable.style.display = "none";
		showMessage(`Pending amount: ₹${billInput.value - cashInput.value}`);
	}
})
function showMessage(message){
	errorMsg.style.display = "block";
	errorMsg.innerText = message;
}
function hideMessage(){
	errorMsg.style.display = "none";
}

function calculateChange(amountToBeReturned){

	// loop to go over all the available notes
	for(let i = 0; i < availableNotes.length; i++){

		// no of notes needed for the denomination
		const noOfNotes = Math.trunc(amountToBeReturned / availableNotes[i])

		// update the amount to be returned
		amountToBeReturned %= availableNotes[i];

		// updating the table
		numberOfNotes[i].innerText = noOfNotes;
	}
}