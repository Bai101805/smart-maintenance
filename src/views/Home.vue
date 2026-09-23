<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = localStorage.getItem('username') || '管理员'

const go = (path) => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('isLogin')
  localStorage.removeItem('username')
  router.push('/login')
}

const devices = [
  {
    name: '六轴工业机器人',
    model: 'ABB IRB120',
    status: '运行中',
    workshop: '一号智能制造车间'
  },
  {
    name: '数控加工中心',
    model: 'DMG MORI CMX800',
    status: '维修中',
    workshop: '二号加工车间'
  },
  {
    name: 'AGV智能运输车',
    model: 'AGV-X200',
    status: '运行中',
    workshop: '智能物流车间'
  },
  {
    name: 'PLC控制系统',
    model: 'Siemens S7-1500',
    status: '停机',
    workshop: '三号生产线'
  }
]

const runningCount = computed(() => {
  return devices.filter(item => item.status === '运行中').length
})

const repairCount = computed(() => {
  return devices.filter(item => item.status === '维修中').length
})

const recentQuestions = [
  {
    question: '工业机器人突然无法运动怎么办？',
    answer: '建议检查急停、安全门、控制柜报警以及伺服使能状态。',
    time: '08:26'
  },
  {
    question: 'PLC 通信异常如何解决？',
    answer: '建议检查网线、交换机、IP地址及PLC通信模块。',
    time: '08:12'
  },
  {
    question: 'AGV 导航异常怎么办？',
    answer: '建议检查导航传感器、地图定位及运行路径。',
    time: '07:45'
  }
]
</script>

<template>
  <div class="layout">

    <!-- ================= 左侧菜单 ================= -->
    <aside class="sidebar">

      <div class="logo-area">
        <div class="logo-icon">
          ⚙
        </div>

        <div>
          <h2>智造智维</h2>
          <span>SMART MAINTENANCE</span>
        </div>
      </div>


      <div class="menu-title">
        平台功能
      </div>


      <div
        class="menu-item active"
        @click="go('/home')"
      >
        <span>🏠</span>
        <span>平台首页</span>
      </div>


      <div
        class="menu-item"
        @click="go('/knowledge')"
      >
        <span>📚</span>
        <span>知识库</span>
      </div>


      <div
        class="menu-item"
        @click="go('/chat')"
      >
        <span>🤖</span>
        <span>智能问答</span>
      </div>


      <div
        class="menu-item"
        @click="go('/device')"
      >
        <span>🏭</span>
        <span>设备管理</span>
      </div>


      <div class="menu-title second">
        用户中心
      </div>


      <div
        class="menu-item"
        @click="go('/user')"
      >
        <span>👤</span>
        <span>个人中心</span>
      </div>


      <div class="sidebar-bottom">

        <div class="online">
          <span></span>
          系统运行正常
        </div>

        <div class="version">
          智造智维 V1.0
        </div>

      </div>

    </aside>


    <!-- ================= 主区域 ================= -->
    <main class="main">

      <!-- 顶部 -->
      <header class="topbar">

        <div>
          <div class="breadcrumb">
            首页 / 平台概览
          </div>

          <h1>
            平台概览
          </h1>
        </div>


        <div class="user-area">

          <div class="date">
            智能制造运维中心
          </div>

          <div class="avatar">
            👨‍🔧
          </div>

          <div class="user-name">
            {{ username }}
          </div>

          <button
            class="logout"
            @click="logout"
          >
            退出
          </button>

        </div>

      </header>


      <!-- 欢迎区域 -->
      <section class="welcome-card">

        <div>

          <div class="welcome-tag">
            智能制造 · 数字化运维
          </div>

          <h2>
            欢迎使用智造智维平台 👋
          </h2>

          <p>
            连接设备、知识与人员，让制造设备运维更加智能、高效。
          </p>

          <button
            class="primary-btn"
            @click="go('/chat')"
          >
            开始智能问答 →
          </button>

        </div>


        <div class="welcome-illustration">
          <div class="circle">
            🤖
          </div>

          <div class="small-card card-one">
            ⚙ 设备智能诊断
          </div>

          <div class="small-card card-two">
            📚 运维知识库
          </div>
        </div>

      </section>


      <!-- 数据统计 -->
      <section class="stats">

        <div class="stat-card">

          <div class="stat-icon blue">
            🏭
          </div>

          <div>
            <p>设备总数</p>
            <h2>268</h2>
            <span>较上月 +12 台</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon purple">
            📚
          </div>

          <div>
            <p>知识条目</p>
            <h2>1,520</h2>
            <span>本月新增 86 条</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon orange">
            💬
          </div>

          <div>
            <p>今日问答</p>
            <h2>326</h2>
            <span>较昨日 +18.6%</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon green">
            ✅
          </div>

          <div>
            <p>维修完成率</p>
            <h2>98%</h2>
            <span>运行状态良好</span>
          </div>

        </div>

      </section>


      <!-- 中间区域 -->
      <section class="content-grid">

        <!-- 设备状态 -->
        <div class="panel">

          <div class="panel-title">

            <div>
              <h2>设备运行状态</h2>
              <p>当前设备运行情况</p>
            </div>

            <button @click="go('/device')">
              查看全部 →
            </button>

          </div>


          <div class="device-summary">

            <div class="summary-item">

              <div class="summary-number blue-text">
                {{ runningCount }}
              </div>

              <div>
                <strong>运行中</strong>
                <p>设备状态正常</p>
              </div>

            </div>


            <div class="summary-item">

              <div class="summary-number orange-text">
                {{ repairCount }}
              </div>

              <div>
                <strong>维修中</strong>
                <p>需要关注</p>
              </div>

            </div>


            <div class="summary-item">

              <div class="summary-number red-text">
                1
              </div>

              <div>
                <strong>停机</strong>
                <p>等待处理</p>
              </div>

            </div>

          </div>


          <div class="device-list">

            <div
              v-for="item in devices"
              :key="item.name"
              class="device-row"
            >

              <div class="device-info">

                <div class="device-icon">
                  ⚙
                </div>

                <div>
                  <strong>{{ item.name }}</strong>
                  <p>
                    {{ item.model }} · {{ item.workshop }}
                  </p>
                </div>

              </div>


              <div
                class="status"
                :class="{
                  running: item.status === '运行中',
                  repair: item.status === '维修中',
                  stop: item.status === '停机'
                }"
              >
                <span></span>
                {{ item.status }}
              </div>

            </div>

          </div>

        </div>


        <!-- 快捷入口 -->
        <div class="panel quick-panel">

          <div class="panel-title">

            <div>
              <h2>快捷功能</h2>
              <p>快速进入平台功能</p>
            </div>

          </div>


          <div class="quick-grid">

            <div
              class="quick-item"
              @click="go('/knowledge')"
            >
              <div class="quick-icon blue-bg">
                📚
              </div>

              <strong>知识库</strong>

              <p>
                浏览设备运维知识
              </p>
            </div>


            <div
              class="quick-item"
              @click="go('/chat')"
            >
              <div class="quick-icon purple-bg">
                🤖
              </div>

              <strong>智能问答</strong>

              <p>
                AI辅助故障诊断
              </p>
            </div>


            <div
              class="quick-item"
              @click="go('/device')"
            >
              <div class="quick-icon orange-bg">
                🏭
              </div>

              <strong>设备管理</strong>

              <p>
                查看设备运行状态
              </p>
            </div>


            <div
              class="quick-item"
              @click="go('/user')"
            >
              <div class="quick-icon green-bg">
                👤
              </div>

              <strong>个人中心</strong>

              <p>
                管理个人信息
              </p>
            </div>

          </div>


          <div class="tip">

            <span>💡</span>

            <div>
              <strong>运维小贴士</strong>
              <p>
                定期检查设备运行状态，可以有效降低突发故障率。
              </p>
            </div>

          </div>

        </div>

      </section>


      <!-- 最近问答 -->
      <section class="panel questions-panel">

        <div class="panel-title">

          <div>
            <h2>最近智能问答</h2>
            <p>近期设备运维咨询记录</p>
          </div>

          <button @click="go('/chat')">
            进入智能问答 →
          </button>

        </div>


        <div class="question-list">

          <div
            v-for="item in recentQuestions"
            :key="item.time"
            class="question-row"
          >

            <div class="question-avatar">
              💬
            </div>

            <div class="question-content">

              <strong>
                {{ item.question }}
              </strong>

              <p>
                {{ item.answer }}
              </p>

            </div>

            <span class="question-time">
              {{ item.time }}
            </span>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>


<style scoped>

.layout {
  min-height: 100vh;
  display: flex;
  background: #f3f7fc;
}


/* ========================= */
/* 左侧菜单 */
/* ========================= */

.sidebar {
  width: 245px;
  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #082f5d,
      #064b8f
    );

  color: white;

  padding: 25px 16px;

  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}


.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 5px 10px 30px;

  border-bottom: 1px solid rgba(255,255,255,0.12);
}


.logo-icon {
  width: 45px;
  height: 45px;

  border-radius: 12px;

  background: rgba(255,255,255,0.13);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 25px;
}


.logo-area h2 {
  margin: 0;
  font-size: 19px;
}


.logo-area span {
  font-size: 8px;
  letter-spacing: 1px;
  opacity: .55;
}


.menu-title {
  font-size: 12px;
  color: #8eb4d8;

  padding: 25px 12px 10px;
}


.menu-title.second {
  margin-top: 10px;
}


.menu-item {
  height: 48px;

  display: flex;
  align-items: center;

  gap: 13px;

  padding: 0 15px;

  border-radius: 9px;

  margin-bottom: 5px;

  color: #d9e9f8;

  cursor: pointer;

  transition: .2s;
}


.menu-item:hover {
  background: rgba(255,255,255,.09);
}


.menu-item.active {
  background: #1677ff;
  color: white;

  box-shadow:
    0 8px 18px rgba(0,0,0,.15);
}


.sidebar-bottom {
  position: absolute;

  left: 20px;
  right: 20px;
  bottom: 25px;
}


.online {
  font-size: 12px;
  color: #b7e8cf;

  display: flex;
  align-items: center;

  gap: 8px;
}


.online span {
  width: 7px;
  height: 7px;

  background: #37d67a;

  border-radius: 50%;
}


.version {
  margin-top: 10px;

  color: #79a5cb;

  font-size: 11px;
}


/* ========================= */
/* 主区域 */
/* ========================= */

.main {
  width: calc(100% - 245px);
  margin-left: 245px;

  padding: 0 35px 50px;
}


.topbar {
  height: 90px;

  display: flex;

  align-items: center;

  justify-content: space-between;
}


.breadcrumb {
  color: #94a3b8;

  font-size: 12px;

  margin-bottom: 5px;
}


.topbar h1 {
  margin: 0;

  color: #183b63;

  font-size: 25px;
}


.user-area {
  display: flex;

  align-items: center;

  gap: 12px;
}


.date {
  color: #8292a7;

  font-size: 12px;

  margin-right: 10px;
}


.avatar {
  width: 38px;
  height: 38px;

  border-radius: 50%;

  background: #e2efff;

  display: flex;
  align-items: center;
  justify-content: center;
}


.user-name {
  color: #42566d;

  font-size: 14px;
}


.logout {
  border: none;

  background: transparent;

  color: #1677ff;

  cursor: pointer;
}


/* ========================= */
/* 欢迎卡片 */
/* ========================= */

.welcome-card {
  min-height: 220px;

  border-radius: 18px;

  padding: 35px 45px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  overflow: hidden;

  background:
    linear-gradient(
      120deg,
      #0753a0,
      #0878d8
    );

  color: white;

  position: relative;

  box-shadow:
    0 12px 35px rgba(8,83,160,.18);
}


.welcome-tag {
  font-size: 12px;

  color: #b9ddff;

  margin-bottom: 12px;
}


.welcome-card h2 {
  font-size: 29px;

  margin: 0 0 10px;
}


.welcome-card p {
  color: #d8ebff;

  font-size: 14px;
}


.primary-btn {
  margin-top: 20px;

  border: none;

  background: white;

  color: #0968c7;

  padding: 11px 20px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;
}


.welcome-illustration {
  width: 330px;
  height: 170px;

  position: relative;
}


.circle {
  position: absolute;

  width: 150px;
  height: 150px;

  border-radius: 50%;

  right: 70px;
  top: 10px;

  background: rgba(255,255,255,.12);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 65px;
}


.small-card {
  position: absolute;

  padding: 10px 14px;

  border-radius: 8px;

  background: rgba(255,255,255,.13);

  backdrop-filter: blur(5px);

  font-size: 12px;
}


.card-one {
  right: 0;
  top: 30px;
}


.card-two {
  right: 5px;
  bottom: 25px;
}


/* ========================= */
/* 数据卡片 */
/* ========================= */

.stats {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 18px;

  margin-top: 22px;
}


.stat-card {
  background: white;

  border-radius: 14px;

  padding: 22px;

  display: flex;

  gap: 15px;

  align-items: center;

  box-shadow:
    0 5px 20px rgba(30,70,110,.05);
}


.stat-icon {
  width: 50px;
  height: 50px;

  border-radius: 12px;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 24px;
}


.blue {
  background: #e9f3ff;
}


.purple {
  background: #f0ebff;
}


.orange {
  background: #fff2e4;
}


.green {
  background: #e7f9ef;
}


.stat-card p {
  margin: 0;

  font-size: 12px;

  color: #8a98a9;
}


.stat-card h2 {
  margin: 3px 0;

  color: #243b53;

  font-size: 25px;
}


.stat-card span {
  color: #37a86c;

  font-size: 11px;
}


/* ========================= */
/* 内容区域 */
/* ========================= */

.content-grid {
  display: grid;

  grid-template-columns: 1.45fr 1fr;

  gap: 20px;

  margin-top: 22px;
}


.panel {
  background: white;

  border-radius: 15px;

  padding: 25px;

  box-shadow:
    0 5px 20px rgba(30,70,110,.05);
}


.panel-title {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}


.panel-title h2 {
  margin: 0;

  color: #233b56;

  font-size: 18px;
}


.panel-title p {
  margin: 5px 0 0;

  color: #99a6b5;

  font-size: 12px;
}


.panel-title button {
  border: none;

  background: transparent;

  color: #1677ff;

  cursor: pointer;

  font-size: 12px;
}


/* 设备概览 */

.device-summary {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  border-bottom: 1px solid #edf2f7;

  padding-bottom: 18px;

  margin-bottom: 5px;
}


.summary-item {
  display: flex;

  align-items: center;

  gap: 10px;

  border-right: 1px solid #edf2f7;

  padding-left: 10px;
}


.summary-item:last-child {
  border: none;
}


.summary-number {
  font-size: 25px;

  font-weight: 700;
}


.blue-text {
  color: #1677ff;
}


.orange-text {
  color: #f59e0b;
}


.red-text {
  color: #ef4444;
}


.summary-item strong {
  color: #42566d;

  font-size: 13px;
}


.summary-item p {
  margin: 3px 0 0;

  color: #a0aabb;

  font-size: 10px;
}


/* 设备列表 */

.device-row {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 15px 5px;

  border-bottom: 1px solid #f0f3f7;
}


.device-info {
  display: flex;

  align-items: center;

  gap: 12px;
}


.device-icon {
  width: 38px;
  height: 38px;

  border-radius: 9px;

  background: #edf5ff;

  display: flex;

  align-items: center;
  justify-content: center;
}


.device-info strong {
  color: #3a4e65;

  font-size: 13px;
}


.device-info p {
  margin: 4px 0 0;

  color: #9aa7b5;

  font-size: 10px;
}


.status {
  font-size: 11px;

  display: flex;

  align-items: center;

  gap: 5px;
}


.status span {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}


.running {
  color: #21a366;
}


.running span {
  background: #21a366;
}


.repair {
  color: #f59e0b;
}


.repair span {
  background: #f59e0b;
}


.stop {
  color: #ef4444;
}


.stop span {
  background: #ef4444;
}


/* ========================= */
/* 快捷功能 */
/* ========================= */

.quick-grid {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 12px;
}


.quick-item {
  padding: 16px;

  border: 1px solid #edf1f6;

  border-radius: 11px;

  cursor: pointer;

  transition: .2s;
}


.quick-item:hover {
  border-color: #a9cfff;

  transform: translateY(-2px);
}


.quick-icon {
  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 9px;

  margin-bottom: 10px;
}


.blue-bg {
  background: #e8f3ff;
}


.purple-bg {
  background: #f0eaff;
}


.orange-bg {
  background: #fff1df;
}


.green-bg {
  background: #e7f8ee;
}


.quick-item strong {
  font-size: 13px;

  color: #334e68;
}


.quick-item p {
  margin: 5px 0 0;

  color: #99a6b5;

  font-size: 10px;
}


.tip {
  margin-top: 17px;

  padding: 13px;

  border-radius: 9px;

  background: #f3f8ff;

  display: flex;

  gap: 10px;
}


.tip > span {
  font-size: 20px;
}


.tip strong {
  font-size: 12px;

  color: #46627f;
}


.tip p {
  margin: 3px 0 0;

  color: #8495a8;

  font-size: 10px;

  line-height: 1.5;
}


/* ========================= */
/* 最近问答 */
/* ========================= */

.questions-panel {
  margin-top: 22px;
}


.question-list {
  border-top: 1px solid #edf1f6;
}


.question-row {
  display: flex;

  align-items: center;

  gap: 13px;

  padding: 15px 5px;

  border-bottom: 1px solid #f0f3f7;
}


.question-avatar {
  width: 38px;
  height: 38px;

  background: #edf5ff;

  border-radius: 9px;

  display: flex;

  align-items: center;
  justify-content: center;
}


.question-content {
  flex: 1;
}


.question-content strong {
  color: #40566e;

  font-size: 13px;
}


.question-content p {
  margin: 4px 0 0;

  color: #8d9baa;

  font-size: 11px;
}


.question-time {
  color: #a1adba;

  font-size: 11px;
}


/* ========================= */
/* 响应式 */
/* ========================= */

@media (max-width: 1100px) {

  .stats {
    grid-template-columns:
      1fr 1fr;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .welcome-illustration {
    display: none;
  }

}


@media (max-width: 800px) {

  .sidebar {
    display: none;
  }

  .main {
    width: 100%;
    margin-left: 0;

    padding: 0 18px 30px;
  }

  .topbar {
    height: 75px;
  }

  .date {
    display: none;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .welcome-card {
    padding: 25px;
  }

  .welcome-card h2 {
    font-size: 22px;
  }

}

</style>