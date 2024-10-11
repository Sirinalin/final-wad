import Category from "@/models/Category";

export async function GET(request, { params }) {
    const id = params.id;
    const category = await Category.findById(id)
    return Response.json(category);
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