//Init vars
var pluginLogo, pluginIcon, websiteSdk, micGif, micAnimationGif, botAppId;
//Replace e.url & this.response).url to e.botsJs & this.response).botsJs
! function(e, t, n, r) {
	function s() {
		try {
			var e;
			if ((e = "string" == typeof this.response ? JSON.parse(this.response) : this.response).botsJs) {
				var n = t.getElementsByTagName("script")[0],
					r = t.createElement("script");
				r.async = !0, r.src = e.botsJs, n.parentNode.insertBefore(r, n)
			}
		} catch (e) {}
	}
	var o, p, a, i = [],
		c = [];
	e[n] = {
		init: function() {
			o = arguments;
			var e = {
				then: function(t) {
					return c.push({
						type: "t",
						next: t
					}), e
				},
				catch: function(t) {
					return c.push({
						type: "c",
						next: t
					}), e
				}
			};
			return e
		},
		on: function() {
			i.push(arguments)
		},
		render: function() {
			p = arguments
		},
		destroy: function() {
			a = arguments
		}
	}, e.__onWebMessengerHostReady__ = function(t) {
		if (delete e.__onWebMessengerHostReady__, e[n] = t, o)
			for (var r = t.init.apply(t, o), s = 0; s < c.length; s++) {
				var u = c[s];
				r = "t" === u.type ? r.then(u.next) : r.catch(u.next)
			}
		p && t.render.apply(t, p), a && t.destroy.apply(t, a);
		for (s = 0; s < i.length; s++) t.on.apply(t, i[s])
	};
	//Initiate init.txt file
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener("load", s),
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				botAppId = data.botAppId;
				pluginLogo = data.pluginLogo;
				pluginIcon = data.pluginIcon;
				websiteSdk = data.websiteSdk;
				micGif = data.micGif;
				micAnimationGif = data.micAnimationGif;
			}
		};
	xmlhttp.open("GET", "/stylesheets/init.txt", !0),
		xmlhttp.send();
	////////////////////////////////////////////////////////////////////////////////////
	/*	Original Commented Code	
	    var u = new XMLHttpRequest;
	    u.addEventListener("load", s),
		u.open("GET", r + "/init.txt", !0),
		u.responseType = "json",
		u.send()
	*/
}(window, document, "Bots", "bots-client-sdk-js");
//////////////////////////////////////////////////////////////////

//Get current date
function getCurrentDate() {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*(+2)));
    
    var dd = nd.getDate();
	var mm = nd.getMonth() + 1;
	var yyyy = nd.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var finalDate = dd + mm + yyyy;

    // return time as a string
    return finalDate;
}
//////////////////////////////////////////////////////////////////

//Database logger
function customLogger(userId, conversationId, jsonMessage, channelType, messageType, locale) {
	var jsonObject = {
		'user_id': userId,
		'conversation_id': conversationId,
		'json_message': JSON.stringify(jsonMessage),
		'channel_type': channelType,
		'message_type': messageType,
		'locale': locale
	}
//	request({
//		url: "https://botrestservices-mohalamalhopital.gbcom-south-1.oraclecloud.com/logger",
//		method: "POST",
//		json: true, // <--Very important!!!
//		body: jsonObject
//	}, function(error, response, body) {
//		if (!error && response.statusCode == 200) {} else {}
//	});
    
fetch('https://botrestservices-mohalamalhopital.gbcom-south-1.oraclecloud.com/logger', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonObject)
});
    
	return null;
}
//////////////////////////////////////////////////////////////////

//Get custom guid to log with unique userId
function guid() {
	var nav = window.navigator;
	var screen = window.screen;
	var guid = nav.mimeTypes.length;
	guid += nav.userAgent.replace(/\D+/g, '');
	guid += nav.plugins.length;
	guid += screen.height || '';
	guid += screen.width || '';
	guid += screen.pixelDepth || '';
	return guid;
};
//////////////////////////////////////////////////////////////////

//Transform webChat json to custom json to log
function parseMessage(mainMessage) {
var parsedMessage = {};
parsedMessage['texts'] = []
parsedMessage['cards'] = []
parsedMessage['globalActions'] = []
for (var i = 0; i < mainMessage.length; i++) {
	if (mainMessage[i] && mainMessage[i].text && !mainMessage[i].actions && !mainMessage[i].items) {
		parsedMessage.texts.push({
			"text": mainMessage[i].text ? mainMessage[i].text : null,
            "postback":  mainMessage[i].postback ? mainMessage[i].postback : null,
			"type": mainMessage[i].type ? mainMessage[i].type : null
		})
	}
	if (mainMessage[i] && mainMessage[i].items) {
		for (var x = 0; x < mainMessage[i].items.length; x++) {
			var actions = [];
			if (mainMessage[i].items[x].actions) {
				for (var y = 0; y < mainMessage[i].items[x].actions.length; y++) {
					actions.push({
						"text": mainMessage[i].items[x].actions[y].text ? mainMessage[i].items[x].actions[y].text : null,
						"payload": mainMessage[i].items[x].actions[y].payload ? mainMessage[i].items[x].actions[y].payload : null,
						"uri": mainMessage[i].items[x].actions[y].uri ? mainMessage[i].items[x].actions[y].uri : null,
						"type": mainMessage[i].items[x].actions[y].type ? mainMessage[i].items[x].actions[y].type : null
					})
				}
			}
			parsedMessage['cards'].push({
				"title": mainMessage[i].items[x].title ? mainMessage[i].items[x].title : null,
				"description": mainMessage[i].items[x].description ? mainMessage[i].items[x].description : null,
				"actions": actions ? actions : null
			})
			actions = [];
		}
	}
	if (mainMessage[i] && mainMessage[i].actions) {
		var actions = [];
		for (var x = 0; x < mainMessage[i].actions.length; x++) {
			actions.push({
				"label": mainMessage[i].actions[x].text ? mainMessage[i].actions[x].text : null,
			})
		}
		parsedMessage.texts.push({
			"text": mainMessage[i].text ? mainMessage[i].text : null
		})
		parsedMessage.globalActions.push({
			"actions": actions ? actions : null
		})
	}
}
	return parsedMessage;
};
//////////////////////////////////////////////////////////////////

//Load appId from localStorage
function loadAppId() {
	var appId = window.localStorage.getItem("appId");
	if (appId) {
		document.getElementById("appId").value = appId;
	}
}
//////////////////////////////////////////////////////////////////

//Save appId into localStorage
function saveAppId(e) {
	e.preventDefault();
	let appId = document.getElementById("appId").value;
	console.log('Validate appId', appId);
	// validate app id
	initBots(appId).then(function() {
		console.log('AppId is valid');
		window.localStorage.setItem("appId", appId);
		window.location.href = "home.html";
		document.getElementById("loader").style.display = "none";
	}).catch(function(err) {
		document.getElementById("loader").style.display = "none";
		document.getElementsByClassName("error")[0].style.display = 'block';
		console.log('AppId validating error', err);
	});
}
//////////////////////////////////////////////////////////////////

//Load chat
function loadChat(e) {
	e.preventDefault();
	console.log('Init Bots SDK');
	// var appId = window.localStorage.getItem("appId");
	if (botAppId === undefined) {
		////////////////////////////////////////////////////////////////////////////////////	
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				botAppId = data.botAppId;
				var appId = botAppId;
				initBots(appId).then(function() {
					console.log("init complete");
					if (Bots.getConversation().messages.length > 2) {
						iframe.style.display = 'initial';
					}
					//  document.getElementById("loader").style.display = "none";
					//  Bots.open();
					//  document.getElementById("openChatButton").setAttribute("disabled", true)
				}).catch(function(err) {
					console.log(err);
				});
			}
		};
		xmlhttp.open("GET", "/stylesheets/init.txt", !0),
			xmlhttp.send();
		////////////////////////////////////////////////////////////////////////////////////
	} else {
		var appId = botAppId;
		initBots(appId).then(function() {
			console.log("init complete");
			if (Bots.getConversation().messages.length > 2) {
				iframe.style.display = 'initial';
			}
			//  document.getElementById("loader").style.display = "none";
			//  Bots.open();
			//  document.getElementById("openChatButton").setAttribute("disabled", true)
		}).catch(function(err) {
			console.log(err);
		});
	}
}
//////////////////////////////////////////////////////////////////

// This event triggers when the user opens the plugin
Bots.on('widget:opened', function() {
	//	console.log(">>>>>>>>> USER " + JSON.stringify(Bots.getUser()));
});
//////////////////////////////////////////////////////////////////

// This event triggers when the plugin is disconnected
Bots.on('disconnected', function() {
	//	console.log(">>>>>>>>> disconnected");
});
//////////////////////////////////////////////////////////////////

// This event triggers when the plugin is connected
Bots.on('connected', function() {
	//	console.log(">>>>>>>>> connected");
});
//////////////////////////////////////////////////////////////////

// This event triggers when the user receives a message
Bots.on('message:received', function(message) {
//	console.log('the user received a message', JSON.stringify(message));
    customLogger(guid(), (guid() + getCurrentDate()), parseMessage([message]), 'C', 'O', 'EN')
//	console.log("###########################################")
//	console.log("Message Content >>>>>> ", message.text ? message.text : message.actions)
//	console.log("Message Type >>>>>> ", message.type)
//	console.log("UserId >>>>>> ", guid())
//	console.log("Conversation Id >>>>>> ", guid() + getCurrentDate())
//	console.log("Conversation Type >>>>>> ", 'INBOUND')
//	console.log("Channel >>>>>> ", 'Web')
//	console.log("###########################################")
});
//////////////////////////////////////////////////////////////////

// This event triggers when the user sends a message
Bots.on('message:sent', function(message) {
//console.log('the user sent a message', JSON.stringify(message));
    customLogger(guid(), (guid() + getCurrentDate()), parseMessage([message]), 'C', 'I', 'EN')
//	console.log("###########################################")
//	console.log("Message Label >>>>>> ", message.text);
//	console.log("Message Payload >>>>>> ", message.payload ? message.payload : message.text);
//	console.log("Message Type >>>>>> ", message.payload ? 'postback' : 'text')
//	console.log("UserId >>>>>> ", guid())
//	console.log("Conversation Id >>>>>> ", guid() + getCurrentDate())
//	console.log("Conversation Type >>>>>> ", 'OUTBOUND')
//	console.log("Channel >>>>>> ", 'Web')
//	console.log("###########################################")
});
//////////////////////////////////////////////////////////////////

//Clear chat - Not used
function clearChat(e) {
	e.preventDefault();
	var keys = Object.keys(localStorage);
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === 'appId') {
			continue;
		}
		localStorage.removeItem(keys[i]);
	}
	location.reload();
}
//////////////////////////////////////////////////////////////////

//This function to make any link button opens as an iframe - not finished yet
function replaceByValue(json, field, oldvalue, newvalue) {
    
    for(var i = 0 ; i < json.items.length ; i ++){
        if(json.items[i].actions[0].type == oldvalue){
	json.items[i].actions[0].type = newvalue;
	json.items[i].actions[0]["fallback"] = json.items[i].actions[0].uri
	json.items[i].actions[0]["size"] = "full";
        }
    }
	return json;
}
//////////////////////////////////////////////////////////////////

//Plugin delegation
const delegate = {
	beforeDisplay(message) {
	//	console.log(">>>>>> " + JSON.stringify(message));
		if (message.text == "Get Started" && message.role == "appUser" || message.text == "plugin help") {
			return null;
		} else {
			iframe.style.display = 'initial';
			//     console.log(" MESSAGE >>>>>> "+JSON.stringify(message))
			if (message.text == "do_feedback") {
				return {
					"text": "Your opinion matters",
					actions: [{
						type: 'webview',
						text: 'CIB - Give Feedback',
						size: 'full',
						openOnReceive: 'true',
						uri: 'https://insuranceboteg.herokuapp.com/survey',
						fallback: 'https://insuranceboteg.herokuapp.com/survey'
					}],
					"type": "text",
					"role": "appMaker",
					"received": message.received,
					"authorId": message.authorId,
					"avatarUrl": message.avatarUrl,
					"_id": message._id,
					"source": {
						"type": "api"
					},
					"firstMessageOfDay": message.firstMessageOfDay,
					"firstInGroup": message.firstInGroup,
					"shouldShowAuthor": message.shouldShowAuthor,
					"lastInGroup": message.lastInGroup,
					"shouldShowAvatar": message.shouldShowAvatar
				};
			} else if (message.items && message.items[0].actions[0] && message.items[0].actions[0].type == "link") {
		//		console.log(" LINK >>>>>> " + JSON.stringify(message))
				return replaceByValue(message, 'type', 'link', 'webview');
			} else {
				//console.log(" MESSAGE >>>>>> " + JSON.stringify(message))
				return message;
			}
		}
	},
	beforeSend(message) {
		return message;
	},
	beforePostbackSend(postback) {
		//todo
		//Call logs
		/*    
		fetch('https://api.ipify.org')     // Local IP address
		    .then(function(response) { 
		        if (response.ok) {
		            console.log("Got it");
		        } else {
		            console.log("Error");
		        }
		    });    
		*/
var message = {"text": postback.postback.actionLabel , "postback": postback.postback.actionPayload , "type" : 'postback'}       
        customLogger(guid(), (guid() + getCurrentDate()), parseMessage([message]), 'C', 'I', 'EN')
//		console.log("###########################################")
//		console.log("Message Label >>>>>> ", postback.postback.actionLabel);
//		console.log("Message Payload >>>>>> ", postback.postback.actionPayload);
//		console.log("Message Type >>>>>> ", 'postback')
//		console.log("UserId >>>>>> ", guid())
//		console.log("Conversation Id >>>>>> ", guid() + getCurrentDate())
//		console.log("Conversation Type >>>>>> ", 'OUTBOUND')
//		console.log("Channel >>>>>> ", 'Web')
//		console.log("###########################################")
		return postback;
	}
}
//////////////////////////////////////////////////////////////////

//Initiate the plugin
function initBots(appId) {
	return Bots.init({
		appId: appId,
		menuItems: {
			imageUpload: false,
			fileUpload: false,
			shareLocation: true // False to hide mic button
		},
		fixedIntroPane: true,
		linkedEnabled: false,
		// locale: 'en-US',
		soundNotificationEnabled: false,
		// imageUploadEnabled: true,
		// displayStyle: 'button',
		buttonIconUrl: pluginIcon,
		// buttonWidth: '58px',
		// buttonHeight: '58px',
		businessName: 'Zaki The Bot',
		businessIconUrl: pluginLogo,
		customColors: {
			brandColor: '0051a5',
			conversationColor: '0051a5',
			actionColor: '0051a5',
		},
		customText: {
			// actionPostbackError: 'An error occurred while processing your action. Please try again.',
			// clickToRetry: 'Message not delivered. Click to retry.',
			// conversationTimestampHeaderFormat: 'MMMM D YYYY, h:mm A',
			// fetchHistory: 'Load more',
			// fetchingHistory: 'Retrieving history...',
			headerText: 'How can we help ?',
			// inputPlaceholder: 'Type a message...',
			// invalidFileError: 'Only images are supported. Choose a file with a supported extension (jpg, jpeg, png, gif, or bmp).',
			introductionText: 'Your Personal Virtual Assistant',
			// locationNotSupported: 'Your browser does not support location services or it’s been disabled. Please type your location instead.',
			// locationSecurityRestriction: 'This website cannot access your location. Please type your location instead.',
			// locationSendingFailed: 'Could not send location',
			// locationServicesDenied: 'This website cannot access your location. Allow access in your settings or type your location instead.',
			// messageError: 'An error occurred while sending your message. Please try again.',
			// messageIndicatorTitlePlural: '({count}) New messages',
			// messageIndicatorTitleSingular: '({count}) New message',
			// messageRelativeTimeDay: '{value}d ago',
			// messageRelativeTimeHour: '{value}h ago',
			// messageRelativeTimeJustNow: 'just now',
			// messageRelativeTimeMinute: '{value}m ago',
			// messageTimestampFormat: 'hh:mm A',
			// messageSending: 'Sending...',
			// messageDelivered: 'Delivered',
			// sendButtonText: 'Send',
			// settingsHeaderText: 'Settings',
			// tapToRetry: 'Message not delivered. Tap to retry.',
			// unsupportedMessageType: 'Unsupported message type.',
			// unsupportedActionType: 'Unsupported action type.'
		}
	}).then(function(res) {
		Bots.startConversation();
		if (Bots.getConversation().messages != null && Bots.getConversation().messages.length < 1) {
			Bots.sendMessage('Get Started');
		}
		Bots.setDelegate(delegate);
		//    var hideScript = document.createElement('script');
		//    hideScript.type = 'text/javascript';
		//    hideScript.text = 'document.querySelector(".message-input").addEventListener("mousemove", function() {console.log("heeey")})';
        
		//AutoComplete Listeners
		var hideScript = document.createElement('script');
		hideScript.type = 'text/javascript';
		hideScript.text = 'document.querySelector(".message-input").addEventListener("keydown", function myFunction(e) {e = e || window.event;if (e.keyCode == "40") { if(document.getElementById("IP_temp_listBox")){ document.getElementById("IP_temp_listBox").focus(); document.getElementById("IP_temp_listBox").selectedIndex = 0; } }else if(e.keyCode == "13" && !e.shiftKey && document.querySelector(".send.active")){document.querySelector(".send.active").className ="send";} else if(e.keyCode == "38"){if(document.getElementById("IP_temp_listBox")){ document.getElementById("IP_temp_listBox").focus(); var options = document.getElementById("IP_temp_listBox").options; document.getElementById("IP_temp_listBox").selectedIndex = options.length -1; }}})';
		var hideScript2 = document.createElement('script');
		hideScript2.type = 'text/javascript';
		hideScript2.text = 'document.onkeydown = keyhandler;function keyhandler(evt) { evt = evt || window.event ; var isEscape = false;if(evt.keyCode == "13"){if(document.getElementById("IP_temp_listBox") && document.getElementById("IP_temp_listBox").value !=""){ document.getElementById("textAreaTags").value = document.getElementById("IP_temp_listBox").value; var elem = document.getElementById("IP_temp_listBox"); elem.parentNode.removeChild(elem); document.getElementById("textAreaTags").focus(); }else{var elem = document.getElementById("IP_temp_listBox"); elem.parentNode.removeChild(elem); document.getElementById("textAreaTags").focus();}}else if (evt.keyCode == "8"){if(document.getElementById("textAreaTags").value.length == "1" && document.getElementById("IP_temp_listBox")){ var elem = document.getElementById("IP_temp_listBox"); elem.parentNode.removeChild(elem); document.getElementById("textAreaTags").focus(); }else{ IP_autoComplete("#where is the nearest branch,where is the nearest atm,loan calculator,branch location,atm location,اين اقرب فرع بنك,اين اقرب ماكينة صراف الي,حاسبة القروض,main menu,restart conversation,القائمة الرئيسية","textAreaTags","autoCompleteDiv",this ,"") }} else if ("key" in evt) { isEscape = (evt.key === "Escape" || evt.key === "Esc"); } else { isEscape = (evt.keyCode === "27"); } if (isEscape && document.getElementById("IP_temp_listBox")) {try { var elem = document.getElementById("IP_temp_listBox"); elem.parentNode.removeChild(elem);}catch(err) { document.getElementById("textAreaTags").focus;} }}';
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Voice Recognition Scripts
		var hideScript3 = document.createElement('script');
		hideScript3.type = 'text/javascript';
		hideScript3.text = 'function upgrade() {console.log("Upgrade");} function capitalize(s) {return s.replace(first_char, function(m) {return m.toUpperCase();});} function startMic() {if (recognizing) {recognition.stop();return;}final_transcript = "";recognition.lang = "ar-EG";recognition.start();ignore_onend = false;textAreaTags.innerHTML = "";}';
		var hideScript5 = document.createElement('script');
		hideScript5.type = 'text/javascript';
		hideScript5.text = "var final_transcript = '';var recognizing = false;var ignore_onend;if (!('webkitSpeechRecognition' in window)) { console.log('########## Not Available')} else { console.log('########### Available');var recognition = new webkitSpeechRecognition();recognition.continuous = true;recognition.interimResults = true;recognition.onstart = function() {recognizing = true;document.getElementById('mic_button').style.backgroundImage = 'url(" + micAnimationGif + ")';document.getElementById('mic_button').style.marginLeft = '3px';};recognition.onerror = function(event) {if (event.error == 'no-speech') {ignore_onend = true;}if (event.error == 'audio-capture') {ignore_onend = true;}if (event.error == 'not-allowed') {ignore_onend = true;}};recognition.onend = function() {recognizing = false;if (ignore_onend) {return;}document.getElementById('mic_button').style.backgroundImage = 'url(" + micGif + ")'; document.getElementById('mic_button').style.marginLeft = '10px'; if (!final_transcript) {return;}if (window.getSelection) {window.getSelection().removeAllRanges();var range = document.createRange();range.selectNode(document.getElementById('textAreaTags'));window.getSelection().addRange(range);}};recognition.onresult = function(event) {var interim_transcript = '';for (var i = event.resultIndex; i < event.results.length; ++i) {if (event.results[i].isFinal) {final_transcript += event.results[i][0].transcript;document.getElementById('textAreaTags').value =final_transcript;document.getElementById('textAreaTags').focus(); document.querySelector('.send').className ='send active';} else {interim_transcript += event.results[i][0].transcript;document.getElementById('textAreaTags').value=interim_transcript;}}};}";
		var hideScript4 = document.createElement('script');
		hideScript4.type = 'text/javascript';
		hideScript4.text = 'document.querySelector(".mic_button").addEventListener("click", startMic)';
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		var stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = websiteSdk;
		iframe = document.querySelector('iframe#web-messenger-container');
		iframe.style.display = 'initial';
		iframe.contentDocument.head.appendChild(stylesheet);
//		iframe.contentDocument.head.appendChild(hideScript);
//		iframe.contentDocument.head.appendChild(hideScript2);
		iframe.contentDocument.head.appendChild(hideScript3);
		iframe.contentDocument.head.appendChild(hideScript5);
		iframe.contentDocument.head.appendChild(hideScript4);
		Bots.updateUser({
			"givenName": guid(),
			"surname": "",
			"email": "",
			"properties": {
				"pluginUserId": guid(),
			}
		}).catch(function(err) {
			console.error(err);
		});
	});
}
//////////////////////////////////////////////////////////////////