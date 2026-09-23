<script setup>

import {ref,onMounted} from "vue"


// 用户信息

const user=ref({

avatar:"👨‍🔧",

name:"张工程师",

role:"设备维护工程师",

department:"智能制造中心"

})



// 收藏数据

const collect=ref([

"机器人无法运动故障处理",

"PLC通讯异常解决方案",

"数控机床主轴报警处理"

])




// 我的提问

const questions=ref([])




// 浏览历史

const history=ref([

"查看工业机器人知识",

"查询AGV导航故障",

"浏览PLC维修方案"

])




// 设置

const setting=ref({

notice:true,

dark:false

})




// 加载登录用户

onMounted(()=>{


let data=localStorage.getItem("user")


if(data){

user.value.name=data

}



})



</script>




<template>


<div class="page">


<h1>
👤 个人中心
</h1>




<!-- 用户信息 -->


<div class="user-card">


<div class="avatar">

{{user.avatar}}

</div>



<h2>

{{user.name}}

</h2>



<p>

角色：

{{user.role}}

</p>



<p>

部门：

{{user.department}}

</p>



</div>







<div class="grid">



<div class="card">


<h2>
⭐ 我的收藏
</h2>


<ul>


<li

v-for="item in collect"

:key="item"

>

{{item}}

</li>


</ul>


</div>





<div class="card">


<h2>
💬 我的提问
</h2>



<div v-if="questions.length===0">

暂无提问记录

</div>



<div

v-for="item in questions"

:key="item"

>

{{item}}

</div>



</div>







<div class="card">


<h2>
📜 浏览历史
</h2>



<ul>


<li

v-for="item in history"

:key="item"

>

{{item}}

</li>


</ul>



</div>






<div class="card">


<h2>
⚙ 系统设置
</h2>



<p>


消息通知：

<input

type="checkbox"

v-model="setting.notice"

/>


</p>




<p>


暗黑模式：

<input

type="checkbox"

v-model="setting.dark"

/>


</p>



</div>



</div>





</div>



</template>





<style scoped>


.page{

padding:30px;

}




.user-card{


background:white;

padding:35px;

border-radius:20px;

text-align:center;

box-shadow:0 5px 15px #ddd;


}



.avatar{


font-size:70px;


}




.grid{


display:grid;

grid-template-columns:1fr 1fr;

gap:25px;

margin-top:30px;


}




.card{


background:white;

padding:25px;

border-radius:20px;

box-shadow:0 5px 15px #ddd;


}



li{


margin:15px 0;


}



</style>