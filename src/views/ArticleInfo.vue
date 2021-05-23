
<template>
  <div>
    <main>
      <section class="glass">
        <div class="container">
          <h2 class="title">{{ articleInfo.title }}</h2>
          <div class="content" v-html="articleInfo.html"></div>
          <div class="booterBox">
            <div @click="praise" :class="{ red: articleInfo.praiseStatus }">
              点赞( {{ articleInfo.praise }} )
            </div>
            <div
              @click="collection"
              :class="{ red: articleInfo.collectionStatus }"
            >
              收藏( {{ articleInfo.collection }} )
            </div>
            <div>评论( {{ articleInfo.comments }} )</div>
          </div>
          <div class="submitBox">
            <a-comment>
              <a-avatar
                class="submitreplay"
                slot="avatar"
                :src="$store.state.userInfo.image"
                alt="$store.state.userInfo.username"
              />
              <div slot="content">
                <a-form-item>
                  <a-textarea :rows="4" :value="content" @change="handleChange" />
                </a-form-item>
                <a-form-item>
                  <a-button
                    html-type="submit"
                    :loading="submitting"
                    type="primary"
                    @click="handleSubmit"
                  >
                    发表
                  </a-button>
                </a-form-item>
              </div>
            </a-comment>
          </div>
          <div class="replayBox">
            <TestTree :list="$store.state.replayList" :articleId="articleInfo.id"></TestTree>
          </div>
        </div>
      </section>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="userInfo" @mouseenter="showOnOff(true)"  @mouseleave="showOnOff(false)">
      <img v-if="!errorImage" src="../../public/img/errorImage.png" alt="" />
      <img
        v-if="errorImage"
        @error="errorImage = false"
        :src="$store.state.userInfo.image"
        alt="头像"
      />
      <div class="nameBox">{{ $store.state.userInfo.username }}</div>
      <div class="cartList" :style="[{display:(showCart?'flex':'none')}]">
        <a-button @click="goEdit" size="large" type="primary"> 写文章 </a-button>
        <a-button size="large" type="primary"> 退出 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import TestTree from "@/components/TestTree";
export default {
  components: {
    TestTree,
  },
  data() {
    return {
      articleInfo: {},
      errorImage: true,
      current: 1,
      replayList: [],
      content:"",
      submitting:false,
      showCart:false
    };
  },
  created() {
    this.getArticleList();
    this.getReplayList();
  },
  mounted() {},
  methods: {
    showOnOff(val){
      console.log(val);
      this.showCart = val;
    },
    getReplayList() {
      this.$store.dispatch('getReplayList',1);
    },
    goEdit() {
      this.$router.push({ path: "/edit" });
    },
    getArticleList() {
      this.$get("/article/getById", {
        articleId: this.$route.query.id,
        userId: this.$store.state.userInfo.id,
      }).then((res) => {
        if (res.code === 200) {
          this.articleInfo = res.article;
          this.$store.commit("saveArticleId",res.article.id);
        }
      });
    },
    collection() {
      this.$post("/userArticle/collection", {
        userId: this.$store.state.userInfo.id,
        username: this.$store.state.userInfo.username,
        articleId: this.articleInfo.id,
        articleTitle: this.articleInfo.title,
      }).then((res) => {
        if (res.code == 200) {
          this.getArticleList();
        }
      });
    },
    praise() {
      this.$post("/userArticle/praise", {
        userId: this.$store.state.userInfo.id,
        articleId: this.articleInfo.id,
      }).then((res) => {
        if (res.code == 200) {
          this.getArticleList();
        }
      });
    },

     handleSubmit() {
       console.log(this.content,this.articleInfo.articleId);
      if (!this.content) {
        return;
      }
      this.submitting = true;
      this.$post("/userArticle/addReply",{
        content:this.content,
        userId:this.$store.state.userInfo.id,
        username:this.$store.state.userInfo.username,
        image:this.$store.state.userInfo.image,
        articleId:this.articleInfo.id
      }).then((res)=>{
        if(res.code == 200){
          this.submitting = false
          this.content = "";
          this.getReplayList();
        }else{
          this.$message.error("评论失败")
        }
      })
    },
    handleChange(e) {
      this.content = e.target.value;
    },
  },
};
</script>

<style scoped lang="less">
main {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  background: linear-gradient(to right top, #0080ff, #2eccfa);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.glass {
  background: white;
  min-height: 80vh;
  width: 80%;
  //   background: linear-gradient(
  //     to right bottom,
  //     rgba(255, 255, 255, 0.7),
  //     rgba(255, 255, 255, 0.3)
  //   );
  border-radius: 2rem;
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;
  margin: 5rem 0;
}
.circle1,
.circle2 {
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.3)
  );
  height: 20rem;
  width: 20rem;
  position: absolute;
  border-radius: 50%;
}

.circle1 {
  top: 10%;
  right: 2%;
}
.circle2 {
  bottom: 10%;
  left: 2%;
}

.userInfo {
  position: absolute;
  top: 2rem;
  right: 2rem;
  text-align: center;
  img {
    height: 5rem;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  div {
    font-size: 1rem;
    overflow: hidden;
    max-width: 6rem;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.container {
  width: 100%;
  .content {
    text-align: left;
    min-height: 63vh;
    padding: 2rem;
    word-break: break-word;
    border-radius: 2rem;
  }
  .booterBox {
    // background: red;
    margin: 2rem 20vw;
    display: flex;
    justify-content: space-around;
    color: gray;
  }
}
.title {
  width: 100%;
  text-align: center;
  margin: 2rem 0;
  font-weight: 500;
}
.red {
  color: palevioletred;
}
.replayBox {
  border-top: 1px solid gray;
  padding: 3rem;
}
.submitBox{
  padding: 3rem;
}
.cartList{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 12vh;
}
</style>
