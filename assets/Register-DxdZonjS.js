import{r as _,c as w,a as h,b as n,d as r,e,w as u,v as c,t as m,f as d,g as f,h as g,j as k,i as b}from"./index-Crq0Dkeh.js";import{a as y}from"./axios-C8DqakIB.js";const C={id:"signUpPage",class:"bg-yellow"},x={class:"conatiner signUpPage vhContainer"},V=e("div",{class:"side"},[e("a",{href:"#"},[e("img",{class:"logoImg",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png",alt:""})]),e("img",{class:"d-m-n",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png",alt:"workImg"})],-1),U={class:"formControls"},j=e("h2",{class:"formControls_txt"},"註冊帳號",-1),E=e("label",{class:"formControls_label",for:"email"},"Email",-1),N={key:0},q=e("label",{class:"formControls_label",for:"name"},"您的暱稱",-1),B={key:1},L=e("label",{class:"formControls_label",for:"pwd"},"密碼",-1),R={key:2},D=e("label",{class:"formControls_label",for:"pwd-check"},"再次輸入密碼",-1),I={key:3},M={key:4},P="https://todolist-api.hexschool.io",$={__name:"Register",setup(S){const s=_({email:"",nickname:"",password:"",password2:""}),l=_([]),v=async()=>{try{(await y.post(`${P}/users/sign_up`,{email:s.value.email,nickname:s.value.nickname,password:s.value.password})).data.status&&k.push("/login")}catch(i){l.value=i.response.data.message}},t=w(()=>{if(typeof l.value=="object"){const i=l.value.filter(o=>o.includes("email")),a=l.value.filter(o=>o.includes("nickname")),p=l.value.filter(o=>o.includes("password"));return{email:i.join(", "),nickname:a.join(", "),password:p.join(", ")}}else return{email:l.value}});return(i,a)=>{const p=h("RouterLink");return n(),r("div",C,[e("div",x,[V,e("div",null,[e("form",U,[j,E,u(e("input",{"onUpdate:modelValue":a[0]||(a[0]=o=>s.value.email=o),class:"formControls_input",type:"text",id:"email",name:"email",placeholder:"請輸入 email",required:""},null,512),[[c,s.value.email]]),t.value.email?(n(),r("span",N,m(t.value.email),1)):d("",!0),q,u(e("input",{"onUpdate:modelValue":a[1]||(a[1]=o=>s.value.nickname=o),class:"formControls_input",type:"text",name:"name",id:"name",placeholder:"請輸入您的暱稱"},null,512),[[c,s.value.nickname]]),t.value.nickname?(n(),r("span",B,m(t.value.nickname),1)):d("",!0),L,u(e("input",{"onUpdate:modelValue":a[2]||(a[2]=o=>s.value.password=o),class:"formControls_input",type:"password",name:"pwd",id:"pwd",placeholder:"請輸入密碼",required:""},null,512),[[c,s.value.password]]),t.value.password?(n(),r("span",R,m(t.value.password),1)):d("",!0),D,u(e("input",{"onUpdate:modelValue":a[3]||(a[3]=o=>s.value.password2=o),class:"formControls_input",type:"password",name:"pwd",id:"pwd-check",placeholder:"請再次輸入密碼",required:""},null,512),[[c,s.value.password2]]),s.value.password!==s.value.password2?(n(),r("span",I,"密碼不一致")):d("",!0),t.value.password?(n(),r("span",M,m(t.value.password),1)):d("",!0),e("button",{type:"button",class:"formControls_btnSubmit",onClick:v},"註冊帳號"),f(p,{to:"/",class:"formControls_btnLink"},{default:g(()=>[b("登入")]),_:1})])])])])}}};export{$ as default};
