
empService= new employeeService();
validateFields =new validate();


$(document).on( "pagebeforeshow","#empTreeViewPage", function( event ){ 
	//alert("Home Page");
	empService.showEmployeeListView();
	
});

$(document).on( "pagebeforeshow","#empListViewPage", function( event ){ 
	//alert("Home Page");
	empService.showEmployeeListView();
	
});

$(document).on( "pagebeforeshow","#controlhomePage", function( event ){ 
	//alert("Home Page");
	empService.homePageLoad();
	
});


$(document).on( "pagebeforeshow","#empRecordViewEditPage", function( event ){ 
	//alert("Home Page");
	//alert($(this).attr('data-empBtnName'));
	
	//alert(localStorage.getItem(constantVal.editEmpItem));
	empService.editEmployeeDetails(localStorage.getItem(constantVal.editEmpItem));

});



$(document).on( "pagebeforeshow","#empTableViewPage", function( event ){ 
	//alert("changed Page");
	empService.showEmployeeTable('empViewTable');

});

$(document).on("click","#addEmployee",function(){

		validateFields =new validate();
		//validateFields.textValidate("employeeName",message.validName) &&
		var count=0;
		
		if(validateFields.textValidate("employeeName",message.validName))
			count++;
		if(validateFields.textValidate("employeeDesignation",message.validDeisgnation)){
			
			
			var desig = $('#employeeDesignation').val();
			
			if (desig!=='CEO' || desig!=='ceo' || desig!=='cEo' || desig!=='cEO' || desig!=='Ceo' || desig!=='CeO' || desig!=='CEo'  ){
			
				count++;
			}
			
		}
		 if( validateFields.selectValidate("selectManager",message.validManager) )
		{
			count++;
		}
		
		
		
		
		
		if(count==3)
		{
			//alert("all good");
			empService.addEmployee($('#employeeName').val(),$('#employeeDesignation').val(),$('#selectManager').val());
			//$.mobile.changePage("#controlhomePage");
			empService.homePageLoad();
		}
		else{
			//alert("not good " + count );
			
		}
});

$(document).on("click",".empTableView",function(){
	//alert("changing Page");
	$.mobile.changePage("#empTableViewPage");
	
	
});


$(document).on("click",".empHome",function(){
	
	$.mobile.changePage("#controlhomePage");
	
	
});

/*
$(".empHome").on("click",function(){
	
	$.mobile.changePage("#controlhomePage");
	
	
});
*/


$(document).on("click",".empTreeView",function(){
	//alert("tree");
	constantVal.flagTreeStatus = true;
	$.mobile.changePage("#empTreeViewPage");
	
	//$("#organisation").orgChart({container: $("#main")});
	
	

	
});
$(document).on("click",".empListView",function(){
	
	$.mobile.changePage("#empListViewPage");
	
	

	
});

$(document).on("click",".deleteTable",function(){
	
	
	empService.deleteEmployeeTable();
	
	
});

$(document).on("click",".editRecordButton",function(){
	

	//alert($(this).attr('data-empBtnName'));
	
	localStorage.setItem(constantVal.editEmpItem, $(this).attr('data-empBtnName'));
	
	
	$.mobile.changePage("#empRecordViewEditPage");

	
	
	
});

$(document).on("click","#updateEmpRecordBtn",function(){
	
		//alert("Edit");
	validateFields =new validate();
		//validateFields.textValidate("employeeName",message.validName) &&
		var count=0;
		
		if(validateFields.textValidate("empRecordViewEditPageEmployeeName",message.validName)){
			
			
			count++;
			
			
		}
		if(validateFields.textValidate("empRecordViewEditPageEmployeeDesignation",message.validDeisgnation)){
			
			
			var desig = $('#employeeDesignation').val();
			
			if (desig!=='CEO' || desig!=='ceo' || desig!=='cEo' || desig!=='cEO' || desig!=='Ceo' || desig!=='CeO' || desig!=='CEo'  ){
			
				count++;
			}
			
		}
		 if( validateFields.selectValidate("empRecordViewEditPageSelectManager",message.validManager) )
		{
			count++;
		}
		
		
		
		if(count==3)
		{
			//alert("all Edit good");
			//empService.addEmployee($('#employeeName').val(),$('#employeeDesignation').val(),$('#selectManager').val());
			//$.mobile.changePage("#controlhomePage");
			//empService.homePageLoad();
			empService.updateEmpRecord ($('#empRecordViewEditPageEmployeeName').val(), $('#empRecordViewEditPageEmployeeDesignation').val(), $('#empRecordViewEditPageSelectManager').val(), $(this).attr("data-empName"));
			//alert($(this).attr("data-empName"));
			
			
			
		}
		else{
			//alert("not good " + count );
			
		}
	
	
	
});




