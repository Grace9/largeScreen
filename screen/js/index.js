	var url = "http://jrfp.znx-af.com/jrfp/statistics/"
	$(document).ready(function(){
		 	//时间撮转化
		 	function timestampToTime(timestamp) {
			      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			      Y = date.getFullYear() + '-';
			      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			      D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '&nbsp;';
			      h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':'
			      m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':'
			      s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			      return Y+M+D+h+m+s;
			  }
		 	$(".mapBox span").hover(function(){
	           var bg = $(this).attr('class');
	           $('.mapBox img').attr('src','images/'+bg+'.png');
	         })
		 	//地图点击事件
				$(".mapBox").on("click","span",function(){
						var bg = $(this).attr('class');
						var title = $(this).attr('title');
						$('.mapBox img').attr('src','images/'+bg+'.png')
						$(".information").show();
						$(".MapDisplay").show();
						$('.mapBodyTopImg img').attr('src','images/icon/'+bg+'.png')
						$.ajax({
				            url: url+"getAreaLoanDetail",
				            type:"get",
				            data:{"areaName":title},
				            dataType: 'json',
				            success:function(data){
					               console.log(data)
					               str = '<div class="mapnumber"><p>贷款总金额</p><p><span class="counter totals">'+data.total+'</span>元</p></div><div class="mapnumber"><p>龙头企业</p><p><span  class="counter enterprise">'+data.enterpriseCount+'</span>家</p></div>' 
				                   $(".mapBodyTopLeft").html(str);
				                   str1 = '<div class="mapnumber"><p>新型农业经营主体</p><p><span  class="counter cooper">'+data.cooperativeCount+'</span>家</p></div><div class="mapnumber"><p>农户</p><p><span class="counter farm">'+data.farmerCount+'</span>户</p></div>'
				                    $(".mapBodyTopRight").html(str1);
				                     $('.mapBodyTop  .counter').countUp();
				                    var mapBottom = document.getElementById("mapBottom");
					                var myChart2 = echarts.init(mapBottom);  
									var app = {};
									option2 = null;
									var xAxisData2 = data.areaNames;
									var data2 = data.quotas;
									option2 = {
										tooltip : {
									        trigger: 'axis',
									        axisPointer : {           
									            type : 'shadow',
									            Width : 20
									        }
									    },
									    xAxis: {
									        type: 'category',
									        data: xAxisData2,
									        axisLine:{
										        lineStyle:{
										            color:'#7cb8e8',
										            width:2
										        }
										    }
									    },
									    yAxis:{
							                type: 'value',
							                name: '单位（万元）',
									        axisLine:{
									          lineStyle:{
									              color:'#7cb8e8'
									          }
										    }
								        },
									    series: [
									    	{
									            type: 'bar',
									            itemStyle: {
									                normal: {color: 'rgba(18,30,48,.5)'}
									            },
									            barWidth : 20, 
									            barGap:'-100%',
									            barCategoryGap:'40%',
									            animation: false
									        },
									        {
									            type: 'bar',
									            itemStyle: {
									                color:"#fff"
									            },
									        	data: data2
									    	}
									    ]
									};
									myChart2.clear()
        							myChart2.setOption(option2,true); 
							       }
								});
						 
					})
			//三级服务体系点击事件
				$(".leftfirst").on("click",function(){
						$(".ServiceSystem").show();
						UserDetail()
				})
			//贷款类数据分析点击事件
				$(".rightTop").on("click",function(){
						$(".LoanAnalysis").show();
						LoanAnalysis();
				})
			//农户脱贫产业分布点击事件
				$(".rightMid").on("click",function(){
						$(".ShakeDistribution").show();
						IndustryDetailInfo();
				})
			//点击叉掉
				$(".cha").click(function(){
				$(this).parent().parent().hide();
				  $(".loanBodyBottomRight .nh .bar").animate({width:0},500);
	              $(".loanBodyBottomRight .hzs .bar").animate({width:0},500);
	              $(".loanBodyBottomRight .qy .bar").animate({width:0},500);
	              
	               $(".village .percentage").animate({width:0},500);
	               $(".country .percentage").animate({width:0},500);
	               $(".county .percentage").animate({width:0},500);
	               $(".bank .percentage").animate({width:0},500);
	               $(".province .percentage").animate({width:0},500);
			})
	 		//获取三级服务站体系数据
	　　	$.ajax({
		            url: url+"getOrganizationCount",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			               $("#countyCount").html(data.countyCount)
			               $("#townCount").html(data.townCount)
			               $("#userCount").html(data.userCount)
			               $("#villageCount").html(data.villageCount)
			               $('.leftfirst  .counter').countUp();
			            }
			});
	     	//新增数据实时刷新
			function real(){
				 	//获取三累计金融扶贫贷款金额及贷款类型数据分析
			　　$.ajax({
				            url: url+"getRealTimeLoanInfo",
				            type:"get",
				            dataType: 'json',
				            success:function(data){
				            	var loanUse,time,a;
					            str = ''
					            for(var i = 0 ;i<data.topFiveList.length;i++ ){
						              	if(data.topFiveList[i].loanUse == "1"){
							                loanUse = "林果业"  
						                }else if(data.topFiveList[i].loanUse == "2"){
						                    loanUse = "畜牧业"
						                }else if(data.topFiveList[i].loanUse == "3"){
						                    loanUse = "药材业"
						                }else if(data.topFiveList[i].loanUse == "4"){
						                    loanUse = "蔬菜业"
						                }else if(data.topFiveList[i].loanUse == "5"){
						                    loanUse = "食用菌"
						                }else if(data.topFiveList[i].loanUse == "6"){
						                    loanUse = "其他"
						                }else if(data.topFiveList[i].loanUse == "7"){
						                    loanUse = "【特色工业】农副产品深加工"
						                }else if(data.topFiveList[i].loanUse == "8"){
						                    loanUse = "【特色工业】其他"
						                }else if(data.topFiveList[i].loanUse == "9"){
						                    loanUse = "【现代服务业】生态旅游"
						                }else if(data.topFiveList[i].loanUse == "10"){
						                    loanUse = "【特色工业】中药材深加工"
						                }else if(data.topFiveList[i].loanUse == "11"){
						                    loanUse = "【现代服务业】电子商务"
						                }else if(data.topFiveList[i].loanUse == "12"){
						                    loanUse = "【现代服务业】其他"
						                }
						                time = timestampToTime(data.topFiveList[i].createDate)
						                if(data.topFiveList[i].address == null){
						                	a = "卢氏县"
						                }else{
						                	a = data.topFiveList[i].address
						                }
						              	str += '<div class="list clearfix"><div class="listTxt"><p> 名称：<span>'+data.topFiveList[i].name+'</span></p><p>贷款金额：<span>'+data.topFiveList[i].quota+'</span></p><p>贷款用途：<span>'+loanUse+'</span></p><p>所属地区：<span>'+a+'</span></p><p>申请时间：<span>'+time+'</span></p></div><div class="listImg"><img src="images/Headportrait.png"/></div></div>'
					            }
					              $("#lilist").html(str);
					              $("#totalAuditing").html(data.totalAuditing);
					              $("#totalAudited").html(data.totalAudited);
					          }
					}); 
				}
			function realAton(){
				 	//获取三累计金融扶贫贷款金额及贷款类型数据分析
			　　$.ajax({
				            url: url+"getRealTimeLoanInfo",
				            type:"get",
				            dataType: 'json',
				            success:function(data){
				            	var loanUse,time,a;
					            str = ''
					            for(var i = 0 ;i<data.topFiveList.length;i++ ){
						              	if(data.topFiveList[i].loanUse == "1"){
							                loanUse = "林果业"  
						                }else if(data.topFiveList[i].loanUse == "2"){
						                    loanUse = "畜牧业"
						                }else if(data.topFiveList[i].loanUse == "3"){
						                    loanUse = "药材业"
						                }else if(data.topFiveList[i].loanUse == "4"){
						                    loanUse = "蔬菜业"
						                }else if(data.topFiveList[i].loanUse == "5"){
						                    loanUse = "食用菌"
						                }else if(data.topFiveList[i].loanUse == "6"){
						                    loanUse = "其他"
						                }else if(data.topFiveList[i].loanUse == "7"){
						                    loanUse = "【特色工业】农副产品深加工"
						                }else if(data.topFiveList[i].loanUse == "8"){
						                    loanUse = "【特色工业】其他"
						                }else if(data.topFiveList[i].loanUse == "9"){
						                    loanUse = "【现代服务业】生态旅游"
						                }else if(data.topFiveList[i].loanUse == "10"){
						                    loanUse = "【特色工业】中药材深加工"
						                }else if(data.topFiveList[i].loanUse == "11"){
						                    loanUse = "【现代服务业】电子商务"
						                }else if(data.topFiveList[i].loanUse == "12"){
						                    loanUse = "【现代服务业】其他"
						                }
						                time = timestampToTime(data.topFiveList[i].createDate)
						                if(data.topFiveList[i].address == null){
						                	a = "卢氏县"
						                }else{
						                	a = data.topFiveList[i].address
						                }
						              	str += '<div class="list clearfix"><div class="listTxt"><p> 名称：<span>'+data.topFiveList[i].name+'</span></p><p>贷款金额：<span>'+data.topFiveList[i].quota+'</span></p><p>贷款用途：<span>'+loanUse+'</span></p><p>所属地区：<span>'+a+'</span></p><p>申请时间：<span>'+time+'</span></p></div><div class="listImg"><img src="images/Headportrait.png"/></div></div>'
					            }
					              $("#lilist2").html(str);
					              $("#totalAuditing").html(data.totalAuditing);
					              $("#totalAudited").html(data.totalAudited);
					          }
					}); 
				}
			real()
			var num=0;
	 	    function seaml(){
	 	    	num += 1;
	 	    	if (num == 10) {
		            num = 0;
		            $("#ulList").css({
			            left: 0
			        })
		        }else if(num == 3){
		        	realAton()
		        }else if(num == 8){
		        	real()
		        }

	 	    	$("#ulList").animate({left:-420*num},500)
	 	    }
	 	    var timer = setInterval(seaml,3000);
	 	    $("#focus_Box").hover(function() {
		        clearInterval(timer);
		    },function() {
		        timer = setInterval(seaml,3000);
		    })
		    window.setInterval(Allamount,10000);
		    //贷款总金额
		    function Totalamount(){
		    	$.ajax({
		            url: url+"getLoanAmount",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			              $("#totalAmount").html(parseInt(data.totalAmount).toLocaleString());
			              $("#applyLoanCount").html(data.applyLoanCount);
			              $("#cooperativeLoanCount").html(data.cooperativeLoanCount);
			              $("#enterpriseLoanCount").html(data.enterpriseLoanCount);
			              
			              $("#enterpriseLoan").html(parseInt(data.enterpriseLoan).toLocaleString());
			              $("#cooperativeLoan").html(parseInt(data.cooperativeLoan).toLocaleString());
			              $("#farmerLoan").html(parseInt(data.farmerLoan).toLocaleString());
			              
			              $(".rightTopList ul li.hzs .bar").animate({width:data.farmerRatio},500);
			              $(".rightTopList ul li.pkf .bar").animate({width:data.cooperativeRatio},500)
			              $(".rightTopList ul li.ltqy .bar").animate({width:data.enterpriseRatio},500)
			               $('.main  .counter').countUp();
			            }
			        });
		    }
		    Totalamount();
		    function Allamount(){
		    	$.ajax({
		            url: url+"getLoanAmount",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			              $("#totalAmount").html(parseInt(data.totalAmount).toLocaleString());
			              //$('.midhead  .counter').countUp();
			            }
			        });
		    }
		    //脱贫产业分布
		    function Ratio(){
		    	$.ajax({
		            url: url+"getIndustryInfo",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			              /*parseInt(data.totalAmount).toLocaleString();*/ 
			              $("#agricultureRatio").html(data.agricultureRatio);
			              $("#characterRatio").html(data.characterRatio);
			              $("#serviceRatio").html(data.serviceRatio);
			              $("#agricultures").animate({width:data.agricultureRatio},500);
			              $("#characters").animate({width:data.characterRatio},500)
			              $("#services").animate({width:data.serviceRatio},500)
			            }
			        });
		    }
		    Ratio();
		    //银行比例
		    function BankRatio(){
		    	$.ajax({
		            url: url+"getBankRatio",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			               var circle = data.data;
							/*第一个*/
							$('.first.circle').circleProgress({
							    startAngle: -Math.PI / 4 * 3,
							    value: circle[0],
							    lineCap: 'round',
							    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
							}).on('circle-animation-progress', function(event, progress, stepValue) {
							     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
							});
							/*第二个*/
							$('.second.circle').circleProgress({
							    startAngle: -Math.PI / 4 * 3,
							    value: circle[1],
							    lineCap: 'round',
							    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
							}).on('circle-animation-progress', function(event, progress, stepValue) {
							     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
							});
							/*第三个*/
							$('.third.circle').circleProgress({
							    startAngle: -Math.PI / 4 * 3,
							    value: circle[2],
							    lineCap: 'round',
							    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
							}).on('circle-animation-progress', function(event, progress, stepValue) {
							     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
							});
							/*第四个*/
							$('.fourth.circle').circleProgress({
							    startAngle: -Math.PI / 4 * 3,
							    value: circle[3],
							    lineCap: 'round',
							    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
							}).on('circle-animation-progress', function(event, progress, stepValue) {
							     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
							});
							/*第五个*/
							$('.fifth.circle').circleProgress({
							    startAngle: -Math.PI / 4 * 3,
							    value: circle[4],
							    lineCap: 'round',
							    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
							}).on('circle-animation-progress', function(event, progress, stepValue) {
							     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
							});
			            }
			        });
		    }
		    BankRatio();
			/*信用评价数据*/
			function CreditInfo(){
				$.ajax({
		            url: url+"getCreditInfo",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
		            		$("#collectedCount").html(data.collectedCount);
			                var dom = document.getElementById("container1");
							var myChart1 = echarts.init(dom);
							var app = {};
							option = null;
							var dataAxis1 = data.name;
							var data1 = data.data;
							var yMax = 100;		
							data1.push(yMax);
							option = {
								tooltip : {
							        trigger: 'axis'
							    },
							    xAxis: {
							        type: 'category',
							        data: dataAxis1,
							      	axisLine:{
								        lineStyle:{
								            color:'#7cb8e8'
								        }
								    },
								    axisPointer: {
						                label: {
						                    formatter: function (params) {
						                        return '信用度为' + params.value+'(%):'
						                    }
						                }
						            }
							    },
							    yAxis: {
							       type: 'value',
							       axisLabel: {
							          formatter: '{value}%'
							        },
							       axisLine:{
								          lineStyle:{
								              color:'#7cb8e8'
								          }
								      },
							       splitLine: {
									    lineStyle: {
									        // 使用深浅的间隔色
									        color: ['rgba(255,255,255,.2)']
									    }
									}
							    },
							    series: [{
							        data:data1,
							        type: 'line',
							        symbolSize: 10,
							        lineStyle: {
							            normal: {
							                color: new echarts.graphic.LinearGradient(
							                        0, 0, 0, 1,
							                        [
							                            {offset: 0, color: '#102248'},
							                            {offset: 0.56, color: '#3b73cd'},
							                            {offset: 0.77, color: '#1b92ee'},
							                            {offset: 1, color: '#80e8fd'}
							                        ]
							                    )
							            }
							        },
							        itemStyle: {
							            normal: {
							                color: '7cb8e8'
							            }
							        }
							    }]
							};
							if (option && typeof option === "object") {
							    myChart1.setOption(option, true);
							}
			            }
			        });
			}
			CreditInfo()
			/*贷款类弹窗*/
			function LoanAnalysis(){
				$.ajax({
		            url: url+"getLoanAmount",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			        	  $("#loanapplyLoanCount").html(data.applyLoanCount);
			              $("#loancooperativeLoanCount").html(data.cooperativeLoanCount);
			              $("#loanenterpriseLoanCount").html(data.enterpriseLoanCount);
			              
			              $(".loanBodyBottomRight .nh .bar").animate({width:data.farmerRatio},500);
			              $(".loanBodyBottomRight .hzs .bar").animate({width:data.cooperativeRatio},500)
			              $(".loanBodyBottomRight .qy .bar").animate({width:data.enterpriseRatio},500)
			              
			              $(".loanBodyBottomRight .nh i").html(data.farmerRatio);
			              $(".loanBodyBottomRight .hzs i").html(data.cooperativeRatio)
			              $(".loanBodyBottomRight .qy i").html(data.enterpriseRatio)
			              
			        	  $('.LoanAnalysis .counter').countUp();
			        	  
			        	  /*数据分析*/
							var dom3 = document.getElementById("loanBody");
							var myChart3 = echarts.init(dom3);
							var radartext = [ { name: '农 户'},{ name: '新型农业经营主体'},{ name: '龙头企业'}];
							var radardata = [data.farmerLoan, data.cooperativeLoan, data.enterpriseLoan];
							var app = {};
							option3 = null;
							option3 = {
							    radar: [
							        {
							           indicator: radartext,
							            center: ['50%', '50%'],
							            radius: 70,
							            startAngle: 70,
							            splitNumber: 6,
							            shape: 'circle',
							            name: {
							                formatter:'{value}',
							                textStyle: {
							                    color:'#fff'
							                }
							            },
							            splitArea: {
							                areaStyle: {
							                	color: ['rgba(21, 51,76, 1)','rgba(16, 41, 63, 1)'],
							                    shadowColor: 'rgba(16, 41, 63, 0.3)',
							                    shadowBlur: 10
							                }
							            },
							            axisLine: {
							                lineStyle: {
							                    color: 'rgba(255, 255, 255, 0.5)'
							                }
							            },
							            splitLine: {
							                lineStyle: {
							                    color: 'rgba(255, 255, 255, 0.5)'
							                }
							            }
							        }
							    ],
							    series: [
							        {
							            type: 'radar',
							            itemStyle: {
							                emphasis: {
							                    // color: 各异,
							                    lineStyle: {
							                        normal: {
										                color: '#fff',
										                width: 150
										            }
							                    }
							                }
							            },
							            data: [
							                {
							                    value:radardata ,
							                    areaStyle: {
							                        normal: {
							                            color: 'rgba(255, 255, 255, 0.5)'
							                        }
							                    },
							                    lineStyle: {
							                        normal: {
										                color: '#fff',
										                width: 2
										            }
							                    }
							                }
							            ],
							            label: {
						                    normal: {  
						                        show: true,
						                        color:'#fff',
						                        formatter:function(params) {  
						                            return params.value+'元';  
						                        }  
						                    }  
						                }
							        }
							    ]
							};
							if (option3 && typeof option3 === "object") {
								myChart3.clear();
							    myChart3.setOption(option3, true);
							}
		            }
			    });
			}
			/*三级服务站体系*/	
			function UserDetail(){
				$.ajax({
		            url: url+"getUserDetail",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			               console.log(data)
			               $("#countys").html(data.countyCount);
			               $("#villages").html(data.villageCount);
			               $("#towns").html(data.townCount);
			               $("#users").html(data.userCount);
			               $(".serviceBodyBottom .village b").html(data.villageUser);
			               $(".serviceBodyBottom .country b").html(data.townUser);
			               $(".serviceBodyBottom .county b").html(data.countyUser);
			               $(".serviceBodyBottom .bank b").html(data.bankUser);
			               $(".serviceBodyBottom .province b").html(data.guaranteeUser);
			               $(".serviceBodyBottom>p b").html(data.onlineCount);
			               
			               $('.ServiceSystem .counter').countUp();
			               
			               $(".village .percentage").animate({width:data.villageRatio},500);
			               $(".country .percentage").animate({width:data.townRatio},500)
			               $(".county .percentage").animate({width:data.countyRatio},500)
			               $(".bank .percentage").animate({width:data.bankRatio},500)
			               $(".province .percentage").animate({width:data.guaranteeRatio},500)
		            	}
			        });
			}
			/*首页地区贷款前七名排行榜 */
			function FrontSeven(){
				$.ajax({
		            url: url+"getAreaLoan?topNo=7",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
		                var dom = document.getElementById("container");
						var myChart = echarts.init(dom);
						var app = {};
						option = null;
						var dataAxis1 = data.areaNames;
						var data1 = data.quotas;
						option = {
							tooltip : {
						        trigger: 'axis',
						        axisPointer : {           
						            type : 'shadow',
						            Width : 20
						        }
						    },
						    xAxis: {
						        type: 'category',
						        data: dataAxis1,
						        axisLine:{
							        lineStyle:{
							            color:'#7cb8e8'
							        }
							    }
						    },
						    yAxis:{
				                type: 'value',
				                name: '单位(万元)',
						        axisLine:{
							          lineStyle:{
							              color:'#7cb8e8'
							          }
							      },
							      splitLine: {
									    lineStyle: {
									        // 使用深浅的间隔色
									        color: ['rgba(255,255,255,.2)']
									    }
									}
					        },
						    series: [{
						            type: 'bar',
						            itemStyle: {
						                normal: {color: 'rgba(18,30,48,.5)'}
						            },
						            barGap:'-100%',
						            barCategoryGap:'40%',
						            barWidth : 20, 
						            animation: false
						        },
						        {
						            type: 'bar',
						            itemStyle: {
						                normal: {
						                    color: new echarts.graphic.LinearGradient(
						                        0, 0, 0, 1,
						                        [
						                            {offset: 0, color: '#102248'},
						                            {offset: 0.56, color: '#3b73cd'},
						                            {offset: 0.77, color: '#1b92ee'},
						                            {offset: 1, color: '#80e8fd'}
						                        ]
						                    )
						                }
						            },
						        data: data1,
						        markPoint : {
						                data : [
						                    {type : 'max', name: '最大值'},
						                    {type : 'min', name: '最小值'}
						                ]
						        }
						    }]
						};
						;
						if (option && typeof option === "object") {
							myChart.clear();
						    myChart.setOption(option, true);
						}
		            }
			    });
			}
			FrontSeven()
			/*农户脱贫产业分布*/
			function IndustryDetailInfo(){
				$.ajax({
		            url: url+"getIndustryDetailInfo",
		            type:"get",
		            dataType: 'json',
		            success:function(data){
			               console.log(data)						
								/*绿色农业贷款数据分析*/
							   var Percentcircle = data.farmingRatio;
								/*第一个*/
								$('.Percentfirst.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[0],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第二个*/
								$('.Percentsecond.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[1],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第三个*/
								$('.Percentthird.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[2],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第四个*/
								$('.Percentfourth.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[3],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第五个*/
								$('.Percentfifth.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[4],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
									/*第六个*/
								$('.Percentsix.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: Percentcircle[5],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});

								var dom4 = document.getElementById("shakeBox");
								var myChart4 = echarts.init(dom4);
								var app = {};
								option4 = null;
								var dataAxis4 = ['蔬菜业', '食用菌', '药材业', '畜牧业', '林果业','其他'];
								var data4 = data.farmingLoans;
								var yMax = 350;		
								data4.push(yMax);
								option4 = {
									tooltip : {
								        trigger: 'axis',
								        axisPointer : {           
								            type : 'none',
								        }
								    },
								    xAxis: {
								        type: 'category',
								        data: dataAxis4,
								      	axisLine:{
									        lineStyle:{
									            color:'#7cb8e8',
									            width:2
									        }
									    }
								    },
								    yAxis: {
								        type: 'value',
								        name: '单位（万元）',
								        axisLine:{
									          lineStyle:{
									              color:'#7cb8e8'
									          }
									      }
								    },
								    series: [{
								        data:data4,
								        type: 'line',
								        symbolSize: 10,
								        lineStyle: {
								            normal: {
								                color: new echarts.graphic.LinearGradient(
								                        0, 0, 0, 1,
								                        [
								                            {offset: 0, color: '#102248'},
								                            {offset: 0.56, color: '#3b73cd'},
								                            {offset: 0.77, color: '#1b92ee'},
								                            {offset: 1, color: '#80e8fd'}
								                        ]
								                    )
								            }
								        },
								        itemStyle: {
								            normal: {
								                color: '7cb8e8'
								            }
								        }
								    }]
								};
								myChart4.clear()
								myChart4.setOption(option4,true);
								
								/*现代服务业放款数据分析三角图*/
							    var dom5 = document.getElementById("analysis");
								var myChart5 = echarts.init(dom5);
								var app = {};
								var radartext1 = [ { name: '电子商务'},{ name: '生态旅游'},{ name: '其他'}];
							    var radardata1 = [data.electronicRatio, data.ecotourismRatio, data.serviceOtherRatio];
								option5 = null;
								option5 = {
								    radar: [
								        {
								            indicator: radartext1,
								            center: ['50%', '50%'],
								            radius: 65,
								            startAngle: 80,
								            splitNumber: 6,
								            shape: 'circle',
								            name: {
								                formatter:'{value}',
								                textStyle: {
								                    color:'#7cb8e8'
								                }
								            },
								            splitArea: {
								                areaStyle: {
								                	color: ['rgba(21, 51,76, 1)','rgba(16, 41, 63, 1)'],
								                    shadowColor: 'rgba(16, 41, 63, 0.3)',
								                    shadowBlur: 10
								                }
								            },
								            axisLine: {
								                lineStyle: {
								                    color: 'rgba(255, 255, 255, 0.5)'
								                }
								            },
								            splitLine: {
								                lineStyle: {
								                    color: 'rgba(255, 255, 255, 0.5)'
								                }
								            }
								        }
								    ],
								    series: [
								        {
								            type: 'radar',
								            itemStyle: {
								                emphasis: {
								                    // color: 各异,
								                    lineStyle: {
								                        normal: {
											                color: '#7cb8e8',
											                width: 150
											            }
								                    }
								                }
								            },
								            data: [
								                {
								                    value: radardata1,
								                    areaStyle: {
								                        normal: {
								                            color: 'rgba(124, 184, 232, 0.5)'
								                        }
								                    },
								                    lineStyle: {
								                        normal: {
											                color: '#7cb8e8',
											                width: 2
											            }
								                    }
								                }
								            ],
								            label: {
							                    normal: {  
							                        show: true,
							                        color:'#fff',
							                        formatter:function(params) {  
							                            return params.value+'%';  
							                        }  
							                    }  
							                }
								        }
								    ]
								};
								myChart5.clear()
								myChart5.setOption(option5,true);
								$(".dataAnalysisRight ul li.dzsw i").html(data.electronicLoan);
								$(".dataAnalysisRight ul li.stly i").html(data.ecotourismLoan);
								$(".dataAnalysisRight ul li.qt i").html(data.serviceOtherLoan);
								$(".dataAnalysisRight ul li.dzsw .bar").animate({width:data.electronicRatio+'%'},500)
			               		$(".dataAnalysisRight ul li.stly .bar").animate({width:data.ecotourismRatio+'%'},500)
			               		$(".dataAnalysisRight ul li.qt .bar").animate({width:data.serviceOtherRatio+'%'},500)
								
								/*特色工业放款数据分析*/
								var dom6 = document.getElementById("characteristicBox");
								var myChart6 = echarts.init(dom6);
								var app = {};
								var radartext2 = [ { name: '农副产品深加工'},{ name: '中药材深加工'},{ name: '其他'}];
							    var radardata2 = [data.characterFarmingRatio, data.characterMedicinalRatio, data.characterOtherRatio];
								option6 = null;
								option6 = {
								    radar: [
								        {
								            indicator: radartext2,
								            center: ['50%', '50%'],
								            radius: 65,
								            startAngle: 80,
								            splitNumber: 6,
								            shape: 'circle',
								            name: {
								                formatter:'{value}',
								                textStyle: {
								                    color:'#7cb8e8'
								                }
								            },
									        splitArea: {
									                areaStyle: {
									                	color: ['rgba(21, 51,76, 1)','rgba(16, 41, 63, 1)'],
									                    shadowColor: 'rgba(16, 41, 63, 0.3)',
									                    shadowBlur: 10
									                }
								            },
								            axisLine: {
								                lineStyle: {
								                    color: 'rgba(255, 255, 255, 0.5)'
								                }
								            },
								            splitLine: {
								                lineStyle: {
								                    color: 'rgba(255, 255, 255, 0.5)'
								                }
								            }
								        }
								    ],
								    series: [
								        {
								            type: 'radar',
								            itemStyle: {
								                emphasis: {
								                    // color: 各异,
								                    lineStyle: {
								                        normal: {
											                color: '#7cb8e8',
											                width: 150
											            }
								                    }
								                }
								            },
								            data: [
								                {
								                    value: radardata2,
								                    areaStyle: {
								                        normal: {
								                            color: 'rgba(124, 184, 232, 0.5)'
								                        }
								                    },
								                    lineStyle: {
								                        normal: {
											                color: '#7cb8e8',
											                width: 2
											            }
								                    }
								                }
								            ],
								            label: {
							                    normal: {  
							                        show: true,
							                        color:'#fff',
							                        formatter:function(params) {  
							                            return params.value+'%';  
							                        }  
							                    }  
							                }
								        }
								    ]
								};
								myChart6.clear()
								myChart6.setOption(option6,true);
								
								$(".characteristicRight ul li.nf i").html(data.characterFarmingLoan);
								$(".characteristicRight ul li.zy i").html(data.characterMedicinalLoan);
								$(".characteristicRight ul li.qt i").html(data.characterOtherLoan);
								$(".characteristicRight ul li.nf .bar").animate({width:data.characterFarmingRatio+'%'},500)
			               		$(".characteristicRight ul li.zy .bar").animate({width:data.characterMedicinalRatio+'%'},500)
			               		$(".characteristicRight ul li.qt .bar").animate({width:data.characterOtherRatio+'%'},500)
								/*放款主体数据分析*/	
			            		var charactercircle = data.bankRatio;
								/*第一个*/
								$('.characterfirst.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: charactercircle[0],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第二个*/
								$('.charactersecond.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: charactercircle[1],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第三个*/
								$('.characterthird.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: charactercircle[2],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第四个*/
								$('.characterfourth.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: charactercircle[3],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								/*第五个*/
								$('.characterfifth.circle').circleProgress({
								    startAngle: -Math.PI / 4 * 3,
								    value: charactercircle[4],
								    lineCap: 'round',
								    fill: { gradient: ['#102248', '#3b73cd','#1b92ee','#80e8fd'] }
								}).on('circle-animation-progress', function(event, progress, stepValue) {
								     $(this).find('strong').text((100 * String(stepValue.toFixed(4))).toFixed(2) + '%');
								});
								var dom7 = document.getElementById("characterBox");
								var myChart7 = echarts.init(dom7);
								var app = {};
								option7 = null;
								var dataAxis7 = ['农商行', '村镇银行', '农行', '邮政储蓄','中原银行'];
								var data7 = data.bankLoan;
								option7 = {
									tooltip : {
								        trigger: 'axis',
								        axisPointer : {           
								            type : 'none',
								        }
								    },
								    xAxis: {
								        type: 'category',
								        data: dataAxis7,
								      	axisLine:{
									        lineStyle:{
									            color:'#7cb8e8',
									            width:2
									        }
									    }
								    },
								    yAxis: {
								        type: 'value',
								        name: '单位（万元）',
								        axisLine:{
									          lineStyle:{
									              color:'#7cb8e8'
									          }
									      }
								    },
								    series: [{
								        data:data7,
								        type: 'line',
								        symbolSize: 10,
								        lineStyle: {
								            normal: {
								                color: new echarts.graphic.LinearGradient(
								                        0, 0, 0, 1,
								                        [
								                            {offset: 0, color: '#102248'},
								                            {offset: 0.56, color: '#3b73cd'},
								                            {offset: 0.77, color: '#1b92ee'},
								                            {offset: 1, color: '#80e8fd'}
								                        ]
								                    )
								            }
								        },
								        itemStyle: {
								            normal: {
								                color: '7cb8e8'
								            }
								        }
								    }]
								};
								myChart7.clear();
								myChart7.setOption(option7,true);
								
								
		            	}
			        });
			}
	});
			
			