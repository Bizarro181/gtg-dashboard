(function(e){function t(t){for(var n,i,o=t[0],m=t[1],c=t[2],u=0,l=[];u<o.length;u++)i=o[u],s[i]&&l.push(s[i][0]),s[i]=0;for(n in m)Object.prototype.hasOwnProperty.call(m,n)&&(e[n]=m[n]);d&&d(t);while(l.length)l.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,i=1;i<a.length;i++){var m=a[i];0!==s[m]&&(n=!1)}n&&(r.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},s={app:0},r=[];function i(e){return o.p+"js/"+({about:"about"}[e]||e)+"."+{about:"20a1dd68"}[e]+".js"}function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(e){var t=[],a=s[e];if(0!==a)if(a)t.push(a[2]);else{var n=new Promise(function(t,n){a=s[e]=[t,n]});t.push(a[2]=n);var r,m=document.createElement("script");m.charset="utf-8",m.timeout=120,o.nc&&m.setAttribute("nonce",o.nc),m.src=i(e),r=function(t){m.onerror=m.onload=null,clearTimeout(c);var a=s[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+n+": "+r+")");i.type=n,i.request=r,a[1](i)}s[e]=void 0}};var c=setTimeout(function(){r({type:"timeout",target:m})},12e4);m.onerror=m.onload=r,document.head.appendChild(m)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.oe=function(e){throw console.error(e),e};var m=window["webpackJsonp"]=window["webpackJsonp"]||[],c=m.push.bind(m);m.push=t,m=m.slice();for(var u=0;u<m.length;u++)t(m[u]);var d=c;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"01ac":function(e,t,a){},"15ad":function(e,t,a){"use strict";var n=a("ce11"),s=a.n(n);s.a},"1a97":function(e,t,a){"use strict";var n=a("01ac"),s=a.n(n);s.a},"515b":function(e,t,a){},"565c":function(e,t,a){"use strict";var n=a("9c6e"),s=a.n(n);s.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{attrs:{id:"nav"}},[a("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/games"}},[e._v("Games")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/teams"}},[e._v("Teams")])],1),a("router-view")],1)},r=[],i=(a("5c0b"),a("2877")),o={},m=Object(i["a"])(o,s,r,!1,null,null,null),c=m.exports,u=a("8c4f"),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"sidebar"},[a("TeamPanel")],1),a("div",{staticClass:"main"},[a("GameGrid")],1),a("div",{staticClass:"actionBar"},[a("DashboardActions")],1)])},l=[],f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("ul",{staticClass:"gameGrid",class:{isRunning:e.roundRunning}},e._l(e.games,function(t){return a("li",{staticClass:"gameItem",class:{open:e.isOpen(t.id),inactive:!t.active}},[a("div",{staticClass:"gameSettingsToggle",on:{click:function(a){return e.toggleOpen(t.id)}}},[e._v("*")]),a("p",{staticClass:"gameName"},[e._v(e._s(t.name))]),""!==t.teamNext?a("p",{staticClass:"info"},[e.teamById(t.teamNext)?a("span",{staticClass:"teamName"},[e._v(e._s(e.teamById(t.teamNext).name)+" "),a("span",{staticClass:"moveText",on:{click:function(t){return e.openModal()}}},[e._v("Move")])]):e._e(),a("br"),a("span",{staticClass:"stateLabel"},[e._v("Next Team")])]):e._e(),""!==t.teamCurrent?a("p",{staticClass:"info"},[e.teamById(t.teamCurrent)?a("span",{staticClass:"teamName"},[e._v(e._s(e.teamById(t.teamCurrent).name))]):e._e(),a("br"),a("span",{staticClass:"stateLabel"},[e._v("Current Team")])]):e._e(),""==t.teamNext&&""==t.teamCurrent?a("p",{staticClass:"info empty"},[e._v("Empty")]):e._e(),a("div",{staticClass:"gameSettings"},[a("p",{staticClass:"status",class:t.status},[a("span",{staticClass:"indicator"}),e._v(e._s(t.status))]),a("ul",{staticClass:"settingActions"},[a("li",{staticClass:"settingActionItem"},["paused"!==t.status?a("button",{attrs:{disabled:"running"!==t.status},on:{click:function(a){return e.talkToGame(t.id,"pause")}}},[e._v("\n\t\t\t\t\t\t\tPause\n\t\t\t\t\t\t")]):e._e(),"paused"==t.status?a("button",{on:{click:function(a){return e.talkToGame(t.id,"pause")}}},[e._v("\n\t\t\t\t\t\t\tResume\n\t\t\t\t\t\t")]):e._e()]),a("li",{staticClass:"settingActionItem"},[a("button",{attrs:{disabled:"running"!==t.status},on:{click:function(a){return e.talkToGame(t.id,"kill")}}},[e._v("\n\t\t\t\t\t\t\tStop\n\t\t\t\t\t\t")])]),a("li",{staticClass:"settingActionItem"},[a("button",{on:{click:function(a){return e.talkToGame(t.id,"dump")}}},[e._v("\n\t\t\t\t\t\t\tCheck Status\n\t\t\t\t\t\t")])])]),a("div",{staticClass:"activateButtons"},[1==t.active?a("button",{on:{click:function(a){return e.setGameActiveState(t,!1)}}},[e._v("\n\t\t\t\t\t\tDeactivate\n\t\t\t\t\t")]):e._e(),0==t.active?a("button",{on:{click:function(a){return e.setGameActiveState(t,!0)}}},[e._v("\n\t\t\t\t\t\tActivate\n\t\t\t\t\t")]):e._e()]),a("div",{staticClass:"gameSettingsClose",on:{click:function(a){return e.toggleOpen(t.id)}}},[e._v("X")])])])}),0),e.showModal?a("div",{staticClass:"sortModal"},[a("h2",{staticClass:"modalTitle"},[e._v("Assign Teams")]),a("div",{staticClass:"listsWrapper"},[a("ul",{staticClass:"gameList"},e._l(e.activeGamesInOrder,function(t){return a("li",[e._v(e._s(t.name))])}),0),a("ul",{staticClass:"teamsList"},[a("draggable",{attrs:{group:"teams"},model:{value:e.teamsInGameOrder,callback:function(t){e.teamsInGameOrder=t},expression:"teamsInGameOrder"}},e._l(e.teamsInGameOrder,function(t){return a("li",{class:{empty:"empty"==t.name}},[e._v(e._s(t.name))])}),0)],1)]),a("div",{staticClass:"buttons"},[a("button",{staticClass:"save",on:{click:function(t){return e.saveAndCloseSort()}}},[e._v("Save")])])]):e._e(),e.showModal?a("div",{staticClass:"sortModalOverlay"}):e._e()])},g=[],p=a("cebc"),h=(a("ac6a"),a("20d6"),a("7514"),a("7f7f"),a("2f62")),v=a("310e"),y=a.n(v),b={data:function(){return{ui:[],gameData:{name:"",order:"",active:!0,id:""},showModal:!1,teamsInGameOrder:[]}},methods:{addGame:function(){this.$store.dispatch("addGame",{name:this.gameData.name,order:this.gameData.order,active:!0}),this.gameData.name="",this.gameData.order=""},removeGame:function(e){this.$store.dispatch("removeGame",e)},isOpen:function(e){var t=this.ui.find(function(t){return t.id==e});return"undefined"!==typeof t?t.menuOpen:void 0},toggleOpen:function(e){var t=this.ui.findIndex(function(t){return t.id==e});this.ui[t].menuOpen=!this.ui[t].menuOpen},talkToGame:function(e,t){this.$store.dispatch("talkToGame",{id:e,route:t})},checkStatus:function(e){this.$store.dispatch("checkStatus",e)},openModal:function(){var e=this;this.teamsInGameOrder=[],this.activeGamesInOrder.forEach(function(t){""!==t.teamNext?e.teamsInGameOrder.push(e.teamById(t.teamNext)):e.teamsInGameOrder.push({name:"empty",placeholder:!0})}),this.showModal=!0},setGameActiveState:function(e,t){1==t?this.$store.commit("updateGameActive",e):this.$store.commit("updateGameInactive",e)},saveAndCloseSort:function(){var e=this;this.showModal=!1,this.activeGamesInOrder.forEach(function(t){e.$store.commit("clearTeamNextOnGame",t)}),this.teamsInGameOrder.forEach(function(t,a){var n=e.activeGamesInOrder[a];e.$store.commit("clearGameNextOnTeam",t),e.$store.commit("clearTeamNextOnGame",n),"empty"!==t.name&&(e.$store.commit("assignGameToTeam",{game:n,teamNext:t.id}),e.$store.commit("assignNextTeamToGame",{team:t,gameNext:n.id}))}),this.showModal=!1}},computed:Object(p["a"])({},Object(h["b"])({teamById:"teamById",games:"gamesInOrder",roundRunning:"running",activeGamesInOrder:"activeGamesInOrder"})),created:function(){var e=this;this.$store.dispatch("fetchGames").then(function(){e.games.forEach(function(t){e.ui.push({id:t.id,menuOpen:!1})})})},components:{draggable:y.a}},_=b,C=(a("8621"),Object(i["a"])(_,f,g,!1,null,"0c02b9b6",null)),T=C.exports,G=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"teamPanel"},[a("ul",{staticClass:"teamsList"},e._l(e.teams,function(t,n){return a("li",{staticClass:"teamItem",class:{ready:t.ready}},[a("div",{staticClass:"teamInfo"},[a("div",{staticClass:"teamInfoWrapper"},[a("p",{staticClass:"teamName"},[e._v(e._s(t.name))]),a("p",{staticClass:"points"},[a("input",{staticClass:"inactiveTextArea",domProps:{value:e.scoresById(t.id)?e.scoresById(t.id):0},on:{blur:function(a){return e.updateScore(t,a)}}}),e._v(" points")]),a("p",{staticClass:"gamesPlayed"},[a("span",{staticClass:"bold"},[e._v(e._s(e.scoreCountById(t.id)?e.scoreCountById(t.id):0))]),e._v(" "+e._s(e.gamesText(e.scoreCountById(t.id)))+" played")])]),a("div",{staticClass:"teamActions"},[a("div",{staticClass:"teamAction readyAction"},[a("input",{attrs:{id:"ready",type:"checkbox",disabled:!t.ready&&!e.canReady},domProps:{checked:t.ready},on:{change:function(t){return e.validateReady(n,t)}}}),a("label",{attrs:{for:"ready"}},[e._v("Ready?")])]),a("div",{staticClass:"teamAction removeAction",attrs:{disabled:t.ready},on:{click:function(t){return e.removeTeam(n)}}},[e._v("\n\t\t\t\t\t\tRemove\n\t\t\t\t\t")])])])])}),0),a("form",{on:{submit:function(t){return t.preventDefault(),e.addTeam(t)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.name,expression:"teamData.name"}],attrs:{type:"text",placeholder:"Team Name"},domProps:{value:e.teamData.name},on:{input:function(t){t.target.composing||e.$set(e.teamData,"name",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.emails,expression:"teamData.emails"}],attrs:{type:"text",placeholder:"Email(s)"},domProps:{value:e.teamData.emails},on:{input:function(t){t.target.composing||e.$set(e.teamData,"emails",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.members,expression:"teamData.members"}],attrs:{type:"text",placeholder:"Members"},domProps:{value:e.teamData.members},on:{input:function(t){t.target.composing||e.$set(e.teamData,"members",t.target.value)}}}),a("button",{attrs:{type:"submit"}},[e._v("Add")])])])},I=[],O=(a("28a5"),{data:function(){return{teamData:{name:"",emails:"",id:"",members:1},nouns:["ninjas","chairs","pancakes","statues","unicorns","rainbows","lasers","senors","bunnies","captains","cupcakes","carrots","gnomes","glitters","potatoes","salads","curtains","beets","toilets","dragons","jellybeans","snakes","dolls","bushes","cookies","apples","kazoos","singers","trampolines","carousels","carnival","locomotives","balloons","artisans","artists","colorists","inkers","coppersmiths","directors","designers","models","musicians","pencillers","producers","teachers","mechanics","beaders","engineers","millers","moldmakers","plants","bears","pilots","fletchers"],adjs:["adamant","boorish","calamitous","caustic","bald","itchy","fierce","great","massive","little","big","fat","skinny","clean","dirty","fancy","fit","gentle","happy","sad","morose","embarrased","rowdy","jolly","silly","excellent","breathtaking","wandering","precise","knowing"]}},methods:{addTeam:function(){""==this.teamData.name&&this.generateTeamName(),this.$store.dispatch("createTeam",{name:this.teamData.name,emails:this.teamData.emails.split(","),members:this.teamData.members}),this.teamData.name="",this.teamData.emails="",this.teamData.ready="",this.teamData.members=1},validateReady:function(e,t){t.preventDefault(),!1===this.teams[e].ready&&this.readyTeams.length+1<=this.activeGamesInOrder.length?this.$store.commit("setTeamReadyStatus",{team:this.teams[e],status:!0}):!0===this.teams[e].ready&&this.$store.commit("setTeamReadyStatus",{team:this.teams[e],status:!1})},generateTeamName:function(){var e=Math.floor(Math.random()*this.adjs.length),t=Math.floor(Math.random()*this.nouns.length);this.teamData.name=this.adjs[e]+" "+this.nouns[t]},gamesText:function(e){return 1==e?"game":"games"},removeTeam:function(e){this.teams[e].ready||this.$store.commit("removeTeam",e)},updateScore:function(e,t){console.log(t.target.value),this.$store.dispatch("updateTeamScore",{team:e,score:t.target.value})}},computed:Object(p["a"])({teams:function(){return this.$store.getters.teams},readyTeams:function(){return this.$store.getters.readyTeams},activeGamesInOrder:function(){return this.$store.getters.activeGamesInOrder},canReady:function(){return this.readyTeams.length+1<=this.activeGamesInOrder.length}},Object(h["b"])({scoresById:"scoresById",scoreCountById:"scoreCountById"}))}),x=O,D=(a("15ad"),Object(i["a"])(x,G,I,!1,null,"1d9e870c",null)),k=D.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"actionWrapper"},[a("button",{staticClass:"rotate",attrs:{disabled:0===e.readyTeams.length||e.roundReady||e.roundRunning},on:{click:e.nextRound}},[e._v("Rotate Teams")]),a("button",{staticClass:"lock",attrs:{disabled:!e.roundReady||e.roundRunning||e.teamsLocked},on:{click:e.lockTeams}},[e._v("Lock Teams")]),a("button",{staticClass:"start",attrs:{disabled:!e.teamsLocked||e.roundRunning},on:{click:e.startRound}},[e._v("Start Round")]),e.roundRunning?a("p",{staticClass:"running"},[e._v("Running")]):e._e(),a("a",{attrs:{href:"#"},on:{click:function(t){return e.clear()}}},[e._v("Clear")])])},$=[],N={data:function(){return{gameData:{name:"",order:"",active:!0,id:""}}},methods:{lockTeams:function(){this.$store.dispatch("lockTeams")},nextRound:function(){this.$store.dispatch("nextRound")},startRound:function(){this.$store.dispatch("startRound")},clear:function(){this.$store.dispatch("clear")}},computed:{readyTeams:function(){return this.$store.getters.readyTeams},roundReady:function(){return this.$store.getters.ready},roundRunning:function(){return this.$store.getters.running},teamsLocked:function(){return this.$store.getters.locked}}},R=N,B=(a("c5c5"),Object(i["a"])(R,S,$,!1,null,"50a5525b",null)),w=B.exports,j={name:"home",components:{GameGrid:T,TeamPanel:k,DashboardActions:w}},E=j,A=(a("6235"),Object(i["a"])(E,d,l,!1,null,"43a5b63e",null)),P=A.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("GameList")],1)},L=[],F=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("h1",[e._v("GameList")]),a("ul",{staticClass:"gamesList"},e._l(e.games,function(t){return a("li",{staticClass:"gameItem"},[a("p",{staticClass:"gameName"},[e._v(e._s(t.name))]),a("input",{domProps:{value:t.address},on:{input:function(a){return e.updateAddress(t.id,a)}}}),a("div",{staticClass:"actions"},[a("button",{on:{click:function(a){return e.removeGame(t.id)}}},[e._v("Remove")])])])}),0),a("form",{on:{submit:function(t){return t.preventDefault(),e.addGame(t)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameData.name,expression:"gameData.name"}],attrs:{type:"text",placeholder:"Game Name"},domProps:{value:e.gameData.name},on:{input:function(t){t.target.composing||e.$set(e.gameData,"name",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameData.address,expression:"gameData.address"}],attrs:{type:"text",placeholder:"Address"},domProps:{value:e.gameData.address},on:{input:function(t){t.target.composing||e.$set(e.gameData,"address",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameData.order,expression:"gameData.order"}],attrs:{type:"text",placeholder:"Order"},domProps:{value:e.gameData.order},on:{input:function(t){t.target.composing||e.$set(e.gameData,"order",t.target.value)}}}),a("button",{attrs:{type:"submit"}},[e._v("Add")])])])},J=[],K={data:function(){return{gameData:{name:"",order:"",active:!0,id:"",address:"localhost:2021"}}},methods:{addGame:function(){this.$store.dispatch("addGame",{name:this.gameData.name,order:this.gameData.order,active:!0,address:this.gameData.address}),this.gameData.name="",this.gameData.order="",this.gameData.address="localhost:2021"},removeGame:function(e){this.$store.dispatch("removeGame",e)},updateAddress:function(e,t){this.$store.dispatch("updateGameAddress",{gameId:e,value:t.target.value})}},computed:{games:function(){return this.$store.getters.gamesInOrder}},created:function(){this.$store.dispatch("fetchGames")}},U=K,W=(a("9dd8"),Object(i["a"])(U,F,J,!1,null,"3d4892c9",null)),z=W.exports,V={name:"home",components:{GameList:z}},H=V,X=Object(i["a"])(H,M,L,!1,null,null,null),Y=X.exports,Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("TeamList")],1)},q=[],Q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("ul",{staticClass:"teamsList"},e._l(e.teams,function(t,n){return a("li",{staticClass:"teamItem",class:{ready:t.ready}},[a("p",{staticClass:"teamName"},[e._v(e._s(t.name)),a("br"),a("span",{staticClass:"id"},[e._v(e._s(t.id))])]),a("div",{staticClass:"actions"},[a("input",{attrs:{type:"checkbox"},domProps:{checked:t.ready},on:{change:function(t){return e.validateReady(n,t)}}})])])}),0),a("form",{on:{submit:function(t){return t.preventDefault(),e.addTeam(t)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.name,expression:"teamData.name"}],attrs:{type:"text",placeholder:"Team Name"},domProps:{value:e.teamData.name},on:{input:function(t){t.target.composing||e.$set(e.teamData,"name",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.emails,expression:"teamData.emails"}],attrs:{type:"text",placeholder:"Email(s)"},domProps:{value:e.teamData.emails},on:{input:function(t){t.target.composing||e.$set(e.teamData,"emails",t.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.teamData.ready,expression:"teamData.ready"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.teamData.ready)?e._i(e.teamData.ready,null)>-1:e.teamData.ready},on:{change:function(t){var a=e.teamData.ready,n=t.target,s=!!n.checked;if(Array.isArray(a)){var r=null,i=e._i(a,r);n.checked?i<0&&e.$set(e.teamData,"ready",a.concat([r])):i>-1&&e.$set(e.teamData,"ready",a.slice(0,i).concat(a.slice(i+1)))}else e.$set(e.teamData,"ready",s)}}}),a("button",{attrs:{type:"submit"}},[e._v("Add")])])])},ee=[],te={data:function(){return{teamData:{name:"",emails:"",id:""}}},methods:{addTeam:function(){this.$store.dispatch("createTeam",{name:this.teamData.name,emails:this.teamData.emails.split(",")}),this.teamData.name="",this.teamData.emails="",this.teamData.ready=""},validateReady:function(e,t){t.preventDefault(),!1===this.teams[e].ready&&this.readyTeams.length+1<=this.activeGamesInOrder.length&&this.$store.commit("setTeamReadyStatus",{team:this.teams[e],status:!0}),!0===this.teams[e].ready&&this.$store.commit("setTeamReadyStatus",{team:this.teams[e],status:!1})}},computed:{teams:function(){return this.$store.state.teams},readyTeams:function(){return this.$store.getters.readyTeams},activeGamesInOrder:function(){return this.$store.getters.activeGamesInOrder},canReady:function(){return this.readyTeams.length+1<=this.activeGamesInOrder.length}}},ae=te,ne=(a("565c"),Object(i["a"])(ae,Q,ee,!1,null,"2bef5033",null)),se=ne.exports,re={name:"home",components:{TeamList:se}},ie=re,oe=Object(i["a"])(ie,Z,q,!1,null,null,null),me=oe.exports,ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("Scoreboard")],1)},ue=[],de=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"leaderboard"},[a("h1",{staticClass:"leaderboardHeader"},[e._v("Leaderboard")]),a("ul",{staticClass:"teamsList"},e._l(e.teamsSortedByScore,function(t,n){return a("li",{staticClass:"teamItem",class:{ready:t.ready}},[a("div",{staticClass:"scoreLeft"},[a("p",{staticClass:"teamName"},[e._v(e._s(t.name))]),a("p",{staticClass:"gamesPlayed"},[e._v(e._s(e.scoreCountById(t.id)?e.scoreCountById(t.id):0)+" "+e._s(e.gamesText(e.scoreCountById(t.id)))+" played")])]),a("div",{staticClass:"scoreRight"},[t.ready&&e.scoresById(t.id)||e.scoresById(t.id)>0?a("p",{staticClass:"score"},[e._v(e._s(e.scoresById(t.id)))]):e._e()])])}),0)])},le=[],fe={methods:{gamesText:function(e){return 1==e?"game":"games"}},computed:Object(p["a"])({},Object(h["b"])({scoresById:"scoresById",scoreCountById:"scoreCountById",teamsSortedByScore:"teamsSortedByScore"}))},ge=fe,pe=(a("1a97"),Object(i["a"])(ge,de,le,!1,null,"fd82ac1e",null)),he=pe.exports,ve={name:"home",components:{Scoreboard:he}},ye=ve,be=Object(i["a"])(ye,ce,ue,!1,null,null,null),_e=be.exports,Ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("p",[e._v("Team XYZ: Go to [GAME NAME]")]),a("p",[e._v("Team ABC: Let's do this!")]),e._v("\n\t"+e._s(e.gameName)+"\n")])},Te=[],Ge={data:function(){return{gameData:{name:"",order:"",active:!0,id:""}}},props:["gameName"],methods:{addGame:function(){this.$store.dispatch("addGame",{name:this.gameData.name,order:this.gameData.order,active:!0}),this.gameData.name="",this.gameData.order=""},removeGame:function(e){this.$store.dispatch("removeGame",e)}},computed:Object(p["a"])({},Object(h["b"])({teamById:"teamById",games:"gamesInOrder",roundRunning:"running"})),created:function(){this.$store.dispatch("fetchGames")}},Ie=Ge,Oe=(a("b4e5"),Object(i["a"])(Ie,Ce,Te,!1,null,"31878a85",null)),xe=Oe.exports,De=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[e.roundReady?[a("h1",[e._v(e._s(e.message)+" - advance to the following games")]),a("ul",{staticClass:"grid"},e._l(e.teams,function(t){return a("li",{staticClass:"gridItem"},[a("p",[a("span",{staticClass:"teamName"},[e._v(e._s(t.name))]),e._v(": "+e._s(e.gameById(t.gameNext).name))])])}),0)]:[a("p",{staticClass:"waitMessage"},[e._v("Awiting Next Instructions")])]],2)},ke=[],Se={data:function(){return{gameData:{name:"",order:"",active:!0,id:""},messages:["Great Job!","You Did It!","Excellent","Way to Go","Empty Platitudes!"],message:""}},methods:{getMessage:function(){this.message=this.messages[Math.floor(4*Math.random())]}},computed:Object(p["a"])({},Object(h["b"])({gameById:"gameById",teams:"readyTeams",roundRunning:"running",roundReady:"ready"})),watch:{roundReady:function(){this.getMessage()}}},$e=Se,Ne=(a("ff0d"),Object(i["a"])($e,De,ke,!1,null,"00408e40",null)),Re=Ne.exports;n["a"].use(u["a"]);var Be,we=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:P},{path:"/games",name:"games",component:Y},{path:"/teams",name:"teams",component:me},{path:"/scores",name:"scores",component:_e},{path:"/instructions",name:"instructions",component:Re},{path:"/game/:gameName",name:"gameInfo",component:xe,props:!0},{path:"/about",name:"about",component:function(){return a.e("about").then(a.bind(null,"f820"))}}]}),je=a("75fc"),Ee=a("bd86"),Ae=(a("55dd"),a("c23d")),Pe=(a("e89a"),Ae["firebase"].initializeApp({apiKey:"AIzaSyB70wCTCOJJlVgjNJowRfOJEdtZf67AwCE",authDomain:"gtg-dashboard.firebaseapp.com",databaseURL:"https://gtg-dashboard.firebaseio.com",projectId:"gtg-dashboard",storageBucket:"gtg-dashboard.appspot.com",messagingSenderId:"836676229202",appId:"1:836676229202:web:ab9b57ce925fbeea"})),Me=Pe.firestore(),Le=Me.collection("games"),Fe=Me.collection("teams"),Je=a("32c0"),Ke=a.n(Je),Ue=a("bc3a"),We=a.n(Ue),ze="8a529469-9676-4682-9a5f-466df3938395",Ve=Ke()("game",ze),He=Ke()("team",ze);n["a"].use(h["a"]);var Xe=new h["a"].Store({state:{session:"",running:!1,ready:!1,locked:!1,teams:[],games:[],assignments:[],scores:[],sessionInfo:{gamesStarted:0,gamesCompleted:0}},getters:(Be={teams:function(e,t){return e.teams},gamesInOrder:function(e,t){return e.games.sort(function(e,t){return e.order<t.order?-1:e.orbder>t.order?1:0})},activeGamesInOrder:function(e,t){return t.gamesInOrder.filter(function(e){return 1==e.active})},activeEmptyGamesInOrder:function(e,t){return t.activeGamesInOrder.filter(function(e){return""==e.teamNext})},gameByName:function(e,t){return function(t){e.games.filter(function(e){return e.name==t})}},gameById:function(e,t){return function(t){e.games.filter(function(e){return e.id==t})}},readyTeams:function(e,t){return e.teams.filter(function(e){return 1==e.ready})},newTeams:function(e,t){return t.readyTeams.filter(function(e){return""==e.gameStarted})},rotatingTeams:function(e,t){return t.readyTeams.filter(function(e){return""!==e.gameStarted})},nonReadyTeams:function(e,t){return e.teams.filter(function(e){return!1===e.ready})},teamById:function(e,t){return function(t){return e.teams.find(function(e){return e.id===t})}},teamsSortedByScore:function(e,t){return e.teams.sort(function(e,t){return t.score-e.score})}},Object(Ee["a"])(Be,"gameById",function(e,t){return function(t){return e.games.find(function(e){return e.id===t})}}),Object(Ee["a"])(Be,"ready",function(e){return e.ready}),Object(Ee["a"])(Be,"running",function(e){return e.running}),Object(Ee["a"])(Be,"locked",function(e){return e.locked}),Object(Ee["a"])(Be,"scoresById",function(e,t){return function(t){return e.scores.length>0&&e.scores.filter(function(e){return e.teamId===t}).map(function(e){return e.score}).reduce(function(e,t){return e+t},0)}}),Object(Ee["a"])(Be,"scoreCountById",function(e,t){return function(t){return e.scores.length>0&&e.scores.filter(function(e){return e.teamId===t&&!("exclude"in e)}).length}}),Be),actions:{SOCKET_gameComplete:function(e,t){e.commit("addScore",t),e.commit("incrementGamesCompleted"),console.log(t.teamId),console.log(e.getters.teamById(t.teamId)),e.commit("increaseScore",{team:e.getters.teamById(t.teamId),score:t.score}),e.dispatch("checkAllGamesCompleted")},SOCKET_updateTeams:function(e,t){e.commit("setTeams",t)},SOCKET_updateGames:function(e,t){e.commit("setGames",t)},SOCKET_updateScores:function(e,t){e.commit("setScores",t)},SOCKET_updateReady:function(e,t){t?e.commit("roundReadyTrue"):e.commit("roundReadyFalse")},checkAllGamesCompleted:function(e){e.state.sessionInfo.gamesCompleted==e.state.sessionInfo.gamesStarted&&(e.commit("setRunningFalse"),e.commit("resetGamesStarted"),e.commit("resetGamesCompleted"),e.commit("updateLockTeams",!1),this._vm.$socket.emit("updateReady",e.getters.ready),this._vm.$socket.emit("updateRunning",e.getters.running))},fetchGames:function(e){var t=this,a=[];return new Promise(function(n,s){Le.get().then(function(s){s.forEach(function(e){var t=e.data();t.teamCurrent="",t.teamNext="",t.status="idle",a.push(t)}),e.commit("setGames",a),n(),t._vm.$socket.emit("updateGames",e.getters.gamesInOrder)})})},updateGameAddress:function(e,t){var a=e.getters.gameById(t.gameId);Le.where("id","==",t.gameId).get().then(function(n){n.forEach(function(n){Le.doc(n.id).update({address:t.value}).then(function(){e.commit("updateGame",{game:a,value:t.value})})})})},removeGame:function(e,t){Le.where("id","==",t).get().then(function(a){a.forEach(function(a){Le.doc(a.id).delete().then(function(){var a=e.state.games.findIndex(function(e,a,n){return e.id==t});e.commit("removeGame",a)})})})},addGame:function(e,t){var a=Date.now();t.id=Ke()(t.name+a,Ve),t.created=a,t.teamCurrent="",e.commit("addGame",t),Le.add(t),this._vm.$socket.emit("updateGames",e.getters.gamesInOrder)},createTeam:function(e,t){var a=Date.now();t.id=Ke()(t.name+a,He),t.ready=!1,t.gameStarted="",t.gameCurrent="",t.gameNext="",t.score=0,e.commit("addTeam",t),Fe.add(t)},lockTeams:function(e){e.commit("updateLockTeams",!0),this._vm.$socket.emit("updateTeams",e.getters.teams),this._vm.$socket.emit("updateReady",e.getters.ready)},nextRound:function(e){var t=e.getters.rotatingTeams,a=e.getters.nonReadyTeams,n=e.getters.activeGamesInOrder;if(a.length>0&&a.forEach(function(t){n.forEach(function(a){a.teamCurrent==t.id&&(e.commit("clearTeamCurrentOnGame",a),e.commit("clearGameCurrentOnTeam",t))})}),t.length>0)for(var s=n.length-1;s>=0;s--){var r=n[s];""!==r.teamCurrent&&function(){var a={};a=s==n.length-1?n[0]:n[s+1];var i=r.teamCurrent;e.commit("assignGameToTeam",{game:a,teamNext:i}),e.commit("clearTeamCurrentOnGame",r);var o=t.find(function(e){return e.id==i});e.commit("assignNextTeamToGame",{team:o,gameNext:a.id}),e.commit("clearGameCurrentOnTeam",o)}()}var i=e.getters.newTeams;i.length>0&&i.forEach(function(t){var a=e.getters.activeEmptyGamesInOrder;e.commit("assignFirstGame",{team:t,game:a[0].id}),e.commit("assignNextTeamToGame",{team:t,gameNext:a[0].id}),e.commit("assignGameToTeam",{game:a[0],teamNext:t.id})}),e.commit("roundReadyTrue")},startRound:function(e){var t=e.state.games.filter(function(e){return e.active&&""!==e.teamNext}),a=e.state.teams.filter(function(e){return e.ready&&""!==e.gameNext});t.forEach(function(t){console.log(t.teamNext),console.log(e.getters.teamById(t.teamNext)),We()({method:"post",url:"http://"+t.address+"/start",data:{teamId:t.teamNext,playerCount:e.getters.teamById(t.teamNext).members,teamName:e.getters.teamById(t.teamNext).name}}).then(function(a){e.commit("updateGameStatus",{game:t,status:"running"})}),e.commit("startSingleGame",{game:t,nextTeam:t.teamNext}),e.commit("incrementGamesStarted")}),a.forEach(function(t){e.commit("moveTeamToGame",{team:t,nextGame:t.gameNext})}),e.commit("setRunningTrue"),this._vm.$socket.emit("updateRunning",e.getters.running),e.commit("roundReadyFalse")},releaseTeam:function(e,t){if(e.getters.running&&""!==t.teamCurrent){var a=e.getters.teamById(t.teamCurrent);e.commit("clearTeamCurrentOnGame",t),e.commit("clearGameCurrentOnTeam",a),e.commit("incrementGamesCompleted"),e.dispatch("checkAllGamesCompleted")}},talkToGame:function(e,t){var a=e.getters.gameById(t.id);We()({method:"get",url:"http://"+a.address+"/"+t.route}).then(function(n){0==a.active&&e.commit("updateGameActive",a),"pause"==t.route&&"running"==a.status?e.commit("updateGameStatus",{game:a,status:"paused"}):"pause"==t.route&&"paused"==a.status?e.commit("updateGameStatus",{game:a,status:"running"}):"kill"==t.route&&e.commit("updateGameStatus",{game:a,status:"idle"}),"kill"==t.route&&e.dispatch("releaseTeam",a)}).catch(function(t){e.dispatch("releaseTeam",a),e.commit("updateGameStatus",{game:a,status:"error"}),e.commit("updateGameInactive",a)})},clear:function(e){e.commit("setRunningFalse"),e.commit("roundReadyFalse"),this._vm.$socket.emit("updateRunning",e.getters.running),this._vm.$socket.emit("updateReady",e.getters.running),e.commit("setTeams",[]),this._vm.$socket.emit("updateTeams",e.getters.teams),e.dispatch("fetchGames")},updateTeamScore:function(e,t){var a=e.getters.scoresById(t.team.id),n=t.score,s=n-a;e.commit("addScore",{teamId:t.team.id,score:s,exclude:!0}),this._vm.$socket.emit("updateScores",e.state.scores)}},mutations:{updateGameStatus:function(e,t){t.game.status=t.status},addTeam:function(e,t){e.teams.push(t)},setTeams:function(e,t){n["a"].set(e,"teams",Object(je["a"])(t))},addGame:function(e,t){e.games.push(t)},updateGame:function(e,t){t.game.address=t.value},setGames:function(e,t){n["a"].set(e,"games",Object(je["a"])(t))},removeGame:function(e,t){e.games.splice(t,1)},assignNextTeamToGame:function(e,t){t.team.gameNext=t.gameNext},assignGameToTeam:function(e,t){t.game.teamNext=t.teamNext},assignFirstGame:function(e,t){t.team.gameStarted=t.game},startSingleGame:function(e,t){t.game.teamCurrent=t.nextTeam,t.game.teamNext=""},moveTeamToGame:function(e,t){t.team.gameCurrent=t.nextGame,t.team.gameNext=""},clearTeamNextOnGame:function(e,t){t.teamNext=""},clearGameNextOnTeam:function(e,t){t.gameNext=""},clearTeamCurrentOnGame:function(e,t){t.teamCurrent=""},clearGameCurrentOnTeam:function(e,t){t.gameCurrent=""},roundReadyTrue:function(e){e.ready=!0},roundReadyFalse:function(e){e.ready=!1},setRunningTrue:function(e){e.running=!0},setRunningFalse:function(e){e.running=!1},removeTeam:function(e,t){e.teams.splice(t,1)},setTeamReadyStatus:function(e,t){t.team.ready=t.status},addScore:function(e,t){e.scores.push(t)},setScores:function(e,t){e.scores=t},incrementGamesStarted:function(e){e.sessionInfo.gamesStarted++},resetGamesStarted:function(e){e.sessionInfo.gamesStarted=0},incrementGamesCompleted:function(e){e.sessionInfo.gamesCompleted++},resetGamesCompleted:function(e){e.sessionInfo.gamesCompleted=0},increaseScore:function(e,t){t.team.score+=t.score},updateLockTeams:function(e,t){e.locked=t},updateGameInactive:function(e,t){t.active=!1},updateGameActive:function(e,t){t.active=!0}}}),Ye=a("5132"),Ze=a.n(Ye);console.log("env",JSON.stringify(Object({NODE_ENV:"production",VUE_APP_REMOTE_URL:"http://localhost:3030",BASE_URL:"/"}))),n["a"].use(new Ze.a({debug:!0,connection:"http://localhost:3030",vuex:{store:Xe,actionPrefix:"SOCKET_"}})),n["a"].config.productionTip=!1,new n["a"]({router:we,store:Xe,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var n=a("5e27"),s=a.n(n);s.a},"5e27":function(e,t,a){},6235:function(e,t,a){"use strict";var n=a("c8be"),s=a.n(n);s.a},8621:function(e,t,a){"use strict";var n=a("8fdc"),s=a.n(n);s.a},"8fdc":function(e,t,a){},"9c6e":function(e,t,a){},"9dd8":function(e,t,a){"use strict";var n=a("fb91"),s=a.n(n);s.a},a59b:function(e,t,a){},b4e5:function(e,t,a){"use strict";var n=a("b7de"),s=a.n(n);s.a},b7de:function(e,t,a){},c5c5:function(e,t,a){"use strict";var n=a("515b"),s=a.n(n);s.a},c8be:function(e,t,a){},ce11:function(e,t,a){},fb91:function(e,t,a){},ff0d:function(e,t,a){"use strict";var n=a("a59b"),s=a.n(n);s.a}});
//# sourceMappingURL=app.73ac8d3e.js.map