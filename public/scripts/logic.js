
$('#nextBTN').click(function(){
  var divsNum = sumDivs();
  var actualDiv =  $('.active').attr('id');
  var nextDiv = parseInt(actualDiv)+1;
  if(nextDiv>divsNum){
    nextDiv = 0;
  }
  $('#'+actualDiv).switchClass('active', 'fadeAway', 1000);
  $('#'+actualDiv).removeClass('fadeAway', 200);
  $('#'+nextDiv).addClass('fadeIn', 200);
  $('#'+nextDiv).switchClass('fadeIn', 'active', 200);
});

$('#prevBTN').click(function(){
  var divsNum = sumDivs();
  var actualDiv =  $('.active').attr('id');
  var nextDiv = parseInt(actualDiv)-1;
  if(nextDiv<0){
    nextDiv = divsNum;
  }
  $('#'+actualDiv).switchClass('active', 'fadeAwayLeft', 1000);
  $('#'+actualDiv).removeClass('fadeAwayLeft', 200);
  $('#'+nextDiv).addClass('fadeInLeft', 200);
  $('#'+nextDiv).switchClass('fadeInLeft', 'active', 200);
});

function sumDivs (){
  var i = 0;
  $('.listBody').each(function(){
    i++;
  })
  return i-1;
};

function showEspecificMenu(menuId){
  $('#0').removeClass('active');
  $('#'+menuId).addClass('active'); 
}

function backToMain(){
  $('.active').removeClass('active');
  $('#0').addClass('active');
}

function makePostVisible(post_id){
  console.log(post_id);
}

function showPostBody(){
  $('.postBody').slideToggle(200);
}

function backToList(){
  $('.postBody').slideToggle(200);
}