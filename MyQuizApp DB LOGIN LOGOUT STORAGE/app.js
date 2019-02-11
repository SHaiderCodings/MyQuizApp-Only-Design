// Initialize Firebase
var config = {
    apiKey: "AIzaSyCll5Ghx_pu6fkrMW9POMy8w2yJDxRNdbI",
    authDomain: "ghome-page.firebaseapp.com",
    databaseURL: "https://ghome-page.firebaseio.com",
    projectId: "ghome-page",
    storageBucket: "ghome-page.appspot.com",
    messagingSenderId: "792190546277"
  };
  firebase.initializeApp(config);

function signup(){
let name=document.getElementById('name').value;
let no=document.getElementById('Number').value;
let stu_email=document.getElementById('email').value;
let stu_pass=document.getElementById('password').value;
let img = document.querySelector('#pic').files[0];
let gen=document.getElementById('gen').value;

if(name==="" || no===""|| stu_email==="" || stu_pass===""|| img===""|| gen==="" ||name===" " || no===" "|| stu_email===" " || stu_pass===" "|| img===" "|| gen===" " ){
    swal({
        text: "Fill all the fields",
        icon: "error",
        button: "ok",
    });

}
else{
firebase.auth().createUserWithEmailAndPassword(stu_email,stu_pass)
.then(()=>{
    let studentinfo={
        name,
        no,
        stu_email ,
        gen,
        createTime: firebase.database.ServerValue.TIMESTAMP
    }
    let stu_id = firebase.auth().currentUser.uid;
    let storageRef = firebase.storage().ref().child(`studentimages/${img.name}`)
           storageRef.put(img)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((sanpUrl) => {
                studentinfo.img = sanpUrl    
    firebase.database().ref('/student/'+ stu_id).set(studentinfo)
      
      .then((success)=>{
        //  document.getElementById("loaders").style.display = "block";
         swal({
             title: "Welcome",
             text: "You can use this account to proceed further features",
             icon: "success",
             button: "Done",
         });
         window.location = 'login.html'

 })
})
})
 .catch((error) => {
    //  document.getElementById("loaders").style.display = "none"
     swal({
         title: "Plug In",
         text: error.message,
         icon: "warning",
         button: "OK",
     });
 })

 }) 

}

}

function login(){
    let emaillogina=document.getElementById('email1').value;
    let pwdlogina=document.getElementById('password1').value;
    // document.getElementById("loaders1").style.display = "block"
    firebase.auth().signInWithEmailAndPassword(emaillogina, pwdlogina)

    .then((success)=>{
      localStorage.setItem("userauth", JSON.stringify(success))
    //   document.getElementById("loaders1").style.display = "block"
      window.location = 'test.html' 
    })

.catch(function (error) {
    // document.getElementById("loaders1").style.display = "none"
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    swal({
        title: "Authentication Error",
        text: errorMessage,
        icon: "warning",
        button: "OK",
    });
    // ...
  });
  
  }













  function fblogin(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
      });
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        console.log("Successful");
    
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       console.log(error);
      });
  }

  function googlelogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);

  }).catch(function(error) {
   console.log(error)
  });


}


function logout(){
    //DEFAULT FUNCTION
    firebase.auth().signOut()
    .then(function () {
        localStorage.setItem("userauth", JSON.stringify({ user: 'null' }))
        // Sign-out successful.
        window.location = "login.html"
    }).catch(function (error) {
        // An error happened.
        var errorMessage = error.message;
        swal({
            title: "Internet Error",
            text: errorMessage,
            icon: "warning",
            button: "OK",
        });
    });
    }
