//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//********************************************PRUEBA DE MENU DE TEMAS CON POSTS*************************************************//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Las funciones OnClick estan ubicadas en el documento logic.js

var ListContainer = React.createClass({
  //Contiene todos los menus: Menu principal y lista de cada tema.
  loadThemesFromServer: function(){
    $.ajax({
      url: this.props.themes_url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.themes_url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){    
    return {data:[]};
  },
  componentDidMount: function(){
    this.loadThemesFromServer();
  },
  render: function(){
    return(
      <div>
        <img src='/images/list_background.png' id='listBackground' />
        <img src='/images/mvlogo.jpg' id='movidaLogo' onClick={backToMain}/>
        <br/>
        <MainMenu />
        <ThemeList data={this.state.data}/>
      </div>
    );
  }
});

var MainMenu = React.createClass({
  render: function(){
    return(
      <div className='mainMenu listBody active' id='0'>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 1)}>HOY</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 2)}>Eventos</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 3)}>Fashion</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 4)}>Gastronomia</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 5)}>Tecnologia</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 6)}>Viajes</h1>
      </div>
    );
  }
})

var ThemeList = React.createClass({
  //Es donde se muestra la descripcion principal del tema y la lista de post de ese tema.
  render: function(){
    var themesNodes = this.props.data.map(function (info){
      return(
        <div className='listBody col-lg-4' id={info.id}>
          <ThemeBox 
            theme_name={info.theme_name}
            theme_banner={info.theme_banner}
            theme_description={info.theme_description}/>
          <ThemePostPreviewContainer theme_name={info.theme_name} post_url="postController/post"/>
        </div>
      );
    })
    return(
      <div>
        {themesNodes}
      </div>
    )
  }
})

var ThemeBox = React.createClass({
  //Es donde se muestra la descripcion de cada tema.
  render: function(){
    var style = {backgroundImage: 'url('+this.props.theme_banner+')'}
    return(
      <div style={style} className='themeBox'>
        <div className='themeDescription'>
          <h1>{this.props.theme_name}</h1>
        </div>
      </div>
    );
  }
})

var ThemePostPreviewContainer = React.createClass({
  loadPostFromServer: function(){
    $.ajax({
      url: this.props.post_url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({postReviewData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.themes_url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {postReviewData:[]};
  },
  componentDidMount: function(){
    this.loadPostFromServer();
    setInterval(this.loadPostFromServer, 2000);
  },
  render: function(){
    return (
      <ThemePostPreviewList 
        postReviewData = {this.state.postReviewData} 
        theme = {this.props.theme_name} />
    );
  }
})

var ThemePostPreviewList = React.createClass({
  getInitialState: function(){
    var postData = [
      { 
        "title": "Seleccione un post"   
      }
    ];
    return{postData:postData};
  },
  updatePostDataState: function(post_id){
    var postData = [];
    this.props.postReviewData.map(function(info){
      if(info.id==post_id){
        postData = [
          {
            "id": info.id,
            "theme" : info.theme,
            "author": info.author,
            "author_profession" : info.author_profession,
            "author_pic": info.author_pic,
            "banner_url": info.banner_url,
            "title": info.title,
            "content": info.content
          }
        ];
      }
    });
    this.setState({postData:postData});
    showPostBody(); //<--- Funcion ubicada en logic
  },
  render: function(){
    var theme = this.props.theme;
    var onClickFunction = this.updatePostDataState;
    var i = 0;
    var postPreviewNodes = this.props.postReviewData.map(function(info){
      if(info.theme == theme){
        i++;
        return(
        <div>
          <hr/>
          <ThemePostPreview 
            post_title = {info.title}
            post_author = {info.author}
            post_image = {info.banner_url}
            post_id = {info.id}
            post_count = {i}
            onClick = {onClickFunction.bind(null, info.id)} />
        </div>
      );
    }     
    })
    return(
      <div>
        {postPreviewNodes}
        <PostBody postData={this.state.postData} />
      </div>
    )
  }
})

var ThemePostPreview = React.createClass({
  //Es donde se muestra el preview del post. Titulo, autor, fecha e imagen.  
  render: function(){
    var post_count = this.props.post_count;
    var postPreviewClasses = [];
    if(post_count%2){
      postPreviewClasses[0] = 'col-lg-7';
      postPreviewClasses[1] = 'col-lg-5';
    }
    else{
      postPreviewClasses[0] = 'col-lg-7 col-lg-push-5';
      postPreviewClasses[1] = 'col-lg-5 col-lg-pull-7';     
    }

    return(
      <div className='previewBox' onClick = {this.props.onClick}>
        <div className={postPreviewClasses[0]}>
          <h1>{this.props.post_title}</h1>
          <label>{this.props.post_author}</label>
        </div>
        <div className={postPreviewClasses[1]}>
          <img className='previewImage' src={this.props.post_image} />
        </div>
      </div>
    );
  }
})

var PostBody = React.createClass({
  //Contenedor, principalmente invisible, donde esta la noticia completa. Se carga con la noticia que sea clickeada.
  render: function(){
    return(
      <div className='postContainer'>
        <div className='postBody'>
          <div className='postHeader' onClick={backToList}>
            <h1>{'< '+this.props.postData[0]['theme']}</h1>
          </div>
          <img className='postBanner' src={this.props.postData[0]['banner_url']} />
          <h1>{this.props.postData[0]['title']}</h1>
          <br/>
          <br/>
          <label>{this.props.postData[0]['content']}</label>
          <br/>
          <br/>
          <div className='authorInfo row'>
            <div className='col-xs-8'>
              <p>Escrito por: </p>
              <h3>{this.props.postData[0]['author']} <br/><small>{this.props.postData[0]['author_profession']}</small></h3>
            </div>
            <div className='col-xs-4'>
              <img className='authorPhoto' src={this.props.postData[0]['author_pic']} />
            </div>
          </div>
        </div>
      </div>
    );
  }
})

ReactDOM.render(
  <ListContainer themes_url="postController/themes" pollInterval={2000}/>,
  document.getElementById('container')
);