// ==UserScript==
// @name        LSS Chat permanent whisper
// @version     1.3
// @description Enables permanent whisper in alliance chat.
// @author      Crazycake
// @include     /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/?$/
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    var chathead = document.getElementById("chat_panel_heading");
    chathead.insertAdjacentHTML('beforebegin',
    '<div id="WhisperDiv" class="pull-right" style="padding-top:2%;padding-right:2%;padding-left:1%"> Permanent whisper to <input id="whisperUser" list="whisperUserList"><datalist id="whisperUserList"></datalist> <input type="checkbox" id="Whisper"></div>');


    var allianceinfo = {};
    var AllianceUsersDatalistArray = [];
    var whisperUserList = document.getElementById("whisperUserList");
    $.getJSON('/api/allianceinfo', function(data){
    allianceinfo = data;
    var allianceUsers = [];
    for(var i = 0; i < allianceinfo.users.length ; i++)
    {
        allianceUsers.push(allianceinfo.users[i].name);
    }
    allianceUsers.forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        whisperUserList.appendChild(option);
    })
    });


    function ToggleWhisper()
    {
        var checkbox = document.getElementById("Whisper");
        var chatinhalt = document.getElementById("alliance_chat_message").value;
        var whisperUser = document.getElementById("whisperUser").value;

        if(checkbox.checked == true)
        {
            if(!chatinhalt.includes("/w"))
            {
                var w = "/w " + whisperUser;
                var chatinhalt_old = chatinhalt;
                chatinhalt = w.concat(chatinhalt_old);
                document.getElementById("alliance_chat_message").value = chatinhalt;
            }
        }
        else
        {
            document.getElementById("alliance_chat_message").value = chatinhalt.replace("/w ","").replace(whisperUser, "");
        }
    }

    var ToggleListener = document.querySelector("#Whisper");
    if(ToggleListener)
    {
        ToggleListener.addEventListener("click",ToggleWhisper);
    }
    var ReloadListener = document.querySelector("#new_alliance_chat");
    if(ReloadListener)
    {
        ReloadListener.addEventListener("submit", ToggleWhisper);
    }
})();