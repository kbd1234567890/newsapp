import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {

  constructor(){
    super();
    console.log("I am a constructor from New")
    this.state = {
      articles : [],
      loading : false
    }
  }

  async componentDidMount() {
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0611163361514ed286d129eeca948984";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles
    })

    
  }
  
  render() {
    
    console.log("render")
    return (
      <div className="container my-3">
        <h2>Knews - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {

            if (element === undefined){
              return null
            }
            return <div className="col-md-4 my-3" key={element.url } >
            <NewsItem title={element.title=== null?"": element.title} description={element.description===null? "": element.description} newsUrl = {element.url} imageUrl={element.urlToImage? element.urlToImage: "https://images.indianexpress.com/2022/02/S22-colours-feature.jpg" } />
          </div>
          })}  
        </div>
      </div>
    );
  }
}
