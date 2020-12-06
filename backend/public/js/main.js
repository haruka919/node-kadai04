$(function(){
  $('.favorite').on('click', function(){
    const articleId = $(this).data("articleId");
    const $this = $(this);
    $.ajax({
      url: 'http://localhost:8080/article/like',
      type: 'POST',
      data: {articleId},
    })
    .done(function(data) {
      $this.children('.icon-heart').toggleClass('is-liked');
      $this.children('.favorite-count').text(data)
    })
    .fail(function() {
      console.log('通信失敗')
    });
  });
});