import mongoose, { Model, Schema } from 'mongoose';
import { ITask } from '../interfaces';


const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    title: { type: String },
    message: { type: String },
    observation: { type: String },
    createdAt: { type: Date, default: new Date() },
    priority: {
        type: String,
        enum: { 
            values: ['low','mid','high'],
            message: '{VALUE} no es una prioridad con valor no permitido'
        },
        default: 'onhold',
    },
    images: [{ type: String }],
    status: {
        type: String,
        enum: { 
            values: ['onhold','open','close','cancel'],
            message: '{VALUE} no es un status permitido'
        },
        default: 'onhold',
    },
    type: {
        type: String,
    },
    chatItem: [{
        email   : { type: String },
        message   : { type: String },
        createdAt: { type: Number },
    }],
});


const TaskModel: Model<ITask> = mongoose.models.Task || mongoose.model('Task', taskSchema );

export default TaskModel;