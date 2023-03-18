(()=>{function e(e){var t,n,l,o,r,a=e.split(/[^\d\w.]+/);return t=a[0],n=a[1],l=a[2],o=a[3],r=Number(t)+Number(n/60)+Number(l/3600),"S"!==o&&"W"!==o||(r*=-1),r}document.addEventListener("DOMContentLoaded",(function(){fetch("http://localhost:8080/").then((e=>e.json())).then((n=>function(n){function s(e){return function(t){var n={lng:e.getPosition().lng(),lat:e.getPosition().lat(),label:e.label,id:e.id},s="",d=0,m=l.findIndex((t=>t.id===e.id));if(-1===m){e.setIcon(i),l.push(n),c();for(let e=0;e<l.length-1;e++)for(let t=e+1;t<l.length;t++)s=l[e].id+"+"+l[t].id,d=100*u(l[e],l[t]);!function(e,t){row=0;var n=document.getElementById("DistBetPts").insertRow(row),l=n.insertCell(0),o=n.insertCell(1);l.innerHTML=e,o.innerHTML=t,row++}(s,d)}else confirm("Are you sure you want to delete this item?")&&(e.setIcon({path:google.maps.SymbolPath.Marker,url:"A"==n.label?o:"B"==n.label?r:a,fillOpacity:1,strokeColor:"white",strokeWeight:10,scale:30}),l.splice(m,1),p(l),c())}}map=new google.maps.Map(document.getElementById("map"),{zoom:18,center:{lng:78.04666667,lat:22.11838889}}),n&&Object.values(n).map((n=>{var l=e(n.Longitude);!function(e,n,l,i){let d=new google.maps.Marker({position:{lng:n,lat:e},label:l,id:i,map,title:"ID = "+i+"  "+l+"  zone 1",icon:{path:google.maps.SymbolPath.Marker,url:"A"==l?o:"B"==l?r:a,fillOpacity:1,strokeColor:"white",strokeWeight:10,scale:30}});t.push(d),google.maps.event.removeListener(d.listener),google.maps.event.addListener(d,"click",s(d))}(e(n.Latitude),l,n.Marker_Type,n.Marker_ID)})),document.getElementById("start").addEventListener("click",(function(e){var t=l.length;for(let e=0;e<t;e++)l.pop();window.scrollTo({top:0,behavior:"smooth"}),s(e)}));let d=null;function c(){if(l.length>1){null===d&&(d=new google.maps.Polyline({path:[],geodesic:!0,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2}));const e=l.length-1,t=[];for(let n=0;n<e;n++){const{lat:e,lng:o}=l[n],{lat:r,lng:a}=l[n+1];t.push({lat:e,lng:o},{lat:r,lng:a})}d.setPath(t),d.setMap(map)}else null!==d&&(d.setMap(null),d=null)}}(n.data)))}));var t=[];const n=[];var l=[],o="http://maps.google.com/mapfiles/ms/icons/red-dot.png",r="http://maps.google.com/mapfiles/ms/icons/green-dot.png",a="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",i="http://maps.google.com/mapfiles/kml/pal2/icon13.png";let s=document.getElementById("show-marker-type-a");s.addEventListener("change",(()=>m("A",s.checked)));let d=document.getElementById("show-marker-type-b");d.addEventListener("change",(()=>m("B",d.checked)));let c=document.getElementById("show-marker-type-c");function m(e,n){!function(e,n){t.forEach((t=>{t.label===e&&t.setMap(n)}))}(e,n?map:null)}function g(){var e=l.length,t="";for(let n=0;n<e;n++)t=t+l[n].id+"-";return t}function u(e,t){var n=e.lng,l=e.lat,o=t.lng,r=t.lat,a=Number(function(e,t,n,l){var o=e-n,r=t-l;return Math.sqrt(o*o+r*r)}(n,l,o,r).toFixed(4));return a}function p(e){var t=document.getElementById("DistBetPts");t.innerHTML="";for(let i=0;i<e.length-1;i++){var n=e[i],l=e[i+1];if(n&&l&&(selpts=n.id+"+"+l.id,dist=100*u(n,l),-1!==e.indexOf(n)&&-1!==e.indexOf(l))){var o=t.insertRow(),r=o.insertCell(),a=o.insertCell();r.innerHTML=selpts,a.innerHTML=dist}}}c.addEventListener("change",(()=>m("C",c.checked))),document.getElementById("add"),add.addEventListener("click",(function(){var e=document.getElementById("date").value,t=document.getElementById("name").value,o=document.getElementById("marker_type").value;if(t&&e&&o){var r=100*function(){var e=l.length;let t=Number(0);if(e>2){for(let n=0;n<e-1;n++)t+=u(l[n],l[n+1]);return t.toFixed(4)}if(2===e)return t+=u(l[0],l[1]),t.toFixed(4);alert("Select more markers")}()+" Kms",a=g();(function(e,t,l,o,r){console.log(n),n.length=0,fetch("http://localhost:8080/",{headers:{"Content-type":"application/json"},method:"POST",body:JSON.stringify({Name:t,date:e,route:l,marker_type:o,distance:r})}).then((e=>e.json()))})(e,t,a,o,r),function(e,t,n,l,o){row=1;var r=document.getElementById("contents").insertRow(row),a=r.insertCell(0),i=r.insertCell(1),s=r.insertCell(2),d=r.insertCell(3),c=r.insertCell(4);a.innerHTML=e,i.innerHTML=t,s.innerHTML=n,d.innerHTML=l,c.innerHTML=o,row++,function(){const e=document.getElementById("inputs"),t=document.getElementById("default");e.elements.name.value="";const n=Date.now();e.elements.date.value=new Date(n),e.elements.marker_type.value=t}()}(e,t,a,o,r)}else console.log("Enter All Details.")})),document.getElementById("stop").addEventListener("click",g)})();