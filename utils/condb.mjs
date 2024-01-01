import {mongoose} from "mongoose";

mongoose.connect("mongodb+srv://vvarve:user123@cluster0.jl5xsbs.mongodb.net/?retryWrites=true&w=majority")
    .then(data => console.log("MONGOdb connected"))
    .catch(err => console.log("MONGOdb NOT connect"))




