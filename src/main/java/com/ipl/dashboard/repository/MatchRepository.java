package com.ipl.dashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ipl.dashboard.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long> {
	
	List<Match> findByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);
	
//	List<Match> findByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String team1, LocalDate date3, LocalDate date4, String team2, LocalDate date1, LocalDate date2);

    @Query("select m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and m.date between :dateStart and :dateEnd order by date desc")
    List<Match> getMatchesByTeamBetweenDates(
        @Param("teamName") String teamName, 
        @Param("dateStart") LocalDate dateStart, 
        @Param("dateEnd") LocalDate dateEnd
    );
	
	default List<Match> findLatestMatchesByTeam(String teamName,int count){
		Pageable pageable = PageRequest.of(0,count);
		return findByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable);
	}
}
