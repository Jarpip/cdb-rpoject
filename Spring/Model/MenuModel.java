package pccth.sp.pccthspseedservice.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuModel {
	Integer menuId;
	String menuName;
	Integer parentMenuId;
	String programCode;
	String orderNo;
	Integer level;
	String iconName;
	String activeFlag;
	
	List<MenuModel> menus;
}
