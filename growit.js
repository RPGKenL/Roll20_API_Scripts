/**
 * GrowIt
 * 
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
 * Grows a token using PF measurements
 * 
 */

var GrowIt = {
    version: 0.6.1,
    author: 'Ken L.',
    
    bonusEnum: Object.freeze({
        SCALAR: 1,
        SIGN: 2
    }),
    
    fields: {
        feedbackName: 'Ken L.',
        feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/3466065/uiXt3Zh5EoHDkXmhGUumYQ/thumb.jpg?1395313520',
    },
    
    /**
     * Get the bonus number in the string, carefully looking for signs to
     * preserve negatives and what not. TODO there's a Regex solution to this
     * which is way shorter.. also add type for scalars.
     */
    getBonusNumber: function(str,type) {
        if (!str) return null;
        if (!type) type = this.bonusEnum.SIGN;
        var retval = 0;
        var locStart = 0;
        var locEnd = str.length;
        var nums = null;
        
        str = str.replace(/\s/g,"");
        switch (type) {
            case this.bonusEnum.SCALAR:
                num = str.match(/\d+/);
                if (num)
                    retval = num[0];
                else
                    retval = "0";
                break;
            case this.bonusEnum.SIGN:
                num = str.match(/\+*\-*\d+/);
                if (num) {
                    if (null == num[0].match(/\+|\-/))
                        retval = "+" + num[0];
                    else
                        retval = num[0];
                } else
                    retval = "+0";
                break;
            default:
                // impossible
                return null;
        }
        return retval;
    },
    
    /**
     * Vitamin B12, grows token radially
     */
    doGrow: function(args, selected, exact) {
        if (!args || !selected || selected.length < 1) {
            this.sendFeedback('Incorrect syntax/selection');
            this.showHelp();
            return;
        } if (!exact) exact = false;
        var token = selected[0];
        var num = this.getBonusNumber(args,this.bonusEnum.SCALAR);
        var ft = num/5;
        token = getObj('graphic',token._id);
        if (token && token.get('_subtype') == 'token') {
            var width = token.get('width');
            var height = token.get('height');
            var top = token.get('top');
            var left = token.get('left');
            
            if (exact) {
                height = height*ft*2;
                width = width*ft*2;
                top -= height/(ft*4);
                left -= width/(ft*4);
                token.set('height',height);
                token.set('width',width);
                token.set('top',top);
                token.set('left',left);
            } else {
                height += height*ft*2;
                width += width*ft*2;
                token.set('height',height);
                token.set('width',width);
            }
            token.set('layer','map');
			toFront(token); 
        } else {
            this.sendFeedback('Bad syntax');
            this.showHelp();
        }
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
     * Show help
     */
    showHelp: function() {
        var content = null;
        
        content = '<div style="background-color: #FFFFFF; border: 1px solid black; left-margin 5x; right margin 5px; padding-top: 5px; padding-bottom: 5px;;">'
                    + '<div style="border-bottom: 1px solid black;">'
                        + '<span style="font-weight: bold; font-size: 150%">GrowIt v'+this.version+'</span>'
                    + '</div>'
                    + '<p><b style="color: red;">WARN</b> This script assumes that the graphic occupies a single unit, as it simply mutliplies existing dimensions.</p>'
                    + '<div style="padding-left: 10px; padding-right: 10px;">'
                        + '<div>'
                            + '<span style="font-weight: bold;">!growit -help</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Display this message'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!growit</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Syntax: !growit [radius in feet(5ft=1SQ)]'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!growit -exact</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'same syntax as !growit, but grows to the exact radius, <i>including</i> the center unit'
                        + '</li>'
                    + '</div>'
                + '</div>';
        
        this.sendFeedback(content);
    },
    
    /**
     * Handle chat messages
     */
    handleChatMessage: function(msg) {
        if (msg.content.indexOf('!growit') === 0) {
            var args = msg.content.replace('!growit','').trim();
            var selected = msg.selected;
            
            if (args.indexOf('-help') === 0) {
                this.showHelp();
            } else if (args.indexOf('-exact') === 0) {
                args = args.replace('-exact','').trim();
                this.doGrow(args,selected,true);
            } else {
                this.doGrow(args,selected);
            }
            
        }
    },
    
    /**
     * Register API
     */
    registerAPI: function() {
        // handle chat messages
        on('chat:message', function(msg) {
            GrowIt.handleChatMessage(msg);
        });
    },
    
};

on("ready", function() {
    GrowIt.registerAPI();
});
