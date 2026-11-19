# 乐神攻略站 · 金铲铲之战资料库

一个纯静态、零依赖的攻略资料站，手机 / 电脑打开都能正常显示。

> 线上地址：<https://go0setl.github.io/leshen-guide/>  
> 仓库地址：<https://github.com/Go0seTL/leshen-guide>

包含板块：

1. 前言
2. 版本更新（时间线）
3. 阵容排行（27 套，S / A / B / C / D 五档，点卡片看阵容构成、主C、核心装备）
4. 海克斯排行（76 枚，银 / 金 / 棱彩筛选，收录 S / A 档）
5. 装备排行（成装 8 / 光明装 20 / 奥恩神器 17 / 纹章 11；特殊装备展示 S / A / B 档）
6. 页脚免责声明

榜单名次参考 **datatft** 的 S18.6 公开榜单，评级仅代表来源观点。页面里的图片是自动生成的**示例占位图**，替换方法见第三节；具体数据请以游戏内为准。

---

## 一、本地预览

最简单：双击 `index.html`。

推荐用本地服务器（复制阵容码、字体渲染更正常）：

```bash
cd E:\LeShenJCCWeb
python -m http.server 8080
```

然后浏览器打开 <http://localhost:8080>。

> 双击打开也能用，但浏览器对 `file://` 的剪贴板权限更严格，复制阵容码会走兼容方案；部署到 GitHub Pages（HTTPS）后体验最好。

---

## 二、文件结构

```text
LeShenJCCWeb/
├─ index.html              ← 页面结构（一般不用改）
├─ css/
│  └─ style.css            ← 全部样式（配色、动画、响应式）
├─ js/
│  ├─ data.js              ← ★ 所有文字内容都在这里改
│  └─ main.js              ← 渲染、筛选、弹窗、复制等逻辑
├─ assets/
│  ├─ favicon.svg
│  └─ img/
│     ├─ teams/            ← 阵容图（16:9）
│     ├─ hex/              ← 海克斯图（1:1）
│     └─ items/            ← 装备图（1:1，四个子版块共用这个文件夹）
├─ tools/
│  ├─ generate_demo_images.py  ← 生成占位图的脚本
│  └─ demo_image_specs.json    ← 占位图规格（名称 / 配色 / 分类）
├─ 图片文件名对照表.md       ← 换图时查「名称 → id」
├─ README.md
├─ .nojekyll               ← GitHub Pages 用，别删
└─ .gitignore
```

---

## 三、★ 怎么替换图片（重点）

### 第 1 步：准备图片

| 类型 | 建议尺寸 | 比例 | 放哪个文件夹 |
|---|---|---|---|
| 阵容图 | 1200 × 675 或 1600 × 900 | 16:9 | `assets/img/teams/` |
| 海克斯图标 | 512 × 512 | 1:1 | `assets/img/hex/` |
| 装备图标 | 512 × 512 | 1:1 | `assets/img/items/` |

推荐格式：**WebP**（体积小、清晰），也支持 `png` / `jpg`。
单张尽量控制在 200KB 以内。

### 第 2 步：按文件名放进对应文件夹

文件名必须等于 `js/data.js` 里的 `id`。完整的「名称 → id → 文件路径」对照表已经生成：

**打开 [`图片文件名对照表.md`](图片文件名对照表.md) 查找即可。**

示例：

| 内容 | 放进哪里 | 示例文件名 |
|---|---|---|
| 阵容「7峡谷魔沼蛙」 | `assets/img/teams/` | `comp-16336.webp` |
| 海克斯「别再错过」 | `assets/img/hex/` | `aug-missedconnections-1.webp` |
| 光明装「光明版鬼索的狂暴之刃」 | `assets/img/items/` | `item-1539.webp` |

文件名建议只用小写字母、数字和短横线，不要用中文或空格，避免网址编码问题。

### 第 3 步：改一个字母，启用你的图片

打开 `js/data.js`，找到最上面的：

```js
imageExt: "svg",
```

改成你的图片格式，例如：

```js
imageExt: "webp",
```

保存，刷新页面。完成。

- 如果你的图是 PNG，就改成 `"png"`；JPG 同理。
- 可以只替换一部分：没放图的卡会自动回退到原来的示例 SVG，不会出现裂图。
- 如果你想用完全不同的文件名，把 `data.js` 里对应的 `id` 一起改掉，图片名也跟着改。
- 全部替换完后，可以把 `assets/img/` 里的 `*.svg` 示例图删掉。

---

## 四、怎么改文字内容

打开 `js/data.js`，全部内容都在这个文件里：

- `meta`：站名、作者、版本号、最后更新时间、图片扩展名、数据来源信息
- `updates`：版本更新记录（数组，第一条会显示「最新」并同步到左侧当前版本）
- `teams`：阵容列表（当前 27 套）
  - `tier`：`S` / `A` / `B` / `C` / `D`
  - `tags`：标签数组
  - `carry`：主C名称
  - `lineup`：阵容构成，`cost` 是费用（1–5，决定小标签颜色）
  - `coreItems`：核心装备
  - `summary` / `note`：卡片摘要和弹窗说明
  - 可选 `rhythm`（运营节奏）、`position`（站位）、`code`（阵容码）；没有对应字段时弹窗会自动隐藏这些区块
- `hexes`：海克斯列表（当前 76 枚）
  - `rarity`：`银` / `金` / `棱彩`（筛选按钮按这个过滤）
  - `tier`：`S` / `A`
  - `rank`：品质内排名（数字，会自动补成 01、02……）
- `items`：装备，分 `normal`（成装）、`radiant`（光明装）、`ornn`（奥恩神器）、`emblem`（纹章）
  - 每个分类里的 `rank` 前 3 名会自动变成领奖台大卡片，其余变成列表
  - 特殊装备带 `tier` 字段（S / A / B），会显示等级标签；常规成装没有等级
  - `stats` / `obtain` / `desc` / `tip` 都是可改的展示文案

改完保存刷新即可。标题里的数字（27 套阵容 / 76 枚海克斯 / 56 件装备）会自动按数据长度更新。

> 当前榜单数据是参考 datatft S18.6 整理的，不是官方数据；阵容也没有阵容码。想更新时，按同样结构替换数组即可，或者直接告诉我重新抓取。

---

## 五、部署到 GitHub Pages

> 当前仓库已经创建并部署：<https://github.com/Go0seTL/leshen-guide>  
> Pages 已开启（`main` 分支根目录）。下面的步骤保留给迁移或重新搭建时参考，不需要再执行一遍。

需要是 **Public 仓库**（免费 Pages 的要求）。

### 方式 A：网页上传（最简单）

1. GitHub 新建仓库，例如 `leshen-guide`，选 Public。
2. 把 `LeShenJCCWeb` 里的**所有文件**上传到仓库根目录（不是上传外层文件夹）。
3. 仓库 → Settings → Pages → Build and deployment：
   - Source 选 `Deploy from a branch`
   - Branch 选 `main`，目录选 `/ (root)`
4. 等 1–2 分钟，访问：
   `https://你的用户名.github.io/leshen-guide/`

### 方式 B：命令行

```bash
cd E:\LeShenJCCWeb
git init
git add .
git commit -m "init: 乐神攻略站"
git branch -M main
git remote add origin https://github.com/你的用户名/leshen-guide.git
git push -u origin main
```

然后在仓库 Settings → Pages 里开启 Pages（同上）。

### 方式 C：用 GitHub CLI

如果你已经登录了 `gh`：

```bash
cd E:\LeShenJCCWeb
git init
git add .
git commit -m "init: 乐神攻略站"
git branch -M main
gh repo create leshen-guide --public --source=. --remote=origin --push
```

Pages 需要在网页端 Settings → Pages 打开，或者再用 API 开启。

> 当前仓库名是 `leshen-guide`，已经配置好 Pages；以后只改内容推送即可，不用重新建仓库。

### 以后更新网站

改完 `js/data.js` 或替换完图片后，在 `E:\LeShenJCCWeb` 里执行：

```bash
git add .
git commit -m "更新攻略内容"
git push
```

GitHub Pages 会自动重新构建，等 1–2 分钟刷新线上地址即可。

---

## 六、常见问题

**Q：手机打开图片加载慢？**
把图片压成 WebP，单张 200KB 以内。阵容图 1200 宽足够了。

**Q：为什么弹窗里没有阵容码 / 复制按钮？**
当前榜单只提供阵容构成和评级，没有阵容码。如果以后你在 `js/data.js` 给某套阵容加了 `code` 字段，弹窗会自动显示复制按钮。

**Q：想改颜色 / 字体？**
`css/style.css` 顶部的 `:root` 里改 `--gold`、`--bg`、`--font` 等变量即可。

**Q：想加新板块？**
复制 `index.html` 里任意一个 `<section>`，在 `data.js` 加数据，在 `main.js` 加渲染函数。也可以直接找我加。

**Q：当前内容是真的吗？**
阵容、强化和装备名次来自 datatft 的 S18.6 公开榜单，评级仅代表来源观点；图片仍是示例占位图。具体数值与效果请以游戏内为准。

---

## 七、素材与免责声明

- 本站为个人教学资料整理，与《金铲铲之战》官方无关。
- 榜单名次参考 [datatft 阵容榜](https://jcc.datatft.com/comp/rank)、[强化榜](https://jcc.datatft.com/augment/tier)、[装备榜](https://jcc.datatft.com/item/tier)；强化/装备评级由 JOC 冠军 TLG糕手雕妹 提供。
- 游戏名称、英雄、装备与强化名称版权归原作者 / 发行方所有。
- 页面图片为自动生成的占位图；替换后的图片由站长自行准备和上传。
