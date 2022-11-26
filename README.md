# `Spotify Car Thing 汉化版 Webapp`

本项目包含从  [Merlin04/superbird-webapp](https://github.com/Merlin04/superbird-webapp) 处获取的 Spotify Car Thing (SuperBird) 前端 WEB 程序的重构源代码，我在他工作的基础上对该代码进行了修改以便其支持中文的界面。

根据原项目所说，该代码并不完美但非常接近。可以使用该项目编译好的程序替换设备上的程序，且不影响您的操作。目前已知差距或问题有：

- 已禁用带有回溯的错误报告
- 有些文件结构可能不完全相同
- 使用Vite/Rollup代替Webpack
- “@spotify internal”下的文件必须转换为ES模块，以便在文件不在“node_modules”中的情况下导入。
- 可能会有部分图标消失（随时提出issues）
- 可能有些界面没有汉化（我手头的设备不支持通话，Hey Spotify和开发者菜单，如果出现问题请提出issues）

## 已知无法解决的问题

- 设置 -> 诀窍 从网页获取内容，无法进行汉化。
- 部分页面中的语音指令为英语，是因为 Hey Spotify 仅兼容英语，故没有翻译。
- 在播放节目偶尔出现的指令提示界面，无法翻译。

## 使用

请参考原项目的使用方法，您需要让您的设备运行最新的固件并启用ADB，最简单的方法请参考 [这里](https://github.com/err4o4/spotify-car-thing-reverse-engineering/issues/22#issue-1432896381) ，旧的固件不兼容本项目。

您需要安装 ADB 、 Node.js 和 Yarn ，然后克隆项目进行修改。最简单的方法是下载 Releases 并执行 `./push.sh`

### 继续开发

为了快速测试和更改，在您的计算机上启用dev服务是一个好方法，执行 `yarn dev` 来启动，您可以在网页中实时看到您的更改。

本项目需要通过 WS 调用您设备上的部分后端代码，所以您在启动前还需要运行 `adb forward tcp:8890 tcp:8890` 。

### 编译源码

要将应用程序构建到 `dist` 目录中，请运行 `yarn build` 。若要替换设备上的webapp，请运行 `./push.sh` 。

## 协议

本代码在编译后按照原样提供，没有任何基于任何原因的明示或暗示。
在任何情景，任何情况下，作者都不对该代码造成的直接或间接损失/损害承担任何责任。

允许任何人在非盈利，非商业的情况下使用本软件或对本软件进行修改并在不设任何前提条件
的情况下对本项目进行分发。

请遵守以下限制：

- 不得扭曲本项目的来源，您不能宣称您自己编写了本项目，若您使用了本项目，必须在您的
产品中保留本人的名称（[锦鲤@NekoLines](https://github.com/NekoLines)）。

- 更改的部分必须在您的项目中进行明确标注，且该部分更改不得被误解为原始代码。

- 本项目当前说明不得在任何来源的分发中删除或更改。

- 即便您进行了修改，也不允许在分发时增设任何条件（包括但不限于关注公众号，私信，邮箱，收费等）。

*在以上限制之外，本程序遵循 AGPLv3 协议进行分发。*

## 离不开的项目

- [superbird-bulkcmd](https://github.com/frederic/superbird-bulkcmd.git) 
- [superbird-tool](https://github.com/bishopdynamics/superbird-tool.git)
- [superbird-webapp](https://github.com/Merlin04/superbird-webapp.git)
- [spotify-car-thing-reverse-engineering](https://github.com/err4o4/spotify-car-thing-reverse-engineering.git)

*感谢以上项目和我的同伴[立音喵](https://github.com/cubesky)的支持和帮助！*