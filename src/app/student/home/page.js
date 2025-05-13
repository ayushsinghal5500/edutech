"use client";
import React from 'react';


const StudentDashboard = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to the Student Dashboard</h1>
            <p>You have successfully logged in/registered.</p>
            <div style={{ marginTop: '20px' }}>
                <h2>Quick Links</h2>
                <ul>
                    <li><a href="/courses">View Courses</a></li>
                    <li><a href="/profile">Edit Profile</a></li>
                    <li><a href="/settings">Account Settings</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default StudentDashboard;