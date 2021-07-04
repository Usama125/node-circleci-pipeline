import mongoose, { Schema } from 'mongoose';
import ICategory from '../interfaces/category';

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// this function will call whenever a new book will be created and we can do 
// Manipulate data before sending the response back 
// And the response will have that additional information
// BookSchema.post<IBook>('save', function() {
//     this.author = "Mr." + this.author;
//     this.extraInformation = "This is some extra information we want to put onto this entry after save"
// });

export default mongoose.model<ICategory>('Category', CategorySchema);