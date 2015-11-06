function validate(){
	
	this.textValidate=function(textInputId,errorMessage){
		var text=$('#'+textInputId).val();
		//var textFilter=/^[A-z]+$/;
		var textFilter= /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		//alert(textFilter.test(text));
		if(!textFilter.test(text)){
			
			$('#'+textInputId).val("");
			$('#'+textInputId).attr("placeholder",errorMessage);
			return false;
		}
		else
		{
			return true;
		}
		
		
	};
	this.selectValidate = function(textInputId,errorMessage){
		//console.log("SELECT");
		var text=$('#'+textInputId).val();
		//alert("Select is " +text);
		if(text == "Select"){
			alert(errorMessage);
			return false;
		}
		else{
			
			return true;
			
		}
		
		
		
	};	
	this.validateCEOName =function(ceoName,errorMessage)
	{
			var text=ceoName
		//var textFilter=/^[A-z]+$/;
		var textFilter= /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		//alert(textFilter.test(text));
		if(!textFilter.test(text)){
			
			
			alert(errorMessage);
			return false;
		}
		else
		{
			
			return true;
		}
	
	};
}
