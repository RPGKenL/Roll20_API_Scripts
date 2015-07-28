/**
 * Copyright 2015: Ken L.
 * Licensed under the GPL Version 3 license.
 * http://www.gnu.org/licenses/gpl.html
 * 
 * This script is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Auto rolls iniatives for tokens that have the desired attribute, ignores
 * everything else. Adds them to the tracker and sorts it. If it already exists
 * on the tracker (the token id) then it merely alters the initiative of it.
 * 
 */
 
var AttrInit = (function() {
    var version = 0.4;
	var author = 'Ken L.';
	
	var fields = {
		feedbackName: 'AttrInit',
		feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/11101881/405iLsP67vYNBWEZxeRPKw/thumb.png?1438024460',
	};
	
	/**
	 * check if the character object exists, return first match
	 */
	var characterObjExists = function(name, type, charId) {
		var retval = null;
		var obj = findObjs({
			_type: type,
			name: name,
			_characterid: charId 
		});
		if (obj.length > 0)
			retval = obj[0];
		return retval;
	};
	
	/**
	 * Bang Bang! your're boolean!'
	 */
	var attrAdd = function(args, selected) {
		if (!args || !selected || selected.length < 1) {
			sendFeedback('<span style="color: red;">Bad syntax</span>');
			showHelp(); 
			return;
		}
		var token,
			journal,
			bonus;
		
		var modifiers = new Array(),
			amount = 0;
		_.each(selected,function(e) {
			token = getObj('graphic', e._id);
			if (!token || token.get('_subtype') != 'token' || !(journal = token.get('represents')))
				return;
			journal = getObj('character',journal);
			if (journal) {
				bonus = characterObjExists(args,'attribute',journal.get('_id'));
				if (bonus) {
					bonus = bonus.get('current');
					bonus = bonus.match(/\+*\-*\d+/);
					if (bonus && !isNaN(bonus[0])) {
						bonus = parseFloat(bonus[0]);
						++amount;
						modifiers.push({id: e._id, mod: bonus});
					}
				}
			}
		});
		sendChat('API','[['+amount+'d20]]',function(objs) {
			try {
				var results = objs[0].inlinerolls[0].results.rolls[0].results;
				if (results.length != modifiers.length) {
					sendFeedback('<span style="color: red; font-weight: bold;">Roll results don\'t match valid tokens</span>');
					return;
				}
				var content = '';
				var turnorder = Campaign().get('turnorder');
				var val;
				if (!turnorder) turnorder = [];
				else turnorder = JSON.parse(turnorder);
				for (var i=0; i<modifiers.length;++i) {
					token = getObj("graphic",modifiers[i].id);
					content += '<div>'
						+ '<table width="100%">'
						+ '<tr>'
						+ '<td width="40px"><div style="width: 40px; height: 40px;"><img src="'+token.get('imgsrc')+'"></img></div></td>'
						+ '<td width="100%"><div style="width: 100%; text-align: center;">' +(token.get('name') ? token.get('name'):'Creature')+'<br>[[' + results[i].v + '+' + modifiers[i].mod + ']]</div></td>'
						+ '</tr>'
						+ '</div>';
					if ((val = _.find(turnorder,function(elem) {return elem.id == modifiers[i].id}))) {
						val.pr = parseFloat(results[i].v+modifiers[i].mod);
					} else {
						turnorder.push({
							id: modifiers[i].id,
							pr: parseFloat(results[i].v+modifiers[i].mod)
						});
					}
				}
				turnorder.sort(function(a,b) {
					return b.pr-a.pr;
				});
				Campaign().set('turnorder',JSON.stringify(turnorder));
				sendFeedback(content);
			} catch (e) {
				sendFeedback('<span style="color: red;">Error processing roll</span>');
				log("AGI: Roll Error: " + JSON.stringify(objs));
			}
		});
		
		
	};
	
	/**
	 * Show help
	 */
	var showHelp = function() {
		var content = '<div style="background-color: #FFFFFF; border: 1px solid black; left-margin 5x; right margin 5px; padding-top: 5px; padding-bottom: 5px;">'
					+ '<div style="border-bottom: 1px solid black;">'
						+ '<span style="font-weight: bold; font-size: 150%">AttrInit v'+version+'</span>'
					+ '</div>'
					+ '<p>This script simply rolls initiatives for tokens whom have a defined attribute in its connected journal.</p>'
					+ '<div style="padding-left: 10px; padding-right: 10px;">'
						+ '<div>'
							+ '<span style="font-weight: bold;">!agi -help</span>'
						+ '</div>'
						+ '<li style="padding-left: 10px;">'
							+ 'Display this message'
						+ '</li>'
						+ '<div>'
							+ '<span style="font-weight: bold;">!agi</span>'
						+ '</div>'
						+ '<li style="padding-left: 10px;">'
							+ 'Syntax: !agi [attr]'
						+ '</li>'
						+ '<li style="padding-left: 10px;">'
							+ 'Example: !agi Init'
						+ '</li>'
						+ '<br><p>If the attribute name does not exist in the connected journal or is not given a numeric value, it will not be included in the initiative group.</p>'
					+ '</div>'
				+ '</div>';
		
		sendFeedback(content);
	};
	
	/**
	* Fake message is fake!
	*/
	var sendFeedback = function(msg) {
		var content = '/w GM '
				+ '<div style="position: absolute; top: 4px; left: 5px; width: 26px;">'
					+ '<img src="' + fields.feedbackImg + '">' 
				+ '</div>'
				+ msg;
			
		sendChat(fields.feedbackName,content);
	};
	
	var handleChatMessage = function(msg) { 
		var args = msg.content;
		var senderId = msg.playerid;
		var selected = msg.selected;
		var sender = msg.who.replace(/\(GM\)/,'').trim();

		if (msg.type == 'api'
		&& playerIsGM(senderId)
		&& args.indexOf('!agi') === 0) {
			args = args.replace('!agi','').trim();
			if (args.indexOf('-help') === 0) {
				showHelp();
			} else {
				attrAdd(args,selected);
			}
		} 
	};

	var registerAPI = function() {
		on('chat:message',handleChatMessage);
	};
 
	return {
		registerAPI: registerAPI
	};
 
}());

on("ready", function() {
	AttrInit.registerAPI();
});
