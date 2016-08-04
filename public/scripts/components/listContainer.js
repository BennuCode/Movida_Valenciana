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