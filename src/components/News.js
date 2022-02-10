import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  k = "Kanifanath Baban Dhobale Junior Consultant Tibco";

  constructor() {
    super();
    console.log("I am a constructor from New");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=0611163361514ed286d129eeca948984&page=" +
      this.state.page;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
  }

  handleNextClick = async () => {
    console.log("Next");

    if(this.state.page + 1 > Math.ceil(this.state.totalResults / 20)){
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0611163361514ed286d129eeca948984&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };

  handlePrevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0611163361514ed286d129eeca948984&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2>Knews - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            if (element === undefined) {
              return null;
            }
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title === null ? "" : element.title}
                  description={
                    element.description === null ? "" : element.description
                  }
                  newsUrl={element.url}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.indianexpress.com/2022/02/S22-colours-feature.jpg"
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}
