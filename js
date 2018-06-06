/**
 * 用作前端后台交互用的中枢函数  
 * @author zhy	find404@foxmail.com
 * @create_time 2018年6月4日 17:29:33  
 */
var interactiveCenter = {
        //字符串相关
		String : {
            //最后一位
			Position	: function(OriginalString){
				return	OriginalString.charAt(OriginalString.length-1);
			},
            //替换字符串操作
			Replace		: function(OriginalString,factString){
				return	OriginalString.substring(0,OriginalString.length-1)+factString;
			},
            //去除最后一位操作
			Trim		: function(OriginalString){
				return	OriginalString.substring(0,OriginalString.length-1);
			},
            //判断长度
			Tength		: function(OriginalString){
				return (!(/^\S{2,10}$/.test(OriginalString)));  
			},											
            //判断长度            
			Tength100	: function(OriginalString){
				return (!(/^\S{2,100}$/.test(OriginalString)));  
			},
            //根据关键字从左至右截取后面的值。
			CutKeyword  : function(OriginalString,Keyword){
				return OriginalString.substring(OriginalString.indexOf(Keyword)+1);  
			},
            //根据关键字从右至左截取后面的值。
			CutLastKeyword  : function(OriginalString,Keyword){
				return OriginalString.substring(OriginalString.lastIndexOf(Keyword)+1);  
			},
            //字符串通过关键字转换数组
			ConvertsKeyword : function(OriginalString,Keyword){
				return OriginalString.split(/\,/);  
			},
		},
        //时间相关
		Time :{
            //时间戳转换月日时秒
			TimeStampMDHS		: function(Ttime){
					var date = new Date(Ttime * 1000);
					var M = (date.getMonth()+1 		< 10)   ? 	'0'+(date.getMonth()+1)		: date.getMonth()+1;
					var H = (date.getHours()+1		< 10)   ? 	'0'+(date.getHours())   	: date.getHours();
					var S = (date.getMinutes()+1	< 10)	? 	'0'+(date.getMinutes()) 	: date.getMinutes();
					var D = (date.getDate()			< 10)   ?	'0'+date.getDate()			: date.getDate()+'';
				return (M+'-'+D+' '+H+':'+S);   
			},
            //时间戳转换月日
			TimeStampMD		: function(Ttime){
					var date = new Date(Ttime * 1000);
					var M = (date.getMonth()+1 		< 10)   ? 	'0'+(date.getMonth()+1)		: date.getMonth()+1;
					var D = (date.getDate()			< 10)   ?	'0'+date.getDate()			: date.getDate()+'';
				return (M+'-'+D);   
			},
		},
		Verif :{
            //判断Y-M-D时间
			DateYmd		: function(DateString) {
					var result = DateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
					var d 		= new Date(result[1], result[3] - 1, result[4]);
				return (d.getFullYear() == parseInt(result[1]) && (d.getMonth() + 1) == parseInt(result[3]) && (d.getDate()) == parseInt(result[4]));
			},
            //判断H:M:S时间
			DateHms		: function(DateString) {
					var Hms = DateString.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
				return (Hms[1]>24 || Hms[3]>60 || Hms[4]>60);
			},
            //判断Y-M-D  H:M:S时间
			DateYmdHms		: function(DateString) {
					var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
					var result = str.match(reg); 
					var d= new Date(result[1], result[3]-1,result[4],result[5],result[6],result[7]); 
				return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
			},
            //验证手机号码
			Phone			: function(phone){
				return !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone));
			},
            //验证邮箱
			Email			: function(Email){
				return !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(Email));
			},
            //验证密码，6-16位数字字母
			Password		: function(Password){
				return !(/^[A-Za-z0-9]{6,20}$/.test(Password));
			},
			InitCondition	 : {
                                //初始化条件                
								Func		: '',
                                //方法名
								Div			: '',
                                //那一个DIV下的
								Label		: ' input',
                                //默认标签
								Status		: 0,
							   },
            //发送数据层
			Condition		: {},
            //验证主体
			Main		 	: function(){										
								var _this = this;
								$(this.InitCondition.Div+this.InitCondition.Label).each(function(k,v){
									if($(this)[0].type != 'checkbox'){
										if($(this).val()== ''){
											CommonFunction.Prompt.Tan($(this)[0].placeholder);
											_this.InitCondition.Status = 0;
											return false;
										}
										if($(this).attr('Func')){
											var FunArray = CommonFunction.String.ConvertsKeyword($(this).attr('Func'));
											if(CommonFunction[FunArray[0]][FunArray[1]]($(this).val())){
												CommonFunction.Prompt.Tan(CommonFunction.String.CutKeyword($(this)[0].placeholder,'的')+'输入的格式有误，请更正后在填写！');
												_this.InitCondition.Status = 0;
												return false;
											}
										}
										_this.Condition[$(this)[0].name] =$(this).val();
										_this.InitCondition.Status = 1;
									}
								})
           },            
		},
        //弹出层部分
		Prompt :{
			Tan  		: function(msg){
				layer.open({
				   content: msg,
				   time: 2
				});
				return false;
			},
		},
        //链接跳转
		Link   :{
			Href		: function(url,second){					
					setTimeout("window.location.href='"+url+"'",(second) ? second : 3000);
			},
		},
        //加密解密       
		SecretKey :{
			JsB64 		: function(str){
								var c1, c2, c3;
								var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";        
								var i = 0, len= str.length, JsB64String = '';
								while (i < len){
									c1 = str.charCodeAt(i++) & 0xff;
									if (i == len){
										JsB64String += base64EncodeChars.charAt(c1 >> 2);
										JsB64String += base64EncodeChars.charAt((c1 & 0x3) << 4);
										JsB64String += "==";
										break;
									}
									c2 = str.charCodeAt(i++);
									if (i == len){
										JsB64String += base64EncodeChars.charAt(c1 >> 2);
										JsB64String += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
										JsB64String += base64EncodeChars.charAt((c2 & 0xF) << 2);
										JsB64String += "=";
										break;
									}
									c3 = str.charCodeAt(i++);
									JsB64String += base64EncodeChars.charAt(c1 >> 2);
									JsB64String += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
									JsB64String += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
									JsB64String += base64EncodeChars.charAt(c3 & 0x3F);
								}
								return JsB64String;
			},
		},
        //AJAX部分
		Ajax   :{
            //准备数据
			IntendData	 : {
                            //页面翻页
							StopgapPage		: 0,
                            //回调回来的数据产生点                            
							Obj				: 'data.data',
							Code			: 200,
                            //默认用既定AJAX模式
							SwitchMain		: '',
                            //改变的页面class							
							ChangeHtml		: '',
                            //当无数据时候的class
							NullHtml		: '',
                            //默认提示消息值
							Message			: 'msg',
                            //置换的产生HTML代码层
							Url				: window.location.pathname,
							//通过请求回来的数据
                            Operation		: 'post',
                            //设置默认读取html缓存KEY，如果不用缓存的情况下，只是单纯的存储
							CacheHtmlKey	: 'Stopgap',
                            //设置默认读取ajax数据缓存KEY，如果不用缓存的情况下，只是单纯的存储
							CacheDataKey	: 'Stopgap',
                            //默认点击事件发起点
							ClickPosition	: '.ClickEvent',
                            //后置事件，配合点击事件用
							SuccessEvet		: '',
							SubstituteMode  : '',
							htmlModeOne 	: 'html',
							htmlModeTwo 	: 'append',
							CallbackMode 	: 'Prompt',
			},
            //Html缓存层
			CacheHtml	 : {
							Stopgap	: '',
			},
            //数据缓存层
			CacheData	 : {
							Stopgap	: '',
			},
            //接受POST数据缓存层                
			Interactive	 : [],

            Send           : function(){
                var _this = this ;
                $.when($[this.IntendData.Operation](this.IntendData.Url,this.Interactive[0]))
                .done(function(data){
                    if(data){
                        //缓存数据
                        _this.CacheData[_this.IntendData.CacheHtmlKey] 		= 	data;
                        if(_this.CacheData[_this.IntendData.CacheHtmlKey].code== _this.IntendData.Code){
                            switch (this.IntendData.CallbackMode)
                            {
                            case 'Prompt':
                                 CommonFunction.Prompt.Tan(BringAjax.CacheData[BringAjax.IntendData.CacheHtmlKey].msg);
                                if($.isEmptyObject(_this.Interactive[1]) != false){
                                    _this.Interactive[1](_this.CacheData[_this.IntendData.CacheHtmlKey]);
                                }
                              break;
                            case 'page':
                                //默认用既定AJAX模式，
                                if($.isEmptyObject(_this.CacheData[_this.IntendData.CacheHtmlKey].data) == false){
                                    _this.Interactive[1]();
                                    _this.IntendData.SubstituteMode = (_this.IntendData.StopgapPage==0)  ? _this.IntendData.htmlModeOne  : _this.IntendData.htmlModeTwo;
                                    $(_this.IntendData.ChangeHtml)[_this.IntendData.SubstituteMode](_this.CacheHtml[_this.IntendData.CacheHtmlKey]);
                                }else{
                                    (_this.IntendData.StopgapPage==0) ?	$(_this.IntendData.NullHtml).show() : $('.loading').html('没有了~~');
                                }
                              break;
                            }
                        }else{
                            if(_this.Interactive[2]==undefined){
                                CommonFunction.Prompt.Tan(_this.CacheData[_this.IntendData.CacheHtmlKey][_this.IntendData.Message]);
                            }else{
                                _this.Interactive[2](_this.CacheData[_this.IntendData.CacheHtmlKey]);
                            }
                        }
                    }else{
                        if(_this.Interactive[3]==undefined){
                                CommonFunction.Prompt.Tan('网络错误！');
                        }else{
                                _this.Interactive[3];
                        }
                    }
                });
            },
            //简易过渡层
			plainLaunch		: function() {
                                this.Interactive = [];
                                this.Interactive.push(arguments[0]);	
                                this.Interactive.push(arguments[1]);
                                this.Interactive.push(arguments[2]);	
                                this.Interactive.push(arguments[3]);
                                this.Send();
            },
            //简易点击事件发起                
			clickLaunch		: function() {
                                var _this = this;
                                $(this.IntendData.ClickPosition).click(function(){
                                    _this.Interactive = [];
                                    _this.Interactive.push(arguments[0]);	
                                    _this.Interactive.push(arguments[1]);
                                    _this.Interactive.push(arguments[2]);	
                                    _this.Interactive.push(arguments[3]);
                                    _this.Send();
                                });
            },
                            
		},
}


 
