let precipitationArr = [{
    name: "0085EF4F08FF5288_precipitation_intensity",
    timeSeriesId: "ed86d215-0bac-4f2d-b809-38d2f00e9129"
  },
  {
    name: "0085EF4F08FF5288_precipitation_type",
    timeSeriesId: "08febe79-4d7d-41b6-a09a-d7788ae582ec"
  },

]

var summeZweirrad = echarts.init(document.getElementById("summeZweirrad"), 'dark');
summeZweirrad.group = 'gruppe1'; 
async function getTsIDsKamera(kamera){
  let motorArr = await fetch("./data/mavi_motorrad_sensors.json").then(response => response.json());
  return new Promise((resolve, reject) => {
    returnArr = [];
    for (let i = 0; i < motorArr.length; i++) {
      if (motorArr[i].name == kamera) {
        returnArr.push(motorArr[i].timeSeriesId);
      };
    }
    return resolve(returnArr);
    reject("Keine Daten");
  });
}
let constFahrrArr = [];
let constMotorArr = [];
let constRegenArr = [];
async function doWork(input) {
  let fahrrArr = await fetch("./data/mavi_fahrrad_sensors.json").then(response => response.json());

  try {
    let auswahl = 0;
    let nummer;
    switch (input) {
      case "mavi001":
        auswahl = await getTsIDsKamera(input);
        nummer = 0;
        break;
      case "mavi004":
        auswahl = await getTsIDsKamera(input);
        nummer = 1;
        break;
      case "mavi009":
        auswahl = await getTsIDsKamera(input);
        nummer = 2;
        break;
      case "mavi015":
        auswahl = await getTsIDsKamera(input);
        nummer = 3;
        break;
      case "mavi018":
        auswahl = await getTsIDsKamera(input);
        nummer = 4;
        break;
      case "mavi014":
        auswahl = await getTsIDsKamera(input);
        nummer = 5;
        break;
      case "mavi011":
        auswahl = await getTsIDsKamera(input);
        nummer = 6;
        break;
      case "mavi016":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi003":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi006":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi010":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi012":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi002":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi013":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi005":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi019":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi007":
        auswahl = await getTsIDsKamera(input);
        nummer = 7;
        break;
      default:
        auswahl = await getTsIDsKamera("mavi001");
        nummer = 0;
        break;
    }
    constMotorArr = auswahl;
    constFahrrArr = fahrrArr[nummer].timeSeriesId;

    const responseMotor = await getSumMotorrad(
      auswahl[0], auswahl[1], auswahl[2],
      startDate,
      endDate,
      "H"
    );

    const responseFahrr = await getSumFahrrad(fahrrArr[nummer].timeSeriesId, startDate, endDate);
    const responseRain = await getData(precipitationArr[0].timeSeriesId, startDate, "2022-05-24T00%3A00%3A00.000Z", 'H', 'avg');
    let temp = [];
    for (let i = 0; i < responseMotor[0].values.length; i++) {
      if (responseMotor[0] && responseMotor[1] && responseMotor[2]) {
        if (responseMotor[0].values.length == responseMotor[1].values.length) {
          if (responseMotor[0].timestamps[i] == responseMotor[1].timestamps[i] && responseMotor[0].timestamps[i] == responseMotor[2].timestamps[i]) {
            temp.push(responseMotor[0].values[i] + responseMotor[1].values[i] + responseMotor[2].values[i]);
          }
        } else {
          anzahlNeueElemente = responseMotor[0].values.length - responseMotor[1].values.length;
          for (let j = 0; j < anzahlNeueElemente; j++) {
            responseMotor[0].timestamps.shift();
            responseMotor[0].values.shift();
            responseMotor[2].timestamps.shift();
            responseMotor[2].values.shift();
          }
          if (responseMotor[0].timestamps[i] == responseMotor[1].timestamps[i] && responseMotor[0].timestamps[i] == responseMotor[2].timestamps[i]) {
            temp.push(responseMotor[0].values[i] + responseMotor[1].values[i] + responseMotor[2].values[i]);
          }
        }
      } else if (responseMotor[0] && responseMotor[1]) {
        if (responseMotor[0].timestamps[i] == responseMotor[1].timestamps[i]) {
          temp.push(responseMotor[0].values[i] + responseMotor[1].values[i]);
        }
      } else if (responseMotor[0]) {
        temp.push(responseMotor[0].values[i]);

      }
    }

    let shaddowArr = [];
    let valuesArr = responseMotor[0].timestamps;
    let lenValuesArr = valuesArr.length
    for (let i = 0; i<= lenValuesArr; i++){
      shaddowArr.push(1000);
    }
    let maxValue;
    let maxValueMotorrad = Math.max(...temp);
    let maxValueFahrrad = Math.max(...responseFahrr[0].values);
    let maxValueRain = Math.max(...responseRain[0].values);
    if (maxValueMotorrad > maxValueFahrrad) {
      maxValue = maxValueMotorrad;
    } else {
      maxValue = maxValueFahrrad;
    }
    let option = {
      title: {
        text: "Kamera: " + input,
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        show: true,
        data: timestampstoString(responseMotor[0].timestamps),
      },
      legend: {
        data: ['Summe Fahrräder', 'Summe Motorräder', 'Niederschlag']
      },
      yAxis: [{
          type: 'value',
          name: 'Fahrräder/Stunde',
          min: 0,
          max: maxValue,
        },
        {
          type: 'value',
          name: 'Niederschlag (mm)',
          nameLocation: 'start',
          min: 0,
          max: maxValueRain,
          inverse: true,
          axisLine: {
            lineStyle: {
              // color: "#0088ff",
              color:"blue",
              width: 3
            }
          }
        }
      ],
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },dataZoom: [
        {
        },
        {
          type: "inside",
        },
      ],
      series: [{
          name: 'Summe Motorräder',
          type: 'line',
          data: temp,
          color: '#FF8800'
        },
        { // shadow bar
          type: 'bar',
          barWidth: '100%',
          itemStyle: {
              // transparent bar
              normal: { color: 'rgba(0, 0, 0, 0)' }
          },
          barGap: '-100%',
          data: shaddowArr,
          tooltip: {
            show: false
         }
      },
        {
          name: 'Summe Fahrräder',
          type: 'line',
          data: responseFahrr[0].values,
          color: '#00ff00'
        },
        {
          name: 'Niederschlag',
          type: 'line',
          yAxisIndex: 1,
          data: responseRain[0].values,
          areaStyle: {},
          color: '#0088ff',
        }
      ]
    }
    summeZweirrad.setOption(option);
  } catch (err) {
    console.log(err);
  }
}
doWork("mavi001");

summeZweirrad.on('click', function (params) {
  //TS_ID_Fahrräder  
  console.log(constFahrrArr);
  //TS_ID_Motorräder
  console.log(constMotorArr);
  //TS_ID_Wetterstationen
  console.log(precipitationArr);
  //Datum
  console.log(params);
  
});

$(window).on('resize', function () {
  if (summeZweirrad != null && summeZweirrad != undefined) {
    summeZweirrad.resize();
  }
});

function getData(tsID, startDate, endDate, interval, limit, func = 'avg', lora = false, sort = 'asc') {
  data = [];
  lora ? api_key = "b64af05bfac248888c1ff5681daab321" : api_key = "8e3b5fe2c8644919ae63394238b89644";
  var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=${api_key}&timeSeriesId=${tsID}&func=${func}&interval=${interval}&timezone=Europe%2FBerlin&output=split&metadata=false&from=${startDate}&to=${endDate}&sort=${sort}`;
  var promise = new Promise((resolve, reject) => {
    $.getJSON(
      url, {},
      function (res) {

        data.push(res);

        // weatherData.push(res);
        resolve(res);
        reject("Keine Daten Verfügbar");
      }
    );
  });
  return promise;
}


function timestampstoString(response) {
  timestamps = [];
  var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  response.forEach(element => {
    date = new Date(element);
    timestamps.push(date.toLocaleDateString("de-DE", options));
  });
  return timestamps;
}