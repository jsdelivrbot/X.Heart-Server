webpackJsonp([4],{NSSj:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("Dd8w"),s=e.n(i),o=e("kvay"),a=e("NYxO"),c=e("m40h"),r=e("T452"),u=e("PvFA"),d={data:function(){return{songs:[]}},computed:s()({},Object(a.c)(["disc"]),{title:function(){return this.disc.dissname},bgImage:function(){return this.disc.imgurl}}),created:function(){this._getSongList()},methods:{_getSongList:function(){var t=this;this.disc.dissid?Object(c.c)(this.disc.dissid).then(function(n){n.code===r.a&&(t.songs=t._normalizeSongs(n.cdlist[0].songlist))}):this.$router.push("/recommend")},_normalizeSongs:function(t){var n=[];return t.forEach(function(t){t.songid&&t.albumid&&n.push(Object(u.a)(t))}),n}},components:{MusicList:o.a}},m={render:function(){var t=this.$createElement,n=this._self._c||t;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{title:this.title,"bg-image":this.bgImage,songs:this.songs}})],1)},staticRenderFns:[]};var f=e("VU/8")(d,m,!1,function(t){e("ucCB")},"data-v-bca2cb2a",null);n.default=f.exports},m40h:function(t,n,e){"use strict";n.b=function(){var t=a()({},r.b,{platform:"h5",uin:0,needNewCode:1});return Object(c.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t,r.c)},n.a=function(){var t=a()({},r.b,{picmid:1,rnd:Math.random,g_tk:5381,loginUin:0,hostUin:0,format:"json",notice:0,platform:"yqq",needNewCode:0,categoryId:1e7,sortId:5,sin:0,ein:29});return d.a.get("/api/getDiscList",{params:t}).then(function(t){return s.a.resolve(t.data)})},n.c=function(t){var n=a()({},r.b,{disstid:t,type:1,json:1,utf8:1,onlysong:0,format:"json",platform:"yqq",hostUin:0,needNewCode:0});return d.a.get("/api/disc",{params:n}).then(function(t){return s.a.resolve(t.data)})};var i=e("//Fk"),s=e.n(i),o=e("woOf"),a=e.n(o),c=e("Gak4"),r=e("T452"),u=e("mtWM"),d=e.n(u)},ucCB:function(t,n){}});
//# sourceMappingURL=4.5994c7046b30f2f662d4.js.map