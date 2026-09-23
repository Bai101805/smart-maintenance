<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索关键词
const searchText = ref('')

// 当前分类
const activeCategory = ref('全部')

// 当前查看的知识详情
const selectedKnowledge = ref(null)

// 用户名
const username = ref(localStorage.getItem('username') || '管理员')

// 知识分类
const categories = [
  { name: '全部', icon: '📚', count: 8 },
  { name: '数控机床', icon: '⚙️', count: 2 },
  { name: '工业机器人', icon: '🤖', count: 2 },
  { name: 'AGV', icon: '🚚', count: 2 },
  { name: 'PLC', icon: '🔌', count: 2 }
]

// 知识库数据
const knowledgeList = ref([
  {
    id: 1,
    category: '数控机床',
    icon: '⚙️',
    title: '数控机床主轴温度过高如何处理？',
    description: '针对数控机床主轴运行过程中温度异常升高的问题进行故障分析与处理。',
    phenomenon: '设备运行一段时间后，主轴温度持续升高，甚至出现报警停机。',
    cause: [
      '主轴润滑系统供油不足',
      '冷却液流量不足或温度过高',
      '主轴轴承出现磨损',
      '设备长时间高负荷运行'
    ],
    solution: [
      '检查主轴润滑油液位及供油情况',
      '检查冷却系统是否正常工作',
      '检查主轴轴承是否存在异常噪声',
      '降低设备负载并观察温度变化'
    ],
    notice: '处理过程中应先停止设备运行，避免高温继续运行造成主轴部件损坏。',
    views: 328,
    updateTime: '2026-09-20'
  },

  {
    id: 2,
    category: '数控机床',
    icon: '⚙️',
    title: '数控机床加工尺寸出现偏差怎么办？',
    description: '解决数控加工过程中产品尺寸与设定值存在明显偏差的问题。',
    phenomenon: '加工完成后使用量具检测，发现工件尺寸与图纸要求不一致。',
    cause: [
      '刀具存在磨损',
      '机床坐标系设置错误',
      '刀补参数输入错误',
      '机床长期运行导致机械精度变化'
    ],
    solution: [
      '检查并更换磨损刀具',
      '重新校验工件坐标系',
      '检查刀具补偿参数',
      '进行机床精度检测'
    ],
    notice: '修改刀补参数前应做好原始参数记录。',
    views: 256,
    updateTime: '2026-09-18'
  },

  {
    id: 3,
    category: '工业机器人',
    icon: '🤖',
    title: '工业机器人突然无法运动怎么办？',
    description: '针对工业机器人运行过程中出现无法启动、无法执行动作的问题进行分析。',
    phenomenon: '机器人控制柜正常通电，但是机器人无法执行运动指令。',
    cause: [
      '急停按钮处于按下状态',
      '安全门没有关闭',
      '伺服系统没有使能',
      '控制器存在报警信息'
    ],
    solution: [
      '检查控制柜及示教器上的急停按钮',
      '确认安全门及安全回路状态',
      '查看机器人控制器报警信息',
      '重新执行伺服使能操作'
    ],
    notice: '机器人检修时必须按照安全操作规范执行，禁止人员进入危险区域。',
    views: 512,
    updateTime: '2026-09-21'
  },

  {
    id: 4,
    category: '工业机器人',
    icon: '🤖',
    title: '工业机器人重复定位精度下降如何处理？',
    description: '解决工业机器人长期运行后出现定位偏差增大的问题。',
    phenomenon: '机器人执行相同轨迹时，末端位置出现明显偏移。',
    cause: [
      '机器人机械部件存在磨损',
      '工具坐标系发生变化',
      '负载参数设置不准确',
      '机器人受到外部碰撞'
    ],
    solution: [
      '检查机器人机械臂各关节状态',
      '重新校准工具坐标系',
      '核对机器人负载参数',
      '执行机器人精度检测与校准'
    ],
    notice: '机器人发生碰撞后，应先进行机械检查，再重新进行精度校准。',
    views: 389,
    updateTime: '2026-09-16'
  },

  {
    id: 5,
    category: 'AGV',
    icon: '🚚',
    title: 'AGV小车无法正常导航怎么办？',
    description: '分析AGV在生产车间运行过程中出现定位异常、导航失败的问题。',
    phenomenon: 'AGV启动后无法识别路线，或者运行过程中突然停止。',
    cause: [
      '导航传感器被灰尘遮挡',
      '导航地图数据异常',
      '定位标签损坏',
      '运行路线存在障碍物'
    ],
    solution: [
      '清洁AGV导航传感器',
      '重新检查导航地图',
      '检查定位标签是否正常',
      '清理AGV运行路径上的障碍物'
    ],
    notice: '检查AGV前必须确保设备停止运行，防止人员与车辆发生碰撞。',
    views: 287,
    updateTime: '2026-09-19'
  },

  {
    id: 6,
    category: 'AGV',
    icon: '🚚',
    title: 'AGV电量下降过快如何处理？',
    description: '针对AGV工作时间明显缩短、电池电量下降过快的问题进行分析。',
    phenomenon: 'AGV充满电后运行时间明显低于正常工作时间。',
    cause: [
      '电池老化',
      '充电模块异常',
      'AGV长期超负载运行',
      '电池温度过高'
    ],
    solution: [
      '检查电池健康状态',
      '检查充电器及充电接口',
      '检查AGV当前负载',
      '必要时更换电池组'
    ],
    notice: '电池更换应使用与设备型号匹配的电池组件。',
    views: 194,
    updateTime: '2026-09-15'
  },

  {
    id: 7,
    category: 'PLC',
    icon: '🔌',
    title: 'PLC与上位机通信异常怎么办？',
    description: '解决PLC与工业计算机、HMI等设备之间通信失败的问题。',
    phenomenon: 'HMI无法读取PLC数据，设备界面显示通信异常。',
    cause: [
      '通信网线连接异常',
      'PLC IP地址配置错误',
      '交换机通信异常',
      'PLC通信模块发生故障'
    ],
    solution: [
      '检查通信网线及接口',
      '检查PLC与上位机IP地址',
      '检查交换机指示灯状态',
      '检查PLC通信模块诊断信息'
    ],
    notice: '修改PLC网络参数前，应记录原始网络配置。',
    views: 421,
    updateTime: '2026-09-22'
  },

  {
    id: 8,
    category: 'PLC',
    icon: '🔌',
    title: 'PLC输入信号异常如何排查？',
    description: '解决传感器信号无法正常进入PLC输入端的问题。',
    phenomenon: '现场传感器已经动作，但PLC输入指示灯没有变化。',
    cause: [
      '传感器供电异常',
      '传感器线路断路',
      'PLC输入端子接线错误',
      '输入模块损坏'
    ],
    solution: [
      '检查传感器供电电压',
      '检查信号线路是否导通',
      '检查PLC输入端子接线',
      '检测PLC输入模块'
    ],
    notice: '电气检测必须由具备相关操作能力的人员进行。',
    views: 315,
    updateTime: '2026-09-17'
  }
])

// 搜索 + 分类筛选
const filteredList = computed(() => {
  let result = knowledgeList.value

  if (activeCategory.value !== '全部') {
    result = result.filter(
      item => item.category === activeCategory.value
    )
  }

  const keyword = searchText.value.trim().toLowerCase()

  if (keyword) {
    result = result.filter(item => {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
      )
    })
  }

  return result
})

// 切换分类
function selectCategory(category) {
  activeCategory.value = category
}

// 查看详情
function showDetail(item) {
  selectedKnowledge.value = item
}

// 关闭详情
function closeDetail() {
  selectedKnowledge.value = null
}

// 页面跳转
function go(path) {
  router.push(path)
}

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

      <div class="logo">
        <div class="logo-icon">⚙</div>

        <div>
          <div class="logo-title">智造智维</div>
          <div class="logo-en">SMART MAINTENANCE</div>
        </div>
      </div>

      <div class="menu-title">平台功能</div>

      <div class="menu-item" @click="go('/home')">
        <span>🏠</span>
        <span>平台首页</span>
      </div>

      <div class="menu-item active">
        <span>📚</span>
        <span>知识库</span>
      </div>

      <div class="menu-item" @click="go('/chat')">
        <span>🤖</span>
        <span>智能问答</span>
      </div>

      <div class="menu-item" @click="go('/device')">
        <span>🏭</span>
        <span>设备管理</span>
      </div>

      <div class="menu-title user-title">用户中心</div>

      <div class="menu-item" @click="go('/user')">
        <span>👤</span>
        <span>个人中心</span>
      </div>

      <div class="sidebar-bottom">
        <div class="system-status">
          <span></span>
          系统运行正常
        </div>

        <div class="version">
          智造智维 V1.0
        </div>
      </div>

    </aside>

    <!-- 主区域 -->
    <main class="main">

      <!-- 顶部 -->
      <header class="topbar">

        <div>
          <div class="breadcrumb">
            首页 / 知识库
          </div>

          <h1>运维知识库</h1>
        </div>

        <div class="user-area">

          <span class="center-name">
            智能制造运维中心
          </span>

          <div class="avatar">
            👨‍🔧
          </div>

          <strong>{{ username }}</strong>

          <button @click="logout">
            退出
          </button>

        </div>

      </header>

      <!-- 蓝色介绍区域 -->
      <section class="hero">

        <div>
          <div class="hero-label">
            KNOWLEDGE CENTER
          </div>

          <h2>
            设备运维知识中心
          </h2>

          <p>
            汇聚数控机床、工业机器人、AGV、PLC等设备运维知识，
            快速定位设备故障，获取标准化解决方案。
          </p>
        </div>

        <div class="hero-icon">
          📚
        </div>

      </section>

      <!-- 分类 -->
      <section class="category-list">

        <div
          v-for="item in categories"
          :key="item.name"
          class="category-card"
          :class="{ active: activeCategory === item.name }"
          @click="selectCategory(item.name)"
        >

          <div class="category-icon">
            {{ item.icon }}
          </div>

          <div>
            <div class="category-name">
              {{ item.name }}
            </div>

            <div class="category-count">
              {{ item.count }} 条知识
            </div>
          </div>

        </div>

      </section>

      <!-- 搜索 -->
      <section class="search-area">

        <div class="search-box">

          <span>🔍</span>

          <input
            v-model="searchText"
            type="text"
            placeholder="搜索设备、故障现象、解决方案，例如：机器人无法运动"
          />

          <button>
            搜索
          </button>

        </div>

        <div class="result-count">
          共找到
          <b>{{ filteredList.length }}</b>
          条知识
        </div>

      </section>

      <!-- 知识列表 -->
      <section class="knowledge-list">

        <!-- 空数据 -->
        <div
          v-if="filteredList.length === 0"
          class="empty"
        >
          <div class="empty-icon">🔍</div>
          <h3>没有找到相关知识</h3>
          <p>请尝试其他关键词或切换设备分类</p>
        </div>

        <!-- 知识卡片 -->
        <div
          v-for="item in filteredList"
          :key="item.id"
          class="knowledge-card"
        >

          <div class="knowledge-icon">
            {{ item.icon }}
          </div>

          <div class="knowledge-content">

            <div class="knowledge-meta">

              <span class="tag">
                {{ item.category }}
              </span>

              <span>
                更新于 {{ item.updateTime }}
              </span>

              <span>
                👁 {{ item.views }}
              </span>

            </div>

            <h2>
              {{ item.title }}
            </h2>

            <p>
              {{ item.description }}
            </p>

            <div class="small-tags">
              <span>故障诊断</span>
              <span>运维方案</span>
              <span>设备维护</span>
            </div>

          </div>

          <button
            class="detail-button"
            @click="showDetail(item)"
          >
            查看详情 →
          </button>

        </div>

      </section>

    </main>

    <!-- 详情弹窗 -->
    <div
      v-if="selectedKnowledge"
      class="modal-mask"
      @click.self="closeDetail"
    >

      <div class="modal">

        <div class="modal-header">

          <div>

            <div class="modal-category">
              {{ selectedKnowledge.icon }}
              {{ selectedKnowledge.category }}
            </div>

            <h2>
              {{ selectedKnowledge.title }}
            </h2>

          </div>

          <button
            class="close-button"
            @click="closeDetail"
          >
            ×
          </button>

        </div>

        <div class="modal-body">

          <!-- 问题描述 -->
          <div class="detail-section">

            <h3>📌 问题描述</h3>

            <p>
              {{ selectedKnowledge.description }}
            </p>

          </div>

          <!-- 故障现象 -->
          <div class="detail-section">

            <h3>⚠️ 故障现象</h3>

            <p>
              {{ selectedKnowledge.phenomenon }}
            </p>

          </div>

          <!-- 原因分析 -->
          <div class="detail-section">

            <h3>🔍 原因分析</h3>

            <ul>
              <li
                v-for="item in selectedKnowledge.cause"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>

          </div>

          <!-- 解决方案 -->
          <div class="detail-section solution">

            <h3>🛠️ 解决方案</h3>

            <ol>
              <li
                v-for="item in selectedKnowledge.solution"
                :key="item"
              >
                {{ item }}
              </li>
            </ol>

          </div>

          <!-- 注意事项 -->
          <div class="notice">

            <div class="notice-icon">
              💡
            </div>

            <div>

              <strong>注意事项</strong>

              <p>
                {{ selectedKnowledge.notice }}
              </p>

            </div>

          </div>

        </div>

        <div class="modal-footer">

          <button
            class="ask-button"
            @click="go('/chat')"
          >
            🤖 针对这个问题进行智能问答
          </button>

          <button
            class="close-button-text"
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

/* 左侧导航 */

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 245px;
  padding: 25px 16px;
  background: linear-gradient(180deg, #082f5d, #064b8f);
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 10px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.logo-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.13);
  font-size: 25px;
}

.logo-title {
  font-size: 19px;
  font-weight: bold;
}

.logo-en {
  margin-top: 4px;
  font-size: 8px;
  letter-spacing: 1px;
  opacity: 0.55;
}

.menu-title {
  padding: 25px 12px 10px;
  color: #8eb4d8;
  font-size: 12px;
}

.user-title {
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
  transition: 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.09);
}

.menu-item.active {
  background: #1677ff;
  color: white;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.sidebar-bottom {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 25px;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b7e8cf;
  font-size: 12px;
}

.system-status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #37d67a;
}

.version {
  margin-top: 10px;
  color: #79a5cb;
  font-size: 11px;
}

/* 主区域 */

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
  margin-bottom: 5px;
  color: #94a3b8;
  font-size: 12px;
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

/* Hero */

.hero {
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;
  border-radius: 16px;
  background: linear-gradient(120deg, #0753a0, #0878d8);
  color: white;
  box-shadow: 0 12px 30px rgba(8, 83, 160, 0.16);
}

.hero-label {
  margin-bottom: 10px;
  color: #a9d7ff;
  font-size: 11px;
  letter-spacing: 2px;
}

.hero h2 {
  margin: 0;
  font-size: 28px;
}

.hero p {
  max-width: 700px;
  margin: 12px 0 0;
  color: #d9ecff;
  font-size: 14px;
  line-height: 1.8;
}

.hero-icon {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  font-size: 55px;
}

/* 分类 */

.category-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 18px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(30, 70, 110, 0.04);
  transition: 0.2s;
}

.category-card:hover {
  transform: translateY(-2px);
  border-color: #b8d7fa;
}

.category-card.active {
  border-color: #1677ff;
  background: #edf6ff;
}

.category-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f1f6fc;
  font-size: 21px;
}

.category-name {
  color: #354b63;
  font-size: 13px;
  font-weight: bold;
}

.category-count {
  margin-top: 4px;
  color: #9aa7b5;
  font-size: 10px;
}

/* 搜索 */

.search-area {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
}

.search-box {
  flex: 1;
  height: 52px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  overflow: hidden;
  border: 1px solid #e1e8f0;
  border-radius: 10px;
  background: white;
}

.search-box > span {
  margin-right: 10px;
  font-size: 18px;
}

.search-box input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  color: #40566e;
  font-size: 14px;
}

.search-box button {
  width: 90px;
  height: 100%;
  border: none;
  border-radius: 0 10px 10px 0;
  background: #1677ff;
  color: white;
  cursor: pointer;
}

.result-count {
  color: #8a98a8;
  font-size: 13px;
  white-space: nowrap;
}

.result-count b {
  margin: 0 3px;
  color: #1677ff;
  font-size: 17px;
}

/* 知识列表 */

.knowledge-list {
  margin-top: 18px;
}

.knowledge-card {
  min-height: 150px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  padding: 22px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 4px 18px rgba(30, 70, 110, 0.05);
  transition: 0.2s;
}

.knowledge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 70, 110, 0.08);
}

.knowledge-icon {
  width: 65px;
  height: 65px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #edf5ff;
  font-size: 30px;
}

.knowledge-content {
  flex: 1;
}

.knowledge-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #a0acb9;
  font-size: 10px;
}

.tag {
  padding: 4px 8px;
  border-radius: 5px;
  background: #eaf3ff;
  color: #1677ff;
}

.knowledge-content h2 {
  margin: 9px 0 7px;
  color: #2e4862;
  font-size: 16px;
}

.knowledge-content p {
  margin: 0;
  color: #7e8d9e;
  font-size: 12px;
  line-height: 1.7;
}

.small-tags {
  display: flex;
  gap: 7px;
  margin-top: 10px;
}

.small-tags span {
  padding: 4px 8px;
  border-radius: 4px;
  background: #f4f7fa;
  color: #8493a3;
  font-size: 9px;
}

.detail-button {
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  background: #edf6ff;
  color: #1677ff;
  cursor: pointer;
  white-space: nowrap;
}

.detail-button:hover {
  background: #1677ff;
  color: white;
}

/* 空状态 */

.empty {
  padding: 70px;
  border-radius: 14px;
  background: white;
  text-align: center;
}

.empty-icon {
  font-size: 45px;
}

.empty h3 {
  color: #53677c;
}

.empty p {
  color: #9aa7b5;
}

/* 弹窗 */

.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: rgba(11, 35, 60, 0.55);
  backdrop-filter: blur(3px);
}

.modal {
  width: 800px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 25px 30px;
  border-bottom: 1px solid #edf1f5;
}

.modal-category {
  color: #1677ff;
  font-size: 12px;
}

.modal-header h2 {
  margin: 8px 0 0;
  color: #263e57;
  font-size: 20px;
}

.close-button {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: #f2f5f8;
  color: #738397;
  font-size: 23px;
  cursor: pointer;
}

.modal-body {
  padding: 25px 30px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h3 {
  margin: 0 0 10px;
  color: #344d66;
  font-size: 15px;
}

.detail-section p {
  margin: 0;
  padding: 13px 15px;
  border-radius: 8px;
  background: #f7f9fc;
  color: #68798b;
  font-size: 13px;
  line-height: 1.8;
}

.detail-section ul,
.detail-section ol {
  margin: 0;
  padding: 14px 35px;
  border-radius: 8px;
  background: #f7f9fc;
  color: #68798b;
  font-size: 13px;
  line-height: 2;
}

.solution ol {
  background: #f0f8ff;
}

.notice {
  display: flex;
  gap: 12px;
  padding: 15px;
  border-radius: 9px;
  background: #fff8e9;
  color: #79643a;
}

.notice-icon {
  font-size: 20px;
}

.notice strong {
  font-size: 13px;
}

.notice p {
  margin: 5px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 18px 30px;
  border-top: 1px solid #edf1f5;
}

.ask-button {
  padding: 11px 18px;
  border: none;
  border-radius: 7px;
  background: #1677ff;
  color: white;
  cursor: pointer;
}

.close-button-text {
  padding: 11px 20px;
  border: 1px solid #dce4ec;
  border-radius: 7px;
  background: white;
  color: #60748a;
  cursor: pointer;
}

/* 响应式 */

@media (max-width: 1100px) {
  .category-list {
    grid-template-columns: repeat(3, 1fr);
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

  .center-name,
  .user-area strong {
    display: none;
  }

  .hero-icon {
    display: none;
  }

  .category-list {
    grid-template-columns: 1fr 1fr;
  }

  .search-area {
    flex-direction: column;
    align-items: stretch;
  }

  .knowledge-card {
    align-items: flex-start;
  }

  .detail-button {
    display: none;
  }
}

@media (max-width: 500px) {
  .category-list {
    grid-template-columns: 1fr;
  }
}
</style>