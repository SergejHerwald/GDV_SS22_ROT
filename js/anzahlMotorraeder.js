var summeMotorrad = echarts.init(document.getElementById("summeMotorrad"));

let motorArray = [
  {
    name: "mavi001",
    timeSeriesId: "4e29656b-1367-4d5d-aae0-dddfb5ebac10",
  },
  {
    name: "mavi001",
    timeSeriesId: "ef367d5f-1695-43e6-b7c5-fcd12dc05c5b",
  },
  {
    name: "mavi004",
    timeSeriesId: "087365d3-8107-49d4-888b-360f9d68da88",
  },
  {
    name: "mavi004",
    timeSeriesId: "d649abff-b90d-42bf-9279-ad57bb35a75b",
  },
  {
    name: "mavi015",
    timeSeriesId: "1c915ec1-dd03-4bf2-a352-eb29ad25ec1d",
  },
  {
    name: "mavi015",
    timeSeriesId: "4b8c979b-db41-4402-9fdc-7d6586b015ee",
  },
  {
    name: "mavi015",
    timeSeriesId: "fecc0ce7-f023-4c44-a9bb-11594de9b96b",
  },
  {
    name: "mavi018",
    timeSeriesId: "b165d487-1d31-45e6-80af-237ed7f592f2",
  },
  {
    name: "mavi018",
    timeSeriesId: "db1eaf4c-8dda-4fe1-bb67-2081d2fdde98",
  },
  {
    name: "mavi016",
    timeSeriesId: "62a1cc1b-abe5-4464-b1f0-3769e9e03390",
  },
  {
    name: "mavi003",
    timeSeriesId: "085437f3-efa6-4f04-9ed2-38a71bddae8d",
  },
  {
    name: "mavi003",
    timeSeriesId: "356c42a7-e132-4f9f-bbe6-6981460df23a",
  },
  {
    name: "mavi003",
    timeSeriesId: "4d020bcb-c875-44aa-ae2c-1941452e530d",
  },
  {
    name: "mavi006",
    timeSeriesId: "2298ae02-beed-44b6-bf50-150b8433d106",
  },
  {
    name: "mavi006",
    timeSeriesId: "77ebb15d-ad35-4416-91e4-92f5d0c6ff31",
  },
  {
    name: "mavi009",
    timeSeriesId: "8113d28a-4ab6-474b-ae80-72405363290a",
  },
  {
    name: "mavi009",
    timeSeriesId: "d53df425-f0bf-4086-bd61-01e753c71657",
  },
  {
    name: "mavi010",
    timeSeriesId: "be2d8845-7a1f-4aaa-9416-9aed44b04ed5",
  },
  {
    name: "mavi010",
    timeSeriesId: "d48da9a1-b748-4338-902e-3c00e3af2ffa",
  },
  {
    name: "mavi010",
    timeSeriesId: "dffbd749-b7a4-4278-a567-7701f4b5233d",
  },
  {
    name: "mavi012",
    timeSeriesId: "6e9436f0-0d4c-40fe-921b-c5913ee15366",
  },
  {
    name: "mavi012",
    timeSeriesId: "f26ca69a-fdb4-4b56-b7b0-e6368250b55e",
  },
  {
    name: "mavi012",
    timeSeriesId: "f69f61d8-0890-4075-858b-8f70c0c2bf2c",
  },
  {
    name: "mavi002",
    timeSeriesId: "7668de62-aead-40ce-8df4-3b46e7a15cf9",
  },
  {
    name: "mavi013",
    timeSeriesId: "1ed87aa0-e903-4e7c-acbb-2c3843a45154",
  },
  {
    name: "mavi013",
    timeSeriesId: "b07cb357-8e2b-4684-86b8-330581cc0c83",
  },
  {
    name: "mavi005",
    timeSeriesId: "64c08a25-d93b-4806-885e-972c112f9426",
  },
  {
    name: "mavi005",
    timeSeriesId: "ec2b103d-fda2-40bf-a4f8-031d47eb8cbf",
  },
  {
    name: "mavi011",
    timeSeriesId: "0d8d7eac-2d70-424a-8bd8-c050804fe470",
  },
  {
    name: "mavi011",
    timeSeriesId: "3ed8081f-346f-458d-b54a-acf4792ae4e1",
  },
  {
    name: "mavi019",
    timeSeriesId: "47a300a1-cd6f-4122-b5d5-59b1a906bdac",
  },
  {
    name: "mavi019",
    timeSeriesId: "a7ba86d3-5426-4467-bf8e-cf39b68ed268",
  },
  {
    name: "mavi019",
    timeSeriesId: "e77da216-ea1b-4269-9266-a8229d1f69b4",
  },
  {
    name: "mavi014",
    timeSeriesId: "498013c0-87f5-4965-a15a-4d187965023e",
  },
  {
    name: "mavi014",
    timeSeriesId: "53c41705-6264-4bab-9312-e69876427072",
  },
  {
    name: "mavi007",
    timeSeriesId: "215f8dc2-51f6-48b1-9b67-5e252b66f362",
  },
  {
    name: "mavi007",
    timeSeriesId: "b363ecb7-474c-48f1-b9f8-2cf3a1aa3994",
  },
];

let summe = [];
function getSumMotorrad(tsID, tsID2=0, tsID3=0, startDate, endDate, granularity) {
  return new Promise((resolve, reject) => {
    var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    if(tsID2 !=0 && tsID3 !=0){
      url=`https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&timeSeriesId=${tsID2}&timeSeriesId=${tsID3}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    }else if(tsID2 != 0 ){
      url=`https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&timeSeriesId=${tsID2}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    }else{
    }
      $.getJSON(
        url,
        {},
        function (res) {
          for (let elements in res) {
            summe.push(res);
            
          }
          //console.log(res);
          resolve(res);
          reject("Keine Daten Verfügbar");
        }
      );
  });
}



function getTsIDsKamera(kamera){
  return new Promise((resolve, reject) => {
  returnArr= [];
  for(let i= 0; i <motorArray.length; i++){
    if(motorArray[i].name == kamera){
      returnArr.push(motorArray[i].timeSeriesId);
    };
    }
    //console.log(returnArr);
    return resolve(returnArr);
    reject("Keine Daten");
});
}

async function doWork2(input) {

  try {
    let kamera = "";
    let auswahl = 0;
    switch (input) {
      case 0:
        kamera = "mavi001";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 1:
        kamera = "mavi004";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 2:
        kamera = "mavi009";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 3:
        kamera = "mavi015";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 4:
        kamera = "mavi018";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 5:
        kamera = "mavi014";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 6:
        kamera = "mavi011";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 7:
        kamera = "mavi016";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 8:
        kamera = "mavi003";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 9:
        kamera = "mavi006";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 10:
        kamera = "mavi010";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 11:
        kamera = "mavi012";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 12:
        kamera = "mavi002";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 13:
        kamera = "mavi013";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 14:
        kamera = "mavi005";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 15:
        kamera = "mavi019";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      case 16:
        kamera = "mavi007";
        auswahl =  await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
      default:
        kamera = "mavi001";
        auswahl = await getTsIDsKamera(kamera);
        console.log(auswahl);
        break;
    }
    var responseMotor = await getSumMotorrad(
      auswahl[0],auswahl[1],auswahl[2],
      startDate,
      formattedDate,
      "d"
    );
    
    
      //TODO
      /*
      *Aufsummieren der einzelnen Werte funktioniert noch nicht so wie es soll 
      *PROBLEM:
      * Es kann vorkommen, dass ein Gerät mehrere Timeseries hat. Hier können sich die Timestamps aber unterscheiden.
      * Man muss es schaffen, auch wenn in Timeseries A keine werte für Tag X vorliegen in Timeseries B aber schon diese korrekt zu summieren  
      * Bsp.
      * TimeseriesId: A                              TimeseriesId: B          TimeseriesId: C
      * Timestamps: [1,2,3,4,5,6,7,8,9,10]           Timestamps: [3,6,8,9]    Timestamps: [1,2,3,4,5,6,7]
      * values: [10,20,30,40,50,60,70,80,90,100]     values: [10,2,4,5]       values: [1,20,30,4,50,6,70]
      */
      /**
       * Stelle1 werte vorhanden, stelle2 werte vorhanden, stelle3 werte vorhanden
       * stelle1 werte vorhanden, stell2 werte vorhanden, stelle3 KEINE werte vorhanden
       * Stell1 werte vorhanden, stelle2 KEINE werte vorhanden, stelle3 KEINE werte vorhanden
       * Stell1 KEINE werte vorhanden, Stelle2 werte vorhanden,
       */


       console.log(responseMotor);
    let temp = [];
    for(let i = 0; i<20000;i++){
        if(!responseMotor[1].timestamps[i]){
          temp.push(responseMotor[0].values[i]);
        }else if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]==responseMotor[2].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]+responseMotor[2].timestamps[i]);
        }else if (!responseMotor[0].timestamps[i]){
         temp.push(responseMotor[1].values[i]);
        }else if(responseMotor[0].timestamps[i]==responseMotor[1].timestamps[i]){
          temp.push(responseMotor[0].values[i]+responseMotor[1].values[i]);

        }
    }

    summeMotorrad.setOption(
      (option = {
        title: {
          text: "Mannheim - " + kamera,
          subtext: "Anzahl Motorräder 2022 Januar - Heute",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "10%",
        },
        xAxis: {
          type: "category",
          data: responseMotor[1].timestamps,
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
            type: "line",
            smooth: true,
            data: temp,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
        ],
      })
    );
  } catch (err) {
    console.log(err);
  }
}
doWork2(0);
