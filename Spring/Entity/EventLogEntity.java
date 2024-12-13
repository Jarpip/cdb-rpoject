package pccth.sp.pccthspseedservice.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tb_event_log", catalog="db_master")
@Getter
@Setter
public class EventLogEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "event_log_id", unique = true, nullable = false)
	private Integer eventLogId;

	@Column(name = "event_type")
	private String eventType;
		
	@Column(name = "event_sub_type")
	private String eventSubType;
	
	@Column(name = "data_id")
	private Integer dataId;
	
	@Column(name = "user_login")
	private String userLogin;
	
	@Column(name = "person_name")
	private String personName;
	
	@Column(name = "position_name")
	private String positionName;
	
	@Column(name = "office_name")
	private String officeName;
	
	@Column(name = "remark")
	private String remark;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "event_date")
	private Date eventDate;
}
