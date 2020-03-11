
var accountInfo = [];

var bankApp = (function(){
	var name = "";
	var balance = 0;
	var y;
	
	function showData(){
		var dataText = "";
		for(let i = 0; i < accountInfo.length; i++){
			dataText +="Account name: "+accountInfo[i].name +" Balance: "+ accountInfo[i].balance+"\n";
		}
		document.getElementById("ouput").value = dataText;
		
	}
	
	return{
		createAccount:function(){
			name = document.getElementById("name").value;
			balance = document.getElementById("deposit").value;
			
			accountInfo.push({"name":name, "balance": balance});
			showData();
			document.getElementById("name").value="";
			document.getElementById("deposit").value="";
		}
		
	}
	
})();

document.getElementById("submitbtn").onclick = bankApp.createAccount;