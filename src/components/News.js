import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  // articles = [
  //   {
  //     "source": {
  //       "id": "engadget",
  //       "name": "Engadget"
  //     },
  //     "author": "Lawrence Bonk",
  //     "title": "Venmo now lets you send crypto to other users for some reason",
  //     "description": "Paypal-owned money transfer service Venmo dipped its toes into cryptocurrencies in 2021 after opening up an in-app trading platform.\r\n That was just for individuals to buy or sell crypto. Now, the company is going further into the once-heralded digital curren…",
  //     "url": "https://www.engadget.com/venmo-now-lets-you-send-crypto-to-other-users-for-some-reason-192015694.html",
  //     "urlToImage": "https://s.yimg.com/uu/api/res/1.2/LKRH31mzL9wqtcqoQ_lkjw--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-04/835a5670-e5f4-11ed-9db6-3febf57b7a4a.cf.jpg",
  //     "publishedAt": "2023-04-28T19:20:15Z",
  //     "content": "Paypal-owned money transfer service Venmo dipped its toes into cryptocurrencies in 2021 after opening up an in-app trading platform.\r\n That was just for individuals to buy or sell crypto. Now, the co… [+1625 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "Gizmodo.com"
  //     },
  //     "author": "Kyle Barr",
  //     "title": "Bitcoin Pyramid Scheme Fraudster Ordered to Pay $3.4 Billion",
  //     "description": "The Commodities Futures Trading Commission patted itself on the back for winning one of the largest civil cases against a crypto crook, even if most—or any—of those affected will see any of their money returned. On Thursday, a Texas judge issued a default jud…",
  //     "url": "https://gizmodo.com/bitcoin-mlm-joe-steyn-mirror-trading-international-1850385963",
  //     "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/16e5700ae24064ff50deef40ec83875d.jpg",
  //     "publishedAt": "2023-04-28T14:35:25Z",
  //     "content": "The Commodities Futures Trading Commission patted itself on the back for winning one of the largest civil cases against a crypto crook, even if mostor anyof those affected will see any of their money… [+3594 chars]"
  //   },

  //   {
  //     "source": {
  //       "id": null,
  //       "name": "Threadreaderapp.com"
  //     },
  //     "author": null,
  //     "title": "BlueSky ToS gives Jack a 'perpetual' & 'irrevocable' license to all your content",
  //     "description": "@ashleygjovik: BlueSky Terms of Service gives Jack a 'perpetual' & 'irrevocable' license to all your content (posts, name, likeness, pics) BlueSky can delete your account for any reason, but may refuse to delete it ...…",
  //     "url": "https://threadreaderapp.com/thread/1651686218319425570.html",
  //     "urlToImage": "https://threadreaderapp.com/images/screenshots/thread/1651686218319425570.jpg",
  //     "publishedAt": "2023-04-29T18:11:00Z",
  //     "content": "Support us! We are indie developers!\r\nThis site is made by just two indie developers on a laptop doing marketing, support and development! Read more about the story.\r\nBecome a Premium Member ($3/mont… [+395 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "MakeUseOf"
  //     },
  //     "author": "Wasay Ali",
  //     "title": "What Is Crypto Unit Bias? How to Avoid Being Tricked By It",
  //     "description": "Don't get fooled by the units. Look at the bigger picture.",
  //     "url": "https://www.makeuseof.com/what-is-crypto-unit-bias/",
  //     "urlToImage": "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/04/inserting-a-coin-in-a-black-piggy-bank.jpg",
  //     "publishedAt": "2023-05-04T11:15:17Z",
  //     "content": "Crypto unit bias is a common phenomenon that describes how investors are more likely to invest in whole units of a cryptocurrency rather than fractional ones due to a psychological tendency to prefer… [+7240 chars]"
  //   }
  // ]

  constructor() {
    super();
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b1d499669fef44f6a613f4d85edeb438&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b1d499669fef44f6a613f4d85edeb438&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b1d499669fef44f6a613f4d85edeb438&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      // this.setState({loading: false});

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }

  }

  render() {
    console.log("render");
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading &&  this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>Previous</button>
          <button type="button" className="btn btn-info" onClick={this.handleNextClick}>next</button>
        </div>

      </div>
    )
  }
}

export default News