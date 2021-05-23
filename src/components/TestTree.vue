<template>
  <div>
    <a-comment v-for="(item, index) in list" :key="index">
      <template slot="actions" style="textalign: left">
        <span key="comment-basic-like">
          <a-tooltip title="喜欢">
            <a-icon
              type="like"
              :theme="action === 'liked' ? 'filled' : 'outlined'"
              @click="like(item)"
            />
          </a-tooltip>
          <span style="padding-left: '8px'; cursor: 'auto'">
            {{ item.parise }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="不喜欢">
            <a-icon
              type="dislike"
              :theme="action === 'disliked' ? 'filled' : 'outlined'"
              @click="dislike"
            />
          </a-tooltip>
          <span style="padding-left: '8px'; cursor: 'auto'">
            {{ item.notParise }}
          </span>
        </span>
        <span key="comment-basic-reply-to" @click="show = index">回复</span>
      </template>
      <a slot="author">{{ item.username }}</a>
      <a-avatar slot="avatar" :src="item.image" :alt="item.image" />
      <p class="alignLeft" slot="content">
        {{ item.content }}
      </p>
      <a-tooltip slot="datetime" :title="item.createTime">
        <span>{{ item.createTime }}</span>
      </a-tooltip>
      <div v-show="index == show">
        <a-comment>
          <a-avatar
            slot="avatar"
            :src="$store.state.userInfo.image"
            :alt="$store.state.userInfo.username"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="3" :value="content" @change="handleChange" />
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit(item.id)"
              >
               回复他
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
      <TestTree
        class="tree"
        v-if="item.childList.length > 0"
        :list="item.childList"
      ></TestTree>
    </a-comment>
  </div>
</template>
<script>
export default {
  name: "TestTree",
  props: {
    list: {
      type: Array,
      default: [],
    },
    articleId:{
      type:String,
      default:""
    }
  },
  created() {},
  data() {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
      show: -1,
      content:"",
      comments: [],
      submitting: false,
    };
  },
  methods: {
    dislike(){},
    like(item) {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
      this.$get("/userArticle/updateParise", { id: item.id }).then((res) => {
        if (res.code == 200) {
          item.id++;
        }
      });
    },
    handleSubmit(val) {
      console.log(val);
      this.submitting = true;
      this.$post("/userArticle/addReply",{
        content:this.content,
        userId:this.$store.state.userInfo.id,
        username:this.$store.state.userInfo.username,
        parentId:val,
        image:this.$store.state.userInfo.image,
        articleId:this.$store.state.articleId
      }).then(res=>{
        if(res.code == 200){
          this.submitting = false;
          this.content = "";
          this.show = -1;
          this.$store.dispatch('getReplayList',1);
        }
      })
    },
    handleChange(e) {
      this.content = e.target.value;
    },
  },
};
</script>
<style scoped>
.ant-comment-content-detail p {
  margin-top: 1rem;
  text-align: left;
}
.ant-comment .ant-comment-content .ant-comment-actions,
ul {
  text-align: left;
}
/* .alignLeft{
    text-align: left;
} */
</style>
