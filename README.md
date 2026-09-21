# SeekMoon 网站

简约中文官网与中文使用文档，原生 HTML / CSS / JavaScript，无构建依赖。

## 本地预览

在本目录运行 `python3 -m http.server 4178 --bind 127.0.0.1`，打开 http://127.0.0.1:4178 。也可以直接打开 `index.html`。

## 设计与内容

- 纯白底色、黑色按钮、灰色辅助文字；只保留品牌、主标题、一句介绍、下载入口、产品截图与页脚，适配桌面及手机。
- 三组真实产品截图可点击切换，也支持方向键、Home 和 End。
- `docs.html` 是中文上手指南，涵盖安装、模型配置、首个任务、代码审查及常见问题；首页右上角「中文文档」可直接进入。
- 首屏提供 macOS Apple Silicon（DMG）、Windows x64（EXE）及 Browser 控制台资源包（tar.gz）直接下载，版本为 0.2.5；链接来自官方稳定版清单，安装包更新时需同步修改首页与中文文档。
- 品牌仅使用 SeekMoon 文字；首页和文档页页脚提供 MoonBit 官网、中文文档和 Mooncakes 友链。

## GitHub Pages

使用 GitHub Pages，从 `main` 分支的根目录发布。修改页面后推送到 `main` 即可触发更新。`.nojekyll` 保证静态资源直接发布。

`qa/` 是本地验证文件，不纳入仓库。

## 核验来源

- 产品说明：https://www.moonbitlang.com/blog/seekmoon-from-ide-to-ade
- 官方仓库：https://github.com/moonbitlang/openseek
- 官方下载清单：https://openseek-api.moonbitlang.cn/desktop/releases/latest.json
- 产品截图来自上述 MoonBit 官方产品介绍。
