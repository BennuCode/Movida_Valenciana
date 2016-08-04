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