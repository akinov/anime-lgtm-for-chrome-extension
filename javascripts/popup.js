var imageUrls = [];
var imageAdded = false;

$(function(){
  // ストレージの取得
  chrome.storage.local.get(['imageUrls'], function(items) {
    if (items.imageUrls) {
      imageUrls = items.imageUrls;
      setImage();
    }
    loadImage();
  });


  $(document).on('click', '.image', function() {
    copyToClipboard('![LGTM](' + $(this).attr('src') + ')');
  });
});

function loadImage() {
  $.ajax({
    url: "https://anime-lgtm.herokuapp.com/lgtm_images",
    type: 'GET',
    dataType:'json'
  })
  .done(function(data){
    if (data) {
      data.forEach(function(val, index, ar) {
        if (!imageUrls.includes(val.url)) {
          imageUrls.push(val.url);
        }
      });
    }

    // ストレージ登録
    chrome.storage.local.set({ 'imageUrls': imageUrls });

    if (!imageAdded) {
      setImage();
    }
  });
}

function setImage() {
  imageAdded = true;
  [
    Math.floor(Math.random() * imageUrls.length),
    Math.floor(Math.random() * imageUrls.length),
    Math.floor(Math.random() * imageUrls.length)
  ].forEach(function(val, index, ar) {
    $image = $("<img />").attr('src', imageUrls[val]).addClass('image');
    $image.bind("load", function(){
      $('#loader').hide();
      $('#images').show();
    });
    $('#images').append($image);
  });
}

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
