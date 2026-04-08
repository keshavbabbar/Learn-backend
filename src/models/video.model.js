import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFie: {
        type: String,
        requried: true
    },
    thumbnail: {
        type: String,
        requried: true
    },
    title: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        requried: true
    },
    duration: {
        type: String,
        requried: true
    },
    isPublish: {
        type: String,
        requried: true
    },
    views: {
        type: String,
        requried: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)