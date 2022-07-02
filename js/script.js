function buildMap(json_data_from_file) {
  var convertData = function (coordinates,data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = coordinates[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    console.log(res)
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
      tiles: [{
        label: "Open Street Map",
        urlTemplate: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        options: {
          
        },
      }, ],
    },
    series: [{
      name: 'Fahrräder und Motorräder',
      type: "effectScatter",
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      coordinateSystem: "leaflet",
      data: convertData(json_data_from_file.f.coordinates, json_data_from_file.f.data),
      encode: {
        value: 2
      },
      symbolSize: function (val) {
        return val[2] / 2000;
      },
      label: {
        normal: {
          formatter: "{b}",
          position: "right",
          show: false,
        },
      },
      itemStyle: {
        normal: {
          color: function(){
            var pattern = document.createElement('canvas')
            var ctx = pattern.getContext("2d");
          
            // Create gradient
            var grd = ctx.createLinearGradient(0,0,0,1);
            grd.addColorStop(0,"rgba(0,255,0,0.7)");
            grd.addColorStop(1,"rgba(255,136,0,0.7)");
                    
            return grd
          },        
          shadowBlur: 10,
          shadowColor: '#333'
        },

      },
    },{
      name: 'Motorräder',
      type: "scatter",
      coordinateSystem: "leaflet",
      data: convertData(json_data_from_file.m.coordinates, json_data_from_file.m.data),
      encode: {
        value: 2
      },
      symbolSize: function (val) {

         if(val[2] > 2000 && val[2] < 3000){
          return 10
         } else if(val[2] > 3000 && val[2] < 4000){
           return 15
         } else if(val[2] > 4000 && val[2] < 15000){
           return 20
         }   else{
           return val[2] / 2000; // 90
         }

      },
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
          color: "rgba(255,136,0,0.7)",
          shadowBlur: 5,
          shadowColor: '#333'
        },
      },
      zlevel: 1
    },
    
  ],
  
  });
  myChart.on('click', (params) => {
    doWork(params.data.name.toLowerCase().replace(" ", ""))

    params.marker = "<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:red;\"></span>"
    console.log(params)
  })
  myChart.on('mouseover', (params) => {
   
  })



  // (function () {
  //   var throttle = function (type, name, obj) {
  //     obj = obj || window;
  //     var running = false;
  //     var func = function () {
  //       if (running) {
  //         return;
  //       }
  //       running = true;
  //       requestAnimationFrame(function () {
  //         obj.dispatchEvent(new CustomEvent(name));
  //         running = false;
  //       });
  //     };
  //     obj.addEventListener(type, func);
  //   };
  //   throttle("resize", "optimizedResize");
  // })();

  window.addEventListener("optimizedResize", function () {
    myChart.resize({
      width: "auto",
      height: "auto",
    });
  });
}


function start() {
  fetch("../data/map_data.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata => {
      console.log("jsondata")
      console.log(jsondata)
      console.log("jsondata")
      buildMap(jsondata)
    });
}

start();


fetch("../data/mavi_motorrad_sensors.json")
  .then(response => {
    return response.json();
  })
  .then(jsondata => {
    promises = []
    for (let item of jsondata) {
      promises.push(getFDATA(item.timeSeriesId, item.name));
    }
    Promise.all(promises)
      .then((res) => {


        result = {}
        for (let item of arrayARR) {
          
          if (!result[item.name]) {
            result[item.name] = 0
          }
          result[item.name] = result[item.name] + item.sum
        }

      })
      .catch((error) => {
        console.log(error);
      });
  });


const arrayARR = []
const FROM = "2022-01-17T00%3A00%3A00.000Z"
const TO = "2022-05-01T00%3A00%3A00.000Z"

function getFDATA(timeSeriesId, name) {
  return new Promise((resolve) => {
    fetch(`https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${timeSeriesId}&from=${FROM}&to=${TO}&output=split&metadata=false&metadata=true
    `)
      .then(response => {
        return response.json();
      })
      .then(jsondata => {
        let sum = 0
        for (let value of jsondata[0].values) {
          sum = sum + value
        }

        arrayARR.push({
          name,
          timeSeriesId,
          sum
        })
        resolve()
      });

  });

}















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
