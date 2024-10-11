import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
  await dbConnect();
  const customer = await Customer.findById(params.id);
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const customer = await Customer.findByIdAndDelete(params.id);
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json({ message: "Customer deleted successfully" });
}