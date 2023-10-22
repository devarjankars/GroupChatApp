
let postChat=async()=>{
    try{
        const chat =document.getElementById('chat').value;
        const token=localStorage.getItem('token')
        let res=await axios.post('http://localhost:3000/home/add',{{}
           , { headers: { Authorization: token }
        })
    }
    catch(err){
        console.log(err);
    }

}



let homepageLoad =async()=>{
    try{

    }
    catch(err){
        console.log(err);
    }

}



document.addEventListener('DOMContentLoaded', homepageLoad)