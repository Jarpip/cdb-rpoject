package pccth.sp.pccthspseedservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.SystemProjectEntity;

@Repository
public interface SystemProjectJPARespository extends JpaRepository<SystemProjectEntity, Integer>{

}
