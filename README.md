# 乐神攻略站 · 金铲铲之战资料库

一个纯静态、零依赖的攻略资料站，手机 / 电脑打开都能正常显示。

> 线上地址：<https://go0setl.github.io/leshen-guide/>  
> 仓库地址：<https://github.com/Go0seTL/leshen-guide>

包含板块：

1. 前言
2. 版本更新（时间线）
3. 阵容排行（S / A / B 三档，点卡片看详情、阵容码）
4. 海克斯排行（银 / 金 / 棱彩筛选）
5. 装备排行（成装 / 光明装 / 奥恩神器 / 纹章四个子版块）
6. 页脚免责声明

所有内容目前都是**演示数据**，改成你自己的资料即可。页面里的图片也是自动生成的占位图，替换方法见下文。

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
│  └─ generate_demo_images.py  ← 生成占位图的脚本，可删
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

文件名必须等于 `js/data.js` 里的 `id`。例如阵容「暗星狙神」的 `id` 是 `darkstar-sniper`：

```text
assets/img/teams/darkstar-sniper.webp
```

其他阵容的文件名对照：

| 阵容 | id / 文件名 |
|---|---|
| 暗星狙神 | `darkstar-sniper` |
| 星守法师 | `star-guardian-mage` |
| 源计划枪手 | `project-gunner` |
| 福牛格斗 | `ox-fighter` |
| 龙魂炮手 | `dragon-cannon` |
| 圣贤护卫 | `holy-guardian` |
| 黑客刺客 | `hacker-assassin` |
| 机甲卫士 | `mecha-warden` |

海克斯：

| 海克斯 | 文件名 |
|---|---|
| 珠光莲花 | `jeweled-lotus` |
| 潘朵拉的装备 | `pandoras-items` |
| 便携锻炉 | `portable-forge` |
| 升级咯 | `level-up` |
| 高端购物 | `high-end-shopping` |
| 复苏之风 | `second-wind` |
| 战斗法师 | `battle-mage` |
| DD街区 | `dd-street` |
| 神奇游商 | `wandering-merchant` |
| 团队建设 | `team-building` |

装备（全部放在 `assets/img/items/`）：

| 装备 | 文件名 |
|---|---|
| 无尽之刃 | `infinity-edge` |
| 朔极之矛 | `spear-of-shojin` |
| 珠光护手 | `jeweled-gauntlet` |
| 最后的轻语 | `last-whisper` |
| 狂徒铠甲 | `warmogs` |
| 石像鬼石板甲 | `gargoyle` |
| 蓝霸符 | `blue-buff` |
| 鬼索的狂暴之刃 | `guinsoo` |
| 光明无尽之刃 | `radiant-infinity` |
| 光明珠光护手 | `radiant-jeweled` |
| 光明朔极之矛 | `radiant-shojin` |
| 光明石像鬼石板甲 | `radiant-gargoyle` |
| 光明狂徒铠甲 | `radiant-warmogs` |
| 光明鬼索的狂暴之刃 | `radiant-guinsoo` |
| 无尽之力 | `ornn-infinity-force` |
| 金币收集者 | `ornn-gold-collector` |
| 死亡之蔑 | `ornn-deaths-defiance` |
| 狙击手的专注 | `ornn-snipers-focus` |
| 永恒凛冬 | `ornn-eternal-winter` |
| 魔蕴 | `ornn-moguls-mail` |
| 狙神纹章 | `emblem-sniper` |
| 法师纹章 | `emblem-mage` |
| 星守纹章 | `emblem-star` |
| 源计划纹章 | `emblem-project` |
| 福牛纹章 | `emblem-ox` |
| 格斗家纹章 | `emblem-brawler` |

> 文件名建议只用小写字母、数字和短横线，别用中文或空格，避免网址编码问题。

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

> 页面上的示例图在 `assets/img/` 里，命名规则相同。以后所有图片都替换完，可以把 `*.svg` 示例图删掉（对应位置有图就不会再回退）。

---

## 四、怎么改文字内容

打开 `js/data.js`，全部内容都在这个文件里：

- `meta`：站名、作者、版本号、最后更新时间、图片扩展名
- `updates`：版本更新记录（数组，第一条会显示「最新」并同步到左侧当前版本）
- `teams`：阵容列表
  - `tier`：`S` / `A` / `B`
  - `rating`：强度评分（数字）
  - `difficulty`：难度（低 / 中 / 高）
  - `tags`：标签数组
  - `lineup`：阵容构成，`cost` 是费用（1–5，决定小标签颜色）
  - `coreItems`：核心装备
  - `rhythm`：运营节奏，`time` + `text`
  - `position`：站位思路
  - `note`：博主笔记
  - `code`：阵容码（复制按钮复制的就是它）
- `hexes`：海克斯列表
  - `rarity`：`银` / `金` / `棱彩`（筛选按钮按这个过滤）
  - `tier`：`S` / `A` / `B`
  - `rank`：排名（数字，会自动补成 01、02……）
- `items`：装备，分 `normal`（成装）、`radiant`（光明装）、`ornn`（奥恩神器）、`emblem`（纹章）
  - 每个分类里的 `rank` 前 3 名会自动变成领奖台大卡片，其余变成列表

改完保存刷新即可。标题里的数字（8 套阵容 / 10 枚海克斯 / 26 件装备）会自动按数据长度更新。

> 某个档位的阵容不满 3 的倍数时，页面会自动补一个「更多阵容整理中」的占位卡。以后加够数量自然消失；不想看到的话可以改 `js/main.js` 里的 `placeholders` 逻辑。

---

## 五、部署到 GitHub Pages

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

> 仓库名用 `leshen-guide`、`jcc-guide` 都可以。如果你叫我直接帮你建仓库，告诉我想要的仓库名即可。

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

**Q：复制阵容码没反应？**
本地 `file://` 打开时部分浏览器限制剪贴板，代码会自动使用兼容方案；如果仍失败，部署到 HTTPS（GitHub Pages）后再试。

**Q：想改颜色 / 字体？**
`css/style.css` 顶部的 `:root` 里改 `--gold`、`--bg`、`--font` 等变量即可。

**Q：想加新板块？**
复制 `index.html` 里任意一个 `<section>`，在 `data.js` 加数据，在 `main.js` 加渲染函数。也可以直接找我加。

**Q：当前内容是真的吗？**
不是。所有阵容、海克斯、装备和阵容码都是演示数据，页面上也标了「演示数据」。替换成你自己的资料后再公开。

---

## 七、素材与免责声明

- 本站为个人教学资料整理，与《金铲铲之战》官方无关。
- 游戏名称、英雄与装备名称版权归原作者 / 发行方所有。
- 图片与文字内容由站长自行准备和上传。
