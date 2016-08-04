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