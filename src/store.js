import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: undefined,
        popup_login: false,
        popup_register: false
    },
    mutations: {
        login (state, payload) {//提交载荷payload
            state.user = payload
        },
        logout (state) {
            state.user = undefined
        },
        popupLogin (state) {
            state.popup_login = true
        },
        closePopupLogin (state) {
            state.popup_login = false
        },
        popupRegister (state) {
            state.popup_register = true
        },
        closePopupRegister (state) {
            state.popup_register = false
        }
    },
    actions: {
        login (context, payload) {
            context.commit('login', payload)
        },
        logout (context) {
            context.commit('logout')
        }
    }
})
