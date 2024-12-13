export class OfficeModel{
    officeId!: number;
    officeName: string = "";
    officeType: string = "";
    orderNo!: number;
    officeColor: string = "";
    createDate!: Date | null;
    createBy:string = 'pip';
    updateDate!: Date | null;
    updateBy: string = ''
}