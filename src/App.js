import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    instaData : []
  };

  async componentDidMount() {
    let data = []
    const url = 'https://www.instagram.com/bigboytoyz_india/';
    const instaSource = await axios.get(url);
    const instaObj = instaSource.data.match(
        /<script type="text\/javascript">window\._sharedData =(.*)<\/script>/
    )[1].slice(0,-1)

    const convertedJsonObj = JSON.parse(instaObj)
    console.log(convertedJsonObj);
    const mediaArr = convertedJsonObj.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges

    mediaArr.map(el=>{
      const node = el.node
      data.push(node)
    })
    this.setState({
      instaData : data
    })
  }

  renderInstaPics = () => {
    return this.state.instaData.map((media , i)=>{
      return(
          <div style={{display: "inline"}} key={i}>
            <img src={media.thumbnail_src} alt="insta" style={{width:"200px"}}/>
          </div>
      )
    })
  }

  render() {
        return (
            <div>
              {this.state.instaData ? this.renderInstaPics() : <h5> Nothing Found!!!! </h5> }
            </div>
        );
    }
}

export default App;