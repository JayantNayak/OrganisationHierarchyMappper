 
 var arr = [];
 var circularReferenceUtility = [];
 var tempDesignation = "";
 var tempManager = "";
 var tempName = "";
 var tempPreviousName="";
 function employeeService(){
	 
	  this.deleteEmployeeTable =function(){
		  if(window.openDatabase){
				var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				//console.log("DB created");
				userDb.transaction(function(tx){
					if(confirm("Employee Table will be deleted")){
						tx.executeSql('DROP TABLE IF  EXISTS '+constantVal.tblOrgName,[],function(tx,results){
							
							alert("Table Deleted");
							//Load home page again
					
							empService.homePageLoad();
						
					});
					}
					else{
						alert("Delete action aborted");
					}
					
				});	
						
		  }
		  else{
			  alert("Browser doesn't support webSql");
		  }
		  
	  };
	 
	 this.addEmployee =function(name,designation,manager){
		 if(window.openDatabase){
				var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				console.log("DB created");
				userDb.transaction(function(tx){
				if(tx.executeSql('CREATE TABLE IF NOT EXISTS '+constantVal.tblOrgName+'(empName TEXT PRIMARY KEY ,designation TEXT ,manager TEXT )')){
					console.log("appUser Table created");
				}
				//tx.executeSql('CREATE TABLE IF NOT EXISTS '+constantVal.tblOrgName(name TEXT PRIMARY KEY ,designation TEXT ,manager TEXT )');
			
				//insert into user entered details into appUser table,note the use of the ? placeholder,these will be replaced by data
				//passed in as array as the second parameter
				
				tx.executeSql('Insert INTO '+constantVal.tblOrgName+'(empName,designation,manager)values(?,?,?)',[name,designation,manager]);
				constantVal.databaseCreatedStatus = true;
				
				//alert("saved");
				
				//update manager list
				//empService.showMangerSelectList('#selectManager','Select');
				
				
			
				//tx.executeSql('Insert INTO appUser(email,fullname,password)values("hi.com","b",123)');

				});
			}
		else{
				alert("webSql is not supported by your browser");
				constantVal.databaseCreatedStatus = false;
			}
		 
	};
	
	this.showEmployeeTable = function( tableId){
		var tableBodyEl = document.querySelector('table#'+tableId+'>tbody');
			//Intitialise to be empty
			tableBodyEl.innerHTML="";
    
			// load all user objects
			//console.log("listing");
    
			var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				userDb.transaction(function(tx){
					tx.executeSql("SELECT * FROM  "+constantVal.tblOrgName,[],function(tx,results){
					
					for(i=0;i<results.rows.length;i++){
						row = tableBodyEl.insertRow();
						row.insertCell(-1).textContent = results.rows.item(i).empName;
						row.insertCell(-1).textContent = results.rows.item(i).designation;
						row.insertCell(-1).textContent = results.rows.item(i).manager;
						if(results.rows.item(i).designation !== "CEO")
							row.insertCell(-1).innerHTML = '<button class="ui-btn  ui-shadow ui-mini editRecordButton" data-empBtnName = "'+ results.rows.item(i).empName +'">EDIT</button>';
					
					}
				});
			
			});
			
				console.log("appUser Table created");

		
		//$("#tableId").table("refresh");
		//$('#tableId').enhanceWithin();
	};
	
	this.showMangerSelectList = function( selectId,defaultValue){
		$(selectId).empty();
		//alert($('#'+selectId).val());
		
		$(selectId).append('<option value="Select">Select</option>');
			
    
			// load all user objects
		
    
			var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				userDb.transaction(function(tx){
					tx.executeSql("SELECT empName FROM "+constantVal.tblOrgName,[],function(tx,results){
					
					for(i=0;i<results.rows.length;i++){
						
						$(selectId).append('<option value="'+results.rows.item(i).empName+'"+>'+results.rows.item(i).empName+'</option>');
						//console.log(results.rows.item(i).empName);
						
					
					}
					
					//change selection to default value
					//alert("select manager "+ defaultValue+"hi" );
					$(selectId).val(defaultValue).change();
					
					
				});
			
			
			});
			
			
	};
	 
	 this.editEmployeeDetails = function(employeeName){
		 //alert("Inside Details button " +employeeName)
		 
		 var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				userDb.transaction(function(tx){

					tx.executeSql("SELECT * FROM "+constantVal.tblOrgName+ " where empName = '"+ employeeName+"'",[],function(tx,results){
					
					
					//alert("edit details  length " + results.rows.length);
					
					$('#editNameLabel').text(results.rows.item(0).empName);
					$('#editDesignationLabel').text(results.rows.item(0).designation);
					$('#editManagerLabel').text(results.rows.item(0).manager);
					
					$('#empRecordViewEditPageEmployeeName').val(results.rows.item(0).empName);
					$('#empRecordViewEditPageEmployeeDesignation').val(results.rows.item(0).designation);
					//set data attribute of button as empName
					$('#updateEmpRecordBtn').attr("data-empName", results.rows.item(0).empName);
					
					//alert("manager " + results.rows.item(0).manager);
					
					empService.showMangerSelectList('#empRecordViewEditPageSelectManager',results.rows.item(0).manager);
						
					
				});
			
			});
		 
		return true; 
	 };
 
  
 this.homePageLoad = function(){
	 //updates the controlhomePage
	 
	$('#employeeName').val("");
	$('#employeeName').attr("placeholder","")
	$('#employeeDesignation').val("");
	$('#employeeDesignation').attr("placeholder","");
	
	
	
	if(window.openDatabase){
	var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
	
	console.log(constantVal.tblOrgName+" created");
	userDb.transaction(function(tx){
		//if(tx.executeSql('CREATE TABLE IF NOT EXISTS'+constantVal.tblOrgName+'(empName TEXT PRIMARY KEY ,designation TEXT ,manager TEXT )')){
		
		if(tx.executeSql('CREATE TABLE IF NOT EXISTS '+constantVal.tblOrgName+' (empName TEXT PRIMARY KEY ,designation TEXT ,manager TEXT )')){

		console.log(constantVal.tblOrgName+"Table created");
					
					
					
		}
		////alert("database opened");
	
		
		tx.executeSql("SELECT manager FROM  "+constantVal.tblOrgName+" where designation ='CEO'",[],function(tx,results){
			
			//alert("database record");
			//alert("length is " + results.rows.length)
			if(results.rows.length == 0){
				
				constantVal.databaseCreatedStatus = false;
				enterCEO();
				//updates the selection list just after inserting the ceo
				empService.showMangerSelectList('#selectManager','Select');
				
				
			}
			
			});
		
		});
		
	}
	else{
		alert("webSql not supported");
	}
		// updates the selection list on every load of the home page
		empService.showMangerSelectList('#selectManager','Select');			
	
	
	//$('#selectManager').val('Select').change();
	
 };
 
 this.updateEmpRecord = function(name,designation,manager,previousName){
	 //alert(name+" "+designation+"     "+manager+"     " +previousName);
	 
	 if(window.openDatabase){
				var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				////console.log("DB created");
				userDb.transaction(function(tx){
				
			
				//insert into user entered details into appUser table,note the use of the ? placeholder,these will be replaced by data
				//passed in as array as the second parameter
				tx.executeSql("SELECT empName FROM "  +constantVal.tblOrgName +" where empName=?",[name],function(tx,results){
					//alert("Length " +results.rows.length);
					//Update record if the name doesn't belong to any other existing record or the it belongs to the same record
					if(results.rows.length == 0 || name == previousName)
					{
						
						var current = manager;
						//constantVal.currentEmp=name;
						
						tx.executeSql('SELECT empName from ' +constantVal.tblOrgName+' WHERE designation = "CEO"',[],function(tx,results){
						
							//Find all the ancestors of the curent child and adds them to circularReferenceUtility and itself
							//makes use of function recursion to maintain synchronous call
						
							//root emplyee is CEO name
							constantVal.rootEmp = results.rows.item(0).empName;
							tempName = name;
							tempDesignation = designation;
							tempManager = manager;
							tempPreviousName = previousName;
							parent(current);
						
						
						});
						
					
					}
					else{
						$("#empRecordViewEditPageEmployeeName").val("");
						$("#empRecordViewEditPageEmployeeName").attr("placeholder",message.validName);
						
						alert("Employee name already present ");
						
						}
					});
				
				});
			}
		else{
				alert("webSql is not supported by your browser");
				
			}
	 
	 
	 
	 
 };
 
 this.showEmployeeListView = function( ){
		
			console.log("listing");
    
		//var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
		var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
		userDb.transaction(function(tx){
			tx.executeSql("SELECT * FROM  "+constantVal.tblOrgName,[],function(tx,results){
					
					console.log("length in list  "+results.rows.length );
					$('#organisation').empty();
					var org =  document.getElementById("organisation");
					var ulorg = document.createElement('UL');
					
					for(i=0;i<results.rows.length;i++){
						
						 var liItem = document.createElement('LI');
						 liItem.setAttribute('id',results.rows.item(i).empName);
						 liItem.innerHTML = results.rows.item(i).empName;
						 
						 var brItem = document.createElement('BR');
						liItem.appendChild(brItem);
						
						var iItem = document.createElement('I');
						//liItem.appendChild(brItem);
						
						var spanItem = document.createElement('SPAN');
						 spanItem.innerHTML = results.rows.item(i).designation;
						 iItem.appendChild(spanItem);
						 
						 liItem.appendChild(iItem);
						
						
						
						 
						 
						  var ulItem = document.createElement('UL');
						  ulItem.setAttribute('id',"ulc_"+results.rows.item(i).empName);
						  //ulItem.innerHTML = "hi";
						  liItem.appendChild(ulItem);
						  
						  ulorg.appendChild(liItem)
						  /*
						  <ul>
							<li>Mark Lee<br/><i><span class='title'>Overlord</span><i>
								<ul>
								</ul>
						
							<li>
						</ul>
						*/
						   
						  
						  
						  								
					}
					org.appendChild(ulorg);
					
					
					
					for(i=0;i<results.rows.length;i++){
						//console.log("iter "+ i)
						
						if(results.rows.item(i).designation != "CEO"){
						
							//console.log("---------------------ID----------------------");
								var childEle = document.getElementById(results.rows.item(i).empName);
						
						
						
						
						
								var newParentEle = document.getElementById("ulc_"+results.rows.item(i).manager);
						
								var childTemp = childEle.cloneNode(true);
								var parentEle = childEle.parentElement;
								
								//console.log("childs "+childEle.textContent + " ---- "+parentEle.textContent )
								//console.log("parentId -> "+parentEle.id)
								//console.log("childId -> "+childEle.id)
								//console.log("newParentId ->"+newParentEle.id)
								
								
						
								parentEle.removeChild(childEle);
								//console.log("afterParent Removed child parent ->"+childEle.parentElement.id)
								//console.log("childs "+childEle.textContent + " ---- "+parentEle.textContent )
						
								
								newParentEle.appendChild(childTemp);
								//console.log("afterParent  append child  newparenTId ->"+childTemp.parentElement.id);
								
							//console.log("-------------------------------------------");
						
						}
						
						
						
						
					}
					if(constantVal.flagTreeStatus)
					{
						//alert("working");
						$("#organisation").orgChart({container: $("#main")});
						constantVal.flagTreeStatus = false;
					}
					else{
						//alert("not working");
					}
					
					//alert("lenth of org "+ulorg.children.length);
					
						  
						
					
			});
			
		});
			
				////console.log("list created");

		
		
	};

}
 
 function enterCEO(){
	var ceoName="";
	while(!constantVal.databaseCreatedStatus){
		//alert("Inside While : valStatus " +constantVal.databaseCreatedStatus );
		if(!constantVal.databaseCreatedStatus){
			 ceoName = prompt("Enter the CEO name of company ");
		
		}
		
		if( ceoName !== null && validateFields.validateCEOName(ceoName,message.ceoNameMessage)){
			constantVal.databaseCreatedStatus = true;
			empService.addEmployee(ceoName,"CEO","");
			return;
			
		
		}
	
	}
	alert(ceoName + "Company CEO ");
}

function parent(current){
	//console.log("current "+current);
	
	//console.log("root " + constantVal.rootEmp);
	
	
	circularReferenceUtility.push(current);
	//constantVal.circularReferenceUtil.push(current);
	if(current != constantVal.rootEmp)
	{
			var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				//console.log("Ancestor Working");
				userDb.transaction(function(tx){
					
						tx.executeSql('SELECT empName, manager from ' +constantVal.tblOrgName+ ' WHERE empName = ?',[current],function(tx,results){
							
							//console.log("ancestors length "+results.rows.length);

							console.log(results.rows.item(0).empName +"  "+results.rows.item(0).manager);
							
							var current1 = results.rows.item(0).manager;
						
							
					
							parent(current1);
							
							
						
						});
				});
				
	}
	else{
		
		constantVal.circularReferenceUtil = circularReferenceUtility;
		
		if( constantVal.circularReferenceUtil.indexOf(tempName) == -1)
		{
			var userDb=openDatabase(constantVal.databaseName, constantVal.databaseVersion,message.databaseDescription, constantVal.databaseSize);
				//console.log("Ancestor Working");
				userDb.transaction(function(tx){
					
					
					
					if(tempName!=tempPreviousName ){
						////alert("updating dependecies");
						tx.executeSql('UPDATE '  +constantVal.tblOrgName+ ' SET   manager = ? WHERE manager = ?',[tempName,tempPreviousName]);
					}
					
					
						tx.executeSql('UPDATE '+ constantVal.tblOrgName +' SET empName = ? , designation = ?, manager = ? WHERE empName = ?',[tempName,tempDesignation,tempManager,tempPreviousName]);

						////alert("employee Details updated");
					
						$('#editNameLabel').text(tempName);
						$('#editDesignationLabel').text(tempDesignation);
						$('#editManagerLabel').text(tempManager);
						empService.showMangerSelectList('#empRecordViewEditPageSelectManager',tempManager);
						//update data attributed of the button so as to fetch record again after updating the name of employee.
						$('#updateEmpRecordBtn').attr("data-empName", tempName);
					
				});
				
				constantVal.circularReferenceUtil =[];
				circularReferenceUtility =[];
				
		}
		else{
			empService.showMangerSelectList('#empRecordViewEditPageSelectManager','Select');
			alert("circular reference  error change manager");
			constantVal.circularReferenceUtil =[];
			circularReferenceUtility =[];
			
			
		}
	
	
	}	
	
	
}
