# dog salon muku — 画像制作メモ

白・ミント・淡いブルーを使った架空のドッグサロンLP。生成手段は内蔵 image_gen（CLI/APIフォールバックは未使用）。公開用画像はJPEGへ書き出して軽量化し、以下に保存しています。

- `assets/lp-samples/dog-salon/hero.jpg` — やさしい女性トリマーと白い犬
- `assets/lp-samples/dog-salon/care.jpg` — シャンプーの施術イメージ
- `assets/lp-samples/dog-salon/finish.jpg` — 仕上がりイメージ

店舗・人物・サービス・料金はサンプルであり、実際の店舗やスタッフを表しません。

## 仕上がり写真の生成プロンプト

Use case: photorealistic-natural. Asset type: wide hero photograph for a refined Japanese dog grooming salon website. Create an authentic, exquisite editorial lifestyle photograph, landscape 3:2. A freshly groomed small white bichon frise with fluffy round natural fur, dark expressive eyes, a tiny pink tongue, happily and calmly sitting on a pale clean mint grooming table. The dog occupies the center-right, full seated body comfortably in frame, looking towards camera. Behind it a sunlit minimalist spotless white Japanese grooming salon, softly blurred warm oak furniture, pale aqua glass, fluffy folded white towels, a small out-of-focus green plant. Soft morning daylight from a tall window, airy fresh immaculate atmosphere, natural whites not overexposed, sophisticated subtle seafoam and powder blue accents, realistic fur detail, natural lens and shadows. No people, no collars, no leash, no shears, no text, no letters, no logos, no watermark, no graphics. This is a single photograph, never a website screenshot or a collage.

## メイン写真の編集プロンプト

上記の仕上がり写真を参照画像として使用。

Edit this photograph for a clean and refreshing Japanese dog salon website hero. Preserve the beautiful fluffy white bichon frise, bright immaculate salon, white towels, pale aqua glass, soft oak, airy daylight and realistic photographic style. Add a kind-looking Japanese adult female groomer, around her thirties, with a natural warm gentle smile, tied-back dark brown hair, minimal natural makeup, a white short-sleeved shirt and a muted pale sage apron. Show her face clearly and completely. She is beside and just behind the dog, crouching slightly to be close to its height, one hand gently reassuring it on the shoulder, looking lovingly at the dog. Relaxed, caring, welcoming and professional. The dog and woman together must occupy the central 60 percent of the image horizontally, so a portrait crop still shows both faces completely. Leave comfortable headroom and side space, no face cropped. No other people, no tools near the dog, no text, no logos, no watermark. Keep a natural editorial lifestyle photograph, not a composite-looking advertisement. Landscape 3:2.

## シャンプー写真の生成プロンプト

Use case: photorealistic-natural. Asset type: supporting editorial photograph for a premium, fresh and clean Japanese dog grooming salon website. Landscape 3:2 composition. A small cream toy poodle calmly enjoying a gentle shampoo in an immaculate white ceramic grooming basin. Tasteful tight medium shot at the dog's eye level. A professional groomer's forearms and hands gently supporting the dog and washing its fur, white short sleeves visible, face out of frame. A little rich white foam on the body, dog's face clean, relaxed natural expression and soft curious dark eyes looking at camera. Pale aqua small square tiles and daylight in the background, neatly folded white towels. Bright soft natural light, nuanced shadows, white, pale seafoam and warm cream palette, authentic photographic fur and water texture. Calm, tender and hygienic, premium Japanese lifestyle magazine photography. Correct animal anatomy, no exaggerated bubbles, no distress, no restraints, no text, no logos, no watermark. Single photograph, not collage or website.
