export class PositionModel{
    positionId!: number;
    positionName: string = "";
    officeType: string = "";
    orderNo!: number;
    createDate!: Date | null;
    createBy:string = 'pip';
    updateDate!: Date | null;
    updateBy: string = ''
}