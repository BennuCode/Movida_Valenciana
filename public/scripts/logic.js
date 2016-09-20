$('#nextBTN').click(function(){
  var divsNum = sumDivs();
  var actualDiv =  $('.active').attr('id');
  if(actualDiv == undefined){//<---- Parche para visualizar las noticias filtradas pero no se ve el primero. 
    actualDiv = 0;
  }
  var nextDiv = parseInt(actualDiv)+1;
  if(nextDiv>divsNum){
    if($("#mainMenu").css('display')=='block'){
      nextDiv = 0;
    }
    /*Codigo para que, al llegar al final de las cards de un tema, se carguen nuevas*/
    /*Obviamente no deberia salir un alert... o al menos no uno asi, pero bueno*/
    else {
      var load = confirm("Se cargaran 10 noticias mas");
      if(load){
        console.log)
        /*Aqui hay dos betas, el primero es el siguiente:
          Para que el resultado de este ajax se cargue en el state de las noticias, tengo que poner los botones en el codigo react,
          junto a todo este comportamiento... No se habia hecho por las animaciones, pero de verdad que ahora parece una tarea un tanto
          complicada.
          Segundo, por ahora estaba intentando extraer con titulo, pero creo que con DATE es mejor, pero, hay que cambiarle el formato fecha 
          a los registros de la BD, leete esto:
          http://stackoverflow.com/questions/8835757/return-query-based-on-date
        */
        
        /*$.ajax({
          method: 'POST',
          url: "postController/loadNewPost",
          data:{
            'theme_name' : $('.active .cardContent h1').text()
          },
          dataType: 'json',
          cache: false,
        })*/
      }
      else {
        alert("Se supone que digas que si")
      }
    }
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
  if(nextDiv>=0){ /*<--Asi no va a ir a la ultima al retroceder*/
    $('#'+actualDiv).switchClass('active', 'fadeAwayLeft', 1000);
    $('#'+actualDiv).removeClass('fadeAwayLeft', 200);
    $('#'+nextDiv).addClass('fadeInLeft', 200);
    $('#'+nextDiv).switchClass('fadeInLeft', 'active', 200);
  }
  
});

function sumDivs (){
  var i = 0;
  $('.card').each(function(){
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

function showPostBody(){
  $('.postContainer').slideToggle(200);
  $('body').css('overflow-y', 'hidden');
}

function backToList(){
  $('.postContainer').slideToggle(200);
  $('body').css('overflow-y', 'auto');
}