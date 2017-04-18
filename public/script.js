$(function(){
  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var colors = ['yellow', 'purple', 'silver', 'green', 'red', 'orange', 'cyan'];

  peerReviewCtx.fillText("Peer Review", 10, 10);
  for (i=0;i<10;i++){
    peerReviewCtx.fillText(10-i, 10, 30+i*20);
    peerReviewCtx.moveTo(25, 30+i*20);
    peerReviewCtx.lineTo(200, 30+i*20);
  }
  peerReviewCtx.stroke();

  $.ajax({
    url: '/peerReview.json',
    dataType: 'json'
    success: function(data){
      var categories = Object.keys(data);
      categories.forEach(function(category, index){
        var value = data[category];
        var x = 30 + index * 10;
        var y = 30 + (10-value) * 20;
        var height = value * 20;
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.strokeText(category, 100, 30+20*index);
        peerReviewCtx.fillStyle = colors[index];
      });
    }
  })


    $.ajax({
      url: '/pointDistribution.json',
      success: function(data){
        var people = Object.keys(data);
        var total = Object.values(data).reduce(function(acc, value){
          return acc+value;
        }, 0);
        var angle = 0;
        people.forEach(function(person){
          var percent = data[person] / total;
        });
      }
    });

});
