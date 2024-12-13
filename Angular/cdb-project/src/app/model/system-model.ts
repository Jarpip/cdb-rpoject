import { SysProjModel } from "./system-project-model";

export class SysModel{
    systemId!: number;
    systemName:string = '';
    systemCode:string = '';
    systemProject: Array<SysProjModel> = [];
    remark: string = '';
    createDate!: Date | null;
    createBy:string = 'pip';
    updateDate!: Date | null;
    updateBy: string = ''
}