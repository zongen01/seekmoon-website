# SeekMoon 网站

简约中文单页官网，原生 HTML / CSS / JavaScript，无构建依赖。

## 本地预览

在本目录运行 `python3 -m http.server 4178 --bind 127.0.0.1`，打开 http://127.0.0.1:4178 。也可以直接打开 `index.html`。

## 设计与内容

- 米白底色、深绿色按钮；只保留品牌、主标题、一句介绍、下载入口、产品截图与页脚，适配桌面及手机。
- 三组真实产品截图可点击切换，也支持方向键、Home 和 End。
- 首屏提供 macOS Apple Silicon（DMG）及 Windows x64（EXE）直接下载，版本为 0.2.5；链接来自官方稳定版清单，安装包更新时需同步修改。
- 月牙标记是本次设计的临时视觉标识，可替换为正式品牌 Logo。

## GitHub Pages

使用 GitHub Pages，从 `main` 分支的根目录发布。修改页面后推送到 `main` 即可触发更新。`.nojekyll` 保证静态资源直接发布。

`qa/` 是本地验证文件，不纳入仓库。

## 核验来源

- 产品说明：https://www.moonbitlang.com/blog/seekmoon-from-ide-to-ade
- 官方仓库：https://github.com/moonbitlang/openseek
- 官方下载清单：https://openseek-api.moonbitlang.cn/desktop/releases/latest.json
- 产品截图来自上述 MoonBit 官方产品介绍。
