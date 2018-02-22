$(function(){
  alert(123);
  // ストレージの取得雛形
  // chrome.storage.local.get('hoge', function(items) {
  //   console.log(items);
  // });

  // ストレージ登録雛形
  // chrome.storage.local.set({ 'hoge': 'hoge' });

  // https://www.google.co.jp/search?tbm=isch&q=LGTM+%E3%82%A2%E3%83%8B%E3%83%A1&spell=1&sa=X

  $(document).on('click', '.image', function() {
    copyToClipboard($(this).text());
  });
});

function copyToClipboard(text) {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};
