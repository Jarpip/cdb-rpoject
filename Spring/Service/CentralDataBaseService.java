package pccth.sp.pccthspseedservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pccth.sp.pccthspseedservice.entity.ProjectEntity;
import pccth.sp.pccthspseedservice.entity.SystemEntity;
import pccth.sp.pccthspseedservice.repository.CentralDataBaseJdbcRepository;
import pccth.sp.pccthspseedservice.repository.ProjectJPARepository;
import pccth.sp.pccthspseedservice.repository.SystemJPARepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;



@Service
@Transactional
public class CentralDataBaseService {
	
	@Autowired
	private CentralDataBaseJdbcRepository jdbcRepo;

	public Object searchSystemByCode(String code){
		return jdbcRepo.searchSystemByCode(code);
	}
	
	public Object searchSystemByCreateDate(Date date){
		return jdbcRepo.searchSystemByCreateDate(date);
	}
	
	public Object searchSystemByBoth(Date date, String code){
		return jdbcRepo.searchSystemByBoth(date, code);
	}
	
	
	public void deleteSystem(Integer id) {
		jdbcRepo.deleteSystem(id);
	}
	
	public void deleteProject(Integer id) {
		jdbcRepo.deleteProject(id);
	}
}

