var map, originVar, destinationVar, transitObject, originVarx, destinationVarx, endinst, latitude, longitude;
var vehicles = [], fullroute = [], userid, searchtemp, lmaddtheme="", mmaddtheme="", usertheme="";
var alternative = false, gotlocation = false, isfullrouteset=false,setad=false;
var currentdiv='';
var currentRSdiv='';
var sharelinks = '';

var emojis = ["smile","happy-1","happy-2","happy","ninja","quiet","surprised","suspicious","wtf"];
$('#cbutton').on('click', function() {
	scrollDown();
	var usertext = $('#chatinput').val();
	if(usertext!=="") {
		var messagediv = document.createElement('div');
		messagediv.className = 'messagediv';
		var mymessage = document.createElement('div');
		mymessage.className = 'mymessage'+mmaddtheme;
		mymessage.innerHTML = usertext;
		var msgtime = document.createElement('span');
		msgtime.className = 'msgtime';
		var msgtimeimg = document.createElement('img');
		msgtimeimg.className = 'readmsg';
		msgtimeimg.setAttribute('src', 'images/icons/read.svg');
		msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
		mymessage.appendChild(msgtime);
		mymessage.appendChild(msgtimeimg);

		messagediv.appendChild(mymessage);
		document.getElementById('chatarea').appendChild(messagediv);
		scrollDown();
		if (!alternative)
			processQueryx();
		else showAlternative();
		$('#chatinput').val('');
	}
});

function processyc(location) {
	$('#chatinput').val(location);
	processQueryx();
	$('#chatinput').val('');
}

$('#chatinput').keypress(function (e) {
	if (e.which == 13) {
		scrollDown();
		var usertext = $('#chatinput').val();
		if(usertext!=="") {
			var messagediv = document.createElement('div');
			messagediv.className = 'messagediv';
			var mymessage = document.createElement('div');
			mymessage.className = 'mymessage'+mmaddtheme;
			mymessage.innerHTML = usertext;
			var msgtime = document.createElement('span');
			msgtime.className = 'msgtime';
			var msgtimeimg = document.createElement('img');
			msgtimeimg.className = 'readmsg';
			msgtimeimg.setAttribute('src', 'images/icons/read.svg');
			msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
			mymessage.appendChild(msgtime);
			mymessage.appendChild(msgtimeimg);

			messagediv.appendChild(mymessage);
			document.getElementById('chatarea').appendChild(messagediv);
			scrollDown();
			if (!alternative)
				processQueryx();
			else showAlternative();
			$('#chatinput').val('');
		}
		return false;    //<---- Add this line
	}
});
$('#getloc').on('click', function() {
	locator();
});
$('.emoji').on('click', function() {
	sendemoji(this.id);
});

$('#emojies').on('click', function() {
	$('#emojigroup').slideToggle();
});
$('#menucont').on('click', function() {
	$('#menucont').toggle();
});
$('.menuicon').on('click', function() {
	$('#menucont').toggle();
});

function checkboth() {
	if ($("#start").val() && $("#end").val())
		return true;
	else return false;
}

function newDiv() {
	var iDiv = document.createElement('div');
	iDiv.id = 'block'+countr;
	currentdiv = iDiv.id;
	directions = document.getElementById('directions');
	// The variable iDiv is still good... Just append to it.
	directions.appendChild(iDiv);
	countr++;
}

function addmessage(msg) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	laramessage.innerHTML = msg;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	laramessage.appendChild(msgtime);
	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
}

function addimage(img) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	laramessage.appendChild(img);
	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
}

function sendemoji(eid) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var mymessage = document.createElement('div');
	mymessage.className = 'mymessage'+mmaddtheme;
	var emojimsg = document.createElement('div');
	emojimsg.className = 'emojimsg '+eid;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	var msgtimeimg = document.createElement('img');
	msgtimeimg.className = 'readmsg';
	msgtimeimg.setAttribute('src', 'images/icons/read.svg');
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	mymessage.appendChild(emojimsg);
	mymessage.appendChild(msgtime);
	mymessage.appendChild(msgtimeimg);

	messagediv.appendChild(mymessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
	replyemoji(eid);
	
	var emojies = document.getElementById('emojigroup');
	emojies.style.display='none';
}


function replyemoji(eid) {
	switch(eid) {
			case "smile":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy-1":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy-2":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "in-love":
				randx = Math.floor(Math.random() * 4)+5;
				myeid = emojis[randx];
			break;
			case "ninja":
				randx = Math.floor(Math.random() * 4);
				myeid = emojis[randx];
			break;
			case "quiet":
				randx = Math.floor(Math.random() * 9);
				myeid = emojis[randx];
			break;
			case "surprised":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "suspicious":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "sad":
				randx = Math.floor(Math.random() * 3)+5;
				myeid = emojis[randx];
			break;
			case "unhappy":
				randx = Math.floor(Math.random() * 3)+5;
				myeid = emojis[randx];
			break;
			case "wtf":
				randx = Math.floor(Math.random() * 9);
				myeid = emojis[randx];
			break;
		}

	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	var emojimsg = document.createElement('div');
	emojimsg.className = 'emojimsg '+myeid;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	laramessage.appendChild(emojimsg);
	laramessage.appendChild(msgtime);

	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
} 

