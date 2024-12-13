package pccth.sp.pccthspseedservice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pccth.sp.pccthspseedservice.entity.HolidayEntity;
import pccth.sp.pccthspseedservice.entity.OfficeEntity;
import pccth.sp.pccthspseedservice.entity.PositionEntity;
import pccth.sp.pccthspseedservice.entity.SystemProjectEntity;
import pccth.sp.pccthspseedservice.model.MenuModel;
import pccth.sp.pccthspseedservice.model.UserModel;
import pccth.sp.pccthspseedservice.entity.ProjectEntity;
import pccth.sp.pccthspseedservice.entity.SystemEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

@Repository
public class CentralDataBaseJdbcRepository {
	
	@Autowired
	private EntityManager entityManager;
	
	public List<SystemEntity> searchSystemByCode(String code){
		Query query = entityManager.createNativeQuery("SELECT "+
				"t.system_id, t.system_code, t.system_name, substring(t.remark,1,100), t.create_date, t.create_by, t.update_date, t.update_by "
				+"FROM tb_system t "
				+"WHERE "+"t.system_code LIKE :code");
		query.setParameter("code", "%"+code+"%");
		List<Object[]> objects = query.getResultList();
		List<SystemEntity> l = new ArrayList<SystemEntity>();
		List<SystemProjectEntity> s = new ArrayList<SystemProjectEntity>();
		for (Object[] a : objects) {
			SystemEntity o = new SystemEntity();
			SystemProjectEntity g = new SystemProjectEntity();
			o.setSystemId(new Integer(a[0].toString()));
			if(a[1] != null) o.setSystemCode(a[1].toString());
			if(a[2] != null) o.setSystemName(a[2].toString());
			if(a[3] != null) o.setRemark(a[3].toString());
			if(a[4] != null) o.setCreateDate((Date) a[4]);
			if(a[5] != null) o.setCreateBy(a[5].toString());
			if(a[6] != null) o.setUpdateDate((Date) a[6]);
			if(a[7] != null) o.setUpdateBy(a[7].toString());
			
			l.add(o);
		}	
		
		return l;
	}
	
	public List<SystemEntity> searchSystemByCreateDate(Date date){
		String sql = "SELECT t FROM SystemEntity t WHERE DATE(t.createDate) = ?1";
		TypedQuery<SystemEntity> query = entityManager.createQuery(sql, SystemEntity.class).setParameter(1, date);
		return query.getResultList();
	}
	
	public List<SystemEntity> searchSystemByBoth(Date date, String code){
		String sql = "SELECT t FROM SystemEntity t WHERE DATE(t.createDate) = ?1 AND t.systemCode LIKE ?2";
		TypedQuery<SystemEntity> query = entityManager.createQuery(sql, SystemEntity.class).setParameter(1, date).setParameter(2, "%"+code+"%");
		return query.getResultList();
	}
	
	public List<ProjectEntity> searchProjectByCode(String code){
		Query query = entityManager.createNativeQuery("SELECT "+
				"t.project_id, t.project_code, t.project_name, t.contract_no, t.contract_date, substring(t.remark,1,100), t.create_date, t.create_by, t.update_date, t.update_by "
				+"FROM tb_project t "
				+"WHERE "+"t.project_code LIKE :code");
		query.setParameter("code", "%"+code+"%");
		List<Object[]> objects = query.getResultList();
		List<ProjectEntity> l = new ArrayList<ProjectEntity>();
		for (Object[] a : objects) {
			ProjectEntity o = new ProjectEntity();
			o.setProjectId(new Integer(a[0].toString()));
			if(a[1] != null) o.setProjectCode(a[1].toString());
			if(a[2] != null) o.setProjectName(a[2].toString());
			if(a[3] != null) o.setContractNo(a[3].toString());
			if(a[4] != null) o.setContractDate((Date) a[4]);
			if(a[5] != null) o.setRemark(a[5].toString());
			if(a[6] != null) o.setCreateDate((Date) a[6]);
			if(a[7] != null) o.setCreateBy(a[7].toString());
			if(a[8] != null) o.setUpdateDate((Date) a[8]);
			if(a[9] != null) o.setUpdateBy(a[9].toString());
			
			l.add(o);
		}	
		
		return l;
	}
	
	public List<ProjectEntity> searchProjectByCreateDate(Date date){
		String sql = "SELECT t FROM ProjectEntity t WHERE DATE(t.createDate) = ?1";
		TypedQuery<ProjectEntity> query = entityManager.createQuery(sql, ProjectEntity.class).setParameter(1, date);
		return query.getResultList();
	}
	
	public List<ProjectEntity> searchProjectByBoth(Date date, String code){
		String sql = "SELECT t FROM ProjectEntity t WHERE DATE(t.createDate) = ?1 AND t.projectCode LIKE ?2";
		TypedQuery<ProjectEntity> query = entityManager.createQuery(sql, ProjectEntity.class).setParameter(1, date).setParameter(2, "%"+code+"%");
		return query.getResultList();
	}
	
	public List<HolidayEntity> searchHoliday(Date start, Date end, String name){
		String sql = "SELECT t FROM HolidayEntity t WHERE DATE(t.holidayDate) BETWEEN :start AND :end AND ( IFNULL(:name1,'') = '' OR t.holidayName LIKE :name2) ORDER BY t.holidayDate ASC";
		TypedQuery<HolidayEntity> query = entityManager.createQuery(sql, HolidayEntity.class).setParameter("start", start).setParameter("end", end).setParameter("name1", name).setParameter("name2", "%"+name+"%");
		return query.getResultList();
	}
	
	public List<OfficeEntity> searchOffice(String name, String type){
		String sql = "SELECT t FROM OfficeEntity t WHERE (t.officeName LIKE ?1 AND t.officeType LIKE ?2)";
		TypedQuery<OfficeEntity> query = entityManager.createQuery(sql, OfficeEntity.class).setParameter(1, "%"+name+"%").setParameter(2, "%"+type+"%");
		return query.getResultList();
	}
	
	public List<PositionEntity> searchPosition(String name, String type){
		String sql = "SELECT t FROM PositionEntity t WHERE (t.positionName LIKE ?1 AND t.officeType LIKE ?2 )";
		TypedQuery<PositionEntity> query = entityManager.createQuery(sql, PositionEntity.class).setParameter(1, "%"+name+"%").setParameter(2, "%"+type+"%");
		return query.getResultList();
	}
	
	@Transactional
	public void deleteSystem(Integer id){
		SystemEntity systemEntity = entityManager.find(SystemEntity.class, id);
		entityManager.remove(systemEntity);
    }
	
	@Transactional
	public void deleteProject(Integer id){
		ProjectEntity projectEntity = entityManager.find(ProjectEntity.class, id);
		entityManager.remove(projectEntity);
    }
	
	@Transactional
	public void deleteHoliday(Integer id){
		HolidayEntity holiEntity = entityManager.find(HolidayEntity.class, id);
		entityManager.remove(holiEntity);
    }
	
	@Transactional
	public void deleteOffice(Integer id){
		OfficeEntity officeEntity = entityManager.find(OfficeEntity.class, id);
		entityManager.remove(officeEntity);
    }
	
	@Transactional
	public void deletePosition(Integer id){
		PositionEntity positionEntity = entityManager.find(PositionEntity.class, id);
		entityManager.remove(positionEntity);
    }
	
	public List<UserModel> login(UserModel m){
		Query query = entityManager.createNativeQuery("SELECT "+
				"t.user_id, t.user_name, t.password, t.person_name, t.position_name, t.office_name, t.user_role, t.active_flag "
				+"FROM tb_user t "
				+"WHERE "+"t.user_name = :username AND t.password = :password");
		
		query.setParameter("username", m.getUserName());
		query.setParameter("password", m.getPassword());
		
		List<Object[]> objects = query.getResultList();
		List<UserModel> l = new ArrayList<UserModel>();
		
		for (Object[] a : objects) {
			UserModel o = new UserModel();
			o.setUserId(new Integer(a[0].toString()));
			if(a[1] != null) o.setUserName(a[1].toString());
			if(a[2] != null) o.setPassword(a[2].toString());
			if(a[3] != null) o.setPersonName(a[3].toString());
			if(a[4] != null) o.setPositionName(a[4].toString());
			if(a[5] != null) o.setOfficeName(a[5].toString());
			if(a[6] != null) o.setUserRole(a[6].toString());
			if(a[7] != null) o.setActiveFlag(a[7].toString());
			
			l.add(o);
		}	
		return l;
	}
	
	public List<MenuModel> getMenu(String role) {
		Query query = entityManager.createNativeQuery("SELECT m.menu_id, m.menu_name, m.parent_menu_id, m.program_code, m.order_no , m.level, m.icon_name, m.active_flag "
				+ "FROM tb_menu m "
				+ "INNER JOIN tb_role_menu rm ON (m.menu_id = rm.menu_id) "
				+ "WHERE m.level = 1 "
				+ "AND rm.role = :role "
				+ "ORDER BY m.order_no ASC ");
		query.setParameter("role", role);

		List<Object[]> objects = query.getResultList();		
		List<MenuModel> l = new ArrayList<MenuModel>();		
					
		for (Object[] a : objects) {
			MenuModel o = new MenuModel();
			o.setMenuId(new Integer(a[0].toString()));
			if(a[1] != null) o.setMenuName(a[1].toString());
			if(a[2] != null) o.setParentMenuId(new Integer(a[2].toString()));
			if(a[3] != null) o.setProgramCode(a[3].toString());
			if(a[4] != null) o.setOrderNo(a[4].toString());
			if(a[5] != null) o.setLevel(new Integer(a[5].toString()));
			if(a[6] != null) o.setIconName(a[6].toString());
			if(a[7] != null) o.setActiveFlag(a[7].toString());
			
			Query query2 = entityManager.createNativeQuery("SELECT m.menu_id, m.menu_name, m.parent_menu_id, m.program_code, m.order_no, m.level, m.icon_name, m.active_flag "
					+ "FROM tb_menu m "
					+ "INNER JOIN tb_role_menu rm ON (m.menu_id = rm.menu_id) "
					+ "WHERE m.level = 2 "
					+ "AND rm.role = :role "
					+ "AND m.parent_menu_id = :parent_menu_id "
					+ "ORDER BY m.order_no ASC ");
			query2.setParameter("role", role);
			query2.setParameter("parent_menu_id", o.getMenuId());
			
			
			List<Object[]> objects2 = query2.getResultList();					
			List<MenuModel> l2 = new ArrayList<MenuModel>();	
			
			for (Object[] a2 : objects2) {
				MenuModel o2 = new MenuModel();
				o2.setMenuId(new Integer(a2[0].toString()));		
				if(a2[1] != null) o2.setMenuName(a2[1].toString());
				if(a2[2] != null) o2.setParentMenuId(new Integer(a2[2].toString()));	
				if(a2[3] != null) o2.setProgramCode(a2[3].toString());
				if(a2[4] != null) o2.setOrderNo(a2[4].toString());
				if(a2[5] != null) o2.setLevel(new Integer(a2[5].toString()));
				if(a2[6] != null) o2.setIconName(a2[6].toString());
				if(a2[7] != null) o2.setActiveFlag(a2[7].toString());
				
				l2.add(o2);
			}
						
			o.setMenus(l2);
			l.add(o);
		}
		
		return l;
				
	}
}
