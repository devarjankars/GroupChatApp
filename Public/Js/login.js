
const s_btn=document.getElementById('sbt-login');

const logEmail=document.getElementById('log-email').value;
const logPwd=document.getElementById('log-pwd').value;
let postLogin = async ()=>{
    try{
        //http://localhost:4000/user/login
       let  logObj={
        logEmail:logEmail,
        logPwd:logPwd
       }
        let res=axios.post(`http://localhost:3000/user/login`,{logObj});
        alert(res.msg);

        

    }   
    catch(err){
        console.log(err);
    }
}
//



s_btn.addEventListener('click', postLogin)