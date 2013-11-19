var mydb={};
var myroomid = "";
// initialise the database

initDB = function() {
  try { 
	if (!window.openDatabase) { 
	  alert('not supported'); 
	} else { 
		//alert("open");
		var shortName = 'tinywings'; 
		var version = '1.0'; 
		var displayName = 'TinyWings Database'; 
		var maxSize = 65536; // in bytes 
		var db = openDatabase(shortName, version, displayName, maxSize); 
		return db;
	 }
  } catch(e) { 
	// Error handling code goes here. 
	if (e == INVALID_STATE_ERR) { 
	  // Version number mismatch. 
	  alert("Invalid database version."); 
	} else { 
	  alert("Unknown error "+e+"."); 
	} 
	return; 
  } 
}

// db error handler - prevents the rest of the transaction going ahead on failure
errorHandler = function (transaction, error) { 
  // returns true to rollback the transaction'
  //alert(error.message);
  return true;  
} 

// null db data handler
nullDataHandler = function (transaction, results) { } 

// create tables for the database

createTables = function() {

  try {

	mydb.transaction(

	  function(transaction) {
		//alert("before tables");
		transaction.executeSql('CREATE TABLE user(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL DEFAULT "", email TEXT NOT NULL DEFAULT "", transactionid TEXT NOT NULL DEFAULT "", roomid TEXT NOT NULL DEFAULT "");', [], nullDataHandler, errorHandler); 
		//alert("create tables");
		//transaction.executeSql('insert into user (id,name,roomid) VALUES (1,"Kylie Minogue","");', [], nullDataHandler, errorHandler); 

	  });

  } catch(e) {
	//alert(e.message);
	return;
  }
}

fetchUser = function()
{
    try {

        mydb.transaction(

          function(transaction) {
              transaction.executeSql('SELECT * FROM user ORDER BY name',[], function(transaction, results) {
                      // Handle the results 
                      if(results.rows.length > 0)
                      {
                          for (var i=0; i<results.rows.length; i++) { 
                            var row = results.rows.item(i); 
                            myroomid = row.roomid;
                           // alert(row.roomid);
                          } 
						 // alert("found person");
                      }
              }, errorHandler);
          });
    } catch(e) {
       //alert(e.message);
       return;
    }    
   
}

