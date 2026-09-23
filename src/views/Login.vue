<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const errorMessage = ref('')

const login = () => {
  errorMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '请输入用户名'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = '请输入密码'
    return
  }

  loading.value = true

  setTimeout(() => {
    // 模拟登录状态
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('username', username.value)

    if (remember.value) {
      localStorage.setItem('remember', 'true')
    }

    loading.value = false

    // 登录成功，进入首页
    router.push('/home')
  }, 600)
}

const register = () => {
  alert('注册功能为模拟功能，输入信息后即可注册。')
}

const demoLogin = () => {
  username.value = 'admin'
  password.value = '123456'
}
</script>

<template>
  <div class="login-page">

    <!-- 左侧品牌区域 -->
    <div class="brand-panel">

      <div class="brand-content">

        <div class="logo">
          ⚙
        </div>

        <h1>
          智造智维
        </h1>

        <p class="english">
          SMART MAINTENANCE
        </p>

        <p class="description">
          智能制造设备运维知识问答平台
        </p>

        <div class="line"></div>

        <p class="slogan">
          让设备运维更智能<br />
          让生产管理更高效
        </p>

        <div class="features">

          <div class="feature">
            <span>🤖</span>
            <div>
              <strong>智能问答</strong>
              <p>快速获取设备故障解决方案</p>
            </div>
          </div>

          <div class="feature">
            <span>📚</span>
            <div>
              <strong>知识中心</strong>
              <p>沉淀企业设备运维知识</p>
            </div>
          </div>

          <div class="feature">
            <span>🏭</span>
            <div>
              <strong>设备管理</strong>
              <p>实时掌握设备运行状态</p>
            </div>
          </div>

        </div>

      </div>

    </div>


    <!-- 右侧登录区域 -->
    <div class="login-panel">

      <div class="login-box">

        <div class="mobile-logo">
          ⚙
        </div>

        <h2>
          欢迎登录
        </h2>

        <p class="welcome">
          登录智造智维平台，开始设备运维管理
        </p>


        <!-- 用户名 -->
        <div class="form-item">

          <label>
            用户名
          </label>

          <div class="input-box">

            <span>
              👤
            </span>

            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              @keyup.enter="login"
            />

          </div>

        </div>


        <!-- 密码 -->
        <div class="form-item">

          <label>
            密码
          </label>

          <div class="input-box">

            <span>
              🔒
            </span>

            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="login"
            />

          </div>

        </div>


        <!-- 错误提示 -->
        <div
          v-if="errorMessage"
          class="error"
        >
          ⚠ {{ errorMessage }}
        </div>


        <!-- 记住密码 -->
        <div class="options">

          <label class="remember">

            <input
              v-model="remember"
              type="checkbox"
            />

            记住登录状态

          </label>

          <span class="forgot">
            忘记密码？
          </span>

        </div>


        <!-- 登录按钮 -->
        <button
          class="login-btn"
          :disabled="loading"
          @click="login"
        >

          {{ loading ? '正在登录...' : '登录' }}

        </button>


        <!-- 注册 -->
        <div class="register">

          还没有账号？

          <span @click="register">
            立即注册
          </span>

        </div>


        <!-- 演示账号 -->
        <div class="demo">

          <div class="demo-title">
            💡 演示账号
          </div>

          <div>
            用户名：<strong>admin</strong>
          </div>

          <div>
            密码：<strong>123456</strong>
          </div>

          <button @click="demoLogin">
            一键填写
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

.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: #f4f7fb;
}


/* ==================== */
/* 左侧品牌区域 */
/* ==================== */

.brand-panel {
  width: 52%;
  min-height: 100vh;

  background:
    linear-gradient(
      135deg,
      #062b57 0%,
      #0755a0 55%,
      #0877d9 100%
    );

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
}


/* 背景装饰 */

.brand-panel::before {
  content: "";
  position: absolute;

  width: 500px;
  height: 500px;

  border: 1px solid rgba(255,255,255,0.12);

  border-radius: 50%;

  right: -200px;
  top: -100px;
}


.brand-panel::after {
  content: "";

  position: absolute;

  width: 400px;
  height: 400px;

  border: 1px solid rgba(255,255,255,0.08);

  border-radius: 50%;

  left: -180px;
  bottom: -150px;
}


.brand-content {
  width: 560px;
  padding: 50px;
  position: relative;
  z-index: 2;
}


/* Logo */

.logo {
  width: 76px;
  height: 76px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;

  background: rgba(255,255,255,0.15);

  font-size: 42px;

  margin-bottom: 25px;

  box-shadow:
    0 10px 30px rgba(0,0,0,0.15);
}


.brand-content h1 {
  font-size: 46px;
  letter-spacing: 5px;
  margin: 0;
}


.english {
  margin-top: 8px;

  font-size: 13px;

  letter-spacing: 4px;

  opacity: 0.65;
}


.description {
  font-size: 20px;

  margin-top: 35px;

  color: #e4f1ff;
}


.line {
  width: 70px;
  height: 4px;

  background: #58b5ff;

  margin: 25px 0;
}


.slogan {
  font-size: 20px;

  line-height: 2;

  color: #dceeff;
}


/* 功能 */

.features {
  margin-top: 45px;
}


.feature {
  display: flex;

  align-items: center;

  gap: 18px;

  margin-bottom: 24px;
}


.feature > span {
  width: 48px;
  height: 48px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: rgba(255,255,255,0.12);

  font-size: 23px;
}


.feature strong {
  font-size: 16px;
}


.feature p {
  margin: 5px 0 0;

  font-size: 13px;

  color: #c9e2fb;
}


/* ==================== */
/* 右侧登录 */
/* ==================== */

.login-panel {
  width: 48%;

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f7f9fc;
}


.login-box {
  width: 450px;

  padding: 20px;
}


.mobile-logo {
  display: none;
}


.login-box h2 {
  margin: 0;

  font-size: 32px;

  color: #172b4d;
}


.welcome {
  margin-top: 10px;

  margin-bottom: 35px;

  color: #8492a6;

  font-size: 14px;
}


/* 输入框 */

.form-item {
  margin-bottom: 20px;
}


.form-item label {
  display: block;

  margin-bottom: 8px;

  font-size: 14px;

  color: #334e68;

  font-weight: 600;
}


.input-box {
  height: 52px;

  display: flex;

  align-items: center;

  padding: 0 15px;

  border: 1px solid #d9e2ec;

  border-radius: 10px;

  background: white;

  transition: 0.2s;
}


.input-box:focus-within {
  border-color: #1683ff;

  box-shadow:
    0 0 0 3px rgba(22,131,255,0.08);
}


.input-box span {
  margin-right: 12px;

  font-size: 18px;
}


.input-box input {
  width: 100%;

  height: 100%;

  border: none;

  outline: none;

  background: transparent;

  font-size: 15px;
}


/* 错误 */

.error {
  padding: 10px 12px;

  margin-bottom: 15px;

  border-radius: 8px;

  color: #d93025;

  background: #fff1f0;

  font-size: 13px;
}


/* 选项 */

.options {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin: 5px 0 22px;

  font-size: 13px;
}


.remember {
  color: #718096;

  display: flex;

  align-items: center;

  gap: 7px;
}


.remember input {
  accent-color: #1677ff;
}


.forgot {
  color: #1677ff;

  cursor: pointer;
}


/* 登录 */

.login-btn {
  width: 100%;

  height: 52px;

  border: none;

  border-radius: 10px;

  background:
    linear-gradient(
      90deg,
      #0969da,
      #1683ff
    );

  color: white;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(22,119,255,0.2);

  transition: 0.2s;
}


.login-btn:hover {
  transform: translateY(-1px);

  box-shadow:
    0 10px 25px rgba(22,119,255,0.3);
}


.login-btn:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}


/* 注册 */

.register {
  text-align: center;

  margin-top: 22px;

  color: #8a97a8;

  font-size: 14px;
}


.register span {
  color: #1677ff;

  cursor: pointer;

  font-weight: 600;
}


/* 演示账号 */

.demo {
  margin-top: 30px;

  padding: 16px;

  border-radius: 10px;

  background: #f0f6ff;

  color: #6b7c93;

  font-size: 13px;

  line-height: 1.8;
}


.demo-title {
  color: #31577f;

  font-weight: 600;
}


.demo button {
  margin-top: 7px;

  border: none;

  background: transparent;

  color: #1677ff;

  cursor: pointer;

  padding: 0;
}


/* ==================== */
/* 手机适配 */
/* ==================== */

@media (max-width: 900px) {

  .brand-panel {
    display: none;
  }

  .login-panel {
    width: 100%;
  }

  .login-box {
    width: 90%;
    max-width: 450px;
  }

  .mobile-logo {
    display: flex;

    width: 60px;
    height: 60px;

    border-radius: 15px;

    background: #eaf3ff;

    align-items: center;
    justify-content: center;

    font-size: 30px;

    margin-bottom: 25px;
  }

}

</style>