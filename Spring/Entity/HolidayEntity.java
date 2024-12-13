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
@Table(name="tb_holiday", catalog="db_master")
@Getter
@Setter
public class HolidayEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "holiday_id", unique = true, nullable = false)
	private Integer holidayId;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "holiday_date")
    private Date holidayDate;
	
	@Column(name = "holiday_name")
    private String holidayName;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createDate;
	
	@Column(name = "create_by")
    private String createBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date")
	private Date updateDate;
	
	@Column(name = "update_by")
	private String updateBy;
}
