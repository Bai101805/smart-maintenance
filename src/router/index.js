import {
createRouter,
createWebHashHistory
}
from "vue-router"



import Home from "../views/Home.vue"

import Login from "../views/Login.vue"

import Knowledge from "../views/Knowledge.vue"

import Chat from "../views/Chat.vue"

import Device from "../views/Device.vue"

import User from "../views/User.vue"



const routes=[


{
path:"/",
redirect:"/login"
},


{
path:"/login",
component:Login
},


{
path:"/home",
component:Home
},


{
path:"/knowledge",
component:Knowledge
},


{
path:"/chat",
component:Chat
},


{
path:"/device",
component:Device
},


{
path:"/user",
component:User
}



]



const router=createRouter({

history:createWebHashHistory(),

routes

})


export default router