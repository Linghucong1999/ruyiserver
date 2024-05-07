(function(){var e={2864:function(e,t,n){"use strict";n.r(t),n.d(t,{Cookie:function(){return o},getLocalStorage:function(){return r},getSessionStorage:function(){return s},removeLocalStorage:function(){return i},removeSessionStorage:function(){return u},setLocalStorage:function(){return a},setSessionStorage:function(){return c}});const o={get(e){let t=document.cookie,n=t.split("; ");for(let o=0;o<n.length;o++){const t=n[o].split("=");if(t[0]===e)return t[1]}return""},set(e,t,n,o,a){let r=e+"="+(t||""),i=new Date;o=void 0!==o?";domain="+o:"",i.setTime(i.getTime()+24*(n||1)*60*60*1e3),r=r+o+"; path="+(a||"/")+": expires="+i.toUTCString(),document.cookie=r},remove(e){this.set(e,"",-1)}},a=(e,t)=>{e&&("string"!==typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},r=e=>{if(!e)return;const t=window.localStorage.getItem(e);return t?JSON.parse(t):void 0},i=e=>{e&&window.localStorage.removeItem(e)},c=(e,t)=>{e&&("string"!==typeof t&&(t=JSON.stringify(t)),window.sessionStorage.setItem(e,t))},s=e=>{if(!e)return;const t=window.sessionStorage.getItem(e);return t?JSON.parse(t):void 0},u=e=>{e&&window.sessionStorage.removeItem(e)}},20:function(e,t,n){"use strict";n.r(t),n.d(t,{createPage:function(){return h},getAllPage:function(){return v},getMyImages:function(){return D},getPageDetail:function(){return b},getRsaPublicKey:function(){return a},getUserInfo:function(){return u},getUserListByKeywords:function(){return y},login:function(){return r},loginByEmail:function(){return i},psdUplod:function(){return I},register:function(){return s},resetPasswordFirstStep:function(){return m},resetPasswordSecondStep:function(){return p},sendEmailCode:function(){return c},updataUserAvatarURL:function(){return f},updateUserAvatar:function(){return g},updateUserNickname:function(){return d},updateUserPassword:function(){return l},updatedPage:function(){return U},uploadCommonImage:function(){return w},uploadImage:function(){return E}});var o=n(8684);const a=()=>o.c.get("/ruyi/auth/rsa/login/key"),r=e=>o.c.post("/ruyi/auth/login",e),i=e=>o.c.post("/ruyi/auth/login/email",e),c=e=>o.c.post("/ruyi/auth/send/email/code",e),s=e=>o.c.post("/ruyi/auth/register",e),u=()=>o.c.get("/ruyi/user/info"),d=e=>o.c.post("/ruyi/user/updata/name",e),l=e=>o.c.post("/ruyi/user/updata/password",e),m=e=>o.c.post("/ruyi/email/password/reset/first",e),p=e=>o.c.post("/ruyi/email/password/reset/second",e),g=e=>o.c.post("/ruyi/user/updata/avater",e),f="/ruyi/user/updata/avater",y=e=>o.c.get("/ruyi/user/getUserList",e),h=e=>o.c.post("/ruyi/page/create",e),v=e=>o.c.get("/ruyi/page/getMyPages",e),b=e=>o.c.get("/ruyi/page/getPageDetail",e),U=e=>o.c.post("/ruyi/page/update",e),I=e=>o.c.postFile("/ruyi/psd/upload",e),D=e=>o.c.get("/ruyi/imageLib/myImages",e),E=e=>o.c.postFile("/ruyi/imageLib/upload",e),w=(e,t)=>o.c.postFile(`/ruyi/imageCommon/upload/${t}`,e)},2420:function(e,t){"use strict";const n={development:{baseURL:"http://127.0.0.1:8018"},production:{baseURL:""}},o="production",a=!1,r=!1,i={isDevelop:a||r,...n[o],canvasH5Width:375,canvasH5Height:644,pageModeList:[{value:"H5",label:"H5",disabled:!1},{value:"longPage",label:"WebAPP",disabled:!1},{name:"relativePage",label:"排版图文",disabled:!0},{value:"PC",label:"PC页面",disabled:!0}]};t.c=i},2332:function(e,t,n){"use strict";var o=n(9536),a=n(3644),r=n(20);const i={async checkLoginState(){const e=o.c.state.user;return!!e.access_token},async checkLoginExpire(){const e=o.c.state.user,t=(new Date).getTime();return t-e.expiration_time>=18e5},async getRSAkey(){const e=await(0,r.getRsaPublicKey)();return e.body},async doLogin(e){try{const t=await(0,r.login)(e);return o.c.commit("updateAccessToken",t.body.access_token),o.c.commit("updateUserInfo",t.body.userInfo),t.body}catch(t){return t.data.body}},async sendEmailAndCode(e){try{const t=await(0,r.sendEmailCode)(e);return t}catch(t){return t}},async doLoginByEmail(e){try{const t=await(0,r.loginByEmail)(e);return o.c.commit("updateAccessToken",t.body.access_token),o.c.commit("updateUserInfo",t.body.userInfo),t}catch(t){return t}},async doRegister(e){try{const t=await(0,r.register)(e);return o.c.commit("updateAccessToken",t.body.access_token),o.c.commit("updateUserInfo",t.body.userInfo),t}catch(t){return t.data}},getUserInfoData(){return new Promise(((e,t)=>{(0,r.getUserInfo)().then((t=>{o.c.commit("updateUserInfo",t.body),e(t.body)})).catch((e=>{t(e)}))}))},async doLogout(){o.c.commit("updateAccessToken",""),window.sessionStorage.setItem("beforeLoginUrl",""),i.goLogin()},async goLogin(){const e=window.location.href.indexOf("#/"),t=window.location.href.slice(e+1,window.location.href.length);window.sessionStorage.setItem("beforeLoginUrl",t),o.c.commit("updateAccessToken",""),a.c.push({name:"Login"})},async goBeforeLoginUrl(){const e=window.sessionStorage.getItem("beforeLoginUrl");!e||["/login"].includes(e)?a.c.push("/"):(a.c.push(e),window.sessionStorage.setItem("beforeLoginUrl",""))},async doResetPasswordByEmail(e){try{const t=await(0,r.resetPasswordFirstStep)(e);return o.c.commit("updateAccessToken",t.body.access_token),t}catch(t){return t}},async doResetPasswordSecondStep(e){try{const t=await(0,r.resetPasswordSecondStep)(e);return o.c.commit("updateAccessToken",""),t}catch(t){return t}}};t.c=i},1916:function(e,t,n){"use strict";var o=n(7768),a=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},r=[],i={},c=i,s=n(2528),u=(0,s.c)(c,a,r,!1,null,null,null),d=u.exports,l=n(3644),m=n(9536),p=n(8684),g=n(2864),f=n(2420),y=n(2264),h=n.n(y);const v={dateFormat:function(e){return h()(e).format("YYYY-MM-DD HH:mm:ss")},getLabelText(e,t,n="label"){const o=t.find((t=>t.value===e));return o?o[n]:""}};var b=v,U=n(5144),I=n(20),D=n(192),E=n.n(D),w=n(9704),S=n.n(w),x=n(2272),P=n.n(x),k=n(2332);l.c.beforeEach((async(e,t,n)=>{if(P().start(),e.meta.noNeedLogin)return void n();if("Password"===e.name)return void n();const o=await k.c.checkLoginState();if(!o)return k.c.goLogin(),!1;try{await k.c.getUserInfoData()}catch(a){if(!a.data.status)return void k.c.doLogout()}n()})),l.c.afterEach((()=>{P().done()})),o["default"].use(S()),o["default"].use(E()),o["default"].component("lottie",U.c),o["default"].prototype.$mUtils=g,o["default"].prototype.$axios=p.c,o["default"].prototype.$api=I,Object.keys(b).forEach((e=>{o["default"].filter(e,b[e])})),o["default"].prototype.goBeforeLogin=function(){let e=g.Cookie.get("beforeLoginUrl");e=decodeURIComponent(e),e&&-1===e.indexOf("/author")?(l.c.push(e),g.Cookie.set("beforeLoginUrl","",1/24/60,window.location.host,window.location.pathname.substring(0,window.location.pathname.length-1))):l.c.push("/")},o["default"].prototype.$config=f.c,o["default"].config.productionTip=!1,m.c.commit("getUserFromLocal"),new o["default"]({router:l.c,store:m.c,render:e=>e(d)}).$mount("#app")},8256:function(e,t,n){"use strict";n.d(t,{c:function(){return y}});n(868);const o=function(){let e=(new Date).getTime();window.performance&&"function"===typeof window.performance.now&&(e+=performance.now());const t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){let n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?n:3&n|8).toString(16)}));return t},a=function(e,t=[]){if(null===e||"object"!==typeof e)return e;const n=t.filter((t=>t.original===e))[0];if(n)return n.copy;const o=Array.isArray(e)?[]:{};return t.push({original:e,copy:o}),Object.keys(e).forEach((n=>{o[n]=a(e[n],t)})),o};var r=n(3568),i=n(2420);const c={elName:"",animations:[],commonStyle:{position:"absolute",width:i.c.canvasH5Width,height:30,top:200,left:0,rotate:0,paddingTop:0,paddingLeft:0,paddingRight:0,paddingBottom:0,marginTop:0,marginLeft:0,marginRight:0,marginBottom:0,borderWidth:0,borderColor:"",borderStyle:"solid",borderRadius:0,boxShadow:"",fontSize:16,fontWeight:500,letterSpacing:0,textAlign:"center",color:"#000000",backgroundColor:"",backgroundImage:"",backgroundSize:"100%",backgroundRepeat:"no-repeat",fontFamily:"Arial",opacity:1,zIndex:1},events:[],propsValue:{},value:"",valueType:"String"},s={name:"",elements:[],commonStyle:{backgroundColor:"",backgroundImage:"",backgroundSize:"100%",backgroundRepeat:"no-repeat"},config:{}},u={name:"",title:"未命名场景",description:"无代码平台，构建页面从未如此简单",coverImage:"",auther:"",script:"",width:i.c.canvasH5Width,height:i.c.canvasH5Height,pages:[]},d=()=>({uuid:o(),...(0,r.cloneDeep)(s)}),l=e=>{const t=(0,r.cloneDeep)(e);return t.uuid=o(),t.elements=t.elements.map((e=>f(e))),t},m=()=>{const e=(0,r.cloneDeep)(u),t=d();return e.pages.push({...t}),e},p=(e,t={})=>{const n=(0,r.cloneDeep)(e),i=n.valueType||"String",s={String:"",Array:[],Object:{},Boolean:!1,Number:0},u=(0,r.cloneDeep)(c),d={uuid:o(),...u,elName:n.elName,propsValue:a(n.needProps||{})};return d.commonStyle=(0,r.merge)(d.commonStyle,n.defaultStyle),d.commonStyle=(0,r.merge)(d.commonStyle,t),d.value=e.defaultValue||s[i],d.valueType=i,d},g=(e,t=1)=>{const n=["width","height","top","left","borderWidth","borderRadius","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth","padding","paddingLeft","paddingRight","paddingTop","paddingBottom","margin","marginLeft","marginRight","marginTop","marginBottom","fontSize","constterSpacing","lineHeight"],o={};for(let a in e)n.includes(a)?o[a]=e[a]*t+"px":o[a]=e[a];return o.transform=`rotate(${o.rotate}deg)`,o.backgroundImage=o.backgroundImage?`url(${o.backgroundImage})`:"",o},f=(e,t={})=>{const n=(0,r.cloneDeep)(e);return n.uuid=o(),n.commonStyle=(0,r.merge)(n.commonStyle,t),n.commonStyle.top=n.commonStyle.top+30,n};var y={elementConfig:c,pageConfig:s,projectConfig:u,getPageConfig:d,getProjectConfig:m,getElementConfig:p,getCommonStyle:g,copyElement:f,copyPage:l}},3644:function(e,t,n){"use strict";var o=n(7768),a=n(5408);o["default"].use(a.cp),t.c=new a.cp({routes:[{path:"/login",name:"Login",component:()=>Promise.all([n.e(56),n.e(580)]).then(n.bind(n,1580)),meta:{hideHeader:!0,trust:!0,noNeedLogin:!0}},{path:"/password",name:"Password",component:()=>Promise.all([n.e(56),n.e(912)]).then(n.bind(n,2912))},{path:"/",name:"Layout",component:()=>Promise.all([n.e(56),n.e(444)]).then(n.bind(n,7824)),redirect:{name:"Home"},children:[{path:"home",name:"Home",component:()=>n.e(968).then(n.bind(n,968)),redirect:{name:"pageList"},children:[{path:"page-list",name:"pageList",component:()=>n.e(856).then(n.bind(n,9856))},{path:"my-template",name:"myTemplate",component:()=>n.e(988).then(n.bind(n,3988))},{path:"page-data",name:"pageData",component:()=>n.e(936).then(n.bind(n,8936))},{path:"page-data-detail",name:"pageDataDetail",component:()=>n.e(188).then(n.bind(n,8808))},{path:"template-list",name:"templateList",component:()=>n.e(628).then(n.bind(n,6628))}]},{path:"edit",name:"Edit",component:()=>Promise.all([n.e(56),n.e(868)]).then(n.bind(n,4868))}]}]})},8684:function(e,t,n){"use strict";var o=n(2774),a=n(9536),r=n(2420),i=n(2864),c=n(7392),s=n.n(c);o.c.defaults.baseURL=r.c.baseURL,o.c.defaults.headers["Content-Type"]="applicathion/json;charset=utf-8",o.c.defaults.timeout=7e4,o.c.interceptors.request.use((e=>(e.headers.Authorization=a.c.getters.authorization,e.headers["x-csrf-token"]=i.Cookie.get("x-csrf-token"),e)),(e=>Promise.reject(e))),o.c.interceptors.response.use((e=>e.data.status?Promise.resolve(e.data):(a.c.dispatch("showMessage",{type:"error",data:e.data.message}),Promise.reject(e))),(e=>{if(e&&e.response)switch(e.response.status){case 400:e.message="错误请求";break;case 401:e.message="未授权，请重新登录";break;case 403:e.message="拒绝访问";break;case 404:e.message="请求错误,未找到该资源";break;case 405:e.message="请求方法未允许";break;case 408:e.message="请求超时";break;case 500:e.message="服务器端出错";break;case 501:e.message="网络未实现";break;case 502:e.message="网络错误";break;case 503:e.message="服务不可用";break;case 504:e.message="网络超时";break;default:e.message=`连接错误${e.response.message}`}else e.message="连接到服务器失败";return a.c.dispatch("showMessage",{type:"error",data:e.message||e.response.message}),Promise.reject(e.response)}));const u=e=>{window.open(e)};t.c={get(e,t,n,a){return(0,o.c)({method:"get",url:e,params:t||{},headers:{...a||{}},responseType:n})},post(e,t,n){return(0,o.c)({method:"post",url:e,data:t||{},headers:{...n||{},"Content-type":"application/json;charset=UTF-8"}})},postFormData(e,t,n){return(0,o.c)({method:"post",url:e,data:s().stringify(t)||{},headers:{...n||{},"Content-type":"application/x-www-form-urlencoded;charset=UTF-8"}})},postFile(e,t,n){return(0,o.c)({method:"post",url:e,data:t,headers:{...n||{},"Content-type":"multipart/form-data"}})},put(e,t,n){return(0,o.c)({method:"put",url:e,data:t||{},headers:{...n||{},"Content-type":"application/json;charset=UTF-8"}})},delete(e,t,n){return(0,o.c)({method:"delete",url:e,params:t||{},headers:{...n||{}}})},getFile(e,t){const n={...t||{}},o=[];for(let a in n)o.push(a.toString()+"="+n[a]);e=r.c.baseURL+e+"?"+o.join("&"),e=encodeURI(e),u(e)}}},9536:function(e,t,n){"use strict";n.d(t,{c:function(){return E}});var o=n(192),a=n(7768),r=n(8416),i=n(2864);const c={access_token:"",permissionsList:[],userInfo:{}},s={},u={updateUserInfo(e,t){e.userInfo={...t},u.saveUserToLocal(e)},updateAccessToken(e,t){e.access_token=t||"",u.saveUserToLocal(e)},updatePermissionsList(e,t){e.permissionsList=t||[],u.saveUserToLocal(e)},saveUserToLocal(e){(0,i.setLocalStorage)("user",e)},getUserFromLocal(e){let t=(0,i.getLocalStorage)("user");if(t)for(let n in t)e[n]=t[n]},clearUserInfo(e){e.userInfo={},e.access_token="",e.permissionsList=[],e.expiration_time=0,u.saveUserToLocal(e)}},d={authorization(e){return e.access_token?"Bearer "+e.access_token:""},userInfo(e){return e.userInfo}};var l={state:c,actions:s,mutations:u,getters:d},m=n(3568),p=n(8256);const g={projectData:{},activePageUUID:"",activeElementUUID:"",historyCache:[],currentHistoryIndex:-1,activeAttrEditCollapse:["1"]},f={setProjectData({commit:e,state:t,dispatch:n},o){let a=o;a||(a=p.c.getProjectConfig()),e("setProjectData",a),t.projectData.pages&&0!==t.projectData.pages.length||n("addPage"),n("setActivePageUUID",t.projectData.pages[0].uuid)},setActivePageUUID({commit:e},t){e("setActivePageUUID",t),e("setActiveElementUUID","")},setActiveElementUUID({commit:e},t){e("setActiveElementUUID",t)},addPage({commit:e,state:t},n){let o=p.c.getPageConfig(),a=-1;a=n?t.projectData.pages.findIndex((e=>e.uuid===n)):t.projectData.pages.length-1,e("insertPage",o,a),e("addHistoryCache")},deletePage({state:e,commit:t,dispatch:n},o){const a=e.projectData.pages.findIndex((e=>e.uuid===o));if(1===e.projectData.pages.length&&e.activePageUUID===o)return n("addPage"),t("setActivePageUUID",e.projectData.pages[1].uuid),t("deletePage",a),void t("addHistoryCache");0===a&&e.activePageUUID===o&&t("setActiveElementUUID",e.projectData.pages[1].uuid),t("deletePage",a);const r=e.projectData.pages.length;t("setActivePageUUID",e.projectData.pages[r-1].uuid),t("addHistoryCache")},copyPage({commit:e},t){const n=g.projectData.pages.find((e=>e.uuid===t)),o=p.c.copyPage(n);e("insertPage",o),e("addHistoryCache")},addElement({commit:e,state:t},n){const o=h.activePage(t),a=p.c.getElementConfig(n,{zIndex:o.elements.length+1});e("addElement",a),e("setActiveElementUUID",a.uuid),e("addHistoryCache")},elementCommand({commit:e,dispatch:t},n){let o=h.activeElement();switch(n){case"copy":t("copyElement",o);break;case"delete":t("deleteElement",o.uuid);break;case"fontA+":t("resetElementCommonStyle",{fontSize:o.commonStyle.fontSize+1});break;case"fontA-":t("resetElementCommonStyle",{fontSize:o.commonStyle.fontSize-1});break;case"fontB":t("resetElementCommonStyle",{fontWeight:"bold"===o.commonStyle.fontWeight?"normal":"bold"});break;case"layerUp":e("resetElementZindex",{uuid:o.uuid,type:"layerUp"});break;case"layerDown":e("resetElementZindex",{uuid:o.uuid,type:"layerDown"});break;case"layerTop":e("resetElementZindex",{uuid:o.uuid,type:"layerTop"});break;case"layerBottom":e("resetElementZindex",{uuid:o.uuid,type:"layerBottom"});break;default:break}},copyElement({commit:e},t){let n=t||h.activeElement(),o=h.activePage(),a=p.c.copyElement(n,{zIndex:o.elements.length+1});e("addElement",a),e("setActiveElementUUID",a.uuid),e("addHistoryCache")},deleteElement({state:e,commit:t},n){n===e.activeElementUUID&&t("setActiveElementUUID",""),t("resetElementZindex",{uuid:n,type:"set0"}),t("deleteElemet",n),t("addHistoryCache")},allDeleteElement({commit:e}){e("setActiveElementUUID",""),e("allDeleteElement")},resetElementCommonStyle({commit:e},t){e("resetElementCommonStyle",t),e("addHistoryCache")},addHistoryCache({commit:e}){e("addHistoryCache")},editorUndo({commit:e,state:t}){if(!h.canUndo(t))return;const n=t.historyCache[t.currentHistoryIndex-1];e("relapceEditorState",(0,m.cloneDeep)(n)),e("editorUndo")},editorRedo({commit:e,state:t}){if(!h.canRedo(t))return;const n=t.historyCache[t.currentHistoryIndex+1];e("relapceEditorState",(0,m.cloneDeep)(n)),e("editorRedo")},addElementEvent({commit:e},t){let n={type:t,url:""};e("addElementEvent",n),e("addHistoryCache")},deleteElementEvent({commit:e},t){e("deleteElementEvent",t),e("addHistoryCache")},addElementAnimate({commit:e},t){const n={type:t,duration:1,infinite:"",interationCount:1,delay:0};e("addElementAnimate",n),e("addHistoryCache")},deleteElementAnimate({commit:e},t){e("deleteElementAnimate",t),e("addHistoryCache")}},y={setProjectData(e,t){e.projectData=t},insertPage(e,t,n){n?e.projectData.pages.splice(n,0,t):e.projectData.pages.push(t)},setActivePageUUID(e,t){e.activePageUUID=t},setActiveElementUUID(e,t){e.activeElementUUID=t},deletePage(e,t){e.projectData.pages.splice(t,1)},addHistoryCache(e){e.currentHistoryIndex+1<e.historyCache.length&&e.historyCache.splice(e.currentHistoryIndex+1),e.historyCache.push({projectData:(0,m.cloneDeep)(e.projectData),activePageUUID:e.activePageUUID,activeElementUUID:e.activeElementUUID}),e.historyCache.splice(100),e.currentHistoryIndex++},relapceEditorState(e,t){e.projectData=(0,m.cloneDeep)(t.projectData),e.activePageUUID=t.activePageUUID,e.activeElementUUID=t.activeElementUUID},editorUndo(e){e.currentHistoryIndex--},editorRedo(e){e.currentHistoryIndex++},addElement(e,t){const n=e.projectData.pages.findIndex((t=>t.uuid===e.activePageUUID));e.projectData.pages[n].elements.push(t)},resetElementZindex(e,{uuid:t,type:n}){let o=t||e.activeElementUUID,a=h.activePage(e),r=a.elements.find((e=>e.uuid===o)),i=r.commonStyle.zIndex,c=a.elements.length,s=1,u={layerUp:Math.min(i+1,c),layerDown:Math.max(i-1,s),layerTop:c,layerBottom:s,set0:0};if(void 0===u[n])return;let d=u[n];r.commonStyle.zIndex=d,a.elements.forEach((e=>{o!==e.uuid&&("layerUp"===n&&e.commonStyle.zIndex===d&&e.commonStyle.zIndex--,"layerDown"===n&&e.commonStyle.zIndex===d&&e.commonStyle.zIndex++,"layerTop"===n&&e.commonStyle.zIndex>i&&e.commonStyle.zIndex--,("layerBottom"===n||"set0"===n)&&e.commonStyle.zIndex<i&&e.commonStyle.zIndex++)}))},deleteElemet(e,t){let n=h.activePage(e),o=n.elements.findIndex((e=>e.uuid===t));n.elements.splice(o,1)},allDeleteElement(e){let t=h.activePage(e),n=t.elements.length;t.elements.splice(0,n)},resetElementCommonStyle(e,t){let n=h.activeElement(e);n.commonStyle=(0,m.merge)(n.commonStyle,t)},addElementEvent(e,t){let n=h.activeElement(e);n.events.push(t)},deleteElementEvent(e,t){let n=h.activeElement(e);n.events.splice(t,1)},addElementAnimate(e,t){let n=h.activeElement(e);n.animations.push(t)},deleteElementAnimate(e,t){let n=h.activeElement(e);n.animations.splice(t,1)}},h={activePage(){return g.projectData.pages&&g.activePageUUID?g.projectData.pages.find((e=>e.uuid===g.activePageUUID)):{commonStyle:{},config:{}}},filterPages(e){return e.projectData.pages},currentPageIndex(e){return e.projectData.pages?e.projectData.pages.findIndex((t=>t.uuid===e.activePageUUID)):-1},activeElementIndex(e){if(!e.projectData.pages)return-1;let t=e.projectData.pages.findIndex((t=>t.uuid===e.activePageUUID));return-1===t?-1:e.projectData.pages[t].elements.findIndex((t=>t.uuid===e.activeElementUUID))},activeElement(){if(!g.projectData.pages)return-1;let e=g.projectData.pages.findIndex((e=>e.uuid===g.activePageUUID));return-1===e?-1:g.projectData.pages[e].elements.find((e=>e.uuid===g.activeElementUUID))},canUndo(e){return e.currentHistoryIndex>0},canRedo(e){return e.historyCache.length>e.currentHistoryIndex+1},canAllDelte(e){return""===e.activeElementUUID}};var v={state:g,actions:f,mutations:y,getters:h};const b={},U={showMessage(e,t){(0,o.Message)({message:t.data||t.message,type:t.type,duration:3e3})}},I={},D={};a["default"].use(r.cp);var E=new r.cp.Store({state:b,actions:U,mutations:I,getters:D,modules:{user:l,pageEditor:v}})},6204:function(){}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,o,a,r){if(!o){var i=1/0;for(d=0;d<e.length;d++){o=e[d][0],a=e[d][1],r=e[d][2];for(var c=!0,s=0;s<o.length;s++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(c=!1,r<i&&(i=r));if(c){e.splice(d--,1);var u=a();void 0!==u&&(t=u)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[o,a,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"static/js/"+e+"."+{56:"c732e4af",188:"c2656475",444:"f94a327b",580:"c288d113",628:"62ac2fc1",856:"61dd6eee",868:"2ed174d8",912:"ede47efd",936:"46d49028",968:"b1464659",988:"655619ff"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"static/css/"+e+"."+{444:"c63af715",580:"f1c50c91",856:"36087e26",868:"dc295c63",912:"ed2bf482",968:"c3abf677"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="ruyiweb:";n.l=function(o,a,r,i){if(e[o])e[o].push(a);else{var c,s;if(void 0!==r)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var l=u[d];if(l.getAttribute("src")==o||l.getAttribute("data-webpack")==t+r){c=l;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+r),c.src=o),e[o]=[a];var m=function(t,n){c.onerror=c.onload=null,clearTimeout(p);var a=e[o];if(delete e[o],c.parentNode&&c.parentNode.removeChild(c),a&&a.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=m.bind(null,c.onerror),c.onload=m.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,o,a){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(n){if(r.onerror=r.onload=null,"load"===n.type)o();else{var i=n&&n.type,c=n&&n.target&&n.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+c+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=c,r.parentNode&&r.parentNode.removeChild(r),a(s)}};return r.onerror=r.onload=i,r.href=t,n?n.parentNode.insertBefore(r,n.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var a=n[o],r=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(r===e||r===t))return a}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){a=i[o],r=a.getAttribute("data-href");if(r===e||r===t)return a}},o=function(o){return new Promise((function(a,r){var i=n.miniCssF(o),c=n.p+i;if(t(i,c))return a();e(o,c,null,a,r)}))},a={656:0};n.f.miniCss=function(e,t){var n={444:1,580:1,856:1,868:1,912:1,968:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=o(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}}(),function(){var e={656:0};n.f.j=function(t,o){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var r=new Promise((function(n,o){a=e[t]=[n,o]}));o.push(a[2]=r);var i=n.p+n.u(t),c=new Error,s=function(o){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var r=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",c.name="ChunkLoadError",c.type=r,c.request=i,a[1](c)}};n.l(i,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,i=o[0],c=o[1],s=o[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(s)var d=s(n)}for(t&&t(o);u<i.length;u++)r=i[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},o=self["webpackChunkruyiweb"]=self["webpackChunkruyiweb"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[999],(function(){return n(1916)}));o=n.O(o)})();
//# sourceMappingURL=index.f16b2f4c.js.map