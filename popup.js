let ORGCS_SESSION_ID;
let MCSORG_SESSION_ID;
let ORG62_SESSION_ID;
let selectedTime;
let selectedTimeUnit;
let span;
let caseId;
let caseOrgId;
let caseInstance;
let gadgetOrgId;
let gadgetInstance;
let tabId;
let dataCenter;
let superPod;
var getButton30;
var getButton1;
var getButton2;
var getButton6;
var getButton24;
var delayInMilliseconds = 2000; //Adding delay of 1 second

//Helper function to get OrgCS' SessionIds
function getSessionIds() {    
    getCookies("https://orgcs.my.salesforce.com", "sid", function (cookie) {
        ORGCS_SESSION_ID = cookie.value;
    });

	getCookies("https://org62.my.salesforce.com", "sid", function (cookie) {
        ORG62_SESSION_ID = cookie.value;
    });

	getCookies("https://mcsorg.my.salesforce.com", "sid", function (cookie) {
       MCSORG_SESSION_ID = cookie.value;
    });

}

//Helper function to get cookies (used to get sessionIDs)
function getCookies(domain, name, callback) {
    chrome.cookies.get({ url: domain, name: name }, function (cookie) {
        if (cookie) {
            if (callback) {
                callback(cookie);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
	getSessionIds();
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		    var url = tabs[0].url;

			getButton30 = document.getElementById("circleButton30");
            getButton1 = document.getElementById("circleButton1");
            getButton2 = document.getElementById("circleButton2");
            getButton6 = document.getElementById("circleButton6");
            getButton24 = document.getElementById("circleButton24");

			//For Tab 2
			getTab2MQ = document.getElementById("tab2_MQ");
			getTab2DB = document.getElementById("tab2_DB");
			getTab2App = document.getElementById("tab2_App");
			getTab2CaaS = document.getElementById("tab2_CaaS");
			getTab2SOLR = document.getElementById("tab2_SOLR");
			getTab2PA = document.getElementById("tab2_PA");
			
			//For Tab 3
			getButtonEWS = document.getElementById("subcard_EWS");
			getButtonOrgAnalyzer = document.getElementById("subcard_OrgAnalyzer");
			getButtonOA = document.getElementById("subcard_OA");
			getButtonPagerDuty = document.getElementById("subcard_PagerDuty");
			getButtonReFocus = document.getElementById("subcard_ReFocus");
			getButtonDelphi = document.getElementById("subcard_Delphi");

			/*For Tab 4
			getButtonDBCheck = document.getElementById("subcard_DBCheck");
			getButtonAPTCheck = document.getElementById("subcard_APTCheck");
			getButtonIDFCPeak = document.getElementById("subcard_IDFCPeak");
			getButtoncall = document.getElementById("subcard_call");
			*/

			getconApex = document.getElementById("conApex");
			getBulkApi = document.getElementById("BulkApi");


			document.getElementById("loader").style.display = 'none';
			document.getElementById("dashboardsTable").style.display= 'none';
			document.getElementById("inputOrgIdInstanceValidation").style.display= 'none';
		//Get inputs via three methods
		//getCaseInfo() - Fetch Org ID and Instance from ORGCS
		//getGadgetInfo() - Fetch Org ID and Instance from GADGET
		//inputValidation() - Fetch Org ID and Instance from INPUT FIELDS
		if(!url.indexOf('https://orgcs.lightning.force.com/lightning/r/Case/')){

			getButton30.addEventListener("click", function () {
	 
				onClickButton30();
			    getCaseId(url);
			    getCaseInfo();

			});

			getButton1.addEventListener("click", function () {
	 
				onClickButton1();
			    getCaseId(url);
			    getCaseInfo();

			});

			getButton2.addEventListener("click", function () {
	 
				onClickButton2();
			    getCaseId(url);
			    getCaseInfo();

			});

			getButton6.addEventListener("click", function () {
	 
				onClickButton6();
			    getCaseId(url);
			    getCaseInfo();

			});

			getButton24.addEventListener("click", function () {
	 
				onClickButton24();
			    getCaseId(url);
			    getCaseInfo();

			});
			
		}

		if(!url.indexOf('https://org62.lightning.force.com/lightning/r/Case/')){

			getButton30.addEventListener("click", function () {
	 
				onClickButton30();
			    getCaseId(url);
			    getOrg62CaseInfo();

			});

			getButton1.addEventListener("click", function () {
	 
				onClickButton1();
			    getCaseId(url);
			    getOrg62CaseInfo();

			});

			getButton2.addEventListener("click", function () {
	 
				onClickButton2();
			    getCaseId(url);
			    getOrg62CaseInfo();

			});

			getButton6.addEventListener("click", function () {
	 
				onClickButton6();
			    getCaseId(url);
			    getOrg62CaseInfo();

			});

			getButton24.addEventListener("click", function () {
	 
				onClickButton24();
			    getCaseId(url);
			    getOrg62CaseInfo();

			});
			
		}

//Get inputs (orgId and instance) from Gadget
      else if(!url.indexOf('https://gadget.prom.sfdc.sh/diagnostics/')) {
  
		getButton30.addEventListener("click", function () {
			
			onClickButton30();
			tabId = tabs[0].id;
			setTimeout(function() {
				getGadgetInfo();
            }, delayInMilliseconds);
		});

		getButton1.addEventListener("click", function () {
			
			onClickButton1();
			tabId = tabs[0].id;
			setTimeout(function() {
				getGadgetInfo();
            }, delayInMilliseconds);
		});

		getButton2.addEventListener("click", function () {
			
			onClickButton2();
			tabId = tabs[0].id;
			setTimeout(function() {
				getGadgetInfo();
            }, delayInMilliseconds);
		});

		getButton6.addEventListener("click", function () {
			
			onClickButton6();
			tabId = tabs[0].id;
			setTimeout(function() {
				getGadgetInfo();
            }, delayInMilliseconds);
		});

		getButton24.addEventListener("click", function () {
			
			onClickButton24();
			tabId = tabs[0].id;
			setTimeout(function() {
				getGadgetInfo();
            }, delayInMilliseconds);
		});

	  }

	  else if (url.indexOf('https://gadget.prom.sfdc.sh/diagnostics/') && url.indexOf('https://orgcs.lightning.force.com/lightning/r/Case/') && url.indexOf('https://org62.lightning.force.com/lightning/r/Case/')) {
		    	
		getButton30.addEventListener("click", function () {

			onClickButton30();
			setTimeout(function() {
				inputValidation();
            }, delayInMilliseconds);
			
		});

		getButton1.addEventListener("click", function () {

			onClickButton1();
			setTimeout(function() {
				inputValidation();
            }, delayInMilliseconds);
			
		});

		getButton2.addEventListener("click", function () {

			onClickButton2();
			setTimeout(function() {
				inputValidation();
            }, delayInMilliseconds);
			
		});

		getButton6.addEventListener("click", function () {

			onClickButton6();
			setTimeout(function() {
				inputValidation();
            }, delayInMilliseconds);
			
		});

		getButton24.addEventListener("click", function () {

			onClickButton24();
			setTimeout(function() {
				inputValidation();
            }, delayInMilliseconds);
			
		});
	}

})

});

//Helper function to fetch caseId from Case Record Page URL
function getCaseId(caseUrl){

	var str = caseUrl;
	var startOfValueCaseId = str.indexOf('500');
	var endOffValueCaseId = str.indexOf('/view'); //Position of first char AFTER the value, as needed for substring
	caseId = str.substring(startOfValueCaseId,endOffValueCaseId);
}

//Helper function to fetch Case Details from a Case in OrgCS
function getCaseInfo(callback) {
	let conn = new jsforce.Connection({
        serverUrl: "https://orgcs.my.salesforce.com",
        sessionId: ORGCS_SESSION_ID
    });
    conn.identity(function(err, res) {
        if (err) { 
			addError("Error! Session expired for OrgCS. Please Login again and refresh the page.", null);
			document.getElementById("loader").style.display = 'none';
		}
		/* return conn.query("SELECT CommentBody FROM CaseComment WHERE CreatedById='005Hx000001Q2FJIA0' AND Parent.Id='"+caseId+"' AND CommentBody LIKE '%00D%' AND CommentBody LIKE '%Severity:%' LIMIT 1",function(err, result) */ 
		return conn.query("SELECT Case_Origin_OrgID__c,InstanceId__c FROM Case WHERE Id='"+caseId+"' LIMIT 1",function(err, result) 
		{ 	
			        if (err) { 
						addError(err);
						document.getElementById("loader").style.display = 'none';
					}
					retrieveCaseDetails(result.records);					
			});	   
	}); 
    
}

	//Helper function to retrieve orgId and Instance Details from OrgCS page	
	function retrieveCaseDetails(caseInfo) {	
		caseInfo.forEach(element => {	
			caseOrgId = element.Case_Origin_OrgID__c;	
			caseInstance = element.InstanceId__c;	
	   });	

//1. If input field are null, fetch org id and Instance from the Case 
		if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value=='')
		{
			document.getElementById("orgIdInput").value = caseOrgId;
			document.getElementById("instanceInput").value = caseInstance;
		}
//2. If input field for instance is null, fetch value from the Case
		else if(document.getElementById("orgIdInput").value!='' && document.getElementById("instanceInput").value=='')
		{
			caseOrgId = document.getElementById("orgIdInput").value;
			document.getElementById("instanceInput").value = caseInstance;
		}
//3. If input field for orgId is null, fetch value from the Case
		else if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value!='')
		{
			caseInstance = document.getElementById("instanceInput").value;
            document.getElementById("orgIdInput").value = caseOrgId;
		}
//4. Get values from input field
		else
		{
			caseOrgId = document.getElementById("orgIdInput").value;
            caseInstance = document.getElementById("instanceInput").value;
		}

	    document.getElementById("orgInstanceInput").style.display= 'block';	


   // Validate the Org ID input field 
		if(caseOrgId.startsWith("00D") && caseOrgId.length==15) {
			fetchMcsOrgDetails(caseOrgId,caseInstance);

		}

		else {

			document.getElementById("orgIdInstanceValidator").innerHTML='Please enter a valid OrgId!';
			document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
			document.getElementById("loader").style.display='none';
		}
	} 	
	//Helper function to fetch OrgId from a Case in Org62	
	function getOrg62CaseInfo(callback,org62Instance) {	
		let conn = new jsforce.Connection({	
			serverUrl: "https://org62.my.salesforce.com",	
			sessionId: ORG62_SESSION_ID	
		});	
		conn.identity(function(err, res) {	
			if (err) { 	
				addError("Error! Session expired for Org62. Please Login again and refresh the page.", null);	
				document.getElementById("loader").style.display = 'none';	
			}	
			return conn.query("SELECT Organization_Id__c FROM Case WHERE Id='"+caseId+"' LIMIT 1",function(err, result) 	
			{ 		
						if (err) { 	
							addError(err);	
							document.getElementById("loader").style.display = 'none';		
						}		
						retrieveOrg62CaseDetails(result.records);							
				});	   		
		}); 		
				
	}		
	//Helper function to retrieve orgId and Instance Details from OrgCS page		
	function retrieveOrg62CaseDetails(caseInfo) {		
		caseInfo.forEach(element => {		
			caseOrgId = element.Organization_Id__c;		
	   });		
			   
	   fetchOrg62McsInstance(caseOrgId);

    
}

//Helper function to fetch and validate OrgId and Instance from Gadget Page
function getGadgetInfo() {

chrome.scripting.executeScript({
				target: {tabId:tabId},
				func: getGadgetOrgIdInstance,
			},
			(injectionResults) => {
				for (var returnedResult of injectionResults)
				{  
					gadgetOrgId = returnedResult.result[0];
					gadgetInstance = returnedResult.result[1];
					if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value=='') {

			            document.getElementById("orgIdInput").value = gadgetOrgId;
			            document.getElementById("instanceInput").value = gadgetInstance;
		            }
		            else if(document.getElementById("orgIdInput").value!='' && document.getElementById("instanceInput").value=='') {
						 
			            gadgetOrgId = document.getElementById("orgIdInput").value;
			            document.getElementById("instanceInput").value = gadgetInstance;
		            }
		            else if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value!='') {
			
						gadgetInstance = document.getElementById("instanceInput").value;
                        document.getElementById("orgIdInput").value = gadgetOrgId;
		            }
		            else {
			            gadgetOrgId = document.getElementById("orgIdInput").value;
                        gadgetInstance = document.getElementById("instanceInput").value;
		            }

	                document.getElementById("orgInstanceInput").style.display= 'block';
					
					if(gadgetOrgId.startsWith("00D") && gadgetOrgId.length==15) {
			
						fetchMcsOrgDetails(gadgetOrgId,gadgetInstance);
						//fetchDashboards(gadgetOrgId,gadgetInstance);
			
					}
			
					else {
			
						document.getElementById("orgIdInstanceValidator").innerHTML='Please enter a valid OrgId!';
						document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
						document.getElementById("loader").style.display='none';
					}
				}
			  });
}

//Helper function to fetch OrgId and Instance from Gadget Page
function getGadgetOrgIdInstance() {

    var resultArray = [document.getElementById('counter-Organization-ID').value,document.getElementById('counter-Instance').value];
	return resultArray;

}

//Helper function to validate Input Org Id and Instance
function validateInputOrgIdInstance() {

	if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value=='')
	{
		document.getElementById("orgIdInstanceValidator").innerHTML='Please enter an OrgId and Instance!';
        document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
	}
	else if(document.getElementById("orgIdInput").value!='' && document.getElementById("instanceInput").value=='') {

		document.getElementById("orgIdInstanceValidator").innerHTML='Please enter an Instance!';
        document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
	}
	else if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value!='') {

		document.getElementById("orgIdInstanceValidator").innerHTML='Please enter an OrgId!';
        document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
	}
	document.getElementById("loader").style.display= 'none';
	
}

//Helper function to validate input orgId and instance for URLs other than Gagdet and Case Record Page
function inputValidation() {

	if(document.getElementById("orgIdInput").value!='' && document.getElementById("instanceInput").value!='') {

		var inputOrgId = document.getElementById("orgIdInput").value;
		var inputInstance = document.getElementById("instanceInput").value;

		if(inputOrgId.startsWith("00D") && inputOrgId.length==15) {
	
			fetchMcsOrgDetails(inputOrgId,inputInstance);
			//fetchDashboards(inputOrgId,inputInstance);

		}

		else {

			document.getElementById("orgIdInstanceValidator").innerHTML='Please enter a valid OrgId!';
			document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';
			document.getElementById("loader").style.display='none';
		}

	}
	else {

		validateInputOrgIdInstance();
	}

}

//Helper function to fetch Data Center and Super Pod from MCS Org
function fetchMcsOrgDetails(organizationId,instance) {

	let conn = new jsforce.Connection({
        serverUrl: "https://mcsorg.my.salesforce.com",
        sessionId: MCSORG_SESSION_ID
    });

	conn.identity(function(err, res) {
		if (err) { 
			addError("Error! Session expired for MCS org. Please Login again and refresh the page.", null);
			document.getElementById("loader").style.display = 'none';
		}

		return conn.query("SELECT Data_Center__c,Super_Pod__c,Instance_Lookup__c From Account WHERE  orgId__c='"+organizationId+"' LIMIT 1",function(err, result) {
                if (err) {
					addError("Error! Session expired for MCS org. Please Login again and refresh the page.", null);
					document.getElementById("loader").style.display = 'none';
				}	
				retrieveMcsOrgDetails(result.records,organizationId,instance);
              });
		
	 });
} 

//Helper function to retrieve MCS Org Details
function retrieveMcsOrgDetails(dcSuperPodDetails,organizationId,instance) {

	dcSuperPodDetails.forEach(element => {
		dataCenter = element.Data_Center__c;
		superPod = element.Super_Pod__c;
		
   });
   fetchDashboards(organizationId,instance);	
} 	
//Helper function to fetch Instance from MCS Org for Org62 Case	
function fetchOrg62McsInstance(organizationId) {	
	let conn = new jsforce.Connection({	
        serverUrl: "https://mcsorg.my.salesforce.com",	
        sessionId: MCSORG_SESSION_ID	
    });	
	conn.identity(function(err, res) {	
		if (err) { 	
            addError("Error! Session expired for MCS org. Please Login again and refresh the page.", null);	
			document.getElementById("loader").style.display = 'none';	
		}	
	return conn.query("SELECT Instance_Lookup__r.Name From Account WHERE  orgId__c='"+organizationId+"' LIMIT 1",function(err, result) {	
                if (err) {	
					addError("Error! Session expired for MCS org. Please Login again and refresh the page.", null);	
					document.getElementById("loader").style.display = 'none';	
				}		
				retrieveMcsInstance(result.records,organizationId);	
              });	
			
	 });	
} 	
//Helper function to retrieve Instance from MCS Org	
function retrieveMcsInstance(instanceDetails,organizationId) {	
	    instanceDetails.forEach(element => {	
		instance = element.Instance_Lookup__r.Name;			
        });	
		//1. If input field are null, fetch org id and Instance from the Case 	
		if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value=='')	
		{	
			document.getElementById("orgIdInput").value = organizationId;	
			document.getElementById("instanceInput").value = instance;	
		}	
		//2. If input field for instance is null, fetch value from the Case	
		else if(document.getElementById("orgIdInput").value!='' && document.getElementById("instanceInput").value=='')	
		{	
			organizationId = document.getElementById("orgIdInput").value;	
			document.getElementById("instanceInput").value = instance;	
		}	
		//3. If input field for orgId is null, fetch value from the Case	
		else if(document.getElementById("orgIdInput").value=='' && document.getElementById("instanceInput").value!='')	
		{	
			instance = document.getElementById("instanceInput").value;	
			document.getElementById("orgIdInput").value = organizationId;	
		}	
		//4. Get values from input field	
		else	
		{	
			organizationId = document.getElementById("orgIdInput").value;	
			instance = document.getElementById("instanceInput").value;	
		}	
        document.getElementById("orgInstanceInput").style.display= 'block';		
        // Validate the Org ID input field 	
        if(organizationId.startsWith("00D") && organizationId.length==15) {	
		
			fetchMcsOrgDetails(organizationId, instance)
        }	
       else {	
	    document.getElementById("orgIdInstanceValidator").innerHTML='Please enter a valid OrgId!';	
	    document.getElementById("inputOrgIdInstanceValidation").style.display= 'block';	
	    document.getElementById("loader").style.display='none';	
       }	
}	



//Helper function to fetch relevant Splunk, Argus and Grafana Dashboards
function fetchDashboards(orgId, instance) {
  document.getElementById("loader").style.display= 'none';
  document.getElementById("inputOrgIdInstanceValidation").style.display= 'none';
  document.getElementById("dashboardsTable").style.display= 'block';

 //**************** TAB 2 START  ************************
		//1. MQ Issues
		getTab2MQ.addEventListener("click", function () {
			if(instance.includes('IND') || instance.includes('ind') || 
				instance.includes('USA') || instance.includes('usa') || 
				instance.includes('SGP') || instance.includes('sgp') || 
				instance.includes('FRA') || instance.includes('fra') ||
				instance.includes('AUS') || instance.includes('aus') ||
				instance.includes('DEU') || instance.includes('deu')) {
					//a.  Grafana MQ Usage Falcon Dashboard URL 
					window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/SN6N5HNGz/mq-monitoring-dashboard-falcon?orgId=1&var-substrate=aws&var-falcon_instance=aws-prod2-apsouth1&var-fd_instance=core1&var-cell="+instance.toLowerCase()+"&var-host=ip*&var-brokerHost=*-qpid*&var-RacNode=All&var-MessageTypeName=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m&var-interval="+span+"&var-cluster=HighScale");	
				}
			else{
				//b.  Grafana MQ Usage Non-Falcon Dashboard URL 
					window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/YfulAV2Zk/mq-monitoring-dashboard?orgId=1&var-dc="+dataCenter+"&var-sp=*&var-pod="+instance.toLowerCase()+"&var-host=All&var-brokerHost=*-mq*&var-RacNode=All&var-messagetype=All&var-downsample="+span);
			}
			
			//c.  Splunk - MQ usage Dashboard
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__org_mq_usage?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.messageTypeName=APEX_FUTURE&form.messageTypeName=APEX_QUEUEABLE&form.messageTypeName=APEX_TOKEN&form.messageTypeName=ASYNC_API&form.messageTypeName=BATCH_APEX_JOB&form.span="+span);
		});
		//2. DB Issues
		getTab2DB.addEventListener("click", function () {
			if(instance.includes('IND') || instance.includes('ind') || 
				instance.includes('USA') || instance.includes('usa') || 
				instance.includes('SGP') || instance.includes('sgp') || 
				instance.includes('FRA') || instance.includes('fra') ||
				instance.includes('AUS') || instance.includes('aus') ||
				instance.includes('DEU') || instance.includes('deu')) {
			//a.  Cursor Dashboard (SOQL Query at DB Side) Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/UccBphDnk/cursor-dashboard?orgId=1&var-dc=aws&var-superpod=aws-prod2-apsouth1&var-pod=core1&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m");
			//b.  DB Oracle Health Dashboard - Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/dpZDzkSGz/prod-app-osstats?orgId=1&from=now-"+selectedTime+selectedTimeUnit+"&to=now&var-substrate=aws&var-envtype=prod&var-cell="+instance.toLowerCase()+"&var-falcon_instance=aws-prod2-apsouth1&var-functional_domain=core1&var-pod=All&var-interval="+span)
				}
			else{
			//c. Grafana Curson Dashboard (SOQL Query at DB Side) Non-Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/UccBphDnk/cursor-dashboard?orgId=1&var-dc="+dataCenter+"&var-superpod="+superPod+"&var-pod="+instance.toLowerCase()+"&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m");
			//d. CASP 1P (non-falcon)	
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/_QI1Gsm4k/prod-app-osstats-1p?orgId="+orgId+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now&var-interval="+span+"&var-pod="+instance.toLowerCase()+"&var-dbnode=*&var-device=All&var-dc="+dataCenter+"&var-sp="+superPod);
					
			}
				

			//e. Splunk Dashboard - ORG DB CPU TIME Dashboard_v2
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-GB/app/publicSharing/org_db_cpu_time_dashboard_v2?form.instance="+instance+"&form.organizationId="+orgId+"&earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.span="+span);

		});
		//3. App Server Issues
		getTab2App.addEventListener("click", function () {					
			if(instance.includes('IND') || instance.includes('ind') || 
				instance.includes('USA') || instance.includes('usa') || 
				instance.includes('SGP') || instance.includes('sgp') || 
				instance.includes('FRA') || instance.includes('fra') ||
				instance.includes('AUS') || instance.includes('aus') ||
				instance.includes('DEU') || instance.includes('deu')){
			//a. Splunk SOLR Dashboard
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/PublicCorePerfDash_CaspDatabaseConnectionDashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.pod=coreprod&form.host=*-app*&form.showCpuTable=*");
			//b. Splunk - ProM Connection Pool 
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__prom_connnection_pool_dashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance=coreprod&form.organizationId="+orgId+"&form.span=1m&form.host=*-app*");

			//c. CASP AWS Primary (Falcon)##added on 21.5.23
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/8WO1f5i4z/core-app-primary-dashboard-falcon?orgId="+orgId+"&from="+selectedTime+selectedTimeUnit+"&to=now&var-substrate=aws&var-envtype=prod&var-cell="+instance.toLowerCase()+"&var-falcon_instance=aws-prod2-apsouth1&var-functional_domain=core1&var-pod=All&var-interval="+span);

			//d. CASP AWS (Falcon)
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/dpZDzkSGz/prod-app-osstats?orgId="+orgId+"&from="+selectedTime+selectedTimeUnit+"&to=now&var-substrate=aws&var-envtype=prod&var-cell="+instance.toLowerCase()+"&var-falcon_instance=aws-prod2-apsouth1&var-functional_domain=core1&var-pod=All&var-interval="+span);
				}
				
			else{
			//a. Splunk SOLR Dashboard
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/PublicCorePerfDash_CaspDatabaseConnectionDashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.pod="+instance.toLowerCase()+"&form.host=*-app*&form.showCpuTable=*");
			//d. Splunk - ProM Connection Pool 
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__prom_connnection_pool_dashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span=1m&form.host=*-app*");

			//e. CASP 1P Primary Dashboard (non-falcon) ##added on 21.5.23
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/cxlsA6a7z/core-app-primary-dashboard-1p?orgId="+orgId+"&from="+selectedTime+selectedTimeUnit+"&to=now&var-interval="+span+"&var-pod="+instance.toLowerCase()+"&var-dbnode=*&var-device=All");

			//f. CASP 1P (non-falcon)
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/_QI1Gsm4k/prod-app-osstats-1p?orgId="+orgId+"&from="+selectedTime+selectedTimeUnit+"&to=now&var-interval="+span+"&var-pod="+instance.toLowerCase()+"&var-dbnode=*&var-device=All");

				}
			
			
		
		}); 
		//4. CaaS Issues
		getTab2CaaS.addEventListener("click", function () {
			if(instance.includes('IND') || instance.includes('ind') || 
				instance.includes('USA') || instance.includes('usa') || 
				instance.includes('SGP') || instance.includes('sgp') || 
				instance.includes('FRA') || instance.includes('fra') ||
				instance.includes('AUS') || instance.includes('aus') ||
				instance.includes('DEU') || instance.includes('deu')) {
			//a. CAAS health Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/AoKv-p8Zk/caas-health-in-falcon?orgId=1&var-falcon_instance=aws-prod2-apsouth1&var-fd_instance=core1&var-cell="+instance.toLowerCase()+"&var-service=caas&var-span="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now");
			//b. CAAS podwise health Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/uPFz8DYMk/caas-podwise-dashboard-falcon?orgId=1&var-fi=aws-prod2-apsouth1&var-fd=core1&var-cell="+instance.toLowerCase()+"&var-service=caas&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now");
				}
			else{
			//c. CAAS Vitals 1P
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/HX4w1JwMz/caas-vitals-1p?orgId=1&var-dc="+dataCenter+"&var-sp="+superPod+"&var-pod="+instance.toLowerCase()+"&var-host=*&var-interval="+span+"&var-cluster=caas-cluster-1&from=now-"+selectedTime+selectedTimeUnit+"&to=now")
			//c. CAAS podwise health 1P
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/TokvT1Umk/caas-podwise-dashboard?orgId=1&var-dc="+dataCenter+"&var-sp="+superPod+"&var-pod="+instance.toLowerCase()+"&var-host=*&var-interval="+span+"&var-cluster=caas-cluster-1&from=now-"+selectedTime+selectedTimeUnit+"&to=now")
			}
		});
		//5. SOLR Issues
		getTab2SOLR.addEventListener("click", function () {
			//a. Splunk SOLR Dashboard
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__solr_search?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.priority=100&form.span="+span);
			if(instance.includes('IND') || instance.includes('ind') || 
				instance.includes('USA') || instance.includes('usa') || 
				instance.includes('SGP') || instance.includes('sgp') || 
				instance.includes('FRA') || instance.includes('fra') ||
				instance.includes('AUS') || instance.includes('aus') ||
				instance.includes('DEU') || instance.includes('deu')) {
			//.b Grafana Search Service Dashboard Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/Z5DVVJEzf/search-service-health?orgId=1&var-datacenter="+dataCenter+"&var-pod=core1&var-source=Live&var-cluster=All&var-host=*&var-solrhost=*&var-solrpodtype=Pri&var-sisPluginId=All&var-fdi=&var-falconCell="+instance.toLowerCase()+"&var-namespace=%5Bsolr-service%7Csqep%7Csearch-scale-safely%5D&var-interval="+span+"&var-substrate=All&var-RacNode=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now");	
			}
			else{
			//.c Grafana Search Service Dashboard Non-Falcon
				window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/Z5DVVJEzf/search-service-health?orgId=1&var-datacenter="+dataCenter+"&var-pod="+instance.toLowerCase()+"&var-source=Live&var-cluster=All&var-host=*&var-solrhost=*&var-solrpodtype=Pri&var-sisPluginId=All&var-fdi=&var-falconCell=NONE&var-namespace=%5Bsolr-service%7Csqep%7Csearch-scale-safely%5D&var-interval="+span+"&var-substrate=All&var-RacNode=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now");
			}
		
		});
		//6.  ProM Availability
			getTab2PA.addEventListener("click", function () {
			window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/ptym_PwMz/promengg-heroku?orgId=1&from=now-"+selectedTime+selectedTimeUnit+"&to=now");	
		});
//------------ TAB 2 END  -------------

 //**************** TAB 3 START  ************************
  getButtonEWS.addEventListener("click", function () {
	window.open("https://heimdall.heimdall.monitoring.aws-esvc1-useast2.aws.sfdc.cl/xdashboards/aVYhcCPLt?dashboard.date_range.from=-"+selectedTime+selectedTimeUnit+"&dashboard.date_range.to=-0"+selectedTimeUnit+"&dashboard.pod="+instance.toUpperCase());
   });
   getButtonOrgAnalyzer.addEventListener("click", function () {
	window.open("https://heimdall.heimdall.monitoring.aws-esvc1-useast2.aws.sfdc.cl/cdbporgcentral/ui/org-analyzer?weekly=on&pod="+instance+"&orgid="+orgId+"&insightsby=dbcputime&cpudays=30&submit_clicked=yes&submit=");
   });
   getButtonOA.addEventListener("click", function () {
	window.open("https://fawkes-ui.sfproxy.monitoring.aws-esvc1-useast2.aws.sfdc.cl/ica");
   });
   getButtonPagerDuty.addEventListener("click", function () {
	window.open("https://sites.google.com/a/salesforce.com/support-technology-escalations/support-to-technology-escalations/paging-an-rd-on-call-team-goc-step-by-step-example-cce-hotline");
   });
   getButtonReFocus.addEventListener("click", function () {
	window.open("https://refocus.internal.salesforce.com/rooms");
   });
   getButtonDelphi.addEventListener("click", function () {
	window.open("https://delphi-app-production.sfproxy.monitoring.aws-esvc1-useast2.aws.sfdc.cl/");
   });

   //------------ TAB 3 END  -------------

   /**************** TAB 4 START  ************************
   getButtonDBCheck.addEventListener("click", function () {
		window.open("https://monitoring.internal.salesforce.com/argusmvp/#/dashboards/53181423?data-center=aws&superpod=aws-prod2-apsouth1&pod=core1&org-id="+orgId+"&start=-"+selectedTime+selectedTimeUnit+"%20GMT&end=-0"+selectedTimeUnit+"%20GMT&interval="+span);
		});
   getButtonAPTCheck.addEventListener("click", function () {
			window.open("https://monitoring.internal.salesforce.com/argusmvp/#/dashboards/12373309?cell="+instance+"&fi=aws-prod2-apsouth1&fd=core1&start=-"+selectedTime+selectedTimeUnit+"%20GMT&end=-0"+selectedTimeUnit+"%20GMT&interval="+span);
		});
   getButtonIDFCPeak.addEventListener("click", function () {
			window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/idfc_peak_days_dashboard_copy?form.instance="+instance+"&form.orgid="+orgId+"&form.span="+span+"&form.timerange.earliest=-"+selectedTime+selectedTimeUnit+"&form.timerange.latest=now");
		});
	getButtoncall.addEventListener("click", function () {
		window.open("https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/wWGx04NVk/ind19-swat?orgId=1&refresh=1m&var-cell="+instance.toLowerCase()+"&var-substrate=aws&var-fi=aws-prod2-apsouth1&var-fd=core1&var-dgstatus=PRIMARY&var-host=All&var-oldhost=All&var-interval=1m&from=now-"+selectedTime+selectedTimeUnit+"&to=now-1m");
		window.open("https://monitoring.internal.salesforce.com/argusmvp/#/dashboards/53181423?data-center=aws&superpod=aws-prod2-apsouth1&pod=core1&org-id="+orgId+"&start=-"+selectedTime+selectedTimeUnit+"%20GMT&end=-0"+selectedTimeUnit+"%20GMT&interval="+span);
		window.open("https://monitoring.internal.salesforce.com/argusmvp/#/dashboards/12373309?cell="+instance+"&fi=aws-prod2-apsouth1&fd=core1&start=-"+selectedTime+selectedTimeUnit+"%20GMT&end=-0"+selectedTimeUnit+"%20GMT&interval="+span);
		window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/idfc_peak_days_dashboard_copy?form.instance="+instance+"&form.orgid="+orgId+"&form.span="+span+"&form.timerange.earliest=-"+selectedTime+selectedTimeUnit+"&form.timerange.latest=now"); 
		}); */

 //Splunk CATT Overview Dashboard URL
  document.getElementById("cattOverView").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/catt_overview?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.time_field.earliest=-"+selectedTime+selectedTimeUnit+"&form.time_field.latest=now&form.span="+span+"&form.add_filter="; 
  
  //Splunk MQ Usage Dashboard URL
  document.getElementById("mqUsage").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__org_mq_usage?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.messageTypeName=APEX_FUTURE&form.messageTypeName=APEX_QUEUEABLE&form.messageTypeName=APEX_TOKEN&form.messageTypeName=ASYNC_API&form.messageTypeName=BATCH_APEX_JOB&form.span="+span; 

  //Splunk SOLR Search Indexing Dashboard URL
  document.getElementById("solrSearchIndexing").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/publicotherdash_support__solr_search?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.priority=100&form.span="+span;
  
  //Splunk Bulk API Batch Limit Dashboard URL
  document.getElementById("BulkApi").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/surbhi_bulk_api_batch_limit_v3?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span="+span;

  //Splunk API Performance Dashboard URL
  //document.getElementById("ApiPerf").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/org_api_performance_monitoring_dashboard_clone?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span="+span;

  //Splunk Concurrent Apex
  document.getElementById("conApex").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/Prom_concurrent_apex_dashboard_v1?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span="+span;

  getconApex.addEventListener("click", function () {
	//concurrent UI
	window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/prom_concurrent_ui_dashboard_v3?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span="+span);
	//concurrent API
	window.open("https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/Prom__concurrent_api_dashboard_v2?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span="+span);
	});
  

  //CHECK FOR FALCON IND INSTANCES
  if(instance.includes('IND') || instance.includes('ind') || 
  	 instance.includes('USA') || instance.includes('usa') || 
	 instance.includes('SGP') || instance.includes('sgp') || 
	 instance.includes('FRA') || instance.includes('fra') ||
	 instance.includes('AUS') || instance.includes('aus') ||
	 instance.includes('DEU') || instance.includes('deu')) 
  { 
	//Splunk Connection pool 
	document.getElementById("connpool").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__prom_connnection_pool_dashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance=coreprod&form.organizationId="+orgId+"&form.span=1m&form.host=*-app*";

	//Argus Falcon Dashboard
	document.getElementById("falconNonFalconDashboard").href = "https://monitoring.internal.salesforce.com/argusmvp/#/dashboards/68004274?data-center=aws&superpod=aws-prod2-apsouth1&pod=core1&org-id="+orgId+"&start=-"+selectedTime+selectedTimeUnit+"%20GMT&end=-0"+selectedTimeUnit+"%20GMT&interval="+span;
	
	//Grafana MQ Usage Falcon Dashboard URL 
	document.getElementById("mqFalconNonFalconDashboard").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/SN6N5HNGz/mq-monitoring-dashboard-falcon?orgId=1&var-substrate=aws&var-falcon_instance=aws-prod2-apsouth1&var-fd_instance=core1&var-cell="+instance.toLowerCase()+"&var-host=ip*&var-brokerHost=*-qpid*&var-RacNode=All&var-MessageTypeName=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m&var-interval="+span+"&var-cluster=HighScale";
	
	//Grafana CaaS Health Dashboard Falcon
	document.getElementById("cacheHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/AoKv-p8Zk/caas-health-in-falcon?orgId=1&var-falcon_instance=aws-prod2-apsouth1&var-fd_instance=core1&var-cell="+instance.toLowerCase()+"&var-service=caas&var-span="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now";
	
	//Grafana CaaS Podwise Dashboard Falcon
	document.getElementById("cacheHealthPodwiseHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/uPFz8DYMk/caas-podwise-dashboard-falcon?orgId=1&var-fi=aws-prod2-apsouth1&var-fd=core1&var-cell="+instance.toLowerCase()+"&var-service=caas&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now";

	//Grafana Cursor Dashboard (SOQL Query at DB Side) Falcon
	document.getElementById("cursorSOQLDb").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/UccBphDnk/cursor-dashboard?orgId=1&var-dc=aws&var-superpod=aws-prod2-apsouth1&var-pod=core1&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m";

	//Grafana Search Service Dashboard Falcon
	document.getElementById("searchServiceHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/Z5DVVJEzf/search-service-health?orgId=1&var-datacenter=aws-prod2-apsouth1&var-pod=core1&var-source=Live&var-cluster=All&var-host=*&var-solrhost=*&var-solrpodtype=Pri&var-sisPluginId=All&var-fdi=core1&var-falconCell="+instance.toLowerCase()+"&var-namespace=%5Bsolr-service%7Csqep%7Csearch-scale-safely%5D&var-interval="+span+"&var-substrate=aws&var-RacNode=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now";

	//Grafana DB Oracle Health Dashboard 	
	document.getElementById("dbOracleHealth").className = "slds-visible";	
	document.getElementById("dbOracleHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/dpZDzkSGz/prod-app-osstats?orgId=1&from=now-"+selectedTime+selectedTimeUnit+"&to=now&var-substrate=aws&var-envtype=prod&var-cell="+instance.toLowerCase()+"&var-falcon_instance=aws-prod2-apsouth1&var-functional_domain=core1&var-pod=All&var-interval="+span+"&viewPanel=289";	
  }
    //NON-FALCON INSTANCES
  else
  {	
	//Splunk Connection pool 
	document.getElementById("connpool").href = "https://splunk-web.log-analytics.monitoring.aws-esvc1-useast2.aws.sfdc.is/en-US/app/publicSharing/support__prom_connnection_pool_dashboard?earliest=-"+selectedTime+selectedTimeUnit+"&latest=now&form.instance="+instance+"&form.organizationId="+orgId+"&form.span=1m&form.host=*-app*";

	//Argus Non-Falcon Dashboard URL
		document.getElementById("falconNonFalconDashboard").href = "https://monitoring.internal.salesforce.com/argus/#/dashboardsEmbedded/68004274?data-center="+dataCenter+"&superpod="+superPod+"&pod="+instance.toLowerCase()+"&org-id="+orgId+"&start=-"+selectedTime+selectedTimeUnit+"&end=-0"+selectedTimeUnit+"&interval="+span;

	//Grafana MQ Usage Non-Falcon Dashboard URL 
	//document.getElementById("mqFalconNonFalconDashboard").innerText = 'MQ Non Falcon Dashboard';
	document.getElementById("mqFalconNonFalconDashboard").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/YfulAV2Zk/mq-monitoring-dashboard?orgId=1&var-dc="+dataCenter+"&var-sp=*&var-pod="+instance.toLowerCase()+"&var-host=All&var-brokerHost=*-mq*&var-RacNode=All&var-messagetype=All&var-downsample="+span;

	//Grafana CaaS Health Dashboard Non-Falcon
	document.getElementById("cacheHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/HX4w1JwMz/caas-vitals-1p?orgId=1&var-dc="+dataCenter+"&var-sp="+superPod+"&var-pod="+instance.toLowerCase()+"&var-host=*&var-interval="+span+"&var-cluster=caas-cluster-1&from=now-"+selectedTime+selectedTimeUnit+"&to=now";

	//Grafana CaaS Podwise Dashboard Falcon
	document.getElementById("cacheHealthPodwiseHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/uPFz8DYMk/caas-podwise-dashboard-falcon?orgId=1&var-fi=aws-prod2-apsouth1&var-fd=core1&var-cell="+instance.toLowerCase()+"&var-service=caas&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now";

	document.getElementById("cacheHealthPodwiseHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/TokvT1Umk/caas-podwise-dashboard-falcon?orgId=1&var-dc="+dataCenter+"&var-sp="+superPod+"&var-pod="+instance.toLowerCase()+"&var-service=caas&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now";

	//Grafana Curson Dashboard (SOQL Query at DB Side) Non-Falcon
	document.getElementById("cursorSOQLDb").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/UccBphDnk/cursor-dashboard?orgId=1&var-dc="+dataCenter+"&var-superpod="+superPod+"&var-pod="+instance.toLowerCase()+"&var-interval="+span+"&from=now-"+selectedTime+selectedTimeUnit+"&to=now&refresh=1m";

	//Grafana Search Service Dashboard Non-Falcon
	document.getElementById("searchServiceHealth").href = "https://grafana.argus.monitoring.aws-esvc1-useast2.aws.sfdc.cl/d/Z5DVVJEzf/search-service-health?orgId=1&var-datacenter="+dataCenter+"&var-pod="+instance.toLowerCase()+"&var-source=Live&var-cluster=All&var-host=*&var-solrhost=*&var-solrpodtype=Pri&var-sisPluginId=All&var-fdi=&var-falconCell=NONE&var-namespace=%5Bsolr-service%7Csqep%7Csearch-scale-safely%5D&var-interval="+span+"&var-substrate=All&var-RacNode=All&from=now-"+selectedTime+selectedTimeUnit+"&to=now";
  }
  //------------ TAB1 END  ------------- 

  

}

//Helper function called when 30 mins button is clicked
function onClickButton30() {

	         document.getElementById("loader").style.display = 'block';
			 document.getElementById("errorArea").style.display = 'none';
			 document.getElementById("dashboardsTable").style.display= 'none';
				
				if(getButton1.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton2.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton6.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton24.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
                {
					getButton30.style.background = '#308ABE';
				    getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
				}

                else 
				{
					getButton30.style.background = '#308ABE';
                    getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";

					if(getButton1.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
                    {
					  getButton1.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
				      getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
					}

					if(getButton2.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
                    {
					  getButton2.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
				      getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
					}
					
					if(getButton6.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
                    {
					  getButton6.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
				      getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
					}

					if(getButton24.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
                    {
					  getButton24.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
				      getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
					}
				}
				selectedTimeUnit='m';
				selectedTime = document.getElementById("circleButton30").value;
				span='1m';

}

//Helper function called when 1 hour button is clicked
function onClickButton1() {

	document.getElementById("loader").style.display = 'block';
	document.getElementById("errorArea").style.display = 'none';
	document.getElementById("dashboardsTable").style.display= 'none';
	   
	   if(getButton30.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton2.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton6.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton24.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
	   {
		   getButton1.style.background = '#308ABE';
		   getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
	   }

	   else 
	   {
		   getButton1.style.background = '#308ABE';
		   getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";

		   if(getButton30.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton30.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton2.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton2.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
		   
		   if(getButton6.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton6.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton24.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton24.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
	   }
	   selectedTimeUnit='h';
	   selectedTime = document.getElementById("circleButton1").value;
	   span='1m';

}

//Helper function called when 2 hour button is clicked
function onClickButton2() {

	document.getElementById("loader").style.display = 'block';
	document.getElementById("errorArea").style.display = 'none';
	document.getElementById("dashboardsTable").style.display= 'none';
	   
	   if(getButton30.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton1.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton6.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton24.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
	   {
		   getButton2.style.background = '#308ABE';
		   getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
	   }

	   else 
	   {
		   getButton2.style.background = '#308ABE';
		   getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";

		   if(getButton30.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton30.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton1.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton1.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
		   
		   if(getButton6.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton6.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton24.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton24.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
	   }
	   selectedTimeUnit='h';
	   selectedTime = document.getElementById("circleButton2").value;
	   span='15m';

}

//Helper function called when 6 hour button is clicked
function onClickButton6() {

	document.getElementById("loader").style.display = 'block';
	document.getElementById("errorArea").style.display = 'none';
	document.getElementById("dashboardsTable").style.display= 'none';
	   
	   if(getButton30.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton1.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton2.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton24.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
	   {
		   getButton6.style.background = '#308ABE';
		   getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
	   }

	   else 
	   {
		   getButton6.style.background = '#308ABE';
		   getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";

		   if(getButton30.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton30.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton1.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton1.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
		   
		   if(getButton2.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton2.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton24.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton24.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
	   }
	   selectedTimeUnit='h';
	   selectedTime = document.getElementById("circleButton6").value;
	   span='30m';

}

//Helper function called when 24 hour button is clicked
function onClickButton24() {

	document.getElementById("loader").style.display = 'block';
	document.getElementById("errorArea").style.display = 'none';
	document.getElementById("dashboardsTable").style.display= 'none';
	   
	   if(getButton30.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton1.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton2.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)" && getButton6.style.background=="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
	   {
		   getButton24.style.background = '#308ABE';
		   getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
	   }

	   else 
	   {
		   getButton24.style.background = '#308ABE';
		   getButton24.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";

		   if(getButton30.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton30.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton30.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton1.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton1.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton1.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
		   
		   if(getButton2.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton2.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton2.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }

		   if(getButton6.style.background!="linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)")
		   {
			 getButton6.style.background = "linear-gradient(#63CCFB 100%,#22B0F6 94.1%,#00A2F4 91%)";
			 getButton6.style.filter="drop-shadow(0px 30px 50px rgba(3, 103, 153, 0.2)) drop-shadow(0px 15px 20px rgba(3, 103, 153, 0.1))";
		   }
	   }
	   selectedTimeUnit='h';
	   selectedTime = document.getElementById("circleButton24").value;
	   span='1h';

}

//Helper function to add errors
function addError(errorString, error) {
    let errorHeader = document.getElementById("errorHeader");
    document.getElementById("errorArea").style.display = 'block';
    
    if (error) {
        errorHeader.innerHTML = errorString + "\n" + "Error: " + error.toString();
    } else {
        errorHeader.innerHTML = errorString;
    }
}




