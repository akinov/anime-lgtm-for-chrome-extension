$(function(){
  // ストレージの取得雛形
  chrome.storage.local.get('hoge', function(items) {
    console.log(items);
  });

  // ストレージ登録雛形
  chrome.storage.local.set({ 'hoge': 'hoge' });
});
