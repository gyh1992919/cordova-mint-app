<template>
    <!-- App -->
    <div class="updatestore">
        <mt-header title="修改店铺信息" fixed>
            <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
        </mt-header>
        <div class="avata-container" >
            <div class="content" >
                <div class="file">
                    <img  alt=""  width="100%" height="100%" :src="storeInfo.avatar">
                </div>
            </div>
        </div>
        <mt-cell :title="storeInfo.name" v-show="storeName" >
            <img src="../../images/store/store-icon.png" alt="" slot="icon" height="20px"  class="icon-1">
            <span @click="editName" >编辑</span>
        </mt-cell>

        <div class="store-filed" v-show="!storeName" ref="input1">
            <img src="../../images/store/store-icon.png" alt="" slot="icon" height="20px"  class="img">
            <mt-field  v-model="storeInfo.name" ></mt-field>
            <span  @click="saveStoreName" class="saveBtn">保存</span>
        </div>

        <mt-cell :title="storeInfo.phone">
            <img src="../../images/store/phone-icon.png" alt="" slot="icon" height="20px"  class="icon-2">
        </mt-cell>
        <mt-cell :title="storeInfo.tags" >
            <img src="../../images/store/tags-icon.png" alt="" slot="icon" height="20px" class="icon-3">
        </mt-cell>
        <mt-cell :title="storeInfo.address" >
            <img src="../../images/store/map-icon.png" alt="" slot="icon" height="20px"  class="icon-4">
        </mt-cell>
        <div  class="store-banner">
            <img   :src="storeBanner.url ?  storeBanner.url: storeInfo.bgImage "  height="170px" >
            <div  class="mask"></div>
            <mt-button size="small" @click.native="ImgFile">更换店铺形象图</mt-button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
          return {
            storeName: true,
            storeInfo: {
                bgImage: ''
            },
          storeBanner: {}
          }
        },
        mounted() {
         this.getStoreInfo()
        },
        methods: {
            editName () {
               this.storeName = false
                this.$nextTick(()=> {
                    this.$refs.input1.getElementsByTagName('input')[0].setAttribute('autofocus','autofocus')
                })
            },
            getStoreInfo () {
                this.$http({url:'/stores/'+this.storeId, mehtod:'get',headers: {
                    'X-Access-Token': this.$store.getters.getData.token},params: {id: this.storeId}}).then(res => {
                   this.storeInfo = res.data
                })
            },
            saveBanner () {
                this.$http({url:'/stores/update-bg-image/'+ this.storeId ,method:'put',data:{bgImageFile: this.storeBanner.id}}).then(res =>{
                    console.log('更换成功')
                })
            },
            saveStoreName () {
               this.$http({url:'/stores/update-name/'+this.storeId ,method:'put',data:{name: this.storeInfo.name,id:this.storeId}}).then(res =>{
                 console.log(res.data)
               })
                this.$refs.input1.getElementsByTagName('input')[0].removeAttribute("autofocus");
              this.storeName = true;
            },
            ImgFile () {
                let self = this;
                let srcType = Camera.PictureSourceType.PHOTOLIBRARY;
                let options = {
                    // Some common settings are 20, 50, and 100
                    quality: 100,
                    destinationType: Camera.DestinationType.FILE_URI,
                    // In this app, dynamically set the picture source, Camera or photo gallery
                    sourceType: srcType,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: true,
                    correctOrientation: true  //Corrects Android orientation quirks
                }
                navigator.camera.getPicture(onSuccess, onFail, options);

                function onSuccess(imageURI) {
                    onLoadImageUploadSuccess(imageURI)
                }
                function onLoadImageUploadSuccess(imageURI) {
                    //此处执行文件上传的操作，上传成功后执行下面代码
                    let options = new FileUploadOptions(); //文件参数选项
                    options.fileKey = "file";//向服务端传递的file参数的parameter name
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
                        self.storeBanner = resObject;
                        self.saveBanner()
                        navigator.notification.progressStop();//停止进度条
                        navigator.notification.alert("文件上传成功！", null, "提醒");
                    }, function (error) {
                        navigator.notification.alert(error.source, null, "提醒");
                    }, options)
                }

                function onFail(message) {
                    console.log('Failed because: ' + message);
                }
            },
        },
        computed: mapState({
            storeId: state => state.Login.data.storeId
        })
    }
</script>

<style >
.updatestore{
    background-color: #f9f9f9;
    padding-top: 50px;
    padding-bottom: 10px;
}
.updatestore .avata-container{
    height:190px;
    width: 100%;
    margin: 10px 0 0;
    background-color: #fff;
    display: table;
}
.updatestore .avata-container .content{
    width: 100%;
    display: table-cell;
    vertical-align: middle;
}
.updatestore .avata-container .file{
    height:92px;
    width: 92px;
    text-align: center;
    margin: 0 auto;
    background-color: #f3f5f9;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(68,68,68,0.2);
}
.updatestore .avata-container .file .img{
    margin-top: 27px;
}
.updatestore .avata-container .file .title{
    font-size: 11px;
    color: #999;
}
.updatestore .avata-container .rule{
    font-size: 11px;
    color: #fd9b4c;
    text-align: center;
    padding-top: 15px;
}
.updatestore .ipt .mint-field-core{
    color: #888;
}
.updatestore .mint-cell-text{
    font-size: 14px;
}
.updatestore .mint-cell-wrapper .mint-cell-value{
    font-size: 14px;
    color: #508cee;
}
.updatestore .mint-cell-wrapper{
    padding: 0 15px;
    background-position: bottom center;
}
.store-filed .mint-field-core{
    color: #508cee;
}
.updatestore .mint-field .mint-cell-wrapper{
    padding: 0 5px;
    background-image: none;
}
.updatestore .store-filed {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 15px;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
}
.updatestore .store-filed .img{
    padding-right: 10px
}
.updatestore .store-filed .mint-field{
    flex:1;
    position: relative;
    bottom: 1px;
}
.updatestore .store-filed .saveBtn {
    display: inline-block;
    width: 28px;
    flex: 0 0 28px;
    font-size: 14px;
    color: #508cee
}
.updatestore .store-banner{
    margin-top: 10px;
    position: relative;
    height:170px;
}
.updatestore .store-banner img{
    max-width: 100%;
}
.updatestore .store-banner .mask {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
}
.updatestore .store-banner .mint-button {
    background-color: #6396e8;
    color: #fff;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)
}
.updatestore .icon-1{
    padding-right: 8px
}
.updatestore .icon-2{
    padding-right: 14px
}
.updatestore .icon-3{
    padding-right: 12px
}
.updatestore .icon-4{
    padding-right: 14px
}
</style>
