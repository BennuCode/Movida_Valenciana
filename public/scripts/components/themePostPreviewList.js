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
    var postPreviewNodes = this.props.postReviewData.map(function(info){
      if(info.theme == theme){
        return(
        <div>
          <hr/>
          <ThemePostPreview 
            post_title = {info.title}
            post_author = {info.author}
            post_image = {info.banner_url}
            post_id = {info.id} 
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