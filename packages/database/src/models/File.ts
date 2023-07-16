import type { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import {
    ModelOptions,
    Pre,
    Prop,
    Ref,
    Severity,
    getModelForClass,
} from '@typegoose/typegoose';
import _ from 'lodash';
import mongoose, { SchemaTypes } from 'mongoose';
import type { User } from './User';

@ModelOptions({
    options: { customName: 'File', allowMixed: Severity.ALLOW },
    schemaOptions: {
        toJSON: {
            transform(document, record) {
                return {
                    id: document._id?.toString(),
                    ..._.omit(record, ['_id', '__v', 'tokenData']),
                } as File.Entity;
            },
        },
    },
})
@Pre('save', async function save(this: File.Document) {
    this.updatedAt = new Date();
})
export class File {
    public id!: string;

    @Prop({ ref: 'User', required: true, autopopulate: true })
    public uploader!: Ref<User>;

    @Prop({ required: true })
    public hash!: string;

    @Prop({ required: true })
    public type!: string;

    @Prop({ required: true })
    public length!: number;

    @Prop({ type: () => SchemaTypes.Mixed, default: {} })
    public metadata: Record<string, unknown> = {};

    @Prop({ default: Date.now() })
    public createdAt: Date = new Date();

    @Prop()
    public updatedAt!: Date;
}

export namespace File {
    export const Model =
        (mongoose.models['File'] as ReturnModelType<typeof File>) ??
        getModelForClass(File);

    export type Entity = {
        [K in keyof File]: File[K] extends Function ? never : File[K];
    };

    export type Document = DocumentType<File>;
}
