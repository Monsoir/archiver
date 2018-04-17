# README

`.archive.json` 文件配置选项

下面假设某个项目名为 `Demo`

- `workspace` 对于使用 React Native 的 iOS 项目，几乎使用的都是 CocoaPods, 因此，项目的入口都应该是 `Demo.workspace`, 值需要包括 `workspace` 后缀
- `scheme` 进行打包的 scheme, 一般为 `Demo`
- `configuration` 打包的配置
    - `Release`
    - `DEBUG`
- `archivePath` archive 文件的保存路径，这是中间产物
- `exportPath` 应用打包后的导出路径，其中包含了 `Demo.ipa` 文件
- `exportOptionsPlist` 用于配置打包发布的形式
    - `AdHocExportOptionsPlist.plist` 测试包
    - `AppStoreExportOptionsPlist.plist` App Store
    - `EnterpriseExportOptionsPlist.plist` 企业级


