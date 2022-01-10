import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import Result from './Result.jsx';
import Search from './Search.jsx';
import Loading from './Loading.jsx';
import Footer from './Footer.jsx';

$.ajaxSetup({timeout: 300000});

const App = () => {
  const [searched, setSearched] = useState(false);
  const [searchProgress, setSearchProgress] = useState('negative');
  const [searchRegion, setSearchRegion] = useState('NA1');
  const [searchSummoner, setSearchSummoner] = useState('');
  const [result, setResult] = useState({});
  const [puuid, setPuuid] = useState('');

  useEffect(() => {
    if (result.summonerInfo) {
      setPuuid(result.summonerInfo.puuid);
    }
  }, [result])

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchProgress('pending');
    const data = {
      region: searchRegion,
      summoner: searchSummoner,
    };
    $.get(`http://localhost:5000/search/${data.summoner}`, data, (result) => {
      if (result.create) {
        createSummoner(data);
      } else {
        setSearched(true);
        setSearchProgress('completed');
        setResult(result);
      }
    });
  };

  const createSummoner = (data) => {
    $.post(`http://localhost:5000/create/${data.summoner}`, data, (result) => {
      setSearched(true);
      setSearchProgress('completed');
      setResult(result);
    });
  }

  const updateSummoner = (event) => {
    event.preventDefault();
    setSearchProgress('pending');
    const data = {
      region: searchRegion,
      summoner: searchSummoner,
      puuid: puuid,
    };
    $.post(`http://localhost:5000/update/${data.summoner}`, data, (result) => {
      setSearched(true);
      setSearchProgress('completed');
      setResult(result);
    });
  };

  const selectRegion = (event) => {
    event.preventDefault();
    setSearchRegion(event.target.value);
  };

  const inputSearch = (event) => {
    event.preventDefault();
    setSearchSummoner(event.target.value);
  };

  return (
    <div className="container is-fluid" style={{padding: 0}}>
        <div className="section level">
          <div className="">
            <div className="title is-1">Me No Pivot</div>
            <div className="subtitle">Search up TFT summoner game statistics and match history.</div>
          </div>
          <div className="">
          <Search handleSearch={handleSearch} inputSearch={inputSearch} selectRegion={selectRegion} />
          </div>
        </div>
        <div className="" style={{backgroundImage: `url("https://raw.communitydragon.org/latest/game/assets/ux/loadingscreen/tft.png")`, minHeight: searched ? 1000 : 575}}>
          <section className="section is-medium" style={{ display: searched ? 'none' : 'block' }}>
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <div className="container is-half is-centered">
                  <Search handleSearch={handleSearch} inputSearch={inputSearch} selectRegion={selectRegion} />
                </div>
              </div>
              <div className="column"></div>
            </div>
          </section>
          <section className="section is-small">
            <div className="level" style={{fontSize: 48}}>
              <Loading searchProgress={searchProgress} />
            </div>
          </section>
          <Result result={result} searched={searched} searchProgress={searchProgress} updateSummoner={updateSummoner} puuid={puuid}/>
        </div>
        <Footer/>
      </div>
  );
};

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searched: false,
//       searchProgress: 'negative',
//       search: {
//         region: 'NA1',
//         summoner: '',
//       },
//       result: {
//         // region: 'NA1',
//         // name: '',
//         // profileIconId: 0,
//         // revisionDate: 0,
//         // summonerLevel: 0,
//         leagueInfo: [],
//         matches: [],
//         summonerInfo: {
//           id: '',
//           accountId: '',
//           puuid: '',
//           name: '',
//           profileIconId: null,
//           profileIcon: '',
//           revisionDate: null,
//           summonerLevel: null,
//           region: 'NA1',
//         },
//       },
//     };
//     this.handleSearch = this.handleSearch.bind(this);
//     this.inputSearch = this.inputSearch.bind(this);
//     this.selectRegion = this.selectRegion.bind(this);
//   };

//   // componentDidMount() {
//   //   console.log('hello')
//   //   $.get(`http://localhost:3000/${window.location.pathname}`, (result) => {
//   //     this.setState({
//   //       searched: true,
//   //       searchProgress: 'complete',
//   //       search: {
//   //         region: result.region,
//   //         summoner: result.summoner,
//   //       },
//   //       result: {
//   //         summonerInfo: result.summonerInfo,
//   //         leagueInfo: result.leagueInfo,
//   //         matches: result.matches,
//   //       },
//   //     });
//   //   })
//   // }
//   // performs ajax request with summoner name and region
//   handleSearch(e) {
//     e.preventDefault();
//     this.setState({
//       searchProgress: 'pending',
//     });
//     const data = {
//       region: this.state.search.region,
//       summoner: this.state.search.summoner,
//     };
//     $.get(`http://localhost:5000/search/${data.summoner}`, data, (result) => {
//       console.log(result);
//       this.setState({
//         searched: true,
//         searchProgress: 'complete',
//         search: {
//           region: data.region,
//           summoner: data.summoner,
//         },
//         result: {
//           // region: result.region,
//           // name: result.name,
//           // profileIconId: result.profileIconId,
//           // revisionDate: result.revisionDate,
//           // summonerLevel: result.summonerLevel,
//           // leagueInfo: result.leagueInfo,
//           // matches: result.matches,
//           summonerInfo: result.summonerInfo,
//           leagueInfo: result.leagueInfo,
//           matches: result.matches,
//         },
//       });
//     });
//   };

//   // saves summoner name to state
//   inputSearch(e) {
//     e.preventDefault();
//     let region = this.state.search.region;
//     this.setState({
//       search: {
//         summoner: e.target.value,
//         region: region,
//       }
//     });
//   };

//   // saves region to state
//   selectRegion(e) {
//     let summoner = this.state.search.summoner;
//     this.setState({
//       search: {
//         summoner: summoner,
//         region: e.target.value,
//       }
//     });
//     console.log('hello: ', this.state.search.region);
//     e.preventDefault();
//   }


//   render() {
//     return (
//       <div className="container is-fluid" style={{padding: 0}}>
//         <div className="section level">
//           <div className="">
//             <div className="title is-1">Me No Pivot</div>
//             <div className="subtitle">For those trying to figuring out why they are going 8th by forcing kayle...</div>
//           </div>
//           <div className="">
//             <Search handleSearch={this.handleSearch} inputSearch={this.inputSearch} selectRegion={this.selectRegion} />
//           </div>
//         </div>
//         <div className="" style={{backgroundImage: `url("https://raw.communitydragon.org/latest/game/assets/ux/loadingscreen/tft.png")`, minHeight: this.state.searched ? 1000 : 400}}>
//           <section className="section is-medium" style={{ display: this.state.searched ? 'none' : 'block' }}>
//             <div className="columns">
//               <div className="column"></div>
//               <div className="column">
//                 <div className="container is-half is-centered">
//                   <Search handleSearch={this.handleSearch} inputSearch={this.inputSearch} selectRegion={this.selectRegion} />
//                 </div>
//               </div>
//               <div className="column"></div>
//             </div>
//           </section>
//           <section className="section is-small">
//             <div className="level" style={{fontSize: 48}}>
//               <Loading searchProgress={this.state.searchProgress} />
//             </div>
//           </section>
//           <Result result={this.state.result} searched={this.state.searched} searchProgress={this.state.searchProgress}/>
//         </div>
//       </div>
//     );
//   };
// };

export default App;