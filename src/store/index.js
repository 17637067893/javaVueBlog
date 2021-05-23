import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '@/until/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    articleId: 0,
    replayList:[]
  },
  mutations: {
    //设置用户属性
    saveInfo(state, payload) {
      console.log(payload);
      state.userInfo = payload;
    },
    saveArticleId(state, payload) {
      state.articleId = payload;
    },
    saveReplayList(state,payload){
      console.log(2);
      state.replayList =payload;
    }
  },
  actions: {
    getReplayList(context, current) {
      get("/userArticle/getReplyList", {
        articleId: context.state.articleId,
        current: current,
      }).then((res) => {
        if (res.code == 200) {
          console.log(1);
          context.commit("saveReplayList",res.result.list);
        }
      });
    }
  },
  modules: {
  }
})
