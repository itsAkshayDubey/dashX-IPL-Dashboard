package com.ipl.dashboard.repository;

import org.springframework.data.repository.CrudRepository;

import com.ipl.dashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
	
	Team findByTeamName(String teamName);
}
