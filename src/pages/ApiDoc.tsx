import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../styles/ApiDoc.css';

interface ParamType {
  name: string;
  type: string;
  required: boolean;
  example: string;
  description?: string;
}

interface EndpointDataType {
  title: string;
  method: string;
  url: string;
  badge: string;
  breadcrumb: string;
  queryParams: ParamType[];
  headerParams: ParamType[];
  bodyParams?: ParamType[];
  response: {
    example: string;
  };
}

interface EndpointsType {
  [key: string]: EndpointDataType;
}

const ApiDoc: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shell');
  const [responseOpen, setResponseOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<string[]>(['employee', 'salary', 'payroll', 'leave', 'insurance', 'policies']);
  const [activeEndpoint, setActiveEndpoint] = useState('getAllEmployees');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [animating, setAnimating] = useState(false);

  const endpointData: EndpointsType = {
    getAllEmployees: {
      title: 'Get All Employees',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/employees',
      badge: 'Developing',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'latitude', type: 'string', required: true, example: 'Example: 43.6108202' },
        { name: 'longitude', type: 'string', required: true, example: 'Example: -79.5238998' },
        { name: 'cursor', type: 'string', required: true, example: 'pagination next val' }
      ],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      response: {
        example: `{
  "cursor": "10",
  "store_id_for_menu": 75,
  "stores": [
    {
      "address": "606 Browns Line",
      "alcohol_age_limit": null,
      "alcohol_age_verify": null,
      "city": "Toronto - Etobicoke",
      "city_slug": "Toronto_-_Etobicoke",
      "delivery_available": true,
      "distance": "1.9540454542823914",
      "image_name": "",
      "is_express": false,
      "is_online": true,
      "is_open": false,
      "latitude": 43.605179,
      "longitude": -79.546885,
      "market_phone_number": "4169671111",
      "name": "606 Browns Line",
      "operating_hours": [
        {
          "day_name": "0",
          "end_time": "02:00 AM",
          "label": "Monday",
          "start_time": "11:00 AM"
        },
        {
          "day_name": "1",
          "end_time": "02:00 AM",
          "label": "Tuesday",
          "start_time": "11:00 AM"
        }
      ]
    }
  ],
  "sub_label_text": "Order and Pickup only in 15 minutes"
}`
      }
    },
    createEmployee: {
      title: 'Create Employee',
      method: 'POST',
      url: 'https://api.employeedb.com/v1/employees',
      badge: 'Developing',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      bodyParams: [
        { name: 'first_name', type: 'string', required: true, example: 'Example: John' },
        { name: 'last_name', type: 'string', required: true, example: 'Example: Smith' },
        { name: 'email', type: 'string', required: true, example: 'Example: john.smith@example.com' },
        { name: 'department', type: 'string', required: true, example: 'Example: Engineering' },
        { name: 'job_title', type: 'string', required: true, example: 'Example: Senior Developer' }
      ],
      response: {
        example: `{
  "id": "EMP003",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "department": "Engineering",
  "job_title": "Senior Developer",
  "hire_date": "2023-05-15",
  "status": "active"
}`
      }
    },
    updateEmployee: {
      title: 'Update Employee',
      method: 'PUT',
      url: 'https://api.employeedb.com/v1/employees/{employee_id}',
      badge: 'Developing',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      bodyParams: [
        { name: 'department', type: 'string', required: false, example: 'Example: Marketing' },
        { name: 'job_title', type: 'string', required: false, example: 'Example: Marketing Manager' },
        { name: 'status', type: 'string', required: false, example: 'Example: inactive' }
      ],
      response: {
        example: `{
  "id": "EMP001",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "department": "Marketing",
  "job_title": "Marketing Manager",
  "hire_date": "2019-06-15",
  "status": "inactive",
  "updated_at": "2023-05-20T15:30:45Z"
}`
      }
    },
    deleteEmployee: {
      title: 'Delete Employee',
      method: 'DELETE',
      url: 'https://api.employeedb.com/v1/employees/{employee_id}',
      badge: 'Developing',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      response: {
        example: `{
  "success": true,
  "message": "Employee with ID EMP001 has been successfully deleted",
  "deleted_at": "2023-05-22T10:15:20Z"
}`
      }
    },
    getSalaryInfo: {
      title: 'Get Salary Information',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/salary_info',
      badge: 'Developing',
      breadcrumb: 'Salary',
      queryParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' },
        { name: 'year', type: 'integer', required: false, example: 'Example: 2023' }
      ],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 85000,
  "bonus": 5000,
  "currency": "USD",
  "effective_date": "2023-01-01",
  "salary_reviews": [
    {
      "review_date": "2022-12-15",
      "old_salary": 78000,
      "new_salary": 85000,
      "percentage_increase": 8.97
    },
    {
      "review_date": "2021-12-15",
      "old_salary": 72000,
      "new_salary": 78000,
      "percentage_increase": 8.33
    }
  ]
}`
      }
    },
    updateSalary: {
      title: 'Update Salary',
      method: 'PUT',
      url: 'https://api.employeedb.com/v1/salary_info/{employee_id}',
      badge: 'Developing',
      breadcrumb: 'Salary',
      queryParams: [],
      headerParams: [
        { name: 'X-SOURCE', type: 'string', required: true, example: 'Example: admin' },
        { name: 'X-LANG', type: 'string', required: true, example: 'Example: en' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'X-REQUEST-ID', type: 'string', required: true, example: 'Example: stacktics' },
        { name: 'X-DEVICE-ID', type: 'string', required: true, example: 'Example: stacktics_device' },
        { name: 'x-api-key', type: 'string', required: true, example: '' }
      ],
      bodyParams: [
        { name: 'base_salary', type: 'number', required: true, example: 'Example: 90000' },
        { name: 'bonus', type: 'number', required: false, example: 'Example: 6000' },
        { name: 'effective_date', type: 'string', required: true, example: 'Example: 2023-06-01' },
        { name: 'review_notes', type: 'string', required: false, example: 'Example: Annual performance review' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 90000,
  "bonus": 6000,
  "currency": "USD",
  "effective_date": "2023-06-01",
  "previous_salary": 85000,
  "percentage_increase": 5.88,
  "updated_at": "2023-05-25T14:20:10Z"
}`
      }
    },
    getPayroll: {
      title: 'Get Payroll Data',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/payroll',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [
        { name: 'employee_id', type: 'string', required: false, example: 'Example: EMP001' },
        { name: 'period', type: 'string', required: false, example: 'Example: 2023-06' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "payroll_id": "PR2023-06-001",
  "employee_id": "EMP001",
  "period": "2023-06",
  "gross_salary": 7083.33,
  "deductions": {
    "tax": 1770.83,
    "insurance": 350,
    "retirement": 425
  },
  "net_salary": 4537.50,
  "payment_date": "2023-06-30",
  "payment_status": "completed"
}`
      }
    },
    getLeaveRequests: {
      title: 'Get Leave Requests',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/leave_requests',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'employee_id', type: 'string', required: false, example: 'Example: EMP001' },
        { name: 'status', type: 'string', required: false, example: 'Example: approved' },
        { name: 'start_date', type: 'string', required: false, example: 'Example: 2023-07-01' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "leave_requests": [
    {
      "request_id": "LR001",
      "employee_id": "EMP001",
      "leave_type": "annual",
      "start_date": "2023-07-10",
      "end_date": "2023-07-14",
      "days": 5,
      "reason": "Vacation",
      "status": "approved",
      "approved_by": "EMP005",
      "approved_date": "2023-06-15"
    },
    {
      "request_id": "LR002",
      "employee_id": "EMP001",
      "leave_type": "sick",
      "start_date": "2023-05-03",
      "end_date": "2023-05-04",
      "days": 2,
      "reason": "Illness",
      "status": "approved",
      "approved_by": "EMP005",
      "approved_date": "2023-05-03"
    }
  ]
}`
      }
    },
    getLeaveBalance: {
      title: 'Get Leave Balance',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/leave_balance_data',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "year": 2023,
  "annual_leave": {
    "entitled": 20,
    "taken": 5,
    "planned": 3,
    "balance": 12
  },
  "sick_leave": {
    "entitled": 10,
    "taken": 2,
    "balance": 8
  },
  "personal_leave": {
    "entitled": 3,
    "taken": 0,
    "balance": 3
  }
}`
      }
    },
    getInsurancePlans: {
      title: 'Get Insurance Plans',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/insurance_plan',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [
        { name: 'plan_type', type: 'string', required: false, example: 'Example: health' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "insurance_plans": [
    {
      "plan_id": "INS001",
      "plan_name": "Standard Health Plan",
      "plan_type": "health",
      "coverage_details": {
        "hospital_coverage": "80%",
        "outpatient_coverage": "70%",
        "dental_coverage": "50%",
        "vision_coverage": "50%"
      },
      "monthly_premium": 350,
      "is_active": true
    },
    {
      "plan_id": "INS002",
      "plan_name": "Premium Health Plan",
      "plan_type": "health",
      "coverage_details": {
        "hospital_coverage": "90%",
        "outpatient_coverage": "80%",
        "dental_coverage": "70%",
        "vision_coverage": "70%"
      },
      "monthly_premium": 500,
      "is_active": true
    }
  ]
}`
      }
    },
    getEmployeeInsurance: {
      title: 'Get Employee Insurance Data',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/employee_insurance_data',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "enrolled_plans": [
    {
      "plan_id": "INS001",
      "enrollment_date": "2021-01-15",
      "coverage_start_date": "2021-02-01",
      "coverage_level": "family",
      "dependents": [
        {
          "dependent_id": "DEP001",
          "relation": "spouse",
          "first_name": "Jane",
          "last_name": "Smith"
        },
        {
          "dependent_id": "DEP002",
          "relation": "child",
          "first_name": "Michael",
          "last_name": "Smith"
        }
      ],
      "monthly_premium": 450,
      "status": "active"
    }
  ]
}`
      }
    },
    getCompanyPolicies: {
      title: 'Get Company Policies',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/company_policies',
      badge: 'Stable',
      breadcrumb: 'Policies',
      queryParams: [
        { name: 'policy_type', type: 'string', required: false, example: 'Example: leave' },
        { name: 'department', type: 'string', required: false, example: 'Example: Engineering' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "policies": [
    {
      "policy_id": "POL001",
      "policy_name": "Annual Leave Policy",
      "policy_type": "leave",
      "applicable_departments": ["All"],
      "effective_date": "2023-01-01",
      "content": "All full-time employees are entitled to 20 days of annual leave per calendar year...",
      "last_updated": "2022-12-15"
    },
    {
      "policy_id": "POL002",
      "policy_name": "Remote Work Policy",
      "policy_type": "work",
      "applicable_departments": ["Engineering", "Marketing", "Customer Support"],
      "effective_date": "2023-01-01",
      "content": "Employees in eligible departments may work remotely up to 2 days per week...",
      "last_updated": "2022-12-10"
    }
  ]
}`
      }
    }
  };

  const currentEndpoint = endpointData[activeEndpoint] || endpointData.getAllEmployees;

  const handleCategoryClick = (category: string) => {
    if (animating) return;
    
    setAnimating(true);
    
    // Toggle this category in the open categories list
    setOpenCategories(prev => {
      if (prev.includes(category)) {
        // Only allow closing if explicitly clicking on this category
        return prev.filter(cat => cat !== category);
      } else {
        // Add this category without removing others
        return [...prev, category];
      }
    });
    
    // Add animation class
    const categoryElement = document.querySelector(`.section-header[data-category="${category}"]`);
    if (categoryElement) {
      categoryElement.classList.add('pulse-animation');
      setTimeout(() => {
        categoryElement.classList.remove('pulse-animation');
        setAnimating(false);
      }, 300);
    }
    
    // Set default endpoint for selected category without removing other open categories
    if (category === 'employee' && !activeEndpoint.includes('Employee')) setActiveEndpoint('getAllEmployees');
    if (category === 'salary' && !activeEndpoint.includes('Salary')) setActiveEndpoint('getSalaryInfo');
    if (category === 'payroll' && !activeEndpoint.includes('Payroll')) setActiveEndpoint('getPayroll');
    if (category === 'leave' && !activeEndpoint.includes('Leave')) setActiveEndpoint('getLeaveRequests');
    if (category === 'insurance' && !activeEndpoint.includes('Insurance')) setActiveEndpoint('getInsurancePlans');
    if (category === 'policies' && !activeEndpoint.includes('Policies')) setActiveEndpoint('getCompanyPolicies');
  };

  const handleEndpointClick = (endpoint: string, event: React.MouseEvent) => {
    // Stop event bubbling to prevent triggering parent section toggle
    event.stopPropagation();
    
    if (animating) return;
    
    setAnimating(true);
    
    // Add slide animation to selected endpoint
    const endpointElement = document.querySelector(`.section-link[data-endpoint="${endpoint}"]`);
    if (endpointElement) {
      endpointElement.classList.add('slide-animation');
      setTimeout(() => {
        endpointElement.classList.remove('slide-animation');
        setAnimating(false);
        setActiveEndpoint(endpoint);
      }, 300);
    } else {
      setActiveEndpoint(endpoint);
      setAnimating(false);
    }
  };

  const getMethodClassName = (method: string) => {
    method = method.toLowerCase();
    if (method === 'get') return 'get';
    if (method === 'post') return 'post';
    if (method === 'put') return 'put';
    if (method === 'delete') return 'delete';
    if (method === 'patch') return 'patch';
    return '';
  };

  const renderCodeSample = (language: string) => {
    if (language === 'objective-c') {
      return '#import <Foundation/Foundation.h>';
    }
    
    if (language === 'all') {
      return 'Select a language to see code examples';
    }
    
    if (language === 'shell') {
      return `curl --location --request ${currentEndpoint.method} '${currentEndpoint.url}' \\
--header 'X-SOURCE: admin' \\
--header 'X-LANG: en' \\
--header 'X-REQUEST-ID: stacktics' \\
--header 'X-DEVICE-ID: stacktics_device' \\
--header 'x-api-key: your_api_key' \\
--header 'Content-Type: application/json'${currentEndpoint.method !== 'GET' && currentEndpoint.bodyParams ? ` \\
--data-raw '${JSON.stringify({
        ...Object.fromEntries(currentEndpoint.bodyParams.map(param => [
          param.name,
          param.example.includes('Example: ') ? param.example.replace('Example: ', '') : ''
        ]))
      }, null, 2)}'` : ''}`;
    }
    
    if (language === 'javascript') {
      return `const options = {
  method: '${currentEndpoint.method}',
  headers: {
    'X-SOURCE': 'admin',
    'X-LANG': 'en',
    'X-REQUEST-ID': 'stacktics',
    'X-DEVICE-ID': 'stacktics_device',
    'x-api-key': 'your_api_key',
    'Content-Type': 'application/json'
  }${currentEndpoint.method !== 'GET' && currentEndpoint.bodyParams ? `,
  body: JSON.stringify(${JSON.stringify(
    Object.fromEntries(currentEndpoint.bodyParams.map(param => [
      param.name,
      param.example.includes('Example: ') ? param.example.replace('Example: ', '') : ''
    ])),
    null, 2
  )})` : ''}
};

fetch('${currentEndpoint.url}', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
    }
    
    if (language === 'python') {
      return `import requests

url = "${currentEndpoint.url}"
headers = {
    "X-SOURCE": "admin",
    "X-LANG": "en",
    "X-REQUEST-ID": "stacktics",
    "X-DEVICE-ID": "stacktics_device",
    "x-api-key": "your_api_key",
    "Content-Type": "application/json"
}${currentEndpoint.method !== 'GET' && currentEndpoint.bodyParams ? `

payload = ${JSON.stringify(
  Object.fromEntries(currentEndpoint.bodyParams.map(param => [
    param.name,
    param.example.includes('Example: ') ? param.example.replace('Example: ', '') : ''
  ])),
  null, 2
)}` : ''}

response = requests.${currentEndpoint.method.toLowerCase()}(url, headers=headers${currentEndpoint.method !== 'GET' && currentEndpoint.bodyParams ? ', json=payload' : ''})
data = response.json()
print(data)`;
    }
    
    return `// ${language.charAt(0).toUpperCase() + language.slice(1)} example would go here`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add custom cursor effect
  useEffect(() => {
    const sidebar = document.querySelector('.api-sidebar');
    if (sidebar) {
      sidebar.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const cursor = document.querySelector('.custom-cursor') as HTMLElement;
        if (!cursor) {
          const newCursor = document.createElement('div');
          newCursor.classList.add('custom-cursor');
          document.body.appendChild(newCursor);
        }
        
        const customCursor = document.querySelector('.custom-cursor') as HTMLElement;
        if (customCursor) {
          customCursor.style.left = `${mouseEvent.clientX}px`;
          customCursor.style.top = `${mouseEvent.clientY}px`;
          customCursor.style.opacity = '1';
        }
      });
      
      sidebar.addEventListener('mouseleave', () => {
        const customCursor = document.querySelector('.custom-cursor') as HTMLElement;
        if (customCursor) {
          customCursor.style.opacity = '0';
        }
      });
    }
    
    return () => {
      const customCursor = document.querySelector('.custom-cursor');
      if (customCursor) {
        customCursor.remove();
      }
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when selecting an endpoint on mobile
  const handleMobileEndpointClick = (endpoint: string, event: React.MouseEvent) => {
    handleEndpointClick(endpoint, event);
    if (window.innerWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`api-doc-container ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      {/* Mobile menu toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`api-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="api-brand">
          <div className="api-logo">
            <img src="/logo.svg" alt="ccai logo" width="20" height="20" />
          </div>
          <h3 className="logo-text">ccai</h3>
          <div className="theme-toggle">
            <img src="/moon.svg" alt="dark mode" width="16" height="16" />
          </div>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('employee') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('employee')}
            data-category="employee"
          >
            <span>Employee</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('employee') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getAllEmployees' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getAllEmployees', event)}
              data-endpoint="getAllEmployees"
            >
              <span>Get All Employees</span>
              <span className="method-tag get">GET</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'createEmployee' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('createEmployee', event)}
              data-endpoint="createEmployee"
            >
              <span>Create Employee</span>
              <span className="method-tag post">POST</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'updateEmployee' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('updateEmployee', event)}
              data-endpoint="updateEmployee"
            >
              <span>Update Employee</span>
              <span className="method-tag put">PUT</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'deleteEmployee' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('deleteEmployee', event)}
              data-endpoint="deleteEmployee"
            >
              <span>Delete Employee</span>
              <span className="method-tag delete">DELETE</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('salary') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('salary')}
            data-category="salary"
          >
            <span>Salary Information</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('salary') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getSalaryInfo' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getSalaryInfo', event)}
              data-endpoint="getSalaryInfo"
            >
              <span>Get Salary Information</span>
              <span className="method-tag get">GET</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'updateSalary' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('updateSalary', event)}
              data-endpoint="updateSalary"
            >
              <span>Update Salary</span>
              <span className="method-tag put">PUT</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('payroll') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('payroll')}
            data-category="payroll"
          >
            <span>Payroll</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('payroll') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getPayroll' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getPayroll', event)}
              data-endpoint="getPayroll"
            >
              <span>Get Payroll Data</span>
              <span className="method-tag get">GET</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('leave') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('leave')}
            data-category="leave"
          >
            <span>Leave Management</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('leave') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getLeaveRequests' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getLeaveRequests', event)}
              data-endpoint="getLeaveRequests"
            >
              <span>Get Leave Requests</span>
              <span className="method-tag get">GET</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'getLeaveBalance' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getLeaveBalance', event)}
              data-endpoint="getLeaveBalance"
            >
              <span>Get Leave Balance</span>
              <span className="method-tag get">GET</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('insurance') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('insurance')}
            data-category="insurance"
          >
            <span>Insurance</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('insurance') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getInsurancePlans' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getInsurancePlans', event)}
              data-endpoint="getInsurancePlans"
            >
              <span>Get Insurance Plans</span>
              <span className="method-tag get">GET</span>
            </li>
            <li 
              className={`section-link ${activeEndpoint === 'getEmployeeInsurance' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getEmployeeInsurance', event)}
              data-endpoint="getEmployeeInsurance"
            >
              <span>Get Employee Insurance</span>
              <span className="method-tag get">GET</span>
            </li>
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('policies') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('policies')}
            data-category="policies"
          >
            <span>Company Policies</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('policies') ? 'visible' : 'hidden'}`}>
            <li 
              className={`section-link ${activeEndpoint === 'getCompanyPolicies' ? 'active' : ''}`}
              onClick={(event) => handleMobileEndpointClick('getCompanyPolicies', event)}
              data-endpoint="getCompanyPolicies"
            >
              <span>Get Company Policies</span>
              <span className="method-tag get">GET</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
      ></div>

      {/* Main Content */}
      <main className="api-content">
        <div className="api-header animate-fadeIn">
          <div className="api-breadcrumb">{currentEndpoint.breadcrumb}</div>
          <h1 className="api-title">
            {currentEndpoint.title} <span className="api-badge">{currentEndpoint.badge}</span>
          </h1>
        </div>

        <div className="api-endpoint animate-slideIn">
          <div className={`endpoint-method ${getMethodClassName(currentEndpoint.method)}`}>
            {currentEndpoint.method}
          </div>
          <div className="endpoint-url">{currentEndpoint.url}</div>
          <button className="try-it-button">Try it</button>
        </div>

        <div className="api-section">
          <h2 className="section-title">Request</h2>
          
          {currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0 && (
            <div className="params-section">
              <h3 className="params-title">Query Params</h3>
              
              <div className="params-table">
                <div className="params-table-header">
                  <div className="param-col name">Parameter</div>
                  <div className="param-col type">Type</div>
                  <div className="param-col required">Required</div>
                </div>
                
                {currentEndpoint.queryParams.map((param, index) => (
                  <div className="params-table-row" key={index}>
                    <div className="param-col name">
                      <span className="param-name">{param.name}</span>
                    </div>
                    <div className="param-col type">
                      <span className="param-type">{param.type}</span>
                    </div>
                    <div className="param-col required">
                      <span className="param-required">{param.required ? 'required' : 'optional'}</span>
                    </div>
                    <div className="param-example-row">
                      <div className="param-example">{param.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentEndpoint.headerParams && currentEndpoint.headerParams.length > 0 && (
            <div className="params-section">
              <h3 className="params-title">Header Params</h3>
              <div className="generate-code-link">
                <span>Generate Code</span>
              </div>
              
              <div className="params-table">
                <div className="params-table-header">
                  <div className="param-col name">Parameter</div>
                  <div className="param-col type">Type</div>
                  <div className="param-col required">Required</div>
                </div>
                
                {currentEndpoint.headerParams.map((param, index) => (
                  <div className="params-table-row" key={index}>
                    <div className="param-col name">
                      <span className="param-name">{param.name}</span>
                      <div className="param-description">
                        {param.description || param.example.replace('Example: ', '')}
                      </div>
                    </div>
                    <div className="param-col type">
                      <span className="param-type">{param.type}</span>
                    </div>
                    <div className="param-col required">
                      <span className={`param-required ${param.required ? 'yes' : 'no'}`}>
                        {param.required ? 'required' : 'optional'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentEndpoint.bodyParams && currentEndpoint.bodyParams.length > 0 && (
            <div className="params-section">
              <h3 className="params-title">Body Params</h3>
              
              <div className="params-table">
                <div className="params-table-header">
                  <div className="param-col name">Parameter</div>
                  <div className="param-col type">Type</div>
                  <div className="param-col required">Required</div>
                </div>
                
                {currentEndpoint.bodyParams.map((param, index) => (
                  <div className="params-table-row" key={index}>
                    <div className="param-col name">
                      <span className="param-name">{param.name}</span>
                      <div className="param-description">
                        {param.description || param.example.replace('Example: ', '')}
                      </div>
                    </div>
                    <div className="param-col type">
                      <span className="param-type">{param.type}</span>
                    </div>
                    <div className="param-col required">
                      <span className={`param-required ${param.required ? 'yes' : 'no'}`}>
                        {param.required ? 'required' : 'optional'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="api-section">
          <h2 className="section-title">Request samples</h2>
          
          <div className="language-tabs-container">
            <div className="language-tabs">
              <button 
                className={`language-tab all-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <div className="language-icon all-icon">]</div>
                <span>all</span>
              </button>
              <button 
                className={`language-tab javascript-tab ${activeTab === 'javascript' ? 'active' : ''}`}
                onClick={() => setActiveTab('javascript')}
              >
                <div className="language-icon js-icon">JS</div>
                <span>JavaScript</span>
              </button>
              <button 
                className={`language-tab java-tab ${activeTab === 'java' ? 'active' : ''}`}
                onClick={() => setActiveTab('java')}
              >
                <div className="language-icon java-icon">J</div>
                <span>Java</span>
              </button>
              <button 
                className={`language-tab swift-tab ${activeTab === 'swift' ? 'active' : ''}`}
                onClick={() => setActiveTab('swift')}
              >
                <div className="language-icon swift-icon">S</div>
                <span>Swift</span>
              </button>
              <button 
                className={`language-tab go-tab ${activeTab === 'go' ? 'active' : ''}`}
                onClick={() => setActiveTab('go')}
              >
                <div className="language-icon go-icon">Go</div>
                <span>Go</span>
              </button>
              <button 
                className={`language-tab php-tab ${activeTab === 'php' ? 'active' : ''}`}
                onClick={() => setActiveTab('php')}
              >
                <div className="language-icon php-icon">P</div>
                <span>PHP</span>
              </button>
              <button 
                className={`language-tab python-tab ${activeTab === 'python' ? 'active' : ''}`}
                onClick={() => setActiveTab('python')}
              >
                <div className="language-icon python-icon">Py</div>
                <span>Python</span>
              </button>
              <button 
                className={`language-tab http-tab ${activeTab === 'http' ? 'active' : ''}`}
                onClick={() => setActiveTab('http')}
              >
                <div className="language-icon http-icon">{'{}'}</div>
                <span>HTTP</span>
              </button>
              <button 
                className={`language-tab c-tab ${activeTab === 'c' ? 'active' : ''}`}
                onClick={() => setActiveTab('c')}
              >
                <div className="language-icon c-icon">C</div>
                <span>C</span>
              </button>
              <button 
                className={`language-tab csharp-tab ${activeTab === 'csharp' ? 'active' : ''}`}
                onClick={() => setActiveTab('csharp')}
              >
                <div className="language-icon csharp-icon">C#</div>
                <span>C#</span>
              </button>
              <button 
                className={`language-tab objective-c-tab ${activeTab === 'objective-c' ? 'active' : ''}`}
                onClick={() => setActiveTab('objective-c')}
              >
                <div className="language-icon objc-icon">[C]</div>
                <span>Objective-C</span>
              </button>
              <button 
                className={`language-tab ruby-tab ${activeTab === 'ruby' ? 'active' : ''}`}
                onClick={() => setActiveTab('ruby')}
              >
                <div className="language-icon ruby-icon">R</div>
                <span>Ruby</span>
              </button>
              <button 
                className={`language-tab ocaml-tab ${activeTab === 'ocaml' ? 'active' : ''}`}
                onClick={() => setActiveTab('ocaml')}
              >
                <div className="language-icon ocaml-icon">ML</div>
                <span>OCaml</span>
              </button>
            </div>
          </div>
          
          <div className="code-sample">
            <pre className="code-block">
              {renderCodeSample(activeTab)}
            </pre>
          </div>
        </div>

        <div className="api-section">
          <h2 className="section-title">Responses</h2>
          
          <div className="response-item success">
            <div className="response-header" onClick={() => setResponseOpen(!responseOpen)}>
              <div className="response-status">
                <div className="status-circle success"></div>
                <span className="status-code">200</span>
                <span className="status-text">Success</span>
              </div>
              <div className="response-toggle">{responseOpen ? '▼' : '▶'}</div>
            </div>
            
            {responseOpen && (
              <div className="response-content">
                <div className="response-type">application/json</div>
                
                <div className="response-columns">
                  <div className="response-left-column">
                    <div className="response-schema">
                      <div className="response-type-header">application/json</div>
                      
                      <div className="schema-row">
                        <div className="field-key">cursor</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row">
                        <div className="field-key">store_id_for_menu</div>
                        <div className="field-type">integer</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row parent">
                        <div className="toggle-icon">▼</div>
                        <div className="field-key">stores</div>
                        <div className="field-type">array [object (24)]</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">address</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">alcohol_age_limit</div>
                        <div className="field-type">null</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">alcohol_age_verify</div>
                        <div className="field-type">null</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">city</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">city_slug</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">delivery_available</div>
                        <div className="field-type">boolean</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">distance</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                        <div className="field-description">distance of store from searched lat lng</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">image_name</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">is_express</div>
                        <div className="field-type">boolean</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">is_online</div>
                        <div className="field-type">boolean</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">is_open</div>
                        <div className="field-type">boolean</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">latitude</div>
                        <div className="field-type">number</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">longitude</div>
                        <div className="field-type">number</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">market_phone_number</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">name</div>
                        <div className="field-type">string</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child parent">
                        <div className="toggle-icon">▶</div>
                        <div className="field-key">operating_hours</div>
                        <div className="field-type">array [object (4)]</div>
                        <div className="field-required">required</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-description">store hours</div>
                      </div>
                      
                      <div className="schema-row child">
                        <div className="field-key">pickup_available</div>
                        <div className="field-type">boolean</div>
                        <div className="field-required">required</div>
                      </div>
                    </div>
                  </div>
                  <div className="response-right-column">
                    <div className="example-header">Example</div>
                    <pre className="json-example">
                      <div dangerouslySetInnerHTML={{ 
                        __html: `{
  <span class="property">"cursor"</span>: <span class="string">"10"</span>,
  <span class="property">"store_id_for_menu"</span>: <span class="number">75</span>,
  <span class="property">"stores"</span>: [
    {
      <span class="property">"address"</span>: <span class="string">" 606 Browns Line"</span>,
      <span class="property">"alcohol_age_limit"</span>: <span class="null">null</span>,
      <span class="property">"alcohol_age_verify"</span>: <span class="null">null</span>,
      <span class="property">"city"</span>: <span class="string">"Toronto - Etobicoke"</span>,
      <span class="property">"city_slug"</span>: <span class="string">"Toronto_-_Etobicoke"</span>,
      <span class="property">"delivery_available"</span>: <span class="boolean">true</span>,
      <span class="property">"distance"</span>: <span class="string">"1.9540454542823914"</span>,
      <span class="property">"image_name"</span>: <span class="string">""</span>,
      <span class="property">"is_express"</span>: <span class="boolean">false</span>,
      <span class="property">"is_online"</span>: <span class="boolean">true</span>,
      <span class="property">"is_open"</span>: <span class="boolean">false</span>,
      <span class="property">"latitude"</span>: <span class="number">43.605179</span>,
      <span class="property">"longitude"</span>: <span class="number">-79.546885</span>,
      <span class="property">"market_phone_number"</span>: <span class="string">"4169671111"</span>,
      <span class="property">"name"</span>: <span class="string">"606 Browns Line"</span>,
      <span class="property">"operating_hours"</span>: [
        {
          <span class="property">"day_name"</span>: <span class="string">"0"</span>,
          <span class="property">"end_time"</span>: <span class="string">"02:00 AM"</span>,
          <span class="property">"label"</span>: <span class="string">"Monday"</span>,
          <span class="property">"start_time"</span>: <span class="string">"11:00 AM"</span>
        },
        {
          <span class="property">"day_name"</span>: <span class="string">"1"</span>,
          <span class="property">"end_time"</span>: <span class="string">"02:00 AM"</span>,
          <span class="property">"label"</span>: <span class="string">"Tuesday"</span>,
          <span class="property">"start_time"</span>: <span class="string">"11:00 AM"</span>
        }
      ]
    }
  ],
  <span class="property">"sub_label_text"</span>: <span class="string">"Order and Pickup only in 15 minutes"</span>
}`
                      }} />
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Custom cursor for enhanced UI effect */}
      <div className="custom-cursor"></div>
    </div>
  );
};

export default ApiDoc; 