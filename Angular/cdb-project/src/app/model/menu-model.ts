export class MenuModel{
    menuId!: number;
    menuName: string = '';
    parentMenuId!: number;
	programCode: string = '';
	orderNo: string = '';
	level!: number;
	iconName: string = '';
	activeFlag: string = '';
    menus: Array<MenuModel> = [];
}