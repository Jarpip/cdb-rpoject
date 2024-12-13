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
@Table(name="tb_menu", catalog="db_master")
@Getter
@Setter
public class MenuEntity {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id", unique = true, nullable = false)
	private Integer menuId;
	
	@Column(name = "menu_name")
	private String menuName;
	
	@Column(name = "parent_menu_id")
	private Integer parentMenuId;
	
	@Column(name = "program_code")
	private String programCode;
	
	@Column(name = "order_no")
	private String orderNo;
	
	@Column(name = "level")
	private Integer level;
	
	@Column(name = "icon_name")
	private String iconName;
	
	@Column(name = "active_flag")
	private String activeFlag;
}
