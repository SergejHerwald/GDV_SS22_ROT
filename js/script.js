function buildMap(geoCoordMap,data){
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  var myChart = echarts.init(document.getElementById("main"));
  myChart.setOption({
    title: {
      text: "Mannheim",
      subtext: "Mavi",
      left: "center",
      textStyle: {
        color: "black",
      },
    },
    tooltip: {
      trigger: "item",
    },
    leaflet: {
      center: [8.467067358437684, 49.48731848203731],
      zoom: 15,
      roam: true,
      layerControl: {
        position: "topright",
      },
      tiles: [
        {
          label: "Open Street Map",
          urlTemplate: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
          options: {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
          },
        },
      ],
    },
    series: [
      {
        name: "pm2.5",
        type: "scatter",
        coordinateSystem: "leaflet",
        data: convertData(data),
        symbolSize: 25,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: false,
          },
          emphasis: {
            show: true,
          }
        },
        itemStyle: {
          normal: {
            color: "#ddb926",
          },
        },
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "leaflet",
        data: convertData(
          data.sort(function (a, b) {
            return b.value - a.value;
          })
        ),
        symbolSize: 5,
        showEffectOn: "emphasis",
        rippleEffect: {
          brushType: "stroke",
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: "black",
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        zlevel: 1,
      },
    ],
  });
  myChart.on('click',(params)=>{
    console.log(params)
  })

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
      width: "auto",
      height: "auto",
    });
  });
}


function start() {
  fetch("../data/mavi_coordinates.json")
  .then(response => {
     return response.json();
  })
  .then(jsondata => {
    buildMap(jsondata.geoCoordMap, jsondata.data)
  });
}

start();











// function getTrafficSensors() {
//   let devices = [];
//   let geoCoordMap = {};
//   let data = [];
//   // 1 GET: get all mavi devices und put them in array devices
//   $.getJSON(
//     "https://api.mvvsmartcities.com/v3/device?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644",
//     {},
//     function (res) {
//       for (let item of res) {
//         if (item.deviceId[0] == "m") {
//           //.log("DEVICE:", item)
//           devices.push(item.deviceId);
//           if (item["location"] && item["location"]["coordinates"]) {
//             if (!geoCoordMap[item.name]) {
//               geoCoordMap[item.name] = [];
//             }
//             geoCoordMap[item.name][0] = item["location"]["coordinates"][0];
//             geoCoordMap[item.name][1] = item["location"]["coordinates"][1];
//             data.push({
//               name: item.name,
//               value: 0,
//             });
//           }
//         }
//       }
//       const maviData = {geoCoordMap, data}

//       let fahrr = [];
//       let motor = [];

//       const get_tsd = (device) => {
//         return new Promise((resolve) => {
//           $.getJSON(
//             `https://api.mvvsmartcities.com/v3/device/timeseriesdefinition?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&deviceId=${device}`,
//             {},
//             function (res) {
//               for (let i of res[0].timeSeriesDefinitions) {
//                 if (i.name.includes("Motorrad"))
//                   motor.push({
//                     name: device,
//                     timeSeriesId: i.timeSeriesId,
//                   });
//                 else if (i.name.includes("Fahrr"))
//                   fahrr.push({
//                     name: device,
//                     timeSeriesId: i.timeSeriesId,
//                   });
//               }
//               resolve(motor, fahrr);
//             }
//           );
//         });
//       };

//       let promises = [];
//       for (let device of devices) promises.push(get_tsd(device));

//       Promise.all(promises)
//         .then((res) => {
//           const data = JSON.stringify(motor);
//           console.log(data)
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   );
// }

// getTrafficSensors();




// function getTrafficSensors() {
//   let devices = [];
//   let lora_coordinates = {};
//   let have_not_coordinates = []
//   let data = [];

//   let lora_counter = 0;
//   let extern_counter = 0;

//   // 1 GET: get all mavi devices und put them in array devices
//   $.getJSON(
//     "https://api.mvvsmartcities.com/v3/device?Ocp-Apim-Subscription-Key=b64af05bfac248888c1ff5681daab321",
//     {},
//     function (res) {
//       console.log ("LENGTH",res.length)
//       for (let item of res) {
//         if (item.deviceType == "LoRa") {
//           lora_counter++;
//           //.log("DEVICE:", item)
//           devices.push(item.deviceId);
//           if (item["location"] && item["location"]["coordinates"]) {
//             if(item["location"]["coordinates"][0] != null && item["location"]["coordinates"][0] != ''){

//               if (!lora_coordinates[item.name]) {
//                 lora_coordinates[item.name] = [];
//               }
              
//               lora_coordinates[item.name][0] = item["location"]["coordinates"][0];
//               lora_coordinates[item.name][1] = item["location"]["coordinates"][1];
//             } else {
//               have_not_coordinates.push(item.name)
//             }
//             data.push({
//               name: item.name,
//               value: 0,
//             });
//           } else {
//             have_not_coordinates.push(item.name)
//           }
//         } else {
//           extern_counter++;
//         }
//       }

//       console.log("lora_counter",lora_counter)
//       console.log("extern_counter",extern_counter)
//       console.log(lora_coordinates)
//       console.log(have_not_coordinates)

//       console.log(JSON.stringify(lora_coordinates))

//       const maviData = {geoCoordMap, data}

//       let fahrr = [];
//       let motor = [];

//       const get_tsd = (device) => {
//         return new Promise((resolve) => {
//           $.getJSON(
//             `https://api.mvvsmartcities.com/v3/device/timeseriesdefinition?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&deviceId=${device}`,
//             {},
//             function (res) {
//               for (let i of res[0].timeSeriesDefinitions) {
//                 if (i.name.includes("Motorrad"))
//                   motor.push({
//                     name: device,
//                     timeSeriesId: i.timeSeriesId,
//                   });
//                 else if (i.name.includes("Fahrr"))
//                   fahrr.push({
//                     name: device,
//                     timeSeriesId: i.timeSeriesId,
//                   });
//               }
//               resolve(motor, fahrr);
//             }
//           );
//         });
//       };

//       let promises = [];
//       for (let device of devices) promises.push(get_tsd(device));

//       Promise.all(promises)
//         .then((res) => {
//           const data = JSON.stringify(motor);
//           console.log(data)
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   );
// }

// getTrafficSensors();