package pccth.sp.pccthspseedservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.PositionEntity;

@Repository
public interface PositionJPARepository extends JpaRepository<PositionEntity, Integer>{

}
