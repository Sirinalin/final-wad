"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerPage() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  console.log('APIBASE:', APIBASE); // Add this line for debugging
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCustomers() {
    if (!APIBASE) {
      console.error('API URL is not defined');
      return;
    }
    try {
      const response = await fetch(`${APIBASE}/customer`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const c = await response.json();
      setCustomers(c);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const startEdit = (customer) => () => {
    setEditMode(true);
    reset(customer);
  };

  const deleteCustomer = (id) => async () => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`${APIBASE}/customer/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete customer: ${response.status}`);
      }

      alert("Customer deleted successfully");
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert(error.message);
    }
  };

  const createOrUpdateCustomer = async (data) => {
    const url = `${APIBASE}/customer`;
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? "update" : "add"} customer: ${response.status}`);
      }

      alert(`Customer ${editMode ? "updated" : "added"} successfully`);
      reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
      setEditMode(false);
      fetchCustomers();
    } catch (error) {
      console.error(`Error ${editMode ? "updating" : "adding"} customer:`, error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-row gap-4 p-4">
      <div className="flex-1 w-64">
        <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Customer" : "Add New Customer"}</h2>
        <form onSubmit={handleSubmit(createOrUpdateCustomer)} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              {...register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth:</label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Member Number:</label>
            <input
              type="number"
              {...register("memberNumber", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Interests:</label>
            <textarea
              {...register("interests")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                editMode ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {editMode ? "Update Customer" : "Add Customer"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
                  setEditMode(false);
                }}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="flex-1 w-64">
        <h2 className="text-2xl font-bold mb-4">Customer List</h2>
        <ul className="space-y-2">
          {customers.map((customer) => (
            <li key={customer._id} className="border p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="font-bold">{customer.name}</span>
                <div>
                  <button
                    onClick={startEdit(customer)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deleteCustomer(customer._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div>Member Number: {customer.memberNumber}</div>
              <div>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</div>
              {customer.interests && <div>Interests: {customer.interests}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}