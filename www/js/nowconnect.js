var enemy = {};
var myroomid = "";
var mytoken = "";
var mysecret = "";
var roomcreated = false;
var friendjoined = false;

var nowstarted = false;

function replacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}

function createRoom() {
    now.CreateRoom('6ad4368d368b43c6bb2368bd7666365b','fd790411d17d417eacf302cc12de357a',mytoken,myroomid);
}

function joinRoom() {
	//alert("joining Room");
    now.JoinRoom('6ad4368d368b43c6bb2368bd7666365b','fd790411d17d417eacf302cc12de357a',mytoken,myroomid);
}
window.now = nowInitialize("http://208.89.208.52:8080");

now.receiveMessage = function(name, message){
	
	var messageData = JSON.parse(message, function (key, value) {
		var type;
		if (value && typeof value === 'object') {
			type = value.type;
			if (typeof type === 'string' && typeof window[type] === 'function') {
				return new (window[type])(value);
			}
		}
		return value;
	});
	
	ig.log(name);
	if (now.name != name){
		switch (messageData.type){
			case "move"	:
				enemy.coord.y = messageData.y;
				enemy.coord.x = messageData.x;
				break;
			case "joined"	:
				break;
			
			default	:
				
				break;
		}
	}
}

now.start = function()
{
	nowstarted = true;
	//alert("started");
	if(roomcreated == true)
	{
		createRoom();
	}
	
	if(friendjoined == true)
	{
		joinRoom();
	}
	
	//now.CreateRoom('6ad4368d368b43c6bb2368bd7666365b','fd790411d17d417eacf302cc12de357a',mytoken,myroomid);
}

now.error = function(type,error)
{
	alert(type + ' :: '+ error);
}

now.roomCreated = function()
{
	 alert("Room Created");
	
}






