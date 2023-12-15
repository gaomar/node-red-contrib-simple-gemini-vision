[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm](https://img.shields.io/npm/v/node-red-contrib-simple-gemini-vision.svg)](https://www.npmjs.com/package/node-red-contrib-simple-gemini-vision)
[![downloads](https://img.shields.io/npm/dt/node-red-contrib-simple-gemini-vision.svg)](https://www.npmjs.com/package/node-red-contrib-simple-gemini-vision)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/HaroldPetersInskipp/node-red-contrib-chatgpt/blob/main/LICENSE)

## 概要
Gemini Pro APIを使って画像の解析を行うノードです。  
payloadに解析したい画像を入れると、プロンプトに沿った画像の解析を行います。

例) この画像に何が写っているか教えてください。

## インストール

```
npm i node-red-contrib-simple-gemini-vision
```

or

AdminタブからInstall

## 使い方
### 入力項目

|項目|説明|
|--|--|
|payload|画像のURLかbase64形式を指定します。|
|API Key|Gemini ProのAPIキーを設定します。|
|prompt|解析するプロンプト|

### 出力項目

|項目|説明|
|--|--|
|payload|プロンプトに従った画像の解析結果が返ってきます。|


## LINK

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-simple-gemini-vision)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-simple-gemini-vision)
* [npm](https://www.npmjs.com/package/node-red-contrib-simple-gemini-vision)

## release

* 2023/12/15: 初回リリース（v1.0.0）

