function buildWeatherStationsMap() {
	$.getJSON('https://api.mvvsmartcities.com/v3/device?deviceGroupId=62345c6b887ad798efd95edf&Ocp-Apim-Subscription-Key=b64af05bfac248888c1ff5681daab321', {}, function (res) {
		let geoCoordMap = {}
		let data = []
		for (let item of res) {

			if (item['location'] && item['location']['coordinates']) {
				if (!geoCoordMap[item.name]) {
					geoCoordMap[item.name] = []
				}
				geoCoordMap[item.name][0] = item['location']['coordinates'][0];
				geoCoordMap[item.name][1] = item['location']['coordinates'][1];
				data.push({
					name: item.name,
					value: 0
				})
			}
		}
		build(geoCoordMap, data)
	});
}

function build(geoCoordMap, data) {

	var convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		console.log(res)
		return res;
	};

	var myChart = echarts.init(document.getElementById('main'));
	myChart.setOption({
		title: {
			text: '全国主要城市空气质量',
			subtext: 'data from PM25.in',
			sublink: 'http://www.pm25.in',
			left: 'center',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'item'
		},
		leaflet: {
			center: [8.475067358437684, 49.49631848203731],
			zoom: 14,
			roam: true,
			layerControl: {
				position: 'topright'
			},
			tiles: [{
				label: '天地图',
				urlTemplate: 'http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
				options: {
					attribution: 'tianditu.com'
				}
			}, {
				label: 'Open Street Map',
				urlTemplate: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
				options: {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
				}
			}]
		},
		series: [{
				name: 'pm2.5',
				type: 'scatter',
				coordinateSystem: 'leaflet',
				data: convertData(data),
				symbolSize: 15,
				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: '#ddb926'
					}
				}
			},
			{
				name: 'Top 5',
				type: 'effectScatter',
				coordinateSystem: 'leaflet',
				data: convertData(data.sort(function (a, b) {
					return b.value - a.value;
				})),
				symbolSize: 5,
				showEffectOn: 'emphasis',
				rippleEffect: {
					brushType: 'stroke'
				},
				hoverAnimation: true,
				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: 'black',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				zlevel: 1
			}
		]
	});

	(function () {
		var throttle = function (type, name, obj) {
			obj = obj || window;
			var running = false;
			var func = function () {
				if (running) {
					return;
				}
				running = true;
				requestAnimationFrame(function () {
					obj.dispatchEvent(new CustomEvent(name));
					running = false;
				});
			};
			obj.addEventListener(type, func);
		};
		throttle("resize", "optimizedResize");
	})();

	window.addEventListener("optimizedResize", function () {
		myChart.resize({
			width: 'auto',
			height: 'auto'
		});
	});
}

// 1 GET: get all mavi devices und put them in array devices
// 2 GET: for each device get timeSeriesIds und save them in dict timeSeriesIds
//  data forman of timeSeriesIds: [{
//	  mavi001:["00f21618-e568-4655-8752-bd58e7b7ae62", mavi002:[...]]
//  }]
function getTrafficSensors(){
	let devices = [];
	$.getJSON('https://api.mvvsmartcities.com/v3/device?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644', {}, function (res) {
		for(let item of res){
			if(item.deviceId[0] == "m"){
				devices.push(item.deviceId)
			}
		}
		let timeSeriesIds = {}
		for(let device of devices){
			$.getJSON(`https://api.mvvsmartcities.com/v3/device/timeseriesdefinition?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&deviceId=${device}`, {}, function (res) {

				if(!timeSeriesIds[res[0].deviceId])
					timeSeriesIds[res[0].deviceId] = [];
				
				for(let tsd of res[0].timeSeriesDefinitions)
					timeSeriesIds[res[0].deviceId].push(tsd.timeSeriesId);
				
			});
		}
		console.log(timeSeriesIds)
	});
}

//buildWeatherStationsMap();
getTrafficSensors();