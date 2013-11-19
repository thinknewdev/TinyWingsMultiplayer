var db;
var dbCreated = false;

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady() {
    db = window.openDatabase("TinyWingsDB", "1.0", "TinyWingsDB", 200000);
	
    if (dbCreated)
	{
		//alert("Created");
		db.transaction(getFriends, transaction_error);
	} else {
		
		//alert("NOT");
    	db.transaction(populateDB, transaction_error, populateDB_success);
	}
}

function transaction_error(tx, error) {
	//$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getFriends, transaction_error);
}

function getFriends(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from friend e left join friend r on r.managerId = e.id " +
				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getFriends_success);
}

function getFriends_success(tx, results) {
	//$('#busy').hide();
	//alert("Boom");
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
		//alert("here");
    	var friend = results.rows.item(i);
		$('#friendList').append('<li data-theme="c"><a href="frienddetails.html?id=' + friend.id + '" data-transition="slide">' +
				friend.firstName + ' ' + friend.lastName + '</a></li>');
    }
    $('#friendList').listview('refresh');
	/*
	setTimeout(function(){
		scroll.refresh();
	},100);
	*/
	db = null;
}

function populateDB(tx) {
	//$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS friend');
	var sql = 
		"CREATE TABLE IF NOT EXISTS friend ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO friend (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Steven','Wells',4,'Software Architect','Engineering','617-000-0012','781-000-0012','swells@fakemail.com','Boston, MA','steven_wells.jpg')");
    tx.executeSql("INSERT INTO friend (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'Amy','Jones',5,'Sales Representative','Sales','617-000-0011','781-000-0011','ajones@fakemail.com','Boston, MA','amy_jones.jpg')");
    tx.executeSql("INSERT INTO friend (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Kathleen','Byrne',5,'Sales Representative','Sales','617-000-0010','781-000-0010','kbyrne@fakemail.com','Boston, MA','kathleen_byrne.jpg')");
}

//onDeviceReady();
