package pccth.sp.pccthspseedservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pccth.sp.pccthspseedservice.entity.EventLogEntity;
import pccth.sp.pccthspseedservice.entity.HolidayEntity;
import pccth.sp.pccthspseedservice.entity.OfficeEntity;
import pccth.sp.pccthspseedservice.entity.PositionEntity;
import pccth.sp.pccthspseedservice.entity.ProjectEntity;
import pccth.sp.pccthspseedservice.entity.SystemEntity;
import pccth.sp.pccthspseedservice.entity.UserEntity;
import pccth.sp.pccthspseedservice.model.MenuModel;
import pccth.sp.pccthspseedservice.model.UserModel;
import pccth.sp.pccthspseedservice.repository.HolidayJPARepository;
import pccth.sp.pccthspseedservice.repository.OfficeJPARepository;
import pccth.sp.pccthspseedservice.repository.PositionJPARepository;
import pccth.sp.pccthspseedservice.repository.SystemProjectJPARespository;
import pccth.sp.pccthspseedservice.repository.CentralDataBaseJdbcRepository;
import pccth.sp.pccthspseedservice.repository.EventLogJPARepository;
import pccth.sp.pccthspseedservice.repository.ProjectJPARepository;
import pccth.sp.pccthspseedservice.repository.SystemJPARepository;
import pccth.sp.pccthspseedservice.service.CentralDataBaseService;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("cdbctrl")
public class CentralDataBaseController {
	
	@Autowired
	private SystemJPARepository systemJPARepo;
	
	@Autowired
	private SystemProjectJPARespository systemProjectJPARepo;
	
	@Autowired
	private ProjectJPARepository projectJPARepo;
	
	@Autowired
	private HolidayJPARepository holidayJPARepo;
	
	@Autowired
	private OfficeJPARepository officeJPARepo;
	
	@Autowired
	private PositionJPARepository positionJPARepo;
	
	@Autowired
	private EventLogJPARepository eventLogJPARepo;
	
	@Autowired
	private CentralDataBaseJdbcRepository jdbcRepo;
	
	
	@Autowired
    private CentralDataBaseService testService;
	
/////////////////////////////////////////////////////////////////////
	
	//เพิ่ม อัพเดท และลบ
	@PostMapping("/addSystem")
	public void addSystem(@RequestBody SystemEntity data){
		systemJPARepo.save(data);
	}
	
	@PostMapping("/updateSystem")
	public void updateSystem(@RequestBody SystemEntity data){
		systemJPARepo.save(data);
	}
	
	@PostMapping("/addProject")
	public void addProject(@RequestBody ProjectEntity data){
		projectJPARepo.save(data);
	}
	
	@PostMapping("/updateProject")
	public void updateProject(@RequestBody ProjectEntity data){
		projectJPARepo.save(data);
	}
	
	@PostMapping("/addHoliday")
	public void addHoliday(@RequestBody HolidayEntity data){
		holidayJPARepo.save(data);
	}
	
	@PostMapping("/updateHoliday")
	public void updateHoliday(@RequestBody HolidayEntity data){
		holidayJPARepo.save(data);
	}
	
	@PostMapping("/addOffice")
	public void addOffice(@RequestBody OfficeEntity data){
		officeJPARepo.save(data);
	}
	
	@PostMapping("/updateOffice")
	public void updateOffice(@RequestBody OfficeEntity data){
		officeJPARepo.save(data);
	}
	
	@PostMapping("/addPosition")
	public void addPosition(@RequestBody PositionEntity data){
		positionJPARepo.save(data);
	}
	
	@PostMapping("/updatePosition")
	public void updatePosition(@RequestBody PositionEntity data){
		positionJPARepo.save(data);
	}
	
	@PostMapping("/deleteSystem")
    public void deleteSystem(@RequestParam("system_id") Integer id){
        testService.deleteSystem(id);
    }
	
	@PostMapping("/deleteSystemProject")
    public void deleteSystemProject(@RequestParam("system_project_id") Integer id){
        systemProjectJPARepo.deleteById(id);
    }
	
	@PostMapping("/deleteProject")
    public void deleteProject(@RequestParam("project_id") Integer id){
        testService.deleteProject(id);
    }
	
	@PostMapping("/deleteHoliday")
    public void deleteHoliday(@RequestParam("holiday_id") Integer id){
        jdbcRepo.deleteHoliday(id);
    }
	
	@PostMapping("/deleteOffice")
    public void deleteOffice(@RequestParam("office_id") Integer id){
        jdbcRepo.deleteOffice(id);
    }
	
	@PostMapping("/deletePosition")
    public void deletePosition(@RequestParam("position_id") Integer id){
        jdbcRepo.deletePosition(id);
    }
	
/////////////////////////////////////////////////////////////////////
	
	//ดึงข้อมูลจาก id
	@GetMapping("get/{system_id}")
	public @ResponseBody Optional<SystemEntity> findSystemById(@PathVariable(value = "system_id") Integer systemId){
		Optional<SystemEntity> result = systemJPARepo.findById(systemId);
		return result;
	}
	
	@GetMapping("getProject/{project_id}")
	public @ResponseBody Optional<ProjectEntity> findProjectById(@PathVariable(value = "project_id") Integer projectId){
		Optional<ProjectEntity> result = projectJPARepo.findById(projectId);
		return result;
	}
	
	@GetMapping("getHoliday/{holiday_id}")
	public @ResponseBody Optional<HolidayEntity> findHolidayById(@PathVariable(value = "holiday_id") Integer holidayId){
		Optional<HolidayEntity> result = holidayJPARepo.findById(holidayId);
		return result;
	}
	
	@GetMapping("getOffice/{office_id}")
	public @ResponseBody Optional<OfficeEntity> findOfficeById(@PathVariable(value = "office_id") Integer officeId){
		Optional<OfficeEntity> result = officeJPARepo.findById(officeId);
		return result;
	}
	
	@GetMapping("getPosition/{position_id}")
	public @ResponseBody Optional<PositionEntity> findPositionById(@PathVariable(value = "position_id") Integer positionId){
		Optional<PositionEntity> result = positionJPARepo.findById(positionId);
		return result;
	}
	
/////////////////////////////////////////////////////////////////////
	
	//ดึงข้อมูลทั้งหมด
	@GetMapping("/findAllProj")
	public List<ProjectEntity> findAllProj(){
		return projectJPARepo.findAllByOrderByProjectNameAsc();
	}
	
	@GetMapping("/findAllHoliday")
	public List<HolidayEntity> findAllHoliday(){
		return holidayJPARepo.findAllByOrderByHolidayDateAsc();
	}
	
	@GetMapping("/findAllSys")
	public List<SystemEntity> findAllSys(){
		return systemJPARepo.findAllByOrderBySystemNameAsc();
	}
	
	@GetMapping("/findAllOffice")
	public List<OfficeEntity> findAllOffice(){
		return officeJPARepo.findAll();
	}
	
	@GetMapping("/findAllPosition")
	public List<PositionEntity> findAllPosition(){
		return positionJPARepo.findAll();
	}

/////////////////////////////////////////////////////////////////////
	
	//search
	@GetMapping("/searchSystemByCode")
	public Object searchSystemByCode(@RequestParam("system_code") String code){
		return testService.searchSystemByCode(code);
	}
	
	@GetMapping("/searchSystemByCreateDate")
	public Object searchSystemByCreateDate(@RequestParam("create_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date){
		return testService.searchSystemByCreateDate(date);
	}
	
	@GetMapping("/searchSystemByBoth")
	public Object searchSystemByBoth(@RequestParam("create_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, @RequestParam("system_code") String code){
		return testService.searchSystemByBoth(date, code);
	}

	@GetMapping("/searchProjectByCode")
	public Object searchProjectByCode(@RequestParam("project_code") String code){
		return jdbcRepo.searchProjectByCode(code);
	}
	
	@GetMapping("/searchProjectByCreateDate")
	public Object searchProjectByCreateDate(@RequestParam("create_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date){
		return jdbcRepo.searchProjectByCreateDate(date);
	}
	
	@GetMapping("/searchProjectByBoth")
	public Object searchProjectByBoth(@RequestParam("create_date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, @RequestParam("project_code") String code){
		return jdbcRepo.searchProjectByBoth(date, code);
	}
	
	
	@GetMapping("/searchHoliday")
	public Object searchHoliday(@RequestParam("start") @DateTimeFormat(pattern="yyyy-MM-dd") Date start,@RequestParam("end") @DateTimeFormat(pattern="yyyy-MM-dd") Date end,
			@RequestParam("holiday_name") String name){
		return jdbcRepo.searchHoliday(start, end, name);
	}
	
	@GetMapping("/searchOffice")
	public Object searchOffice(@RequestParam("office_name") String name,@RequestParam("office_type") String type){
		return jdbcRepo.searchOffice(name, type);
	}
	
	@GetMapping("/searchPosition")
	public Object searchPosition(@RequestParam("position_name") String name,@RequestParam("office_type") String type){
		return jdbcRepo.searchPosition(name, type);
	}
	
	@PostMapping("/login")
	public @ResponseBody List<UserModel> login(@RequestBody UserModel m){
		return jdbcRepo.login(m);
	}
	
	@PostMapping("/addEventLog")
	public void addEventLog(@RequestBody EventLogEntity event){
		eventLogJPARepo.save(event);
	}
	
	@GetMapping("getMenu/{user_role}")		
	public @ResponseBody List<MenuModel> getMenu(@PathVariable(value = "user_role") String role) {
		return jdbcRepo.getMenu(role);
	}

}
