import Vue from 'vue'
import Vuex from 'vuex'
import {setStore} from './util/util'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: undefined,
        popup_login: false,
        popup_register: false
    },
    mutations: {
        login (state, payload) {//提交载荷payload
            state.userinfo = payload;
            setStore('userinfo', JSON.stringify(payload));
        },
        logout (state) {
            state.userinfo = undefined
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
