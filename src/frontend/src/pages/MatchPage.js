import React from 'react'; 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';
import './MatchPage.scss';



export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();

    useEffect (

        ()=>{
            const fetchMatches = async () =>{
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
                const data  =  await response.json();
                console.log(data);
                setMatches(data);
            };
            fetchMatches();
        },[teamName, year]

    );

  return (
    <div className="MatchPage">
      
      <div className="yearSelector">
        <YearSelector teamName={teamName} />
      </div>
      <div>
      <h2 className="PageHeading">{teamName} matches in {year}</h2>
          {matches.map(match=><MatchDetailCard key={match.id} teamName={teamName} match={match}/> )}
      </div>
    </div>
  );
}


