package pccth.sp.pccthspseedservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.OfficeEntity;

@Repository
public interface OfficeJPARepository extends JpaRepository<OfficeEntity, Integer>{
	List<OfficeEntity> findAllByOrderByOrderNoAsc();
}
