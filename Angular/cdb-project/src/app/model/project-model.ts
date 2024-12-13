export class ProjModel{
    projectId!:number;
    projectName:string = '';
    projectCode:string = '';
    contractNo:string = '';
    contractDate!:Date | null;
    remark: string = '';
    createDate!: Date | null;
    createBy:string = 'pip';
    updateDate!: Date | null;
    updateBy: string = ''
}