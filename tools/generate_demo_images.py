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

TEAMS = []
HEXES = []
ITEMS = []

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
        (483, 432), (561, 432), (639, 432),
    ]
    cells = []
    occupied = set()
    for idx, (cx, cy) in enumerate(positions):
        if idx >= len(champs):
            continue
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
  <text x="48" y="624" font-family="{FONT}" font-size="20" letter-spacing="2.5" fill="#b8c3d4">DEMO · 阵容构成示意</text>
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
    import json

    specs_path = ROOT / "tools" / "demo_image_specs.json"
    specs = json.loads(specs_path.read_text(encoding="utf-8"))

    global TEAMS, HEXES, ITEMS
    TEAMS = [
        (x["id"], x["name"], x["accent1"], x["accent2"], x["champions"])
        for x in specs.get("teams", [])
    ]
    HEXES = [
        (x["id"], x["name"], x["rarity"], x["glyph"])
        for x in specs.get("hexes", [])
    ]
    ITEMS = [
        (x["id"], x["name"], x["category"], x["glyph"], x["accent1"], x["accent2"])
        for x in specs.get("items", [])
    ]

    for folder in (TEAM_DIR, HEX_DIR, ITEM_DIR):
        folder.mkdir(parents=True, exist_ok=True)
        for old in folder.glob("*.svg"):
            old.unlink()

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
