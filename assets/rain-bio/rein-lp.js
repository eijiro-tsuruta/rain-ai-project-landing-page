const examples = {
  daily: ['今日、初めてボールを持ってきてくれた！', '初めて持ってきてくれたんですね！ボールをくわえて戻ってくる姿、うれしくなりますね。どんな顔をしていましたか？'],
  food: ['ドッグフードの袋、どこから読めばいい？', '表示がたくさんあって迷いますよね。まずは、今いちばん気になっているところを教えてください。原材料や表示の写真を送ってもらっても、一緒に見ていけます。'],
  care: ['雨でお散歩に行けない。おうちで何しよう？', '雨の日も、うちの子と楽しく過ごしたいですね。ふだんはどんな遊びが好きですか？ボール遊びやにおい探しなど、好みに合わせて一緒に考えましょう。'],
};
for (const button of document.querySelectorAll('[data-example]')) {
  button.addEventListener('click', () => {
    const example = examples[button.dataset.example];
    if (!example) return;
    document.getElementById('example-owner').textContent = example[0];
    document.getElementById('example-rain').textContent = example[1];
    for (const option of document.querySelectorAll('[data-example]')) {
      const active = option === button;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-pressed', String(active));
    }
  });
}
for (const link of document.querySelectorAll('[data-line-position]')) {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'rein_line_click', link_position: link.dataset.linePosition, page_path: '/products/rain-bio' });
  });
}
