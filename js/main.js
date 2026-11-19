/* ============================================================
   乐神攻略站 · 交互脚本
   无第三方依赖，直接打开 index.html 也能运行
   ============================================================ */

(function () {
  "use strict";

  const DATA = typeof SITE_DATA !== "undefined" ? SITE_DATA : null;
  if (!DATA) {
    console.error("没有找到 SITE_DATA，请确认 js/data.js 已正确引入。");
    return;
  }

  const META = DATA.meta || {};
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const esc = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const pad2 = (num) => String(num).padStart(2, "0");

  const assetPath = (category, id, ext) => `assets/img/${category}/${id}.${ext || "svg"}`;

  const imgTag = (category, id, alt, className = "") => {
    const primary = assetPath(category, id, META.imageExt || "svg");
    const fallback = assetPath(category, id, "svg");
    return `<img${className ? ` class="${className}"` : ""} src="${primary}" alt="${esc(alt)}" loading="lazy" decoding="async" draggable="false" onerror="this.onerror=null;this.src='${fallback}'">`;
  };

  const icon = (name) =>
    `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

  /* ============================ 基础信息 ============================ */

  function initMeta() {
    const season = String(META.version || "S15 · 示例版本").split("·")[0].trim();
    const heroVersion = $("#heroVersion");
    const currentVersion = $("#currentVersion");
    const lastUpdated = $("#lastUpdated");
    const footerUpdated = $("#footerUpdated");
    const mobileVersion = $("#mobileVersion");
    const brandName = $("#brandName");
    const brandEn = $("#brandEn");
    const footerBrandName = $(".footer-brand .brand-copy strong");
    const footerBrandEn = $(".footer-brand .brand-copy small");
    const authorName = $("#authorName");
    const authorRole = $("#authorRole");
    const footerCopyrightBrand = $("#footerCopyrightBrand");

    if (brandName) brandName.textContent = META.brand || "乐神攻略站";
    if (brandEn) brandEn.textContent = META.brandEn || "LESHEN · TFT MOBILE GUIDE";
    if (footerBrandName) footerBrandName.textContent = META.brand || "乐神攻略站";
    if (footerBrandEn) footerBrandEn.textContent = META.brandEn || "LESHEN · TFT MOBILE GUIDE";
    if (heroVersion) heroVersion.textContent = `${season} 赛季 · 攻略资料库持续更新`;
    if (currentVersion) currentVersion.textContent = META.version || "S15 · 示例版本";
    if (mobileVersion) mobileVersion.textContent = META.version || "S15 · 示例版本";
    if (lastUpdated) lastUpdated.textContent = META.updated || "";
    if (footerUpdated) footerUpdated.textContent = META.updated || "";
    if (authorName) authorName.textContent = META.author || "乐神";
    if (authorRole) authorRole.textContent = META.authorRole || "金铲铲之战内容创作者";
    if (footerCopyrightBrand) footerCopyrightBrand.textContent = META.brand || "乐神攻略站";

    const footerYear = $("#footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    document.title = `${META.brand || "乐神攻略站"} · 金铲铲之战阵容 / 海克斯 / 装备资料库`;
  }

  /* ============================ 版本更新 ============================ */

  function renderUpdates() {
    const timeline = $("#updateTimeline");
    const updates = Array.isArray(DATA.updates) ? DATA.updates.slice() : [];
    if (!timeline) return;

    if (!updates.length) {
      timeline.innerHTML = '<div class="timeline-empty glass-card">还没有版本更新记录，在 js/data.js 的 updates 中添加即可。</div>';
      return;
    }

    const typeClass = {
      加强: "type-buff",
      削弱: "type-nerf",
      调整: "type-adjust",
      新增: "type-new"
    };

    timeline.innerHTML = updates
      .map((item, index) => {
        const dateParts = String(item.date || "").split("-");
        const year = dateParts[0] || "";
        const monthDay = dateParts.length >= 3 ? `${dateParts[1]}.${dateParts[2]}` : String(item.date || "");
        const latest = index === 0;
        const changes = Array.isArray(item.changes)
          ? item.changes
              .map(
                (change) => `<div class="change ${typeClass[change.type] || "type-adjust"}">
                  <b>${esc(change.type || "调整")}</b>
                  <span>${esc(change.text)}</span>
                </div>`
              )
              .join("")
          : "";
        const tags = Array.isArray(item.tags)
          ? item.tags.map((tag) => `<span>#${esc(tag)}</span>`).join("")
          : "";

        return `
          <div class="timeline-item${latest ? " is-latest" : ""} reveal" style="--d:${index * 60}ms">
            <div class="timeline-date">
              <strong>${esc(monthDay)}</strong>
              <span>${esc(year)}</span>
            </div>
            <span class="timeline-dot" aria-hidden="true"></span>
            <article class="timeline-card glass-card spotlight">
              <div class="timeline-top">
                <span class="version-tag">${esc(item.version || META.version || "")}</span>
                ${latest ? '<span class="new-badge">最新</span>' : ""}
                <span class="timeline-date-inline">${esc(item.date || "")}</span>
              </div>
              <h3>${esc(item.title || "版本更新")}</h3>
              <p>${esc(item.summary || "")}</p>
              ${changes ? `<div class="change-list">${changes}</div>` : ""}
              ${tags ? `<div class="timeline-tags">${tags}</div>` : ""}
            </article>
          </div>`;
      })
      .join("");

    const first = updates[0];
    const versionBig = $("#updateVersionBig");
    if (versionBig) {
      const parts = String(first.version || META.version || "").split("·").map((part) => part.trim());
      versionBig.innerHTML = `<span class="ver-main">${esc(parts[0] || META.version || "S15")}</span>${
        parts[1] ? `<span class="ver-sub">${esc(parts[1])}</span>` : ""
      }`;
    }

    const updateDate = $("#updateDate");
    if (updateDate) updateDate.textContent = first.date || META.updated || "";
    const updateCount = $("#updateCount");
    if (updateCount) updateCount.textContent = `${updates.length} 条记录`;
  }

  /* ============================ 阵容排行 ============================ */

  const TIER_META = {
    S: { label: "版本答案", rowClass: "tier-s-row" },
    A: { label: "稳定上分", rowClass: "tier-a-row" },
    B: { label: "环境备选", rowClass: "tier-b-row" }
  };

  function renderTeams() {
    const container = $("#teamTierList");
    if (!container) return;

    const teams = Array.isArray(DATA.teams) ? DATA.teams.slice() : [];
    const tiers = ["S", "A", "B"]
      .map((tier) => ({
        tier,
        teams: teams.filter((team) => team.tier === tier).sort((a, b) => (b.rating || 0) - (a.rating || 0))
      }))
      .filter((group) => group.teams.length);

    container.innerHTML = tiers
      .map((group, groupIndex) => {
        const meta = TIER_META[group.tier] || { label: "其他", rowClass: "" };
        const cards = group.teams
          .map(
            (team) => `
            <article class="team-card spotlight" data-team-id="${esc(team.id)}" role="button" tabindex="0" aria-label="查看 ${esc(team.name)} 阵容详情">
              <div class="team-media">
                ${imgTag("teams", team.id, `${team.name} 阵容图`)}
                <span class="tier-badge tier-${group.tier.toLowerCase()}">${esc(group.tier)}</span>
                <span class="strength-badge">强度 <b>${esc(team.rating)}</b></span>
              </div>
              <div class="team-body">
                <div class="team-tags">${(team.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
                <h3>${esc(team.name)}</h3>
                <p class="team-summary">${esc(team.summary || "")}</p>
                <div class="team-foot">
                  <span class="difficulty">难度 <b>${esc(team.difficulty || "中")}</b></span>
                  <span class="detail-link">查看攻略 ${icon("arrow")}</span>
                </div>
              </div>
            </article>`
          )
          .join("");

        const placeholders = (3 - (group.teams.length % 3)) % 3;
        const placeholderCards = Array.from({ length: placeholders }, () => `
            <div class="team-card team-placeholder" aria-hidden="true">
              <span class="placeholder-plus">+</span>
              <strong>更多阵容整理中</strong>
              <small>版本更新后持续补充</small>
            </div>`).join("");

        return `
          <div class="tier-row ${meta.rowClass} reveal" style="--d:${groupIndex * 70}ms">
            <div class="tier-label">
              <span class="tier-letter">${esc(group.tier)}</span>
              <span class="tier-name">${esc(meta.label)}</span>
              <span class="tier-count">${group.teams.length} 套阵容</span>
            </div>
            <div class="tier-cards">${cards}${placeholderCards}</div>
          </div>`;
      })
      .join("");
  }

  /* ============================ 海克斯 ============================ */

  const RARITY_CLASS = {
    银: "rarity-silver",
    金: "rarity-gold",
    棱彩: "rarity-prismatic"
  };

  let currentRarity = "全部";

  function renderHexes(rarity = currentRarity) {
    const grid = $("#hexGrid");
    const count = $("#hexCount");
    if (!grid) return;
    currentRarity = rarity;

    const all = Array.isArray(DATA.hexes) ? DATA.hexes.slice().sort((a, b) => (a.rank || 0) - (b.rank || 0)) : [];
    const list = rarity === "全部" ? all : all.filter((hex) => hex.rarity === rarity);

    grid.innerHTML = list
      .map(
        (hex, index) => `
        <article class="hex-card" data-rarity="${esc(hex.rarity)}" style="animation-delay:${index * 35}ms">
          <span class="hex-rank" aria-hidden="true">${pad2(hex.rank)}</span>
          <div class="hex-media">${imgTag("hex", hex.id, `${hex.name} 海克斯图标`)}</div>
          <div class="hex-body">
            <div class="hex-title-row">
              <h3>${esc(hex.name)}</h3>
              <span class="hex-rarity ${RARITY_CLASS[hex.rarity] || "rarity-gold"}">${esc(hex.rarity)}</span>
            </div>
            <p class="hex-desc">${esc(hex.desc || "")}</p>
            <div class="hex-tip"><b>建议</b><span>${esc(hex.tip || "")}</span></div>
          </div>
          <span class="hex-tier tier-${esc((hex.tier || "a").toLowerCase())}">${esc(hex.tier || "A")}</span>
        </article>`
      )
      .join("");

    if (!list.length) {
      grid.innerHTML = '<div class="empty-state glass-card">这个品质暂时还没有整理内容。</div>';
    }

    if (count) {
      count.textContent = `${list.length} 枚强化`;
    }
  }

  function initHexFilter() {
    const toolbar = $(".filter-group");
    if (!toolbar) return;
    toolbar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-rarity]");
      if (!button) return;
      $$(".filter-btn", toolbar).forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
      renderHexes(button.dataset.rarity || "全部");
    });
  }

  /* ============================ 装备排行 ============================ */

  let currentTab = "normal";

  function renderItems(tabKey = currentTab) {
    const panel = $("#itemPanel");
    const hint = $("#tabHint");
    if (!panel) return;
    const group = DATA.items && DATA.items[tabKey];
    if (!group || !Array.isArray(group.list)) return;
    currentTab = tabKey;

    const sorted = group.list.slice().sort((a, b) => (a.rank || 0) - (b.rank || 0));
    const top = sorted.slice(0, 3);
    const rest = sorted.slice(3);

    const podium = top
      .map(
        (item, index) => `
        <article class="podium-card spotlight" style="animation-delay:${index * 70}ms">
          <span class="podium-crown">TOP ${item.rank}</span>
          <span class="podium-rank" aria-hidden="true">${pad2(item.rank)}</span>
          <div class="podium-icon">${imgTag("items", item.id, `${item.name} 装备图标`)}</div>
          <div class="podium-info">
            <span class="item-tag">${esc(item.tag || "")}</span>
            <h3>${esc(item.name)}</h3>
            <p class="podium-desc">${esc(item.desc || "")}</p>
            <div class="podium-stats">${esc(item.stats || "")}</div>
          </div>
        </article>`
      )
      .join("");

    const rows = rest
      .map(
        (item, index) => `
        <article class="item-row" style="animation-delay:${(index + 3) * 45}ms">
          <span class="item-rank">${pad2(item.rank)}</span>
          <div class="item-icon">${imgTag("items", item.id, `${item.name} 装备图标`)}</div>
          <div class="item-name">
            <h4>${esc(item.name)}</h4>
            <small>${esc(item.obtain || "")}</small>
          </div>
          <div class="item-stats">${esc(item.stats || "")}</div>
          <p class="item-tip">${esc(item.tip || "")}</p>
        </article>`
      )
      .join("");

    panel.innerHTML = `<div class="podium">${podium}</div>${rest.length ? `<div class="item-list">${rows}</div>` : ""}`;
    if (hint) hint.textContent = group.hint || "";
    panel.setAttribute("aria-labelledby", `tab-${tabKey}`);
  }

  function activateTab(tabKey, focusButton = false) {
    const group = DATA.items && DATA.items[tabKey];
    if (!group) return;
    $$(".tab-btn").forEach((button) => {
      const active = button.dataset.tab === tabKey;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focusButton) button.focus();
    });
    renderItems(tabKey);
  }

  function initTabs() {
    const tabs = $(".item-tabs");
    if (!tabs) return;
    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tab]");
      if (button) activateTab(button.dataset.tab);
    });
    tabs.addEventListener("keydown", (event) => {
      const buttons = $$(".tab-btn", tabs);
      const currentIndex = buttons.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      let nextIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % buttons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activateTab(buttons[nextIndex].dataset.tab, true);
    });
  }

  /* ============================ 页面滚动 / 导航 ============================ */

  function initScrollUI() {
    const header = $("#siteHeader");
    const progress = $("#scrollProgress");
    const backToTop = $("#backToTop");
    const navLinks = $$(".nav-link");
    const sectionIds = ["intro", "updates", "teams", "hexes", "items"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let ticking = false;
    let lastActive = "";

    function update() {
      const y = window.scrollY || window.pageYOffset;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const percent = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;

      if (header) header.classList.toggle("scrolled", y > 24);
      if (progress) progress.style.width = `${percent}%`;
      if (backToTop) backToTop.classList.toggle("show", y > 620);

      let active = "intro";
      const marker = y + 150;
      sections.forEach((section) => {
        if (section.offsetTop <= marker) active = section.id;
      });
      if (max > 0 && y >= max - 20) active = sections.length ? sections[sections.length - 1].id : active;

      if (active !== lastActive) {
        lastActive = active;
        navLinks.forEach((link) => {
          const isActive = link.dataset.nav === active;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      });
    }
  }

  /* ============================ 移动端菜单 ============================ */

  function syncScrollLock(modalOpen) {
    const menuOpen = document.body.classList.contains("menu-open");
    const modalIsOpen = typeof modalOpen === "boolean" ? modalOpen : $("#teamModal")?.classList.contains("is-open");
    document.body.classList.toggle("no-scroll", Boolean(menuOpen || modalIsOpen));
  }

  function initMobileMenu() {
    const toggle = $("#menuToggle");
    const menu = $("#mobileMenu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      menu.setAttribute("aria-hidden", String(!open));
      syncScrollLock();
      if (open) {
        window.setTimeout(() => {
          const firstLink = $("a", menu);
          if (firstLink) firstLink.focus({ preventScroll: true });
        }, 140);
      } else if (menu.contains(document.activeElement)) {
        toggle.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("menu-open"));
    });

    $$("[data-mobile-link]", menu).forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        const target = href && href.startsWith("#") ? document.querySelector(href) : null;
        if (!target) {
          setOpen(false);
          return;
        }
        event.preventDefault();
        setOpen(false);
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }, 90);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        setOpen(false);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 981px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onChange);
    else if (desktopQuery.addListener) desktopQuery.addListener(onChange);
  }

  /* ============================ 阵容弹窗 ============================ */

  let lastFocusedElement = null;
  let currentTeam = null;
  let toastTimer = null;
  let copyResetTimer = null;

  function openTeam(teamId) {
    const team = (DATA.teams || []).find((item) => item.id === teamId);
    const modal = $("#teamModal");
    const panel = $(".modal-panel", modal || document);
    if (!team || !modal || !panel) return;

    currentTeam = team;
    lastFocusedElement = document.activeElement;

    const image = $("#modalImage");
    if (image) {
      image.onerror = () => {
        image.onerror = null;
        image.src = assetPath("teams", team.id, "svg");
      };
      image.src = assetPath("teams", team.id, META.imageExt || "svg");
      image.alt = `${team.name} 阵容图`;
    }

    const tier = $("#modalTier");
    if (tier) {
      tier.className = `tier-badge tier-${String(team.tier || "b").toLowerCase()}`;
      tier.textContent = team.tier || "B";
    }

    $("#modalTitle").textContent = team.name || "阵容详情";
    $("#modalTags").innerHTML = (team.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("");
    $("#modalStats").innerHTML = `
      <span class="modal-stat"><small>强度评分</small><b class="gold">${esc(team.rating || "-")}</b></span>
      <span class="modal-stat"><small>强度档位</small><b>${esc(team.tier || "-")}</b></span>
      <span class="modal-stat"><small>运营难度</small><b>${esc(team.difficulty || "-")}</b></span>
      <span class="modal-stat"><small>阵容人口</small><b>${(team.lineup || []).length} 人口</b></span>`;

    $("#modalLineup").innerHTML = (team.lineup || [])
      .map(
        (champ) =>
          `<span class="champ cost-${esc(champ.cost || 1)}"><i>${esc(champ.cost || 1)}</i>${esc(champ.name)}</span>`
      )
      .join("");

    $("#modalItems").innerHTML = (team.coreItems || [])
      .map((item) => `<span class="core-item">${esc(item)}</span>`)
      .join("");

    $("#modalPosition").textContent = team.position || "暂无站位说明。";
    $("#modalRhythm").innerHTML = (team.rhythm || [])
      .map((step) => `<li><time>${esc(step.time || "")}</time><p>${esc(step.text || "")}</p></li>`)
      .join("");
    $("#modalNote").textContent = team.note || "";
    $("#modalCode").textContent = team.code || "暂无阵容码";

    const copyButton = $("#copyCode");
    if (copyButton) {
      copyButton.disabled = !team.code;
      copyButton.innerHTML = `${icon("copy")} 复制阵容码`;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    syncScrollLock(true);
    window.setTimeout(() => panel.focus({ preventScroll: true }), 80);
  }

  function closeModal() {
    const modal = $("#teamModal");
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    syncScrollLock(false);
    currentTeam = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
    lastFocusedElement = null;
  }

  function trapModalFocus(event) {
    const modal = $("#teamModal");
    if (!modal || !modal.classList.contains("is-open")) return;
    const panel = $(".modal-panel", modal);
    if (!panel) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = $$(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      panel
    ).filter((el) => el.offsetParent !== null);
    if (!focusable.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      // 继续走兼容方案
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    textarea.remove();
    return ok;
  }

  function initModal() {
    const modal = $("#teamModal");
    if (!modal) return;

    const closeButton = $("#modalClose");
    if (closeButton) closeButton.addEventListener("click", closeModal);
    $$("[data-close-modal]", modal).forEach((element) => element.addEventListener("click", closeModal));

    const copyButton = $("#copyCode");
    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        if (!currentTeam || !currentTeam.code) return;
        const ok = await copyText(currentTeam.code);
        showToast(ok ? "阵容码已复制，去游戏里导入吧！" : "复制失败，请手动选择阵容码");
        if (ok) {
          copyButton.innerHTML = `${icon("check")} 已复制`;
          window.clearTimeout(copyResetTimer);
          copyResetTimer = window.setTimeout(() => {
            copyButton.innerHTML = `${icon("copy")} 复制阵容码`;
          }, 1800);
        }
      });
    }

    document.addEventListener("keydown", trapModalFocus);
  }

  function initTeamInteractions() {
    const container = $("#teamTierList");
    if (!container) return;

    container.addEventListener("click", (event) => {
      const card = event.target.closest(".team-card");
      if (card && card.dataset.teamId) openTeam(card.dataset.teamId);
    });

    container.addEventListener("keydown", (event) => {
      const card = event.target.closest(".team-card");
      if (!card || !card.dataset.teamId) return;
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        openTeam(card.dataset.teamId);
      }
    });

    if (finePointer && !prefersReduced) {
      container.addEventListener("pointermove", (event) => {
        const card = event.target.closest(".team-card");
        if (!card || !card.dataset.teamId) return;
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", `${(px * 4.5).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-py * 4.5).toFixed(2)}deg`);
      });

      container.addEventListener("pointerout", (event) => {
        const card = event.target.closest(".team-card");
        if (!card || !card.dataset.teamId) return;
        if (!card.contains(event.relatedTarget)) {
          card.style.removeProperty("--rx");
          card.style.removeProperty("--ry");
        }
      });
    }
  }

  /* ============================ 鼠标光斑 ============================ */

  function initSpotlight() {
    if (!finePointer || prefersReduced) return;
    let raf = null;
    let target = null;
    let x = 0;
    let y = 0;

    document.addEventListener(
      "pointermove",
      (event) => {
        const element = event.target.closest(".spotlight");
        if (!element) return;
        const rect = element.getBoundingClientRect();
        target = element;
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        if (raf !== null) return;
        raf = window.requestAnimationFrame(() => {
          if (target) {
            target.style.setProperty("--mx", `${x}px`);
            target.style.setProperty("--my", `${y}px`);
          }
          raf = null;
        });
      },
      { passive: true }
    );
  }

  /* ============================ 入场动画 ============================ */

  function initReveal() {
    const elements = $$(".reveal:not(.is-visible)");
    if (!elements.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
  }

  /* ============================ 数字滚动 ============================ */

  function initCounters() {
    const itemCount = Object.values(DATA.items || {}).reduce(
      (sum, group) => sum + (Array.isArray(group.list) ? group.list.length : 0),
      0
    );
    const targets = {
      statTeams: (DATA.teams || []).length,
      statHexes: (DATA.hexes || []).length,
      statItems: itemCount
    };

    const counters = Object.keys(targets)
      .map((id) => {
        const element = document.getElementById(id);
        if (element) element.dataset.count = String(targets[id]);
        return element;
      })
      .filter(Boolean);

    if (!counters.length) return;
    if (prefersReduced) {
      counters.forEach((element) => {
        element.textContent = element.dataset.count;
      });
      return;
    }

    const start = performance.now();
    const duration = 1400;

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach((element) => {
        element.textContent = String(Math.round(Number(element.dataset.count) * eased));
      });
      if (progress < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  /* ============================ Hero 粒子 ============================ */

  function initParticles() {
    const canvas = $("#heroParticles");
    if (!canvas || prefersReduced) return;
    const hero = canvas.closest(".hero");
    const context = canvas.getContext("2d");
    if (!hero || !context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let raf = null;
    let visible = true;
    const colors = ["245, 196, 81", "79, 209, 197", "167, 139, 250"];

    function createParticles() {
      const count = Math.round(Math.min(58, Math.max(16, (width * height) / 17000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.7,
        vx: -0.06 + Math.random() * 0.12,
        vy: -0.06 - Math.random() * 0.14,
        alpha: 0.16 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    }

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    function frame(time) {
      raf = null;
      if (!visible || document.hidden) return;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx + Math.sin(time * 0.00035 + particle.phase) * 0.06;
        particle.y += particle.vy;
        if (particle.y < -8) {
          particle.y = height + 8;
          particle.x = Math.random() * width;
        }
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;

        const alpha = particle.alpha * (0.62 + 0.38 * Math.sin(time * 0.0011 + particle.phase));
        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.color}, ${alpha.toFixed(3)})`;
        context.fill();
      });

      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (raf === null) raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
    }

    resize();
    start();

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 160);
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && !document.hidden) start();
          else stop();
        },
        { threshold: 0 }
      );
      observer.observe(hero);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (visible) start();
    });
  }

  /* ============================ 启动 ============================ */

  function init() {
    initMeta();
    renderUpdates();
    renderTeams();
    renderHexes("全部");
    renderItems("normal");
    initHexFilter();
    initTabs();
    initTeamInteractions();
    initModal();
    initScrollUI();
    initMobileMenu();
    initSpotlight();
    initReveal();
    initCounters();
    initParticles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
