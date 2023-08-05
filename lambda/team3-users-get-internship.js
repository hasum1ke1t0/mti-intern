const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "User";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {TableName,};

  const command = new ScanCommand(param);

  try {
    console.log("全権取得")
    // client.send()で全件取得するコマンドを実行
    const users = (await client.send(command)).Items;
    console.log("全権取得完了")

    //TODO: 全ユーザのpasswordを隠蔽する処理を記述
    console.log("隠ぺい処理開始")
    users?.forEach((item)=>{
      console.log(item)
      delete item?.password;
    });
    console.log("隠ぺい処理完了")

    //TODO: レスポンスボディを設定する
    response.body  = JSON.stringify(users.map((item)=>unmarshall(item)));
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
