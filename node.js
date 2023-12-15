module.exports = (RED) => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const main = function (config) {
    RED.nodes.createNode(this, config);
    this.prompt = config.prompt || [];
    this.promptType = config.promptType || "str";
    this.Token = config.Token || "";
    const node = this;
    const genAI = new GoogleGenerativeAI(node.Token);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision"});

    node.on("input", async (msg) => {
      node.status({ fill: "green", shape: "dot", text: "処理中..." });
      try {
        const prompt = RED.util.evaluateNodeProperty(node.prompt, node.promptType, node, msg);
        const imagePart = msg.payload.startsWith("http") ?
          await urlToGenerativePart(msg.payload, "image/png") :
          fileToGenerativePart(msg.payload, "image/png");
        const result = await model.generateContent([prompt, imagePart]);
        msg.payload = await result.response.text();
        node.status({});
      } catch (error) {
        const errorMessage = error.response ?
          `${error.response.status}, ${JSON.stringify(error.response.data.error.message)}` :
          `${error.type}, ${error.message}`;
        node.status({ fill: "red", shape: "dot", text: errorMessage });
        msg.payload = errorMessage;
      }
      node.send(msg);
    });
  };

  RED.nodes.registerType("simple-gemini-vision", main);
};

async function urlToGenerativePart(url, mimeType) {
  const https = require('https');
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          inlineData: {
            data: buffer.toString('base64'),
            mimeType,
          },
        });
      });
      response.on('error', reject);
    });
  });
}

function fileToGenerativePart(data, mimeType) {
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}
