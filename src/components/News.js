import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
    totalResults: 0,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (stringName) => {
    return stringName.charAt(0).toUpperCase() + stringName.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("I am a constructor from New");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Knews`;
  }

  async update(pageNo) {
    this.props.setProgress(10);
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0611163361514ed286d129eeca948984&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    console.log("cdm");
    this.update(0);
  }

  fetchMoreData = async () => {

    this.setState({
      page : this.state.page + 1
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0611163361514ed286d129eeca948984&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  }

  render() {
    console.log("render");
    return (
      <>
        <h1 className="text-center" style={{ margin: "23px, 0px" }}>
          Knews - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              if (element === undefined) {
                return null;
              }
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    newsUrl={element.url}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.indianexpress.com/2022/02/S22-colours-feature.jpg"
                    }
                    author={
                      element.author === null ? "Unknown" : element.author
                    }
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
