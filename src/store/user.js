import {defineStore} from "pinia"



export const useUserStore = defineStore(
"user",
{


state(){

return {


username:"",

role:"",

isLogin:false


}


},



actions:{


login(name){


this.username=name

this.role="设备维护工程师"

this.isLogin=true



localStorage.setItem(

"user",

JSON.stringify({

username:name,

role:this.role

})

)



},




logout(){


this.username=""

this.role=""

this.isLogin=false


localStorage.removeItem("user")


}



}


})