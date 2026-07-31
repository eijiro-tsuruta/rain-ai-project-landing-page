const MANUAL_VERSION = "Rain Field MVP 取扱説明書 2026年7月版（発行: 2026年7月29日）";

const RAIN_FIELD_KNOWLEDGE = [
  {
    id: "official-storage-sharing-policy",
    title: "クラウド保存・同期・利用者による共有",
    chapter: "Rain Field公式運用方針",
    pages: [],
    keywords: ["クラウド", "同期", "共有", "Google Drive", "グーグルドライブ", "共有ドライブ", "サイトデータ", "バックアップ", "別のPC", "別パソコン"],
    content: [
      "現在、Rain Fieldのデータをクラウドへ保存・同期する予定はありません。",
      "Rain Fieldのデータは利用中のブラウザ内に保存されます。ブラウザのサイトデータを削除すると、Rain Field内のデータは消失します。",
      "利用者は、日常業務で使うパソコン・ブラウザ・ブラウザプロファイルを決め、自身でデータを管理してください。",
      "他の人と共有したい場合は、Rain Fieldから必要な書類やデータを保存・出力し、利用者自身が用意・設定したGoogle Driveなどへアップロードしてください。",
      "Google Driveのアカウント、保存先フォルダ、共有ドライブなどの準備・設定・管理は、すべて利用者側で行います。Rain Field側では用意・提供・設定・管理しません。",
      "Rain FieldとGoogle Driveの自動連携や自動同期ではありません。",
    ].join("\n"),
  },
  {
    id: "getting-started-and-storage",
    title: "最初に読む注意事項とブラウザ保存",
    chapter: "最初にお読みください",
    pages: [2],
    keywords: ["ブラウザ保存", "保存場所", "別ブラウザ", "シークレット", "別プロファイル", "データ削除", "PDF保存", "印刷", "AI生成", "写真画像"],
    content: [
      "案件・材料・見積・写真などのデータは、利用中のブラウザ内に保存されます。別のパソコン、別のブラウザ、シークレットウィンドウとは共有されません。",
      "同じパソコン・同じブラウザ・同じブラウザプロファイルを使用してください。",
      "見積書・発注書・請求書は「PDF保存・印刷」から、ブラウザの印刷機能を使ってPDF化できます。",
      "AIや自動生成の結果は必ず担当者が確認し、現場の事実と異なる場合は修正してください。近隣挨拶文、工事仕様書、請求書メール下書き、工程表の一部はMVPではサンプル生成・定型配分を含みます。",
      "AI報告書では写真カテゴリ・写真メモ・現場メモを参照します。現在の実装では写真画像そのものはAIへ送信されません。",
    ].join("\n"),
  },
  {
    id: "overview-and-workflow",
    title: "Rain Fieldでできることと基本的な流れ",
    chapter: "第1〜3章",
    pages: [5, 6, 7, 8],
    keywords: ["できること", "機能", "基本の流れ", "案件管理", "材料管理", "見積", "発注", "請求", "売上", "利益", "関連書類", "使い方"],
    content: [
      "Rain Fieldは、塗装業を含む工務店・施工業者向けに、案件、材料・仕入、見積単価、見積書、発注書、関連書類、請求書、売上・利益を一つの流れで管理するMVPです。",
      "基本の流れは、材料と仕入条件の登録、施工可能数量・ロス率の設定、見積単価の作成、案件登録、見積書作成、発注数量の自動計算、仕入先別発注書、請求書、月次売上・利益の確認です。",
      "発注書へ引き継がれるのは、材料・仕入一覧から作成した見積単価を使った項目です。自由入力項目や材料との関連付けがない工数・諸経費は発注対象になりません。",
    ].join("\n"),
  },
  {
    id: "project-registration",
    title: "新規案件を登録する",
    chapter: "第4章",
    pages: [9],
    keywords: ["案件登録", "案件の登録", "登録方法", "新規案件", "新規案件を登録", "顧客名", "現場住所", "調査日", "担当者", "建物種別", "登録する"],
    content: [
      "新規案件は次の手順で登録します。",
      "1. 上部メニューの「案件一覧」を開きます。",
      "2. 画面右上の「＋ 新規案件」を押します。",
      "3. 顧客名と現場住所を入力します。この2項目は必須です。",
      "4. 必要に応じて、調査日、担当者、建物種別を入力します。",
      "5. 「登録する」を押します。登録後、案件詳細が開きます。",
    ].join("\n"),
  },
  {
    id: "project-search-and-status",
    title: "案件を検索してステータスを変更する",
    chapter: "第4章",
    pages: [9],
    keywords: ["案件検索", "案件を探す", "顧客名検索", "住所検索", "ステータス", "ステータス変更", "現調", "提案中", "見積提出", "受注", "失注", "完了"],
    content: [
      "顧客名または住所の一部で検索でき、現調・提案中・見積提出・受注・失注・完了のステータスで絞り込めます。",
      "案件名を押すと案件詳細が開きます。案件詳細の「ステータス変更」から現在の状態を選ぶと、案件一覧上部の件数と案件行のステータス表示に反映されます。",
    ].join("\n"),
  },
  {
    id: "project-deletion",
    title: "案件を削除する",
    chapter: "第4章",
    pages: [9, 10],
    keywords: ["案件削除", "案件を削除", "削除取消", "写真削除", "関連書類削除", "取り消せない"],
    content: [
      "案件削除は取り消せません。案件を削除すると、その案件の写真、現場メモ、報告書、見積書、発注書、工程表、請求書、メール下書きも削除されます。",
    ].join("\n"),
  },
  {
    id: "materials",
    title: "材料・仕入一覧の登録",
    chapter: "第5章",
    pages: [10, 11],
    keywords: ["材料", "仕入一覧", "仕入先", "商品コード", "仕入単位", "仕入単価", "最低発注数", "注文単位", "見積単位", "施工可能数量", "材料の使用量", "ロス率", "重複"],
    content: [
      "材料・仕入一覧には、商品名、仕入先、商品コード、仕様、仕入単位、仕入単価、最低発注数、注文できる数量単位、見積単位、1仕入単位で施工できる数量、ロス率を登録します。",
      "同じ材料でも仕入先が異なる場合は、仕入先ごとに別の商品として登録します。",
      "同じ仕入先・同じ仕入先商品コードの商品は手入力で重複登録できません。既存商品を検索して編集してください。",
    ].join("\n"),
  },
  {
    id: "material-import",
    title: "Excel・CSVからの材料一括取り込み",
    chapter: "第6章",
    pages: [12, 13],
    keywords: ["Excel", "エクセル", "xlsx", "CSV", "Shift-JIS", "UTF-8", "50MB", "5000行", "一括取込", "列対応", "見出し行"],
    content: [
      "対応形式は.xlsxと.csvです。CSVはUTF-8とShift-JISに対応します。ファイルサイズは50MBまで、一度に登録できるデータは5,000行までです。",
      "見出し行を確認し、各列を品目名・仕入単価・仕入先などへ対応付け、プレビュー後に登録します。",
      "一括取り込みでは、見積単位、1仕入単位で施工できる数量、ロス率は取り込みません。発注計算に使う材料は、登録後に編集画面で補ってください。",
    ].join("\n"),
  },
  {
    id: "material-search-and-price-history",
    title: "商品の検索・編集・仕入価格履歴",
    chapter: "第7章",
    pages: [13, 14],
    keywords: ["商品検索", "価格履歴", "価格適用日", "仕入価格", "仕入価格変更", "仕入単価変更", "見積単価更新", "自動更新"],
    content: [
      "商品名、社内商品コード、メーカー、メーカー品番、仕入先、仕入先商品コード、JAN・バーコード、仕様の一部から検索できます。",
      "仕入単価と価格適用日を編集すると、価格履歴で変更前後の価格と適用日を確認できます。",
      "材料の仕入単価を変更しても、登録済みの見積単価や保存済みの見積書は自動更新されません。必要に応じて見積単価マスタを編集してください。",
    ].join("\n"),
  },
  {
    id: "estimate-price-master",
    title: "見積単価マスタと掛け率",
    chapter: "第8章",
    pages: [15, 16],
    keywords: ["見積単価マスタ", "掛け率", "材料原価", "見積価格", "顧客向け単価", "切り上げ", "原価計算"],
    content: [
      "材料から見積単価を作る場合は、材料を選び、仕入単価、施工可能数量、ロス率、1見積単位あたりの材料原価を確認し、掛け率を入力して登録します。",
      "見積単価＝1見積単位あたりの材料原価×（1＋掛け率÷100）です。見積単価は1円単位で切り上げて登録されます。",
      "材料原価は、仕入単価を施工可能数量で割り、ロス率を加えて計算します。",
      "仕入価格と顧客向けの見積価格は別に管理します。",
    ].join("\n"),
  },
  {
    id: "labor-costs",
    title: "工数・施工費・外注費の登録",
    chapter: "第9章",
    pages: [16],
    keywords: ["工数", "施工費", "外注費", "運搬費", "諸経費", "時間単価", "30分", "0.5時間", "人工"],
    content: [
      "材料を仕入れない工数、施工費、外注費、運搬費、諸経費などは「見積単価を直接入力」から登録します。",
      "工数（時間単価）は見積書の数量を0.5時間刻みで入力します。30分は0.5、1時間30分は1.5、7時間30分は7.5です。",
    ].join("\n"),
  },
  {
    id: "estimates",
    title: "見積書・AI見積候補・自由入力",
    chapter: "第10章",
    pages: [17, 18],
    keywords: ["見積書作成", "見積保存", "AI見積", "見積項目提案", "自由入力", "マスタにない項目", "発注に出ない", "発注対象"],
    content: [
      "案件詳細から見積書を開き、単価マスタの項目を追加して数量を入力し、合計を確認して保存します。「PDF保存・印刷」から出力できます。",
      "AI見積項目提案は、現場メモ、写真メモ、AI報告書を参考に、見積単価マスタから候補を追加します。AIは単価を変更しません。担当者が数量と不要項目を確認してください。",
      "自由入力項目は材料・仕入一覧との関連付けがないため、発注書の自動計算には引き継がれません。",
    ].join("\n"),
  },
  {
    id: "automatic-order-quantity",
    title: "発注数量の自動計算",
    chapter: "第11章",
    pages: [19, 20],
    keywords: ["発注数量", "必要量", "発注数", "自動計算", "計算式", "切り上げ", "最低発注数", "注文単位", "ロス率", "0になる", "ゼロ"],
    content: [
      "必要量＝見積数量÷1仕入単位で施工できる数量×（1＋ロス率÷100）です。",
      "発注数は、必要量を下回らないよう、最低発注数と注文できる数量単位に合わせて切り上げます。",
      "例1: 185㎡、1缶で100㎡、ロス率5%、最低1缶・1缶単位なら、必要量1.943缶、発注数2缶です。",
      "例2: 185㎡、1缶で60㎡、ロス率8%、最低2缶・2缶単位なら、必要量3.33缶、発注数4缶です。",
      "見積数量または施工可能数量が未入力・0の場合、必要量と発注数を計算できません。",
    ].join("\n"),
  },
  {
    id: "purchase-orders",
    title: "仕入先別の発注書",
    chapter: "第12章",
    pages: [20, 21],
    keywords: ["発注書", "見積書から取り込む", "再取込", "再取り込み", "仕入先別", "発注日", "備考", "仕入先未設定", "印刷できない"],
    content: [
      "案件詳細の発注書で「見積書から取り込む」を押し、材料の必要量と発注数を確認します。仕入先ごとに発注日・備考・合計を確認し、保存・印刷します。",
      "見積項目や数量を変更した後は「見積書から再取込む」で再計算します。同じ仕入先なら、入力済みの発注日と備考は引き継がれます。",
      "仕入先未設定の材料がある状態では発注書を保存・印刷できません。材料・仕入一覧で仕入先を登録して再取り込みしてください。",
    ].join("\n"),
  },
  {
    id: "photos-reports-documents",
    title: "写真・AI報告書・関連書類",
    chapter: "第13章",
    pages: [22],
    keywords: ["写真", "写真メモ", "写真カテゴリ", "現場メモ", "AI報告書", "画像解析", "画像送信", "近隣挨拶文", "工事仕様書", "工程表", "請求書メール", "保存容量", "20枚"],
    content: [
      "写真はカテゴリを選んで追加し、写真ごとにメモを入力します。1案件20枚を目安とし、ブラウザ保存用に軽量化されます。",
      "AI報告書は写真カテゴリ・写真メモ・現場メモから文章を生成します。写真画像そのものはAIへ送信されません。再生成すると前回内容を上書きします。",
      "近隣挨拶文はMVPでサンプル生成を含み、工程表は定番工程の定型配分を含みます。工事仕様書や請求書メールも、使用・送信前に担当者が確認してください。",
      "ブラウザの保存容量がいっぱいになった場合は不要な写真を削除してください。",
    ].join("\n"),
  },
  {
    id: "invoices-sales-profit",
    title: "請求書と売上・利益管理",
    chapter: "第14章",
    pages: [23, 24],
    keywords: ["請求書", "請求日", "支払期限", "振込先", "消費税", "月次売上", "経費", "原価", "利益", "売上集計"],
    content: [
      "案件詳細の請求書で見積書から明細を取り込み、請求日、支払期限、振込先、備考を入力します。税抜小計・消費税・税込合計を確認して保存・出力します。",
      "売上・利益管理では、その月に作成した請求書の税抜小計を売上として集計します。経費は手入力し、売上から経費を差し引いた利益を表示します。",
    ].join("\n"),
  },
  {
    id: "errors",
    title: "よくあるエラーと対処",
    chapter: "第15章",
    pages: [25],
    keywords: ["エラー", "必須", "商品重複", "非対応ファイル", "50MB", "列対応", "材料の使用量", "単価マスタ未登録", "発注対象なし", "仕入先未設定", "AI設定", "生成上限", "保存容量", "案件が表示されない"],
    content: [
      "案件の必須項目は顧客名と現場住所、材料の必須項目は商品名と仕入単価です。",
      "発注対象の材料がない場合は、材料から作った見積単価を使用し、見積数量を入力してください。",
      "AI生成の設定未完了は管理者へ確認し、生成回数上限は約10分待って再実行します。",
      "案件が表示されない場合は、登録時と同じパソコン、ブラウザ、通常・シークレットの別、ブラウザプロファイル、サイトデータ削除の有無を確認します。",
    ].join("\n"),
  },
  {
    id: "glossary-and-checklist",
    title: "用語集と初回設定チェックリスト",
    chapter: "第16〜17章",
    pages: [26, 27],
    keywords: ["用語", "初回設定", "チェックリスト", "仕入単位", "見積単位", "施工可能数量", "材料の使用量", "ロス率", "最低発注数", "注文単位", "掛け率", "価格適用日", "再取り込み", "運用開始"],
    content: [
      "初回設定では、使用するパソコンとブラウザ、仕入先別の材料、仕入条件、施工可能数量とロス率、材料から作る見積単価、工数・施工費、テスト案件の見積から発注まで、請求書の振込先を確認します。",
      "運用開始前に、実際の材料で計算した発注数が仕入先の注文条件と一致するか確認してください。",
      "材料の使用量は1仕入単位で施工できる数量、注文できる数量単位は注文数量の刻み、再取り込みは見積変更後に材料必要量と仕入先別発注書を再計算する操作です。",
    ].join("\n"),
  },
];

const EXPLICIT_MARKERS = ["rain field", "rainfield", "レインフィールド"];
const OPERATION_MARKERS = [
  "案件", "材料・仕入", "仕入一覧", "見積単価マスタ", "見積書", "発注", "発注書", "発注数量", "仕入先",
  "施工可能数量", "材料の使用量", "ロス率", "現場メモ", "写真メモ", "ai報告書",
  "写真画像", "画像をai", "見積書から", "仕入価格", "価格履歴", "最低発注数", "注文単位",
  "サイトデータ", "別ブラウザ", "別プロファイル", "クラウド", "同期", "excel", "csv",
  "施工", "ロス",
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

export function isRainFieldQuery(messages) {
  const users = userMessages(messages);
  const current = users.at(-1) || "";
  if (includesMarker(current, EXPLICIT_MARKERS) || includesMarker(current, OPERATION_MARKERS)) return true;

  const recentContext = (Array.isArray(messages) ? messages : []).slice(-6, -1)
    .map((message) => String(message?.content || ""))
    .join(" ");
  return current.length <= 120 && includesMarker(recentContext, [...EXPLICIT_MARKERS, ...OPERATION_MARKERS]);
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

function citationLabel(chunk) {
  if (!chunk.pages.length) return chunk.chapter;
  const pages = chunk.pages.length === 1 ? `${chunk.pages[0]}ページ` : `${chunk.pages[0]}〜${chunk.pages.at(-1)}ページ`;
  return `${chunk.chapter}・${pages}`;
}

export function retrieveRainFieldKnowledge(messages, limit = 4) {
  if (!isRainFieldQuery(messages)) return [];

  const users = userMessages(messages);
  const current = users.at(-1) || "";
  const previous = users.at(-2) || "";
  const query = `${previous} ${current} ${current}`;

  return RAIN_FIELD_KNOWLEDGE
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, query) }))
    .filter((chunk) => chunk.score >= 2.5)
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(1, limit));
}

export function buildRainFieldContext(messages, limit = 4) {
  const matches = retrieveRainFieldKnowledge(messages, limit);
  if (!matches.length) return "";

  const sections = matches.map((chunk) => [
    `### ${chunk.title}`,
    `出典: ${citationLabel(chunk)}`,
    chunk.content,
  ].join("\n"));

  return [
    `## 今回の質問に関連するRain Field知識`,
    `資料: ${MANUAL_VERSION}`,
    ...sections,
  ].join("\n\n");
}

export { MANUAL_VERSION };
