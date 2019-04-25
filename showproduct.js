var post=document.getElementById("post");
var get=document.getElementById("get");
var divlist=document.getElementById("divlist");
var productlist=document.getElementById("productlist");
var input=document.getElementById("input");
post.onclick=function()
{
  var xttp=new XMLHttpRequest();
  xttp.open("post","/addProduct");
  xttp.setRequestHeader("Content-Type","application/json");
  xttp.send(JSON.stringify({'name':input.value}));
}
get.onclick=function()
{
  productlist.innerHTML="";
  var xttp=new XMLHttpRequest();
  xttp.addEventListener('load',function()
{
  console.log(xttp.responseText);
  var product=JSON.parse(xttp.responseText);
  var len=product.length;
  var i=0;
  while(i<len)
  {
    var item=product[i].productName;
    var li=document.createElement("li");
    li.innerHTML=item+" ";
    var del=document.createElement("button");
    del.setAttribute("id",i);
    del.innerHTML="X"
    li.appendChild(del);
    productlist.appendChild(li);
    divlist.appendChild(productlist);
    i++;

    del.onclick=function(dl)
    {
      var xttp=new XMLHttpRequest();

      xttp.open("POST","/delete-element");
      xttp.setRequestHeader("content-Type","application/json");
      var index=dl.target.id;
      xttp.send(JSON.stringify({'productName':product[index].productName}));
      dl.target.parentNode.parentNode.removeChild(dl.target.parentNode);
    }
  }
});
xttp.open('GET','/products')
xttp.setRequestHeader("Content-Type","application/json");
xttp.send();
}
