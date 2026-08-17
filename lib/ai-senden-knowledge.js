const AI_SENDEN_GUIDE_VERSION = "AI宣伝しとけ 取扱説明書 2026年8月版";

const AI_SENDEN_KNOWLEDGE = [
  {
    id: "official-links",
    title: "公式ページ・取扱説明書・利用規約のURL",
    source: "AI宣伝しとけ公式ページ",
    keywords: ["URL", "リンク", "取説", "取扱説明書", "マニュアル", "Web取扱説明書", "PDF", "製品LP", "紹介ページ", "利用規約", "アプリ", "新規登録", "どこで見られる", "開きたい"],
    content: [
      "AI宣伝しとけの製品LP: https://www.rainaiproject.com/products/ai-senden",
      "Web取扱説明書: https://www.rainaiproject.com/products/ai-senden-guide",
      "PDF取扱説明書: https://www.rainaiproject.com/output/pdf/ai-senden-user-guide.pdf",
      "利用規約: https://www.rainaiproject.com/terms.html",
      "アプリ: https://ai-senden.rainaiproject.com/",
      "新規登録: https://ai-senden.rainaiproject.com/register",
      "URLを尋ねられた場合は、該当するURLを省略せず、そのまま案内します。",
    ].join("\n"),
  },
  {
    id: "overview-and-access",
    title: "サービス概要・利用開始・必要条件",
    source: "製品LP・取扱説明書 01 準備",
    keywords: ["何ができる", "どんなアプリ", "使い始める", "URL", "アクセス", "登録", "必要条件", "プロアカウント", "個人用アカウント", "ビジネス", "クリエイター"],
    content: [
      "AI宣伝しとけは、写真を撮る、または保存済み写真を選ぶと、AIがInstagram向けの投稿文とハッシュタグを生成し、利用者が確認・編集してInstagramへ公開できるサービスです。",
      "製品LPは https://www.rainaiproject.com/products/ai-senden 、Web取扱説明書は https://www.rainaiproject.com/products/ai-senden-guide 、PDF取扱説明書は https://www.rainaiproject.com/output/pdf/ai-senden-user-guide.pdf です。",
      "アプリは https://ai-senden.rainaiproject.com/ 、新規登録は https://ai-senden.rainaiproject.com/register です。利用規約は https://www.rainaiproject.com/terms.html です。",
      "利用にはInstagramのプロアカウント（ビジネスまたはクリエイター）が必要です。個人用アカウントはInstagramの設定から無料で切り替えます。",
      "事前にInstagramのユーザーネーム、Instagram側のログイン情報、連携先アカウント、安定した通信環境を確認します。",
    ].join("\n"),
  },
  {
    id: "free-trial-and-login",
    title: "7日間の無料体験と2種類のログイン",
    source: "取扱説明書 02 無料体験",
    keywords: ["無料体験", "7日", "カード不要", "クレジットカード", "10回", "新規登録", "名前", "メールアドレス", "パスワード", "Googleログイン", "ログイン情報", "ログインできない"],
    content: [
      "利用開始は7日間の無料体験からです。名前、メールアドレス、8文字以上のパスワードを登録します。開始時のクレジットカード登録は不要です。",
      "登録後はGoogle、または登録したメールアドレスとパスワードでAI宣伝しとけへログインします。",
      "ダッシュボードに「7日間の無料体験を開始しました」と表示されれば開始完了です。無料体験ではAI文章生成を10回まで利用できます。",
      "初回ログイン後は、Instagram連携より先にスマートフォンのホーム画面へ追加し、以後はホーム画面のアイコンから開く使い方を推奨します。",
      "AI宣伝しとけ本体へのログイン情報と、Instagram連携時に使うInstagram側のログイン情報は別です。",
    ].join("\n"),
  },
  {
    id: "pwa-home-screen",
    title: "スマートフォンのホーム画面へ追加する",
    source: "取扱説明書 03 ホーム画面に追加",
    keywords: ["PWA", "ホーム画面", "アプリのように", "App Store", "インストール", "Chrome", "Safari", "共有ボタン", "アイコン", "追加"],
    content: [
      "AI宣伝しとけはPWAとしてホーム画面へ追加でき、App Storeからのインストールは不要です。初回ログイン後、Instagram連携より先にホーム画面へ追加する使い方を推奨します。",
      "ChromeではAI宣伝しとけを開き、右上の共有ボタンから「ホーム画面に追加」を選びます。アイコンが表示されれば完了です。",
      "Safariでは、AI宣伝しとけを開き、共有ボタンから「ホーム画面に追加」→「追加」と進みます。iOSのバージョンにより位置が異なり、見つからない場合は共有メニューを下へスクロールします。",
    ].join("\n"),
  },
  {
    id: "instagram-connection",
    title: "Instagram・Meta連携",
    source: "取扱説明書 04 Instagram連携",
    keywords: ["Instagramと連携", "Meta", "許可", "連携済み", "ユーザーネーム", "別アカウント", "アカウントを切り替える", "Instagramアプリでログイン", "何の情報", "ログイン情報"],
    content: [
      "1. AI宣伝しとけへログインし、「Instagramと連携」を押します。",
      "2. ブラウザで開くMetaのWeb画面で許可します。Instagramアプリでログイン済みでも、この操作が必要です。",
      "3. Meta画面へ入力するのはAI宣伝しとけの情報ではなく、連携したいInstagram側のログイン情報です。",
      "4. 別のInstagramアカウントを使う場合は、Meta画面右上の「…」から「アカウントを切り替える」を選びます。",
      "5. AI宣伝しとけへ戻り、正しいユーザーネームと「連携済み」が表示されれば完了です。",
    ].join("\n"),
  },
  {
    id: "instagram-reauthorization",
    title: "55日目のInstagram再認証",
    source: "取扱説明書 04 Instagram連携・09 よくある質問",
    keywords: ["55日", "60日", "認証期限", "再認証", "再連携", "連携が切れた", "Instagramと連携が再び", "ログアウト", "期限切れ"],
    content: [
      "MetaのInstagram連携には60日間の認証期限があります。期限切れによる投稿エラーを防ぐため、AI宣伝しとけでは連携から55日目にInstagram連携だけを一度ログアウト状態にします。",
      "AI宣伝しとけ本体からログアウトされるわけではありません。AI宣伝しとけへログインしたまま「Instagramと連携」を押し、Meta画面で同じInstagramアカウントを再度許可します。",
    ].join("\n"),
  },
  {
    id: "pricing-and-payment",
    title: "料金・投稿上限・支払い方法",
    source: "製品LP・取扱説明書 05 支払い",
    keywords: ["料金", "価格", "月額", "ライトプラン", "投稿上限", "月10回", "支払い", "カード", "Apple Pay", "Google Pay", "Link", "継続利用", "残り無料日数"],
    content: [
      "無料体験後に継続する場合は、契約画面からライトプランを申し込みます。ライトプランは月額1,000円で、Instagram投稿は月10回までです。",
      "支払いはStripeの画面で行います。カードのほか、画面に表示される場合はApple Pay、Google Pay、Linkを利用できます。",
      "Linkは、過去にLinkを利用した人が保存済みの支払い情報で決済する仕組みです。使わない場合は「カード」を選びます。",
      "取扱説明書にはスタンダードプランの注意書きがありますが、料金・投稿上限・申込方法は記載されていません。記載のないプラン内容は推測せず、確認が必要です。",
    ].join("\n"),
  },
  {
    id: "cancellation-and-deletion",
    title: "解約・解約完了の確認・データ削除",
    source: "取扱説明書 06 解約",
    keywords: ["解約", "キャンセル", "サブスクをキャンセル", "サブスクを続ける", "終了日", "解約予約", "契約内容", "データ削除", "アカウント削除"],
    content: [
      "1. ダッシュボードの「契約内容の確認・解約」から「契約内容の確認・変更・解約」を押します。",
      "2. Stripeで「サブスクをキャンセル」を押し、理由を選んで「キャンセルを続ける」へ進みます。",
      "3. 終了日を確認し、青い「サブスクリプションをキャンセル」を押します。",
      "「サブスクをキャンセル」が「サブスクを続ける」に変わり、終了日が表示されれば解約予約は完了です。「サブスクを続ける」は解約を取り消すボタンです。",
      "解約後も表示された契約終了日までは利用できます。無料体験中に解約予約した場合も終了日までは利用できます。",
      "アカウントのデータ削除はサブスクリプション解約とは別です。先に月額プランを解約してからデータ削除画面へ進みます。",
    ].join("\n"),
  },
  {
    id: "create-and-publish-post",
    title: "写真から投稿文を作りInstagramへ公開する",
    source: "製品LP・取扱説明書 07 使い方",
    keywords: ["新しい投稿", "投稿する手順", "写真から投稿", "業種", "写真を追加", "カメラ", "最大5枚", "1枚目", "表紙", "投稿の種類", "本日のおすすめ", "新メニュー", "お知らせ", "補足", "写真から投稿文を作る", "ハッシュタグ", "文章を修正", "Instagramへ公開する", "公開ボタン"],
    content: [
      "1. 「新しい投稿をつくる」を開き、連携先Instagramが正しいか確認します。初回だけ自分の仕事に近い業種を選びます。業種は後から変更できます。",
      "2. 「写真を追加」からその場で撮影するか、端末の写真を選びます。最大5枚まで追加でき、1枚目が表紙になり、AIが1枚目の内容を読み取ります。",
      "3. 「本日のおすすめ」「新メニュー」「お知らせ」など投稿の種類を選び、必要なら補足を一言入力します。",
      "4. 「写真から投稿文を作る」を押すと、AIが投稿文とハッシュタグを生成します。生成後の文章は自由に修正できます。",
      "5. 写真、文章、ハッシュタグ、投稿先を確認し、「Instagramへ公開する」を押します。このボタンは実際の投稿操作です。1回だけ押して完了まで待ちます。",
    ].join("\n"),
  },
  {
    id: "processing-and-posting-safety",
    title: "処理中の注意・重複投稿・スパム制限",
    source: "取扱説明書 07 使い方・08 処理中の注意・09 よくある質問",
    keywords: ["遅い", "時間がかかる", "処理中", "連打", "反応しない", "ページを閉じる", "再読み込み", "重複投稿", "連続投稿", "スパム", "制限", "同じ写真", "同じ文章", "同じハッシュタグ"],
    content: [
      "AI文章生成中やInstagram公開中は、同じボタンを続けて押さず、そのまま待ちます。ページを戻る、閉じる、再読み込みする操作は避けます。",
      "Instagram公開の完了前に同じ内容をInstagramから手動投稿すると、重複する可能性があります。",
      "短時間の連続投稿や、同じ写真・文章・ハッシュタグの繰り返しは避けます。Instagram側でスパムと判断され、投稿やアカウント機能が一時的に制限される可能性があります。",
    ].join("\n"),
  },
  {
    id: "terms-and-content-responsibility",
    title: "投稿権限・禁止事項・AI生成内容の確認",
    source: "AI宣伝しとけ利用規約 04・05・08",
    keywords: ["利用規約", "投稿権限", "著作権", "肖像権", "禁止事項", "正確性", "有用性", "保証", "AI生成", "作った文章", "生成した文章", "確認せず公開", "公開してよい", "責任", "Graph API"],
    content: [
      "利用者はInstagram Graph APIを通じて自己のInstagramアカウントを連携し、そのアカウントへの投稿権限を持つ必要があります。",
      "法令や公序良俗への違反、第三者の知的財産権・肖像権・プライバシー権などを侵害する投稿は禁止されています。",
      "AIが生成した投稿文やハッシュタグの正確性・有用性は保証されません。公開前に利用者が内容、写真、投稿先、権利関係を確認します。",
      "Instagram側の規約・ポリシー変更により、サービスの一部または全部が利用できなくなる場合があります。",
    ].join("\n"),
  },
];

const EXPLICIT_MARKERS = [
  "ai宣伝しとけ", "ai 宣伝しとけ", "宣伝しとけ", "ai-senden", "ai-senden.rainaiproject.com",
];
const OPERATION_MARKERS = [
  "instagramと連携", "instagramへ公開する", "写真から投稿文を作る", "metaの画面", "metaのweb画面",
  "サブスクを続ける", "サブスクをキャンセル", "連携済み", "55日目", "60日間の認証期限",
  "ai文章生成を10回", "7日間の無料体験", "instagramのプロアカウント", "連続投稿", "同じ内容を連続",
];

function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}%]+/gu, "");
}

function includesMarker(text, markers) {
  const normalized = normalize(text);
  return markers.some((marker) => normalized.includes(normalize(marker)));
}

function userMessages(messages) {
  return (Array.isArray(messages) ? messages : [])
    .filter((message) => message?.role === "user")
    .map((message) => String(message.content || "").trim())
    .filter(Boolean);
}

export function isAiSendenQuery(messages) {
  const users = userMessages(messages);
  const current = users.at(-1) || "";
  if (includesMarker(current, [...EXPLICIT_MARKERS, ...OPERATION_MARKERS])) return true;

  const recentContext = (Array.isArray(messages) ? messages : []).slice(-6, -1)
    .map((message) => String(message?.content || ""))
    .join(" ");
  return current.length <= 160 && includesMarker(recentContext, [...EXPLICIT_MARKERS, ...OPERATION_MARKERS]);
}

function ngrams(value, size = 2) {
  const normalized = normalize(value);
  const result = new Set();
  for (let index = 0; index <= normalized.length - size; index += 1) {
    result.add(normalized.slice(index, index + size));
  }
  return result;
}

function scoreChunk(chunk, query) {
  const normalizedQuery = normalize(query);
  let score = 0;

  for (const keyword of chunk.keywords) {
    const normalizedKeyword = normalize(keyword);
    if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) {
      score += 3 + Math.min(5, normalizedKeyword.length / 2);
    }
  }

  const queryGrams = ngrams(query);
  const chunkGrams = ngrams(`${chunk.title} ${chunk.keywords.join(" ")} ${chunk.content}`);
  if (queryGrams.size) {
    let matches = 0;
    for (const gram of queryGrams) if (chunkGrams.has(gram)) matches += 1;
    score += (matches / queryGrams.size) * 8;
  }

  return score;
}

export function retrieveAiSendenKnowledge(messages, limit = 4) {
  if (!isAiSendenQuery(messages)) return [];

  const users = userMessages(messages);
  const current = users.at(-1) || "";
  const previous = users.at(-2) || "";
  const query = `${previous} ${current} ${current}`;

  return AI_SENDEN_KNOWLEDGE
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, query) }))
    .filter((chunk) => chunk.score >= 2.5)
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(1, limit));
}

export function buildAiSendenContext(messages, limit = 4) {
  const matches = retrieveAiSendenKnowledge(messages, limit);
  if (!matches.length) return "";

  const sections = matches.map((chunk) => [
    `### ${chunk.title}`,
    `出典: ${chunk.source}`,
    chunk.content,
  ].join("\n"));

  return [
    "## 今回の質問に関連するAI宣伝しとけ知識",
    `資料: ${AI_SENDEN_GUIDE_VERSION}・製品LP・利用規約`,
    ...sections,
  ].join("\n\n");
}

export { AI_SENDEN_GUIDE_VERSION, AI_SENDEN_KNOWLEDGE };
