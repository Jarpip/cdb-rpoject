package pccth.sp.pccthspseedservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tb_user", catalog="db_master")
@Getter
@Setter
public class UserEntity {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", unique = true, nullable = false)
	private Integer userId;

	@Column(name = "user_name")
	private String userName;
		
	@Column(name = "password")
	private String password;
	
	@Column(name = "person_name")
	private String personName;
	
	@Column(name = "position_name")
	private String positionName;
	
	@Column(name = "office_name")
	private String officeName;
	
	@Column(name = "user_role")
	private String userRole;
	
	@Column(name = "active_flag")
	private String activeFlag;
	
}
