package pccth.sp.pccthspseedservice.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModel {
	private Integer userId;
	private String userName;
	private String password;
	private String personName;
	private String positionName;
	private String officeName;
	private String userRole;
	private String activeFlag;
}
