var MainCardsList = React.createClass({
  //Contiene todos los menus: Menu principal y lista de cada tema.
  loadPostFromServer: function(){
    $.ajax({
      url: "postController/mainPost",
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
    this.loadPostFromServer();
  },
  render: function(){
    return(
      <div id="mainMenu">
        <img src='/images/list_background.png' id='listBackground' />
        <img src='/images/mvlogo.jpg' id='movidaLogo' onClick={backToMain}/>
        <br/>
        <MainMenu />
        <Card postData={this.state.data}/>
      </div>
    );
  }
});

var ThemeCardList = React.createClass({
  loadPostFromServer: function(){
    $.ajax({
      method: 'POST',
      url: "postController/themePost",
      data:{
        'theme_name' : this.props.theme_name
      },
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
    this.loadPostFromServer();
  },
  backToMainMenu: function(){
    document.body.style.backgroundImage="url('/images/main_bkgnd.png')";
    ReactDOM.render(<MainCardsList />, document.getElementById('container'));
  },
  render: function(){
    return(
      <div id='themeMenu'>
        <img src='/images/list_background.png' id='listBackground' />
        <img src='/images/boton-01.png' id="backToMainBTN" onClick={this.backToMainMenu}/>
        <h1>{this.props.theme_name}</h1>
        <Card postData={this.state.data}/>
      </div>
    );
  }
});

var MainMenu = React.createClass({
  showThemeMenu: function(selected_theme){
    var bkgnLink = selected_theme.toLowerCase();
    document.body.style.backgroundImage="url('/images/"+bkgnLink+"_bkgnd.png')";
    ReactDOM.render(<ThemeCardList theme_name={selected_theme}/>, document.getElementById('container'));
  },
  render: function(){
    var that = this;
    return(
      <div className='mainMenu card active' id='0'>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Hoy')}>HOY</h1>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Eventos')}>Eventos</h1>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Fashion')}>Fashion</h1>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Gastronomia')}>Gastronomia</h1>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Tecnologia')}>Tecnologia</h1>
        <h1 className='mainMenuItem' onClick={that.showThemeMenu.bind(null, 'Viajes')}>Viajes</h1>
      </div>
    );
  }
});

var Card = React.createClass({
  getInitialState: function(){
    return{cardContent:'prueba'};
  },
  showCardContent: function(post_id){
    $.ajax({
      url: "postController/takeCardContent",
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: {
        'card_id' : post_id
      },
      success: function(data){
        this.setState({cardContent: data});
        showPostBody(); //<--- Funcion ubicada en logic
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.themes_url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    if(!document.getElementById("0")){
      var postCount = 0;
    }
    else{
      var postCount = 1;
    }
    var that = this;
    var cardNodes = this.props.postData.map(function (info){
      return(
        <div className='card' id={postCount++} onClick={that.showCardContent.bind(null, info._id)}>
          <div className='cardContent'>
            <img className='cardBanner' src={info.banner_url} />
            <h1>{info.title}</h1>
            <p>Escrito por {info.author}</p>
          </div>
        </div>
      );
    })
    return(
      <div>
        {cardNodes}
        <CardContent content={this.state.cardContent}/>
      </div>
    )
  }
})

var CardContent = React.createClass({
  render: function(){
    //Tengo que hacer un state, mandarselo
    var content = this.props.content[0]
    return(
      <div className='postContainer'>
        <div className='postBody'>
          <div className='postHeader' onClick={backToList}>
            <h1>{'< '+content.theme}</h1>
          </div>
          <img className='postBanner' src={content.banner_url} />
          <h1>{content.title}</h1>
          <br/>
          <br/>
          <label>{content.content}</label>
          <br/>
          <br/>
          <div className='authorInfo row'>
            <div className='col-xs-8'>
              <p>Escrito por: </p>
              <h3>{content.author} <br/><small>{content.author_profession}</small></h3>
              
              <a className='btn btn-social-icon btn-facebook socialIcon' href={content.facebook} target='_blank'>
                <span className='fa fa-facebook'></span></a>
              <a className='btn btn-social-icon btn-twitter socialIcon' href={content.twitter} target='_blank'>
                <span className='fa fa-twitter'></span></a>
              <a className='btn btn-social-icon btn-instagram socialIcon' href={content.instagram} target='_blank'>
                <span className='fa fa-instagram'></span></a>

            </div>
            <div className='col-xs-4'>
              <img className='authorPhoto' src={content.author_pic} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <MainCardsList />,
  document.getElementById('container')
);