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
@import '../assets/less/varible.less';
.weui-popup__container{
    background: transparent;
    .weui-popup__modal{
        &.weui-popup__modal-cart{
            .border-radius(8px);
        }
    }
}
</style>