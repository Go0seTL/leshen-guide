# -*- coding: utf-8 -*-
"""
生成演示用的 SVG 占位图。
- 阵容图：1200 × 675（16:9）
- 海克斯 / 装备图：512 × 512（1:1）

这些图只是让页面先有完整视觉效果，替换成你自己的图后可以删掉本脚本。
运行：python tools/generate_demo_images.py
"""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
TEAM_DIR = ROOT / "assets" / "img" / "teams"
HEX_DIR = ROOT / "assets" / "img" / "hex"
ITEM_DIR = ROOT / "assets" / "img" / "items"

FONT = "'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif"

TEAMS = [
    ("darkstar-sniper", "暗星狙神", "#f5c451", "#ff8a4c",
     ["艾希", "厄斐琉斯", "莫德凯撒", "瑟提", "烬", "蕾欧娜", "索拉卡", "妮蔻"]),
    ("star-guardian-mage", "星守法师", "#a78bfa", "#6d5bd0",
     ["阿狸", "辛德拉", "妮蔻", "索拉卡", "拉克丝", "蕾欧娜", "塔姆", "维克托"]),
    ("project-gunner", "源计划枪手", "#4fd1c5", "#2b8a9e",
     ["金克丝", "蔚", "艾克", "卡蜜尔", "烬", "厄斐琉斯", "蕾欧娜", "盖伦"]),
    ("ox-fighter", "福牛格斗", "#ff7a59", "#d84545",
     ["瑟提", "阿利斯塔", "蔚", "盖伦", "塔姆", "蕾欧娜", "金克丝", "索拉卡"]),
    ("dragon-cannon", "龙魂炮手", "#f6a04d", "#c86b2b",
     ["崔丝塔娜", "库奇", "塔姆", "瑟提", "妮蔻", "索拉卡", "蕾欧娜", "盖伦"]),
    ("holy-guardian", "圣贤护卫", "#8ecae6", "#4a90a4",
     ["蕾欧娜", "布隆", "盖伦", "拉克丝", "索拉卡", "塔姆", "艾希", "妮蔻"]),
    ("hacker-assassin", "黑客刺客", "#c084fc", "#7c3aed",
     ["劫", "阿卡丽", "艾克", "卡蜜尔", "蔚", "金克丝", "塔姆", "妮蔻"]),
    ("mecha-warden", "机甲卫士", "#7dd3fc", "#3b82f6",
     ["盖伦", "阿利斯塔", "蕾欧娜", "布隆", "金克丝", "艾希", "索拉卡", "妮蔻"]),
]

HEXES = [
    ("jeweled-lotus", "珠光莲花", "棱彩", "珠"),
    ("pandoras-items", "潘朵拉的装备", "棱彩", "潘"),
    ("portable-forge", "便携锻炉", "棱彩", "锻"),
    ("level-up", "升级咯", "棱彩", "升"),
    ("high-end-shopping", "高端购物", "金", "购"),
    ("second-wind", "复苏之风", "金", "风"),
    ("battle-mage", "战斗法师", "金", "战"),
    ("dd-street", "DD街区", "金", "DD"),
    ("wandering-merchant", "神奇游商", "银", "商"),
    ("team-building", "团队建设", "银", "团"),
]

ITEMS = [
    # id, name, category, glyph, accent1, accent2
    ("infinity-edge", "无尽之刃", "normal", "刃", "#f5c451", "#d99a26"),
    ("spear-of-shojin", "朔极之矛", "normal", "矛", "#6fc3ff", "#3478c8"),
    ("jeweled-gauntlet", "珠光护手", "normal", "珠", "#c09cff", "#7a5bd0"),
    ("last-whisper", "最后的轻语", "normal", "语", "#7de3c3", "#2b8a7a"),
    ("warmogs", "狂徒铠甲", "normal", "狂", "#ff9d6c", "#d05a3b"),
    ("gargoyle", "石像鬼石板甲", "normal", "甲", "#8ecae6", "#4a90a4"),
    ("blue-buff", "蓝霸符", "normal", "蓝", "#63b3ff", "#2f6dd0"),
    ("guinsoo", "鬼索的狂暴之刃", "normal", "怒", "#f5a3ff", "#b05ac8"),
    ("radiant-infinity", "光明无尽之刃", "radiant", "刃", "#ffe08a", "#e2a72f"),
    ("radiant-jeweled", "光明珠光护手", "radiant", "珠", "#e3c7ff", "#9b7ae0"),
    ("radiant-shojin", "光明朔极之矛", "radiant", "矛", "#a8dcff", "#5b9fd6"),
    ("radiant-gargoyle", "光明石像鬼石板甲", "radiant", "甲", "#b7e4f2", "#6aa9bb"),
    ("radiant-warmogs", "光明狂徒铠甲", "radiant", "狂", "#ffc09c", "#e08a5a"),
    ("radiant-guinsoo", "光明鬼索的狂暴之刃", "radiant", "怒", "#ffc1f0", "#d47ac0"),
    ("ornn-infinity-force", "无尽之力", "ornn", "力", "#ffb36b", "#d9632f"),
    ("ornn-gold-collector", "金币收集者", "ornn", "金", "#ffd166", "#c58a1f"),
    ("ornn-deaths-defiance", "死亡之蔑", "ornn", "蔑", "#ff8f6b", "#b93f3f"),
    ("ornn-snipers-focus", "狙击手的专注", "ornn", "狙", "#ffd98a", "#c98b2f"),
    ("ornn-eternal-winter", "永恒凛冬", "ornn", "冬", "#9fe3ff", "#4b9bc7"),
    ("ornn-moguls-mail", "魔蕴", "ornn", "蕴", "#d8a8ff", "#8a5bd0"),
    ("emblem-sniper", "狙神纹章", "emblem", "狙", "#c9b6ff", "#7c5cf0"),
    ("emblem-mage", "法师纹章", "emblem", "法", "#b9a5ff", "#6d55d9"),
    ("emblem-star", "星守纹章", "emblem", "星", "#d8b8ff", "#8a5fd6"),
    ("emblem-project", "源计划纹章", "emblem", "源", "#a8c8ff", "#537fe0"),
    ("emblem-ox", "福牛纹章", "emblem", "福", "#ffc7a8", "#d96a4f"),
    ("emblem-brawler", "格斗家纹章", "emblem", "斗", "#c4b5ff", "#7058d8"),
]

RARITY_COLORS = {
    "银": ("#dbe5f2", "#8290a6"),
    "金": ("#ffe08a", "#d99a26"),
    "棱彩": ("#c4a7ff", "#4fd1c5"),
}

CATEGORY_META = {
    "normal": ("成装", "CORE ITEM"),
    "radiant": ("光明装", "RADIANT"),
    "ornn": ("奥恩神器", "ORNN ARTIFACT"),
    "emblem": ("纹章", "EMBLEM"),
}


def hex_points(cx, cy, r):
    """平顶六边形的六个顶点。"""
    import math
    pts = []
    for i in range(6):
        angle = math.pi / 3 * i
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)


def pointy_hex_points(cx, cy, r):
    import math
    pts = []
    for i in range(6):
        angle = math.pi / 3 * i - math.pi / 2
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)


def team_svg(team, index):
    team_id, name, accent1, accent2, champs = team
    positions = [
        (483, 252), (561, 252), (639, 252),
        (444, 342), (600, 342), (756, 342),
        (483, 432), (639, 432),
    ]
    cells = []
    occupied = set()
    for idx, (cx, cy) in enumerate(positions):
        occupied.add((round(cx), round(cy)))
        champion = champs[idx]
        initial = champion[0]
        cells.append(f"""
        <g>
          <polygon points="{hex_points(cx, cy, 52)}" fill="{accent1}" fill-opacity=".11" stroke="{accent1}" stroke-opacity=".55" stroke-width="1.4"/>
          <circle cx="{cx}" cy="{cy}" r="38" fill="{accent1}" fill-opacity=".08"/>
          <circle cx="{cx}" cy="{cy}" r="30" fill="url(#cellGrad)" stroke="#ffffff" stroke-opacity=".22"/>
          <text x="{cx}" y="{cy + 9}" text-anchor="middle" font-family="{FONT}" font-size="25" font-weight="700" fill="#ffffff">{escape(initial)}</text>
        </g>""")

    empty_cells = []
    for row_y, xs in [(252, [483, 561, 639, 717]), (342, [444, 522, 600, 678, 756]), (432, [483, 561, 639, 717])]:
        for cx in xs:
            if (round(cx), round(row_y)) in occupied:
                continue
            empty_cells.append(
                f'<polygon points="{hex_points(cx, row_y, 52)}" fill="#ffffff" fill-opacity=".012" stroke="#ffffff" stroke-opacity=".055" stroke-width="1"/>'
            )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="{escape(name)} 示例阵容图">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#111b2d"/>
      <stop offset=".55" stop-color="#0a101b"/>
      <stop offset="1" stop-color="#06090f"/>
    </linearGradient>
    <radialGradient id="halo" cx=".86" cy="-.08" r=".9">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".30"/>
      <stop offset=".55" stop-color="{accent1}" stop-opacity=".06"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cellGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{accent1}"/>
      <stop offset="1" stop-color="{accent2}"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{accent1}"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity=".035" stroke-width="1"/>
    </pattern>
    <radialGradient id="boardGlow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".12"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bg)"/>
  <rect width="1200" height="675" fill="url(#halo)"/>
  <rect width="1200" height="675" fill="url(#grid)"/>

  <circle cx="1010" cy="108" r="286" fill="none" stroke="{accent1}" stroke-opacity=".09" stroke-width="1.5"/>
  <circle cx="1010" cy="108" r="204" fill="none" stroke="{accent1}" stroke-opacity=".07" stroke-width="1"/>
  <circle cx="1010" cy="108" r="126" fill="none" stroke="{accent1}" stroke-opacity=".05" stroke-width="1"/>
  <circle cx="600" cy="350" r="300" fill="url(#boardGlow)"/>

  <g>{''.join(empty_cells)}{''.join(cells)}</g>

  <path d="M48 116V64h52" fill="none" stroke="{accent1}" stroke-opacity=".55" stroke-width="2"/>
  <path d="M1152 116V64h-52" fill="none" stroke="{accent1}" stroke-opacity=".55" stroke-width="2"/>
  <path d="M48 552v52h52" fill="none" stroke="{accent1}" stroke-opacity=".3" stroke-width="2"/>
  <path d="M1152 552v52h-52" fill="none" stroke="{accent1}" stroke-opacity=".3" stroke-width="2"/>

  <rect x="48" y="588" width="56" height="3" rx="1.5" fill="{accent1}"/>
  <text x="48" y="624" font-family="{FONT}" font-size="20" letter-spacing="2.5" fill="#b8c3d4">DEMO · 示例阵容站位图</text>
  <text x="50" y="650" font-family="{FONT}" font-size="13" letter-spacing="1.2" fill="#6d7a90">替换：assets/img/teams/{team_id}.svg</text>
  <text x="1152" y="628" text-anchor="end" font-family="{FONT}" font-size="13" letter-spacing="2" fill="#6d7a90">TEAM {index:02d} / {len(TEAMS):02d}</text>
  <path d="M48 606h1104" stroke="url(#lineGrad)" stroke-opacity=".2"/>
</svg>
"""


def hex_svg(hex_item, index):
    item_id, name, rarity, glyph = hex_item
    accent1, accent2 = RARITY_COLORS[rarity]
    font_size = 106 if len(glyph) <= 1 else 78
    rarity_note = {"银": "SILVER", "金": "GOLD", "棱彩": "PRISMATIC"}[rarity]

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="{escape(name)} 海克斯示例图标">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#131c2e"/>
      <stop offset=".6" stop-color="#0b111c"/>
      <stop offset="1" stop-color="#070b12"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy=".42" r=".55">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".32"/>
      <stop offset=".7" stop-color="{accent1}" stop-opacity=".05"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{accent1}"/>
      <stop offset="1" stop-color="{accent2}"/>
    </linearGradient>
    <linearGradient id="hexFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".12"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity=".02"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="64" fill="url(#bg)"/>
  <rect x="1" y="1" width="510" height="510" rx="63" fill="none" stroke="url(#accent)" stroke-opacity=".42" stroke-width="2"/>
  <rect x="18" y="18" width="476" height="476" rx="50" fill="none" stroke="#ffffff" stroke-opacity=".055"/>
  <circle cx="256" cy="248" r="216" fill="url(#glow)"/>

  <polygon points="{pointy_hex_points(256, 260, 164)}" fill="url(#hexFill)" stroke="url(#accent)" stroke-opacity=".55" stroke-width="4"/>
  <polygon points="{pointy_hex_points(256, 260, 140)}" fill="none" stroke="{accent1}" stroke-opacity=".12" stroke-width="1"/>

  <g stroke="{accent1}" stroke-opacity=".22" stroke-width="2">
    <path d="M256 62v26"/><path d="M256 432v26"/>
    <path d="M92 260h24"/><path d="M396 260h24"/>
    <path d="M140 144l18 18"/><path d="M354 376l18 18"/>
    <path d="M372 144l-18 18"/><path d="M158 376l-18 18"/>
  </g>

  <text x="256" y="306" text-anchor="middle" font-family="{FONT}" font-size="{font_size}" font-weight="900" fill="url(#accent)">{escape(glyph)}</text>

  <g transform="translate(34, 32)">
    <rect width="124" height="32" rx="16" fill="#080d16" fill-opacity=".8" stroke="{accent1}" stroke-opacity=".35"/>
    <text x="16" y="21" font-family="{FONT}" font-size="12" letter-spacing="1.5" fill="#dbe5f3">海克斯 · {escape(rarity)}</text>
  </g>
  <text x="478" y="53" text-anchor="end" font-family="{FONT}" font-size="12" letter-spacing="1.6" fill="{accent1}" fill-opacity=".8">{rarity_note}</text>

  <text x="256" y="446" text-anchor="middle" font-family="{FONT}" font-size="25" font-weight="700" fill="#e9eff9">{escape(name)}</text>
  <text x="34" y="486" font-family="{FONT}" font-size="11" letter-spacing="1.4" fill="#657188">DEMO · 512 × 512</text>
  <text x="478" y="486" text-anchor="end" font-family="{FONT}" font-size="11" letter-spacing="1.4" fill="#657188">AUGMENT {index:02d}</text>
</svg>
"""


def item_svg(item):
    item_id, name, category, glyph, accent1, accent2 = item
    label, en = CATEGORY_META[category]
    font_size = 138 if len(glyph) == 1 else 96
    name_size = 26 if len(name) <= 8 else 22

    extra = ""
    if category == "radiant":
        extra = f"""
  <g stroke="{accent1}" stroke-opacity=".28" stroke-width="2">
    <path d="M256 74v38"/><path d="M256 386v38"/><path d="M90 248h38"/><path d="M384 248h38"/>
    <path d="M139 131l27 27"/><path d="M346 338l27 27"/><path d="M373 131l-27 27"/><path d="M166 338l-27 27"/>
  </g>"""
    elif category == "ornn":
        extra = f"""
  <g fill="none" stroke="{accent1}" stroke-opacity=".24" stroke-width="3">
    <path d="M154 390c-14-34 10-50 24-42 0-30 38-50 54-18 24-26 58-6 50 24 28-2 38 30 18 46h-146Z"/>
  </g>"""
    elif category == "emblem":
        extra = f"""
  <g fill="none" stroke="{accent1}" stroke-opacity=".2" stroke-width="2">
    <path d="M256 96 350 142v104c0 78-42 130-94 158-52-28-94-80-94-158V142Z"/>
  </g>"""
    else:
        extra = f"""
  <g fill="none" stroke="{accent1}" stroke-opacity=".18" stroke-width="2">
    <path d="M256 88 388 256 256 424 124 256Z"/>
    <path d="M256 132 352 256 256 380 160 256Z" stroke-opacity=".1"/>
  </g>"""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="{escape(name)} 装备示例图标">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#141d2e"/>
      <stop offset=".62" stop-color="#0b111c"/>
      <stop offset="1" stop-color="#070b12"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy=".4" r=".58">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".30"/>
      <stop offset=".65" stop-color="{accent1}" stop-opacity=".06"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{accent1}"/>
      <stop offset="1" stop-color="{accent2}"/>
    </linearGradient>
    <linearGradient id="disc" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{accent1}" stop-opacity=".16"/>
      <stop offset="1" stop-color="{accent1}" stop-opacity=".03"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="64" fill="url(#bg)"/>
  <rect x="1" y="1" width="510" height="510" rx="63" fill="none" stroke="url(#accent)" stroke-opacity=".42" stroke-width="2"/>
  <rect x="18" y="18" width="476" height="476" rx="50" fill="none" stroke="#ffffff" stroke-opacity=".055"/>
  <circle cx="256" cy="250" r="200" fill="url(#glow)"/>
  {extra}

  <circle cx="256" cy="256" r="146" fill="url(#disc)" stroke="url(#accent)" stroke-opacity=".38" stroke-width="3"/>
  <circle cx="256" cy="256" r="123" fill="none" stroke="{accent1}" stroke-opacity=".12" stroke-width="1"/>

  <text x="256" y="306" text-anchor="middle" font-family="{FONT}" font-size="{font_size}" font-weight="900" fill="url(#accent)">{escape(glyph)}</text>

  <g transform="translate(34, 32)">
    <rect width="130" height="32" rx="16" fill="#080d16" fill-opacity=".8" stroke="{accent1}" stroke-opacity=".35"/>
    <circle cx="18" cy="16" r="4" fill="{accent1}"/>
    <text x="31" y="21" font-family="{FONT}" font-size="12" letter-spacing="1.2" fill="#dbe5f3">{escape(label)}</text>
  </g>
  <text x="478" y="53" text-anchor="end" font-family="{FONT}" font-size="12" letter-spacing="1.4" fill="{accent1}" fill-opacity=".75">{en}</text>

  <text x="256" y="450" text-anchor="middle" font-family="{FONT}" font-size="{name_size}" font-weight="700" fill="#e9eff9">{escape(name)}</text>
  <text x="34" y="486" font-family="{FONT}" font-size="11" letter-spacing="1.4" fill="#657188">DEMO · 512 × 512</text>
  <text x="478" y="486" text-anchor="end" font-family="{FONT}" font-size="11" letter-spacing="1.4" fill="#657188">{escape(item_id)}</text>
</svg>
"""


FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#151f31"/>
      <stop offset="1" stop-color="#070b12"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe08a"/>
      <stop offset="1" stop-color="#d99a26"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#bg)"/>
  <path d="M32 6 55 19v26L32 58 9 45V19Z" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="30" y="12" width="4" height="22" rx="2" fill="url(#gold)"/>
  <circle cx="32" cy="16" r="1.3" fill="#0b111c"/>
  <path d="M22 32h20a5 5 0 0 1 5 5v6a9 9 0 0 1-9 9H26a9 9 0 0 1-9-9v-6a5 5 0 0 1 5-5Z" fill="url(#gold)"/>
  <g fill="#0b111c">
    <rect x="25" y="38" width="3" height="7" rx="1.5"/>
    <rect x="30.5" y="38" width="3" height="7" rx="1.5"/>
    <rect x="36" y="38" width="3" height="7" rx="1.5"/>
  </g>
</svg>
"""


def main():
    for folder in (TEAM_DIR, HEX_DIR, ITEM_DIR):
        folder.mkdir(parents=True, exist_ok=True)

    for index, team in enumerate(TEAMS, start=1):
        (TEAM_DIR / f"{team[0]}.svg").write_text(team_svg(team, index), encoding="utf-8")

    for index, hex_item in enumerate(HEXES, start=1):
        (HEX_DIR / f"{hex_item[0]}.svg").write_text(hex_svg(hex_item, index), encoding="utf-8")

    for item in ITEMS:
        (ITEM_DIR / f"{item[0]}.svg").write_text(item_svg(item), encoding="utf-8")

    (ROOT / "assets" / "favicon.svg").write_text(FAVICON, encoding="utf-8")

    print(f"已生成：{len(TEAMS)} 张阵容图、{len(HEXES)} 张海克斯图、{len(ITEMS)} 张装备图，以及 favicon.svg")


if __name__ == "__main__":
    main()
