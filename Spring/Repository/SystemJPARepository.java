package pccth.sp.pccthspseedservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.SystemEntity;

@Repository
public interface SystemJPARepository extends JpaRepository<SystemEntity, Integer>{
	List<SystemEntity> findAllByOrderBySystemNameAsc();
}
