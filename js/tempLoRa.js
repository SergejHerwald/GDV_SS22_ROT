var tempLoRa = echarts.init(document.getElementById("tempLoRa"), 'dark');

let loRaDeviceIDs =[
  {
      "name": "T-001",
      "deviceId": "0004A30B00F730D6"
  },
  {
      "name": "T-002",
      "deviceId": "0004A30B00F738F5"
  },
  {
      "name": "T-003",
      "deviceId": "0004A30B00F74CBC"
  },
  {
      "name": "T-006",
      "deviceId": "0004A30B00F7685C"
  },
  {
      "name": "T-008",
      "deviceId": "0004A30B00F789FC"
  },
  {
      "name": "T-012",
      "deviceId": "0004A30B00F7A334"
  },
  {
      "name": "T-014",
      "deviceId": "0004A30B00F7E216"
  },
  {
      "name": "T-016",
      "deviceId": "0004A30B00F72EED"
  },
  {
      "name": "T-018",
      "deviceId": "0004A30B00F74320"
  },
  {
      "name": "T-021",
      "deviceId": "0004A30B00F74FDC"
  },
  {
      "name": "T-031",
      "deviceId": "0004A30B00F7A9CB"
  },
  {
      "name": "T-035",
      "deviceId": "0004A30B00F7C6BB"
  },
  {
      "name": "T-038",
      "deviceId": "0004A30B00F7DA58"
  },
  {
      "name": "T-043",
      "deviceId": "0004A30B00F74313"
  },
  {
      "name": "T-050",
      "deviceId": "0004A30B00F7A7B7"
  },
  {
      "name": "T-052",
      "deviceId": "0004A30B00F7B6D5"
  },
  {
      "name": "T-059",
      "deviceId": "0004A30B00F7DD9F"
  },
  {
      "name": "T-060",
      "deviceId": "0004A30B00F7EB19"
  },
  {
      "name": "T-007",
      "deviceId": "0004A30B00F784B3"
  },
  {
      "name": "T-005",
      "deviceId": "0004A30B00F767F5"
  },
  {
      "name": "T-030",
      "deviceId": "0004A30B00F7A550"
  },
  {
      "name": "T-032",
      "deviceId": "0004A30B00F7B1BB"
  },
  {
      "name": "T-034",
      "deviceId": "0004A30B00F7C4B9"
  },
  {
      "name": "T-042",
      "deviceId": "0004A30B00F7416A"
  },
  {
      "name": "T-046",
      "deviceId": "0004A30B00F74D5E"
  },
  {
      "name": "T-047",
      "deviceId": "0004A30B00F7760F"
  },
  {
      "name": "T-051",
      "deviceId": "0004A30B00F7A8DC"
  },
  {
      "name": "T-053",
      "deviceId": "0004A30B00F7C5FC"
  },
  {
      "name": "T-054",
      "deviceId": "0004A30B00F7CD19"
  },
  {
      "name": "T-009",
      "deviceId": "0004A30B00F78A72"
  },
  {
      "name": "T-013",
      "deviceId": "0004A30B00F7A403"
  },
  {
      "name": "T-015",
      "deviceId": "0004A30B00F7E728"
  },
  {
      "name": "T-024",
      "deviceId": "0004A30B00F77833"
  },
  {
      "name": "T-025",
      "deviceId": "0004A30B00F78795"
  },
  {
      "name": "T-028",
      "deviceId": "0004A30B00F7A3B9"
  },
  {
      "name": "T-033",
      "deviceId": "0004A30B00F7C125"
  },
  {
      "name": "T-036",
      "deviceId": "0004A30B00F7CB69"
  },
  {
      "name": "T-040",
      "deviceId": "0004A30B00F7ED12"
  },
  {
      "name": "T-044",
      "deviceId": "0004A30B00F744FC"
  },
  {
      "name": "T-045",
      "deviceId": "0004A30B00F74CA9"
  },
  {
      "name": "T-056",
      "deviceId": "0004A30B00F7DA67"
  },
  {
      "name": "T-057",
      "deviceId": "0004A30B00F7DA74"
  },
  {
      "name": "T-004",
      "deviceId": "0004A30B00F75C0E"
  },
  {
      "name": "T-010",
      "deviceId": "0004A30B00F78C0C"
  },
  {
      "name": "T-011",
      "deviceId": "0004A30B00F79500"
  },
  {
      "name": "T-017",
      "deviceId": "0004A30B00F73989"
  },
  {
      "name": "T-019",
      "deviceId": "0004A30B00F74C99"
  },
  {
      "name": "T-020",
      "deviceId": "0004A30B00F74EF7"
  },
  {
      "name": "T-022",
      "deviceId": "0004A30B00F7570E"
  },
  {
      "name": "T-023",
      "deviceId": "0004A30B00F76D51"
  },
  {
      "name": "T-026",
      "deviceId": "0004A30B00F78C27"
  },
  {
      "name": "T-027",
      "deviceId": "0004A30B00F7932C"
  },
  {
      "name": "T-029",
      "deviceId": "0004A30B00F7A54E"
  },
  {
      "name": "T-037",
      "deviceId": "0004A30B00F7CBCD"
  },
  {
      "name": "T-039",
      "deviceId": "0004A30B00F7EAA9"
  },
  {
      "name": "T-041",
      "deviceId": "0004A30B00F731DB"
  },
  {
      "name": "T-048",
      "deviceId": "0004A30B00F792C0"
  },
  {
      "name": "T-049",
      "deviceId": "0004A30B00F7A5B7"
  },
  {
      "name": "T-055",
      "deviceId": "0004A30B00F7D26D"
  },
  {
      "name": "T-058",
      "deviceId": "0004A30B00F7DB1B"
  }
]


function getTSLoRa(deviceId) {
  return new Promise((resolve, reject) => {
    //for (let device of deviceId) {
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
    //}
  });
}

function getTempValuesLoRa(tsIDLoRa, tsIDLoRa2, tsIDLoRa3, startDate, endDate){
  return new Promise((resolve, reject) => {
    if(tsIDLoRa !=0 && tsIDLoRa2 !=0 && tsIDLoRa3 !=0){
      var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=b64af05bfac248888c1ff5681daab321&timeSeriesId=${tsIDLoRa}&timeSeriesId=${tsIDLoRa2}&timeSeriesId=${tsIDLoRa3}&from=${startDate}&to=${endDate}&timezone=Europe%2FBerlin&output=split&sort=asc`;
    
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
  let temp = "0004A30B00F730D6";
  try {
    for(let item of loRaDeviceIDs){
      
      console.log(item);
      if(item.name == input){
        temp = item.deviceId
      }
    }
    var loRaTimeSeries = await getTSLoRa(temp);

    var minMaxTemp = await getTempValuesLoRa(
      loRaTimeSeries[0].timeSeries,
      loRaTimeSeries[1].timeSeries,
      loRaTimeSeries[2].timeSeries,
      startDate,
      formattedDate);
      
    tempLoRa.setOption(
      (option = {
        title: {
          text: "Mannheim",
          subtext: "Temperatur - LoRa Sensor: "+ input,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: minMaxTemp[0].timestamps,
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
        series: [
          {
            name: 'niedrigste',
            type: "line",
            smooth: false,
            data: minMaxTemp[0].values,
          },
          {
            name: 'temperatur',
            type: 'line',
            smooth: false,
            data: minMaxTemp[1].values,
            
          },
          {
            name: 'höchste',
            type: 'line',
            smooth: false,
            data: minMaxTemp[2].values,
          }
        ],
      })
    );
  } catch (err) {
    console.log(err);
  }
}
buildChart("T-001");