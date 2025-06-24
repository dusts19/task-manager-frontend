'use client';

import React from 'react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
    return (
        <main className="max-w-2xl mx-auto py-12 px-6 bg-white rounded shadow-md overflow-y-auto dark:bg-[#1E1E1E]">
            <h1 className="text-3xl font-semibold text-[#2B2B2B] mb-4 dark:text-[#E0E0E0]">About Daily Director</h1>
            <p className="text-gray-700 mb-6 dark:text-[#A0A0A0]">
                Daily Director is a full-stack web application designed to help you stay organized and productive.
                Built with React, Spring Boot, PostgreSQL, and Docker, it offers user authentication,
                task CRUD operations, custom filtering, and responsive design.
            </p>
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-2 dark:text-[#E0E0E0]">
                Core Features:
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 dark:text-[#A0A0A0]">
                 <li>User authentication (registration, login, logout)</li>
                 <li>Create, edit, delete, and mark tasks as complete</li>
                 <li>Filter tasks by priority, category, date, or completion status</li>
                 <li>Responsive sidebar, modals, and accessibility-friendly UI</li>
                 <li>Containerized backend using Docker; REST API built with Spring Boot</li>
                 <li>Backend unit tests using JUnit and Spring Boot Test</li>
            </ul>
            <div className="text-gray-700 mb-6 dark:text-[#A0A0A0]">
                <p className="dark:text-[#E0E0E0]">
                    Feel free to use demo login:
                    <br />
                    <strong className="dark:text-[#E0E0E0]">Username:</strong> <span className="font-medium dark:text-[#A0A0A0]">Demo</span> | {' '}
                    <strong className="dark:text-[#E0E0E0]">Password:</strong> <span className="font-medium dark:text-[#A0A0A0]">demo</span>
                </p>   
            </div>
            <div className="">
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        </main>

    )
}

export default AboutPage;