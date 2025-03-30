import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
    const navigate = useNavigate();
    const [activeEndpoint, setActiveEndpoint] = useState('get-all');
    const [openSections, setOpenSections] = useState<string[]>(['employee', 'department']);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to toggle a section open/closed
    const toggleSection = (section: string) => {
        setOpenSections(prev => {
            if (prev.includes(section)) {
                return prev.filter(s => s !== section);
            } else {
                return [...prev, section];
            }
        });
    };

    // Function to handle nav item click
    const handleNavItemClick = (endpoint: string) => {
        setActiveEndpoint(endpoint);
        
        // Hide all endpoint details
        const allEndpoints = document.querySelectorAll('.endpoint-detail');
        allEndpoints.forEach(el => el.classList.remove('active'));
        
        // Show the selected endpoint
        const selected = document.getElementById(endpoint);
        if (selected) selected.classList.add('active');
        
        // Close mobile menu when selecting an endpoint on mobile
        if (window.innerWidth <= 768) {
            setMobileMenuOpen(false);
        }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Set up event listeners on mount
    useEffect(() => {
        // Add click listeners to nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Stop event bubbling to prevent triggering parent section toggle
                e.stopPropagation();
                
                // Remove active class from all items
                navItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get endpoint from data attribute
                const endpoint = item.getAttribute('data-endpoint');
                if (endpoint) handleNavItemClick(endpoint);
            });
        });

        // Initialize with the default active endpoint
        handleNavItemClick('get-all');

        // Cleanup listeners on unmount
        return () => {
            navItems.forEach(item => {
                item.removeEventListener('click', () => {});
            });
        };
    }, []);

    return (
        <React.Fragment>
            <div className={`page-container ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                {/* Mobile menu toggle */}
                <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="sidebar-header">
                        <div onClick={() => {navigate('/mainak')}}>Mainak</div>
                        <h1 className="sidebar-title">Employee DB</h1>
                        <div onClick={() => {navigate('/api-doc')}}>API Docs</div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li className="nav-section" onClick={() => toggleSection('employee')}>
                                Employee Endpoints
                                <span className={`nav-section-chevron ${openSections.includes('employee') ? 'open' : ''}`}>▼</span>
                            </li>
                            <div className={`nav-section-content ${openSections.includes('employee') ? 'visible' : 'hidden'}`}>
                                <li className="nav-item active" data-endpoint="get-all">
                                    <span>
                                        Get All Employees <span className="method-tag get">GET</span>
                                    </span>
                                </li>
                                <li className="nav-item" data-endpoint="get-one">
                                    <span>
                                        Get Employee <span className="method-tag get">GET</span>
                                    </span>
                                </li>
                                <li className="nav-item" data-endpoint="create">
                                    <span>
                                        Create Employee <span className="method-tag post">POST</span>
                                    </span>
                                </li>
                                <li className="nav-item" data-endpoint="update">
                                    <span>
                                        Update Employee <span className="method-tag put">PUT</span>
                                    </span>
                                </li>
                                <li className="nav-item" data-endpoint="delete">
                                    <span>
                                        Delete Employee <span className="method-tag delete">DELETE</span>
                                    </span>
                                </li>
                            </div>

                            <li className="nav-section" onClick={() => toggleSection('department')}>
                                Department Endpoints
                                <span className={`nav-section-chevron ${openSections.includes('department') ? 'open' : ''}`}>▼</span>
                            </li>
                            <div className={`nav-section-content ${openSections.includes('department') ? 'visible' : 'hidden'}`}>
                                <li className="nav-item" data-endpoint="get-departments">
                                    <span>
                                        Get Departments <span className="method-tag get">GET</span>
                                    </span>
                                </li>
                                <li className="nav-item" data-endpoint="create-department">
                                    <span>
                                        Create Department <span className="method-tag post">POST</span>
                                    </span>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </aside>

                {/* Overlay for mobile menu */}
                <div 
                    className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} 
                    onClick={toggleMobileMenu}
                ></div>

                {/* Main Content */}
                <main className="content">
                    <div className="api-nav-button">
                        <button onClick={() => {navigate('/api-doc')}} className="view-api-docs">
                            View Pizza API Documentation
                        </button>
                    </div>
                    
                    {/* GET ALL EMPLOYEES */}
                    <section id="get-all" className="endpoint-detail active">
                        <div className="endpoint-header">
                            <div>
                                <h2 className="endpoint-title">
                                    Get All Employees <span className="badge">Developing</span>
                                </h2>
                                <div className="endpoint-url">
                                    <span className="method-tag get large">GET</span>
                                    <code>https://api.example.com/v1/employees</code>
                                </div>
                            </div>
                            <button className="try-it-btn">Try It</button>
                        </div>

                        {/* Request Section */}
                        <div className="request-section">
                            <h3>Request</h3>
                            {/* Query Params */}
                            <div className="param-group">
                                <h4>Query Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">page</div>
                                        <div className="param-type">integer</div>
                                        <div className="param-required">optional</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">limit</div>
                                        <div className="param-type">integer</div>
                                        <div className="param-required">optional</div>
                                    </div>
                                </div>
                            </div>
                            {/* Header Params */}
                            <div className="param-group">
                                <h4>Header Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">Authorization</div>
                                        <div className="param-type">string (Bearer token)</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">Content-Type</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* cURL Example */}
                        <div className="code-sample">
                            <h4>Request Example (cURL)</h4>
                            <pre>{String.raw`
curl --location --request GET 'https://api.example.com/v1/employees?page=1&limit=10' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json'
              `}</pre>
                        </div>

                        {/* Response Section */}
                        <div className="response-section">
                            <h3>Response</h3>
                            <div className="code-sample">
                                <h4>200 Success</h4>
                                <pre>{String.raw`
[
  {
    "_id": "67c7d4a80554a017d7c9ea39",
    "employee_id": "EM31566",
    "first_name": "Manuel",
    "last_name": "Jimenez",
    "email": "jesselittle@example.com",
    "phone_number": "607-948-2175x946",
    "hire_date": "2024-05-12",
    "job_title": "Engineer, civil (contracting)",
    "job_id": {"$numberInt": "393" },
    "gov_id": "874-62-1748",
    "hiring_manager_id": "E016",
    "hr_manager_id": "E013",
    "marital_status": "married",
    "state": "California",
    "emergency_contact_name": "Kenneth Andrews",
    "emergency_contact_phone": "001-740-564-0909x743",
    "sex": "Male",
    "department": "Lee, King and Campos",
    "date_of_birth": "1995-08-17",
    "status": "Active"
  }
  /* ... additional employees */
]
                `}</pre>
                            </div>
                        </div>
                    </section>

                    {/* GET ONE EMPLOYEE */}
                    <section id="get-one" className="endpoint-detail">
                        <div className="endpoint-header">
                            <div>
                                <h2 className="endpoint-title">
                                    Get Employee <span className="badge">Developing</span>
                                </h2>
                                <div className="endpoint-url">
                                    <span className="method-tag get large">GET</span>
                                    <code>
                                        https://api.example.com/v1/employees/{'{'}employee_id{'}'}
                                    </code>
                                </div>
                            </div>
                            <button className="try-it-btn">Try It</button>
                        </div>

                        <div className="request-section">
                            <h3>Request</h3>
                            {/* Path Params */}
                            <div className="param-group">
                                <h4>Path Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">employee_id</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                            {/* Header Params */}
                            <div className="param-group">
                                <h4>Header Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">Authorization</div>
                                        <div className="param-type">string (Bearer token)</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">Content-Type</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="code-sample">
                            <h4>Request Example (cURL)</h4>
                            <pre>{String.raw`
curl --location --request GET 'https://api.example.com/v1/employees/EM31566' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json'
              `}</pre>
                        </div>

                        <div className="response-section">
                            <h3>Response</h3>
                            <div className="code-sample">
                                <h4>200 Success</h4>
                                <pre>{String.raw`
{
  "_id": {"$oid": "67c7d4a80554a017d7c9ea39" },
  "employee_id": "EM31566",
  "first_name": "Manuel",
  "last_name": "Jimenez",
  "email": "jesselittle@example.com",
  "phone_number": "607-948-2175x946",
  "hire_date": "2024-05-12",
  "job_title": "Engineer, civil (contracting)",
  "job_id": {"$numberInt": "393" },
  "gov_id": "874-62-1748",
  "hiring_manager_id": "E016",
  "hr_manager_id": "E013",
  "marital_status": "married",
  "state": "California",
  "emergency_contact_name": "Kenneth Andrews",
  "emergency_contact_phone": "001-740-564-0909x743",
  "sex": "Male",
  "department": "Lee, King and Campos",
  "date_of_birth": "1995-08-17",
  "status": "Active"
}
                `}</pre>
                            </div>
                        </div>
                    </section>

                    {/* CREATE EMPLOYEE */}
                    <section id="create" className="endpoint-detail">
                        <div className="endpoint-header">
                            <div>
                                <h2 className="endpoint-title">
                                    Create Employee <span className="badge">Developing</span>
                                </h2>
                                <div className="endpoint-url">
                                    <span className="method-tag post large">POST</span>
                                    <code>https://api.example.com/v1/employees</code>
                                </div>
                            </div>
                            <button className="try-it-btn">Try It</button>
                        </div>

                        <div className="request-section">
                            <h3>Request</h3>
                            {/* Body Params */}
                            <div className="param-group">
                                <h4>JSON Body</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">employee_id</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">first_name</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    {/* Additional fields as needed */}
                                </div>
                            </div>
                            {/* Header Params */}
                            <div className="param-group">
                                <h4>Header Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">Authorization</div>
                                        <div className="param-type">string (Bearer token)</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">Content-Type</div>
                                        <div className="param-type">application/json</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="code-sample">
                            <h4>Request Example (cURL)</h4>
                            <pre>{String.raw`
curl --location --request POST 'https://api.example.com/v1/employees' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "employee_id": "EM50000",
  "first_name": "Ana",
  "last_name": "Martinez",
  "email": "ana.martinez@example.com",
  "phone_number": "555-123-4567",
  "hire_date": "2024-06-01",
  "job_title": "Software Engineer",
  "job_id": 400,
  "gov_id": "123-45-6789",
  "hiring_manager_id": "E020",
  "hr_manager_id": "E015",
  "marital_status": "single",
  "state": "New York",
  "emergency_contact_name": "Robert Martinez",
  "emergency_contact_phone": "555-765-4321",
  "sex": "Female",
  "department": "Technology",
  "date_of_birth": "1998-03-22",
  "status": "Active"
}'
              `}</pre>
                        </div>

                        <div className="response-section">
                            <h3>Response</h3>
                            <div className="code-sample">
                                <h4>201 Created</h4>
                                <pre>{String.raw`
{
  "_id": {"$oid": "GENERATED_ID" },
  "employee_id": "EM50000",
  "first_name": "Ana",
  "last_name": "Martinez",
  // ... other fields
  "status": "Active"
}
                `}</pre>
                            </div>
                        </div>
                    </section>

                    {/* UPDATE EMPLOYEE */}
                    <section id="update" className="endpoint-detail">
                        <div className="endpoint-header">
                            <div>
                                <h2 className="endpoint-title">
                                    Update Employee <span className="badge">Developing</span>
                                </h2>
                                <div className="endpoint-url">
                                    <span className="method-tag put large">PUT</span>
                                    <code>
                                        https://api.example.com/v1/employees/{'{'}employee_id{'}'}
                                    </code>
                                </div>
                            </div>
                            <button className="try-it-btn">Try It</button>
                        </div>

                        <div className="request-section">
                            <h3>Request</h3>
                            {/* Path Params */}
                            <div className="param-group">
                                <h4>Path Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">employee_id</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                            {/* Body Params */}
                            <div className="param-group">
                                <h4>JSON Body</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">email</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">optional</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">phone_number</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">optional</div>
                                    </div>
                                </div>
                            </div>
                            {/* Header Params */}
                            <div className="param-group">
                                <h4>Header Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">Authorization</div>
                                        <div className="param-type">string (Bearer token)</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">Content-Type</div>
                                        <div className="param-type">application/json</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="code-sample">
                            <h4>Request Example (cURL)</h4>
                            <pre>{String.raw`
curl --location --request PUT 'https://api.example.com/v1/employees/EM31566' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "updated.email@example.com",
  "phone_number": "555-987-6543",
  "status": "Inactive"
}'
              `}</pre>
                        </div>

                        <div className="response-section">
                            <h3>Response</h3>
                            <div className="code-sample">
                                <h4>200 Success</h4>
                                <pre>{String.raw`
{
  "_id": {"$oid": "67c7d4a80554a017d7c9ea39" },
  "employee_id": "EM31566",
  "first_name": "Manuel",
  "last_name": "Jimenez",
  "email": "updated.email@example.com",
  "phone_number": "555-987-6543",
  // ... other fields
  "status": "Inactive"
}
                `}</pre>
                            </div>
                        </div>
                    </section>

                    {/* DELETE EMPLOYEE */}
                    <section id="delete" className="endpoint-detail">
                        <div className="endpoint-header">
                            <div>
                                <h2 className="endpoint-title">
                                    Delete Employee <span className="badge">Developing</span>
                                </h2>
                                <div className="endpoint-url">
                                    <span className="method-tag delete large">DELETE</span>
                                    <code>
                                        https://api.example.com/v1/employees/{'{'}employee_id{'}'}
                                    </code>
                                </div>
                            </div>
                            <button className="try-it-btn">Try It</button>
                        </div>

                        <div className="request-section">
                            <h3>Request</h3>
                            {/* Path Params */}
                            <div className="param-group">
                                <h4>Path Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">employee_id</div>
                                        <div className="param-type">string</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                            {/* Header Params */}
                            <div className="param-group">
                                <h4>Header Params</h4>
                                <div className="param-table">
                                    <div className="param-row">
                                        <div className="param-name">Authorization</div>
                                        <div className="param-type">string (Bearer token)</div>
                                        <div className="param-required">required</div>
                                    </div>
                                    <div className="param-row">
                                        <div className="param-name">Content-Type</div>
                                        <div className="param-type">application/json</div>
                                        <div className="param-required">required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="code-sample">
                            <h4>Request Example (cURL)</h4>
                            <pre>{String.raw`
curl --location --request DELETE 'https://api.example.com/v1/employees/EM31566' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json'
              `}</pre>
                        </div>

                        <div className="response-section">
                            <h3>Response</h3>
                            <div className="code-sample">
                                <h4>204 No Content</h4>
                                <pre>{String.raw`
(No content returned)
                `}</pre>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </React.Fragment>
    )
}

export default Home
