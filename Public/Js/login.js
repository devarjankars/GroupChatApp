
const s_btn=document.getElementById('sbt-login');

const logEmail=document.getElementById('log-email')
const logPwd=document.getElementById('log-pwd')
let postLogin = async ()=>{
    try{
        //http://localhost:4000/user/login

    }
    catch(err){
        console.log(err);
    }
}
//



s_btn.addEventListener('click', postLogin)