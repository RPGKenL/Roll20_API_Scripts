/**
 * Copyright (C) 2015   Alan H.
 *                      Ken L.
 *                      Russ H.
 *                      Yanet H.
 */
var CGTmp = {
        designTmp: {
            Default: {
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
            
                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%; text-shadow: -1px -1px 1px #FFD58D, 1px -1px 1px #FFD58D, -1px 1px 1px #FFD58D, 1px 1px 1px #FFD58D;"',
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
            Minimal: {
                feedbackName: 'Ken L.',
                feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/3466065/uiXt3Zh5EoHDkXmhGUumYQ/thumb.jpg?1395313520',
                errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
                warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
                successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',
                
                skillTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                skillLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
            
                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellBookLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
            
                spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
            
                specialTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                specialLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                
                atkTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                
                atkMenuTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkMenuLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                
                genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                genLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
                genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/8033936/v1T2I-AegTteSvnL7sECwA/thumb.png?1425423578',
                genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/8033298/sWLU_HTxD7qtwS48i0ceug/thumb.jpg?1425423303',
            },
            Alan: {
                feedbackName: 'Alan H.',
                feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/7672907/5Sk9jJNTLJ5q5T3MM8v5ZQ/thumb.png?1423756474',
                errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
                warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
                successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',
                
                skillTitleFmt: 'style="color: #CECECE; font-weight: bold; font-size: 125%;"',
                skillLabelFmt: 'style="color: #73D793; font-weight: bold; font-size: 110%;"',
                skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7863829/0sQJn76TJJUIAixfR7h6_g/thumb.png?1424636114',
                skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7863835/vdc772VFZ3cDPivngUczMg/thumb.png?1424636120',
                skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7863842/neSAc4X8BMRAyYF2Td6nZg/thumb.png?1424636124',

                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellBookLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7632818/4hH9RLxxZRf3ynZugWgehw/thumb.png?1423524375',
                spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7632821/0EMoD4dxBtrTNM0O34uo8g/thumb.png?1423524381',
                spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7632824/5Dt8raKCYdUJkSjOl-c50A/thumb.png?1423524388',
    
                spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;text-shadow: -1px -1px 1px #A4E8FF, 1px -1px 1px #A4E8FF, -1px 1px 1px #A4E8FF0, 1px 1px 1px #A4E8FF;"',
                spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7632818/4hH9RLxxZRf3ynZugWgehw/thumb.png?1423524375',
                spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7632821/0EMoD4dxBtrTNM0O34uo8g/thumb.png?1423524381',
                spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7632824/5Dt8raKCYdUJkSjOl-c50A/thumb.png?1423524388',
    
                specialTitleFmt: 'style="color: #CECECE; font-weight: bold; font-size: 125%;"',
                specialLabelFmt: 'style="color: #73D793; font-weight: bold; font-size: 110%;"',
                specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858402/mkBf2bmthC487NBrZxrgGA/thumb.png?1424622102',
                specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7687656/uBSndr8hKYs5jH6AFC8q9A/thumb.png?1423834061',
                specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7687658/Ii5mKOXjZUHvBBXfF2ACDw/thumb.png?1423834066',
    
                atkTitleFmt: 'style="color: #CECECE; font-weight: bold; font-size: 125%;"',
                atkLabelFmt: 'style="color: #73D793; font-weight: bold; font-size: 110%;"',
                atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858402/mkBf2bmthC487NBrZxrgGA/thumb.png?1424622102',
                atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7687656/uBSndr8hKYs5jH6AFC8q9A/thumb.png?1423834061',
                atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7687658/Ii5mKOXjZUHvBBXfF2ACDw/thumb.png?1423834066',
    
                atkMenuTitleFmt: 'style="color: #CECECE; font-weight: bold; font-size: 125%;"',
                atkMenuLabelFmt: 'style="color: #73D793; font-weight: bold; font-size: 110%;"',
                atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858402/mkBf2bmthC487NBrZxrgGA/thumb.png?1424622102',
                atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7687656/uBSndr8hKYs5jH6AFC8q9A/thumb.png?1423834061',
                atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7687658/Ii5mKOXjZUHvBBXfF2ACDw/thumb.png?1423834066',

                genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                genLabelFmt: 'style="color: #1E5831; font-weight: bold; font-size: 110%;"',
                genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7864366/5I5bPn8LqiyJm09W5Qeadw/thumb.png?1424636862',
                genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7864441/AHiEd3UlZAeitNS7aK8a6Q/thumb.png?1424636924',
                genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7864368/MeWVtnSkxg-Jt0wENh-7AA/thumb.png?1424636863',
            },
            Russ: {
                feedbackName: 'Russ H.',
                feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/7672910/obSoVjDulPY0B19-O9N_cA/thumb.jpg?1423756488',
                errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
                warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
                successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',

                skillTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                skillLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7642731/YiTRy2P7aObdlIDVx0rmbQ/thumb.png?1423584170',
                skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642725/1yn2LqzakJbYfk2MZ45cMg/thumb.png?1423584159',
    
                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellBookLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7642733/CDW7khyuaK3ZahdcCr4J2w/thumb.png?1423584170',
                spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                spellBookMidOvr: 'https://s3.amazonaws.com/files.d20.io/images/7879745/BE4NpPehQl_9x6r7wo3-Hw/thumb.png?1424710890',
                spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642723/JT20HdarR1LsaMNO-EwObw/thumb.png?1423584158',
    
                spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7625129/sw1_Y8vxMMqOAhUxg7T32g/med.png?1423491655',
                spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642725/1yn2LqzakJbYfk2MZ45cMg/thumb.png?1423584159',
    
                specialTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                specialLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7642732/IFckniV1U4CC5LtAdjIHfw/thumb.png?1423584170',
                specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642725/1yn2LqzakJbYfk2MZ45cMg/thumb.png?1423584159',
    
                atkTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7642726/5rHbtBMBg4-h8QGV6jQ16w/thumb.png?1423584160',
                atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642723/JT20HdarR1LsaMNO-EwObw/thumb.png?1423584158',
    
                atkMenuTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkMenuLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7625120/kBKEhYjQtFfHkAG-21AdEA/med.png?1423491591',
                atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642725/1yn2LqzakJbYfk2MZ45cMg/thumb.png?1423584159',
    
                genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                genLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7602994/V99JfSwZkt3kyAcNehJeBw/med.png?1423410793',
                genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7642718/phY3uOsekNg1mC9XAQBEqA/thumb.png?1423584157',
                genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7642723/JT20HdarR1LsaMNO-EwObw/thumb.png?1423584158',
            },
            RhyGold: {
                feedbackName: 'Rhyannon',
                feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/7672917/Xx8LBqWVOBOcLZZaXWT9WA/thumb.png?1423756562',
                errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
                warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
                successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',

                skillTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                skillLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858099/m2-pUwEKl2rxEhVAGHqJGg/thumb.png?1424621381',
                skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858102/6GdFeNI6kb9RbD94MXR0PA/thumb.png?1424621385',
                skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858104/xjaY06OtSy6HHFIkMZBveA/thumb.png?1424621388',
    
                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%; text-shadow: -1px -1px 1px #EFE7B3, 1px -1px 1px #EFE7B3, -1px 1px 1px #EFE7B3, 1px 1px 1px #EFE7B3;"',
                spellBookLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858099/m2-pUwEKl2rxEhVAGHqJGg/thumb.png?1424621381',
                spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858102/6GdFeNI6kb9RbD94MXR0PA/thumb.png?1424621385',
                spellBookMidOvr: 'https://s3.amazonaws.com/files.d20.io/images/7883375/OYbwyJh5hmklaeCqPk_dPw/thumb.png?1424727804',
                spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858104/xjaY06OtSy6HHFIkMZBveA/thumb.png?1424621388',
    
                spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858099/m2-pUwEKl2rxEhVAGHqJGg/thumb.png?1424621381',
                spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858102/6GdFeNI6kb9RbD94MXR0PA/thumb.png?1424621385',
                spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858104/xjaY06OtSy6HHFIkMZBveA/thumb.png?1424621388',
    
                specialTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                specialLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858099/m2-pUwEKl2rxEhVAGHqJGg/thumb.png?1424621381',
                specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858102/6GdFeNI6kb9RbD94MXR0PA/thumb.png?1424621385',
                specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858104/xjaY06OtSy6HHFIkMZBveA/thumb.png?1424621388',
    
                atkTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858107/G4RNL4tN5vIzNm9rmXPOeQ/thumb.png?1424621391',
                atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858109/epUo2JFfiOQF37TdBVRXSQ/thumb.png?1424621395',
                atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858110/uhlpp99EqrkU0m4sB6dkWg/thumb.png?1424621398',
  
                atkMenuTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkMenuLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858107/G4RNL4tN5vIzNm9rmXPOeQ/thumb.png?1424621391',
                atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858109/epUo2JFfiOQF37TdBVRXSQ/thumb.png?1424621395',
                atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858110/uhlpp99EqrkU0m4sB6dkWg/thumb.png?1424621398',
    
                genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                genLabelFmt: 'style="color: #44824C; font-weight: bold; font-size: 110%;"',
                genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7858099/m2-pUwEKl2rxEhVAGHqJGg/thumb.png?1424621381',
                genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7858102/6GdFeNI6kb9RbD94MXR0PA/thumb.png?1424621385',
                genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7858104/xjaY06OtSy6HHFIkMZBveA/thumb.png?1424621388',
            },
           RhyTech: {
                feedbackName: 'Rhyannon',
                feedbackImg: 'https://s3.amazonaws.com/files.d20.io/images/7672917/Xx8LBqWVOBOcLZZaXWT9WA/thumb.png?1423756562',
                errorImg: 'https://s3.amazonaws.com/files.d20.io/images/7545187/fjEEs0Jvjz1uy3mGN5A_3Q/thumb.png?1423165317',
                warningImg: 'https://s3.amazonaws.com/files.d20.io/images/7926480/NaBmVmKe94rdzXwVnLq0-w/thumb.png?1424965188',
                successImg: 'https://s3.amazonaws.com/files.d20.io/images/7545189/5BR2W-XkmeVyXNsk-C8Z6g/thumb.png?1423165325',

                skillTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                skillLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                skillTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830468/-d3k4-_MAPiLdpNEGDkoww/thumb.?1424516370',
                skillMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                skillBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',

                spellBookTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellBookLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                spellBookTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830469/MqEWcNv2Ls-DFlGMTc1R9g/thumb.?1424516375',
                spellBookMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                spellBookBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',

                spellTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                spellLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                spellTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830469/MqEWcNv2Ls-DFlGMTc1R9g/thumb.?1424516375',
                spellMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                spellBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',
    
                specialTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                specialLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                specialTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830463/-oRmA78QnAqLbvnYlD3WSg/thumb.?1424516356',
                specialMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                specialBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',
    
                atkTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                atkTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830463/-oRmA78QnAqLbvnYlD3WSg/thumb.?1424516356',
                atkMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                atkBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',
 
                atkMenuTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                atkMenuLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                atkMenuTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830463/-oRmA78QnAqLbvnYlD3WSg/thumb.?1424516356',
                atkMenuMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                atkMenuBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',
    
                genTitleFmt: 'style="color: #000000; font-weight: bold; font-size: 125%;"',
                genLabelFmt: 'style="color: #89FF8F; font-weight: bold; font-size: 110%;"',
                genTopImg: 'https://s3.amazonaws.com/files.d20.io/images/7830470/m8WFrUPNAI0-AocUxk8bWQ/thumb.?1424516379',
                genMidImg: 'https://s3.amazonaws.com/files.d20.io/images/7830466/xEXh-rYAt7mEvq7qjQnpMg/thumb.?1424516361',
                genBotImg: 'https://s3.amazonaws.com/files.d20.io/images/7830467/S2lyP7fq-azrVJLwJdUcQg/thumb.?1424516365',
            },
        },

        attackTmp: {
            Default: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
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

            Inline:  '<div>'
                        + '<div style="text-align: center; color: #DB831F; background-color: #F5E4D3; font-style: italic; font-weight: bold; width: 100%">'
                            + '<<TITLE>>'
                        + '</div>'
                        + '<div style="text-align: left;">'
                            + '<span style="font-weight: bold">Attack:</span> <<ATTACK>><br>'
                            + '<span style="font-weight: bold">Damage:</span> <<DAMAGE>>'
                        + '</div>'
                    + '</div>',

            RussBattle: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7857319/Kbl7G5xObj0KhSMkibl85g/thumb.png?1424618429"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7857320/2kUQK52rBufUxt8weW9qyQ/thumb.png?1424618433"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7857321/FLKC3Eh0VkuQIzQ6ICb7Jw/thumb.png?1424618436"+'">'
                    + '</div>',

            RussDungeon: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7751178/4-rk5wmID8eHrooROYhX2g/med.png?1424118461"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7751183/64Ir1daclJDdC0FZbYvjuw/med.png?1424118473"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7751186/F29abDlGHId24XbobFkzhQ/med.png?1424118484"+'">'
                    + '</div>',

            AlanBattle: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7687655/Vf9ao63aXLedOrWokANpFg/thumb.png?1423834057"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7687656/uBSndr8hKYs5jH6AFC8q9A/thumb.png?1423834061"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                        + '<div>'
                            + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                                + '<span style="font-weight: bold;"><<TITLE>></span>'
                            + '</div>'
                            + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                                + '<table style="width: 160px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7687658/Ii5mKOXjZUHvBBXfF2ACDw/thumb.png?1423834066"+'">'
                    + '</div>',

            AlanTech: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7927556/ro94IevGYOhvO_q4J0u2rA/thumb.png?1424971484"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7927557/IH6ZX_lwr8rtvCNejopgCw/thumb.png?1424971487"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                        + '<div>'
                            + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                                + '<span style="font-weight: bold;"><<TITLE>></span>'
                            + '</div>'
                            + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                                + '<table style="width: 160px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7927558/cz2dUNm7AHAx2ISS6IALqA/thumb.png?1424971499"+'">'
                    + '</div>',

            AlanJedi: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7926346/pVMnL4baSiCsx56ETdbJvQ/thumb.png?1424963885"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7926347/eGOZO5RE9v0v_7FjCWSy7g/thumb.png?1424963888"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                        + '<div>'
                            + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                                + '<span style="font-weight: bold;"><<TITLE>></span>'
                            + '</div>'
                            + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                                + '<table style="width: 160px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7926348/Xg3uexqt5iclvkXOiFA33Q/thumb.png?1424963891"+'">'
                    + '</div>',

            AlanMonster: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7927618/y6I7PFxju5dGoLtC3QGLcA/thumb.png?1424971695"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7927621/2zqwlHhCffx8c-vy9rM8rw/thumb.png?1424971699"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                        + '<div>'
                            + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                                + '<span style="font-weight: bold;"><<TITLE>></span>'
                            + '</div>'
                            + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                                + '<table style="width: 160px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7927622/e4L7NSCVTUjJD3pdJckOtw/thumb.png?1424971703"+'">'
                    + '</div>',

            Tech: '<div class="img" style="column-gap: 0; line-height: 0; position: relative; text-align: center;">'
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7548981/gSLx3zzuwdp8nLwH4tLv-w/thumb.png?1423181312"+'">'
                    + '</div>'
                    + '<div style="background-image: url('+"https://s3.amazonaws.com/files.d20.io/images/7414266/I4HPBEwJh7VUcEorwWSoWA/thumb.png?1422570206"+'); background-repeat: repeat-y; background-position: center center; text-align: center; padding-left: 7px; padding-right: 7px;">'
                        + '<div>'
                            + '<div style="colspan: 2; color: #FFFFFF; font-style: italic; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; margin-left: auto; margin-right: auto; width: 160px">'
                                + '<span style="font-weight: bold;"><<TITLE>></span>'
                            + '</div>'
                            + '<div style="color: #FFFFFF; text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000; padding-top: 4px; padding-bottom: 4px; display: block; font-weight: bold;">'
                                + '<table style="width: 160px; text-align: left; margin-left: auto; margin-right: auto; border-spacing: 5;">'
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
                        + '<img src="'+"https://s3.amazonaws.com/files.d20.io/images/7548984/ORVCA9UF1ebotxWT0moV9w/thumb.png?1423181318"+'">'
                    + '</div>',
                    
        },
}
    
