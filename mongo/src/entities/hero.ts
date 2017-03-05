import { Document } from '@gabliam/mongoose';
import * as mongoose from 'mongoose';
export interface HeroModel {
    name: string;
    power: string;
    amountPeopleSaved: number;
    createdAt?: Date;
    modifiedAt?: Date;
}

@Document('Hero')
export class Hero {
    static getSchema() {
        return new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            amountPeopleSaved: {
                type: Number,
                required: false
            },
            createdAt: {
                type: Date,
                required: false
            },
            modifiedAt: {
                type: Date,
                required: false
            }
        }).pre('save', function (next) {
            if (this._doc) {
                let doc = <HeroModel>this._doc;
                let now = new Date();
                if (!doc.createdAt) {
                    doc.createdAt = now;
                }
                doc.modifiedAt = now;
            }
            next();
            return this;
        });
    }
}