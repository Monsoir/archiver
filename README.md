# README

需要提前在 Xcode 中配置好 iOS 原生项目的打包证书的设置，automactically manage sign

安装

```sh
npm i -D @monsoir/archiver
```

添加 `scripts`

```json
"scripts": {
    "start": "...",
    "test": "...",
    "archive-ios": "node ./node_modules/@monsoir/rn-archiver/dist/lib/index.js",
  },
```

打包时，执行命令

```sh
npm run archive-ios
```

创建 `.archiver.json` 配置文件

`.archive.json` 例子，配置文件需要存放在与 `package.json` 同级的目录下，下面假设某个项目名为 `Demo`

```json
{
  "pathToWorkspace": "./ios/Demo.xcworkspace",
  "scheme": "Demo",
  "configuration": "Release",
  "archivePath": "~/Desktop/Demo",
  "exportPath": "~/Desktop/Demo",
  "exportOptionsPlist": "./exportionsPlists/EnterpriseExportOptionsPlist.plist"
}
```

配置文件解释

执行命令开始

- 读取 `pathToWorkspace` 值，根据路径寻找 iOS 原生项目
- 使用 `Release` 方式，对项目中的 `scheme` 进行打包
- 执行 `xcodebuild archive` 命令，并将 archive 后的文件输出到文件夹 `~/Desktop`, 并命名为 `Demo.xcarchive`, 因此，`.xcarchive` 后缀名是命令自动添加的，我们只需要精确到文件名
- 执行 `xcodebuild -exportArchive`, 根据 `archivePath` 中的值，获取到 archive 后的文件，同时，根据 `exportPath` 来指定 `Demo.ipa` 导出的位置，根据 `exportOptionsPlist` 读取打包的方法，最后，`Demo.ipa` 包含在 `~/Desktop/Demo` 文件夹下

> `archivePath`, 指定的是一个文件的名称，精确到文件名，不需要后缀名
> `exportPath`, 指定的是一个文件夹的名称

---

`.archive.json` 文件配置选项，

- `pathToWorkspace` 对于使用 React Native 的 iOS 项目，几乎使用的都是 CocoaPods, 因此，项目的入口都应该是 `Demo.workspace`, 值需要包括 `workspace` 后缀
- `scheme` 进行打包的 scheme, 一般为 `Demo`
- `configuration` 打包的配置
    - `Release` 默认
    - `DEBUG`
- `archivePath` archive 文件的保存路径，这是中间产物，默认为 `./{scheme}`
- `exportPath` 应用打包后的导出路径，其中包含了 `Demo.ipa` 文件，默认为 `./archived`
- `exportOptionsPlist` 用于配置打包发布的形式，没有默认值
    - `AdHocExportOptionsPlist.plist` 测试包
    - `AppStoreExportOptionsPlist.plist` App Store
    - `EnterpriseExportOptionsPlist.plist` 企业级


