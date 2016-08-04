var ThemePostPreview = React.createClass({
  //Es donde se muestra el preview del post. Titulo, autor, fecha e imagen.  
  render: function(){
    return(
      <div className='previewBox' onClick = {this.props.onClick}>
        <div className='col-lg-7'>
          <h1>{this.props.post_title}</h1>
          <label>{this.props.post_author}</label>
        </div>
        <div className='col-lg-5'>
          <img className='previewImage' src={this.props.post_image} />
        </div>
      </div>
      
    )
  }
})