<template>
    <div class="bank">
        <mt-header fixed title="添加银行卡" >
                <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
        </mt-header>
        <div>
            <div @click="popupVisible = true" v-if="selectBankValue" class="bankTypeText">
                <span>银行类型</span> <span class="selectIcon" >{{ selectBankValue}}</span><span class="caret"></span>
            </div>
            <div @click="popupVisible = true" v-else="selectBankValue" class="bankTypeText">
                <span>银行类型</span> <span class="selectIcon" >请选择</span><span class="caret"></span>
            </div>
            <mt-field  placeholder="银行卡卡号" type="number" v-model="bank.bankCode"></mt-field>
            <mt-field  placeholder="持卡人" type="text" v-model="bank.name"></mt-field>
        </div>
        <div style="" class="add-btn">
            <mt-button size="large" :disabled="!bank.bankCode || !bank.name" @click.native="addBank">添加</mt-button>
        </div>

        <mt-popup v-model="popupVisible" position="bottom" class="bank-picker">
            <mt-picker :slots="bankList" @change="selectBank" :visible-item-count="5" ></mt-picker>
        </mt-popup>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                popupVisible: false,
                selectBankValue: '',
                selectBankId: 0,
                allBankType: [],
                bank: {
                    bankCode: '',
                    name: '',
                    bankType: '',
                },
                bankList:[
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    }
                ]
            }
        },
        mounted () {
            this.$navigation.cleanRoutes()
          this.getBankTypeText()
        },
        methods: {
            getBankTypeText () {
                this.$http({method:'get',url:'/bank-cards/types'}).then( res => {
                    const bankTypeList = res.data
                    for(let i =0;i<bankTypeList.length;i++){
                        this.bankList[0].values.push(bankTypeList[i].name)
                    }
                    this.allBankType = res.data
                })
            },
            selectBank (picker,values) {
              this.selectBankValue = values[0]
              for(let i =0;i<this.allBankType.length;i++) {
                  if( values[0] === this.allBankType[i].name){
                      this.bank.bankType =  this.allBankType[i].key
                  }
              }
            },
            addBank () {
                this.$http({method:'post',url:'/bank-cards',data: this.bank}).then( res => {
                    let instance = Toast('添加成功');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                   this.$router.push('/bank')
                })
            }
        }
    }
</script>

<style >
.bank{
    padding-top: 50px;
}
.bank .caret{
    display:inline-block;
    width:0;
    height:0;
    margin-left:2px;
    vertical-align:middle;
    border-top: 5px dashed;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
}
.bank .mint-cell-wrapper{
    padding: 0 15px;
}
.bank .add-btn{
    padding: 0 15px;margin-top: 40px
}
.bank .add-btn .mint-button{
    background-color: #508cee;color: #fff;
}
.bank .bankTypeText{
    padding: 15px;color: #999
}
.bank .bank-picker{
    width: 100%;
}
</style>
