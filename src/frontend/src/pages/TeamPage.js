import React from 'react'; 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';
import {PieChart} from 'react-minimal-pie-chart';
import {Link} from 'react-router-dom'

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const { teamName } = useParams();
    useEffect (

        ()=>{
            const fetchMatches = async () =>{
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
                const data  =  await response.json();
                setTeam(data);
            };
            fetchMatches();
        },[teamName]

    );
  if(!team || !team.teamName){
        return <h1>Team not found</h1>
  }
  return (
    
    <div className="TeamPage">
      
      <div className="TeamNameDiv">
      <h4><Link to={`/`}>Home</Link></h4>
        <h1 className="TeamName">{team.teamName}</h1>
      </div>
      <div className="WinLossDiv">
      <span>Wins/Losses</span>
      <PieChart
                data={[
                    { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d',label:"Losses" },
                    { title: 'Wins', value: team.totalWins, color: '#4da375', label:"Wins" },
                ]}
                />
      </div>
      <div className="MatchDetailDiv">
      <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
      </div>
      {team.matches.slice(1).map(match=><MatchSmallCard key={team.id} teamName={team.teamName} match={match}/> )}
      <div className="more-link">
      <Link to={`/team/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
      </div>
    </div>
  );
}


