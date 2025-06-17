import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";

export default function Profile() {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
                {/* Header section */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Image */}
                    <div className="w-40 h-40">
                        <img
                            src="https://avatars.githubusercontent.com/u/583231?v=4"
                            alt="Profile"
                            className="w-full h-full object-cover rounded-lg border"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800">{user?.name || "Loading..."}</h2>
                        <p className="text-gray-500">@{user?.name?.toLowerCase().replace(/\s+/g, "") || "username"}</p>
                        <p className="mt-2 text-gray-600">Email: {user?.email}</p>
                        <p className="text-gray-600">Joined: {new Date(user?.createdAt).toDateString() || "N/A"}</p>

                        {/* Buttons */}
                        <div className="mt-4 flex gap-3 justify-center md:justify-start">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Export Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
