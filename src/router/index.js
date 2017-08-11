/**
 * Created by Administrator on 2017/7/27.
 */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
const Login = r => require.ensure([], () => r(require('../assets/component/login')), 'Index')
const Regesiter = r => require.ensure([], () => r(require('../assets/component/regesiter')), 'login')
const Forgotpassword = r => require.ensure([], () => r(require('../assets/component/forgot-password')), 'Forgotpassword')
// 首页
const Main = r => require.ensure([], () => r(require('../assets/component/main')), 'Main');
const MainHome = r => require.ensure([], () => r(require('../assets/component/home/home')), 'Main');
const userManage  = r => require.ensure([], () => r(require('../assets/component/financial-management/index')), 'Main');
const mainMessage  = r => require.ensure([], () => r(require('../assets/component/home/message.vue')), 'Main');
const mainMarke  = r => require.ensure([], () => r(require('../assets/component/home/marke.vue')), 'Main');
const Code = r => require.ensure([], () => r(require('../assets/component/home/code')), 'Main');
const numberCode = r => require.ensure([], () => r(require('../assets/component/home/number-code.vue')), 'Main');
// 开通店铺
const Store  = r => require.ensure([], () => r(require('../assets/component/store/index')), 'Store');
const openStore  = r => require.ensure([], () => r(require('../assets/component/home/open-store')), 'Store');
// 订单管理
const Order = r => require.ensure([], () => r(require('../assets/component/order/index')), 'Order');
const allorder = r => require.ensure([], () => r(require('../assets/component/order/all-order')), 'Order');
const overdueorder = r => require.ensure([], () => r(require('../assets/component/order/overdue')), 'Order');
const Unconfirm = r => require.ensure([], () => r(require('../assets/component/order/Unconfirmed')), 'Order');
const verified = r => require.ensure([], () => r(require('../assets/component/order/verified')), 'Order');
// 当面付
const NearPay = r => require.ensure([], () => r(require('../assets/component/nearpay/index')), 'NearPay');
// 自营订单
const OtherOrder = r => require.ensure([], () => r(require('../assets/component/nearpay/other-order')), 'NearPay');
// 商品管理
const Product = r => require.ensure([], () => r(require('../assets/component/product/index')), 'Product');
const selfManage = r => require.ensure([], () => r(require('../assets/component/product/self-manage')), 'Product');
const selfSpec = r => require.ensure([], () => r(require('../assets/component/product/self-spec')), 'Product');
const diyManage = r => require.ensure([], () => r(require('../assets/component/product/diy-manage')), 'Product');
const diySpec = r => require.ensure([], () => r(require('../assets/component/product/diy-spec.vue')), 'Product');
const AddProduct  = r => require.ensure([], () => r(require('../assets/component/product/add-product')), 'Product');
const UpdateProduct  = r => require.ensure([], () => r(require('../assets/component/product/update-product')), 'Product');
//提现申请
const NewExtracts  = r => require.ensure([], () => r(require('../assets/component/extracts/index')), 'Extracts');
const SetExtractsPassword  = r => require.ensure([], () => r(require('../assets/component/extracts/set-extpassword')), 'Extracts');
// 财务管理
const TradeRecord  = r => require.ensure([], () => r(require('../assets/component/financial-management/trade-record')), 'FinancialManagement');
const TradeRecordSpec  = r => require.ensure([], () => r(require('../assets/component/financial-management/trade-record-spec')), 'FinancialManagement');

// 我的收款吗
const Qcode  = r => require.ensure([], () => r(require('../assets/component/financial-management/qcode')), 'Qcode');
// 银行卡
const BankList  = r => require.ensure([], () => r(require('../assets/component/bank/index')), 'Bank');
const NewBank  = r => require.ensure([], () => r(require('../assets/component/bank/new')), 'Bank');

// 设置
const UserSetting = r => require.ensure([], () => r(require('../assets/component/user/index')), 'User');
const UpdateUser = r => require.ensure([], () => r(require('../assets/component/user/update-user')), 'User');
const ChangePhone = r => require.ensure([], () => r(require('../assets/component/user/change-phone')), 'User');
const ChangeRule = r => require.ensure([], () => r(require('../assets/component/user/rule')), 'User');
const ChangePassword = r => require.ensure([], () => r(require('../assets/component/user/change-password')), 'User');
const ChangeExtPassword = r => require.ensure([], () => r(require('../assets/component/user/change-extpassword')), 'User');
Vue.use(Router);

const routes = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {path: '', component: Login},
    {path: '/regesiter', component: Regesiter},
    {path: '/forgot-password', component: Forgotpassword},
    {
      path: '/index', component: Main,
      children: [
         { path: '', component: MainHome},
         { path: 'product', component: Product,},
         { path: 'user', component:  userManage},
         { path: 'message', component: mainMessage},
         { path: 'marke', component: mainMarke},
      ]
    },
    {path: '/code', component: Code},
    // {path: '/open-store',component: openStore},
    {path: '/number-code', component: numberCode},
    {path: '/store',component: Store},
    {
      path: '/order', component: Order,
      children: [
        { path: '', component: allorder},
        { path: 'overdue', component: overdueorder},
        { path: 'unconfirm', component:  Unconfirm},
        { path: 'verified', component: verified},
      ]
    },
    // 当面付
    { path: '/near-pay', component: NearPay},
    // 自营订单
    { path: '/other-order', component: OtherOrder},
     // 银行卡
    {path: '/bank',component: BankList},
    {path: '/bank-new',component: NewBank},
    // 商品管理
    { path: '/self-manage', component: selfManage},
    { path: '/self-manage/:id', component: selfSpec},
    { path: '/diy-manage', component: diyManage},
    { path: '/diy-manage/:id', component: diySpec},
    { path: '/add-product', component: AddProduct},
    { path: '/update-product', component: UpdateProduct},
    // 财务管理
    { path: '/trade-record', component: TradeRecord},
    { path: '/trade-record-spec/:id', component: TradeRecordSpec},
    // 我的收款码
    { path: '/q-code', component: Qcode},
    // 提现
    { path:'/extracts' ,component: NewExtracts},
    { path:'/set-extractsPassword' ,component: SetExtractsPassword},
    // 个人设置
    { path: '/user-setting', component: UserSetting},
    { path:'/update-user',component:UpdateUser},
    { path:'/change-phone',component: ChangePhone},
    { path:'/change-rule',component: ChangeRule},
    { path:'/change-password',component: ChangePassword},
    { path:'/change-extpassword',component: ChangeExtPassword},
  ]
})

console.log( routes)
if (store.state.Login.data.token) {
  routes.replace('/index')
} else {
  routes.replace('/')
}
export  default routes
