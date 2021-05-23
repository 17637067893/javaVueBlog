<template>
  <div>
    <main>
      <section class="glass">
        <div class="games">
          <div class="status">
            <a-input-search
              class="searchInput"
              v-model="value"
              placeholder="请输入关键字"
              enter-button="Search"
              size="large"
              @search="onSearch"
            />
          </div>
          <div class="cards">
            <div v-for="item in articleList" :key="item.id" class="card" @click="toInfo(item)">
              <h2> 
                <span class="red" v-if="item.userId == $store.state.userInfo.id" ><a-icon type="reddit" /></span>
                {{item.title}}</h2>
              <div class="card-info">
                <p v-html="item.html"></p>
              </div>
              <ul class="ulList">
                <li>点赞( {{item.praise}} )</li>
                <li>收藏( {{item.collection}} )</li>
                <li>评论( {{item.comments}} )</li>
              </ul>
            </div>
            
          </div>
          <a-pagination v-model="current" :pageSize="pageSize" @change="changePage" :total="total" show-less-items />
        </div>
      </section>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="userInfo">
      <img v-if="!errorImage" src="../../public/img/errorImage.png" alt="">
      <img v-if="errorImage"  @error="errorImage = false" :src="$store.state.userInfo.image" alt="头像" />
      <div class="nameBox">{{ $store.state.userInfo.username }}</div>
      <a-button @click="goEdit" size="large" type="primary"> 写文章 </a-button>
    </div>
  </div>
</template>

<script>
import tool from "../until/tools";
export default {
  name: "home",
  components: {
    // Content
  },
  data() {
    return {
      errorImage:true,
      value: "",
      articleList:[],
      current:0,
      pageSize:10,
      total:0
    };
  },
  created() {
    let url = window.location.href;
    let obj = tool.getUrlParam(url);
    if (obj.token) {
      this.getTokenbyId(obj.userId);
    }
    this.getArticleList();
  },
  mounted() {},
  methods: {
    changePage(val){
      console.log(val);
    },
    toInfo(item){
      this.$router.push({
        path:"/articleInfo",
        query:{id:item.id}
      })
    },
    getTokenbyId(val) {
      this.$get("/api/getTokenbyId", { id: val }).then((res) => {
        if (res.code == 200) {
          this.$store.commit("saveInfo", res.userInfo);
          tool.setCookie("token", res.token);
        }
      });
    },
    onSearch() {},
    goEdit() {
      this.$router.push({ path: "/edit" });
    },
     getArticleList(){
      this.$get("/article/getArticlePage",{current:this.current,pageSize:this.pageSize}).then(res=>{
         this.articleList = res.records;
          this.total = res.total;
          this.current = res.current;
          this.pageSize = res.size;
      })
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
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 2rem;
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;
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
.dashboard {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 2rem;
}
.games {
  flex: 2;
}

.pro {
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
  border-radius: 2rem;
  color: white;
  padding: 1rem;
  position: relative;
}

.pro img {
  position: absolute;
  top: -10%;
  right: 10%;
}
.pro h2 {
  width: 40%;
  color: white;
  font-weight: 600;
}

/* GAMES */
.status {
  margin-bottom: 3rem;
}

.status input {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border: none;
  width: 50%;
  padding: 0.5rem;
  border-radius: 2rem;
}

.games {
  margin: 2rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.5)
  );
  h2{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  border-radius: 1rem;
  margin: 1rem 0rem;
  padding: 1rem;
  box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
  justify-content: space-between;
  .ulList {
    display: flex;
    list-style: none;
    justify-content: space-around;
    width: 100%;
    color: gray;
  }
}
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin-top: 0;
    margin-bottom: 1em;
    max-height: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    color: #000;
    font-size: 16px;
    font-weight:400;
  }
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
.nameBox {
  margin: 1vh 0 1vh 0;
}
.red{
  color: red;
}
</style>
