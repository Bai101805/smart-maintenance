<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前输入的问题
const inputText = ref('')

// 是否正在生成回答
const loading = ref(false)

// 当前回答列表
const messages = ref([
  {
    id: 1,
    type: 'ai',
    question: '',
    answer:
      '您好，我是智造智维 AI 运维助手，可以帮助您分析数控机床、工业机器人、AGV、PLC 等智能制造设备的常见故障。您可以直接输入设备故障现象，例如“机器人无法运动”或“PLC通信异常”。'
  }
])

// 快捷问题
const quickQuestions = [
  '数控机床主轴温度过高怎么办？',
  '工业机器人突然无法运动怎么办？',
  'AGV无法正常导航怎么办？',
  'PLC与上位机通信异常怎么办？'
]

// 模拟知识库
const knowledgeData = [
  {
    keywords: ['主轴', '温度', '过高'],
    title: '数控机床主轴温度过高如何处理？',
    category: '数控机床',
    answer:
      '根据知识库分析，数控机床主轴温度过高可能与主轴润滑不足、冷却液流量不足、主轴轴承磨损以及长时间高负荷运行有关。建议首先检查润滑油液位和供油情况，然后检查冷却系统。如果仍然存在异常，需要进一步检查主轴轴承状态。'
  },
  {
    keywords: ['机器人', '无法运动', '不能运动', '不动'],
    title: '工业机器人突然无法运动怎么办？',
    category: '工业机器人',
    answer:
      '工业机器人无法运动时，可以按照以下顺序排查：①检查急停按钮是否被按下；②确认安全门已经关闭；③检查安全回路；④查看控制器和示教器是否存在报警；⑤确认伺服系统是否已经使能。检修过程中必须遵守机器人安全操作规范。'
  },
  {
    keywords: ['agv', '导航', '路线'],
    title: 'AGV小车无法正常导航怎么办？',
    category: 'AGV',
    answer:
      'AGV导航异常通常与导航传感器、地图数据、定位标签以及运行路线有关。建议先检查导航传感器是否被灰尘遮挡，再检查地图数据和定位标签，同时确认运行路线没有障碍物。'
  },
  {
    keywords: ['plc', '通信', '通讯', '上位机'],
    title: 'PLC与上位机通信异常怎么办？',
    category: 'PLC',
    answer:
      'PLC与上位机通信异常时，可以检查通信网线和接口是否正常，然后确认PLC与上位机IP地址配置是否正确，再检查交换机工作状态。如果网络连接正常但仍然无法通信，需要进一步检查PLC通信模块的诊断信息。'
  },
  {
    keywords: ['输入', '信号', '传感器'],
    title: 'PLC输入信号异常如何排查？',
    category: 'PLC',
    answer:
      '如果现场传感器已经动作，但是PLC输入指示灯没有变化，可以检查传感器供电、信号线路、PLC输入端子接线以及输入模块状态。电气检测建议由具备相关操作能力的人员进行。'
  }
]

// 判断问题
const findAnswer = (question) => {
  const text = question.toLowerCase()

  for (const item of knowledgeData) {
    const matched = item.keywords.some(keyword =>
      text.includes(keyword.toLowerCase())
    )

    if (matched) {
      return item
    }
  }

  return null
}

// 发送问题
const sendQuestion = async (question = inputText.value) => {
  const text = question.trim()

  if (!text || loading.value) {
    return
  }

  // 添加用户问题
  messages.value.push({
    id: Date.now(),
    type: 'user',
    question: text,
    answer: ''
  })

  inputText.value = ''
  loading.value = true

  await nextTick()

  // 模拟AI思考
  setTimeout(() => {
    const result = findAnswer(text)

    if (result) {
      messages.value.push({
        id: Date.now() + 1,
        type: 'ai',
        question: text,
        answer: result.answer,
        knowledge: result
      })
    } else {
      messages.value.push({
        id: Date.now() + 1,
        type: 'ai',
        question: text,
        answer:
          '暂时没有在本地知识库中找到完全匹配的答案。建议您补充设备名称、故障现象以及报警信息，例如“PLC无法与HMI通信”“机器人伺服报警”等，我可以根据关键词继续进行故障匹配。'
      })
    }

    loading.value = false
  }, 900)
}

// 快捷提问
const quickAsk = (question) => {
  sendQuestion(question)
}

// 反馈
const feedback = (message, type) => {
  message.feedback = type
}

// 清空历史
const clearHistory = () => {
  messages.value = [
    {
      id: Date.now(),
      type: 'ai',
      question: '',
      answer:
        '历史记录已经清空。您好，我是智造智维 AI 运维助手，请输入您遇到的设备故障。'
    }
  ]
}

// 跳转页面
const go = (path) => {
  router.push(path)
}

// 退出
const logout = () => {
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

      <div class="menu-item active">
        <span>🤖</span>
        智能问答
      </div>

      <div
        class="menu-item"
        @click="go('/device')"
      >
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
          AI服务运行正常
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
            首页 / 智能问答
          </div>

          <h1>
            智能运维问答
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
            {{ localStorage.getItem('username') || '管理员' }}
          </strong>

          <button @click="logout">
            退出
          </button>

        </div>

      </header>

      <!-- AI头部 -->
      <section class="ai-banner">

        <div class="ai-info">

          <div class="ai-logo">
            🤖
          </div>

          <div>

            <div class="ai-label">
              AI MAINTENANCE ASSISTANT
            </div>

            <h2>
              智能制造 AI 运维助手
            </h2>

            <p>
              基于设备运维知识库，为您提供快速、准确的故障分析与解决方案
            </p>

          </div>

        </div>

        <div class="ai-status">
          <span></span>
          AI 在线
        </div>

      </section>

      <!-- 快捷问题 -->
      <section class="quick-section">

        <div class="section-title">
          <span>💡</span>
          常见问题
        </div>

        <div class="quick-list">

          <button
            v-for="question in quickQuestions"
            :key="question"
            @click="quickAsk(question)"
          >
            {{ question }}
          </button>

        </div>

      </section>

      <!-- 聊天区域 -->
      <section class="chat-panel">

        <div class="chat-header">

          <div>
            <strong>
              AI 对话
            </strong>

            <span>
              已连接本地运维知识库
            </span>
          </div>

          <button
            class="clear-btn"
            @click="clearHistory"
          >
            🗑 清空记录
          </button>

        </div>

        <!-- 消息 -->
        <div class="messages">

          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="message.type"
          >

            <!-- AI -->
            <template v-if="message.type === 'ai'">

              <div class="message-avatar ai-avatar">
                🤖
              </div>

              <div class="message-content">

                <div class="message-name">
                  智造智维 AI
                  <span>智能运维助手</span>
                </div>

                <div class="bubble ai-bubble">

                  <p>
                    {{ message.answer }}
                  </p>

                  <!-- 推荐知识 -->
                  <div
                    v-if="message.knowledge"
                    class="knowledge-recommend"
                  >

                    <div class="recommend-title">
                      📚 相关知识
                    </div>

                    <div class="recommend-card">

                      <div class="recommend-icon">
                        {{ message.knowledge.category === 'PLC'
                          ? '🔌'
                          : message.knowledge.category === 'AGV'
                          ? '🚚'
                          : message.knowledge.category === '工业机器人'
                          ? '🤖'
                          : '⚙️'
                        }}
                      </div>

                      <div class="recommend-info">

                        <strong>
                          {{ message.knowledge.title }}
                        </strong>

                        <span>
                          {{ message.knowledge.category }}
                        </span>

                      </div>

                      <button
                        @click="go('/knowledge')"
                      >
                        查看
                      </button>

                    </div>

                  </div>

                  <!-- AI反馈 -->
                  <div class="feedback">

                    <span>
                      这个回答对您有帮助吗？
                    </span>

                    <button
                      :class="{
                        selected: message.feedback === 'useful'
                      }"
                      @click="feedback(message, 'useful')"
                    >
                      👍 有用
                    </button>

                    <button
                      :class="{
                        selected: message.feedback === 'useless'
                      }"
                      @click="feedback(message, 'useless')"
                    >
                      👎 无用
                    </button>

                  </div>

                </div>

              </div>

            </template>

            <!-- 用户 -->
            <template v-else>

              <div class="message-content user-content">

                <div class="message-name user-name">
                  我
                </div>

                <div class="bubble user-bubble">
                  {{ message.question }}
                </div>

              </div>

              <div class="message-avatar user-avatar">
                👨‍🔧
              </div>

            </template>

          </div>

          <!-- AI思考 -->
          <div
            v-if="loading"
            class="message ai"
          >

            <div class="message-avatar ai-avatar">
              🤖
            </div>

            <div class="message-content">

              <div class="message-name">
                智造智维 AI
              </div>

              <div class="bubble ai-bubble loading-bubble">

                <span></span>
                <span></span>
                <span></span>

                <em>
                  正在分析设备故障...
                </em>

              </div>

            </div>

          </div>

        </div>

        <!-- 输入 -->
        <div class="input-area">

          <div class="input-wrapper">

            <textarea
              v-model="inputText"
              placeholder="请输入设备故障，例如：工业机器人无法运动、PLC通信异常..."
              @keydown.enter.exact.prevent="sendQuestion()"
            ></textarea>

            <button
              class="send-btn"
              :disabled="loading || !inputText.trim()"
              @click="sendQuestion()"
            >
              发送
              ➤
            </button>

          </div>

          <div class="input-tip">
            💡 提示：描述越详细，AI越容易匹配到相关运维知识
          </div>

        </div>

      </section>

    </main>

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
   左侧菜单
========================= */

.sidebar {
  width: 245px;

  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;

  background:
    linear-gradient(
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

  border-bottom:
    1px solid rgba(255,255,255,.12);
}

.logo-icon {
  width: 45px;
  height: 45px;

  border-radius: 12px;

  display: flex;

  align-items: center;
  justify-content: center;

  background:
    rgba(255,255,255,.13);

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
  background:
    rgba(255,255,255,.09);
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

  padding:
    0 35px 50px;
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
   AI Banner
========================= */

.ai-banner {
  min-height: 155px;

  padding: 28px 35px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-radius: 16px;

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

.ai-info {
  display: flex;

  align-items: center;

  gap: 20px;
}

.ai-logo {
  width: 76px;
  height: 76px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 20px;

  background:
    rgba(255,255,255,.13);

  font-size: 40px;
}

.ai-label {
  color: #a9d7ff;

  font-size: 10px;

  letter-spacing: 2px;

  margin-bottom: 7px;
}

.ai-banner h2 {
  margin: 0;

  font-size: 25px;
}

.ai-banner p {
  margin: 8px 0 0;

  color: #d8edff;

  font-size: 13px;
}

.ai-status {
  padding: 8px 14px;

  display: flex;

  align-items: center;

  gap: 7px;

  border-radius: 20px;

  background:
    rgba(255,255,255,.13);

  font-size: 12px;
}

.ai-status span {
  width: 7px;
  height: 7px;

  background: #37df80;

  border-radius: 50%;
}

/* =========================
   快捷问题
========================= */

.quick-section {
  margin-top: 20px;
}

.section-title {
  color: #334b64;

  font-size: 14px;

  font-weight: bold;

  margin-bottom: 10px;
}

.quick-list {
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
}

.quick-list button {
  padding: 10px 15px;

  border:
    1px solid #dce7f1;

  border-radius: 8px;

  background: white;

  color: #61758b;

  cursor: pointer;

  font-size: 12px;

  transition: .2s;
}

.quick-list button:hover {
  border-color: #1677ff;

  color: #1677ff;

  background: #f2f8ff;
}

/* =========================
   聊天面板
========================= */

.chat-panel {
  margin-top: 20px;

  background: white;

  border-radius: 15px;

  box-shadow:
    0 4px 20px rgba(30,70,110,.05);

  overflow: hidden;
}

.chat-header {
  height: 65px;

  padding: 0 25px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-bottom:
    1px solid #edf1f5;
}

.chat-header strong {
  color: #334b64;

  font-size: 15px;
}

.chat-header span {
  margin-left: 10px;

  color: #9aa8b7;

  font-size: 11px;
}

.clear-btn {
  border: none;

  background: transparent;

  color: #8b9aaa;

  cursor: pointer;

  font-size: 12px;
}

.clear-btn:hover {
  color: #1677ff;
}

/* =========================
   消息
========================= */

.messages {
  min-height: 390px;

  max-height: 560px;

  overflow-y: auto;

  padding: 25px;
}

.message {
  display: flex;

  gap: 12px;

  margin-bottom: 25px;
}

.message.user {
  justify-content: flex-end;
}

.message-avatar {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  font-size: 19px;
}

.ai-avatar {
  background: #eaf4ff;
}

.user-avatar {
  background: #eaf7f1;
}

.message-content {
  max-width: 72%;
}

.user-content {
  display: flex;

  flex-direction: column;

  align-items: flex-end;
}

.message-name {
  margin-bottom: 6px;

  color: #53677c;

  font-size: 11px;
}

.message-name span {
  margin-left: 7px;

  color: #a4afbb;

  font-size: 9px;
}

.user-name {
  color: #1677ff;
}

.bubble {
  padding: 15px 17px;

  border-radius: 10px;

  font-size: 13px;

  line-height: 1.8;
}

.ai-bubble {
  background: #f5f8fb;

  color: #5d7185;

  border-top-left-radius: 3px;
}

.user-bubble {
  background: #1677ff;

  color: white;

  border-top-right-radius: 3px;
}

.ai-bubble p {
  margin: 0;
}

/* =========================
   推荐知识
========================= */

.knowledge-recommend {
  margin-top: 15px;

  padding-top: 13px;

  border-top:
    1px solid #e4ebf2;
}

.recommend-title {
  color: #60758b;

  font-size: 11px;

  margin-bottom: 8px;
}

.recommend-card {
  display: flex;

  align-items: center;

  gap: 10px;

  padding: 10px;

  background: white;

  border:
    1px solid #e4ebf2;

  border-radius: 8px;
}

.recommend-icon {
  width: 35px;
  height: 35px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 7px;

  background: #edf5ff;

  font-size: 18px;
}

.recommend-info {
  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 3px;
}

.recommend-info strong {
  color: #415970;

  font-size: 11px;
}

.recommend-info span {
  color: #9aa7b5;

  font-size: 9px;
}

.recommend-card button {
  border: none;

  background: #edf6ff;

  color: #1677ff;

  border-radius: 5px;

  padding: 7px 10px;

  cursor: pointer;

  font-size: 10px;
}

/* =========================
   反馈
========================= */

.feedback {
  margin-top: 13px;

  display: flex;

  align-items: center;

  gap: 6px;

  color: #a0acb8;

  font-size: 9px;
}

.feedback button {
  padding: 4px 7px;

  border:
    1px solid #e1e7ed;

  background: white;

  color: #7b8b9a;

  border-radius: 4px;

  cursor: pointer;

  font-size: 9px;
}

.feedback button:hover,
.feedback button.selected {
  border-color: #1677ff;

  background: #edf6ff;

  color: #1677ff;
}

/* =========================
   AI加载
========================= */

.loading-bubble {
  display: flex;

  align-items: center;

  gap: 4px;
}

.loading-bubble > span {
  width: 6px;
  height: 6px;

  background: #1677ff;

  border-radius: 50%;

  animation: loading 1s infinite;
}

.loading-bubble > span:nth-child(2) {
  animation-delay: .15s;
}

.loading-bubble > span:nth-child(3) {
  animation-delay: .3s;
}

.loading-bubble em {
  margin-left: 6px;

  color: #8293a5;

  font-size: 10px;

  font-style: normal;
}

@keyframes loading {
  0%, 100% {
    opacity: .3;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

/* =========================
   输入区域
========================= */

.input-area {
  padding: 18px 25px 20px;

  border-top:
    1px solid #edf1f5;

  background: #fbfcfe;
}

.input-wrapper {
  min-height: 60px;

  display: flex;

  align-items: stretch;

  border:
    1px solid #dce5ee;

  background: white;

  border-radius: 10px;

  overflow: hidden;

  transition: .2s;
}

.input-wrapper:focus-within {
  border-color: #1677ff;

  box-shadow:
    0 0 0 3px rgba(22,119,255,.08);
}

.input-wrapper textarea {
  flex: 1;

  min-height: 60px;

  padding: 15px;

  resize: none;

  border: none;

  outline: none;

  color: #40566e;

  font-family: inherit;

  font-size: 13px;
}

.input-wrapper textarea::placeholder {
  color: #b2bdc8;
}

.send-btn {
  width: 95px;

  margin: 7px;

  border: none;

  border-radius: 7px;

  background: #1677ff;

  color: white;

  cursor: pointer;

  font-size: 13px;
}

.send-btn:hover {
  background: #0968e5;
}

.send-btn:disabled {
  background: #b8c8d8;

  cursor: not-allowed;
}

.input-tip {
  margin-top: 8px;

  color: #9ba8b5;

  font-size: 9px;
}

/* =========================
   响应式
========================= */

@media (max-width: 900px) {

  .sidebar {
    display: none;
  }

  .main {
    margin-left: 0;

    padding: 0 18px 40px;
  }

  .ai-status {
    display: none;
  }

  .message-content {
    max-width: 85%;
  }

}

@media (max-width: 600px) {

  .topbar {
    height: 75px;
  }

  .user-area > span,
  .user-area > strong {
    display: none;
  }

  .ai-banner {
    padding: 22px;
  }

  .ai-logo {
    width: 55px;
    height: 55px;

    font-size: 28px;
  }

  .ai-banner h2 {
    font-size: 19px;
  }

  .ai-banner p {
    font-size: 11px;
  }

  .messages {
    padding: 15px;
  }

  .input-area {
    padding: 12px;
  }

  .send-btn {
    width: 75px;
  }

}
</style>