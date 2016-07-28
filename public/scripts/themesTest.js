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
    return(
      <div>
        <img className='themeBanner' src={this.props.theme_banner} />
        <h1>{this.props.theme_name}</h1>
        <label>{this.props.theme_description} </label>
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
        this.setState({postData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.themes_url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {postData:[]};
  },
  componentDidMount: function(){
    this.loadPostFromServer();
    setInterval(this.loadPostFromServer, 2000);
  },
  render: function(){
    return (
      <ThemePostPreviewList 
        postData = {this.state.postData} 
        theme = {this.props.theme_name} />
    );
  }
})

var ThemePostPreviewList = React.createClass({
  render: function(){
    var theme = this.props.theme;
    var postPreviewNodes = this.props.postData.map(function(info){
      if(info.theme == theme){
        return(
        <div>
          <ThemePostPreview 
            post_title = {info.title}
            post_author = {info.author}
            post_image = {info.banner_url} />
        </div>
      );
    }
        
      
    })
    return(
      <div>
        {postPreviewNodes}
      </div>
    )
  }
})

var ThemePostPreview = React.createClass({
  //Es donde se muestra el preview del post. Titulo, autor, fecha e imagen.
  render: function(){
    return(
      <div>
        <h1>{this.props.post_title}</h1>
        <label>{this.props.post_author}</label>
        <img src={this.props.post_image} />
      </div>  
    )
  }
})

ReactDOM.render(
  <ListContainer themes_url="postController/themes" pollInterval={2000}/>,
  document.getElementById('container')
);