window.onload = behaviors;
function behaviors(){
	let submitBtn = document.getElementById("submitBtn");
	submitBtn.onclick = btnClick;
	
	let cbx = document.getElementById("blingcbx");
	cbx.onchange = checkedEvent;
	
	let igpayBtn = document.getElementById("igpayBtn");
	igpayBtn.onclick = translate;
	
	let malkovichBtn = document.getElementById("malkovichBtn");
	malkovichBtn.onclick = malButtonClick;
}

let timer = null;
function btnClick(){
	if(timer === null){
		setInterval(changeFont, 500);
	}
	else{
		clearInterval(timer);
		timer = null;
	}
}

function changeFont(){
	//alert("Click me!");
	let mytext = document.getElementById("mytext");
	let size = parseInt(window.getComputedStyle(mytext, null).getPropertyValue("font-size"));
	mytext.style.fontSize = size + 2 + "pt";
}

function checkedEvent(){
	let txt = document.getElementById("mytext");
	let cbx = document.getElementById("blingcbx");
	if(cbx.checked){
		txt.style.fontWeight="bold";
		txt.style.color="green";
		txt.style.textDecoration="underline"
		document.body.style.backgroundImage="url('./images/hundred-dollar-bill.jpg')";
	}
	else{
		txt.style.fontWeight = "normal";
        txt.style.textDecoration = "";
        txt.style.color = "";
		document.body.style.backgroundImage="";
	}
	
}

function translate() {
    let mytext = document.getElementById("mytext");
    mytext.value = pigLatin(mytext.value);

}


function pigLatin(str) {
    // Convert string to lowercase
    str = str.toLowerCase();
    // Initialize array of vowels
    const vowels = ["a", "e", "i", "o", "u"];
    // Initialize vowel index to 0
    let vowelIndex = 0;

    if (vowels.includes(str[0])) {
        // If first letter is a vowel
        return str + "way";
    } else {
        // If the first letter isn't a vowel i.e is a consonant
        for (let char of str) {
            // Loop through until the first vowel is found
            if (vowels.includes(char)) {
                // Store the index at which the first vowel exists
                vowelIndex = str.indexOf(char);
                break;
            }
        }
        // Compose final string
        return str.slice(vowelIndex) + str.slice(0, vowelIndex) + "ay";
    }
}


function malButtonClick() {
    let mytext = document.getElementById("mytext");
    if(mytext.value.length >= 5){
        mytext.value = "Malkovich";

    }
}