<template>
  <section>
    <!-- 背景颜色 -->
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <!-- 背景圆 -->
      <div class="circle" style="--x: 0"></div>
      <div class="circle" style="--x: 1"></div>
      <div class="circle" style="--x: 2"></div>
      <div class="circle" style="--x: 3"></div>
      <div class="circle" style="--x: 4"></div>
      <!-- 登录框 -->
      <div class="container" v-if="status == 1">
        <a-tabs v-model="activeKey">
          <a-tab-pane style="{color:#FFF}}" key="1" tab="密码登录">
            <div class="form">
              <!-- <h2>登录</h2> -->
              <form>
                <div class="inputBox">
                  <input
                    type="text"
                    maxlength="10"
                    v-model="username"
                    autocomplete="“off”"
                    placeholder="姓名"
                  />
                </div>
                <div class="inputBox">
                  <input
                    type="password"
                    autocomplete="“off”"
                    maxlength="20"
                    v-model="password"
                    placeholder="密码"
                  />
                </div>
                <div class="inputBox">
                  <input
                    type="button"
                    autocomplete="“off”"
                    @click="toLogin(1)"
                    value="登录"
                  />
                </div>
                <div class="booterBox">
                  <p class="forget" @click="toWxLogin">微信登录<a href="#"> </a></p>
                  <p class="forget" @click="register"><a href="#">注册</a></p>
                  <p class="forget" @click="retrievePassword">
                    <a href="#">找回密码</a>
                  </p>
                </div>
              </form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手机号登录" force-render>
            <div class="form">
              <form>
                <div class="phoneBox">
                  <input
                    class="phone"
                    type="number"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                    maxlength="11"
                    autocomplete="“off”"
                    placeholder="手机号"
                    v-model="phone"
                  />
                  <button
                    @click="getCode"
                    type="button"
                    :disabled="codeOnOff"
                    class="sendCode"
                  >
                    发送<span v-if="codeOnOff">( {{ codeTime }})</span>
                  </button>
                </div>

                <div class="inputBox">
                  <input
                    type="password"
                    autocomplete="“off”"
                    maxlength="20"
                    v-model="code"
                    placeholder="验证码"
                  />
                </div>
                <div class="inputBox">
                  <input
                    type="button"
                    @click="toLogin(2)"
                    autocomplete="“off”"
                    value="登录"
                  />
                </div>
                <div class="booterBox">
                  <p class="forget"  @click="toWxLogin">微信登录<a href="#"> </a></p>

                  <p class="forget" @click="register"><a href="#"> 注册 </a></p>
                  <p class="forget" @click="retrievePassword">
                    <a href="#"> 找回密码 </a>
                  </p>
                </div>
              </form>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="container" v-if="status == 2">
        <div class="form">
          <h2>注册用户</h2>
          <form>
            <div class="inputBox">
              <input
                type="text"
                maxlength="10"
                v-model="username"
                autocomplete="off"
                placeholder="姓名"
              />
            </div>
            <div class="inputBox">
              <input
                type="password"
                maxlength="20"
                v-model="password"
                autocomplete="off"
                placeholder="密码"
              />
            </div>
            <div class="phoneBox">
              <input
                class="phone"
                type="number"
                autocomplete="off"
                oninput="if(value.length>11)value=value.slice(0,11)"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                @click="getCode"
                type="button"
                :disabled="codeOnOff"
                class="sendCode"
              >
                发送<span v-if="codeOnOff">( {{ codeTime }})</span>
              </button>
            </div>
            <div class="inputBox">
              <input
                type="text"
                autocomplete="off"
                maxlength="4"
                v-model="code"
                placeholder="验证码"
              />
            </div>
            <div class="inputBox">
              <div @click="toRegister">
                <input type="button" value="注册" />
              </div>
            </div>
            <div class="booterBox">
              <p class="forget" @click="login">登录<a href="#"> </a></p>
              <p class="forget" @click="retrievePassword">
                <a href="#"> 找回密码 </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div class="container" v-if="status == 3">
        <div class="form">
          <h2>忘记密码</h2>
          <form>
            <div class="inputBox">
              <input type="text" autocomplete="off" placeholder="姓名" />
            </div>
            <div class="inputBox">
              <input type="password" autocomplete="off" placeholder="密码" />
            </div>
            <div class="phoneBox">
              <input
                class="phone"
                type="number"
                oninput="if(value.length>11)value=value.slice(0,11)"
                maxlength="11"
                autocomplete="“off”"
                placeholder="手机号"
              />
              <button class="sendCode">发送</button>
            </div>
            <div class="inputBox">
              <input type="button" value="确认" />
            </div>
            <div class="booterBox">
              <p class="forget" @click="login">登录<a href="#"> </a></p>
              <p class="forget" @click="register">注册</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let that = null;
import tool from "../until/tools";
export default {
  data() {
    return {
      timer: null,
      status: 1, //用户状态 1登录 2 注册 3 忘记密码
      activeKey: "1",
      username: "",
      password: "",
      phone: "",
      codeOnOff: false, //验证码按钮
      codeTime: 5,
      code: "",
    };
  },
  created() {
    that=this;
    this.status = 1;
    this.activeKey = "1";
    this.codeOnOff = false;
    this.password = "";
    this.code = "";
  },
  mounted() {},
  methods: {
    register() {
      console.log("注册");
      (this.status = 2), (this.activeKey = "1");
    },
    login() {
      (this.status = 1), (this.activeKey = "1");
      console.log("====================================");
      console.log(this.username, this.password);
      console.log("====================================");
    },
    toLogin(val) {
      console.log(val);
      if (this.status == 1 && this.activeKey == "1") {
        if (this.username == "") {
          that.$message.warning("用户名不能为空");
          return;
        }
        if (!tool.validatePsdReg || this.password == "") {
         that.message.warning(
            "请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"
          );
          return;
        }
        this.$post("/api/login", {
          username: that.username,
          password: that.password,
          type:val
        }).then((res) => {
          console.log(res);
          if (res.code == 500) {
            message.warning(res.msg);
          }
          if (res.code == 200) {
            tool.setCookie("token", res.info.token);
            that.$store.commit('saveInfo',res.info);
            that.$router.push({path:"/home"})
          }
        });
      } else if (this.status == 1 && this.activeKey == "2") {
        if (!tool.validatePhoneTwo(this.phone) || this.phone == "") {
          that.message.warning("请输入正确手机号");
          return;
        }
        this.$post("/api/login", {
          code: that.code,
          phone: that.phone,
        }).then((res) => {
          console.log(res);
          if (res.code == 444) {
            that.message.warning(res.msg);
          }
          if (res.code == 200) {
            tool.setCookie("token", res.info.token);
            that.$store.commit('saveInfo',res.info);
            that.$router.push({path:"/home"})
          }
        });
      }
    },
    retrievePassword() {
      this.status = 3;
    },
    //获取验证码
    getCode() {
      if (!tool.validatePhoneTwo(this.phone) || this.phone == "") {
        that.$message.warning("请输入正确手机号");
        return;
      } else {
        this.$get("/thiredparty/getCode", { phone: this.phone }).then((res) => {
          if (res.code == 410) {
            that.$message.warn(res.msg);
            return;
          } else {
            // this.code = res.code;
            this.codeOnOff = true;
            this.timer = setInterval(() => {
              this.codeTime--;
              if (this.codeTime == 1) {
                this.codeOnOff = false;
                this.codeTime = 5;
                // clearInterval(this.timer);
              }
            }, 1000);
          }
        });
      }
    },
    toRegister() {
      if (!tool.validatePhoneTwo(this.phone) || this.phone == "") {
         that.$message.warning("请输入正确手机号");
        return;
      }
      if (this.username == "") {
         that.$message.warning("用户名不能为空");
        return;
      }
      if (!tool.validatePsdReg || this.password == "") {
         that.$message.warning(
          "请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"
        );
        return;
      }
      if (this.code == "") {
         that.$message.warning("请输入验证码");
        return;
      }
      console.log("====================================");
      console.log(this.username, this.password, this.phone, this.code);
      console.log("====================================");
      this.$post("/api/register", {
        username: this.username,
        password: this.password,
        phone: this.phone,
        code: this.code,
      }).then((res) => {
        if (res.code == 0) {
           that.$message.success("注册成功");
          this.activeKey = "1";
          this.status = 1;
          this.username = "";
          this.password = "";
          this.phone = "";
          this.code = "";
          clearInterval(this.timer);
        } else {
          message.error(res.msg);
        }
      });
    },
    //微信扫码登录
    toWxLogin(){
      this.$get("/api/wxLogin").then(res=>{
        window.location.href=res;
      })
    }
  },
  beforeUnmoun() {
    //清除定时器
    clearInterval(this.timer);
  },
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 使用flex布局，让内容垂直和水平居中 */

section {
  /* 相对定位 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片 */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

/* 背景颜色 */

section .color {
  /* 绝对定位 */
  position: absolute;
  /* 使用filter(滤镜) 属性，给图像设置高斯模糊*/
  filter: blur(200px);
}

/* :nth-child(n) 选择器匹配父元素中的第 n 个子元素 */

section .color:nth-child(1) {
  top: -350px;
  width: 600px;
  height: 600px;
  background: #0055ff;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #55ffff;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 500px;
  background: #00d2ff;
}

.box {
  position: relative;
}

/* 背景圆样式 */

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  /* 使用filter(滤镜) 属性，改变颜色。
		    hue-rotate(deg)  给图像应用色相旋转 
		    calc() 函数用于动态计算长度值 
		    var() 函数调用自定义的CSS属性值x*/
  filter: hue-rotate(calc(var(--x) * 70deg));
  /* 调用动画animate，需要10s完成动画，
		    linear表示动画从头到尾的速度是相同的，
		    infinite指定动画应该循环播放无限次*/
  animation: animate 10s linear infinite;
  /* 动态计算动画延迟几秒播放 */
  animation-delay: calc(var(--x) * -1s);
}

/* 背景圆动画 */

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  // z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  // z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

/* 登录框样式 */

.container {
  position: relative;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
}

/* 登录标题样式 */

.form h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}
.ant-tabs-nav-scroll .ant-tabs-nav .ant-tabs-tab::before {
  color: #fff;
}
/* 登录标题的下划线样式 */

.form h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: #fff;
  transition: 0.5s;
}

.form h2:hover:before {
  width: 53px;
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
}

/* 输入框样式 */

.form .inputBox input {
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.form .phoneBox input {
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form .inputBox input::placeholder {
  color: #fff;
}
.form .phoneBox input::placeholder {
  color: #fff;
}

/* 登录按钮样式 */

.form .inputBox input[type="button"] {
  background: #fff;
  color: #666;
  max-width: 100px;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
}

.forget {
  margin-top: 6px;
  color: #fff;
  letter-spacing: 1px;
}

.forget a {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.booterBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.phoneBox {
  display: flex;
  margin-top: 20px;
  .sendCode {
    height: 3rem;
    width: 7rem;
    // background: #fff;
    color: #fff;
    max-width: 100px;
    font-weight: 600;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    outline: none;
    border-radius: 0 30px 30px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
}
.form .phoneBox .phone {
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: none;
  border-radius: 30px 0 0 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
.ant-message .ant-message-notice-content {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
</style>
