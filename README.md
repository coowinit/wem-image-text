# WEM Image Text

轻量级 WordPress Gutenberg 图文布局区块插件。用于编辑一组图片与文本的响应式布局，保持标题、段落、列表和按钮等内容使用 WordPress 原生区块。

> **当前稳定版本：v1.0.0**

## 功能

- 桌面端四种布局：左图右文、左文右图、上图下文、上文下图。
- 手机端独立选择图片优先或文字优先。
- 横向布局图片宽度预设：40%、50%、60%。
- 桌面端图文间距：0–80px，默认 24px。
- 手机端文本外边距：0–48px，默认 16px；手机端 Grid gap 固定为 0。
- 图片圆角：0–40px，默认 0px。
- 图片使用 WordPress 原生 Image 区块。
- 文本使用原生 Heading、Paragraph、List、Buttons、Quote、Separator、Spacer 等区块。
- 设置面板提供可视化布局选择器和图片宽度快捷按钮。
- 编辑器画布与前台采用对应的响应式布局规则。

## 不包含的功能

- 不负责一行多列的整体网格编排；需要多列时使用 WordPress 原生 Grid 或 Columns。
- 不提供图片轮播、灯箱、动画、短代码或独立内容管理系统。
- 不依赖 Elementor、Swiper、Fancybox 或 jQuery。
- 不需要 npm、Node.js、构建命令或 `dist/` 目录。

## 与其他区块的分工

| 工具 | 负责的工作 |
| --- | --- |
| **WEM Image Text** | 一组图文内部的布局与响应式顺序 |
| WordPress Grid / Columns | 一行两列、三列或更多列的整体排布 |
| WEM Swiper Gallery | 多图轮播展示 |

WEM Image Text 与 WEM Swiper Gallery 相互独立，不形成强制依赖。

## 区块结构

```text
WEM Image Text
├── WEM Image Text: Image
│   └── Image (core/image)
└── WEM Image Text: Content
    ├── Heading (core/heading)
    ├── Paragraph (core/paragraph)
    ├── List (core/list)
    ├── Buttons (core/buttons)
    └── Other allowed core blocks
```

父区块管理布局属性；图片区和内容区由两个内部子区块承载。内容编辑尽量使用 WordPress 原生区块，减少自定义内容格式，便于维护。

## 安装

1. 下载并解压插件 ZIP。
2. 将 `wem-image-text` 文件夹上传至 `wp-content/plugins/`，或在 WordPress 后台通过“插件 → 安装插件 → 上传插件”上传 ZIP。
3. 在 WordPress 后台启用 **WEM Image Text**。
4. 编辑页面或文章，在区块插入器中搜索 **WEM Image Text**。
5. 选择或上传图片，填写标题和段落；需要时在内容区添加列表、按钮等允许的原生区块。
6. 在右侧区块设置面板中配置桌面布局、手机顺序、图片宽度、桌面 Gap、手机端文本 Margin 和图片圆角。
7. 保存页面，并在真实前台检查桌面端与手机端显示。

## 设置说明

| 设置项 | 默认值 | 说明 |
| --- | ---: | --- |
| 桌面布局 | 左图右文 | 支持四种图文方向 |
| 手机布局 | 图片优先 | 可切换为文字优先 |
| 图片宽度 | 50% | 横向布局可选 40%、50%、60%；纵向布局图片占满可用宽度 |
| 桌面图文 Gap | 24px | 控制桌面端图片与内容之间的距离 |
| 手机端文本 Margin | 16px | 手机端 Grid gap 固定为 0；图片优先时在文本上方增加间距，文字优先时在文本下方增加间距 |
| 图片圆角 | 0px | 可设置 0–40px |

## 兼容性与注意事项

- 插件声明最低 WordPress 6.3、PHP 7.4；不同主题、编辑器版本和浏览器的兼容性仍应在实际站点验证。
- 主题的全局 CSS 可能影响图片、标题、段落和按钮的外观。若出现差异，应优先检查主题样式与插件样式的优先级。
- 手机端通过 CSS Grid 调整视觉顺序；视觉顺序可能与 DOM 阅读顺序不同。对无障碍要求较高的站点，应额外测试键盘操作和屏幕阅读器。
- 停用插件不会主动删除已保存的文章内容，但自定义区块可能显示为缺失区块，插件提供的布局样式也会停止加载。
- 本插件不依赖 WEM Swiper Gallery；单独启用或与其同时启用时，仍建议在目标站点做回归测试。

## 测试记录

开发过程中已对主要布局、图文间距设置、手机端顺序和 CSS 选择器进行多轮实际测试，并由使用者确认当前版本的测试结果符合预期。

发布后仍建议在目标站点检查：

- 四种桌面布局与三档横向图片宽度。
- 手机端图片优先、文字优先及不同 Margin 值。
- 保存、刷新、重新打开后的属性和内容。
- 长标题、长段落、列表、按钮以及窄屏显示。
- 目标主题的全局样式与无障碍阅读顺序。

更详细的回归清单见 [`docs/TEST-PLAN.md`](docs/TEST-PLAN.md)。

## 许可证

GPL-2.0-or-later
