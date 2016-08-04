var ThemeBox = React.createClass({
  //Es donde se muestra la descripcion de cada tema.
  render: function(){
    var style = {backgroundImage: 'url('+this.props.theme_banner+')'}
    return(
      <div style={style} className='themeBox'>
        <div className='themeDescription'>
          <h1>{this.props.theme_name}</h1>
          <label>{this.props.theme_description} </label>
        </div>
      </div>
    );
  }
})