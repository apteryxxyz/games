import { Validate, createSlugWithTransliteration } from '@qwaroo/common';
import { Game as GameEntity } from '@qwaroo/types';
import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';
import { Score, type ScoreDocument } from './Score';
import { User, type UserDocument } from './User';

export interface GameMethods {
    /** Get the user that created this game. */
    getCreator(): Promise<UserDocument>;
    /** Get all of the user scores for this game. */
    getScores(): Promise<ScoreDocument[]>;
}

export interface GameDocument extends GameEntity, GameMethods, Document {
    id: string;
}

export interface GameModel extends Model<GameEntity, {}, GameMethods> {}

const GameSchema = new Schema<GameEntity, GameModel, undefined, GameMethods>(
    {
        // Identifers
        slug: {
            type: String,
            required: true,
            unique: true,
            match: Validate.Slug,
            default(this: GameDocument) {
                return createSlugWithTransliteration(this.title);
            },
        },

        // Creator
        creatorId: {
            type: String,
            required: true,
            match: Validate.ObjectId,
        },

        // Flags
        publicFlags: {
            type: Number,
            required: true,
            default: 0,
        },

        // Information
        mode: {
            type: String,
            enum: GameEntity.Mode,
            required: true,
        },

        title: {
            type: String,
            required: true,
            match: Validate.Title,
        },

        shortDescription: {
            type: String,
            required: true,
            match: Validate.ShortDescription,
        },

        longDescription: {
            type: String,
            required: true,
            match: Validate.LongDescription,
        },

        thumbnailUrl: {
            type: String,
            required: true,
            match: Validate.ThumbnailURL,
        },

        categories: {
            type: [String],
            required: true,
        },

        data: {
            type: Schema.Types.Mixed,
            required: true,
        },

        // Highscore
        highScore: {
            type: Number,
            required: false,
        },

        highScoreTime: {
            type: Number,
            required: false,
        },

        highScoreTimestamp: {
            type: Number,
            required: false,
        },

        // Statistics
        totalScore: {
            type: Number,
            required: true,
            default: 0,
        },

        totalTime: {
            type: Number,
            required: true,
            default: 0,
        },

        totalPlays: {
            type: Number,
            required: true,
            default: 0,
        },

        // Timestamps
        createdTimestamp: {
            type: Number,
            required: true,
            default: Date.now,
        },

        updatedTimestamp: {
            type: Number,
            required: true,
            default: Date.now,
        },

        lastPlayedTimestamp: {
            type: Number,
            required: true,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

GameSchema.method('getCreator', function getCreator(this: GameDocument) {
    return User.findById(this.creatorId).exec();
});

GameSchema.method('getScores', function getScores(this: GameDocument) {
    return Score.find({ gameId: this.id }).exec();
});

export const Game = model<GameEntity, GameModel>('Game', GameSchema);
