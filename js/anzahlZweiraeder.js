var summeZweirrad = echarts.init(document.getElementById("summeZweirrad"), 'dark');

async function getTsIDsKamera(kamera){
  let motorArr = await fetch("./data/mavi_motorrad_sensors.json").then(response => response.json());
  return new Promise((resolve, reject) => {
  returnArr= [];
  for(let i= 0; i <motorArr.length; i++){
    if(motorArr[i].name == kamera){
      returnArr.push(motorArr[i].timeSeriesId);
    };
    }
    return resolve(returnArr);
    reject("Keine Daten");
});
}

async function doWork(input) {
let fahrrArr = await fetch("./data/mavi_fahrrad_sensors.json").then(response => response.json());


  try {
    let auswahl = 0;
    let nummer;
    switch (input) {
      case "mavi001":
        auswahl =  await getTsIDsKamera(input);
        nummer = 0;
        break;
      case "mavi004":
        auswahl =  await getTsIDsKamera(input);
        nummer = 1;
        break;
      case "mavi009":
        auswahl =  await getTsIDsKamera(input);
        nummer = 2;
        break;
      case "mavi015":
        auswahl =  await getTsIDsKamera(input);
        nummer = 3;
        break;
      case "mavi018":
        auswahl =  await getTsIDsKamera(input);
        nummer = 4;
        break;
      case "mavi014":
        auswahl =  await getTsIDsKamera(input);
        nummer = 5;
        break;
      case "mavi011":
        auswahl =  await getTsIDsKamera(input);
        nummer = 6;
        break;
      case "mavi016":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi003":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi006":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi010":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi012":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi002":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi013":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi005":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi019":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      case "mavi007":
        auswahl =  await getTsIDsKamera(input);
        nummer = 7;
        break;
      default :
        auswahl = await getTsIDsKamera("mavi001");
        nummer = 0;
        break;
    }
    const responseMotor = await getSumMotorrad(
      auswahl[0],auswahl[1],auswahl[2],
      startDate,
      endDate,
      "H"
    );
    
    const responseFahrr = await getSumFahrrad(fahrrArr[nummer].timeSeriesId, startDate, endDate);
    const responseRain = await getData(precipitationArr[0].timeSeriesId, startDate, "2022-05-24T00%3A00%3A00.000Z", 'H', 'avg');
    console.log(responseMotor);
    let temp = [];
    for(let i=0; i<responseMotor[0].values.length;i++){
      if(responseMotor[0] && responseMotor[1] && responseMotor[2]){
        if(responseMotor[0].values.length==responseMotor[1].values.length){
        if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]&&responseMotor[0].timestamps[i]==responseMotor[2].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]+responseMotor[2].values[i]);
        }
      }else{
        anzahlNeueElemente = responseMotor[0].values.length-responseMotor[1].values.length;
        for(let j=0; j<anzahlNeueElemente;j++){
        responseMotor[0].timestamps.shift();
        responseMotor[0].values.shift();
        responseMotor[2].timestamps.shift();
        responseMotor[2].values.shift();
        }
        if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]&&responseMotor[0].timestamps[i]==responseMotor[2].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]+responseMotor[2].values[i]);
        }
      }
      }else if(responseMotor[0] && responseMotor[1]){
        if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]);
        }
      }else if(responseMotor[0]){
          temp.push(responseMotor[0].values[i]);

        }
      }
    let maxValue;
    let maxValueMotorrad = Math.max(...temp);
    let maxValueFahrrad = Math.max(...responseFahrr[0].values);
    let maxValueRain = Math.max(...responseRain[0].values);
    if(maxValueMotorrad>maxValueFahrrad){
      maxValue = maxValueMotorrad;
    }else{
      maxValue = maxValueFahrrad;
    }

    console.log(maxValue);
    summeZweirrad.setOption(
      (option = {
        title: {
          text: "Kamera: " +input,
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "10%",
        },
        xAxis: {
          type: "category",
          show: true,
          data: timestampstoString(responseMotor[0].timestamps),
        },
        legend: {
          data: ['Summe Fahrräder', 'Summe Motorräder', 'Niederschlag']
        },
        yAxis: 
          [
            {
              type: 'value',
              name: 'SummeFahrräder/Stunde',
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
            }
          ]
        ,
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
            startValue: "2022-01-17",
          },
          {
            type: "inside",
          },
        ],
        series: 
        [
          {
            name: 'Summe Motorräder',
            type: 'line',
            data: temp,
            color: '#FF8800'
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
      })
    );
  } catch (err) {
    console.log(err);
  }
}
doWork("mavi001");
$(window).on('resize', function(){
  if(summeZweirrad != null && summeZweirrad != undefined){
      summeZweirrad.resize();
  }
});
