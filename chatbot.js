(() => {
  if (document.querySelector("rain-ai-chatbot")) return;

  const host = document.createElement("rain-ai-chatbot");
  const shadow = host.attachShadow({ mode: "open" });
  document.body.append(host);

  const globalStyle = document.createElement("style");
  globalStyle.textContent = "body.rain-chat-open > .mobile-cta{display:none!important}";
  document.head.append(globalStyle);

  shadow.innerHTML = `
    <style>
      :host{--navy:#061d2f;--navy2:#0b314c;--sky:#2e9ed3;--sky-light:#e9f6fc;--line:#d9e8f0;--text:#102b3d;--muted:#5f7380;position:fixed;right:22px;bottom:22px;z-index:2147482000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;color:var(--text)}
      *{box-sizing:border-box}
      button,textarea{font:inherit}
      button{cursor:pointer}
      .launcher{width:66px;height:66px;border:0;border-radius:50%;background:linear-gradient(145deg,var(--navy2),var(--navy));color:#fff;box-shadow:0 16px 38px rgba(5,34,52,.3);display:grid;place-items:center;position:relative;transition:transform .2s ease,box-shadow .2s ease}
      .launcher:hover{transform:translateY(-2px);box-shadow:0 20px 42px rgba(5,34,52,.35)}
      .launcher svg{width:28px;height:28px}
      .launcher .dot{position:absolute;right:3px;top:3px;width:15px;height:15px;border-radius:50%;background:#2fc981;border:3px solid #fff}
      .launcher-label{position:absolute;right:76px;top:13px;white-space:nowrap;background:#fff;color:var(--navy);border:1px solid var(--line);border-radius:12px;padding:10px 13px;font-size:13px;font-weight:700;box-shadow:0 10px 26px rgba(5,34,52,.15)}
      .panel{position:absolute;right:0;bottom:0;width:min(430px,calc(100vw - 28px));height:min(690px,calc(100vh - 36px));background:#fff;border:1px solid rgba(20,82,113,.16);border-radius:22px;box-shadow:0 28px 70px rgba(4,30,47,.3);overflow:hidden;display:none;grid-template-rows:auto 1fr auto auto;transform-origin:bottom right}
      .panel.open{display:grid;animation:show .2s ease-out}
      @keyframes show{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
      .head{background:linear-gradient(135deg,var(--navy),var(--navy2));color:#fff;padding:16px 15px;display:flex;align-items:center;gap:11px;user-select:none;touch-action:none}
      .brand-icon{width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.12);display:grid;place-items:center;flex:none}
      .brand-icon svg{width:23px;height:23px}
      .brand{min-width:0;flex:1}.brand strong{display:block;font-size:15px}.brand span{display:flex;align-items:center;gap:6px;margin-top:3px;color:#cfe6f2;font-size:11px}.brand i{width:7px;height:7px;border-radius:50%;background:#2fc981}
      .head-actions{display:flex;gap:4px}.icon-btn{border:0;background:transparent;color:#fff;width:34px;height:34px;border-radius:10px;display:grid;place-items:center}.icon-btn:hover{background:rgba(255,255,255,.12)}.icon-btn svg{width:18px;height:18px}
      .messages{background:linear-gradient(#f7fbfd,#fff);padding:18px 15px 12px;overflow-y:auto;overscroll-behavior:contain}
      .message{display:flex;margin:0 0 13px;gap:8px;align-items:flex-end}.message.user{justify-content:flex-end}.avatar{width:26px;height:26px;border-radius:9px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:800;flex:none}
      .bubble{max-width:82%;padding:11px 13px;border-radius:15px;font-size:13.5px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere}.assistant .bubble{background:#fff;border:1px solid var(--line);border-bottom-left-radius:5px;box-shadow:0 5px 16px rgba(11,49,76,.06)}.user .bubble{background:var(--navy2);color:#fff;border-bottom-right-radius:5px}
      .suggestions{display:grid;gap:7px;margin:8px 0 15px 34px}.suggestion{text-align:left;border:1px solid #bcdce9;background:#fff;color:#155f83;border-radius:12px;padding:10px 11px;font-size:12.5px;font-weight:700;line-height:1.35}.suggestion:hover{background:var(--sky-light);border-color:var(--sky)}
      .typing{display:inline-flex;gap:4px;align-items:center;height:18px}.typing i{width:5px;height:5px;background:#6e8d9e;border-radius:50%;animation:blink 1.1s infinite}.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}@keyframes blink{0%,60%,100%{opacity:.28;transform:translateY(0)}30%{opacity:1;transform:translateY(-2px)}}
      .composer{border-top:1px solid var(--line);padding:11px;background:#fff}.input-wrap{display:flex;gap:8px;align-items:flex-end;border:1px solid #c9dce6;border-radius:14px;padding:8px 8px 8px 11px;transition:border .15s,box-shadow .15s}.input-wrap:focus-within{border-color:var(--sky);box-shadow:0 0 0 3px rgba(46,158,211,.11)}textarea{border:0;outline:0;resize:none;width:100%;min-height:38px;max-height:94px;padding:8px 0;background:transparent;color:var(--text);font-size:13.5px;line-height:1.45}textarea::placeholder{color:#8ca0ab}.send{border:0;background:var(--navy);color:#fff;border-radius:11px;width:39px;height:39px;display:grid;place-items:center;flex:none}.send:disabled{opacity:.35;cursor:not-allowed}.send svg{width:17px;height:17px}
      .meta{display:flex;justify-content:space-between;gap:8px;margin-top:7px;color:#80939d;font-size:10.5px}.meta a{color:#527b91}.notice{padding:8px 13px 10px;text-align:center;background:#f7fafb;color:#70858f;font-size:10.5px;border-top:1px solid #edf3f6}
      .mail-cta{display:inline-flex;align-items:center;gap:6px;margin-top:8px;color:#126d96;font-weight:700;text-decoration:underline;text-underline-offset:3px}
      .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      @media(max-width:600px){:host{right:13px;bottom:14px}.launcher{width:61px;height:61px}.launcher-label{display:none}.panel{position:fixed;inset:10px;width:auto;height:auto;border-radius:18px}.head{padding-top:max(14px,env(safe-area-inset-top))}.bubble{max-width:88%}.notice{padding-bottom:max(10px,env(safe-area-inset-bottom))}}
      @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
    </style>
    <button class="launcher" type="button" aria-label="Rain AI相談チャットを開く" aria-expanded="false">
      <span class="launcher-label">AIに相談する</span><span class="dot" aria-hidden="true"></span>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5h16v11H9l-5 4v-15Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <section class="panel" role="dialog" aria-modal="false" aria-label="Rain AI相談アシスタント">
      <header class="head">
        <div class="brand-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v10H9l-5 4V6Z" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/></svg></div>
        <div class="brand"><strong>Rain AI相談アシスタント</strong><span><i></i>AI回答・概算相談</span></div>
        <div class="head-actions">
          <button class="icon-btn reset" type="button" aria-label="会話をリセット" title="会話をリセット"><svg viewBox="0 0 24 24" fill="none"><path d="M5 8a8 8 0 1 1-1 7M5 8V3m0 5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="icon-btn close" type="button" aria-label="チャットを閉じる"><svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
        </div>
      </header>
      <div class="messages" aria-live="polite"></div>
      <div class="composer">
        <div class="input-wrap"><label class="sr" for="rain-chat-input">質問を入力</label><textarea id="rain-chat-input" maxlength="600" rows="1" placeholder="サービスや費用について質問してください"></textarea><button class="send" type="button" aria-label="送信" disabled><svg viewBox="0 0 24 24" fill="none"><path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 12h14" stroke="currentColor" stroke-width="1.8"/></svg></button></div>
        <div class="meta"><span><span class="count">0</span>/600文字</span><span>個人情報・パスワードは入力しないでください</span></div>
      </div>
      <div class="notice">会話はRain AIのDBには保存しません。回答生成のためOpenAI APIへ送信します。 <a href="/privacy.html">詳細</a></div>
    </section>`;

  const panel = shadow.querySelector(".panel");
  const launcher = shadow.querySelector(".launcher");
  const messagesEl = shadow.querySelector(".messages");
  const input = shadow.querySelector("textarea");
  const send = shadow.querySelector(".send");
  const count = shadow.querySelector(".count");
  const head = shadow.querySelector(".head");
  const state = { messages: [], busy: false, turns: 0 };
  const suggestions = [
    "自社でAIをどう使えるか相談する",
    "チャットボットの費用を見積もる",
    "チャットボットでの集客を体験する",
    "Rain AIのサービスについて質問する",
  ];

  function scrollEnd() { messagesEl.scrollTop = messagesEl.scrollHeight; }
  function displayText(role, text) {
    const value = String(text || "");
    if (role !== "assistant") return value;
    return value.replace(/\*\*/g, "").replace(/(^|\n)-\s+/g, "$1・");
  }
  function addMessage(role, text, extra = false) {
    const row = document.createElement("div");
    row.className = `message ${role}`;
    if (role === "assistant") {
      const avatar = document.createElement("span"); avatar.className = "avatar"; avatar.textContent = "RA"; row.append(avatar);
    }
    const bubble = document.createElement("div"); bubble.className = "bubble"; bubble.textContent = displayText(role, text); row.append(bubble);
    if (extra && role === "assistant") {
      const link = document.createElement("a"); link.className = "mail-cta"; link.href = "mailto:rainaiproject@gmail.com?subject=Rain%20AI%20Project%E3%81%B8%E3%81%AE%E7%84%A1%E6%96%99%E7%9B%B8%E8%AB%87"; link.textContent = "メールで無料相談する →"; bubble.append(document.createElement("br"), link);
    }
    messagesEl.append(row); scrollEnd(); return row;
  }
  function addSuggestions() {
    const box = document.createElement("div"); box.className = "suggestions";
    for (const label of suggestions) { const button = document.createElement("button"); button.type = "button"; button.className = "suggestion"; button.textContent = label; button.addEventListener("click", () => { box.remove(); submit(label); }); box.append(button); }
    messagesEl.append(box); scrollEnd();
  }
  function initial() {
    state.messages = []; state.turns = 0; messagesEl.replaceChildren();
    addMessage("assistant", "こんにちは。Rain AI Projectのサービス、AIチャットボットの参考費用、ホームページへの設置方法などをご案内します。\n\n何から確認しますか？"); addSuggestions();
  }
  function setOpen(open) {
    panel.classList.toggle("open", open); launcher.style.display = open ? "none" : "grid"; launcher.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("rain-chat-open", open); if (open) setTimeout(() => input.focus(), 50);
  }
  async function submit(forcedText) {
    const text = String(forcedText ?? input.value).trim();
    if (!text || state.busy) return;
    if (state.turns >= 15) { addMessage("assistant", "このブラウザでの相談回数の上限に達しました。続きは無料相談メールをご利用ください。", true); return; }
    input.value = ""; input.dispatchEvent(new Event("input")); addMessage("user", text); state.messages.push({ role: "user", content: text }); state.turns += 1; state.busy = true; send.disabled = true;
    const typing = addMessage("assistant", ""); typing.querySelector(".bubble").innerHTML = '<span class="typing" aria-label="回答を作成中"><i></i><i></i><i></i></span>';
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: state.messages }) });
      const data = await response.json().catch(() => ({}));
      typing.remove();
      if (!response.ok) { addMessage("assistant", data.error || "ただいま回答できません。少し時間を置いてお試しください。"); return; }
      state.messages.push({ role: "assistant", content: data.answer });
      const shouldOfferMail = /無料相談|正式見積|メール/.test(data.answer) || state.turns >= 5;
      addMessage("assistant", data.answer, shouldOfferMail);
    } catch { typing.remove(); addMessage("assistant", "通信できませんでした。ネットワークをご確認のうえ、もう一度お試しください。"); }
    finally { state.busy = false; send.disabled = !input.value.trim(); input.focus(); }
  }

  launcher.addEventListener("click", () => setOpen(true));
  shadow.querySelector(".close").addEventListener("click", () => setOpen(false));
  shadow.querySelector(".reset").addEventListener("click", initial);
  send.addEventListener("click", () => submit());
  input.addEventListener("input", () => { count.textContent = String(input.value.length); send.disabled = state.busy || !input.value.trim(); input.style.height = "auto"; input.style.height = `${Math.min(input.scrollHeight, 94)}px`; });
  input.addEventListener("keydown", (event) => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) { event.preventDefault(); submit(); } });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && panel.classList.contains("open")) setOpen(false); });

  let drag = null;
  head.addEventListener("pointerdown", (event) => { if (event.target.closest("button") || innerWidth <= 600) return; const rect = panel.getBoundingClientRect(); drag = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top }; head.setPointerCapture(event.pointerId); });
  head.addEventListener("pointermove", (event) => { if (!drag) return; const left = Math.max(8, Math.min(innerWidth - panel.offsetWidth - 8, drag.left + event.clientX - drag.x)); const top = Math.max(8, Math.min(innerHeight - panel.offsetHeight - 8, drag.top + event.clientY - drag.y)); panel.style.position = "fixed"; panel.style.left = `${left}px`; panel.style.top = `${top}px`; panel.style.right = "auto"; panel.style.bottom = "auto"; });
  head.addEventListener("pointerup", () => { drag = null; });
  initial();
})();
