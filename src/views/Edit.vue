<template>
  <div style="position: relative">
        <div class="add" @click="addTitle">
          <a-button
            class="addBtn"
            type="primary"
            shape="circle"
            icon="plus"
            size="large"
          />
        </div>
    <a-row>
      <a-col :span="4">
        <a-list item-layout="horizontal" :data-source="titeList">
          <a-list-item slot="renderItem" :key="item.id" slot-scope="item">
            <a-list-item-meta  @click="selectTitle(item)" description="">
              <span
                @dblclick="editTitle(item)"
                style="fontsize: 20px; textalign: left"
                v-if="!item.edit"
                slot="title"
                :class="{blue:item.id == articleId}"
                >{{ item.title }}</span
              >
              <a-input-search
                type="txt"
                slot="title"
                v-if="item.edit"
                :maxLength="10"
                :disabled="!item.edit"
                v-model="item.title"
                @search="saveTitle(item)"
              >
                <a-button slot="enterButton"> 保存 </a-button>
              </a-input-search>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span="20">
        <div class="btn">
          <a-button @click="save(0)" type="primary"> 保存 </a-button>
          <a-button @click="save(1)" type="primary"> 发布 </a-button>
          <a-button @click="deleteArticle" type="danger"> 删除 </a-button>
        </div>
        <mavon-editor
          v-model="content"
          ref="md"
          @imgAdd="$imgAdd"
          @change="change"
          :fullscreen="true"
          style="height: 100vh; width: 100%"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
let that = null;
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { postFile } from "../until/http";
export default {
  data() {
    return {
      titeList: [{ title: "标题", edit: true,id:1,html:"", content: "" }],
      content: "",
      html:"",
      onOff: false,
      articleId:0,
      article:{}
    };
  },
  components: {
    mavonEditor,
  },
  created() {
    that = this;
    this.getArticleList(this.$store.state.userInfo.id,"created");
  },
  mounted() {
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      postFile("/javaservice/thiredparty/uploadFile", $file).then((res) => {
        if (res.status == 200) {
          this.$refs.md.$img2Url(pos, res.data.url);
        } else {
          this.$message.warning("图上添加失败");
        }
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      console.log("content",this.content);
      console.log("html",render);
      console.log("编辑");
      this.html = render;
      this.titeList.forEach((item)=>{
        if(item.id == that.articleId){
          item.content = this.content;
          item.html = render;
        }
      })
      console.log(this.titeList);
    },
    getArticleList(userId,type){
      this.$get("/article/getArticleList",{userId}).then(res=>{
        if(res.code == 200){
          let list = res.list.map((item)=>{
            item.edit=false;
            return item;
          })
          console.log(list);
          if(type == "created"){
             this.articleId = list[0].id;
            this.content = list[0].content;
            this.html = list[0].html;
          }
          this.titeList =list
        }
      })
    },
    deleteArticle(){
       this.$get("/article/deletedById",{id:this.articleId}).then(res=>{
        if(res.code == 200){
          this.$message.success("删除成功");
          document.getElementsByClassName("ant-message")[0].style.zIndex=1500
          that.getArticleList(this.$store.state.userInfo.id);
        }
      })
    },
    save(val) {
      let article = {};
      console.log(this.$store.state);
      article.userId = this.$store.state.userInfo.id;
      article.status = val;
      that.titeList.forEach((item)=>{
        if(item.id == that.articleId){
            if(item.id < 100){
             Object.assign(article,item)
             delete  article.id
            }else{
              Object.assign(article,item)
              delete  article.edit
            }
        }
      })
      console.log(article);
      if(!article.userId){
       this.$message.error("请先登录");
       document.getElementsByClassName("ant-message")[0].style.zIndex=1500
       return;
      }
      this.$post("/article/saveArticle",article).then(res=>{
        console.log(res);
        if(res.code == 200){
          this.$message.success("提交成功，已打印至控制台！");
          document.getElementsByClassName("ant-message")[0].style.zIndex=1500
          that.articleId = "";
          that.content = "";
          that.html = "";
          that.getArticleList(that.$store.state.userInfo.id);
        }
      })
    },
    saveTitle(item) {
      item.edit =!item.edit;
    },
    selectTitle(item){
      console.log(item);
      // this.article.title = item.title
      // this.article.content = item.content
      // this.article.html = this.html
      this.articleId = item.id;
      this.content = item.content;
      this.html = item.html;

    },
    editTitle(item) {
      item.edit = true;
      console.log(item.edit);
    },
    addTitle() {
      let obj = {};
      obj.title = "标题" + (this.titeList.length + 1);
      obj.edit = true;
      obj.id = this.titeList.length + 1;
      obj.content = "";
      this.articleId = this.titeList.length + 1;
      this.titeList.push(obj);
      console.log(this.titeList);
    },
  },
};
</script>

<style scoped lang="less">
.add {
  position: absolute;
  left: 1vw;
  bottom: 1vw;
  z-index: 1550;
}
.addBtn:hover {
  background-color: #e06d37d3;
}
.btn {
  position: absolute;
  width: 14vw;
  display: flex;
  justify-content: space-between;
  right: 1vw;
  bottom: 1vw;
  z-index: 1501;
}
.titleBox {
  background-color: white;
  border: none;
  font-size: 20px;
}
.ant-list-item-meta .ant-list-item-meta-content {
  height: 2rem;
}
.blue{
  color: #40a9ff;
}
</style>
