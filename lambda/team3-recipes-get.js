const {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "Recipe";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  /*
  // 今回は簡易的な実装だが、一般的にはAuthorizationHeaderの値は、Authorization: <type> <credentials>のような形式になります。
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Authorization#%E6%A7%8B%E6%96%87
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません。HeaderにTokenを指定してください",
    });

    return response;
  }
  */
  
  function extractObjectsMatchingTarget(objectArray, targetIndices) {
    console.log(7.1)
    const matchingObjects = objectArray.filter(obj => {
      console.log(7.2)
      console.log(targetIndices)
      const nestedArray = obj.material;
      return targetIndices.every(index => {
        if (nestedArray[index] === true) {
          return true;
        }
      });
    });
    return matchingObjects;
  }


  const param = {
    TableName,
    //Limit: 100,
  }
  
  const scanCommand = new ScanCommand(param);
  try {
    const articles = (await client.send(scanCommand)).Items;
    //console.log(1)
  
    if (articles.length == 0) {
      //response.body = JSON.stringify({ articles: [] });
      response.body = JSON.stringify({ recipes: [] });
      //console.log(2)
    } else {
      const unmarshalledArticles = articles.map((item) => unmarshall(item));
      //console.log(3)
      //unmarshalledArticles.sort((a, b) => b.timestamp - a.timestamp);
      const qs = event.queryStringParameters;
      //console.log(4)
      //console.log(qs)
      //console.log(qs?.material)
      const hasValidQs = qs?.material;
      let newUnmsArticles = [];
      //console.log(5)
      /* 動作確認済み始まり */
      /*
      if (!hasValidQs) {
        //response.body = JSON.stringify({ articles: unmarshalledArticles });
        response.body = JSON.stringify({ recipes: unmarshalledArticles });
        //console.log(6)
      } else{
        //console.log(7)
        for (let i = 0; i < unmarshalledArticles.length; i++) {
          //console.log(i)
          if (unmarshalledArticles[i].material == hasValidQs){
            newUnmsArticles.push(unmarshalledArticles[i]);
          }
        }
        //response.body = JSON.stringify({ articles: newUnmsArticles });
        response.body = JSON.stringify({ recipes: newUnmsArticles });
      }
      //*/
      /* 動作確認済みおわり */
      console.log(1)
      if(!hasValidQs) {
        console.log(2)
        response.body = JSON.stringify({ recipes: unmarshalledArticles })
      } else {
        console.log(3)
        const arr = hasValidQs.split(',');
        let target = [];
        console.log(3.5)
        for( let g = 0; g < arr.length; g++) {
          console.log(3.6)
          if (arr[g] == 'true') {
            target.push(g);
            console.log(3.7)
          }
          else{
            console.log(3.8)
          }
        }
        console.log(4)
        console.log(target)
        /*for (let i = 0; i < unmarshalledArticles.length; i++) {
          const uma = unmarshalledArticles[i].material;
          console.log('5+'+i)
          console.log('uma:'+uma)
          console.log('uma[0]:'+uma[0])
          // hasValidQsのうち、Trueのものが
          for( let j = 0; j < target.length; j++) {
            console.log('6+'+j)
            const k = target[j]
            //console.log('target['+j+']:'+k)
            //console.log('uma[k]:'+uma[k])
            if (uma[k] == true){
              newUnmsArticles.push(uma[k]);
              console.log(7)
            }
          }
        }//*/
        ///*
        console.log(7)
        const arrays = unmarshalledArticles;
        const newUnmsArticles = extractObjectsMatchingTarget(arrays, target);
        //*/
        console.log(8)
        response.body = JSON.stringify({ recipes: newUnmsArticles });
      }
    }
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
