var tempLoRa = echarts.init(document.getElementById("tempLoRa"), 'dark');
tempLoRa.group = 'gruppe1';
echarts.connect('gruppe1');
function getTSLoRa(deviceId) {
  return new Promise((resolve, reject) => {
      const loRaDevicesTimeSeries = [];
      $.getJSON(
        `https://api.mvvsmartcities.com/v3/device/timeseriesdefinition?Ocp-Apim-Subscription-Key=b64af05bfac248888c1ff5681daab321&deviceId=${deviceId}`,
        {},
        function (res) {
          for (let item of res) {
            for (let j = 0; j < item.timeSeriesDefinitions.length; j++) {
              if (item.timeSeriesDefinitions[j].description.indexOf("Temperatur") > -1) {
                loRaDevicesTimeSeries.push({
                  timeSeries : item.timeSeriesDefinitions[j].timeSeriesId,
                  description : item.timeSeriesDefinitions[j].description
                });
                
              }
            }
          }
          return resolve(loRaDevicesTimeSeries);
          reject("Keine Daten");
        }
      );
  });
}

function getTempValuesLoRa(tsIDLoRa, tsIDLoRa2, tsIDLoRa3, func, interval, startDate, endDate){
  return new Promise((resolve, reject) => {
    if(tsIDLoRa !=0 && tsIDLoRa2 !=0 && tsIDLoRa3 !=0){
      var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=b64af05bfac248888c1ff5681daab321&timeSeriesId=${tsIDLoRa}&timeSeriesId=${tsIDLoRa2}&timeSeriesId=${tsIDLoRa3}&func=${func}&interval=${interval}&from=${startDate}&to=${endDate}&timezone=Europe%2FBerlin&output=split&sort=asc`;
    
    }
    $.getJSON(
      url,
      {},
      function (res) {
        resolve(res);
        reject("Keine Daten Verfügbar");
      }
    );
  });
}


async function buildChart(input) {
  const wetterstation1 = await getTempChart(0);
  const wetterstation2 = await getTempChart(1);
  const wetterstation3 = await getTempChart(2);
  let lenTimestampsWetterstation = Object.keys(wetterstation1[0].values).length;

  let temp = "0004A30B00F730D6";
  let loraDeviceIds = await fetch("./data/lora_deviceIDs.json").then(response => response.json());
  try {
    for(let item of loraDeviceIds){
      
      if(item.name == input){
        temp = item.deviceId
      }
    }
    var loRaTimeSeries = await getTSLoRa(temp);

    var minMaxTemp = await getTempValuesLoRa(
      loRaTimeSeries[0].timeSeries,
      loRaTimeSeries[1].timeSeries,
      loRaTimeSeries[2].timeSeries,
      'avg',
      'H',
      startDate,
      endDate);

  let lenValues = minMaxTemp[1].values;
  let extendoArray = new Array(lenTimestampsWetterstation - lenValues.length);
  extendoArray.push.apply(extendoArray,lenValues);
  
      
    
    tempLoRa.setOption(
      (option = {
        title: {
          text:"LoRa Sensor: "+ input,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: timestampstoString(wetterstation1[0].timestamps),
        },
        legend: {
          data: ['Wetterstation 1', 'Wetterstation 2', 'Wetterstation 3', 'Temp LoRa'],
        },
        yAxis: {
          type: "value",
        
        },
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2022-01-017",
          },
          {
            type: "inside",
          },
        ],
        dataZoom: [
          {
            start: 10,
            end: 20
          },
          {
            type: "inside",
          },
        ],
        series: [
          {
            name: 'Wetterstation 1',
            type: 'line',
            color: '#FFF000',
            smooth: false,
            data: wetterstation1[0].values,
            
          },
          {
            name: 'Temp LoRa',
            type: 'line',
            color: '#FF0000',
            smooth: false,
            data: extendoArray,
            
          },
          {
            name: 'Wetterstation 2',
            type: 'line',
            color: '#FF000F',
            smooth: false,
            data: wetterstation2[0].values,
            
          },
          {
            name: 'Wetterstation 3',
            type: 'line',
            color: '#FF00FF',
            smooth: false,
            data: wetterstation3[0].values,
            
          },
        ],
      })
    );
  } catch (err) {
    console.log(err);
  }
}
buildChart("T-001");
$(window).on('resize', function(){
  if(tempLoRa != null && tempLoRa != undefined){
      tempLoRa.resize();
  }
});