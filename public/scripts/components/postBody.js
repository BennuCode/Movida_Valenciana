var PostBody = React.createClass({
  //Contenedor, principalmente invisible, donde esta la noticia completa. Se carga con la noticia que sea clickeada.
  render: function(){
    return(
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
    );
  }
})