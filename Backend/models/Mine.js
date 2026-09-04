import mongoose from "mongoose";

 const mineSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },

        location:{
            type:String,
            required:true,
        },

        latitude:{
            type:String,
            required:true,
        },

         longitude:{
            type:String,
            required:true,
        },

        complianceScore:{
            type:String,
            enum:["Compliant","Warning","High Risk"],
            default:"low",
        },

        totalInspections:{
            type:Numbeer,
            default:0,
        },
        openIssues:{
            type:Number,
            default:0,
        },

    },
    {timestamps:true}
 );

 export default mongoose.model("Mine",mineSchema);

