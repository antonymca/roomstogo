var obj = [];
var userObj = {};
userObj["id1|name1|emailaddress1"] = {"userId":"name","username":"antony","email":"antomca@gmail.com"};obj.push(userObj);
userObj = {}; userObj["id2|name2|emailaddress2"] = {"userId":"name2","username":"antony2","email":"antomca@gmail.com2"};obj.push(userObj);

console.log("debug");
obj.find((ob,i)=>Object.keys(ob).toString().indexOf("name2") > -1 )




    var obj = [];
var userObj = {};
userObj = {"userId":"name","username":"antony","email":"antomca@gmail.com"};obj.push(userObj);
userObj = {"userId":"name2","username":"antony2","email":"antomca@gmail.com2"};obj.push(userObj);


console.log("debug");
obj.find((ob,i)=> ob.userId === "name2" || ob.username === "name2" || ob.email==="name2" ? ob : "")