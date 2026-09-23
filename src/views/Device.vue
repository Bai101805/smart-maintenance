<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前状态筛选
const currentStatus = ref('全部')

// 搜索关键词
const searchText = ref('')

// 当前查看详情的设备
const detail = ref(null)

// 设备数据
const devices = ref([
  {
    id: 1,
    name: '六轴工业机器人',
    model: 'ABB IRB120',
    status: '运行中',
    workshop: '一号智能制造车间',
    number: 'ROB-001',
    date: '2025-06-12',
    knowledge: '机器人无法运动故障处理',
    desc: '负责自动化装配和搬运任务',
    type: '工业机器人'
  },
  {
    id: 2,
    name: '数控加工中心',
    model: 'DMG MORI CMX800',
    status: '维修中',
    workshop: '二号加工车间',
    number: 'CNC-002',
    date: '2024-10-20',
    knowledge: '主轴报警故障处理',
    desc: '用于精密零件加工',
    type: '数控机床'
  },
  {
    id: 3,
    name: 'AGV智能运输车',
    model: 'AGV-X200',
    status: '运行中',
    workshop: '智能物流车间',
    number: 'AGV-003',
    date: '2025-03-15',
    knowledge: 'AGV导航异常处理',
    desc: '负责生产线物料运输',
    type: 'AGV'
  },
  {
    id: 4,
    name: 'PLC控制系统',
    model: 'Siemens S7-1500',
    status: '停机',
    workshop: '三号生产线',
    number: 'PLC-004',
    date: '2024-08-10',
    knowledge: 'PLC通信异常处理',
    desc: '控制生产线自动化设备',
    type: 'PLC'
  },
  {
    id: 5,
    name: '工业机器人工作站',
    model: 'KUKA KR10',
    status: '运行中',
    workshop: '一号智能制造车间',
    number: 'ROB-005',
    date: '2025-05-18',
    knowledge: '机器人重复定位精度下降',
    desc: '负责零件自动上下料及焊接作业',
    type: '工业机器人'
  },
  {
    id: 6,
    name: '自动化数控车床',
    model: 'MAZAK QT-200',
    status: '停机',
    workshop: '二号加工车间',
    number: 'CNC-006',
    date: '2024-11-06',
    knowledge: '数控机床加工尺寸偏差',
    desc: '用于轴类零件自动化加工',
    type: '数控机床'
  }
])

// 搜索 + 状态筛选
const filteredDevices = computed(() => {
  let result = devices.value

  // 状态筛选
  if (currentStatus.value !== '全部') {
    result = result.filter(
      item => item.status === currentStatus.value
    )
  }

  // 关键词搜索
  const keyword = searchText.value.trim().toLowerCase()

  if (keyword) {
    result = result.filter(item => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.model.toLowerCase().includes(keyword) ||
        item.workshop.toLowerCase().includes(keyword) ||
        item.number.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
      )
    })
  }

  return result
})

// 统计数据
const totalCount = computed(() => devices.value.length)

const runningCount = computed(() =>
  devices.value.filter(item => item.status === '运行中').length
)

const repairCount = computed(() =>
  devices.value.filter(item => item.status === '维修中').length
)

const stopCount = computed(() =>
  devices.value.filter(item => item.status === '停机').length
)

// 查看详情
function showDetail(item) {
  detail.value = item
}

// 关闭详情
function closeDetail() {
  detail.value = null
}

// 页面跳转
function go(path) {
  router.push(path)
}

// 登录用户
const username = localStorage.getItem('username') || '管理员'

// 退出登录
function logout() {
  localStorage.removeItem('isLogin')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<template>
  <div class="page">

    <!-- 左侧导航 -->
    <aside class="sidebar">

      <div class="logo-area">
        <div class="logo-icon">⚙</div>

        <div>
          <h2>智造智维</h2>
          <span>SMART MAINTENANCE</span>
        </div>
      </div>

      <div class="menu-title">
        平台功能
      </div>

      <div
        class="menu-item"
        @click="go('/home')"
      >
        <span>🏠</span>
        平台首页
      </div>

      <div
        class="menu-item"
        @click="go('/knowledge')"
      >
        <span>📚</span>
        知识库
      </div>

      <div
        class="menu-item"
        @click="go('/chat')"
      >
        <span>🤖</span>
        智能问答
      </div>

      <div class="menu-item active">
        <span>🏭</span>
        设备管理
      </div>

      <div class="menu-title second">
        用户中心
      </div>

      <div
        class="menu-item"
        @click="go('/user')"
      >
        <span>👤</span>
        个人中心
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


    <!-- 主内容 -->
    <main class="main">

      <!-- 顶部 -->
      <header class="topbar">

        <div>
          <div class="breadcrumb">
            首页 / 设备管理
          </div>

          <h1>
            智能设备管理
          </h1>
        </div>

        <div class="user-area">

          <span>
            智能制造运维中心
          </span>

          <div class="avatar">
            👨‍🔧
          </div>

          <strong>
            {{ username }}
          </strong>

          <button @click="logout">
            退出
          </button>

        </div>

      </header>


      <!-- 页面介绍 -->
      <section class="intro">

        <div>

          <div class="intro-tag">
            EQUIPMENT MANAGEMENT
          </div>

          <h2>
            智能制造设备管理中心
          </h2>

          <p>
            统一管理生产现场智能设备，实时掌握设备运行状态，
            快速查看设备信息及关联运维知识。
          </p>

        </div>

        <div class="intro-icon">
          🏭
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
            <h2>{{ totalCount }}</h2>
            <span>当前管理设备</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon green">
            ▶
          </div>

          <div>
            <p>运行中</p>
            <h2>{{ runningCount }}</h2>
            <span>设备正常运行</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon orange">
            🔧
          </div>

          <div>
            <p>维修中</p>
            <h2>{{ repairCount }}</h2>
            <span>需要维护设备</span>
          </div>

        </div>


        <div class="stat-card">

          <div class="stat-icon red">
            ⏸
          </div>

          <div>
            <p>停机</p>
            <h2>{{ stopCount }}</h2>
            <span>当前停止设备</span>
          </div>

        </div>

      </section>


      <!-- 筛选区域 -->
      <section class="toolbar">

        <div class="filter-title">
          <strong>设备列表</strong>
          <span>共 {{ filteredDevices.length }} 台</span>
        </div>


        <div class="search-box">

          <span>🔍</span>

          <input
            v-model="searchText"
            type="text"
            placeholder="搜索设备名称、型号、车间..."
          />

        </div>

      </section>


      <!-- 状态筛选 -->
      <section class="filter-section">

        <button
          :class="{ active: currentStatus === '全部' }"
          @click="currentStatus = '全部'"
        >
          全部设备
        </button>

        <button
          :class="{ active: currentStatus === '运行中' }"
          @click="currentStatus = '运行中'"
        >
          🟢 运行中
        </button>

        <button
          :class="{ active: currentStatus === '维修中' }"
          @click="currentStatus = '维修中'"
        >
          🟠 维修中
        </button>

        <button
          :class="{ active: currentStatus === '停机' }"
          @click="currentStatus = '停机'"
        >
          🔴 停机
        </button>

      </section>


      <!-- 设备列表 -->
      <section class="device-section">

        <!-- 空数据 -->
        <div
          v-if="filteredDevices.length === 0"
          class="empty"
        >

          <div class="empty-icon">
            🔍
          </div>

          <h3>
            暂未找到相关设备
          </h3>

          <p>
            请尝试更换搜索关键词或设备状态
          </p>

        </div>


        <!-- 设备卡片 -->
        <div
          v-for="item in filteredDevices"
          :key="item.id"
          class="device-card"
        >

          <!-- 左侧图标 -->
          <div class="device-icon">
            <span v-if="item.type === '工业机器人'">
              🤖
            </span>

            <span v-else-if="item.type === '数控机床'">
              ⚙️
            </span>

            <span v-else-if="item.type === 'AGV'">
              🚚
            </span>

            <span v-else>
              🔌
            </span>
          </div>


          <!-- 设备信息 -->
          <div class="device-info">

            <div class="device-top">

              <span class="type-label">
                {{ item.type }}
              </span>

              <span
                class="status"
                :class="{
                  running: item.status === '运行中',
                  repairing: item.status === '维修中',
                  stopped: item.status === '停机'
                }"
              >
                <i></i>
                {{ item.status }}
              </span>

            </div>


            <h2>
              {{ item.name }}
            </h2>

            <p class="model">
              型号：{{ item.model }}
            </p>


            <div class="device-meta">

              <span>
                🆔 {{ item.number }}
              </span>

              <span>
                📍 {{ item.workshop }}
              </span>

              <span>
                📅 {{ item.date }}
              </span>

            </div>

          </div>


          <!-- 操作 -->
          <div class="device-action">

            <button
              @click="showDetail(item)"
            >
              查看详情
              →
            </button>

          </div>

        </div>

      </section>

    </main>


    <!-- ========================= -->
    <!-- 设备详情弹窗 -->
    <!-- ========================= -->

    <div
      v-if="detail"
      class="modal-mask"
      @click.self="closeDetail"
    >

      <div class="modal">

        <div class="modal-header">

          <div>

            <span class="modal-label">
              {{ detail.type }}
            </span>

            <h2>
              {{ detail.name }}
            </h2>

          </div>

          <button
            class="close"
            @click="closeDetail"
          >
            ×
          </button>

        </div>


        <div class="modal-body">

          <!-- 基本信息 -->
          <div class="detail-title">
            📋 基本设备信息
          </div>


          <div class="detail-grid">

            <div>
              <span>设备编号</span>
              <strong>{{ detail.number }}</strong>
            </div>

            <div>
              <span>设备型号</span>
              <strong>{{ detail.model }}</strong>
            </div>

            <div>
              <span>所属车间</span>
              <strong>{{ detail.workshop }}</strong>
            </div>

            <div>
              <span>生产日期</span>
              <strong>{{ detail.date }}</strong>
            </div>

            <div>
              <span>设备状态</span>
              <strong
                :class="{
                  greenText: detail.status === '运行中',
                  orangeText: detail.status === '维修中',
                  redText: detail.status === '停机'
                }"
              >
                {{ detail.status }}
              </strong>
            </div>

            <div>
              <span>设备类型</span>
              <strong>{{ detail.type }}</strong>
            </div>

          </div>


          <!-- 设备说明 -->
          <div class="detail-block">

            <h3>
              📝 设备说明
            </h3>

            <p>
              {{ detail.desc }}
            </p>

          </div>


          <!-- 关联知识 -->
          <div class="knowledge-box">

            <div class="knowledge-icon">
              📚
            </div>

            <div>

              <span>
                关联运维知识
              </span>

              <strong>
                {{ detail.knowledge }}
              </strong>

            </div>

            <button
              @click="go('/knowledge')"
            >
              查看知识 →
            </button>

          </div>

        </div>


        <div class="modal-footer">

          <button
            class="chat-btn"
            @click="go('/chat')"
          >
            🤖 智能问答
          </button>

          <button
            class="close-btn"
            @click="closeDetail"
          >
            关闭
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<style scoped>

* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #f4f7fb;
}


/* =========================
   左侧导航
========================= */

.sidebar {
  width: 245px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  background: linear-gradient(
    180deg,
    #082f5d,
    #064b8f
  );

  color: white;
  padding: 25px 16px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 5px 10px 30px;

  border-bottom: 1px solid rgba(255,255,255,.12);
}

.logo-icon {
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: rgba(255,255,255,.13);

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
  color: #8eb4d8;
  font-size: 12px;
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

  margin-bottom: 5px;

  border-radius: 9px;

  color: #d9e9f8;

  cursor: pointer;

  transition: .2s;
}

.menu-item:hover {
  background: rgba(255,255,255,.09);
}

.menu-item.active {
  color: white;

  background: #1677ff;

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
  display: flex;
  align-items: center;
  gap: 8px;

  color: #b7e8cf;

  font-size: 12px;
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


/* =========================
   主区域
========================= */

.main {
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

  color: #8292a7;

  font-size: 12px;
}

.avatar {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e2efff;
}

.user-area strong {
  color: #42566d;
}

.user-area button {
  border: none;

  background: transparent;

  color: #1677ff;

  cursor: pointer;
}


/* =========================
   Banner
========================= */

.intro {
  min-height: 180px;

  padding: 30px 40px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background:
    linear-gradient(
      120deg,
      #0753a0,
      #0878d8
    );

  color: white;

  box-shadow:
    0 12px 30px rgba(8,83,160,.16);
}

.intro-tag {
  color: #a9d7ff;

  font-size: 11px;

  letter-spacing: 2px;

  margin-bottom: 10px;
}

.intro h2 {
  margin: 0;
  font-size: 28px;
}

.intro p {
  margin: 12px 0 0;

  color: #d9ecff;

  font-size: 14px;

  max-width: 650px;

  line-height: 1.8;
}

.intro-icon {
  width: 120px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255,255,255,.12);

  font-size: 55px;

  margin-right: 40px;
}


/* =========================
   统计
========================= */

.stats {
  margin-top: 20px;

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;
}

.stat-card {
  padding: 20px;

  display: flex;
  align-items: center;

  gap: 15px;

  background: white;

  border-radius: 13px;

  box-shadow:
    0 4px 15px rgba(30,70,110,.05);
}

.stat-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  font-size: 22px;
}

.stat-icon.blue {
  background: #eaf3ff;
}

.stat-icon.green {
  background: #eaf9f0;
}

.stat-icon.orange {
  background: #fff4e6;
}

.stat-icon.red {
  background: #fff0f0;
}

.stat-card p {
  margin: 0;

  color: #8998a9;

  font-size: 11px;
}

.stat-card h2 {
  margin: 3px 0;

  color: #263f5a;

  font-size: 25px;
}

.stat-card span {
  color: #a3afbb;

  font-size: 9px;
}


/* =========================
   工具栏
========================= */

.toolbar {
  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
}

.filter-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-title strong {
  color: #314a64;
  font-size: 17px;
}

.filter-title span {
  color: #98a5b3;
  font-size: 11px;
}

.search-box {
  width: 340px;
  height: 44px;

  display: flex;
  align-items: center;

  padding: 0 14px;

  background: white;

  border: 1px solid #e1e8f0;

  border-radius: 9px;
}

.search-box span {
  margin-right: 8px;
}

.search-box input {
  flex: 1;

  border: none;
  outline: none;

  font-size: 12px;

  color: #43586e;
}


/* =========================
   筛选
========================= */

.filter-section {
  margin-top: 15px;

  display: flex;

  gap: 10px;
}

.filter-section button {
  padding: 9px 17px;

  border: 1px solid #e1e8f0;

  border-radius: 7px;

  background: white;

  color: #728398;

  cursor: pointer;

  font-size: 12px;
}

.filter-section button:hover {
  border-color: #1677ff;

  color: #1677ff;
}

.filter-section button.active {
  background: #1677ff;

  color: white;

  border-color: #1677ff;
}


/* =========================
   设备列表
========================= */

.device-section {
  margin-top: 15px;
}

.device-card {
  min-height: 150px;

  display: flex;
  align-items: center;

  gap: 20px;

  margin-bottom: 15px;

  padding: 22px;

  background: white;

  border-radius: 14px;

  box-shadow:
    0 4px 18px rgba(30,70,110,.05);

  transition: .2s;
}

.device-card:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 25px rgba(30,70,110,.08);
}

.device-icon {
  width: 70px;
  height: 70px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: #edf5ff;

  font-size: 32px;
}

.device-info {
  flex: 1;
}

.device-top {
  display: flex;
  align-items: center;

  gap: 10px;
}

.type-label {
  padding: 4px 9px;

  border-radius: 5px;

  background: #edf6ff;

  color: #1677ff;

  font-size: 10px;
}

.status {
  display: flex;
  align-items: center;

  gap: 5px;

  font-size: 10px;
}

.status i {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.status.running {
  color: #18a558;
}

.status.running i {
  background: #18a558;
}

.status.repairing {
  color: #f39a25;
}

.status.repairing i {
  background: #f39a25;
}

.status.stopped {
  color: #e05252;
}

.status.stopped i {
  background: #e05252;
}

.device-info h2 {
  margin: 9px 0 4px;

  color: #2e4862;

  font-size: 17px;
}

.model {
  margin: 0;

  color: #8795a4;

  font-size: 11px;
}

.device-meta {
  margin-top: 12px;

  display: flex;

  gap: 20px;

  color: #9aa7b5;

  font-size: 10px;
}

.device-action button {
  padding: 10px 15px;

  border: none;

  border-radius: 7px;

  background: #edf6ff;

  color: #1677ff;

  cursor: pointer;

  font-size: 11px;
}

.device-action button:hover {
  background: #1677ff;

  color: white;
}


/* =========================
   空状态
========================= */

.empty {
  padding: 70px;

  background: white;

  border-radius: 14px;

  text-align: center;

  color: #9aa7b5;
}

.empty-icon {
  font-size: 45px;
}

.empty h3 {
  color: #53677c;
}


/* =========================
   弹窗
========================= */

.modal-mask {
  position: fixed;

  z-index: 100;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px;

  background: rgba(11,35,60,.55);

  backdrop-filter: blur(3px);
}

.modal {
  width: 780px;

  max-width: 100%;

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border-radius: 16px;

  box-shadow:
    0 20px 60px rgba(0,0,0,.2);
}

.modal-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  padding: 25px 30px;

  border-bottom: 1px solid #edf1f5;
}

.modal-label {
  color: #1677ff;

  font-size: 11px;
}

.modal-header h2 {
  margin: 8px 0 0;

  color: #263e57;

  font-size: 21px;
}

.close {
  width: 35px;
  height: 35px;

  border: none;

  background: #f2f5f8;

  border-radius: 50%;

  color: #738397;

  font-size: 23px;

  cursor: pointer;
}

.modal-body {
  padding: 25px 30px;
}

.detail-title {
  margin-bottom: 15px;

  color: #344d66;

  font-size: 14px;

  font-weight: bold;
}

.detail-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 1px;

  background: #edf1f5;

  border: 1px solid #edf1f5;

  border-radius: 9px;

  overflow: hidden;
}

.detail-grid > div {
  padding: 15px;

  background: #f8fafc;
}

.detail-grid span {
  display: block;

  color: #9aa7b5;

  font-size: 10px;

  margin-bottom: 5px;
}

.detail-grid strong {
  color: #41576d;

  font-size: 13px;
}

.greenText {
  color: #18a558 !important;
}

.orangeText {
  color: #f39a25 !important;
}

.redText {
  color: #e05252 !important;
}

.detail-block {
  margin-top: 24px;
}

.detail-block h3 {
  margin: 0 0 10px;

  color: #344d66;

  font-size: 14px;
}

.detail-block p {
  margin: 0;

  padding: 14px;

  border-radius: 8px;

  background: #f7f9fc;

  color: #68798b;

  font-size: 12px;

  line-height: 1.8;
}

.knowledge-box {
  margin-top: 20px;

  padding: 16px;

  display: flex;
  align-items: center;

  gap: 12px;

  background: #f0f7ff;

  border: 1px solid #dcecff;

  border-radius: 10px;
}

.knowledge-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: white;

  border-radius: 9px;

  font-size: 20px;
}

.knowledge-box > div:nth-child(2) {
  flex: 1;
}

.knowledge-box span {
  display: block;

  color: #8a9bad;

  font-size: 9px;

  margin-bottom: 4px;
}

.knowledge-box strong {
  color: #38516a;

  font-size: 12px;
}

.knowledge-box button {
  border: none;

  background: transparent;

  color: #1677ff;

  cursor: pointer;

  font-size: 11px;
}

.modal-footer {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  padding: 18px 30px;

  border-top: 1px solid #edf1f5;
}

.chat-btn {
  padding: 10px 16px;

  border: none;

  border-radius: 7px;

  background: #1677ff;

  color: white;

  cursor: pointer;
}

.close-btn {
  padding: 10px 20px;

  border: 1px solid #dce4ec;

  border-radius: 7px;

  background: white;

  color: #60748a;

  cursor: pointer;
}


/* =========================
   响应式
========================= */

@media (max-width: 1100px) {

  .stats {
    grid-template-columns:
      repeat(2, 1fr);
  }

}

@media (max-width: 800px) {

  .sidebar {
    display: none;
  }

  .main {
    margin-left: 0;

    padding: 0 18px 40px;
  }

  .topbar {
    height: 75px;
  }

  .user-area > span,
  .user-area > strong {
    display: none;
  }

  .intro-icon {
    display: none;
  }

  .toolbar {
    flex-direction: column;

    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .device-card {
    align-items: flex-start;
  }

  .device-action {
    display: none;
  }

}

@media (max-width: 550px) {

  .stats {
    grid-template-columns: 1fr;
  }

  .filter-section {
    flex-wrap: wrap;
  }

  .device-meta {
    flex-direction: column;

    gap: 6px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

}
</style>