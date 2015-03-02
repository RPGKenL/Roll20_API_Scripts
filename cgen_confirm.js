/**
 * Copyright (C) 2015 Ken L.
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
 * This script is designed to auto confirm criticals from the basic templates
 * included in CreatureGen.
 * 
 * <GITHUB LINK HERE>
 * 
 */

var crit_confirm = {
    critRange: {range: 20, multi: 2},
    dmgDieNum: 1,
    dmgDie: 6,
    dmgBonus: 0,
    dmgOriginal: 0,
    hasCrit: false,
    
    critTemplates: {
        tmpNorm: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7600346/9jIsZu3kQba0OUVvS4uyeA/thumb.png?1423393641"+'">'
            + '</div>'
            + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7600348/dIlZeMNavC1VnTXBjzMapw/thumb.png?1423393646"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                + '<div>'
                    + '<div style="color: #000000; font-style: italic; padding-top: 4px; padding-bottom: 4px; padding-left: 45px; padding-right: 45px">'
                        + '<span style="font-weight: bold;"><<TEXT>></span>'
                    + '</div>'
                + '</div>'
            + '</div>'
            + '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7600349/dvLfQ48nJ0oQdCRkuaeqhw/thumb.png?1423393650"+'">'
            + '</div>'
    },
    
    init: function() {
        this.critTmp = this.critTemplates.tmpNorm;
    },
    
    getCritRange: function(str) {
        if (!str) return {range: 20, multi: 2};
        var retval = null, multi = 2,range = 20,tmp = "";
        var terms = str.split("/");
        
        if (terms.length > 0) {
            for (var i = 0; i < terms.length; ++i) {
                if (terms[i].match(/×\d+/))
                    multi = terms[i].match(/\d+/g)[0];
                else if ((tmp=terms[i].match(/\d+-\d+/))) {
                    range = tmp[0].match(/\d+/g)[0];
                }   
            }
        }
    
        retval = {
            range: parseInt(range),
            multi: parseInt(multi)
        };
        return retval;
    },
    
    registerAPI: function(msg) {
        on("chat:message", function (msg) {
            var who = msg.who, id = msg.playerid, type = msg.type, 
                content = msg.content, inline = msg.inlinerolls,
                critInfo = null, posAtk = -1, baseroll = null,
                atk_bonus = null, disp = null, text = null,
                dieType = null;
            //log("message type: " + msg.type + " playerIsGM: " + playerIsGM(id) + " inline? " + (inline ? inline.length: "false") + " crit: " + crit_confirm.hasCrit);
            if (msg.type == 'desc' && (playerIsGM(id) || (id=='API')) && (inline && inline.length >= 2) && !crit_confirm.hasCrit) {
                posAtk = content.indexOf('Attack:');
                if (posAtk != -1) {
                    critInfo = content.substring(posAtk).match(/\([\d\-×/]+\)/);
                    if (critInfo != null) {
                        critInfo = critInfo[0];
                        critInfo = critInfo.replace(/\(|\)/g,"");
                    }
                    crit_confirm.critRange = crit_confirm.getCritRange(critInfo);
                    try {
                        //log(inline);
                        dieType = inline[0].results.rolls[0].sides;
                        baseroll = inline[0].results.rolls[0].results[0].v;
                        if (dieType != 20) {
                            return;
                        }
                        if (inline[0].results.rolls.length > 1)
                            atk_bonus = inline[0].results.rolls[1].expr;
                        else
                            atk_bonus = "+0";
                        
                        crit_confirm.dmgDieNum = inline[1].results.rolls[0].dice;
                        crit_confirm.dmgDie = inline[1].results.rolls[0].sides;
                        if (inline[1].results.rolls.length > 1)
                            crit_confirm.dmgBonus = inline[1].results.rolls[1].expr;
                        else
                            crit_confirm.dmgBonus = "+0";
                        if (crit_confirm.dmgBonus == null) crit_confirm.dmgBonus=0;
                        if (atk_bonus == null) atk_bonus=0;
                        crit_confirm.dmgBonus = parseInt(crit_confirm.dmgBonus);
                        crit_confirm.dmgOriginal = inline[1].results.total;
                        
                        //log ("atk " + atk_bonus + " dmg " + crit_confirm.dmgBonus);
                        if (baseroll >= crit_confirm.critRange.range) {
                            //text = 'Confirm: [[1d20'+(crit_confirm.critRange.range<20 ? ('cs>'+crit_confirm.critRange.range):'')+atk_bonus+']]';
                            text = 'Confirm: [[1d20'+atk_bonus+']]';
                            disp = crit_confirm.critTmp.replace("<<TEXT>>",text);
                            crit_confirm.hasCrit = true;
                            sendChat('Critical','/desc ' + disp);
                        }
                        else if (baseroll == 1) {
                            text = 'Failure: [[1d20'+atk_bonus+']]';
                            disp = crit_confirm.critTmp.replace("<<TEXT>>",text);
                            sendChat('Failure','/desc ' + disp);
                        }
                        
                    } catch (e) {
                        log ("Error: " + e );
                    }  
                }
            } else if ((id == 'API') && crit_confirm.hasCrit) {
                crit_confirm.hasCrit = false;
                text = "CritDamage: "
                        + "[["+ crit_confirm.dmgOriginal + "[original] + "+ crit_confirm.dmgDieNum*(Math.max(crit_confirm.critRange.multi-1,1))
                        + "d" + crit_confirm.dmgDie + " + " + parseInt(crit_confirm.dmgBonus)*(Math.max(crit_confirm.critRange.multi-1,1)) 
                        + "]]";
                disp = crit_confirm.critTmp.replace("<<TEXT>>",text);
                sendChat('CritDamage','/desc ' + disp);
            }
        });
        
    },
    
}

on("ready", function() {
    crit_confirm.init();
    crit_confirm.registerAPI();
});
