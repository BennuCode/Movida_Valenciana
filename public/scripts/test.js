//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//**************************************PRIMERA PRUEBA PARA ESTRUCTURA DE POSTS*************************************************//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var PostList = React.createClass({
  loadPostsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data:[]};
  },
  componentDidMount: function(){
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function(){
    return(
      <div className='postList'>
        <PostContainer data={this.state.data} />
      </div>
    );
  }
})

var PostContainer = React.createClass({
  render: function(){
    var i = 0;
    var x = function(){if(i==1){return "postBody col-lg-4 active"} else{return "postBody col-lg-4"}}
    var postNodes = this.props.data.map(function (info){
      i++;
      return (
        <div className={x()} id={i}>
          <PostImage imgURL={info.banner_url} />
          <PostContent
            title={info.title} 
            content={info.content} />
          <br/>
          <br/>
          <PostAuthorInfo 
            authorName={info.author}
            authorProfession={info.author_profession}
            authorPhoto={info.author_pic}/>
          <br/>
          <br/>
        </div>
      ); 
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    )
  }
});

var PostImage = React.createClass({
  render: function(){
    return(
      <img className='postImage' src={this.props.imgURL} />
    );
  }
})

var PostContent = React.createClass({
  render: function(){
    return(
      <div className='postContent'>
        <h1>{this.props.title}</h1>
        <p>{this.props.content}</p>
      </div>
    );
  }
});

var PostAuthorInfo = React.createClass({
  render: function(){
    return(
      <div className='authorInfo row'>
        <div className='col-xs-8'>
          <p>Escrito por: </p>
          <h3>{this.props.authorName} <br/><small>{this.props.authorProfession}</small></h3>
        </div>
        <div className='col-xs-4'>
          <PostAuthorPhoto photoURL={this.props.authorPhoto}/>
        </div>
      </div>
    );
  }
});

var PostAuthorPhoto = React.createClass({
  render: function(){
    return(
      <img className='authorPhoto' src={this.props.photoURL} />
    );
  }
});

ReactDOM.render(
  <PostList url="postController/comments" pollInterval={2000}/>,
  document.getElementById("container")
);
