// console.log(firebase.database);

///////////////////////////////// sign up authentication ////////////////////////////////////////
let signup = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let name = document.getElementById("name");
    // let key = firebase.database().ref('users').push().key;
    
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      let key =  result.user.uid;
      let users = {
        user:email.value,
        name:name.value,
        key : key,
        password:password.value
      }

        // console.log(key);
      firebase.database().ref('users/').child(key).set(users);
      location.href = "loginn.html";

      // console.log(result);
      })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
  
    });
  }
/////////////////////////////////////// login authentication /////////////////////////////////////

  let login = () => {
    let email_login = document.getElementById("email-login");
    let password_login = document.getElementById("password-login");
    let main = document.getElementById("main");
    let h1 = document.getElementById("h1");
      
      firebase.auth().signInWithEmailAndPassword(email_login.value, password_login.value)
      .then((result) => {
        alert("user login successfully");
        sessionStorage.setItem("key",result.user.uid);
        location.href = "index.html";
        // console.log(result.user.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
    }

////////////////////////////////// chat-App //////////////////////////////////////////////////

let display = () =>{
// let list = document.getElementById("list");
// firebase.database().ref('users/').on("child_added",function(data){
let key =  sessionStorage.getItem("key"); 
let head = document.getElementById("heading");
let maindiv = document.getElementById("main");
firebase.database().ref("users/").child(key).once('value',function(data)
{
// console.log(data.tal().name);
  sessionStorage.setItem("name",data.val().name);
  let h1text = document.createTextNode(data.val().name);
  head.appendChild(h1text);
  firebase.database().ref('users').on('child_added',function(data){
  let name = sessionStorage.getItem("name");
  if(name != data.val().name){
    let allperson = document.getElementById("allperson");
    let namediv = document.createElement('div');
    allperson.appendChild(namediv);
    let divtext = document.createTextNode(data.val().name);
    namediv.setAttribute("onclick","chatBox(this)");
    namediv.setAttribute("id","chat-box");
    namediv.setAttribute("class",data.val().user);
    namediv.appendChild(divtext);
  } 
  })
})
}
let chatBox = (e) =>{ 
  firebase.database().ref("messages").remove();
  location.href = "chat.html";
  


  // firebase.database().ref("messages").remove();
  // let chatdiv = document.getElementById("chatdiv");
  // chatdiv.setAttribute("class","chat");
  // let chat_div = document.createElement('div');
  // chat_div.setAttribute("id","chat_div");
  // chatdiv.appendChild(chat_div);
  // // let chatDivText = document.createTextNode();
  // // chatdiv.appendChild(chatDivText);
  // let inputText = document.createElement('input');
  // inputText.setAttribute('type',"text");
  // inputText.setAttribute('id',"inputText");
  // inputText.setAttribute('placeholder',"enter your message");
  // chat_div.appendChild(inputText);
  // let but = document.createElement('button');
  // but.setAttribute("id","butt");
  // but.setAttribute("onclick","chatText()");
  // let butText = document.createTextNode("send");
  // but.appendChild(butText);
  // chat_div.appendChild(but);
  // maindiv.appendChild(chatdiv);
  // chat_div.innerHTML = "";
  
}

let changeToLoginPage = () =>{
  location.href = "loginn.html"
}
let start = () =>{
  location.href = "login.html"
}


firebase.database().ref("messages").on("child_added",function(data){
let chatting = document.getElementById("chatting-box");
let ul = document.getElementById("chatting-arena");
let namee = sessionStorage.getItem("name");
let li = document.createElement('li');
let lidiv = document.createElement('div');
lidiv.setAttribute("id","lidiv");
let textnode = document.createTextNode(data.val().sender.toUpperCase()+': '+data.val().messages);
li.setAttribute("id","para");
li.setAttribute("class","secpara");
li.appendChild(textnode);
lidiv.appendChild(li);
if(namee == data.val().sender){
  ul.appendChild(lidiv);
}
else{
  li.style.textAlign = "end";
  ul.appendChild(lidiv);
}
})

let sendBut = () =>{
let inp = document.getElementById("inputText");
let key = firebase.database().ref("messages").push().key;
let namee = sessionStorage.getItem("name");
let messages = {
  key:key,
  messages:inp.value,
  sender:namee
}
inp.value = ' ';
firebase.database().ref("messages").child(key).set(messages);
// ul.appendChild(text);
}



   
// let h1text = document.createTextNode(data.val().name);

// })

// firebase.database().ref('messages').on("child_added",function(data){
  //     let li = document.createElement('li');
  //     let litext = document.createTextNode(data.val().message);
//     li.appendChild(litext);
//     list.appendChild(li);

    // console.log(data.val());
    // })
    
/////////////////////////////// submit messages ////////////////////////////////////
    
    // }
    // submit();
    // delall();
  
//     let submit = () =>{ 
//       let chat = document.getElementById("chat");
//       let email = document.getElementById("email");
//       // console.log(chat.value);
//       let key = firebase.database().ref('messages').push().key; 
//       let messages = {
//       message:chat.value,
//       key : key
// }
// firebase.database().ref('messages/').child(key).set(messages);
// let li = document.createElement('li');
//     let litext = document.createTextNode(chat.value);
//     li.appendChild(litext);
//     list.appendChild(li);
//     chat.value="";
// }
  
//////////////////////////////////// delete all messages ////////////////////////////////////
  
// let delall = () => {
//   firebase.database().ref('messages').remove();
//   list.innerHTML = "";
  
// //////////////////////////////////////////////////////////////////////////////////////////
// }

// let allperson = document.getElementById("allperson");
