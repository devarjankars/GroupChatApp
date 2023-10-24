
const s_btn=document.getElementById('Sbt-Login');


   
let postLogin = async ()=>{
    try{
        //http://localhost:4000/user/login
        const logEmail=document.getElementById('log-email').value;
        const logPwd=document.getElementById('log-pwd').value;
        let  logObj={
            logEmail:logEmail,
            logpwd:logPwd
           }
       console.log(logPwd,logEmail,logObj)
        let res= await axios.post(`http://localhost:3000/user/login`,{logObj});
        console.log(res);
        localStorage.setItem("token",res.data.token)
        alert(res.data.msg);
        
           window.  location.href="/home"

        

    }   
    catch(err){
        alert(err.response.data.msg)
        console.log(err);
    }
}
//



s_btn.addEventListener('click', postLogin)