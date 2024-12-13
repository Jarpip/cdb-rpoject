package pccth.sp.pccthspseedservice.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tb_system", catalog="db_master")
@Getter
@Setter
public class SystemEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "system_id", unique = true, nullable = false)
	private Integer systemId;
	
	@OneToMany(        
		cascade = CascadeType.ALL,
		orphanRemoval = true
	)
    @JoinColumn(name = "system_id")
    private List<SystemProjectEntity> systemProject = new ArrayList<SystemProjectEntity>();	

	@Column(name = "system_code")
	private String systemCode;
	
	@Column(name = "system_name")
	private String systemName;
	
	@Column(name = "remark")
	private String remark;
	
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
