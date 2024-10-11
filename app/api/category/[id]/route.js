import Category from "@/models/Category";
import { connectToDB } from "@/utils/database";

export async function GET(request, { params }) {
    try {
        await connectToDB();
        const id = params.id;
        const category = await Category.findById(id);
        
        if (!category) {
            return Response.json({ error: "Category not found" }, { status: 404 });
        }
        
        return Response.json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = params.id;
    try {
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            return Response.json({ error: "Category not found" }, { status: 404 });
        }
        return Response.json(category);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}