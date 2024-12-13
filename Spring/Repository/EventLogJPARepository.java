package pccth.sp.pccthspseedservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.EventLogEntity;

@Repository
public interface EventLogJPARepository extends JpaRepository<EventLogEntity, Integer>{

}
