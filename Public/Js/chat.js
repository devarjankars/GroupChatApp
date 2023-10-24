
const chatBtn=document.getElementById('send');
const chatArea=document.getElementById('chat-area')

let postChat=async()=>{
    try{
        const chat =document.getElementById('chat-text').value;
        const token=localStorage.getItem('token')
        let res=await axios.post('http://localhost:3000/home/sendMsg',{
            msg:chat }
           , { headers: { Authorization: token }})
           console.log(res);
           location.reload();
        
    }
    catch(err){
        console.log(err);
    }

}



let homepageLoad =async()=>{
    try{
        
        const token=localStorage.getItem('token');
      let result= await  axios.get(`http://localhost:3000/home/getMsg`,{
            headers:{Authorization:token}
        });
        result.data.msg.forEach(ele => {
         chatArea.innerHTML += `  <div class="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${ele.name}:${ele.msg}</p>
                      </div>
                      </div>`
            
        });
        console.log(result);


    }
    catch(err){
        console.log(err);
    }

}



document.addEventListener('DOMContentLoaded', homepageLoad)

chatBtn.addEventListener('click',postChat)
// let getMsg= async()=>{
//     try{

//     }
//     catch(err){
//         console.log(err);
//     }
// }