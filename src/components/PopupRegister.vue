<template>
<div v-transfer-dom>
  <popup v-model="popup" class="weui-popup__container" height="100%">
      <div class="weui-popup__modal weui-popup__modal-cart">
          <div class="toolbar">
              <div class="toolbar-inner">
                  <h1 class="title">新用户注册</h1>
              </div>
          </div>
          <div class="modal-content">
              <div class="login-form">
                  <ul>
                      <li>
                          <div class="login-input-box">
                              <input type="tel" class="login-input" placeholder="输入手机号" maxlength="11" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                      </li>
                      <li>
                          <div class="login-input-box">
                              <input type="tel" class="login-input" placeholder="输入验证码" maxlength="6" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                          <a href="javascript:;" class="login-input-link">获取验证码</a>
                      </li>
                      <li>
                          <div class="login-input-box">
                              <input type="password" class="login-input" placeholder="设置密码" required="required" />
                              <a href="javascript:;" class="weui-icon-clear"></a>
                          </div>
                      </li>
                  </ul>
                  
                  <a href="javascript:;" class="weui-btn weui-btn_login">注册</a>
              </div>
          </div>
          <div class="modal-footer">
              <a href="javascript:;" class="weui-btn weui-btn_white" @click="closePopupRegister">取消</a>
          </div>
      </div>
  </popup>
</div>
</template>

<script>
import Popup from 'vux/src/components/popup/index.vue'

export default {
    components: {
        Popup
    },
    computed: {
        popup: {
            get () {
                return this.$store.state.popup_register
            },
            set (newValue) {
                this.$store.state.popup_register = newValue
            }
        }
    },
    methods: {
        closePopupRegister () {
            this.$store.commit("closePopupRegister");
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