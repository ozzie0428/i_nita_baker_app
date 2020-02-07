import React, { Component } from "react";
import axios from "axios";

export default class Reviews extends Component {
  state = {
    commentList: [],
    name: "",
    tastiness: "",
    difficulty: ""
  };
  componentDidMount() {
    this.updateReviewsPage();
  }

  updateReviewsPage = () => {
    const recipesId = this.props.match.params.recipesId;
    axios.get(`/api/v1/reviews/${recipesId}`).then(res => {
      console.log("TCL: Reviews -> updateReviewsPage -> res", res);
      const commentList = [...this.state.commentList];

      commentList.push(res.data);
      this.setState({ commentList: commentList });
    });
  };
  createReviews = () => {
    const recipesId = this.props.match.params.recipesId;
    const newReviews = {
      difficulty: this.state.difficulty,
      tastiness: this.state.tastiness
    };
    axios
      .put(`/api/v1/reviews/${recipesId}`, newReviews)
      .then(res => {
        const newComment = res.data.createdReviews;
        let copyOfComments = [...this.state.commentList];
        copyOfComments.push(newComment);
        this.setState({ commentList: copyOfComments });
        this.resetState();
      })
      .catch(error => console.log("post reviews error", error.message));
  };

  resetState() {
    this.setState({
      difficulty: "",
      tastiness: ""
    });
  }

  handleChange = event => {
    const inputValue = event.target.value;

    this.setState({ [event.target.name]: inputValue });
  };

  commentClick = () => {};
  render() {
    const commentList =
      this.state.commentList &&
      this.state.commentList.map((reviews, i) => {
        return <div key={i}>Review Comment: {reviews.name}
            <div>Tastiness: {reviews.tastiness}</div>
            <div>Difficulty: {reviews.difficulty}</div>
            </div>;
      });

    console.log("state", this.state.commentList);
    return (
      <div>
        <div className="reviews-submit">
          <h1> REVIEWS</h1>
        </div>
        <div className="container-container">
          <div className="comment-container">
            <h1>Comments:</h1>

            <div className="comment-list">{commentList}</div>
          </div>

          <div className="reviews-container">
            <div className="reviews-btn">
              <a href={`/recipes/${this.props.match.params.recipesId}`}>
                Back To recipes
              </a>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
