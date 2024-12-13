package pccth.sp.pccthspseedservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.HolidayEntity;

@Repository

public interface HolidayJPARepository extends JpaRepository<HolidayEntity, Integer> {
	List<HolidayEntity> findAllByOrderByHolidayDateAsc();
}
