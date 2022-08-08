import { IUser } from './';

export interface ITask {
    _id? : string;
    clientEmail? :string;
    client? : any;
    userId?: IUser;
    createdby?: string;
    user?: string;
    owners?: string[];
    images?: string[];
    new? :boolean;

    chatItems?: IChatItem[];

    priority?: ITaskPriority;
    type?: ITaskType | null;
    title?: string;
    service?: string;
    company?: string;
    email?: string;
    software?: string;
    serial?: string;
    message?: string;
    duration?: number;
    closuredate?: string;
    startdate?: string;

    status  ?:ITaskType;
    tags?: string[];

    createdAt?: string;
    updatedAt?: string;
}


export interface IChatItem {
    _id      : string;
    message  : string;
   // user?: IUser | string;
    owner?: IUser | string;
}

export type ITaskType = 'onhold'|'open'|'close'|'cancel';
export type ITaskPriority = 'low'|'mid'|'high';

