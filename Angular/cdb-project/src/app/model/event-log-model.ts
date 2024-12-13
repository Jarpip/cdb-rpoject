export class EventLog{
    eventLogId!: number;
    eventType: string = "";
    eventSubType: string = "";
    dataId!: number;
    userLogin: string = "";
    personName: string = "";
    positionName: string = "";
    officeName: string = "";
    remark: string = "";
    eventDate!: Date | null;
}