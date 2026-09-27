// POND KICKOFF: Graph Theory + Weighted Graph + Tree
const graph={
 "ร้าน POND":["ศูนย์กรุงเทพ"],
 "ศูนย์กรุงเทพ":["ร้าน POND","ศูนย์เหนือ","ศูนย์ตะวันออก","ศูนย์ใต้"],
 "ศูนย์เหนือ":["ศูนย์กรุงเทพ","เชียงใหม่"],
 "ศูนย์ตะวันออก":["ศูนย์กรุงเทพ","เชียงใหม่","ระยอง"],
 "ศูนย์ใต้":["ศูนย์กรุงเทพ","ระยอง"],
 "เชียงใหม่":["ศูนย์เหนือ","ศูนย์ตะวันออก"],
 "ระยอง":["ศูนย์ตะวันออก","ศูนย์ใต้"]
};
const weightedGraph={
 "ร้าน POND":[{to:"ศูนย์กรุงเทพ",weight:10}],
 "ศูนย์กรุงเทพ":[{to:"ร้าน POND",weight:10},{to:"ศูนย์เหนือ",weight:35},{to:"ศูนย์ตะวันออก",weight:30},{to:"ศูนย์ใต้",weight:45}],
 "ศูนย์เหนือ":[{to:"ศูนย์กรุงเทพ",weight:35},{to:"เชียงใหม่",weight:40}],
 "ศูนย์ตะวันออก":[{to:"ศูนย์กรุงเทพ",weight:30},{to:"เชียงใหม่",weight:25},{to:"ระยอง",weight:25}],
 "ศูนย์ใต้":[{to:"ศูนย์กรุงเทพ",weight:45},{to:"ระยอง",weight:50}],
 "เชียงใหม่":[{to:"ศูนย์เหนือ",weight:40},{to:"ศูนย์ตะวันออก",weight:25}],
 "ระยอง":[{to:"ศูนย์ตะวันออก",weight:25},{to:"ศูนย์ใต้",weight:50}]
};
const tree={name:"ศูนย์กระจายกลาง",type:"Root",children:[
{name:"ภาคเหนือ",type:"Parent",children:[{name:"เชียงใหม่",type:"Leaf"},{name:"ลำปาง",type:"Leaf"}]},
{name:"ภาคกลาง",type:"Parent",children:[{name:"กรุงเทพฯ",type:"Leaf"},{name:"นนทบุรี",type:"Leaf"}]},
{name:"ภาคตะวันออก",type:"Parent",children:[{name:"ชลบุรี",type:"Leaf"},{name:"ระยอง",type:"Leaf"}]},
{name:"ภาคใต้",type:"Parent",children:[{name:"สงขลา",type:"Leaf"},{name:"ภูเก็ต",type:"Leaf"}]}]};
function dijkstra(start,target){let d={},p={},v=new Set();Object.keys(weightedGraph).forEach(x=>d[x]=Infinity);d[start]=0;while(v.size<Object.keys(weightedGraph).length){let u=null;Object.keys(d).forEach(x=>{if(!v.has(x)&&(u===null||d[x]<d[u]))u=x});if(u===null||d[u]===Infinity)break;v.add(u);if(u===target)break;weightedGraph[u].forEach(e=>{let a=d[u]+e.weight;if(a<d[e.to]){d[e.to]=a;p[e.to]=u}})}let path=[],x=target;while(x){path.unshift(x);if(x===start)break;x=p[x]}return{path,weight:d[target]}}
function shipments(){return JSON.parse(localStorage.getItem("pkShipments")||"{}")}
function save(x){localStorage.setItem("pkShipments",JSON.stringify(x))}
function id(){let d=new Date();return"PK-"+String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"-"+Math.floor(1000+Math.random()*9000)}
function route(dest){return {เชียงใหม่:["ร้าน POND","ศูนย์กรุงเทพ","ศูนย์เหนือ","เชียงใหม่"],"กรุงเทพฯ":["ร้าน POND","ศูนย์กรุงเทพ"],"ชลบุรี":["ร้าน POND","ศูนย์กรุงเทพ","ศูนย์ตะวันออก","ชลบุรี"],ระยอง:["ร้าน POND","ศูนย์กรุงเทพ","ศูนย์ตะวันออก","ระยอง"],สงขลา:["ร้าน POND","ศูนย์กรุงเทพ","ศูนย์ใต้","สงขลา"]}[dest]||["ร้าน POND","ศูนย์กรุงเทพ"]}
function renderTree(n){let li=document.createElement("li");li.innerHTML=`<b class="${n.type==="Root"?"root":n.type==="Leaf"?"leaf":""}">${n.name}</b> <small>(${n.type})</small>`;if(n.children){let ul=document.createElement("ul");n.children.forEach(c=>ul.appendChild(renderTree(c)));li.appendChild(ul)}return li}
document.addEventListener("DOMContentLoaded",()=>{
let code=document.getElementById("graphCode");if(code)code.textContent="const graph = "+JSON.stringify(graph,null,2)+";\n\nconst weightedGraph = "+JSON.stringify(weightedGraph,null,2)+";";
let tv=document.getElementById("tree");if(tv){let ul=document.createElement("ul");ul.appendChild(renderTree(tree));tv.appendChild(ul)}
let count=document.getElementById("count");if(count)count.textContent=Object.keys(shipments()).length;
let f=document.getElementById("ship");if(f)f.onsubmit=e=>{e.preventDefault();let s=shipments(),i=id(),dest=document.getElementById("dest").value;s[i]={id:i,receiver:document.getElementById("receiver").value,jersey:document.getElementById("jersey").value,qty:document.getElementById("qty").value,dest,route:route(dest),status:"กำลังคัดแยกพัสดุ"};save(s);document.getElementById("shipResult").innerHTML=`<div class="path"><b>สร้างสำเร็จ ✓</b><br>Tracking ID: <strong>${i}</strong><br><a href="tracking.html?id=${i}">ติดตามรายการนี้ →</a></div>`;f.reset()};
let tf=document.getElementById("track");if(tf){let show=i=>{let s=shipments()[i];let r=document.getElementById("trackResult");if(!s){r.innerHTML='<div class="card">ไม่พบ Tracking ID</div>';return}r.innerHTML=`<section class="card"><em>${s.id}</em><h2>${s.receiver}</h2><p>${s.jersey} ${s.qty} ตัว · ปลายทาง ${s.dest}</p><div class="path"><b>PATH:</b> ${s.route.join(" → ")}</div><p>สถานะ: <strong>${s.status}</strong></p></section>`};tf.onsubmit=e=>{e.preventDefault();show(document.getElementById("trackId").value.trim().toUpperCase())};document.getElementById("latest")?.addEventListener("click",()=>{let a=Object.keys(shipments());if(a.length)show(a[a.length-1])});let q=new URLSearchParams(location.search).get("id");if(q)show(q)}
});
