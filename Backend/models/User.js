import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{String,
            required:true,
            trim:true,
        },

        email:{
            type:String,
            trim:true,
            required:true,
            lowercase:true,
            unique:true,
        },

        password:{
            type:String,
            required:true,
        },

        role:{
            type:String,
            enum:["Admin","Inspector","Officer","Verifier"],
            required:true,
        },

        department:{
            type:String,
            default:"complience",
        },

        isActive:{
            type:Boolean,
            default:true,
        },

    },

    {timestamps:true}
)


export default mongoose.model("User",userSchema);