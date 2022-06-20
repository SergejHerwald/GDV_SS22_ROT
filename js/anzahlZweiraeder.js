var summeZweirrad = echarts.init(document.getElementById("summeZweirrad"), 'dark');

async function doWork3(input) {

  try {
    let auswahl = 0;
    let nummer = 0;
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
        break;
      case "mavi003":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi006":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi010":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi012":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi002":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi013":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi005":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi019":
        auswahl =  await getTsIDsKamera(input);
        break;
      case "mavi007":
        auswahl =  await getTsIDsKamera(input);
        break;
      default :
        auswahl = await getTsIDsKamera("mavi001");
        break;
    }
    const responseMotor = await getSumMotorrad(
      auswahl[0],auswahl[1],auswahl[2],
      startDate,
      formattedDate,
      "H"
    );
    const responseFahrr = await getSumFahrrad(
      fahrrArr[nummer].timeSeriesId, startDate, formattedDate);
    const responseRain = await getData(precipitationArr[0].timeSeriesId, startDate, "2022-05-24T00%3A00%3A00.000Z", 'H', 'avg');
      
    let temp = [];
    for(let i=0; i<responseMotor[0].values.length;i++){
      if(responseMotor[0] && responseMotor[1] && responseMotor[2]){
        if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]&&responseMotor[0].timestamps[i]==responseMotor[2].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]+responseMotor[2].values[i]);
        }
      }else if(responseMotor[0] && responseMotor[1]){
        if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]);
        }
      }else if(responseMotor[0]){
          temp.push(responseMotor[0].values[i]);

        }
      }
      console.log(temp);
    summeZweirrad.setOption(
      (option = {
        title: {
          text: input,
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
              name: 'SummeFahrräder',
              min: 0,
              max: 500,
            },
            {
              type: 'value',
              name: 'Niederschlag',
              min: 0,
              max: 5,
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
            type: 'bar',
            data: temp
          },
          {
            name: 'Summe Fahrräder',
            type: 'bar',
            data: responseFahrr[0].values
          },
          {
            name: 'Niederschlag',
            type: 'line',
            yAxisIndex: 1,
            data: responseRain[0].values
          }
        ]
      })
    );
  } catch (err) {
    console.log(err);
  }
}
doWork3(0);
