<template>
    <!-- App -->
    <div class="store">
        <mt-header title="开通店铺" fixed>
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button  slot="right" @click.native="saveStore">确认开通</mt-button>
        </mt-header>

        <div class="avata-container" >
            <div class="content" >
                <div class="file" @click="ImgFile" v-show="!avatar.url">
                    <img src="../../images/store/camera.png" alt=""  height="24px" class="img">
                     <div class="title">店铺图片</div>
                </div>
                <div class="file" @click="ImgFile" v-show="avatar.url">
                    <img :src="avatar.url" alt=""  width="100%" height="100%">
                </div>
                <div class="rule">上传要求：100kb以内，至少1张，格式jpg或JPEG格式）</div>
            </div>
        </div>

        <mt-field label="店铺名称"  class="ipt" v-model="user.name"></mt-field>
        <mt-cell title="店铺类型"  is-link   :value="categoryValue ?  categoryValue : '请选择' " @click.native="popupVisible3 = true"></mt-cell>
        <mt-field label="手机号"  class="ipt" v-model="user.phone"></mt-field>
        <mt-cell title="店铺位置"  @click.native="openPopup" :value=" province + ' '+ cities +' '+ regions " is-link></mt-cell>
        <mt-cell title="街道"   :value="adress"></mt-cell>
        <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
            <mt-button @click.native="popupVisible3 = false" size="large" type="primary">返回</mt-button>
            <!--<mt-checklist :max="3" class="page-part"  v-model="value3" :options="categoriesAllList" >-->
            <!--</mt-checklist>-->
            <mt-radio title="只能选择一个" v-model="value" :options="categoriesAllList" @change="selectValue"></mt-radio>
        </mt-popup>

        <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
            <mt-picker :slots="slots" @change="onDateChange" :visible-item-count="5" ></mt-picker>
        </mt-popup>
        <div class="amap-page-container">
            <el-amap-search-box class="search-box" :search-option="searchOption"  :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amap" :zoom="zoom" :plugin="plugin" class="amap-demo" :center="center">
                <el-amap-info-window v-for="window in windows" :position="center" :content="content" :visible="window.visible" ></el-amap-info-window>
            </el-amap>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
      data () {
        let self = this;
        return {
            user: {
              name:null,
              phone: null
            },
            value: null,
            popupVisible4: false,
            popupVisible3: false,
            Province: [],
            categoriesAllList: [],
            categoryValue: null,
            categoryArr: [],
            province: '',
            provinceId: '',
            Cities: '',
            cities: '',
            cityId: '',
            Regions: '',
            regions: '',
            regionId: '',
            adress: '',
            avatar: {},
            value3: [],
            categoriesList: [],
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot2',
                    textAlign: 'center'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                }
            ],
            zoom: 14,
            center: [121.5273285, 31.21515044],
            lng: 0,
            lat: 0,
            loaded: false,
            content: '您的当前位置',
            windows: [
                {
                    content: '',
                    position: [121.5273285, 31.21515044],
                    visible: true
                }
            ],
            searchOption: {
                city: '合肥',
                citylimit: true
            },
            plugin: [{
                pName: 'Geolocation',
                events: {
                    init(o) {
                        // o 是高德地图定位插件实例
                        o.getCurrentPosition((status, result) => {
                            if (result && result.position) {
                                self.lng = result.position.lng;
                                self.lat = result.position.lat;
                                self.center = [self.lng, self.lat];
                                self.loaded = true;
                                self.content = "您的当前位置:" + result.formattedAddress;
                                self.adress = result.addressComponent.township;
                                self.$nextTick();
                            }
                        });
                    }
                }
            }]
        }
      },
     mounted () {
          this.$navigation.cleanRoutes()
          this.getProvince()
          this.getCategories()
     },
      methods:{
          saveStore () {
            this.$http.post('/stores',{
                name: this.user.name,
                phone: this.user.phone,
                avatarFile: this.avatar.id,
                provinceId: this.provinceId,
                cityId: this.cityId,
                regionId: this.regionId,
                address: this.adress,
                categoriesIds: this.categoryArr,
                lat: this.lat,
                lon: this.lng
            }, {headers: {'X-Access-Token': this.$store.getters.getData.token}}).then(res => {
                let instance = Toast('开通成功!');
                this.$navigation.cleanRoutes()
                this.$store.commit('UPDATE_STOREID',res.data.employee)
                setTimeout(() => {
                    instance.close();
                    this.$router.push('/index')
                }, 2000);
            }, error =>{
                let instance = Toast(error.response.data.message);
                setTimeout(() => {
                    instance.close();
                }, 2000);
            })
          },
          selectValue (value) {
            for(let i = 0;i<this.categoriesAllList.length;i++){
                if(value === this.categoriesAllList[i].value){
                    this.categoryValue = this.categoriesAllList[i].label
                    this.categoryArr.push(value)
                }
            }
          },
          onSearchResult(pois) {
              let latSum = 0;
              let lngSum = 0;
              if (pois.length > 0) {
                  this.center = [pois[0].location.lng, pois[0].location.lat];
                  this.content = "当前定位在:"+ pois[0].name;
                  this.adress = pois[0].name;
                  this.lng = pois[0].location.lng;
                  this.lat = pois[0].location.lat;
              }
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
                      self.avatar = resObject;
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
          getCategories () {
              this.$http.get('/categories').then( res => {
                  let data = res.data
                  let list = [];
                  for(let i =0 ;i<data.length;i++){
                      this.categoriesAllList.push({label:data[i].name, value:data[i].id})
                  }

              })
          },
          openPopup () {
            this.popupVisible4 = true
          },
          onDateChange(index,values) {
              for(let i = 0;i<this.Province.length;i++){
                  if (this.Province[i].name === values[0]) {
                      this.getCities(this.Province[i].id)
                      this.provinceId = this.Province[i].id
                  }
              }
              for(let i = 0;i<this.Cities.length;i++){
                  if (this.Cities[i].name === values[1]) {
                      this.getRegions(this.Cities[i].id)
                      this.cityId = this.Cities[i].id
                  }
              }
              for(let i = 0;i<this.Regions.length;i++){
                  if (this.Regions[i].name === values[2]) {
                      this.regionId = this.Regions[i].id
                  }
              }
              this.province = values[0];
              this.cities = values[1];
              this.regions = values[2];
              this.searchOption.city =  values[1]
          },
          getProvince () {
             this.$http.get('/regions/province').then( res => {
                const data = res.data;
                this.Province =  res.data;
                let List = []
                for(let i = 0 ;i<data.length; i++) {
                   List.push(data[i].name)
                }
                 this.slots[0].values = List
             })

          },
          getCities (id) {
              this.$http.get('/regions/'+ id,{params: id}).then( res => {
                  let data = res.data.children
                  let List = []
                  this.Cities =  res.data.children;
                  for(let i = 0 ;i<data.length; i++) {
                      List.push(data[i].name)
                  }
                  this.slots[1].values = List
              })
          },
          getRegions (id) {
              this.$http.get('/regions/'+ id,{params: id}).then( res => {
                  let data = res.data.children
                  let List = []
                  this.Regions =  res.data.children;
                  for(let i = 0 ;i<data.length; i++) {
                      List.push(data[i].name)
                  }
                  this.slots[2].values = List
              })
          }
      }
    }
</script>

<style >
.store{
    background-color: #f9f9f9;
    padding-top: 50px;
}
.store .mint-popup-4{
    width: 100%;
}
.store .mint-header{
    height:50px;
    font-size: 14px;
}
.store .mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.store .avata-container{
    height:190px;
    width: 100%;
    margin: 10px 0;
    background-color: #fff;
    display: table;
}
.store .avata-container .content{
    width: 100%;
    display: table-cell;
    vertical-align: middle;
}
.store .avata-container .file{
    height:92px;
    width: 92px;
    text-align: center;
    margin: 0 auto;
    background-color: #f3f5f9;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(68,68,68,0.2);
}
.store .avata-container .file .img{
    margin-top: 27px;
}
.store .avata-container .file .title{
    font-size: 11px;
    color: #999;
}
.store .avata-container .rule{
    font-size: 11px;
    color: #fd9b4c;
    text-align: center;
    padding-top: 15px;
}
.store .ipt .mint-field-core{
    color: #888;
}
.amap-demo {
    height: 300px;
}
</style>
