/*
 * 乐神攻略站 · 内容数据
 * ------------------------------------------------------------
 * 这是整站唯一需要改内容的地方。
 * 1) 换图片：把图片按 README 里的文件名放进 assets/img/ 对应文件夹，
 *    再把下面 meta.imageExt 从 "svg" 改成 "webp"（或 png / jpg）。
 * 2) 改文字：直接改本文件里的数组即可，保存后刷新网页。
 * 3) 当前为演示内容，所有阵容码 / 数值都请替换成你自己的资料。
 */
const SITE_DATA = {
  meta: {
    brand: "乐神攻略站",
    brandEn: "LESHEN · TFT MOBILE GUIDE",
    author: "乐神",
    authorRole: "金铲铲之战内容创作者",
    version: "S15 · 示例版本",
    updated: "2026-11-19",
    // 图片扩展名：先用 svg 占位图；换成自己的图后改为 "webp"（也支持 png / jpg）
    imageExt: "svg",
    github: "" // 例如 "https://github.com/Go0seTL"，留空则不显示
  },

  /* ============================ 版本更新 ============================ */
  updates: [
    {
      date: "2026-11-19",
      version: "S15 · 15.4b",
      title: "中期平衡补丁",
      summary: "狙神与法师体系小幅降温，前排装备收益上调。环境从一家独大回到多套阵容轮转。",
      tags: ["平衡性调整", "热更新"],
      changes: [
        { type: "加强", text: "狂徒铠甲、石像鬼石板甲的基础坦度提升" },
        { type: "削弱", text: "暗星狙神的技能伤害成长略微下调" },
        { type: "调整", text: "海克斯池移除部分低上限的银色强化" }
      ]
    },
    {
      date: "2026-11-08",
      version: "S15 · 15.4",
      title: "海克斯池轮换",
      summary: "新增三枚棱彩强化，经济类海克斯的出场率提高，前期运营空间更大。",
      tags: ["海克斯", "环境变化"],
      changes: [
        { type: "新增", text: "便携锻炉回归棱彩池，奥恩神器优先级上升" },
        { type: "加强", text: "高端购物的刷新折扣更稳定" },
        { type: "削弱", text: "部分连胜经济强化触发条件提高" }
      ]
    },
    {
      date: "2026-10-28",
      version: "S15 · 15.3",
      title: "装备与神器调整",
      summary: "光明装备全面强化，奥恩神器的选择更偏向主C定制。",
      tags: ["装备", "奥恩神器"],
      changes: [
        { type: "加强", text: "光明无尽之刃的暴击收益提升" },
        { type: "调整", text: "狙击手的专注改为随距离递增的增伤" },
        { type: "新增", text: "纹章合成路线优化，转职阵容更容易成型" }
      ]
    },
    {
      date: "2026-10-18",
      version: "S15 · 15.1",
      title: "新赛季资料库上线",
      summary: "阵容、海克斯、装备三大板块完成整理，后续会随版本持续更新。",
      tags: ["赛季更新", "资料库"],
      changes: [
        { type: "新增", text: "版本答案阵容与运营节奏整理" },
        { type: "新增", text: "成装 / 光明装 / 奥恩神器 / 纹章分级" },
        { type: "调整", text: "资料库改为卡片式浏览，手机端同步适配" }
      ]
    }
  ],

  /* ============================ 阵容排行 ============================ */
  teams: [
    {
      id: "darkstar-sniper",
      name: "暗星狙神",
      tier: "S",
      rating: 9.6,
      difficulty: "中",
      tags: ["狙神", "暗星", "四费核心"],
      summary: "艾希单核远程爆发，前排拖时间，后排逐一点名。",
      lineup: [
        { name: "艾希", cost: 4 },
        { name: "厄斐琉斯", cost: 3 },
        { name: "莫德凯撒", cost: 3 },
        { name: "瑟提", cost: 2 },
        { name: "烬", cost: 4 },
        { name: "蕾欧娜", cost: 2 },
        { name: "索拉卡", cost: 3 },
        { name: "妮蔻", cost: 2 }
      ],
      coreItems: ["无尽之刃", "最后的轻语", "巨人杀手"],
      rhythm: [
        { time: "2-1", text: "优先抓狙神与前排羁绊，能做无尽直接做，保血量打连胜。" },
        { time: "3-2", text: "拉到六人口，找二星厄斐琉斯过渡，装备先给打工卡。" },
        { time: "4-1", text: "升七人口大搜艾希与烬，凑齐核心羁绊后开始锁血。" },
        { time: "5-1", text: "上八补索拉卡与莫德凯撒，追二星主C后考虑上九。" }
      ],
      position: "艾希与厄斐琉斯分居两角，前排集中在中路吸收火力；遇到刺客把主C往中间收一格，避免第一波被切。",
      note: "这套吃的是站位和启动速度。宁可少一件输出装，也要保证艾希第一波技能能安全放出来。",
      code: "【阵容码】##示例阵容·暗星狙神##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "star-guardian-mage",
      name: "星守法师",
      tier: "S",
      rating: 9.4,
      difficulty: "低",
      tags: ["星守", "法师", "运营"],
      summary: "阿狸带队的法系平推阵容，成型后技能覆盖全场。",
      lineup: [
        { name: "阿狸", cost: 4 },
        { name: "辛德拉", cost: 3 },
        { name: "妮蔻", cost: 2 },
        { name: "索拉卡", cost: 3 },
        { name: "拉克丝", cost: 4 },
        { name: "蕾欧娜", cost: 2 },
        { name: "塔姆", cost: 3 },
        { name: "维克托", cost: 4 }
      ],
      coreItems: ["蓝霸符", "珠光护手", "大天使之杖"],
      rhythm: [
        { time: "2-1", text: "用星守低费卡过渡，优先留眼泪和大棒，尽量走连胜。" },
        { time: "3-2", text: "六人口小搜质量，辛德拉带蓝霸符打工非常能打。" },
        { time: "4-1", text: "七人口找阿狸，凑出四法后输出开始成型。" },
        { time: "5-1", text: "八人口补维克托与拉克丝，追阿狸二星即可吃分。" }
      ],
      position: "法师沉底分散站位，阿狸放在有保护的角落；前排一字拉开，避免被范围技能一次清空。",
      note: "蓝霸符越早做越好，阿狸的启动速度直接决定这套阵容的上限。",
      code: "【阵容码】##示例阵容·星守法师##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "project-gunner",
      name: "源计划枪手",
      tier: "S",
      rating: 9.3,
      difficulty: "中",
      tags: ["源计划", "枪手", "速攻"],
      summary: "金克丝高频输出，前排顶住第一波就能滚起雪球。",
      lineup: [
        { name: "金克丝", cost: 4 },
        { name: "蔚", cost: 2 },
        { name: "艾克", cost: 3 },
        { name: "卡蜜尔", cost: 2 },
        { name: "烬", cost: 4 },
        { name: "厄斐琉斯", cost: 3 },
        { name: "蕾欧娜", cost: 2 },
        { name: "盖伦", cost: 3 }
      ],
      coreItems: ["鬼索的狂暴之刃", "无尽之刃", "红霸符"],
      rhythm: [
        { time: "2-1", text: "留源计划与枪手牌，反曲弓开局最舒服，能连胜就拉人口。" },
        { time: "3-2", text: "六人口找金克丝，先做鬼索保证持续输出。" },
        { time: "4-1", text: "七人口补齐四源计划，前排质量决定能不能过渡。" },
        { time: "5-1", text: "八人口补烬与蕾欧娜，追金克丝二星后开始提速。" }
      ],
      position: "金克丝站角，蔚与盖伦顶前排；注意别让主C和敌方刺客同侧，遇到突进阵容及时换边。",
      note: "这套很怕前排瞬间倒。经济允许的话，优先补一个石像鬼或狂徒，比多做一个输出装更稳。",
      code: "【阵容码】##示例阵容·源计划枪手##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "ox-fighter",
      name: "福牛格斗",
      tier: "A",
      rating: 9.0,
      difficulty: "中",
      tags: ["福牛", "格斗", "前排"],
      summary: "双前排成型后非常扎实，适合在物理环境里稳定吃分。",
      lineup: [
        { name: "瑟提", cost: 3 },
        { name: "阿利斯塔", cost: 2 },
        { name: "蔚", cost: 2 },
        { name: "盖伦", cost: 3 },
        { name: "塔姆", cost: 3 },
        { name: "蕾欧娜", cost: 2 },
        { name: "金克丝", cost: 4 },
        { name: "索拉卡", cost: 3 }
      ],
      coreItems: ["狂徒铠甲", "石像鬼石板甲", "救赎"],
      rhythm: [
        { time: "2-1", text: "格斗牌开局，优先做狂徒，前期血量会很健康。" },
        { time: "3-2", text: "六人口凑四格斗，瑟提带装备能扛能打。" },
        { time: "4-1", text: "七人口补金克丝补输出，开始考虑上八。" },
        { time: "5-1", text: "八人口补索拉卡，追三星瑟提是这套的吃鸡点。" }
      ],
      position: "瑟提顶最中间吃集火，阿利斯塔与盖伦分列两侧；后排输出放同侧，方便集火秒前排。",
      note: "福牛格斗的强点是容错，不是爆发。血量健康时不要急着梭哈，慢慢把三星瑟提追出来。",
      code: "【阵容码】##示例阵容·福牛格斗##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "dragon-cannon",
      name: "龙魂炮手",
      tier: "A",
      rating: 8.9,
      difficulty: "中",
      tags: ["龙魂", "炮手", "后期"],
      summary: "双炮手覆盖后排，拖到后期伤害非常夸张。",
      lineup: [
        { name: "崔丝塔娜", cost: 3 },
        { name: "库奇", cost: 4 },
        { name: "塔姆", cost: 3 },
        { name: "瑟提", cost: 3 },
        { name: "妮蔻", cost: 2 },
        { name: "索拉卡", cost: 3 },
        { name: "蕾欧娜", cost: 2 },
        { name: "盖伦", cost: 3 }
      ],
      coreItems: ["无尽之刃", "朔极之矛", "巨人杀手"],
      rhythm: [
        { time: "2-1", text: "炮手牌过渡，优先做无尽，前期不用刻意连败。" },
        { time: "3-2", text: "六人口找崔丝塔娜，补前排稳住血量。" },
        { time: "4-1", text: "七人口搜库奇，双炮手到位后输出质变。" },
        { time: "5-1", text: "八人口补瑟提与索拉卡，注意站位防刺客。" }
      ],
      position: "双炮手分开站两个角，避免被一条直线技能同时命中；前排顶中路，给后排争取输出时间。",
      note: "这套需要人口支撑，前期不要为了追三浪费太多经济，快速上八比低费三星更重要。",
      code: "【阵容码】##示例阵容·龙魂炮手##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "holy-guardian",
      name: "圣贤护卫",
      tier: "A",
      rating: 8.7,
      difficulty: "低",
      tags: ["圣贤", "护卫", "稳血"],
      summary: "双抗前排加后排持续输出，运营简单，新手友好。",
      lineup: [
        { name: "蕾欧娜", cost: 2 },
        { name: "布隆", cost: 2 },
        { name: "盖伦", cost: 3 },
        { name: "拉克丝", cost: 4 },
        { name: "索拉卡", cost: 3 },
        { name: "塔姆", cost: 3 },
        { name: "艾希", cost: 4 },
        { name: "妮蔻", cost: 2 }
      ],
      coreItems: ["石像鬼石板甲", "狂徒铠甲", "救赎"],
      rhythm: [
        { time: "2-1", text: "护卫牌开局，装备优先石像鬼，前期很难掉大血。" },
        { time: "3-2", text: "六人口补输出位，拉克丝或艾希谁先来用谁。" },
        { time: "4-1", text: "七人口凑齐四护卫，开始找四费输出核心。" },
        { time: "5-1", text: "八人口补索拉卡，阵容成型后靠质量慢慢磨。" }
      ],
      position: "护卫一字排开，主C放在最远角落；遇到范围伤害时把后排稍微拉开，避免一起吃技能。",
      note: "这是一套很适合练运营的阵容：不需要复杂操作，重点是经济节奏和前排装备优先级。",
      code: "【阵容码】##示例阵容·圣贤护卫##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "hacker-assassin",
      name: "黑客刺客",
      tier: "B",
      rating: 8.4,
      difficulty: "高",
      tags: ["黑客", "刺客", "偷分"],
      summary: "专切后排的爆发体系，站位博弈决定上限。",
      lineup: [
        { name: "劫", cost: 4 },
        { name: "阿卡丽", cost: 4 },
        { name: "艾克", cost: 3 },
        { name: "卡蜜尔", cost: 2 },
        { name: "蔚", cost: 2 },
        { name: "金克丝", cost: 4 },
        { name: "塔姆", cost: 3 },
        { name: "妮蔻", cost: 2 }
      ],
      coreItems: ["无尽之刃", "夜之锋刃", "正义之手"],
      rhythm: [
        { time: "2-1", text: "刺客牌过渡，优先做无尽，前期可以适当卖血拿装备。" },
        { time: "3-2", text: "六人口找劫，利用黑客机制直接威胁后排。" },
        { time: "4-1", text: "七人口补阿卡丽，双刺客成型后开始锁血。" },
        { time: "5-1", text: "八人口补前排与功能卡，站位每回合都要调整。" }
      ],
      position: "用黑客格子对准敌方主C，劫与阿卡丽分两侧切入；不要和敌方控制前排正面硬碰，绕开第一波控制。",
      note: "刺客阵容的强度有一半在站位。每回合看一眼对手主C的位置，比多追一件装备更重要。",
      code: "【阵容码】##示例阵容·黑客刺客##\n请把游戏内复制的阵容码替换到这里"
    },
    {
      id: "mecha-warden",
      name: "机甲卫士",
      tier: "B",
      rating: 8.2,
      difficulty: "低",
      tags: ["机甲", "卫士", "新手"],
      summary: "前排够硬的慢节奏阵容，适合熟悉基础运营。",
      lineup: [
        { name: "盖伦", cost: 3 },
        { name: "阿利斯塔", cost: 2 },
        { name: "蕾欧娜", cost: 2 },
        { name: "布隆", cost: 2 },
        { name: "金克丝", cost: 4 },
        { name: "艾希", cost: 4 },
        { name: "索拉卡", cost: 3 },
        { name: "妮蔻", cost: 2 }
      ],
      coreItems: ["狂徒铠甲", "石像鬼石板甲", "龙牙"],
      rhythm: [
        { time: "2-1", text: "优先拿前排羁绊，狂徒与石像鬼有什么做什么。" },
        { time: "3-2", text: "六人口稳住血量，输出装先给打工卡。" },
        { time: "4-1", text: "七人口补四费输出，根据来牌选择金克丝或艾希。" },
        { time: "5-1", text: "八人口补索拉卡，前排质量起来后很难被一波打死。" }
      ],
      position: "前排均匀铺开，主C缩角；这套不怕拉锯战，站位以保护主C为第一优先。",
      note: "环境里物理阵容多时，这套是很好的备选。不要强行玩，来牌不顺就转圣贤护卫。",
      code: "【阵容码】##示例阵容·机甲卫士##\n请把游戏内复制的阵容码替换到这里"
    }
  ],

  /* ============================ 海克斯排行 ============================ */
  hexes: [
    {
      id: "jeweled-lotus",
      rank: 1,
      name: "珠光莲花",
      rarity: "棱彩",
      tier: "S",
      glyph: "珠",
      desc: "技能可以暴击，暴击率与暴击伤害转化为额外收益。",
      tip: "法系主C和技能型阵容的通用上限强化。"
    },
    {
      id: "pandoras-items",
      rank: 2,
      name: "潘朵拉的装备",
      rarity: "棱彩",
      tier: "S",
      glyph: "潘",
      desc: "备战席上的装备会随机重铸，直到你拿到想要的组合。",
      tip: "装备不对、锁子甲开会时的救命符。"
    },
    {
      id: "portable-forge",
      rank: 3,
      name: "便携锻炉",
      rarity: "棱彩",
      tier: "S",
      glyph: "锻",
      desc: "开启一个武器库，从多件奥恩神器中挑选一件。",
      tip: "上限极高，优先给主C拿输出型神器。"
    },
    {
      id: "level-up",
      rank: 4,
      name: "升级咯",
      rarity: "棱彩",
      tier: "A",
      glyph: "升",
      desc: "购买经验时额外获得经验，更快冲上高人口。",
      tip: "适合需要八人口、九人口成型的大后期阵容。"
    },
    {
      id: "high-end-shopping",
      rank: 5,
      name: "高端购物",
      rarity: "金",
      tier: "A",
      glyph: "购",
      desc: "商店刷新费用降低，方便追高费卡质量。",
      tip: "四费核心阵容的稳定经济强化。"
    },
    {
      id: "second-wind",
      rank: 6,
      name: "复苏之风",
      rarity: "金",
      tier: "A",
      glyph: "风",
      desc: "战斗开始一段时间后，为全队回复生命值。",
      tip: "前排阵容和拉锯战体系的容错保障。"
    },
    {
      id: "battle-mage",
      rank: 7,
      name: "战斗法师",
      rarity: "金",
      tier: "A",
      glyph: "战",
      desc: "前排法师获得额外法术强度，越打越疼。",
      tip: "法系前排核心站前排时的输出强化。"
    },
    {
      id: "dd-street",
      rank: 8,
      name: "DD街区",
      rarity: "金",
      tier: "B",
      glyph: "DD",
      desc: "每回合免费刷新商店，节奏更顺滑。",
      tip: "前期追二星、中期找核心都舒服。"
    },
    {
      id: "wandering-merchant",
      rank: 9,
      name: "神奇游商",
      rarity: "银",
      tier: "B",
      glyph: "商",
      desc: "商店偶尔出现折扣卡牌，节省经济。",
      tip: "银色里偏经济，适合连胜滚雪球。"
    },
    {
      id: "team-building",
      rank: 10,
      name: "团队建设",
      rarity: "银",
      tier: "B",
      glyph: "团",
      desc: "获得一件随机基础装备和一名随机英雄。",
      tip: "前期补战力，开局过渡很实用。"
    }
  ],

  /* ============================ 装备排行 ============================ */
  items: {
    normal: {
      label: "成装",
      en: "CORE ITEMS",
      hint: "由两件基础装备合成，决定主C的输出方式与阵容下限。",
      list: [
        {
          id: "infinity-edge", rank: 1, name: "无尽之刃", tag: "物理核心",
          stats: "+35 攻击力 · +25% 暴击率", obtain: "合成：暴风大剑 + 拳套",
          desc: "暴击伤害大幅提升，物理主C的核心输出装。",
          tip: "给高攻速或技能可暴击的物理核心。"
        },
        {
          id: "spear-of-shojin", rank: 2, name: "朔极之矛", tag: "技能循环",
          stats: "+15 攻击力 · +15 法力 · 攻击回蓝", obtain: "合成：暴风大剑 + 女神之泪",
          desc: "普攻额外回复法力，让技能循环更顺。",
          tip: "适合依赖频繁释放技能的后排。"
        },
        {
          id: "jeweled-gauntlet", rank: 3, name: "珠光护手", tag: "法系爆发",
          stats: "+15 法术强度 · +25% 暴击率", obtain: "合成：拳套 + 无用大棒",
          desc: "技能可以暴击，法系爆发的关键组件。",
          tip: "搭配高基础伤害技能收益最高。"
        },
        {
          id: "last-whisper", rank: 4, name: "最后的轻语", tag: "破甲",
          stats: "+15% 攻速 · +25% 暴击率", obtain: "合成：反曲弓 + 拳套",
          desc: "暴击后降低目标护甲，处理前排的利器。",
          tip: "物理阵容面对高护甲前排时优先做。"
        },
        {
          id: "warmogs", rank: 5, name: "狂徒铠甲", tag: "前排坦度",
          stats: "+600 生命值", obtain: "合成：巨人腰带 + 巨人腰带",
          desc: "提供巨额生命值，前排坦度的基础。",
          tip: "给需要拖时间的前排或格斗家。"
        },
        {
          id: "gargoyle", rank: 6, name: "石像鬼石板甲", tag: "双抗",
          stats: "+25 护甲 · +25 魔抗", obtain: "合成：锁子甲 + 负极斗篷",
          desc: "每个被集火的目标都会提升双抗。",
          tip: "单顶前排、被多人围攻时最赚。"
        },
        {
          id: "blue-buff", rank: 7, name: "蓝霸符", tag: "法力启动",
          stats: "+30 初始法力 · +20 法术强度", obtain: "合成：女神之泪 + 女神之泪",
          desc: "降低最大法力值，让技能起手更快。",
          tip: "给短蓝条、技能收益高的核心。"
        },
        {
          id: "guinsoo", rank: 8, name: "鬼索的狂暴之刃", tag: "持续输出",
          stats: "+10% 攻速 · 攻击叠加攻速", obtain: "合成：反曲弓 + 无用大棒",
          desc: "越打越快，持续输出型核心的标配。",
          tip: "适合长线战斗和普攻型主C。"
        }
      ]
    },
    radiant: {
      label: "光明装",
      en: "RADIANT ITEMS",
      hint: "光明武器库产出，属性全面强化，遇到就是主C的质变装。",
      list: [
        {
          id: "radiant-infinity", rank: 1, name: "光明无尽之刃", tag: "物理核心",
          stats: "+70 攻击力 · +40% 暴击率", obtain: "来源：光明武器库",
          desc: "普通无尽的全面强化版，暴击收益直接拉满。",
          tip: "有就必拿，物理主C的第一优先级。"
        },
        {
          id: "radiant-jeweled", rank: 2, name: "光明珠光护手", tag: "法系爆发",
          stats: "+40 法术强度 · +40% 暴击率", obtain: "来源：光明武器库",
          desc: "技能暴击伤害进一步提高，法系核心的终极答案。",
          tip: "给阿狸、拉克丝这类高基础伤害技能。"
        },
        {
          id: "radiant-shojin", rank: 3, name: "光明朔极之矛", tag: "技能循环",
          stats: "+30 攻击力 · 更高回蓝", obtain: "来源：光明武器库",
          desc: "普攻回蓝效率大幅提升，技能释放频率质变。",
          tip: "适合依赖技能刷新的持续输出核心。"
        },
        {
          id: "radiant-gargoyle", rank: 4, name: "光明石像鬼石板甲", tag: "双抗",
          stats: "+50 护甲 · +50 魔抗", obtain: "来源：光明武器库",
          desc: "被集火时双抗成长更高，单顶前排非常硬。",
          tip: "给需要一个人扛住整条线的主坦。"
        },
        {
          id: "radiant-warmogs", rank: 5, name: "光明狂徒铠甲", tag: "前排坦度",
          stats: "+1000 生命值", obtain: "来源：光明武器库",
          desc: "生命值拉满，还能持续回复最大生命值。",
          tip: "格斗家、护卫体系的前排首选。"
        },
        {
          id: "radiant-guinsoo", rank: 6, name: "光明鬼索的狂暴之刃", tag: "持续输出",
          stats: "+20% 攻速 · 更高叠加", obtain: "来源：光明武器库",
          desc: "攻速叠得更快，长线战斗伤害无限成长。",
          tip: "给金克丝、崔丝塔娜这类普攻核心。"
        }
      ]
    },
    ornn: {
      label: "奥恩神器",
      en: "ORNN ARTIFACTS",
      hint: "奥恩锻造产出，一件就能改变主C的玩法，优先度高于普通成装。",
      list: [
        {
          id: "ornn-infinity-force", rank: 1, name: "无尽之力", tag: "全能输出",
          stats: "+50 攻击力 · +50 法术强度 · +30% 暴击率", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "同时提供攻击力、法强与暴击，一件顶三件。",
          tip: "任何双修核心拿到都能直接起飞。"
        },
        {
          id: "ornn-gold-collector", rank: 2, name: "金币收集者", tag: "处决经济",
          stats: "+40 攻击力 · +20% 暴击率", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "处决低血量目标并掉落金币，滚雪球能力极强。",
          tip: "前期拿到可以一边打连胜一边攒经济。"
        },
        {
          id: "ornn-deaths-defiance", rank: 3, name: "死亡之蔑", tag: "保命续航",
          stats: "+40 攻击力 · +20 护甲 · +20 魔抗", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "血量降低时获得伤害减免与全能吸血，主C的保命装。",
          tip: "怕刺客、怕爆发时优先给主C。"
        },
        {
          id: "ornn-snipers-focus", rank: 4, name: "狙击手的专注", tag: "远程增伤",
          stats: "+20% 攻速 · 距离越远伤害越高", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "与目标距离越远增伤越高，鼓励沉底站位。",
          tip: "狙神、炮手这类长手核心的专属神器。"
        },
        {
          id: "ornn-eternal-winter", rank: 5, name: "永恒凛冬", tag: "控制",
          stats: "+300 生命值 · +25 护甲", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "攻击降低目标攻速，低血量时还能冻结周围敌人。",
          tip: "给前排或功能位，克制攻速流阵容。"
        },
        {
          id: "ornn-moguls-mail", rank: 6, name: "魔蕴", tag: "法系续航",
          stats: "+40 法术强度 · +30 初始法力", obtain: "来源：奥恩锻造 / 便携锻炉",
          desc: "提供法强与法力回复，技能循环更顺滑。",
          tip: "法系主C缺少启动装时的优秀替代。"
        }
      ]
    },
    emblem: {
      label: "纹章",
      en: "EMBLEMS",
      hint: "转职类装备，用来补羁绊或提前成型，多一个纹章就多一种构筑可能。",
      list: [
        {
          id: "emblem-sniper", rank: 1, name: "狙神纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得狙神", obtain: "合成：金铲铲 + 反曲弓",
          desc: "多开一个狙神位，狙神体系成型更快。",
          tip: "有狙神转时可以少带一张低费挂件。"
        },
        {
          id: "emblem-mage", rank: 2, name: "法师纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得法师", obtain: "合成：金铲铲 + 女神之泪",
          desc: "让任意单位获得法师羁绊，方便开高法。",
          tip: "给功能位或前排，补羁绊非常灵活。"
        },
        {
          id: "emblem-star", rank: 3, name: "星守纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得星守", obtain: "合成：金铲铲 + 无用大棒",
          desc: "星守体系的成型加速器，后期上限更高。",
          tip: "星守阵容缺人口时的最优解之一。"
        },
        {
          id: "emblem-project", rank: 4, name: "源计划纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得源计划", obtain: "合成：金铲铲 + 暴风大剑",
          desc: "补源计划羁绊，让枪手体系更早成型。",
          tip: "多一个源计划位可以换上更强的高费卡。"
        },
        {
          id: "emblem-ox", rank: 5, name: "福牛纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得福牛", obtain: "合成：金铲铲 + 巨人腰带",
          desc: "福牛体系的转职装，前排质量更容易堆起来。",
          tip: "给外援前排，直接享受福牛加成。"
        },
        {
          id: "emblem-brawler", rank: 6, name: "格斗家纹章", tag: "转职",
          stats: "羁绊 +1 · 携带者获得格斗家", obtain: "合成：金铲铲 + 巨人腰带",
          desc: "补充格斗家羁绊，让前排更肉更难处理。",
          tip: "适合在格斗体系里替换掉低质量挂件。"
        }
      ]
    }
  }
};
