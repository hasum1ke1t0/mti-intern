const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
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

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const {userId, age, nickname, password} = JSON.parse(event.body)

  // TODO: paramに更新対象のテーブル名と更新内容を記述
  const param = {TableName,
    Item:marshall({
      userId,
      age,
      nickname,
      password
    })
  };

  const command = new PutItemCommand(param);

  try {
    await client.send(command);
    // TODO: 更新に成功した場合の処理を記述(response bodyを設定する)
    response.body = JSON.stringify({
      userId,age,nickname
    })
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
