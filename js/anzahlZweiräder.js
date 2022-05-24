var summeZweirad = echarts.init(document.getElementById("summeZweirad"));

let fahrrArr = [
  {
      "name": "mavi001",
      "timeSeriesId": "00f21618-e568-4655-8752-bd58e7b7ae62"
  },
  {
      "name": "mavi004",
      "timeSeriesId": "cce2942f-93af-4d88-a0ab-f73af12f9414"
  },
  {
      "name": "mavi009",
      "timeSeriesId": "5df18a0a-f265-4b3f-9dac-c9f3e69398bd"
  },
  {
      "name": "mavi015",
      "timeSeriesId": "2695f99f-e084-429c-a9cd-56e784db11e0"
  },
  {
      "name": "mavi018",
      "timeSeriesId": "5d23d4f6-bc22-4a03-ac99-456af432178e"
  },
  {
      "name": "mavi014",
      "timeSeriesId": "ba4435d4-17d5-40f2-ab9f-15ac6cd81b09"
  },
  {
      "name": "mavi011",
      "timeSeriesId": "92f614ee-51f9-4d62-9cc5-1251ddb3b767"
  }
];
let motorArry = [
  {
      "name": "mavi001",
      "timeSeriesId": "4e29656b-1367-4d5d-aae0-dddfb5ebac10"
  },
  {
      "name": "mavi001",
      "timeSeriesId": "ef367d5f-1695-43e6-b7c5-fcd12dc05c5b"
  },
  {
      "name": "mavi004",
      "timeSeriesId": "087365d3-8107-49d4-888b-360f9d68da88"
  },
  {
      "name": "mavi004",
      "timeSeriesId": "d649abff-b90d-42bf-9279-ad57bb35a75b"
  },
  {
      "name": "mavi015",
      "timeSeriesId": "1c915ec1-dd03-4bf2-a352-eb29ad25ec1d"
  },
  {
      "name": "mavi015",
      "timeSeriesId": "4b8c979b-db41-4402-9fdc-7d6586b015ee"
  },
  {
      "name": "mavi015",
      "timeSeriesId": "fecc0ce7-f023-4c44-a9bb-11594de9b96b"
  },
  {
      "name": "mavi018",
      "timeSeriesId": "b165d487-1d31-45e6-80af-237ed7f592f2"
  },
  {
      "name": "mavi018",
      "timeSeriesId": "db1eaf4c-8dda-4fe1-bb67-2081d2fdde98"
  },
  {
      "name": "mavi016",
      "timeSeriesId": "62a1cc1b-abe5-4464-b1f0-3769e9e03390"
  },
  {
      "name": "mavi003",
      "timeSeriesId": "085437f3-efa6-4f04-9ed2-38a71bddae8d"
  },
  {
      "name": "mavi003",
      "timeSeriesId": "356c42a7-e132-4f9f-bbe6-6981460df23a"
  },
  {
      "name": "mavi003",
      "timeSeriesId": "4d020bcb-c875-44aa-ae2c-1941452e530d"
  },
  {
      "name": "mavi006",
      "timeSeriesId": "2298ae02-beed-44b6-bf50-150b8433d106"
  },
  {
      "name": "mavi006",
      "timeSeriesId": "77ebb15d-ad35-4416-91e4-92f5d0c6ff31"
  },
  {
      "name": "mavi009",
      "timeSeriesId": "8113d28a-4ab6-474b-ae80-72405363290a"
  },
  {
      "name": "mavi009",
      "timeSeriesId": "d53df425-f0bf-4086-bd61-01e753c71657"
  },
  {
      "name": "mavi010",
      "timeSeriesId": "be2d8845-7a1f-4aaa-9416-9aed44b04ed5"
  },
  {
      "name": "mavi010",
      "timeSeriesId": "d48da9a1-b748-4338-902e-3c00e3af2ffa"
  },
  {
      "name": "mavi010",
      "timeSeriesId": "dffbd749-b7a4-4278-a567-7701f4b5233d"
  },
  {
      "name": "mavi012",
      "timeSeriesId": "6e9436f0-0d4c-40fe-921b-c5913ee15366"
  },
  {
      "name": "mavi012",
      "timeSeriesId": "f26ca69a-fdb4-4b56-b7b0-e6368250b55e"
  },
  {
      "name": "mavi012",
      "timeSeriesId": "f69f61d8-0890-4075-858b-8f70c0c2bf2c"
  },
  {
      "name": "mavi002",
      "timeSeriesId": "7668de62-aead-40ce-8df4-3b46e7a15cf9"
  },
  {
      "name": "mavi013",
      "timeSeriesId": "1ed87aa0-e903-4e7c-acbb-2c3843a45154"
  },
  {
      "name": "mavi013",
      "timeSeriesId": "b07cb357-8e2b-4684-86b8-330581cc0c83"
  },
  {
      "name": "mavi005",
      "timeSeriesId": "64c08a25-d93b-4806-885e-972c112f9426"
  },
  {
      "name": "mavi005",
      "timeSeriesId": "ec2b103d-fda2-40bf-a4f8-031d47eb8cbf"
  },
  {
      "name": "mavi011",
      "timeSeriesId": "0d8d7eac-2d70-424a-8bd8-c050804fe470"
  },
  {
      "name": "mavi011",
      "timeSeriesId": "3ed8081f-346f-458d-b54a-acf4792ae4e1"
  },
  {
      "name": "mavi019",
      "timeSeriesId": "47a300a1-cd6f-4122-b5d5-59b1a906bdac"
  },
  {
      "name": "mavi019",
      "timeSeriesId": "a7ba86d3-5426-4467-bf8e-cf39b68ed268"
  },
  {
      "name": "mavi019",
      "timeSeriesId": "e77da216-ea1b-4269-9266-a8229d1f69b4"
  },
  {
      "name": "mavi014",
      "timeSeriesId": "498013c0-87f5-4965-a15a-4d187965023e"
  },
  {
      "name": "mavi014",
      "timeSeriesId": "53c41705-6264-4bab-9312-e69876427072"
  },
  {
      "name": "mavi007",
      "timeSeriesId": "215f8dc2-51f6-48b1-9b67-5e252b66f362"
  },
  {
      "name": "mavi007",
      "timeSeriesId": "b363ecb7-474c-48f1-b9f8-2cf3a1aa3994"
  }
];

let sum = [];
function getSumZweirad (tsID, startDate, endDate){
  return new Promise((resolve,reject) =>{
    $.getJSON(
      `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&from=${startDate}&to=${endDate}&func=sum&interval=d&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`,
      {},
      function (res) {
        for (let elements in res){ 
          sum.push(res);
        }
        resolve(res);
        reject("Keine Daten Verfügbar");
      }
    );
  })
}


let sumFahrr = [];
let startDate = "2022-01-01T00%3A00%3A00.000Z";
function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth()+1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
//var hour = date.getHours();
//var minute =date.getMinutes();
//var seconds = date.getSeconds();
//var milliseconds = date.getMilliseconds();
var year= date.getFullYear();

let formattedDate =  year+"-"+month+"-"+day+"T"+23+":"+59+":"+59+"."+999+"Z";
let endDate = "2022-05-01T00%3A00%3A00.000Z";

async function doWork(input){
  try{
    let kamera ="";
    switch (input){
      case 0:
        kamera = "Mavi001";
        break;
      case 1:
        kamera = "Mavi004";
        break;
      case 2:
        kamera = "Mavi009";
        break;
      case 3:
        kamera = "Mavi015";
        break;
      case 4:
        kamera = "Mavi018";
        break;
      case 5:
        kamera = "Mavi014";
        break;
      case 6:
        kamera = "Mavi011";
        break;
      default:
        kamera = "Mavi001";
        break;
    }
  const response = await getSumZweirad(fahrrArr[input].timeSeriesId, startDate, formattedDate);
  console.log(fahrrArr)
  summeZweirad.setOption(
    (option = {
      title: {
        text: "Mannheim - "+ kamera,
        subtext: "Anzahl Fahrräder 2022 Januar - Heute"
      },
      tooltip:{
        trigger: 'axis'
      },
      grid:{
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: "category",
        data: response[0].timestamps
      },
      yAxis: {
        type: "value",
      },toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          startValue: '2014-06-01'
        },
        {
          type: 'inside'
        }
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 1000,
            lte: 1500,
            color: '#93CE07'
          },
          {
            gt: 1500,
            lte: 1750,
            color: '#FBDB0F'
          },
          {
            gt: 1750,
            lte: 2000,
            color: '#FC7D02'
          },
          {
            gt: 2000,
            lte: 2500,
            color: '#FD0100'
          },
          {
            gt: 2500,
            lte: 2750,
            color: '#AA069F'
          },
          {
            gt: 2750,
            color: '#AC3B2A'
          }
        ],
        outOfRange: {
          color: '#999'
        }
      },
      series: [
        {
          type: "line",
          data: response[0].values,
        },
      ],
    })
  );

  }catch (err){
    console.log(err);
  }

}
doWork(0);

