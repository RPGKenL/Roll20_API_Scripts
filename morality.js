/**
 * Morality 1.00
 * 
 * Copyright 2015: Ken L.
 * Dual licensed under the MIT or GPL Version 3 licenses.
 * https://github.com/Roll20KenL/Roll20_API_Scripts/blob/master/morality.js
 * 
 * MIT: 
 * http://opensource.org/licenses/mit-license.php
 * GPL v3: 
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Syntax: 
 * 
 * !Morality p:(... I'm sure we can come to some agreement.):(bluff)%%r:(This is the last straw!):(intimidate)%%c:(Alfred looks on at you)
 * -- OR --
 * !Morality p:(... I'm sure we can come to some agreement.):(bluff)%%c:(Alfred looks on at you)
 * -- OR --
 * !Morality r:(This is the last straw!):(intimidate)%%c:(Alfred looks on at you)
 * -- OR --
 * !Morality p:(... I'm sure we can come to some agreement.):(bluff)
 * * -- OR --
 * 
 * skills section (bluff) and (intimidate) are optional fluff to ask for a 
 * skill related check. 
 * 
 * c:([some text here])
 * 
 * is the caption section and is completely optional, more geared for textual games
 * 
 * * * * * * * * * * * * * * * *
 * The following marcos are helpful.
 * * * * * * * * * * * * * * * *
 * 
 * Morality-Both
 * !Morality c:(?{caption})%%p:(?{paragon}):(?{paragon-skill})%%r:(?{renegade}):(?{renegade-skill})
 * 
 * Morality-Paragon
 * !Morality c:(?{caption})%%p:(?{paragon}):(?{paragon-skill})
 * 
 * Morality-Renegade
 * !Morality c:(?{caption})%%r:(?{renegade}):(?{renegade-skill})
 * 
 */

var Morality = {
    version: 1.00,
    author: 'Ken L.',
    
    fields: {
        feedbackName: 'Ken L.',
        feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/3466065/uiXt3Zh5EoHDkXmhGUumYQ/thumb.jpg?1395313520',
        
        renegadeImg: 'https://s3.amazonaws.com/files.d20.io/images/7778639/ojJ3lOP_mK98r2r4un-JhQ/thumb.png?1424253198',
        paragonImg: 'https://s3.amazonaws.com/files.d20.io/images/7778640/miQviRXq7Gu4XXLNFgNm8A/thumb.png?1424253205',
    },
    
    /**
     * Get either the token or journal image; journal image takes precedence. 
     */
    getDisplayImage: function(obj) {
        if (!obj) return null;
        var type = null;
        var charSheet = null;
        var charId = null;
        var res = null;
        if ((type=obj.get('_subtype')) !=null) {
           if (type == 'token') {
               res = obj.get("imgsrc");
                charSheet = obj.get('represents');
                if (charSheet != null) {
                    charSheet = getObj("character", charSheet);
                    if (charSheet) {
                        type = charSheet.get('avatar');
                        if (type && (type != '')) {
                            res = type;
                        }
                    }
                }
            }
        }
        return res;
    },
    
    processDialog: function(aryList,token) {
        if (!aryList) return null;
        var paragon = null;
        var renegade = null;
        var caption = null;
        
        try {
            for (elem in aryList) {
                if (aryList[elem][0]=='p')
                    paragon = aryList[elem].split(/:(?![^\(\)]*\))/);
                else if (aryList[elem][0]=='r')
                    renegade = aryList[elem].split(/:(?![^\(\)]*\))/);
                else if (aryList[elem][0]=='c')
                    caption = aryList[elem].match(/:\(.*\)/)[0].replace(/[\(\):]/g,'');
            }
            if (!paragon && !renegade)
                throw "ERROR: No Paragon/Renegade flags detected";
            if ((paragon && (paragon.length !=3)) || (renegade && (renegade.length !=3))) {
                throw "ERROR: Paragon or Renegade not properly formatted";
            }
            if (paragon)
                paragon = {
                    flag: paragon[0],
                    text: paragon[1].match(/\(.*\)/)[0].replace(/[\(\)]/g,''),
                    skill: paragon[2].match(/\(.*\)/)[0].replace(/[\(\)]/g,''),
                }
            if (renegade)
                renegade = {
                    flag: renegade[0],
                    text: renegade[1].match(/\(.*\)/)[0].replace(/[\(\)]/g,''),
                    skill: renegade[2].match(/\(.*\)/)[0].replace(/[\(\)]/g,''),
                }
        } catch (e) {
            throw "ERROR: bad format";
        }
        this.buildDisplay(paragon,renegade,caption,token);
    },
    
    buildDisplay: function(paragon,renegade,caption,token) {
        var content = "";
        var image = null;
        if ((image = this.getDisplayImage(token)) != null) {
            content = content
                + '<div style="margin-left: 20px; margin-right: 20px;">'
                    + '<img src="'+image+'">'
                + '</div>';
        }
        if (caption && caption != '') {
            content = content
                + '<div style="margin-left: 20px; margin-right: 20px; text-align: center; border-bottom: 2px solid black; background-color: #FFEDA7">'
                        + '"' +caption+ '"'
                + '</div>';
        }
        
        content += '<div style="clear: both; overflow: hidden;">';
        if (paragon)
        content = content
            + '<div style="text-align: left">'
                + '<img style="width: 40px; float: left;" src="'+this.fields.paragonImg+'"></img>'
                + '<p style="margin-left: 40px;">' + '<span style="color: #1040DF; height: 40px;">' + paragon.skill  +'</span> ' + paragon.text + '</p>'
            + '</div>';
        if (renegade)
        content = content
            + '<div style="text-align: right">'
                + '<img style="width: 40px; float: right;" src="'+this.fields.renegadeImg+'"></img>'
                + '<p style="margin-right: 40px;">' + renegade.text + ' <span style="color: #D10E24; height: 40px;">' + renegade.skill  +'</span>' + '</p>'
            + '</div>';
        content += '</div>';
        
        sendChat('Morality','/desc ' + content);
    },
    
    handleChatMessage: function(msg) {
        var msgTxt = msg.content;
        var args = null, token = null;
        if ((msg.type == "api")) {
            try {
                if (msg.selected && msg.selected.length > 0) {
                    token = getObj('graphic', msg.selected[0]._id);
                }
                if (msgTxt.indexOf('!Morality') === 0) {
                    args = msgTxt.replace('!Morality','').trim().toLowerCase();
                    args = args.split(/%%(?![^\(\)]*\))/);
                    if (args.length < 1 || args.length > 3) {
                        throw "ERROR: Bad args for Morality: '" + msg.content + "'";
                    }
                    this.processDialog(args,token);
                }
            } catch (e) {
                log(e);
                this.sendFeedback('<span style="color: #FF0000">'+e+'</span>');
                this.showHelp();
            }
        }
    },
    
    /**
     * Show help
     */
    showHelp: function() {
        var content = null;
        
        content = '<div style="background-color: #FFFFFF; border: 1px solid black; left-margin 5x; right margin 5px; padding-top: 5px; padding-bottom: 5ptyle="border-bottom: 1px solid black;">'
                        + '<span style="font-weight: bold; font-size: 150%">Morality v'+this.version+'</span>'
                    + '</div>'
                    + '<div style="padding-left: 10px; padding-right: 10px;">'
                        + '<div>'
                            + '<span style="font-weight: bold;">!Morality</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px; font-style: italic">'
                            + 'p:([paragon-text]):([paragon-skill])%%r:([renegade-text]):([renegade-skill])%%c:([caption-text])'
                        + '</li>'
                        + '<li style="padding-left: 10px; font-style: italic">'
                            + 'p:([paragon-text]):([paragon-skill]))%%c:([caption-text]'
                        + '</li>'
                        + '<li style="padding-left: 10px; font-style: italic">'
                            + 'r:([renegade-text]):([renegade-skill])'
                        + '</li>'
                    + '</div>'    
                + '</div>';
        this.sendFeedback(content);
    },
    
    /**
     * Fake message is fake!
     */
    sendFeedback: function(msg) {
        var content = '/w GM '
                + '<div style="position: absolute; top: 4px; left: 5px; width: 26px;">'
                    + '<img src="' + this.fields.feedbackImg + '">' 
                + '</div>'
                + msg;
        
        sendChat(this.fields.feedbackName,content);
    },
    
    /**
     * Register Roll20 handlers
     */
    registerAPI: function() {
        // handle messages
        on("chat:message", function(msg) {
            Morality.handleChatMessage(msg);
        });
    },
    
}


on("ready", function() {
    'use strict';
    Morality.registerAPI();
});

