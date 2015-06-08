/**
 * 
 * Copyright (C) 2015 Ken L.
 * Licensed under the GPL Version 3 license.
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Contributors:
 * Andy W.
 * Shu Zong C.
 * Carlos R. L. Rodrigues
 * 
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
 * This script is designed to parse stat blocks from the pathfinder PRD which are
 * formatted in a very particular way. Know that there will be edge cases which
 * are not handled due to the large varity of conditions.
 * 
 * It is charactersheet agnostic as it simply creates ability fields and marcos for
 * the provided statblock. It is also light-weight simply (if enabled) linking or
 * reminding a GM of information or abilities a creature has.
 * 
 * If copying stat blocks from PDFs or other Paizo or Paizo compatible sources,
 * ensure that they fit the PRD specified layout (1 line per ability etc), when
 * in doubt, copy it into a text editor and confirm what you copied fits the PRD
 * format.
 * 
 * If all else fails, it's probably an edge case I didn't consider; or the stat 
 * block is malformed. Feel free to patch up the holes and commit to the git-hub to
 * make the script better for everyone.
 * 
 * https://github.com/Roll20KenL/Roll20_API_Scripts/blob/master/cgen.js
 * 
 */

var CreatureGenPF = {
    version: 1.21,
    author: "Ken L.",
    contributers: "Andy W., Shu Zong C., Carlos R. L. Rodrigues",
    debugLvl: 1,
    locked: false,
    dmesg: null,
    warn: null,
    rawData: null,
    data: null,
    creName: null,
    character: null,
    
    
    termEnum: Object.freeze({
        GENERAL : 1,
        MONABILITY: 2,
        SPELL: 3,
        FEAT: 4,
        SQ: 5,
        SA: 6,
        SKILL: 7
    }),
    
    bonusEnum: Object.freeze({
        SCALAR: 1,
        SIGN: 2
    }),
    
    urlCondEnum: Object.freeze({
        FULL: "FULL",
        LABEL: "LABEL"
    }),
    
    atkEnum: Object.freeze({
        TITLE: 'TITLE',
        ATTACK: 'ATTACK',
        DAMAGE: 'DAMAGE'
    }),
    
    /**
     * Various fields that can be changed for customization
     * 
     */
    fields: {
        defaultName: "Creature",
        publicName: "@{name}",
        publicEm: "/emas ",
        publicAtkEm: "/as Attack ",
        publicDmgEm: "/as Damage ",
        publicAnn: "/desc ",
        privWhis: "/w GM ",
        menuWhis: "/w GM ",
        resultWhis: "/w GM ",
        urlTermGeneral: '<a href="http://www.google.com/cse?cx=006680642033474972217%3A6zo0hx_wle8&q=<<FULL>>"><span style="color: #FF0000; font-weight: bold;"><<LABEL>></span></a>',
        //urlTermGeneral: '<a href="http://www.d20pfsrd.com/system/app/pages/search?scope=search-site&q=<<FULL>>"><span style="color: #FF0000; font-weight: bold;"><<LABEL>></span></a>',
        urlTermMonAbility: '<a href="http://paizo.com/pathfinderRPG/prd/additionalMonsters/universalMonsterRules.html#<<FULL>>"><span style="color: #2F2F2F; font-weight: bold;"><<FULL>></span></a>',
        urlTermSpell: '<a href="http://www.d20pfsrd.com/magic/all-spells/<<0>>/<<FULL>>"><span style="color: #2E39FF; font-weight: bold;"><<LABEL>></span></a>',
        urlTermFeat: '<a href="http://www.google.com/cse?cx=006680642033474972217%3A6zo0hx_wle8&q=<<FULL>>"><span style="color: #29220A; font-weight: bold;"><<FULL>></span></a>',
        urlTermSQ: "", // unused
        urlTermSA: "", // unused
        summoner: null,
        shortAtkRiders: false // unused
    },
    
    /**
     * div border styles, customize it for your game! 
     * 
     * <span [[format text injected here]]> penguins </span>
     * <img src="[[image link]]">"
     */
    design: {
        feedbackName: 'Ken L.',
        feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/3466065/uiXt3Zh5EoHDkXmhGUumYQ/thumb.jpg?1395313520',
        errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
        warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
        successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',
        
        skillTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        skillLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7816000/-QKJOJF6UFmDAEypDGeXcw/thumb.png?1424460624',
        skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7816002/nKEWcTQ2VjcRJqrfiMHg_w/thumb.png?1424460630',
        skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7816003/lcNufMB1JeLmdDVPJ0KFdQ/thumb.png?1424460634',
        
        spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        spellBookLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7834797/n4P8Ys6gHoKmVlBTRYoi9Q/thumb.png?1424540093',
        spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7834799/LOJaPHkZcUDyekpMnm0-Cg/thumb.png?1424540096',
        spellBookMidOvr: 'https://s3.amazonaws.com/files.d20.io/images/7836432/fi7Bw5cRaMfq0fjBZZ7ggg/thumb.png?1424544220',
        spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7834800/ORBbrVuMO7Ns2UoPRmvfRg/thumb.png?1424540099',
        
        spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        spellLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7382439/dJ-jaPdm6kEtl9lE__ve-g/thumb.png?1422405849',
        spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7382437/FYBtfPgkj4b3Q_hLkUk5Gg/thumb.png?1422405847',
        spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7382435/DXm7UUdLKNnF6ktFfVojWA/thumb.png?1422405843',
        
        specialTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        specialLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7816913/PsSBFlCv3IlPzGP0usiVBw/thumb.png?1424464282',
        specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7816781/0g1qpdJ80DTvpSHqQ2-7oA/thumb.png?1424463781',
        specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7816784/aZ1OFXDsO2BUM5G9oiXpgw/thumb.png?1424463791',
        
        atkTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        atkLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7816913/PsSBFlCv3IlPzGP0usiVBw/thumb.png?1424464282',
        atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7816781/0g1qpdJ80DTvpSHqQ2-7oA/thumb.png?1424463781',
        atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7816784/aZ1OFXDsO2BUM5G9oiXpgw/thumb.png?1424463791',
        
        atkMenuTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        atkMenuLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7816912/WWQxo9xFhc-vETYw79f0wA/thumb.png?1424464275',
        atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7816781/0g1qpdJ80DTvpSHqQ2-7oA/thumb.png?1424463781',
        atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7816783/m3UhKz4plb_0TB1kUOAI1Q/thumb.png?1424463787',
        
        genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
        genLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
        genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7816014/jpO1FF9pA7Ipi__sFQAAMw/thumb.png?1424460680',
        genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7816016/0XT65Rctt1imgamKQUO6sg/thumb.png?1424460684',
        genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7816023/T6uTWEX4aMDL-78lhSLanw/thumb.png?1424460752',
    },
    
    atkTemplate: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                    + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7926600/1gnY_LsAt4UHnkJmI3PAlA/thumb.png?1424966062"+'">'
                + '</div>'
                + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7926601/79qaHPngD_d9MFVlrNTB8w/thumb.png?1424966067"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                    + '<div>'
                        + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                            + '<span style="font-weight: bold;"><<TITLE>></span>'
                        + '</div>'
                        + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                            + '<table style="width: 140px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
                                + '<tr>'
                                    + '<td>' + 'Attack:' + '</td>'
                                    + '<td>' + '<<ATTACK>>' + '</td>'
                                + '</tr>'
                                + '<tr>'
                                    + '<td>' + 'Damage:' + '</td>'
                                    + '<td>' + '<<DAMAGE>>' + '</td>'
                                + '</tr>'
                            + '</table>'
                        +' </div>'
                    + '</div>'
                + '</div>'
                + '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                    + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7926602/lMjFWWNyFpUlbk80HqkeOQ/thumb.png?1424966073"+'">'
                + '</div>',
                
    menuTemplate: {
        boundryImg: _.template('<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                    + '<img src="<%= imgLink %>">'
                + '</div>'),
        titleFmt: _.template('<div>'
                    + '<span <%= style %> >' 
                        + '<%= title %>' 
                    + '</span>'
                + '</div>'),
        midDiv: _.template('<div style="background-image: url('
                    + '<%= imgLink %>'
                    + '); background-repeat: repeat-y; background-position: center center; text-align: center;">'),
        /*
        midDivOverlay: _.template('<div style="background: url(<%= imgLink %>) center center no-repeat; pointer-events: none;'
                    + 'position: absolute; left: 0; top: 0; width: 200px; height: 200px;'
                    + ' text-align: center;">'),
        */
        midDivOverlay: _.template('<div style="background: '
                    + 'url(<%= imgLinkOverlay %>) no-repeat center center,'
                    + 'url(<%= imgLink %>) repeat-y center center;'
                    + ' text-align: center; min-height: 150px;">'
                    + '<table style="width: 100%; height: 100%; text-align: center; vertical-align: middle; min-height: 150px;">'
                    + '<tr><td style="text-align: center; vertical-align: middle;">'),
        midButton: _.template('<div style="text-align: center;">'
                    + '<%= \'<span \'+ (riders ? (\'class="showtip tipsy" title="\' + riders + \'"\') : \'\') + \' style="font-weight: bold;">\' %>'
                        + '<%= \'<a href="!\' + \'&\'+\'#37\' + \';{\'+creName+\'|\'+abName+\'}">\'+btnName+\'</a>\' %>'
                    + '</span>'
                + '</div>'),
        midButtonFree: _.template('<%= \'<span \'+ (riders ? (\'class="showtip tipsy" title="\' + riders + \'"\') : \'\') + \' style="font-weight: bold;">\' %>'
                        + '<%= \'<a href="!\' + \'&\'+\'#37\' + \';{\'+creName+\'|\'+abName+\'}">\'+btnName+\'</a>\' %>'
                    + '</span>'),
        midLink: _.template('<div style="text-align: center;">'
                    + '<%= \'<span \'+ (riders ? (\'class="showtip tipsy" title="\' + riders + \'"\') : \'\') + \' style="font-weight: bold;">\' %>'
                        + '<%= link %>'
                    + '</span>'
                + '</div>'),
        midLinkFree: _.template('<%= \'<span \'+ (riders ? (\'class="showtip tipsy" title="\' + riders + \'"\') : \'\') + \' style="font-weight: bold;">\''
                    + '+ link +'
                +  '\'</span>\' %>'),
        midLinkCaption: _.template('<div style="text-align: center;">'
                    + '<%= link %>'
                    + '<%= (riders ? (\'<span style="color: #2B2B2B; font-weight: lighter; font-style: italic; font-size: 70%;">\' + riders + \'</span>\'):"") %>'
                + '</div>'),
        midLeadText: _.template('<%= \'<span \'+ (riders ? (\'class="showtip tipsy" title="\' + riders + \'" style="font-weight: bold; color:#FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;">\') : \' style="font-weight: bold; color:#000000;">\') %>'
                + '<%= label %>' 
                + '</span> <span style="color: #000000;"><%= text %></span>'),
        midText: _.template('<%= \'<span \'+ (riders ? (\'style="font-weight: bold; color:#FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;" class="showtip tipsy" title="\' + riders + \'"\') : \' style="color: #000000;"\') + \'>\' %>'
                    + '<%= text %>'
                +'</span>'),
    },
    
    init: function() {
        var rc = true;
        this.fields.tmpAtk = this.atkTemplate;
        if (state.cgen_design) 
            rc = this.selectDesignTemplate(state.cgen_design.toLowerCase(),true);
        if (!rc) {
            log("ERROR: state design template no longer exists, defaulting..");
            state.cgen_design = null;
        }
        if (state.cgen_attack) 
            rc = this.selectAttackTemplate(state.cgen_attack.toLowerCase(),true);
        if (!rc) {
            log("ERROR: state attack template no longer exists, defaulting..");
            state.cgen_attack = null;
        }
    },
    
    /**
     * Select design template
     */
    selectDesignTemplate: function(name, quiet) {
        var flag = null;
        if (typeof(CGTmp) != "undefined") {
            try {
                for (tmp in CGTmp.designTmp) {
                    if (tmp.toLowerCase() == name) {
                        this.design = CGTmp.designTmp[tmp];
                        if (!quiet)
                        this.sendFeedback('<span style="color: #653200; font-weight: bold;">Design template:</span> <b style="color: #009C26;">' + tmp + '</b> has been '
                            + 'configured for future tokens generated.</span>');
                        state.cgen_design = tmp;
                        flag = true;
                        break;
                    }
                }
                if (!flag)
                    this.sendFeedback('<span style="color: #990004;">Design template: \'' + name + '\' does not exist</span>');
            } catch (e) {
                log(e);
            }
        } else {
            this.sendFeedback('<span style="color: #990004;">No CreatureGen templates found, '
                + 'did you load the additional templates script?</span>');
        }
        return flag;
    },
    
    /**
     * Select attack template
     */
    selectAttackTemplate: function(name, quiet) {
        var flag = null;
        if (typeof(CGTmp) != "undefined") {
            try {
                for (tmp in CGTmp.attackTmp) {
                    if (tmp.toLowerCase() == name) {
                        this.fields.tmpAtk = CGTmp.attackTmp[tmp];
                        if (!quiet)
                        this.sendFeedback('<span style="color: ##155391; font-weight: bold;">Attack template:</span> <b style="color: #009C26;">' + tmp + '</b> has been '
                            + 'configured for future tokens generated.</span>');
                        state.cgen_attack = tmp;
                        flag = true;
                        break;
                    }
                }
                if (!flag)
                    this.sendFeedback('<span style="color: #990004;">Attack template: \'' + name + '\' does not exist</span>');
            } catch (e) {
                log(e);
            }
        } else {
            this.sendFeedback('<span style="color: #990004;">No CreatureGen templates found, '
                + 'did you load the additional templates script?</span>');
        }
        return flag;
    },
    
    /** 
     * Object fix to resolve firebase errors 
     * 
     * @author Shu Zong C.
     */
    fixNewObject: function(obj)
    {
        var p = obj.changed._fbpath;
        var new_p = p.replace(/([^\/]*\/){4}/, "/");
        obj.fbpath = new_p;
        return obj;
    },
    
    /**
     * scan in information from token notes
     * 
     * @contribuitor Andy W.
     */
    scan: function(token) {
        var charSheet = null;
        var data = null;
        var rawData = null;
        var dispData = "";
        
        if (null == token || undefined == token) {
            throw "No Token selected";
        }
        rawData = token.get("gmnotes");
        this.creLog('RAW: ' + rawData);
        if (!rawData) {throw "no token notes";}
        data = rawData.split(/%3Cbr%3E|\\n|<br>/);
        
        //clean out all other data except text
        for (var i = data.length; i >= 0; i--) {
            if (data[i]) {
                data[i] = CreatureGenPF.cleanString(data[i]).trim();
                if (null === data[i].match(/[^\s]/)) {
                    data.splice(i,1)
                }
            }
        }
        
        dispData = this.formatDisplay(data);
        
        charSheet = createObj("character", {
            avatar: token.get("imgsrc"),
            name: "Creature",
            gmnotes: '',
            archived: false,
            inplayerjournals: '',
            controlledby: ''
        });
        charSheet = CreatureGenPF.fixNewObject(charSheet);
        if (!charSheet) {
            throw "ERROR: could not create character sheet";
        }
        
        token.set("represents",charSheet.get('_id'));
        charSheet.set('gmnotes',dispData);
        
        this.character = charSheet;
        this.data = data;
        this.rawData = rawData;
        
        // warn on image source
        if (charSheet.get('avatar') == '') {
            this.addWarning('Unable to set avatar to character journal, only images you\'ve '
                + 'uploaded yourself are viable during creation. Auto-population '
                + '<i>(drag-drop population)</i> will not be possible without an avatar image.'
                + ' You can still upload an avatar manually, or drag an image into the avatar field'
                + ' from the image-search.');
        }
        
        // parse up our data set.
        var specials = null;
        
        try {
            this.parseCore();
            
            specials = this.parseSpecials();
            this.parseAttacks(specials);
            this.parseSpells();
            this.prepToken(token,charSheet);
            this.parseExtra(specials);
            
        } catch (e) {
            log("ERROR when parsing");
            throw e;
        }
    },
    
    /**
     * Format display of stat-block
     */
    formatDisplay: function(datum) {
        if (!datum) return null;
        var content = '';
        
        _.each(datum, function(e,i,l) {
            CreatureGenPF.creLog('('+i+') ' + e,1);
            if (e.match('DEFENSE')
            || e.match('OFFENSE')
            || e.match('TACTICS')
            || e.match('BASE STATISTICS')
            || e.match('STATISTICS')
            || e.match('ECOLOGY')
            || e.match('SPECIAL ABILITIES'))
                content += '<div style="font-size: 112%; border-bottom: 1px solid black; border-top: 1px solid black; margin-top: 8px;">'+e+'</b></div>';
            else if (e.match(/\(Ex\)|\(Su\)|\(Sp\)/i))
                content += '<div>' + e + '</div>'
            else
                content += e+'<br>'
        });
        return content;
    },

    /**
     * Prep the token.
     * Asynchronous
     */
    prepToken: function(token,character) {
        if (!token || !character) return null;
        var name=null,AC=null,hp=null,prep=null;
        var charId = character.get('_id');
        
        hp = findObjs({
            _type: "attribute",
            name: "hp",
            _characterid: charId 
        })[0];
        
        AC = findObjs({
            _type: "attribute",
            name: "AC",
            _characterid: charId 
        })[0];
        
        prep = findObjs({
            _type: "attribute",
            name: "CGEN",
            _characterid: charId 
        })[0];
        
        name = character.get('name');
        
        // Fast vs cb delay
        if (token.get('gmnotes')) {
            if (hp && AC && name && prep 
            && (prep.get('current').match(/true/i) != null)) {
                hp = hp.get('current');
                AC = AC.get('current');
                token.set('bar1_value',hp);
                token.set('bar1_max', hp);
                token.set('bar3_value',AC);
                token.set('name',name);
                token.set('showname',true);
                token.set('light_hassight',true);
            }
        } else {
            character.get('gmnotes',function(notes) {
                if (hp && AC && name && prep 
                && (prep.get('current').match(/true/i) != null) 
                && notes && (notes != '')) {
                    hp = hp.get('current');
                    AC = AC.get('current');
                    token.set('bar1_value',hp);
                    token.set('bar1_max', hp);
                    token.set('bar3_value',AC);
                    token.set('name',name);
                    token.set('showname',true);
                    token.set('light_hassight',true);
                    token.set('gmnotes', notes
                        .replace(/<div[^<>]*>/g,'')
                        .replace(/<\/div>/g,'<br>'));
                }
            });
        }
    },
    
    /** 
     * parse core attributes, AC, HP, etc 
     */
    parseCore: function() {
        if (!this.data) return;
        
        /* names are tricky as we delimit on CR, last occurance of CR 
        which has numbers after it TODO use a regex which is shorter*/
        var namefield = this.data[0];
        var delimiter_idx =namefield.lastIndexOf("CR");
        var fuzzyfield = namefield.substring(delimiter_idx,namefield.length);
        if ((delimiter_idx <= 0) || (fuzzyfield.match(/\d+|—/g) == null))
            delimiter_idx = namefield.length;
        var name = namefield.substring(0,delimiter_idx);
        //name = name.trim().replace(/\s+/g,'_').toLowerCase();
        name = name.trim().toLowerCase();
        this.creName = (this.fields.summoner ? (this.fields.summoner.get('_displayname')+'\'s ' + name):name);
        this.fields.publicName = (this.fields.summoner ? this.creName:this.fields.publicName);
        this.character.set('name',this.creName);
        if (this.fields.summoner) {
            this.character.set('controlledby',this.fields.summoner.get('_id'));
        }
        
        var charId = this.character.get('_id');
        var line = "";
        var lineStartFnd = 0;
        var lineEndFnd = this.data.length;
        var termChars = [';',','];
        var rc = -1;
        // core attribute fields
        var initAttr = "Init";
        var primeAttr = ["Str","Dex","Con","Int","Wis","Cha"];
        var minorAttr = ["Base Atk","CMB","CMD"];
        var defAttr = ["AC","touch","flat-footed","hp"];
        var saveAttr = ["Fort","Ref","Will"];
        var hp=0,AC=0,tAC=0,ffAC=0;
        
        
        //Flag that this token will be prepped, can be removed by the user
        this.addAttribute("CGEN",'true','',charId);
        this.addAttribute("name",this.fields.defaultName,'',charId);
        // Init (TODO mythic Init)
        line = this.getLineByName(initAttr,this.data);
        rc = this.getValueByName(initAttr,line,termChars);
        this.addAttribute(initAttr,rc,rc,charId);     
        // prime attributes
        lineStartFnd = this.getLineNumberByName("STATISTICS",this.data);
        lineEndFnd = this.getLineNumberByName("SPECIAL ABILITIES",this.data);
        line = this.getLineByName("Str",this.data,lineStartFnd,lineEndFnd);
        this.addAttrList(line,primeAttr,lineStartFnd,termChars,charId);
        // minor attributes
        line = this.getLineByName("Base Atk",this.data,lineStartFnd,lineEndFnd);
        this.addAttrList(line,minorAttr,lineStartFnd,termChars,charId);
        // defense attributes
        lineStartFnd = this.getLineNumberByName("DEFENSE",this.data);
        lineEndFnd = this.getLineNumberByName("OFFENSE",this.data);
        line = this.getLineByName("AC",this.data,lineStartFnd,lineEndFnd);
        this.addAttrList(line,defAttr,lineStartFnd,termChars,charId);
        // save attributes
        line = this.getLineByName("Fort",this.data,lineStartFnd,lineEndFnd);
        this.addAttrList(line,saveAttr,lineStartFnd,termChars,charId);
        
        //format attributes:
        var hp = this.formatAttribute("hp",0,charId);
        this.creLog("parsecore: HP: " + hp,1);
        var AC = this.formatAttribute("AC",0,charId);
        this.creLog("parsecore: AC: " + AC,1);
        var tAC = this.formatAttribute("touch",0,charId);
        this.creLog("parsecore: touch AC: " + tAC,1);
        var ffAC = this.formatAttribute("flat-footed",0,charId);
        this.creLog("parsecore: flat-foot AC: " + ffAC,1);
        
        // save riders
        if ((rc=line.indexOf(';')) != -1) {
            rc = '('+line.substring(rc+1)+')';
        } else {rc = "";}
        this.addAttributeRoll("INIT",initAttr,false,true,charId,"&{tracker}");
        this.addAttributeRoll("F","Fort",false,true,charId,rc);
        this.addAttributeRoll("R","Ref",false,true,charId,rc);
        this.addAttributeRoll("W","Will",false,true,charId,rc);
        
        
    },
    
    /**
     * parse special attacks, if the statblock has 'riders' which give
     * details on the special abilities, then include it as part of the marco.
     * TODO: add option for verbrocity during generaton.
     */
    parseSpecials: function() {
        var retval = {};
        var charId = this.character.get('_id');
        var line = "";
        var lineStartFnd = 0;
        var lineEndFnd = this.data.length;
        var re = null, saName=null, abName=null, sAtks = null, sAtkStr = null;
            action = null, actionStr = null, spList = null, hasSAtks = null;
        
        line = this.getLineByName("Special Attacks",this.data);
        if (line != null) {
            line = line.replace("Special Attacks","")
            sAtks = line.split(/,(?![^\(\)]*\))/);
            while (sAtks.length > 0) {
                if (!sAtks[0] || !sAtks[0].match(/[^\s]+/)) {
                    sAtks.shift();
                    continue;
                }
                saName = sAtks[0].match(/\b[^\d\(\)\+]+/g);
                if (saName != null) {
                    saName = saName[0].trim();
                    sAtkStr += saName;
                    if (!retval[saName]) 
                        retval[saName] = new Array(sAtks[0].trim());
                    else 
                        retval[saName].push(sAtks[0].trim());
                    this.creLog("parseSpecials " + sAtks[0] + " saName: " + saName,1);
                }
                sAtks.shift();
            }
        }
        
        /* TODO add in nextLine support for cases where the special ability
        name is found on the following line(s) */
        lineStartFnd = this.getLineNumberByName("SPECIAL ABILITIES",this.data);
        if (lineStartFnd != null)
            for (var i = lineStartFnd; i < this.data.length; ++i) {
                line = this.data[i];
                if (line.match(/\(Su\)|\(Ex\)|\(Sp\)/i)) {
                    saName = line.substring(0,line.indexOf('(')).toLowerCase().trim();
                    re = new RegExp(saName,'ig');
                    action = "!\n" + this.fields.menuWhis + 
                        line.replace(re,this.getTermLink(saName,this.termEnum.GENERAL));
                    if (!retval[saName]) 
                        retval[saName] = new Array(line.trim());
                    else 
                        retval[saName].push(line.trim());
                    this.addAbility("SA-"+saName,"",action,false,charId);
                }
            }
         
        /* If there is a special attack, that is a special attack not ability, 
        then it is unique and should get its own ability as well as long-rider
        if one exists.*/
        spList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.specialTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.specialMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.specialTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.specialLabelFmt,
                        title: 'Special Attacks'
                    })
                +'</div>';
        /*
        // DEPRECATED (exclude special attacks that are melee/ranged riders)
        // insure we have melee or ranged
        line = this.getLineByName("Melee",this.data)
            + this.getLineByName("Ranged",this.data) + '';
        */
        if (sAtkStr)
        for (sAtks in retval) {
            if (/*!line.match(sAtks) &&*/ (sAtkStr.indexOf(sAtks) != -1)) {
                hasSAtks = true;
                abName = "SP-" + sAtks;
                abName = abName.replace(/\s/g,"-");
                action = "!\n" + this.fields.resultWhis;
                for (var rider in retval[sAtks]) {
                    this.creLog("SP rider: " + retval[sAtks][rider],3);
                    re = new RegExp(sAtks,"ig");
                    actionStr = "<div>"+this.getFormattedRoll(retval[sAtks][rider])+"</div>";
                    action += actionStr.replace(re,this.getTermLink(sAtks,this.termEnum.GENERAL));
                }
                this.creLog("SP action: " + action,3);
                this.addAbility(abName,"",action,false,charId);
                spList = spList
                    + this.menuTemplate.midButton({
                        riders: null,
                        creName: this.creName,
                        abName: abName,
                        btnName: sAtks
                    });
            }
        }
        if (hasSAtks) {
            spList = spList
                + '</div>'
                + this.menuTemplate.boundryImg({imgLink: this.design.specialBotImg});
            this.addAbility("Specials",'',spList,false,charId);
        }
        return retval;
    },
    
    /**
     * parse melee and ranged attacks, if there are special attack riders,
     * then we will append the marco text 
     */
    parseAttacks: function(specials) {
        var charId = this.character.get('_id');
        var line = "";
        var lineStartFnd = 0;
        var lineEndFnd = this.data.length;
        var atkMenu = null, hasSAtk = false, CMB = null, riders = null;
        
        atkMenu = this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.atkMenuTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.atkMenuMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.atkMenuTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.atkMenuLabelFmt,
                        title: 'Attacks'
                    })
                +'</div>';
        
        lineStartFnd = this.getLineNumberByName("OFFENSE",this.data);
        lineEndFnd = this.getLineNumberByName("TACTICS",this.data);
        if (!lineEndFnd)
            lineEndFnd = this.getLineNumberByName("STATISTICS",this.data);
        try {
            line = this.getLineByName("Melee",this.data,lineStartFnd,lineEndFnd);
            if (line) {
                this.formatAttacks(line,"Melee",charId,"ATK",specials);
                atkMenu = atkMenu
                    + this.menuTemplate.midButton({
                        riders: null,
                        creName: this.creName,
                        abName: 'ATK',
                        btnName: 'Melee'
                    });
            }
            line = this.getLineByName("Ranged",this.data,lineStartFnd,lineEndFnd);
            if (line) {
                this.formatAttacks(line,"Ranged",charId,"RNG",specials);
                atkMenu = atkMenu
                    + this.menuTemplate.midButton({
                        riders: null,
                        creName: this.creName,
                        abName: 'RNG',
                        btnName: 'Ranged'
                    });
            }
            hasSAtk = findObjs({
                    _type: "ability",
                    name: "Specials",
                    _characterid: charId 
            });
            if (hasSAtk.length > 0) {
                atkMenu = atkMenu
                    + this.menuTemplate.midButton({
                        riders: null,
                        creName: this.creName,
                        abName: 'Specials',
                        btnName: 'Specials'
                    });
            }
            lineStartFnd = this.getLineNumberByName("STATISTICS",this.data);
            line = this.getLineByName("CMB",this.data,lineStartFnd);
            if (line) {
                hasDefense = true;
                CMB = this.getValueByName("CMB",line,[',',';']);
                riders = CMB.match(/\(.+\)/);
                this.addAttributeRoll("CMB","CMB",false,false,charId,(riders ? riders:''));
                atkMenu = atkMenu
                    + this.menuTemplate.midButton({
                        riders: riders,
                        creName: this.creName,
                        abName: 'CMB',
                        btnName: 'CMB'
                    });
            }
            
        } catch (e) {
            log ("ERROR when parsing attacks: ");
            throw e;
        }
        atkMenu = atkMenu
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.atkMenuBotImg});
        this.addAbility("Attacks",'',atkMenu,true,charId);
    },
    
    /** parse out spells the marco will spit them out, possibly even link 
     * them to a known PRD search engine.
     */
    parseSpells: function() {
        var charId = this.character.get('_id');
        var lineEndFnd = this.data.length;
        var casterType = null, attrName = null;
        var rc = null, line = "";
        var termChars = [';',','];
        
        lineEndFnd = this.getLineNumberByName("TACTICS",this.data);
        if (!lineEndFnd)
            lineEndFnd = this.getLineNumberByName("STATISTICS",this.data);
        this.formatSpells("Spell-Like Abilities",lineEndFnd,this.termEnum.GENERAL,"SLA");
        this.formatSpells("Spells Known",lineEndFnd,this.termEnum.SPELL);
        this.formatSpells("Spells Prepared",lineEndFnd,this.termEnum.SPELL);
        this.formatSpells("Extracts Prepared",lineEndFnd,this.termEnum.SPELL);
    },
    
    /**
     * Generic Parse assuming CSV on the line.
     * 
     */
    parseGeneric: function(generic,type,start,end) {
        if (!generic || !type) return null;
        if (!start) start = 0;
        if (!end) end = this.data.length;
        var charId = this.character.get('_id');
        var genName = null, genRiders = null, genAry = null, 
            idx = null, genList = null, abName = null, genLabel = null;
        var lineStartFnd = 0;
        var rc = null, line = "";
        var termChars = [';'];
        
        genList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: generic
                    })
                +'</div>';
            
        line = this.getLineByName(generic,this.data,start,end);
        line = this.getValueByName(generic,line,termChars);
        this.creLog("parseGeneric: " + line,1);
        if (line) {
            line = line.replace(generic,"");
            genAry = line.split(/,(?![^\(\)]*\))/);
            if (genAry) {
                for (var elemGen in genAry) {
                    this.creLog(genAry[elemGen],4);
                    if ((idx=genAry[elemGen].indexOf("(")) != -1) {
                        genName = genAry[elemGen].substring(0,idx).trim();
                        genRiders = genAry[elemGen].substring(idx).trim();
                    } else {
                        genName = genAry[elemGen].trim();
                        genRiders = null;
                    }
                    genName = this.formatSuperSubScript(genName);
                    genList = genList
                        + this.menuTemplate.midLink({
                                riders: genRiders, 
                                link: this.getTermLink(genName,type)
                        });
                }
                genList = genList
                    + '</div>'
                    + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});
                this.addAbility(generic,'',genList,false,charId);
            }
        }
    },
    
    /** parse out skills the marco will spit them out, possibly even link 
     * them to a known PRD search engine.
     */
    parseSkills: function() {
        var charId = this.character.get('_id');
        var lineStartFnd = 0;
        var lineEndFnd = this.data.length;
        var skillName = null, skillRiders = null, skillAry = null, 
            skillList = null, abName = null, skillLabel = null,
            parts = null, abStr = null, racialBonus = null, racialAry = null,
            racialRiders = null;
        var rc = null, line = "";
        var termChars = [';',','];
        
        skillList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.skillTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.skillMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.skillTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.skillLabelFmt,
                        title: 'Skills'
                    })
                +'</div>';
        
        lineStartFnd = this.getLineNumberByName("STATISTICS",this.data); 
        line = this.getLineByName("Skills",this.data,lineStartFnd);
        if (line) {
            line = line.replace("Skills","");
            skillAry = line.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            if (skillAry.length > 0) {
                for (var skill in skillAry) {
                    if (!skillAry[skill] || !skillAry[skill].match(/[^\s]+/)) {
                        this.creLog("invalid: " + skill,2);
                        continue;
                    }
                    this.creLog(skillAry[skill],4);
                    if ((parts=skillAry[skill].match(/\b[^\d\+\-/]+/)) != -1) {
                        skillName = parts[0].trim();
                        skillRiders = (skillAry[skill].substring(skillAry[skill].indexOf(skillName)+skillName.length)).match(/\(.+\)/);
                    }
                    if (skillName.match("Racial Modifiers")) {
                        this.creLog("Ending skills, reason : " + skillAry[skill],4);
                        break;
                    }
                    rc = this.getBonusNumber(skillAry[skill]);
                    skillName = this.formatSuperSubScript(skillName);
                    abName = "SK-" + skillName;
                    abName = abName.replace(/\s/g,"-");
                    abStr = "!\n" + this.fields.resultWhis + this.creName + ' ' + abName + " [[1d20"+rc+"]]";
                    this.addAbility(abName,'',abStr,false,charId);
                    skillList = skillList
                        + this.menuTemplate.midButton({
                            riders: skillRiders,
                            creName: this.creName,
                            abName: abName,
                            btnName: skillName
                        });
                }
            }
            if (!this.characterObjExists('SK-Perception','ability',charId)) {
                lineEndFnd = this.getLineNumberByName('DEFENSE',this.data);
                line = this.getLineByName('Perception',this.data,0,lineEndFnd);
                rc = this.getValueByName('Perception',line,termChars);
                rc = this.getBonusNumber(rc,this.bonusEnum.SIGN);
                abName = "SK-Perception";
                abStr = "!\n" + this.fields.resultWhis + this.creName + ' ' + abName + " [[1d20"+rc+"]]";
                this.addAbility(abName,'',abStr,false,charId);
                skillList = skillList
                    + this.menuTemplate.midButton({
                        riders: skillRiders,
                        creName: this.creName,
                        abName: abName,
                        btnName: 'Perception'
                    });
            }
            skillList = skillList 
                + '</div>'
                + this.menuTemplate.boundryImg({imgLink: this.design.skillBotImg});
            this.addAbility("Skills",'',skillList,false,charId);
        }
        
    },
    
    /**
     * Given an ability name, augment it (very specifc)
     * DEPRECATED
     */
    augmentSkillRoll: function(name, augment, charId) {
        var ability = null,abStr = null,rollExpr = null,
            newExpr = null,bonus = null;
        ability = this.characterObjExists(name,'ability',charId);
        if (ability) {
            abStr = ability.get('action');
            rollExpr = this.getExpandedExpr('1d20',abStr);
            newExpr = rollExpr.replace('1d20','').trim();
            bonus = parseInt(newExpr);
            bonus = bonus + parseInt(augment) + "";
            bonus = this.getBonusNumber(bonus,this.bonusEnum.SIGN);
            abStr = abStr.replace(rollExpr,'1d20'+bonus);
            ability.set('action',abStr);
        }
    },
    
    /**
     * Parse defenses
     */
    parseDefenses: function() {
        var retVal = null;
        var charId = this.character.get('_id');
        var line = "";
        var lineStartFnd = 0;
        var lineEndFnd = this.data.length;
        var termChars = [';'];
        var excluded = ['SR','DR','Immune','Resist','Weaknesses'];//TODO compensate for missing delimiters (SR on black dragons vs succubus)
        var rc = -1;
        var SR = null,DR = null,CMD = null,defenseAb = null,riders = null, name = null,
            resist = null,immune = null,weak = null, senses = null, speed = null, 
            regen = null, aura = null, fasthealing = null, aryList = null, hasDefense=false;
        var defenseList = null;
        
        var fmtLinkFunc = function(arg) {
            arg = arg.trim();
            var name = arg.match(/\b[^\(\)]+/);
            name = CreatureGenPF.formatSuperSubScript(name[0]);
            var riders = arg.match(/\(.+\)/);
            return CreatureGenPF.menuTemplate.midLinkFree({
                        riders: riders,
                        link: CreatureGenPF.getTermLink(name,CreatureGenPF.termEnum.GENERAL)
                    });
        };
        var fmtLeadFunc = function(arg) {
            var list = arg.split('%%');
            if (list.length != 2)
                throw "ERROR: Bad Arg";
            var label = list[0];
            var riders = list[1].match(/\(.+\)/);
            var value = list[1].match(/\b[^\(\)]+/);
            if (!value) value = '—';
            value = value[0].trim();
            return CreatureGenPF.menuTemplate.midLeadText({
                        riders: riders,
                        label: label,
                        text: value
                    });
        };
        var fmtTextFunc = function(arg) {
            var riders = arg.match(/\(.+\)/);
            var value = arg.match(/\b[^\(\)]+/);
            if (!value) value = '—';
            value = value[0].trim();
            return CreatureGenPF.menuTemplate.midText({
                        riders: riders,
                        text: value
                    });
        };
        
        defenseList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center;">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: 'Defenses'
                    })
                +'</div>';
        
        lineStartFnd = this.getLineNumberByName("DEFENSE",this.data);
        lineEndFnd = this.getLineNumberByName("OFFENSE",this.data);
        line = this.getLineByName("DR",this.data,lineStartFnd,lineEndFnd);
        if (line) {DR = this.getValueByName("DR",line,termChars);}
        line = this.getLineByName("SR",this.data,lineStartFnd,lineEndFnd);
        if (line) {SR = this.getValueByName("SR",line,termChars);}
        line = this.getLineByName("Immune",this.data,lineStartFnd,lineEndFnd);
        if (line) {immune = this.getValueByName("Immune",line,termChars);}
        line = this.getLineByName("Resist",this.data,lineStartFnd,lineEndFnd);
        if (line) {resist = this.getValueByName("Resist",line,termChars);}
        line = this.getLineByName("Defensive Abilities",this.data,lineStartFnd,lineEndFnd);
        if (line) {defenseAb = this.getValueByName("Defensive Abilities",line,termChars);}
        line = this.getLineByName("Weaknesses",this.data,lineStartFnd,lineEndFnd);
        if (line) {weak = this.getValueByName("Weaknesses",line,termChars);}
		// add Fast Healing
		line = this.getLineByName("fast healing",this.data,0,lineEndFnd);
        if (line) {fasthealing = this.getValueByName("fast healing",line,termChars);}
        // add Regeneration
        line = this.getLineByName("regeneration",this.data,0,lineEndFnd);
        if (line) {regen = this.getValueByName("regeneration",line,termChars);}
        // add CMD
        lineStartFnd = this.getLineNumberByName("STATISTICS",this.data);
        line = this.getLineByName("CMD",this.data,lineStartFnd);
        if (line) {CMD = this.getValueByName("CMD",line,[',',';']);}
        // add Senses
        lineEndFnd = this.getLineNumberByName("DEFENSE", this.data);
        line = this.getLineByName("Senses",this.data,0,lineEndFnd);
        if (line) {senses = this.getValueByName("Senses",line,termChars);}
		// add Aura
        line = this.getLineByName("Aura",this.data,0,lineEndFnd);
        if (line) {aura = this.getValueByName("Aura",line,termChars);}
        // add Speed
        lineStartFnd = this.getLineNumberByName("OFFENSE", this.data);
        lineEndFnd = this.getLineNumberByName("TACTICS",this.data);
        if (!lineEndFnd) lineEndFnd = this.getLineNumberByName("STATISTICS",this.data);
        line = this.getLineByName("Speed",this.data,lineStartFnd,lineEndFnd);
        if (line) {speed = this.getValueByName("Speed",line,termChars);}
        
        if (CMD) {
            hasDefense = true;
            defenseList = defenseList 
                + '<div>'
                    + fmtLeadFunc('CMD:%%'+CMD)
                + '</div>';
        }
        
        if (regen) {
            hasDefense = true;
            defenseList = defenseList 
                + '<div>'
                    + fmtLeadFunc('Regeneration:%%'+regen)
                + '</div>';
        }

		if (fasthealing) {
			hasDefense = true;
			defenseList = defenseList
				+ '<div>' 
					+ fmtLeadFunc('Fast Healing:%%'+fasthealing)
				+ '</div>'; 
		}
        
        if (DR || SR) {
            hasDefense = true;
            defenseList += '<div>';
            if (DR && SR) {
                defenseList = defenseList 
                    + this.formatTable(
                        [('DR:%%'+DR),('SR:%%'+SR)],
                        2,
                        fmtLeadFunc);
            } else if (DR) {
                defenseList = defenseList
                    + fmtLeadFunc('DR:%%'+DR);
            } else if (SR) {
                defenseList = defenseList
                    + fmtLeadFunc('SR:%%'+SR);
            }
            defenseList += '</div>';
        }
        
        if (speed) {
            hasDefense = true;
            aryList = speed.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center;">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Speed:" + '</span>'
                + '</div>';
            if (aryList.length >= 2) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtTextFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div>'
                            + fmtTextFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        if (senses) {
            hasDefense = true;
            aryList = senses.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center;">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Senses:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div>'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }

        if (aura) {
            hasDefense = true;
            aryList = aura.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center;">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Aura:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div>'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        if (immune) {
            hasDefense = true;
            aryList = immune.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center;">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Immunities:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div>'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        if (resist) {
            hasDefense = true;
            aryList = resist.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
             defenseList = defenseList
                + '<div style="text-align:center">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Resistances:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div style="text-align:center">'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        if (weak) {
            hasDefense = true;
            aryList = weak.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Weaknesses:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div style="text-align:center">'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        if (defenseAb) {
            hasDefense = true;
            aryList = defenseAb.split(/,(?![^\(\)]*\))|;(?![^\(\)]*\))/);
            defenseList = defenseList
                + '<div style="text-align:center">'
                    + '<span style="font-weight: bold; color: #000000;">' + "Defensive Abilities:" + '</span>'
                + '</div>';
            if (aryList.length > 3) {
                defenseList += '<div>' + this.formatTable(aryList,2,fmtLinkFunc) + '</div>';
            } else if (aryList.length > 0) {
                for (var i = 0; i < aryList.length; i++) {
                    if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                     continue;
                    }
                    defenseList = defenseList
                        + '<div style="text-align:center">'
                            + fmtLinkFunc(aryList[i])
                        + '</div>';
                }
            }
        }
        
        defenseList = defenseList
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});

        if (hasDefense) {
            this.addAbility("Defenses",'',defenseList,false,charId);
        }
        
    },
    
    /**
     * Format a table given a minimum column length and a format function for
     * the elements.
     */
    formatTable: function(aryList, minCol, fmtFunc) {
        if (!aryList || !minCol) return null;
        if (!fmtFunc) fmtFunc = function(arg) {return arg;};
        var retval = '<table style="margin-left: auto; margin-right: auto;">';
        
        for (var i = 0; i < aryList.length; i += minCol) {
            retval += '<tr>';
            if ((aryList.length - i + 1) > minCol) {
                for (var j = i; j < i + minCol; ++j) {
                    if (!aryList[j] || !aryList[j].match(/[^\s]+/))
                        continue;
                    retval += '<td>' + fmtFunc(aryList[j]) + '</td>';
                }
            } else {
                // span the last column
                var j;
                for (j = i; j < aryList.length - 1; ++j) {
                    if (!aryList[j] || !aryList[j].match(/[^\s]+/))
                        continue;
                    retval += '<td>' + fmtFunc(aryList[j]) + '</td>';
                }
                retval += '<td colspan="' + (minCol-(j%minCol)) + '">' + fmtFunc(aryList[aryList.length - 1]) + '</td>';
                retval += '</tr>';
                break;
            }
        retval += '</tr>';
    }

    // clean up remainder here
    retval += '</table>';
    return retval;
},
    
    /**
     * Parse out special abilities (not special attacks) and put them in a
     * menu, if there are no special abilities, create no such menu
     */
    parseSpecialMenu: function(specials) {
        if (!specials) return null;
        var charId = this.character.get('_id');
        var spMenu = null, saName = null, hasSpecials = false;
        
        spMenu = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: 'Special Abilities'
                    })
                +'</div>';
        
        
        for ( var key in specials) {
            saName = 'SA-' + key;
            if (this.characterObjExists(saName,'ability',charId)) {
                hasSpecials = true;
                spMenu = spMenu
                    + this.menuTemplate.midButton({
                            riders: null,
                            creName: this.creName,
                            abName: saName,
                            btnName: key
                    });
            }
        }
        
        spMenu = spMenu
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});
        
        if (hasSpecials)
            this.addAbility("Special Abilities",'',spMenu,false,charId);
    },
    
    /**
     * Parses Gear
     */
    parseItems: function() {
        var charId = this.character.get('_id');
        var menu = null, hasGear = false;
        var start = null, end = null;
        
        menu = '!\n' + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: 'Items'
                    })
                +'</div>';
                
        start = this.getLineNumberByName('STATISTICS',this.data);
        end = this.getLineNumberByName('SPECIAL ABILITIES',this.data);
                
        // parse Combat Gear
        this.parseGeneric("Combat Gear",this.termEnum.GENERAL,start,end);
        if (this.characterObjExists("Combat Gear","ability",charId)) {
            hasGear = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Combat Gear',
                    btnName: 'Gear-Combat'
                });
        }
        
        // parse Other Gear
        this.parseGeneric("Other Gear",this.termEnum.GENERAL,start,end);
        if (this.characterObjExists("Other Gear","ability",charId)) {
            hasGear = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Other Gear',
                    btnName: 'Gear-Other'
                });
        }
        if (!hasGear) {
            // parse General Gear
            this.parseGeneric("Gear",this.termEnum.GENERAL,start,end);
            if (this.characterObjExists("Gear","ability",charId)) {
                hasGear = true;
                menu = menu
                    + this.menuTemplate.midButton({
                        riders: null,
                        creName: this.creName,
                        abName: 'Gear',
                        btnName: 'Gear'
                    });
            }
        }
                
        menu = menu
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});
        
        if (hasGear)
            this.addAbility("Items",'',menu,false,charId);
    },
    
    /**
     * Parses Tactics
     */
    parseTactics: function() {
        var charId = this.character.get('_id');
        var menu = null, hasTactics = false;
        var start = null, end = null, line = null;

        menu = '!\n' + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: 'Tactics'
                    })
                +'</div>';
                
        start = this.getLineNumberByName('TACTICS',this.data);
        end = this.getLineNumberByName('STATISTICS',this.data);
        
        // Before Combat
        line = this.getLineByName('Before Combat',this.data,start,end);
        if (line) {
            hasTactics = true;
            line = line.replace('Before Combat','<b>Before Combat</b>');
            line = '!\n' + this.fields.privWhis + line;
            this.addAbility('Tactics-Before','',line,false,charId);
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Tactics-Before',
                    btnName: 'Before Combat'
                });
        }
        // During Combat
        line = this.getLineByName('During Combat',this.data,start,end);
        if (line) {
            hasTactics = true;
            line = line.replace('During Combat','<b>During Combat</b>');
            line = '!\n' + this.fields.privWhis + line;
            this.addAbility('Tactics-During','',line,false,charId);
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Tactics-During',
                    btnName: 'During Combat'
                });
        }
        // Morale
        line = this.getLineByName('Morale',this.data,start,end);
        if (line) {
            hasTactics = true;
            line = line.replace('Morale','<b>Morale</b>');
            line = '!\n' + this.fields.privWhis + line;
            this.addAbility('Tactics-Morale','',line,false,charId);
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Tactics-Morale',
                    btnName: 'Morale'
                });
        }
        
        menu = menu
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});
        if (hasTactics)
            this.addAbility("Tactics",'',menu,false,charId);
    },
    
    /**
     * parse additional, non-combat abilities
     */
    parseExtra: function(specials) {
        var charId = this.character.get('_id');
        var menu = null, hasExtras = false;
        
        menu = this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.genTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.genMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.genTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.genLabelFmt,
                        title: 'Abilities'
                    })
                +'</div>';
        
        // parse skills
        this.parseSkills();
        if (this.characterObjExists("Skills","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Skills',
                    btnName: 'Skills'
                });
        }
        // parse feats
        this.parseGeneric("Feats",this.termEnum.FEAT);
        if (this.characterObjExists("Feats","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Feats',
                    btnName: 'Feats'
                });
        }
        // parse SQ
        this.parseGeneric("SQ",this.termEnum.GENERAL);
        if (this.characterObjExists("SQ","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'SQ',
                    btnName: 'SQ'
                });
        }
        // parse Defenses
        this.parseDefenses();
        if (this.characterObjExists("Defenses","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Defenses',
                    btnName: 'Defenses'
                });
        }
        // parse Tactics
        this.parseTactics();
        if (this.characterObjExists("Tactics","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Tactics',
                    btnName: 'Tactics'
                });
        }
        // parse special abilities
        this.parseSpecialMenu(specials);
        if (this.characterObjExists("Special Abilities","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Special Abilities',
                    btnName: 'Special Abilities'
                });
        }
        // parse items
        this.parseItems(specials);
        if (this.characterObjExists("Items","ability",charId)) {
            hasExtras = true;
            menu = menu
                + this.menuTemplate.midButton({
                    riders: null,
                    creName: this.creName,
                    abName: 'Items',
                    btnName: 'Items'
                });
        }
        
        
        menu = menu
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.genBotImg});
        
        if (hasExtras)
            this.addAbility("Abilities",'',menu,true,charId);
    },
    
    /** 
     * A messy area were we parse exceptions such as Base-statistics and 
     * other rare things that mess up the uniformity of PRD stat blocks.
     */
    parseOutlier: function() {
        // Unimplemented
    },
    
    /**
     * Format spells
     */
    formatSpells: function(type, end, termType, suffix) {
        if (!type || !end || !termType) return null;
        var charId = this.character.get('_id');
        var start = null, casterType = null, conAttrName = null, clAttrName = null,
            sLevel = null, spells = null, rc = null, line = null, casterLevel = null,
            concentration = null, spellBook = null, abName = null, attrStr = null;;
        var termChars = [';',','];
        
        start = this.getLineNumberByName(type,this.data);
        while ((start != null) && (line=this.getLineByName(type,this.data,start,end)) != null) {
            if (line != null) {
                line = this.getLineByName(type,this.data,start,end);
                casterType = line.substring(0,line.indexOf(type)).trim();
                casterType = casterType.replace(/\s+/g,"-");
                if (casterType == "") casterType = "Base";
                casterType += (suffix ? ("-"+suffix) : "");
                casterLevel = this.getValueByName("CL",line,termChars);
                casterLevel = this.getBonusNumber(casterLevel,this.bonusEnum.SCALAR);
                this.creLog("SpellFormat: casterType: " + casterType,2);
                clAttrName = casterType + "-CL";
                this.addAttribute(clAttrName,casterLevel,casterLevel,charId);
                attrStr = "!\n" + this.fields.resultWhis + this.creName
                    + ': ' + clAttrName + ': [[1d20+'+casterLevel+']]';
                this.addAbility(clAttrName,'',attrStr,false,charId);
                concentration = this.getValueByName("concentration",line,termChars);
                concentration = this.getBonusNumber(concentration,this.bonusEnum.SIGN);
                conAttrName = casterType + "-CON";
                this.addAttribute(conAttrName,concentration,concentration,charId);
                if (!concentration) {
                    this.addWarning('No concentration bonus found for \''
                        + casterType + '\' ' + type + '. A manual'
                        + ' prompt has been substituted in place.');
                }
                attrStr = "!\n" + this.fields.resultWhis + this.creName 
                    + ': ' + conAttrName + ': [[1d20'+(concentration ? concentration:'+?{concentration-bonus}')+']]';
                this.addAbility(conAttrName,'',attrStr,false,charId);
                start++;

                spellBook = this.fields.menuWhis
                    + this.menuTemplate.boundryImg({imgLink: this.design.spellBookTopImg})
                    + (this.design.spellBookMidOvr ? 
                        this.menuTemplate.midDivOverlay({imgLink: this.design.spellBookMidImg, imgLinkOverlay: this.design.spellBookMidOvr})
                        : this.menuTemplate.midDiv({imgLink: this.design.spellBookMidImg}))
                        + '<div style="text-align:center">'
                            + this.menuTemplate.titleFmt({
                                style: this.design.spellBookTitleFmt, 
                                title: casterType
                            })
                        +'</div>';

                this.creLog("ParseSpells: start: " + start + " line: " + line,1);
                // mow down some lines wherever we see —, stop when we don't see it.
                for (var i = start; i < end; ++i) {
                    line = this.data[i];
                    this.creLog("formatSpells: line " + line,2);
                    if (line.match("—")) {
                        spells = line.split("—");
                        if (spells.length < 2)
                            throw "ERROR: Bad spell list format";
                        sLevel = spells[0];
                        spells = spells[1].split(/,(?![^\(\)]*\))/);
                        this.creLog("spells sl: " + sLevel + " sp: " + spells,2);
                        this.addSpells(casterLevel,sLevel,spells,termType,casterType,charId);
                        abName = casterType + " " + sLevel;
                        spellBook = spellBook
                            + this.menuTemplate.midButton({
                                riders: null,
                                creName: this.creName,
                                abName: abName,
                                btnName: sLevel
                            });
                    } else break;
                }
                if (casterType) {
                    // put in CL and CON check buttons
                    spellBook = spellBook
                        + '<div>##</div>'
                        + '<div style="font-weight: bold;">'
                            + this.menuTemplate.midButtonFree({
                                riders: null,
                                creName: this.creName,
                                abName: clAttrName,
                                btnName: 'CL'
                            })
                            + '\t'
                            + this.menuTemplate.midButtonFree({
                                riders: null,
                                creName: this.creName,
                                abName: conAttrName,
                                btnName: 'CON'
                            })
                        + '</div>'
                        + (this.design.spellBookMidOvr ? '</td></tr></table>':'') // table-centering
                        + '</div>' // BG
                        + this.menuTemplate.boundryImg({imgLink: this.design.spellBookBotImg});
                    abName = casterType;
                    this.addAbility(abName,'',spellBook,true,charId);
                }
                /* Should be safe if we're under the assumption that there is at
                lease one ability given the stat block defined that it has abilities
                of this type */
                start = this.getLineNumberByName(type,this.data,start+1,end);
            }
        }
    },
    
    /**
     * add spells, be wary of greater/lesser semantics..
     */
    addSpells: function(casterLevel,spellLvl, spellAry, termType, setName, charId) {
        if (!spellLvl || !spellAry || !setName || !termType || !charId) 
            return null;
        var spellName = null, spellRiders = null, spellLabel = null, idx = null, 
            abName = null;
        var spellList = "";
        
        spellList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.spellTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.spellMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.spellTitleFmt, 
                        title: setName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.spellLabelFmt,
                        title: spellLvl + " CL("+casterLevel+")"
                    })
                +'</div>';
        
        while (spellAry.length > 0) {
            if (!spellAry[0] || !spellAry[0].match(/[^\s]+/)) {
                spellAry.shift();
                continue;
            }
            spellAry[0] = spellAry[0].trim();
            if ((idx=spellAry[0].indexOf("(")) != -1) {
                spellName = spellAry[0].substring(0,idx).trim();
                spellRiders = spellAry[0].substring(idx).trim();
            } else {
                spellName = spellAry[0].trim();
                spellRiders = null;
            }
            // elminate badly formatted trailing commas
            if (spellName == "" || !spellName)
                throw 'ERROR: bad spell name: ' + spellName;
            // Invert to treat special names, link to the base spell in the label
            spellName = this.formatSuperSubScript(spellName);
            spellLabel = this.formatSpellStrength(spellName);
            this.creLog("spell name: " + spellName + " spellRiders: " + spellRiders,2);
            
            //d20pfsrd uses - rather than %20
            spellLabel = spellLabel.replace(/\s+/g,"-");
            spellList = spellList
                + this.menuTemplate.midLinkCaption({
                        riders: spellRiders, 
                        link: this.getTermLink(spellLabel,termType,spellName)
                });
            spellAry.shift();
        }
        spellList = spellList
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.spellBotImg});
        abName = setName + " " + spellLvl;
        this.addAbility(abName,'',spellList,false,charId);
        
    },
    
    /**
     * A fancy way of saying, 'deal with greater/lesser/(numearl) for spell names'.
     * this is for term linking as the PRD and PFSRD refer to a single page for all
     * strength varients.
     */
    formatSpellStrength: function(spellName) {
        if (!spellName) return null;
        var retval = spellName;
        var strengths = ["mass","lesser","greater","IX","VIII","VII","VI","IV","V","III","II","I"];
        
        for (var level in strengths) {
            if (spellName.indexOf(strengths[level]) != -1) {
                retval = spellName.replace(strengths[level],"").trim();
                break;
            }
        }
        return retval;
    },
    
    /**
     * Given a string which we recognize as a legal name (spell/feat/whatever)
     * and, which we suspect may have a superscript or subscript; remove it.
     */
    formatSuperSubScript: function(str) {
        if (!str) return null;
        var retval = str;
        var cases = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th",
            "UM","TG","UC","APG","MC","D","B"];
        var endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
        for (script in cases) {
            if (endsWith(str,cases[script])) {
                retval = str.replace(cases[script],"").trim();
                break;
            }
        }
        
        return retval;
    },
    
    /**
     * Format attacks 
     */
    formatAttacks: function(str, type, charId, label, specials) {
        if (!str || !type || !charId) return null;
        if (!label) label = type;
        var volley = null, attacks = null, atkList = null;
        var cnt = 0;
        var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
            'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        atkList = "!\n" + this.fields.menuWhis
            + this.menuTemplate.boundryImg({imgLink: this.design.atkTopImg})
            + this.menuTemplate.midDiv({imgLink: this.design.atkMidImg})
                + '<div style="text-align:center">'
                    + this.menuTemplate.titleFmt({
                        style: this.design.atkTitleFmt, 
                        title: this.creName
                    })
                    + this.menuTemplate.titleFmt({
                        style: this.design.atkLabelFmt,
                        title: type
                    })
                +'</div>';

        str = str.replace(type,"").trim();
        str = str.replace(/\band\b/g,',');
        volley = str.split(/\bor\b/g);
        if (volley.length > 1) {
            while (volley.length > 0) {
                if (!volley[0] || !volley[0].match(/[^\s]+/)) {
                    volley.shift();
                    continue;
                }
                if (alphabet.length <= 0) alphabet.unshift(++cnt);
                attacks = volley[0].split(/,(?![^\(\)]*\))/);
                atkList += this.addAttacks(attacks,charId,label,specials,alphabet[0]);
                volley.shift();
                alphabet.shift();
            }
        } else {
            attacks = str.split(/,(?![^\(\)]*\))/);
            atkList += this.addAttacks(attacks,charId,label,specials);
        }

        atkList = atkList
            + '</div>'
            + this.menuTemplate.boundryImg({imgLink: this.design.atkBotImg})
        this.addAbility(label,'',atkList,false,charId);
        

    },
    
    /**
     * Adds attacks
     */
    addAttacks: function(aryList, charId, label, specials, volley) {
        if (!aryList || !label || !charId) return null;
        var attack = null, atkName = null, atkMod = null,
                atkRiders = null, atkDamage = null, atkIter = null,
                critRange = null, atkStr = null, dmgStr = null,
                abName = null; iterCnt = null, atkList = ""
                atkTitle = null;
        
        this.creLog(aryList + " " + label + " " + volley,1);
            
        for (var i = 0; i < aryList.length; ++i) {
            if (!aryList[i] || !aryList[i].match(/[^\s]+/)) {
                continue;
            }
            attack = aryList[i].trim();
            atkName = attack.match(/\b[^\d\(\)\+\/×]+(?=\+|\-)/);
            if (!atkName) {
                /* if we don't have an attack name, we either don't have 
                    a modifier or there's a modifier with no name..*/
                /* if there is no modifier, the name spans from 0,
                    to the first paren, absorb the rider into the
                    name if any; if there's no paren cough up the error ghost.
                    If there is a modifier, then append a default name*/
                if (attack.substring(0,attack.indexOf('(')).match(/\+\-/)) {
                    atkName = "Basic " + label + " ";
                    attack = atkName + attack;
                } else {
                    atkName = attack.substring(0,attack.indexOf('(')).trim();
                }
            } else 
                atkName = attack.substring(
                    0,attack.indexOf(atkName[0])+atkName[0].length).trim();
            // Ensure there's a damage section
            if (attack.match(/\(.+\)/)) {
                atkMod = attack.substring(atkName.length,attack.indexOf('(')-1).trim();
                atkDamage = attack.substring(attack.indexOf('(')+1,attack.indexOf(')'));
                atkRiders = atkMod.match(/\b[^\d\(\)\+\-\/×]+/);
            } else {
                atkMod = this.getBonusNumber(attack);
                atkDamage = "0";
            }
            
            critRange =this.getCritRange(atkDamage);
            atkDamage = this.formatDamage(atkDamage,specials);
            // do iteratives:
            atkIter = atkMod.split('/');
            if (atkIter.length > 1)
                while(atkIter.length > 0) {
                    ++iterCnt;
/*
                    atkStr = "!\n" + this.fields.publicEm + this.fields.publicName + " attacks with "
                        + atkName + "!\n" 
                        + this.fields.publicAtkEm + "[[1d20"+(critRange.range<20 ? ("cs>"+critRange.range) : '') 
                        + atkIter[0] + "]]" + ((critRange.range<20||critRange.multi>2) ?
                            " (" + ((critRange.range<20 ? (critRange.range + "-20"):"")
                            + (critRange.multi>2 ? ("×" + critRange.multi):"") + ")"):"") 
                        + (null==atkRiders ? "\n" : ( " ["+atkRiders[0].trim() + "]\n"))
                        + this.fields.publicDmgEm + atkDamage;
*/

                    atkTitle = this.fields.publicName + " attacks with " + atkName + "!";
                    atkStr = "[[1d20"+(critRange.range<20 ? ("cs>"+critRange.range) : '') 
                        + atkIter[0] + "]]" + ((critRange.range<20||critRange.multi>2) ?
                            " (" + ((critRange.range<20 ? (critRange.range + "-20"):"")
                            + (critRange.multi>2 ? ((critRange.range<20 ? '/×':'×') + critRange.multi):"") + ")"):"") 
                        + (null==atkRiders ? '' : ( " ["+atkRiders[0].trim() + "]"));
                    abName = label + (volley ? ("["+volley+"]") : '')
                        + "_" + atkName + "(" + iterCnt + ")";
                    atkStr = "!\n" + this.fields.publicAnn + this.applyAtkTemp(this.fields.tmpAtk,atkTitle,atkStr,atkDamage.damage);
                    atkStr = atkStr + (atkDamage.rider=="" ? '':('\n'+this.fields.resultWhis+atkDamage.rider));
                    this.addAbility(abName,'',atkStr,false,charId);
                    atkIter.shift();
                    atkList = atkList
                            + this.menuTemplate.midButton({
                                riders: null,
                                creName: this.creName,
                                abName: abName,
                                btnName: abName
                            });
                }
            else {
/*
                atkStr = "!\n" + this.fields.publicEm + this.fields.publicName + " attacks with "
                    + atkName + "!\n" 
                    + this.fields.publicAtkEm + "[[1d20"+(critRange.range<20 ? ("cs>"+critRange.range) : '') + atkMod +"]]"
                    + ((critRange.range<20||critRange.multi>2) ?
                            " (" + ((critRange.range<20 ? (critRange.range + "-20"):"")
                            + (critRange.multi>2 ? ("×" + critRange.multi):"") + ")"):"") 
                    + (null==atkRiders ? "\n" : ( " ["+atkRiders[0].trim()+"]\n"))
                    + this.fields.publicDmgEm + atkDamage;
*/
                atkTitle = this.fields.publicName + " attacks with " + atkName + "!";
                atkStr = (atkMod != '' ? "[[1d20"+(critRange.range<20 ? ("cs>"+critRange.range) : '') 
                    + atkMod + "]]" : 'auto-hit') + ((critRange.range<20||critRange.multi>2) ?
                        " (" + ((critRange.range<20 ? (critRange.range + "-20"):"")
                        + (critRange.multi>2 ? ((critRange.range<20 ? '/×':'×') + critRange.multi):"") + ")"):"") 
                    + (null==atkRiders ? '' : ( " ["+atkRiders[0].trim() + "]"));
                abName = label + (volley ? ("["+volley+"]") : '')
                        + "_" + atkName;
                atkStr = "!\n" + this.fields.publicAnn + this.applyAtkTemp(this.fields.tmpAtk,atkTitle,atkStr,atkDamage.damage);
                atkStr = atkStr + (atkDamage.rider=="" ? '':('\n'+this.fields.resultWhis+atkDamage.rider));
                
                this.addAbility(abName,'',atkStr,false,charId);
                atkList = atkList
                            + this.menuTemplate.midButton({
                                riders: null,
                                creName: this.creName,
                                abName: abName,
                                btnName: abName
                            });
            }
            this.creLog(attack + " atkname: '" + atkName + "' atkmod: '" + atkMod + "' atkDam: '"
                + atkDamage + "' atkRiders: '" + atkRiders + "'",1);
        }
        return atkList;
    },
    
    /**
     * Gets the crit range from the damage string.
     */
    getCritRange: function(str) {
        if (!str) return {range: 20, multi: 2};
        var retval = null, multi = 2,range = 20,tmp = "";
        var terms = str.split("/");
        
        if (terms.length > 0) {
            for (var i = 0; i < terms.length; ++i) {
                if (terms[i].match(/×\d+/)) {
                    multi = terms[i].match(/\d+/g);
                    if (!multi) multi = 2;
                } else if ((tmp=terms[i].match(/\b\d+\-\d+/))) {
                    range = tmp[0].match(/\d+/g);
                    if (!range) range = 2;
                }   
            }
        }
        
        retval = {
            range: parseInt(range),
            multi: parseInt(multi)
        };
        return retval;
    },
    
    /**
     * Format the damage string and attach any riders if any. Be careful about
     * subrider semantics.
     */
    formatDamage: function(str, specials) {
        if (!str) return {damage: "", rider: ""};
        var retval = null;
        var damage=null, damageStr="", damageExpr=null, 
            damageTypes=null,riders=null,riderStr="",ploc = -1,tmp = null;
        var re = /\d+d\d+/;
        
        this.creLog("formatDamage str: " + str,2);
        damage = re.exec(str);
        ploc = str.indexOf('plus');
        
        // if flat, or rider only damage section
        if (damage == null) {
            if (ploc != -1) {
                damageStr = str.substring(0,ploc).match(/\b[\d]+\s/);
                if (!damageStr) {
                    damageStr = str.match(/\b[^\d\/\(\)\+×\s]+\b/);
                    this.creLog("damageStr: " + damageStr,3);
                    if (!damageStr) // give up if things get too weird
                        throw "ERROR: Bad damage format: '" + str + "'";
                    str = str.substring(0,ploc+4)
                        + ' ' + damageStr[0].trim() + ','
                        + str.substring(ploc+4);
                }
            } else if ((damageStr = str.match(/\b[^\d\/\(\)\+×\s]+\b/)) != null) {
                str = str + " plus " + damageStr[0].trim();
            }
            damageStr = '[[0d0]]'
        } else {
            damageExpr = this.getExpandedExpr(damage[0],str,damage.index).trim();
            damageStr = this.getFormattedRoll(damageExpr);
            // handle damage type
            damageTypes = str.match(/\b[^\d\/\(\)\+×]+\b/);
            if (damageTypes) {
                /* In the case where we have a type we need to get rid of the critical
                    expression */
                this.creLog("formatDamage Types: " + damageTypes,3);
                if (str.match("plus") == null) {
                    tmp = str.indexOf('/');
                    tmp = str.substring(str.indexOf(damageExpr)+damageExpr.length,
                        (tmp==-1 ? str.length:tmp)).trim();
                    damageStr += " " + tmp;
                } else {
                    tmp = str.indexOf('/');
                    tmp = str.substring(str.indexOf(damageExpr)+damageExpr.length,
                        (tmp==-1 ? ploc:tmp)).trim();
                    damageStr += " " + tmp;
                }
            }
        }

        // handle riders
        if (str.match("plus")) {
            riders = str.substring(str.indexOf("plus"));
            this.creLog("riders are: " + riders,3);
            riders = riders.replace("plus","");
            var ary = riders.split(/,(?![^\(\)]*\))/);
            var riderName = null;
            var subRiders = null;
            this.creLog('ary: ' + ary);
            while (ary.length > 0) {
                if (!ary[0] || !ary[0].match(/[^\s]+/)) {
                    ary.shift();
                    continue;
                }
                riderName = ary[0].match(/\b[^\d\/\(\)\+×]+/);
                // resolve unlabed/typed damage riders
                if (!riderName) {
                    riderName = 'untyped';
                    ary[0] = riderName + ary[0];
                } else {
                    riderName = riderName[0];
                }
                subRiders = ary[0].replace(riderName,'').trim();
                riderName = riderName.toLowerCase().trim();
                this.creLog("ary val: " + ary[0],4);
                this.creLog("subrider: " + subRiders + " riderName: " + riderName,4);
                this.creLog("specials: " + specials[riderName],4);
                if (!specials) {
                    riderStr +=
                        "<div>"
                            + this.getTermLink(riderName,this.termEnum.GENERAL) 
                            + " "+(subRiders.match(/[^\s]+/) ? (" "+this.getFormattedRoll(subRiders)) : '')
                        + "</div>";
                } else {
                    riderStr +=
                        "<div>"
                            + ((specials[riderName] ? this.getFormattedRoll(this.getDamageRiderInfo(riderName,specials)) : undefined) || this.getTermLink(riderName,this.termEnum.GENERAL))
                            + " "+(subRiders.match(/[^\s]+/) ? (" "+this.getFormattedRoll(subRiders,this.termEnum.GENERAL)) : '');
                        + "</div>";
                }
                ary.shift();
            }
        }
        this.creLog("formatDamage: " + damageStr + " riders: " + riderStr,1);
        retval = {
            damage: damageStr,
            rider: riderStr
        };
        return retval;
    },
    
    /**
     * Gets all damage rider information
     */
    getDamageRiderInfo: function(riderName,specials) {
        var retval = "";
        var riderInfo = null;
        var re = null;
        if (specials) {
            riderInfo = specials[riderName];
            this.creLog("RiderInfo: " + riderInfo,3);
            if (riderInfo != null)
                while(riderInfo.length > 0) {
                    re = new RegExp("\\b"+riderName+"\\b",'ig');
                    riderInfo[0] = riderInfo[0].replace(
                        re,this.getTermLink(riderName,this.termEnum.GENERAL)+" ");
                    retval += "<p>" + riderInfo[0] + "</p>" ;
                    this.creLog("RiderInfoLine: " + retval,3);
                    riderInfo.shift();
                }
        }
        return retval;
    },
    
    /**
     * Format an attribute by the type desired:
     * 0 - scalar, grab the first number
     * 1 - pos/neg, grab the first number as well as the sign if any
     */
    formatAttribute: function(name, type, charId) {
        if (!name || !charId) return null;
        if (!type) type = 0;
        var retval = 0;
        var attr = null;
        
        attr = findObjs({
                _type: "attribute",
                name: name,
                _characterid: charId 
        })[0];
        
        if (!attr) {
            throw "Error: no attribute found '" + name + "'";
        }
        retval = attr.get("current");
      
        switch (type) {
            case 0:
                retval = retval.match(/\d+/g)[0];
                break;
            case 1:
                retval = this.getBonusNumber(retval);
                break;
        }
        this.creLog("formatAttribute: " + retval +  " n: " + name + " t: " + type + " c: " + charId,2);
            
        attr.set('current',retval);
        attr.set('max',retval);
        return retval;
    },
    
    /**
     * Apply attack template
     */
    applyAtkTemp: function(template,titleStr,atkStr,dmgStr) {
        if (!template || !titleStr || !atkStr || !dmgStr) return null;
        this.creLog("title: " + titleStr + " atk " + atkStr + " dmg " + dmgStr + template,2);
        var retval = null;
        if (!template.match(this.atkEnum.ATTACK) || !template.match(this.atkEnum.DAMAGE)) {
            log("attack template is malformed");
            return retval;
        }
        retval = template.replace('<<'+this.atkEnum.TITLE+'>>',titleStr);
        retval = retval.replace('<<'+this.atkEnum.ATTACK+'>>',atkStr);
        retval = retval.replace('<<'+this.atkEnum.DAMAGE+'>>',dmgStr);
        return retval;
    },

    /**
     * Add an attribute to a character
     */
    addAttribute: function(name, curVal, maxVal, charId) {
        this.creLog("addAttribute: " + name + " " + curVal + " " + maxVal + " " + charId,2);
            
        createObj("attribute", {
                name: name,
                current: curVal,
                max: maxVal,
                characterid: charId
            });
    },
    
    /**
     * Add an ability to a character
     */
    addAbility: function(name, desc, action, isTokenAct, charId) {
        createObj("ability", {
            name: name,
            description: desc,
            action: action,
            istokenaction: isTokenAct,
            characterid: charId
            });
    },
    
    /**
     * Add an ability roll from an attribute
     */
    addAttributeRoll: function(name, attrName, isPublic, isTokenAction, charId, rider) {
        if (!name,!attr,!charId) return null;
        if (!isPublic) isPublic = false;
        var action = "";
        var attr = findObjs({
                _type: "attribute",
                name: attrName,
                _characterid: charId 
        })[0];
        if (!attr) {
            throw ("Error: no attribute found '" + name + "'");
        }
        action = "!\n" + (isPublic ? this.fields.publicAnn : this.fields.resultWhis) + 
            this.creName + ": " + attrName + ": [[ 1d20" 
            + this.getBonusNumber(attr.get('current')) + (rider ? " "+rider:'') + "]]";
            
        this.addAbility(name,"",action,isTokenAction,charId);
    },
    
    /**
     * Given a line containing the most attributes, add them to the
     * character
     */
    addAttrList: function(line, aryList, startFnd, termChars, charId) {
        if (!aryList || !termChars || !charId) return null;
        if (!line) line = this.data[0];
        if (!startFnd) startFnd = 0;
        
        this.creLog("addAttrList: " + startFnd + " " + termChars + " " + charId + " " + line + " " + (aryList==null),3);
        while(aryList.length > 0) {
            rc = this.getValueByName(aryList[0],line,termChars);
            if (rc == null) {
                var nextBestLine = this.getLineByName(aryList[0],this.data,startFnd);
                rc = this.getValueByName(aryList[0],nextBestLine,termChars);
                if (rc == null) {
                    throw ("ERROR: could not find attribute " + aryList[0]);
                }
            }
            this.addAttribute(aryList[0],rc,rc,charId);
            aryList.shift();
        }
    },
    
    /**
     * Return a link whose format depends on type
     */
    getTermLink: function(str,type,label) {
        if (!str || !type) return null;
        if (!label) label = str;
        var retval = str;
        switch(type) {
            case this.termEnum.GENERAL:
                retval = this.getFormattedUrl(str,this.fields.urlTermGeneral,label);
                break;
            case this.termEnum.SPELL:
                retval = this.getFormattedUrl(str,this.fields.urlTermSpell,label);
                break;
            case this.termEnum.FEAT:
                retval = this.getFormattedUrl(str,this.fields.urlTermFeat,label);
                break;
            case this.termEnum.SQ:
                retval = this.getFormattedUrl(str,this.fields.urlTermSQ,label);
                break;
            case this.termEnum.SA:
                retval = this.getFormattedUrl(str,this.fields.urlTermSA,label);
                break;
            default:
                retval = str;
        }
        this.creLog("getTermLink: " + retval,3);
        return retval;
    },

    /**
     * Return a formatted URL by filling in placeholders. with str and label
     */
    getFormattedUrl: function(str,url,label) {
        if (!str || !url) return null;
        if (!label) label = str;
        var retval = null;
        var re = /<<\w+>>/g;
        var matches = null, cond = null;
        
        this.creLog("formatting str: '" + str + "' on url: '" + url + "'",4);
        if ((matches=url.match(re))) {
            while (matches.length > 0) {
                this.creLog("formaturl: " + matches[0],5);
                matches[0] = matches[0].replace(/<<|>>/g,"");
                if ((cond=matches[0].match(/\D+/))) {
                    this.creLog("formaturl word: " + cond[0],5);
                    switch(cond[0]) {
                        case this.urlCondEnum.FULL:
                            url=url.replace("<<"+this.urlCondEnum.FULL+">>",str);
                            break;
                        case this.urlCondEnum.LABEL:
                            url=url.replace("<<"+this.urlCondEnum.LABEL+">>",label)
                            break;
                        default:
                            this.creLog("unsupported url subsitution: " + matches[0],1);
                    }
                    
                } else if ((cond=matches[0].match(/\d+/))) {
                    cond = parseInt(cond);
                    this.creLog("formaturl char: " + cond,5);
                    if (cond < str.length) 
                        url=url.replace("<<"+matches[0]+">>",str[cond]);
                    else
                        this.creLog("illegal string index of " + cond + " in '" + str + "'",1);
                }
                matches.shift();
            }
        }
        retval = url;
        this.creLog("formattedUrl: " + retval,4);
        return retval;
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
     * Return the string with the roll formatted, this is accomplished by simply
     * surrounding roll equations with [[ ]] TODO, should be replaced with a
     * single regex
     * 
     */
    getFormattedRoll: function(str) {
        if (!str) return "";
        var retval = str;
        var re = /\d+d\d+/;
        var idx = null, expr = null, roll = null, pre = null, post = null;

        if ((roll=re.exec(str)) != null) {
            expr = this.getExpandedExpr(roll[0],str,roll.index);
            idx = str.indexOf(expr);
            pre = str.substring(0,idx);
            post = str.substring(idx+expr.length);
        } else { return str;}
        
        return pre+"[["+expr+"]]"+this.getFormattedRoll(post);
    },
    
    /**
     * Return the target expression expanded as far as it logically can span
     * within the provided line.
     * 
     * ie: target = 1d20
     *     locHint = 4
     *     line = "2+1d20+5+2d4 bla (bla 1d20+8 bla) bla (4d8...) bla bla"
     * 
     * result = 2+1d20+5+2d4
     */
    getExpandedExpr: function(target, line, locHint) {
        if (!target || !line) return null;
        if (!locHint) locHint = 0;
        var retval = target;
        var expr = target;
        var re = /\d|[\+\-]|d/;
        var loc = -1, start = 0, end = 0;
        
        if((loc=line.indexOf(target,locHint)) != -1) {
            start = loc;
            while (start > 0) {
                if (line[start].match(re))
                    start--;
                else
                    {start++;break;}
            }
            end = loc;
            while (end < line.length) {
                if (line[end].match(re))
                    end++;
                else
                    break;
            }
            retval = line.substring(start,end);
            this.creLog("getExpandedExpr: '" 
                    + retval + "' s: " + start + " e: " + end + " t: " + target + " l: " + line,4);
            retval = this.getLegalRollExpr(retval);
        }
        
        return retval;
    },
    
    /**
     * Gets a legal roll expression.
     * TODO strip trailing operands +1d6 and such
     */
    getLegalRollExpr: function(expr) {
        if (!expr) return null;
        var retval = expr;
        var stray = expr.match(/d/g);
        var valid = expr.match(/\d+d\d+/g);
        var errMsg = "Illegal expression " + expr;
        
        try {
            if (expr.match(/[^\s\d\+-d]/g) 
            || !stray 
            || !valid 
            || (stray.length =! valid.length))
                throw errMsg;
            stray = expr.match(/\+/g);
            valid = expr.match(/\d+\+\d+/g);
            if ((stray != null) && (valid != null) 
            && (stray.length != valid.length))
                throw errMsg;
            stray = expr.match(/-/g);
            valid = expr.match(/\d+-\d+/g);
            if ((stray != null) && (valid != null) 
            && (stray.length != valid.length))
                throw errMsg;
        } catch (e) {
            this.creLog(e,1);
            throw e;
        }
        
        //check for leading, trailing, operands
        if (retval[0].match(/\+|\-/))
            retval = retval.substring(1);
        if (retval[retval.length-1].match(/\+|\-/))
            retval = retval.substring(0,retval.length-1);
        
        this.creLog("getLegalRollExpr: " + retval,4);
        return retval;
    },
    
    /**
     * Given a name, array of lines, and a start/end location, find the first 
     * line that contains the given name.
     */
    getLineByName: function(strName, aryLines, locStart, locEnd) {
        if (!strName || !aryLines) return null;
        if (!locStart) locStart = 0;
        if (!locEnd) locEnd = aryLines.length;
        var retval = null;
        
        this.creLog("getLineByName: " + strName + " " + locStart + " " + locEnd + " " + (aryLines==null),5);
        for (var i = locStart; i < locEnd; ++i)
            if (aryLines[i].indexOf(strName) != -1) {
                retval = aryLines[i];
                break;
            }
        return retval;
    },

    /**
     * Given a name, array of lines, and a start/end location, find the first
     * line # that contains the given name.
     */
    getLineNumberByName: function(strName, aryLines, locStart, locEnd) {
        if (!strName || !aryLines) return null;
        if (!locStart) locStart = 0;
        if (!locEnd) locEnd = aryLines.length;
        var retval = null;
        
        this.creLog("getLineByName: " + strName + " " + locStart + " " + locEnd + " " + (aryLines==null),5);
        for (var i = locStart; i < locEnd; ++i)
            if (aryLines[i].indexOf(strName) != -1) {
                retval = i;
                break;
            }
        return retval;
    },
    
    /**
     * Given a line, name, and terminators return the value, value is
     * the the trimed text after the name and before the terminator.
     */
    getValueByName: function(strName, strLine, termChars) {
        if (!strLine || !strName || !termChars) return null;
        var retval = null;
        var loc = -1;
        var locTerm = strLine.length;
        
        this.creLog("getValueByName: " + strName + " " + termChars + " " + strLine,5);
        if ((loc=strLine.indexOf(strName)) != -1) {
            for (var i = 0; i < termChars.length; ++i) {
                var tmp = strLine.indexOf(termChars[i],loc);
                if ((tmp != -1) && (tmp < locTerm)) 
                    locTerm = tmp;
            }
            if (locTerm > loc) {
                locTerm = CreatureGenPF.getParenSafeTerm(
                    strLine,loc,locTerm,termChars);
                retval = strLine.substring(loc+strName.length,locTerm);
            }
        }
        return retval;
    },
    
    /**
     * Get the location of the closest terminator that is paren safe. If there
     * are parens. Probably a faster way exists using regex and exec..
     */
    getParenSafeTerm: function(strLine, start, end, termChars) {
        var newTerm = -1;
        var inParen = 0;
        var closeLoc = -1;
        
        if (start >= end) return end;
        for (var i = start; i < strLine.length; ++i) {
            if (strLine[i] == '(')
                inParen++;
            else if (strLine[i] ==')')
                inParen--;
            if (i >= end) {
                if (inParen <= 0) return end;
                else if (inParen > 0) break;
            }
        }
        if (inParen <= 0) return end;
        
        // if we found we're in parens
        this.creLog("in parens for " + strLine + " openparens: " + inParen,5);
        closeLoc = strLine.indexOf(')',start);
        end = strLine.length;
        if (closeLoc == -1) return end;
        for (var i = 0; i < termChars.length; ++i) {
            if (-1 == (newTerm=strLine.indexOf(termChars[i],closeLoc)))
                newTerm = strLine.length;
            else if (newTerm < end)
                end = newTerm;
        }
        return end;
    },
    
    /**
     * check if the character object exists, return first match
     */
    characterObjExists: function(name, type, charId) {
        var retval = null;
        var obj = findObjs({
            _type: type,
            name: name,
            _characterid: charId 
        });
        this.creLog("type: " + type + " name: " + name + " charId: " + charId + " retval: " + obj,5);
        if (obj.length > 0)
            retval = obj[0];
        return retval;
    },
    
    /** removes all occurence of removeStr in str and replaces them with 
     * replaceWidth
     * 
     * @author Andy W.
     */
    stripString: function(str, removeStr, replaceWith) {
        while (str.indexOf(removeStr) != -1) {
            str = str.replace(removeStr, replaceWith);
        }
        return str;
    },

    /**
     * Cleans the string preserving select special characters and dropping the
     * remainder.
     * 
     * @author Andy W.
     * @contributor Ken L.
     */
    cleanString: function(strSpecials) {
        strSpecials = this.stripString(strSpecials, "%20", ' ');
        strSpecials = this.stripString(strSpecials, "%22", '"');
        strSpecials = this.stripString(strSpecials, "%29", ')');
        strSpecials = this.stripString(strSpecials, "%28", '(');
        strSpecials = this.stripString(strSpecials, "%2C", ',');
        strSpecials = this.stripString(strSpecials, "%42", '');
        strSpecials = this.stripString(strSpecials, "*", '');
        strSpecials = this.stripString(strSpecials, '\n', '');
        strSpecials = this.stripString(strSpecials, '%3Cbr', '');
        
        strSpecials = this.stripString(strSpecials, "%09", '    ');
        strSpecials = this.stripString(strSpecials, "%3C", '<');
        strSpecials = this.stripString(strSpecials, "%3E", '>');
        strSpecials = this.stripString(strSpecials, "%23", '#');
        strSpecials = this.stripString(strSpecials, "%3A", ':');
        strSpecials = this.stripString(strSpecials, "%3B", ';');
        strSpecials = this.stripString(strSpecials, "%3D", '=');
        strSpecials = this.stripString(strSpecials, "%D7", '×');
        strSpecials = this.stripString(strSpecials, "%u2018", '');
        strSpecials = this.stripString(strSpecials, "%u2019", '');
        strSpecials = this.stripString(strSpecials, "%u2013", '-');
        strSpecials = this.stripString(strSpecials, "%u2014", '—');
        strSpecials = this.stripString(strSpecials, "%u201C", '“');
        strSpecials = this.stripString(strSpecials, "%u201D", '”');
        
        
        while (strSpecials.search(/%../) != -1) {
            strSpecials = strSpecials.replace(/%../, "");
        }
        
        strSpecials = strSpecials.replace(/<[^<>]+>|<\/[^<>]+>/g,'');
        //strSpecials = strSpecials.replace(/<(?:.|\n)*?>/gm, '');
        return strSpecials;
    },
    
    /**
     * Logging, store it
     */
    creLog: function(msg, lvl) {
        if (!msg)  return null;
        if (!lvl) lvl = 1;
        if (this.dmesg) {
            this.dmesg.push('['+lvl+']:' + " " + msg);
        } else {
            this.dmesg = new Array('['+lvl+']:' + " " + msg);
        }
    },
    
    /**
     * Dump it.
     */
    creLogDump: function(lvl) {
        if (this.dmesg) {
            log('--- Dumping log at level ['+lvl+'] ---');
            for (var line in this.dmesg) {
                var clvl = this.dmesg[line].match(/\d+/);
                if (clvl && (parseInt(clvl[0].trim()) <= lvl))
                    log(this.dmesg[line]);
            }
            log('--- Log dump at level ['+lvl+'] complete ---');
        } else {log("No log found");}
    },
    
    /**
     * Add warnings
     */
    addWarning: function(msg) {
        if (this.warn)
            this.warn.push(msg);
        else
            this.warn = new Array(msg);
    },
    
    /**
     * Send warnings
     */
    sendWarnings: function(token) {
        var content = '';
        if (this.warn) {
            for (elem in this.warn) {
                content += '<p>' 
                    + '<span style="color: #FF9100; font-weight: bold">Warning: </span>'
                    + this.warn[elem] + '</p>';
            }
            this.sendFeedback(content,this.design.warningImg,token.get('imgsrc'));
        }
    },
    
    /**
     * Fake message is fake!
     */
    sendFeedback: function(msg,img,tokenImg) {
        var content = '/w GM '
                + '<div style="position: absolute; top: 4px; left: 5px; width: 26px;">'
                    + '<img src="' + this.design.feedbackImg + '">' 
                + '</div>'
                + msg;
        if (tokenImg && img) {
            content = content
                + '<div style="position: relative">'
                    + '<div style="position: relative; width: 70px; height: 70px; overflow: hidden;">'
                        + '<img src="' + tokenImg + '" style="position: relative; width: 70px; height: 70px;">'
                    + '</div>'
                    + '<div style="position: absolute; top: 0px; width: 70px; height: 70px;">'
                        + '<img src="' + img + '" style="position: relative;">'
                    + '</div>'
                + '</div>';
        }
        
        sendChat(this.design.feedbackName,content);
    },
    
    /**
     * Performs Genesis with a default name other than 'Creature''
     */
    doNameGenesis: function(msg, name) {
        if (!msg || !name) return null;
        var originalDefaultName = this.fields.defaultName;
        
        this.fields.defaultName = name;
        this.doGenesis(msg);
        this.fields.defaultName = originalDefaultName;
    },
    
    /**
     * Performs Genesis granting control to a player
     */
    doPlayerGenesis: function(msg, playerName) {
        if (!msg || !playerName) return null;
        var players = null;
        var name = null;
        var targets = new Array();
        var targetName = null;
        var targetPlayer = null;
        var levDiff = 0;
        var minDiff = 255; // good enough
        var originalMenuWhis = this.fields.menuWhis;
        var originalResultWhis = this.fields.resultWhis;
        var originalName = this.fields.publicName;
        var originalPublicAnn = this.fields.publicAnn;
        var re = new RegExp(playerName,'i');
        players = findObjs({
            _type: "player",
        });
        
        for (var elem in players) {
            name = players[elem].get('_displayname').toLowerCase();
            if (name.match(re)) {
                targets.push(players[elem]);
            }
        }
        
        if (targets.length < 1) {
            this.sendFeedback('Could not find player: ' + playerName);
            return null;
        } else if (targets.length == 1) {
            targetName = targets[0].get('_displayname').toLowerCase();
            targetPlayer = targets[0];
        } else {
            targetName = targets[0].get('_displayname').toLowerCase();
            for (var elem in targets) {
                name = targets[elem].get('_displayname').toLowerCase();
                levDiff = this.getLev(playerName,name);
                if (levDiff < minDiff) {
                    minDiff = levDiff;
                    targetName = name;
                    targetPlayer = targets[elem];
                }
            }
        }
        this.fields.menuWhis = '/w "'+targetName+'" ';
        this.fields.resultWhis = '';
        this.fields.publicAnn = '';
        this.fields.summoner = targetPlayer;
        this.doGenesis(msg);
        this.fields.summoner = null;
        this.fields.publicAnn = originalPublicAnn;
        this.fields.publicName = originalName;
        this.fields.resultWhis = originalResultWhis;
        this.fields.menuWhis = originalMenuWhis;
    },
    
    getLev: function(s1, s2, cost_ins, cost_rep, cost_del) {
    //       discuss at: http://phpjs.org/functions/levenshtein/
    //      original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    //      bugfixed by: Onno Marsman
    //       revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    // reimplemented by: Alexander M Beedie
    // reimplemented by: Rafał Kukawski
    //        example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    //        returns 1: 3
    //        example 2: levenshtein("carrrot", "carrots");
    //        returns 2: 2
    //        example 3: levenshtein("carrrot", "carrots", 2, 3, 4);
    //        returns 3: 6
        var LEVENSHTEIN_MAX_LENGTH = 255; // PHP limits the function to max 255 character-long strings
  
        cost_ins = cost_ins == null ? 1 : +cost_ins;
        cost_rep = cost_rep == null ? 1 : +cost_rep;
        cost_del = cost_del == null ? 1 : +cost_del;

        if (s1 == s2) {
            return 0;
        }

        var l1 = s1.length;
        var l2 = s2.length;
  
        if (l1 === 0) {
            return l2 * cost_ins;
        }
        if (l2 === 0) {
            return l1 * cost_del;
        }
  
        // Enable the 3 lines below to set the same limits on string length as PHP does
        /*if (l1 > LEVENSHTEIN_MAX_LENGTH || l2 > LEVENSHTEIN_MAX_LENGTH) {
            return -1;
        }*/

        // BEGIN STATIC
        var split = false;
        try {
            split = !('0')[0];
        } catch (e) {
            // Earlier IE may not support access by string index
            split = true;
        }
        // END STATIC
        if (split) {
            s1 = s1.split('');
            s2 = s2.split('');
        }

        var p1 = new Array(l2 + 1);
        var p2 = new Array(l2 + 1);

        var i1, i2, c0, c1, c2, tmp;
  
        for (i2 = 0; i2 <= l2; i2++) {
            p1[i2] = i2 * cost_ins;
        }
  
        for (i1 = 0; i1 < l1 ; i1++) {
            p2[0] = p1[0] + cost_del;
    
            for (i2 = 0; i2 < l2; i2++) {
                c0 = p1[i2] + ((s1[i1] == s2[i2]) ? 0 : cost_rep);
                c1 = p1[i2 + 1] + cost_del;
      
                if (c1 < c0) {
                    c0 = c1;
                }
      
                c2 = p2[i2] + cost_ins;
      
                if (c2 < c0) {
                    c0 = c2;
                }
      
                p2[i2 + 1] = c0;
            }
    
            tmp = p1;
            p1 = p2;
            p2 = tmp;
        }
  
        c0 = p1[l2];
  
        return c0;
    },
    
    /**
     * "And then the GM said, let there be monsters!" 
     * 
     * Performs Creature Generation
     */
    doGenesis: function(msg) {
        if (!(msg.selected && msg.selected.length > 0)) {
            this.sendFeedback("no token selected for creature creation");
            return;
        }
        var token = getObj('graphic', msg.selected[0]._id);
        if ((token && (token.get('_subtype') != 'token')) || !token) {
            this.sendFeedback("invalid selection for creature creation");
            return;
        }

        try {
            this.dmesg = null;
            this.warn = null;
            this.scan(token);
            if (this.warn) {
                this.sendWarnings(token);
            } else {
                this.sendFeedback(
                    '<span style="font-weight: bold; color: #08AF12;">' 
                    + token.get('name') 
                    + '</span>' 
                    + " has been generated successfully!",
                    this.design.successImg,
                    token.get('imgsrc'));
            }
            //this.creLogDump(5);
            this.character = null;
        } catch (e) {
            log("GENESIS ERROR: " + e);
            this.sendFeedback(
                '<span style="font-weight: bold; color: #FF0000;">' 
                + 'There was an error during token generation.' 
                + '</span> '
                + 'Please see the log for details, and delete the erroneous journal entry.',
            this.design.errorImg,
            token.get("imgsrc"));
            this.creLogDump(this.debugLvl);
            this.warn = null;
            this.character = null;
            log("-----Please ensure that the statistics block is properly formatted.-----")
        }
    },
    
    /**
     * Show help
     */
    showHelp: function() {
        var content = null;
        var designTmpList = "";
        var attackTmpList = "";
        
        if (typeof(CGTmp) != "undefined") {
            try {
                for (tmp in CGTmp.designTmp) {
                    designTmpList += '<div>' + '<a href="!CreatureGen -set-design ' + tmp + '">' + tmp + ' </a></div>';
                }
                for (tmp in CGTmp.attackTmp) {
                    attackTmpList += '<div>' + '<a href="!CreatureGen -set-attack ' + tmp + '">' + tmp + ' </a></div>';
                }
            } catch (e) {
                log("ERROR accessing CGTmp: " + e);
                designTmpList = "";
                attackTmpList = "";
            }
        }
        content = '<div style="background-color: #FFFFFF; border: 1px solid black; left-margin 5x; right margin 5px; padding-top: 5px; padding-bottom: 5px;;">'
                    + '<div style="border-bottom: 1px solid black;">'
                        + '<span style="font-weight: bold; font-size: 150%">CreatureGen v'+this.version+'</span>'
                    + '</div>'
                    + '<div style="padding-left: 10px; padding-right: 10px;">'
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -help</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Display this message'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Generate creature'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -name [name]</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Generate creature with the given default name'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -player [name]</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Generate player controlled creature (a summon)'
                        + '</li>'
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -set-design [name]</span>'
                        + '</div>'
                        + '<div style="float: right; margin-left 2px; padding-top: 2px; padding-bottom: 2px; padding-left: 2px; padding-right: 2px; border: 1px solid black; background-color: #89FEBA; text-align: center; font-weight: bold;">'
                            + (state.cgen_design ? state.cgen_design : "Default")
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Set design template'
                        + '</li>'
                        + (designTmpList=='' ? '' : '<div style="border: 1px solid blue; text-align: center;"><span style="text-decoration: underline;">Available design templates:</span>')
                            + designTmpList
                        + (designTmpList=='' ? '' : '</div>')
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -set-attack [name]</span>'
                        + '</div>'
                        + '<div style="float: right; margin-left 2px; padding-top: 2px; padding-bottom: 2px; padding-left: 2px; padding-right: 2px; border: 1px solid black; background-color: #89FEBA; text-align: center; font-weight: bold;">'
                            + (state.cgen_attack ? state.cgen_attack : "Default")
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Set attack template'
                        + '</li>'
                        + (attackTmpList=='' ? '' : '<div style="border: 1px solid blue; text-align: center;"><span style="text-decoration: underline;">Available attack templates:</span>')
                            + attackTmpList
                        + (attackTmpList=='' ? '' : '</div>')
                        + '<div>'
                            + '<span style="font-weight: bold;">!CreatureGen -dmesg [lvl]</span>'
                        + '</div>'
                        + '<li style="padding-left: 10px;">'
                            + 'Dump to API-output console debug at the specified level (1-5) for the last token generated.'
                        + '</li>'
                    + '</div>'
                    
                    + '</div>'
                + '</div>';
        this.sendFeedback(content);
    },
    
    /**
     * Handle chat messages
     */
    handleChatMessage: function(msg) {
        var cmdName = "!CreatureGen";
        var msgTxt = msg.content;
        var args = null;
        if ((msg.type == "api") 
        && (msgTxt.indexOf(cmdName) != -1)
        && playerIsGM(msg.playerid)) {
            args = msgTxt.replace(cmdName,'').trim().toLowerCase();
            if (args != "") {
                if (this.locked) {
                    this.sendFeedback('<span style="color: #FF8D0B; font-weight: bold;">'
                        + ' BUSY </span>');
                } else if (args.indexOf('-set-design') === 0) {
                    args = args.replace('-set-design','').trim();
                    this.selectDesignTemplate(args);
                } else if(args.indexOf('-set-attack') === 0) {
                    args = args.replace('-set-attack','').trim();
                    this.selectAttackTemplate(args);
                } else if (args.indexOf('-help') === 0) {
                    this.showHelp();
                } else if (args.indexOf('-dmesg') === 0) {
                    var level = 0;
                    args = args.replace('-dmesg','').trim();
                    level = this.getBonusNumber(args,this.bonusEnum.SCALAR);
                    this.creLogDump(level);
                    this.sendFeedback('<span style="color: #FF8D0B;">'
                        + 'Dumping debug from last <b>GENESIS</b> at level ('+level+')'
                        + '</span>');
                } else if (args.indexOf('-player') === 0) {
                    args = args.replace('-player','').trim();
                    this.doPlayerGenesis(msg,args);
                } else if (args.indexOf('-name') === 0) {
                    args = args.replace('-name','').trim();
                    this.doNameGenesis(msg,args);
                } else {
                    this.sendFeedback("Unknown CreatureGen command '"+args+"'");
                    this.showHelp();
                }
                
            } else {
                this.doGenesis(msg);
            }
        }
    },
    
    /**
     * Handle new graphics added
     */
    handleAddGraphic: function(obj) {
        var type = null;
        var charSheet = null;
        var charId = null;
        if ((type=obj.get('_subtype')) !=null) {
           if (type == 'token') {
                charSheet = obj.get('represents');
                if (charSheet != null) {
                    charSheet = getObj("character", charSheet);
                    if (charSheet) {
                        this.prepToken(obj,charSheet);
                    }
                }
            }
        }
    },
    
    /**
     * Register Roll20 handlers
     */
    registerAPI: function() {
        // auto hp/ac/link populate
        on("add:graphic", function(obj) {
            CreatureGenPF.handleAddGraphic(obj);
        });
        // handle messages
        on("chat:message", function(msg) {
            CreatureGenPF.handleChatMessage(msg);
        });
    },

}



on("ready", function() {
    CreatureGenPF.init();
    CreatureGenPF.registerAPI();
});

