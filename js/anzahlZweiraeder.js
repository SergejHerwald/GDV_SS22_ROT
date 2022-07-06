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
var twoWeeksAgo = echarts.init(document.getElementById("vorZweiWochen"), 'dark');
var oneWeekAgo = echarts.init(document.getElementById("vorEinerWoche"), 'dark');
var thisDay = echarts.init(document.getElementById("dieserTag"), 'dark');
var oneWeekInFuture = echarts.init(document.getElementById("eineWocheDanach"), 'dark');
var twoWeeksInFuture = echarts.init(document.getElementById("zweiWochenDanach"), 'dark');
var subCharts = [twoWeeksAgo, oneWeekAgo, thisDay, oneWeekInFuture, twoWeeksInFuture];
summeZweirrad.group = 'gruppe1';
twoWeeksAgo.group = 'gruppe2';
oneWeekAgo.group = 'gruppe2';
thisDay.group = 'gruppe2';
oneWeekInFuture.group = 'gruppe2';
twoWeeksInFuture.group = 'gruppe2';
echarts.connect('gruppe2');
async function getTsIDsKamera(kamera) {
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
        nummer = 0;
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
    const responseRain = await getData(precipitationArr[0].timeSeriesId, startDate, endDate, 'H', 'avg');
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
    for (let i = 0; i <= lenValuesArr; i++) {
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
    console.log(responseMotor);

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
        name: 'Zweiräder/Stunde',
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
            color: "blue",
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
      }, dataZoom: [
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
summeZweirrad.on('click', async function (params) {

  dates = getTimeDate(params['name']);
  // xData = getHoursMinutes();

  data = await getAllData(dates);
  max = [data[1],data[2]]
  console.log(data);
  for (i = 0; i < 5; i++) {
    subChartDate = new Date(dates[i][0]);
    subChartTitle = subChartDate.toLocaleDateString("de-DE", {weekday:'long',day: '2-digit', month: '2-digit' });
    subCharts[i].setOption(getOption(subChartTitle, data[0][i],max ));
    subCharts[i].resize();
  }
});

function getTimeDate(date) {
  var dateSplited = date.split(', ')[1].split('.');
  var date = new Date(dateSplited[2], dateSplited[1] - 1, dateSplited[0], 0, 0, 0, 0);
  var date2 = new Date(dateSplited[2], dateSplited[1] - 1, dateSplited[0], 23, 59, 59, 0);
  var dates = [
    [calcDate(date, -14), calcDate(date2, -14)],
    [calcDate(date, -7), calcDate(date2, -7)],
    [calcDate(date, 0), calcDate(date2, 0)],
    [calcDate(date, 7), calcDate(date2, 7)],
    [calcDate(date, 14), calcDate(date2, 14)],
  ]
  return dates;
}
function calcDate(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
}

async function getAllData(dates) {
  var data = []
  var maxZweirad = 0;
  var maxRain = 0;
  
  for (i = 0; i < 5; i++) {
    [data[i], max] = await getMultiData(dates[i])
    maxZweirad = Math.max(maxZweirad, max[0]);
    maxRain = Math.max(maxRain, max[1]);
}
return [data, maxZweirad, maxRain];
}
async function getMultiData(day) {
  fahrrData = [];
  fahrrData.push(await getDayData(constFahrrArr, day));


  motorrData = [];
  motorrData.push(await getDayData(constMotorArr[0], day));

  preciptionData = [];
  preciptionData.push(await getDayData(precipitationArr[0].timeSeriesId, day));
  maxFahr = Math.max(...(fahrrData[0][0].values));
  maxMotor = Math.max(...(motorrData[0][0].values));
  maxRain = Math.max(...(preciptionData[0][0].values));
  maxZweirad = Math.max(maxFahr, maxMotor);
  return [[fahrrData, motorrData, preciptionData],[maxZweirad, maxRain]];
}

async function getDayData(tsID, day) {
  var dat;
  dat = await getData(tsID, day[0], day[1], 'M');
  console.log(await dat);
  return dat;

}

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
 function getHoursMinutes(timestamps) {
  returnTimestamps = [];
  var options = { hour: 'numeric', minute: 'numeric' };
  // for (h = 0; h < 24; h++) {
  //   for (m = 0; m <= 6; m++) {
  //     date = new Date(2022, 1, 1, h, m * 10);
  //     returnTimestamps.push(date.toLocaleTimeString("de-DE", options))

  //   }
  // }
  timestamps.forEach(timestamp => {
  date = new Date(timestamp);
  returnTimestamps.push(date.toLocaleTimeString("de-DE",options))
  });
  return returnTimestamps;

}

  function getOption(title, data,max) {
  maxZweirad= Math.ceil(max[0]/5)*5;
  maxRain= Math.ceil(max[1]);
  console.log(maxZweirad, maxRain)
  console.log(data[0][0][0].timestamps);
  let option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      confine: true,
    },
    xAxis: {
      type: "category",
      show: true,
      data:getHoursMinutes( data[0][0][0].timestamps),
      // formatter: '{HH}:{mm}',
     
    
      
    },

    yAxis: [{
      type: 'value',
      min: 0,
      max: maxZweirad,
    },
    {
      type: 'value',
      nameLocation: 'start',
      min: 0,
      max: maxRain,
      inverse: true,
      axisLine: {
        lineStyle: {
          // color: "#0088ff",
          color: "blue",
          width: 3
        }
      }
    }
    ],
dataZoom: [
        {
        },
        {
          type: "inside",
        },
      ],
    series: [
      {
        name: 'Summe Motorräder',
        type: 'line',
        data: data[1][0][0].values,
        color: '#FF8800'
      },

      {
        name: 'Summe Fahrräder',
        type: 'line',
        data:data[0][0][0].values,
        color: '#00ff00'
      },
      {
        name: 'Niederschlag',
        type: 'line',
        yAxisIndex: 1,
        data: data[2][0][0].values,
        areaStyle: {},
        color: '#0088ff',
      }
    ]

  };


  return option;
}