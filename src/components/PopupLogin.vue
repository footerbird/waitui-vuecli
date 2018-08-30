<template>
<div v-transfer-dom>
  <popup v-model="popup" class="weui-popup__container" height="100%">
      <div class="weui-popup__modal weui-popup__modal-cart">
          <div class="toolbar">
              <div class="toolbar-inner">
                  <h1 class="title" v-if="pwd_login">密码登录</h1>
                  <h1 class="title" v-else>短信登录</h1>
              </div>
          </div>
          <div class="modal-content">
              <div class="login-form">
                  <ul>
                      <li>
                          <div class="login-input-box">
                              <input type="tel" class="login-input" v-model="phone_num" placeholder="输入手机号" maxlength="11" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                      </li>
                      <li v-if="pwd_login">
                          <div class="login-input-box">
                              <input type="password" class="login-input" v-model="pwd_num" placeholder="输入密码" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                      </li>
                      <li v-else>
                          <div class="login-input-box">
                              <input type="tel" class="login-input" v-model="code_num" placeholder="输入验证码" maxlength="6" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                          <a href="javascript:;" class="login-input-link" :class="{'forbid':forbid_code_btn}" @click="sendCodeLogin">{{code_msg}}</a>
                      </li>
                  </ul>
                  
                  <div style="position: relative;">
                      <a href="javascript:;" class="login-forget-pwd">忘记密码？</a>
                      <a href="javascript:;" class="weui-btn weui-btn_login" :class="{'weui-btn_disabled':forbid_login_btn}" @click="funcLogin">登录</a>
                  </div>
                  <div class="login-link-box">
                      <a href="javascript:;" class="login-link" v-if="pwd_login" @click="switchLoginType">短信登录</a>
                      <a href="javascript:;" class="login-link" v-else @click="switchLoginType">密码登录</a>
                      <a href="javascript:;" class="login-link" @click="popupRegister">注册</a>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <a href="javascript:;" class="weui-btn weui-btn_white" @click="closePopupLogin">取消</a>
          </div>
      </div>
  </popup>
</div>
</template>

<script>
import Popup from 'vux/src/components/popup/index.vue'
import { Valid } from '@/util/util'

export default {
    components: {
        Popup
    },
    data () {
        return {
            pwd_login: true,//密码登录
            phone_num: '',//手机号
            code_num: '',//短信验证码
            code_msg: '获取验证码',
            pwd_num: '',//密码
            sending_code: false,//正在发送验证码
            sending_login: false//正在登录
        }
    },
    computed: {
        popup: {
            get () {
                return this.$store.state.popup_login
            },
            set (newValue) {
                this.$store.state.popup_login = newValue
            }
        },
        forbid_code_btn () {
            return !Valid.isMobile(this.phone_num) || this.sending_code
        },
        forbid_login_btn () {
            let that = this;
            if(that.pwd_login){//密码登录
                if(Valid.isMobile(that.phone_num) && that.pwd_num != "" && !that.sending_login){
                    return false;
                }else{
                    return true;
                }
            }else{//短信登录
                if(Valid.isMobile(that.phone_num) && Valid.isCode6(that.code_num) && !that.sending_login){
                    return false;
                }else{
                    return true;
                }
            }
        }
    },
    methods: {
        closePopupLogin () {//关闭登录框
            this.$store.commit("closePopupLogin");
        },
        popupRegister () {//弹出注册框
            let that = this;
            that.$store.commit("closePopupLogin");
            setTimeout(function(){
                that.$store.commit("popupRegister");
            },100)
        },
        switchLoginType () {//切换登录方式
            this.pwd_login = !this.pwd_login;
        },
        check_phoneRegister (regCall,unregCall) {//判断手机号是否注册
            let that = this;
            that.$http
            .post('/api/check_phoneRegisterAjax',that.$qs.stringify({
                phone: that.phone_num
            }))
            .then(({data}) => {
                if(data.state == "reg"){
                    regCall();
                }else{
                    unregCall();
                }
            })
        },
        sendCode (seconds) {
            let that = this,wait = seconds;
            if(that.forbid_code_btn) return;
            that.$http
            .post('/api/send_smsCodeAjax',that.$qs.stringify({
                phone: that.phone_num
            }))
            .then(({data}) => {
                if(data.state == "success"){
                    that.sending_code = true;
                    time();
                }else{
                    alert(data.msg);
                }
            })
            
            function time(){
                wait--;
                if(wait<0){
                    that.sending_code = false;
                    that.code_msg = "获取验证码";
                    return false;
                }
                that.code_msg = "发送成功("+wait+")";
                
                setTimeout(function(){
                    time();
                },1000);
            }
            
        },
        sendCodeLogin () {
            let that = this;
            that.check_phoneRegister(function(){
                that.sendCode(60);
            },function(){
                alert("手机号未注册");
            })
        },
        funcLogin () {
            let that = this;
            if(that.forbid_login_btn) return;
            that.sending_login = true;
            that.$http
            .post('/api/send_phoneLoginAjax',that.$qs.stringify({
                login_type: that.pwd_login?'pwd_login':'sms_login',
                phone_num: that.phone_num,
                pwd_num: that.pwd_num,
                code_num: that.code_num,
                ip_address: '115.236.66.147'
            }))
            .then(({data}) => {
                that.sending_login = false;
                if(data.state == "success"){
                    that.$store.commit("login",data.userinfo);
                    this.$store.commit("closePopupLogin");
                }else{
                    alert(data.msg);
                }
            })
        }
    }
}
</script>

<style lang="less" scoped="scoped">
@import '~@/assets/less/varible.less';
.weui-popup__container{
    background: transparent;
    .weui-popup__modal{
        &.weui-popup__modal-cart{
            .border-radius(8px);
        }
    }
}
</style>