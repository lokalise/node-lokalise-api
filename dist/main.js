var i=class{constructor(e){for(let t of Object.keys(e))this[t]=e[t]}};var b=class extends i{};import{readFile as Ke}from"node:fs/promises";function Ue(){return"../../package.json"}async function j(){let n;try{let e=await Ke(new URL(Ue(),import.meta.url));n=JSON.parse(e.toString())}catch{n=null}return n?n.version:"unknown"}var p=class n extends Error{code;details;constructor(e,t,r){super(e),this.code=t,this.details=r,Object.setPrototypeOf(this,n.prototype)}};var T=class{promise;params={};urlRoot="https://api.lokalise.com/api2/";constructor(e,t,r,o,l){this.params={...o},this.promise=this.createPromise(e,t,r,l)}async createPromise(e,t,r,o){let l=this.composeURI(`/${o.version}/${e}`),c=o.host??this.urlRoot,u=await this.buildHeaders(o,t,r),De={method:t,headers:u,...t!=="GET"&&r?{body:JSON.stringify(r)}:{}},Se=new URL(l,c);return Se.search=new URLSearchParams(this.params).toString(),this.fetchAndHandleResponse(Se,De,o.requestTimeout)}async fetchAndHandleResponse(e,t,r){let o=new AbortController,l=null;r&&r>0&&(l=setTimeout(()=>o.abort(),r));try{let c=await fetch(e,{...t,signal:o.signal});return this.processResponse(c)}catch(c){return c instanceof Error?c.name==="AbortError"?Promise.reject(new p(c.message,408,{reason:"timeout"})):Promise.reject(new p(c.message,500,{reason:"network or fetch error"})):Promise.reject(new p("An unknown error occurred",500,{reason:String(c)}))}finally{l&&clearTimeout(l)}}async processResponse(e){let t=null;try{e.status!==204&&(t=await e.json())}catch(r){return Promise.reject(new p(r.message,e.status,{statusText:e.statusText,reason:"JSON processing failed"}))}return e.ok?{json:t,headers:e.headers}:Promise.reject(this.getErrorFromResp(t))}getErrorFromResp(e){if(!e||typeof e!="object")return new p("An unknown error occurred",500,{reason:"unexpected response format"});let t=e;if(typeof t.message=="string"&&typeof t.statusCode=="number"&&typeof t.error=="string")return new p(t.message,t.statusCode,{reason:t.error});if(t.error&&typeof t.error=="object"){let{message:r="Unknown error",code:o=500,details:l}=t.error;return new p(String(r),typeof o=="number"?o:500,l??{reason:"server error without details"})}return typeof t.message=="string"&&(typeof t.code=="number"||typeof t.errorCode=="number")?new p(t.message,typeof t.code=="number"?t.code:t.errorCode,t.details??{reason:"server error without details"}):new p("An unknown error occurred",500,{reason:"unhandled error format",data:e})}async buildHeaders(e,t,r){let o=new Headers({Accept:"application/json","User-Agent":`node-lokalise-api/${await j()}`});return o.append(e.authHeader,e.tokenType.length>0?`${e.tokenType} ${e.token}`:e.token),e.enableCompression&&o.append("Accept-Encoding","gzip,deflate"),t!=="GET"&&r&&o.append("Content-type","application/json"),o}composeURI(e){let t=/{(!{0,1}):(\w*)}/g,r=e.replace(t,this.mapUriParams());return r.endsWith("/")?r.slice(0,-1):r}mapUriParams(){return(e,t,r)=>{if(this.params[r]!=null){let o=String(this.params[r]);return delete this.params[r],o}if(t==="!")throw new Error(`Missing required param: ${r}`);return""}}};var y=class{totalResults;totalPages;resultsPerPage;currentPage;items;constructor(e,t){this.totalResults=this.safeParseInt(t.get("x-pagination-total-count")),this.totalPages=this.safeParseInt(t.get("x-pagination-page-count")),this.resultsPerPage=this.safeParseInt(t.get("x-pagination-limit")),this.currentPage=this.safeParseInt(t.get("x-pagination-page")),this.items=e}hasNextPage(){return this.currentPage>0&&this.currentPage<this.totalPages}hasPrevPage(){return this.currentPage>1}isLastPage(){return!this.hasNextPage()}isFirstPage(){return!this.hasPrevPage()}nextPage(){return this.isLastPage()?this.currentPage:this.currentPage+1}prevPage(){return this.isFirstPage()?this.currentPage:this.currentPage-1}safeParseInt(e){return!e||Number.isNaN(Number(e))?0:Number.parseInt(e,10)}};var k=class extends y{nextCursor;constructor(e,t){super(e,t),this.nextCursor=t.get("x-pagination-next-cursor")}hasNextCursor(){return this.nextCursor!==null}};var m=class{clientData;static endpoint;static prefixURI;constructor(e){this.clientData=e}get rootElementName(){throw new Error("Root element name is not defined for this collection")}get rootElementNameSingular(){throw new Error("Root element name singular is not defined for this collection")}get secondaryElementClass(){throw new Error("Secondary elements are not supported by this collection")}get secondaryElementNameSingular(){throw new Error("Secondary element name singular is not defined for this collection")}doList(e){let t={...e};return this.createPromise("GET",t,this.populateArrayFromJson,null)}doListCursor(e){let t={...e};return this.createPromise("GET",t,this.populateArrayFromJsonCursor,null)}doGet(e,t={}){let r={...t,id:e};return this.createPromise("GET",r,this.populateObjectFromJsonRoot,null)}doDelete(e,t={}){let r={...t,id:e};return this.createPromise("DELETE",r,this.returnBareJSON,null)}doCreate(e,t={},r=this.populateObjectFromJson){let o={...t};return this.createPromise("POST",o,r,e)}doCreateArray(e,t,r=this.populateArray){let o={...t};return this.createPromise("POST",o,r,e)}doUpdate(e,t,r,o=this.populateObjectFromJsonRoot,l="PUT"){let c={...r,id:e};return this.createPromise(l,c,o,t)}populateObjectFromJsonRoot(e,t){let r=e,o=this.rootElementNameSingular;if(this.rootElementNameSingular&&o&&(r=r[o],!r))throw new Error(`Missing property '${o}' in JSON object`);return this.populateObjectFromJson(r,t)}populateSecondaryObjectFromJsonRoot(e,t){let r=this.secondaryElementNameSingular,l=e[r];if(!l)throw new Error(`Missing property '${r}' in JSON object`);return this.populateObjectFromJson(l,t,!0)}populateArrayFromJsonBulk(e,t){let r=this.rootElementName,o=e[r];if(!Array.isArray(o))throw new Error(`Expected an array under '${r}', but got ${typeof o}`);let l=o.map(u=>this.populateObjectFromJson(u,t));return{errors:e.errors,items:l}}populateArrayFromJson(e,t){let r=this.populateArray(e,t);return this.isPaginated(t)?new y(r,t):r}populateArray(e,t){let r=this.rootElementName,o=e[r];if(!Array.isArray(o))throw new Error(`Expected an array under '${r}', but got ${typeof o}`);return o.map(l=>this.populateObjectFromJson(l,t))}populateArrayFromJsonCursor(e,t){let r=this.rootElementName,o=e[r];if(!Array.isArray(o))throw new Error(`Expected an array under '${r}', but got ${typeof o}`);let l=o.map(c=>this.populateObjectFromJson(c,t));return new k(l,t)}populateObjectFromJson(e,t,r=!1){let o=r?this.secondaryElementClass:this.elementClass;return new o(e)}returnBareJSON(e){return e}objToArray(e){return Array.isArray(e)?e:[e]}async createPromise(e,t,r,o,l=null){let c=this.prepareRequest(e,o,t,l),u=await this.sendRequest(c);return r.call(this,u.json,u.headers)}prepareRequest(e,t,r,o){return new T(this.getUri(o),e,t,r,this.clientData)}sendRequest(e){return e.promise}getUri(e){let t=this.constructor,r=e??t.prefixURI;if(!r)throw new Error("No URI or prefixURI provided.");return r}isPaginated(e){return!!e.get("x-pagination-total-count")&&!!e.get("x-pagination-page")}};var x=class extends m{static prefixURI="projects/{!:project_id}/branches/{:id}";get elementClass(){return b}get rootElementName(){return"branches"}get rootElementNameSingular(){return"branch"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}merge(e,t,r={}){let o={...t,id:e};return this.createPromise("POST",o,this.returnBareJSON,r,"projects/{!:project_id}/branches/{:id}/merge")}};var R=class extends i{};var O=class extends m{static prefixURI="projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";get elementClass(){return R}get rootElementName(){return"comments"}get rootElementNameSingular(){return"comment"}list(e){return this.doList(e)}create(e,t){let r={comments:this.objToArray(e)};return this.doCreateArray(r,t)}get(e,t){return this.doGet(e,t)}delete(e,t){return this.doDelete(e,t)}list_project_comments(e){return this.createPromise("GET",e,this.populateArrayFromJson,null,"projects/{!:project_id}/comments")}};var w=class extends i{};var C=class extends m{static prefixURI="projects/{!:project_id}/contributors/{:id}";get elementClass(){return w}get rootElementName(){return"contributors"}get rootElementNameSingular(){return"contributor"}list(e){return this.doList(e)}create(e,t){let r={contributors:this.objToArray(e)};return this.doCreateArray(r,t)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}};var S=class extends i{};var f=class extends i{};var B=class extends m{static prefixURI="projects/{!:project_id}/files/{:id}";get elementClass(){return S}get rootElementName(){return"files"}get secondaryElementClass(){return f}get secondaryElementNameSingular(){return"process"}list(e){return this.doList(e)}upload(e,t){return this.createPromise("POST",{project_id:e},this.populateSecondaryObjectFromJsonRoot,t,"projects/{!:project_id}/files/upload")}download(e,t){return this.createPromise("POST",{project_id:e},this.returnBareJSON,t,"projects/{!:project_id}/files/download")}delete(e,t){return this.doDelete(e,t)}};var D=class extends i{};var K=class extends m{static prefixURI="projects/{!:project_id}/tokens";get elementClass(){return D}create(e,t={service:"ota"}){let r={project_id:e};return this.doCreate(t,r,this.populateObjectFromJson)}};var U=class extends i{};var E=class extends m{static prefixURI="projects/{!:project_id}/keys/{:id}";get elementClass(){return U}get rootElementName(){return"keys"}get rootElementNameSingular(){return"key"}list(e){return this.doListCursor(e)}create(e,t){return this.createPromise("POST",t,this.populateArrayFromJsonBulk,e)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}bulk_update(e,t){return this.createPromise("PUT",t,this.populateArrayFromJsonBulk,e,"projects/{!:project_id}/keys")}bulk_delete(e,t){let r={keys:this.objToArray(e)};return this.createPromise("DELETE",t,this.returnBareJSON,r,"projects/{!:project_id}/keys")}};var I=class extends i{};var A=class extends m{static prefixURI="projects/{!:project_id}/languages/{:id}";get elementClass(){return I}get rootElementName(){return"languages"}get rootElementNameSingular(){return"language"}system_languages(e={}){return this.createPromise("GET",e,this.populateArrayFromJson,null,"system/languages")}list(e){return this.doList(e)}create(e,t){let r={languages:this.objToArray(e)};return this.createPromise("POST",t,this.populateArrayFromJsonBulk,r)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return super.doDelete(e,t)}};var v=class extends i{};var F=class extends m{static prefixURI="teams/{!:team_id}/orders/{:id}";get elementClass(){return v}get rootElementName(){return"orders"}get rootElementNameSingular(){return null}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}get(e,t){return this.doGet(e,t)}};var N=class extends i{};var L=class extends m{static prefixURI="payment_cards/{:id}";get elementClass(){return N}get rootElementName(){return"payment_cards"}get rootElementNameSingular(){return"payment_card"}list(e={}){return this.doList(e)}create(e){return this.doCreate(e)}get(e){return this.doGet(e)}delete(e){return this.doDelete(e)}};var J=class extends i{};var G=class extends m{static prefixURI="teams/{!:team_id}/roles";get elementClass(){return J}get rootElementName(){return"roles"}list(e){return this.doList(e)}};var M=class extends i{};var W=class extends m{static prefixURI="projects/{:id}";get elementClass(){return M}get rootElementName(){return"projects"}get rootElementNameSingular(){return null}list(e={}){return this.doList(e)}create(e){return this.doCreate(e)}get(e){return this.doGet(e)}update(e,t){return this.doUpdate(e,t,{},this.populateObjectFromJson)}delete(e){return this.doDelete(e)}empty(e){return this.createPromise("PUT",{project_id:e},this.returnBareJSON,null,"projects/{!:project_id}/empty")}};var H=class extends m{static prefixURI="projects/{!:project_id}/processes/{:id}";get elementClass(){return f}get rootElementName(){return"processes"}get rootElementNameSingular(){return"process"}list(e){return this.doList(e)}get(e,t){return this.doGet(e,t)}};var q=class extends i{};var z=class extends m{static prefixURI="projects/{!:project_id}/screenshots/{:id}";get elementClass(){return q}get rootElementName(){return"screenshots"}get rootElementNameSingular(){return"screenshot"}list(e){return this.doList(e)}create(e,t){let r={screenshots:this.objToArray(e)};return this.createPromise("POST",t,this.populateArrayFromJsonBulk,r)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}};var $=class extends i{};var Q=class extends m{static prefixURI="projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";get elementClass(){return $}get rootElementName(){return"segments"}get rootElementNameSingular(){return"segment"}list(e){return this.doList(e)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}};var V=class extends i{};var X=class extends m{static prefixURI="projects/{!:project_id}/snapshots/{:id}";get elementClass(){return V}get rootElementName(){return"snapshots"}get rootElementNameSingular(){return"snapshot"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}restore(e,t){let r={...t,id:e};return this.createPromise("POST",r,this.returnBareJSON,{})}delete(e,t){return this.doDelete(e,t)}};var Y=class extends i{};var Z=class extends m{static prefixURI="projects/{!:project_id}/tasks/{:id}";get elementClass(){return Y}get rootElementName(){return"tasks"}get rootElementNameSingular(){return"task"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}};var ee=class extends i{};var te=class extends m{static prefixURI="teams/{!:team_id}/billing_details";get elementClass(){return ee}get(e){let t={team_id:e};return this.createPromise("GET",t,this.populateObjectFromJson,null)}create(e,t){return this.doCreate(e,t)}update(e,t){let r={team_id:e};return this.createPromise("PUT",r,this.populateObjectFromJson,t)}};var re=class extends i{};var se=class extends m{static prefixURI="teams/{!:team_id}/users/{:id}";get elementClass(){return re}get rootElementName(){return"team_users"}get rootElementNameSingular(){return"team_user"}list(e){return this.doList(e)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}};var ae=class extends i{};var ne=class extends m{static prefixURI="teams";get elementClass(){return ae}get rootElementName(){return"teams"}list(e={}){return this.doList(e)}};var oe=class extends i{};var ie=class extends m{static prefixURI="teams/{!:team_id}/translation_providers/{:id}";get elementClass(){return oe}get rootElementName(){return"translation_providers"}get rootElementNameSingular(){return null}list(e){return this.doList(e)}get(e,t){return this.doGet(e,t)}};var me=class extends i{};var le=class extends m{static prefixURI="projects/{!:project_id}/custom_translation_statuses/{:id}";get elementClass(){return me}get rootElementName(){return"custom_translation_statuses"}get rootElementNameSingular(){return"custom_translation_status"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}available_colors(e){return this.createPromise("GET",e,this.returnBareJSON,{},"projects/{!:project_id}/custom_translation_statuses/colors")}};var ce=class extends i{};var de=class extends m{static prefixURI="projects/{!:project_id}/translations/{:id}";get elementClass(){return ce}get rootElementName(){return"translations"}get rootElementNameSingular(){return"translation"}list(e){return this.doListCursor(e)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}};var pe=class extends i{};var ue=class extends m{static prefixURI="teams/{!:team_id}/groups/{:id}";get elementClass(){return pe}get rootElementName(){return"user_groups"}get rootElementNameSingular(){return null}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateGroupFromJsonRoot)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r,this.populateGroupFromJsonRoot)}delete(e,t){return this.doDelete(e,t)}add_members_to_group(e,t,r){let o={team_id:e,group_id:t},l={users:r};return this.createPromise("PUT",o,this.populateGroupFromJsonRoot,l,"teams/{!:team_id}/groups/{!:group_id}/members/add")}remove_members_from_group(e,t,r){let o={team_id:e,group_id:t},l={users:r};return this.createPromise("PUT",o,this.populateGroupFromJsonRoot,l,"teams/{!:team_id}/groups/{!:group_id}/members/remove")}add_projects_to_group(e,t,r){let o={team_id:e,group_id:t},l={projects:r};return this.createPromise("PUT",o,this.populateGroupFromJsonRoot,l,"teams/{!:team_id}/groups/{!:group_id}/projects/add")}remove_projects_from_group(e,t,r){let o={team_id:e,group_id:t},l={projects:r};return this.createPromise("PUT",o,this.populateGroupFromJsonRoot,l,"teams/{!:team_id}/groups/{!:group_id}/projects/remove")}populateGroupFromJsonRoot(e,t){let r=e.group;return this.populateObjectFromJson(r,t)}};var ge=class extends i{};var be=class extends m{static prefixURI="projects/{!:project_id}/webhooks/{:id}";get elementClass(){return ge}get rootElementName(){return"webhooks"}get rootElementNameSingular(){return"webhook"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}regenerate_secret(e,t){let r={...t,id:e};return this.createPromise("PATCH",r,this.returnBareJSON,null,"projects/{!:project_id}/webhooks/{:id}/secret/regenerate")}};var g=class{clientData={token:"",tokenType:"",authHeader:"x-api-token",enableCompression:!1,requestTimeout:void 0};constructor(e){let t=e.apiKey;if(!t||t.trim().length===0)throw new Error("Instantiation failed: Please pass an API key");this.clientData.token=t,this.clientData.enableCompression=e.enableCompression??!1,this.clientData.host=e.host,this.clientData.requestTimeout=e.requestTimeout}};var _=class extends g{constructor(e){super(e),this.clientData.version=e.version??"api2"}branches(){return new x(this.clientData)}comments(){return new O(this.clientData)}contributors(){return new C(this.clientData)}files(){return new B(this.clientData)}jwt(){return new K(this.clientData)}keys(){return new E(this.clientData)}languages(){return new A(this.clientData)}orders(){return new F(this.clientData)}paymentCards(){return new L(this.clientData)}permissionTemplates(){return new G(this.clientData)}projects(){return new W(this.clientData)}queuedProcesses(){return new H(this.clientData)}screenshots(){return new z(this.clientData)}segments(){return new Q(this.clientData)}snapshots(){return new X(this.clientData)}tasks(){return new Z(this.clientData)}teams(){return new ne(this.clientData)}teamUsers(){return new se(this.clientData)}teamUserBillingDetails(){return new te(this.clientData)}translations(){return new de(this.clientData)}translationProviders(){return new ie(this.clientData)}translationStatuses(){return new le(this.clientData)}userGroups(){return new ue(this.clientData)}webhooks(){return new be(this.clientData)}};var Re=class extends _{constructor(e){super(e),this.clientData.tokenType=e.tokenType??"Bearer",this.clientData.authHeader="Authorization"}};var ye=class extends i{};var d=class extends m{doDelete(e,t){let r={...t,id:e};return this.createPromise("DELETE",r,this.returnJSONFromData,null)}returnJSONFromData(e){return e.data}async createVoidPromise(e,t,r,o=null){let l=this.prepareRequest(e,r,t,o);return await this.sendRequest(l),null}};var fe=class extends d{static prefixURI="teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";get elementClass(){return ye}get rootElementName(){return"data"}get rootElementNameSingular(){return"data"}list(e){return this.doList(e)}get(e,t){return this.doGet(e,t)}update(e,t,r){return this.doUpdate(e,t,r,this.populateObjectFromJsonRoot,"PATCH")}delete(e,t){return this.doDelete(e,t)}};var _e=class extends d{static prefixURI="teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";get elementClass(){return b}publish(e,t){let r={...t,action:"publish"};return this.createVoidPromise("POST",r,{bundleId:e})}stage(e,t){let r={...t,action:"stage"};return this.createVoidPromise("POST",r,{bundleId:e})}};var Pe=class extends i{};var he=class extends d{static prefixURI="teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";get elementClass(){return Pe}get rootElementName(){return"data"}get rootElementNameSingular(){return"data"}list(e){return this.doList(e)}create(e,t){return this.doCreate(e,t,this.populateObjectFromJsonRoot)}update(e,t,r){return this.doUpdate(e,t,r)}delete(e,t){return this.doDelete(e,t)}};var je=class extends i{};var Te=class extends d{static prefixURI="teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";get elementClass(){return je}get rootElementName(){return"data"}get rootElementNameSingular(){return"data"}list(e){return this.doList(e)}create(e){return this.doCreate(null,e,this.populateObjectFromJsonRoot)}delete(e,t){return this.doDelete(e,t)}};var P=class extends i{};var ke=class extends d{static prefixURI="teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";static elementClass=P;get elementClass(){return P}get(e,t){let r={...t,...e};return this.createPromise("GET",r,this.populateObjectFromJson,null)}};var Oe=class extends g{constructor(e){super(e),this.clientData.tokenType=e.tokenType??"Bearer",this.clientData.authHeader="Authorization",this.clientData.host=this.clientData.host??"https://ota.lokalise.com",this.clientData.version=e.version??"v3"}otaBundleManagement(){return new fe(this.clientData)}otaBundlePublishing(){return new _e(this.clientData)}otaUsageStatistics(){return new ke(this.clientData)}otaFreezePeriods(){return new he(this.clientData)}otaSdkTokens(){return new Te(this.clientData)}};var h=class extends i{};var xe=class extends d{static rootElementNameSingular="data";static prefixURI="lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";static elementClass=h;get elementClass(){return h}get rootElementNameSingular(){return"data"}get(e,t){let r={...t,...e};return this.createPromise("GET",r,this.populateObjectFromJsonRoot,null)}};var we=class extends g{constructor(e){super(e),this.clientData.authHeader="x-ota-api-token",this.clientData.host=this.clientData.host??"https://ota.lokalise.com",this.clientData.version=e.version??"v3"}otaBundles(){return new xe(this.clientData)}};async function Ee(){return new Headers({Accept:"application/json","User-Agent":`node-lokalise-api/${await j()}`,"Content-type":"application/json"})}async function Ie(n,e){try{let t=await fetch(n,e),r=await t.json();if(t.ok)return{json:r,headers:t.headers};let o={code:t.status,...r};return Promise.reject(o)}catch(t){let r={error:t.message,code:500,error_description:""};return Promise.reject(r)}}async function Be(n,e,t,{host:r,version:o}){let l=`/${o}/${n}`,c=new URL(l,r),u={method:e,headers:await Ee(),body:JSON.stringify(t)};return Ie(c,u)}var Ce=class{authData;constructor(e,t,r="https://app.lokalise.com",o="oauth2"){if(!e||!t)throw new Error("Error: Instantiation failed: Please pass client ID and client secret");this.authData={client_id:e,client_secret:t,host:r,version:o}}auth(e,t,r){let o=Array.isArray(e)?e.join(" "):e,l={client_id:this.authData.client_id,scope:o,...r&&{state:r},...t&&{redirect_uri:t}};return this.buildUrl(l)}token(e){let t={...this.baseParams(),code:e,grant_type:"authorization_code"};return this.doRequest(t)}refresh(e){let t={...this.baseParams(),refresh_token:e,grant_type:"refresh_token"};return this.doRequest(t)}async doRequest(e){try{return(await Be("token","POST",e,this.authData)).json}catch(t){throw this.handleReject(t)}}buildUrl(e){let t=new URL("auth",this.authData.host);return t.search=new URLSearchParams(e).toString(),t.toString()}baseParams(){return{client_id:this.authData.client_id,client_secret:this.authData.client_secret}}handleReject(e){return e}};export{_ as LokaliseApi,Re as LokaliseApiOAuth,Oe as LokaliseApiOta,Ce as LokaliseAuth,we as LokaliseOtaBundles};
//# sourceMappingURL=main.js.map