<template>
    <div class="add-product">
        <mt-header fixed title="添加商品">
            <router-link to="/self-manage" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <mt-field label="标题" placeholder="最多可输入48个字符" v-model="product.name" :attr="{ maxlength: 48 }"></mt-field>
            <mt-field  placeholder="简单描述一下您的商品/服务，字数限制60字符" type="textarea" v-model="product.content" rows="5" :attr="{ maxlength: 60 }" ></mt-field>
            <div  class="imglist">
                <div class="imgitem"  v-for="(itemImg,index) in imgSrc" v-if="imgSrc.length>0" :key="index">
                    <img :src="itemImg.url" alt="" class="imgurl">
                    <div  class="imgtitle">{{itemImg.title}}</div>
                </div>
                <div class="imgitem"  @click="addProductImg">
                    <img src="../../images/product/cerma.png" alt="" class="img" >
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="openPopup" ref="button"  @click="popupVisible1 = true" >图片上传规则 <span class="subtitle">(至少上传4张)</span></div>
            <mt-field label="价格：" type="number" v-model="product.price"></mt-field>
            <mt-field label="库存：" type="number" v-model="product.quantity"></mt-field>
            <mt-cell title="分类" :value=" categValue ?  categValue : '选择商品类目' " isLink @click.native="categoriePopup = true"></mt-cell>
        </div>

        <mt-popup  v-model="categoriePopup" position="right" class="categoriePopup"  :modal="false">
            <mt-button @click.native="closeCategoriePopup" size="large" type="primary">返回</mt-button>
            <mt-radio title="只可选择一个" v-model="categValue" :options="categoriesList"  @change="changeValue">
            </mt-radio>
        </mt-popup>
        <div class="addbtn">
            <mt-button size="large" type="primary"  @click.native="getCreateProduct" :disabled="imgSrc.length < 4">确认添加</mt-button>
        </div>

        <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="rule-popup" :style="{ top: buttonBottom + 40 + 'px' }">
            <div  class="title">
                 <img src="../../images/product/light.png" alt="" height="28px" >
                 <span  class="subtitle">温馨小提示：竖向拍照商品图片效果会更好哦~</span>
            </div>
             <ul  class="list">
                 <li >1、至少上传4张图片。</li>
                 <li >2、默认首图为【主图】，其次是【正面图】【侧面图】，第4-8张图默认为详情图。</li>
                 <li >3、图片尺寸大小为1242*1242px。</li>
             </ul>
        </mt-popup>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
  export default {
    data () {
      return  {
        popupVisible1: false,
        categoriePopup: false,
        categoriesList:[],
        categories: [],
        buttonBottom: 0,
        imgSrc: [],
        categValue: '',
        categValueId: '',
        product:{
            price: '',
            name: '',
            content: '',
            quantity: null
        },
        num: 0,
        imgTitle: ["主图","正面","背面","详情图","详情图","详情图","详情图","详情图"]
      }
    },
    mounted() {
        this.$navigation.cleanRoutes()
        this.buttonBottom = this.$refs.button.offsetTop;
        this.getCategories()
    },
    methods: {
      addProductImg () {
          let self = this;
          if(self.num > self.imgTitle.length-1){
              navigator.notification.alert("超出上传数量了！", null, "提醒:");
          } else {
              navigator.camera.getPicture(function (imageURI) {
                  onLoadImageUploadSuccess(imageURI)
              }, onFail, {
                  quality: 50,
                  destinationType: Camera.DestinationType.FILE_URI,
                  targetWidth: 1242,
                  targetHeight: 1242
              });
          }
          function onLoadImageUploadSuccess(imageURI) {
              //此处执行文件上传的操作，上传成功后执行下面代码
              let options = new FileUploadOptions(); //文件参数选项
              options.fileKey = "file";//向服务端传递的file参数的parameter name
              options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);//文件名
              options.mimeType = "image/jpeg";//文件格式，默认为image/jpeg
              let ft = new FileTransfer();//文件上传类
              ft.onprogress = function (progressEvt) {//显示上传进度条
                  if (progressEvt.lengthComputable) {
                      navigator.notification.progressValue(Math.round(( progressEvt.loaded / progressEvt.total ) * 100));
                  }
              }
              navigator.notification.progressStart("提醒", "当前上传进度");
              ft.upload(imageURI, encodeURI('http://test.mihutime.com/employee/v2/files'), function (r) {
                  let resObject = {};
                  resObject = JSON.parse(r.response);
                  self.imgSrc.push({id: resObject.id, url:resObject.url, title: self.imgTitle[self.num]})
                  navigator.notification.progressStop();//停止进度条
                  navigator.notification.alert("文件上传成功！", null, "提醒");
                  self.num ++;
              }, function (error) {
                  navigator.notification.alert(error.source, null, "提醒");
              }, options)
          }

          function onFail(message) {
             console.log('Failed because: ' + message);
          }
      },
      closeCategoriePopup () {
        this.categoriePopup = false
      },
      removeImage (index) {
         this.imgSrc.splice(index, 1)
      },
      changeValue (value) {
         for(let i =0 ;i< this.categorie.length;i++){
             if(value === this.categorie[i].name){
                this.categValueId = this.categorie[i].id
             }
         }
          this.categoriePopup = false
      },
      getCreateProduct() {
          this.$http({
              url:'/products',method: 'post',
              data: {
                  name: this.product.name,
                  quantity: this.product.quantity,
                  content: this.product.content,
                  price:this.product.price,
                  newImages: this.imgSrc.slice(0,3),
                  contentImages: this.imgSrc.slice(3,this.imgSrc.length),
                  categoryId: this.categValueId,
              }
          }).then( res=> {
              navigator.notification.alert('上传成功', null, "提醒");
              this.$router.push('/self-manage')
          }, error => {
              navigator.notification.alert(error.response.data.message, null, "提醒");
          })
      },
      getCategories () {
        this.$http.get('/categories').then( res => {
            let data = res.data
            let list = [];
            for(let i =0 ;i<data.length;i++){
                list.push(data[i].name)
            }
            this.categoriesList = list
            this.categorie = res.data
         })
      }
    }

  }
</script>
<style>
.add-product{
    padding-bottom: 50px;
}
.add-product{
    padding-top: 50px;
    background-color: #f9f9f9;
}
.add-product .content{
    margin-top: 10px;
}
.add-product .content .imglist {
    background-color: #fff;
    padding: 0 10px;
}
.add-product .content .imgitem{
    width: 80px;
    height: 80px;
    background-color: #f3f5f9;
    text-align: center;
    float: left;
    margin: 2px;
    position: relative;
}
.add-product .content .imgitem .imgurl{
    width: 100%;
    height:100%;
    overflow: hidden;
}
.add-product .imgitem .img{
    vertical-align: middle;
    height: 25px;
    line-height: 25px;
    position: relative;
    top: 27px
}
.add-product .imgitem .imgtitle {
    position: absolute;
    width: 100%;
    height: 20px;
    background-color: #4272c2;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: 11px
}
.add-product .imgitem .close{
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    padding: 2px;
    z-index: 4
}
.add-product .imgitem .close .icon {
    width: 100%;
    height: 100%;
    background-color: #508cee;
    border-radius: 50%;
    color: #2750f1
}
.add-product .content .openPopup {
    text-align: right;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 11px;
    color: #508cee
}
.add-product .content .openPopup .subtitle{
    color: #ccc
}
.add-product .addbtn {
    padding: 0 15px;
    margin-top: 45px
}
.add-product .addbtn .button{
    background-color: #508cee;
}
.add-product .rule-popup{
    width: 80%;
    border-radius: 8px;
    padding: 0 15px;
    transform: translate(-50%, 0);
}
.add-product .rule-popup:before {
    content: '';
    width: 0;
    height:0;
    display: inline-block;
    position: absolute;
    top: -20px;
    right: 50px;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
}
.add-product .rule-popup .title{
    font-size: 12px;
    color: #666666;
    display: flex;
    padding-top: 5px;
}
.add-product .rule-popup .title img{
    vertical-align: top;
}
.add-product .rule-popup .subtitle {
    height: 28px;
    line-height: 28px;
    display: inline-block;
    margin-left: 5px;
    align-items: center
}
.add-product .rule-popup .list{
    font-size: 12px;
    color: #666666;
    list-style: none;
    margin: 0
}
.add-product .rule-popup .list li{
    margin: 10px 0
}
.categoriePopup{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.categoriePopup .mint-button{
    background-color: #508cee;
    color: #fff;
    height:50px;
}
</style>
