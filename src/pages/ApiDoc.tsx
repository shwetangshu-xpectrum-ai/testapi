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

// Interface for employee data
interface EmployeeDataType {
  employee_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  hire_date?: string;
  job_title?: string;
  job_id?: number;
  gov_id?: string;
  hiring_manager_id?: string;
  hr_manager_id?: string;
  marital_status?: string;
  state?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  sex?: string;
  department?: string;
  date_of_birth?: string;
  status?: string;
}

// Interface for salary info
interface SalaryInfoType {
  employee_id: string;
  base_salary?: number;
  salary_type?: string;
  bonus?: number;
  commission?: number;
  currency?: string;
  salary_grade?: string;
  last_salary_increase_date?: string;
}

// Interface for payroll data
interface PayrollDataType {
  employee_id: string;
  base_salary?: number;
  federal_tax?: number;
  state_tax?: number;
  total_tax?: number;
  month?: string;
  salary_received_day?: string;
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
  const [openCategories, setOpenCategories] = useState<string[]>(['employee', 'salary', 'payroll']);
  const [activeEndpoint, setActiveEndpoint] = useState('getAllEmployees');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [animating, setAnimating] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  
  // API call state
  const [apiKey, setApiKey] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTryItModal, setShowTryItModal] = useState(false);
  const [apiError, setApiError] = useState('');
  const [requestParams, setRequestParams] = useState<{[key: string]: string}>({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeRequestTab, setActiveRequestTab] = useState('params');
  const [responseDetails, setResponseDetails] = useState<{
    status: number;
    statusText: string;
    time: number;
    size: string;
  } | null>(null);
  const [requestHeaders, setRequestHeaders] = useState<{[key: string]: string}>({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
  });
  const [rawBody, setRawBody] = useState('');
  const [bodyType, setBodyType] = useState('form');
  const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);
  const [environments, setEnvironments] = useState<Array<{name: string, variables: {[key: string]: string}}>>([
    { 
      name: 'Development', 
      variables: { 
        'baseUrl': 'https://dev-api.employeedb.com/v1',
        'apiKey': 'dev_api_key_123'
      } 
    },
    { 
      name: 'Production', 
      variables: { 
        'baseUrl': 'https://api.employeedb.com/v1',
        'apiKey': 'prod_api_key_456'
      } 
    }
  ]);
  const [activeEnvironment, setActiveEnvironment] = useState('Development');

  const endpointData: EndpointsType = {
    getAllEmployees: {
      title: 'Get All Employees',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/employees',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'department', type: 'string', required: false, example: 'Example: Engineering' },
        { name: 'status', type: 'string', required: false, example: 'Example: active' },
        { name: 'page', type: 'integer', required: false, example: 'Example: 1' },
        { name: 'limit', type: 'integer', required: false, example: 'Example: 10' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "total": 100,
  "page": 1,
  "limit": 10,
  "employees": [
    {
      "employee_id": "EMP001",
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "phone_number": "+1 123-456-7890",
      "hire_date": "2019-06-15",
      "job_title": "Senior Developer",
      "job_id": 5,
      "hiring_manager_id": "EMP005",
      "hr_manager_id": "EMP010",
      "department": "Engineering",
      "status": "active"
    },
    {
      "employee_id": "EMP002",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane.doe@example.com",
      "phone_number": "+1 123-456-7891",
      "hire_date": "2020-03-10",
      "job_title": "Product Manager",
      "job_id": 8, 
      "hiring_manager_id": "EMP007",
      "hr_manager_id": "EMP010",
      "department": "Product",
      "status": "active"
    }
  ]
}`
      }
    },
    getEmployeeById: {
      title: 'Get Employee by ID',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/employees/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "phone_number": "+1 123-456-7890",
  "hire_date": "2019-06-15",
  "job_title": "Senior Developer",
  "job_id": 5,
  "gov_id": "123-45-6789",
  "hiring_manager_id": "EMP005",
  "hr_manager_id": "EMP010",
  "marital_status": "married",
  "state": "California",
  "emergency_contact_name": "Jane Smith",
  "emergency_contact_phone": "+1 123-456-7899",
  "sex": "male",
  "department": "Engineering",
  "date_of_birth": "1985-04-12",
  "status": "active"
}`
      }
    },
    createEmployee: {
      title: 'Create Employee',
      method: 'POST',
      url: 'https://api.employeedb.com/v1/employees',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'first_name', type: 'string', required: true, example: 'Example: John' },
        { name: 'last_name', type: 'string', required: true, example: 'Example: Smith' },
        { name: 'email', type: 'string', required: true, example: 'Example: john.smith@example.com' },
        { name: 'phone_number', type: 'string', required: false, example: 'Example: +1 123-456-7890' },
        { name: 'hire_date', type: 'string', required: true, example: 'Example: 2023-05-15' },
        { name: 'job_title', type: 'string', required: true, example: 'Example: Software Developer' },
        { name: 'job_id', type: 'integer', required: false, example: 'Example: 3' },
        { name: 'hiring_manager_id', type: 'string', required: false, example: 'Example: EMP005' },
        { name: 'hr_manager_id', type: 'string', required: false, example: 'Example: EMP010' },
        { name: 'department', type: 'string', required: true, example: 'Example: Engineering' }
      ],
      response: {
        example: `{
  "employee_id": "EMP003",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "phone_number": "+1 123-456-7890",
  "hire_date": "2023-05-15",
  "job_title": "Software Developer",
  "job_id": 3,
  "hiring_manager_id": "EMP005",
  "hr_manager_id": "EMP010",
  "department": "Engineering",
  "status": "active"
}`
      }
    },
    updateEmployee: {
      title: 'Update Employee',
      method: 'PUT',
      url: 'https://api.employeedb.com/v1/employees/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'first_name', type: 'string', required: false, example: 'Example: John' },
        { name: 'last_name', type: 'string', required: false, example: 'Example: Smith' },
        { name: 'email', type: 'string', required: false, example: 'Example: john.smith@example.com' },
        { name: 'phone_number', type: 'string', required: false, example: 'Example: +1 123-456-7890' },
        { name: 'job_title', type: 'string', required: false, example: 'Example: Senior Developer' },
        { name: 'job_id', type: 'integer', required: false, example: 'Example: 5' },
        { name: 'department', type: 'string', required: false, example: 'Example: Engineering' },
        { name: 'status', type: 'string', required: false, example: 'Example: inactive' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john.smith@example.com",
  "phone_number": "+1 123-456-7890",
  "hire_date": "2019-06-15",
  "job_title": "Senior Developer",
  "job_id": 5,
  "department": "Engineering",
  "status": "inactive",
  "updated_at": "2023-05-20T15:30:45Z"
}`
      }
    },
    deleteEmployee: {
      title: 'Delete Employee',
      method: 'DELETE',
      url: 'https://api.employeedb.com/v1/employees/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
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
      url: 'https://api.employeedb.com/v1/salary/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Salary',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "salary_type": "annual",
  "bonus": 5000.00,
  "commission": 0.00,
  "currency": "USD",
  "salary_grade": "L3",
  "last_salary_increase_date": "2023-01-01"
}`
      }
    },
    updateSalary: {
      title: 'Update Salary',
      method: 'PUT',
      url: 'https://api.employeedb.com/v1/salary/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Salary',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'base_salary', type: 'number', required: true, example: 'Example: 90000.00' },
        { name: 'salary_type', type: 'string', required: false, example: 'Example: annual' },
        { name: 'bonus', type: 'number', required: false, example: 'Example: 6000.00' },
        { name: 'commission', type: 'number', required: false, example: 'Example: 1000.00' },
        { name: 'currency', type: 'string', required: false, example: 'Example: USD' },
        { name: 'salary_grade', type: 'string', required: false, example: 'Example: L4' },
        { name: 'last_salary_increase_date', type: 'string', required: true, example: 'Example: 2023-06-01' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 90000.00,
  "salary_type": "annual",
  "bonus": 6000.00,
  "commission": 1000.00,
  "currency": "USD",
  "salary_grade": "L4",
  "last_salary_increase_date": "2023-06-01",
  "updated_at": "2023-05-25T14:20:10Z"
}`
      }
    },
    getPayroll: {
      title: 'Get Payroll Data',
      method: 'GET',
      url: 'https://api.employeedb.com/v1/payroll/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [
        { name: 'month', type: 'string', required: false, example: 'Example: 2023-06' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 7083.33,
  "federal_tax": 1770.83,
  "state_tax": 566.67,
  "total_tax": 2337.50,
  "month": "2023-06",
  "salary_received_day": "2023-06-30"
}`
      }
    },
    createPayroll: {
      title: 'Create Payroll Entry',
      method: 'POST',
      url: 'https://api.employeedb.com/v1/payroll',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' },
        { name: 'base_salary', type: 'number', required: true, example: 'Example: 7083.33' },
        { name: 'federal_tax', type: 'number', required: true, example: 'Example: 1770.83' },
        { name: 'state_tax', type: 'number', required: true, example: 'Example: 566.67' },
        { name: 'total_tax', type: 'number', required: true, example: 'Example: 2337.50' },
        { name: 'month', type: 'string', required: true, example: 'Example: 2023-06' },
        { name: 'salary_received_day', type: 'string', required: true, example: 'Example: 2023-06-30' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 7083.33,
  "federal_tax": 1770.83,
  "state_tax": 566.67,
  "total_tax": 2337.50,
  "month": "2023-06",
  "salary_received_day": "2023-06-30",
  "created_at": "2023-05-25T14:20:10Z"
}`
      }
    }
  };

  const currentEndpoint = endpointData[activeEndpoint] || endpointData.getAllEmployees;

  // Function to handle API calls
  const handleApiCall = async () => {
    if (!apiKey) {
      setApiError('API key is required');
      return;
    }
    
    setIsLoading(true);
    setApiError('');
    setResponseDetails(null);
    setApiResponse(null);
    
    const startTime = Date.now();

    try {
      // Prepare the API URL with path parameters
      let apiUrl = currentEndpoint.url;
      if (apiUrl.includes('{employee_id}') && requestParams.employee_id) {
        apiUrl = apiUrl.replace('{employee_id}', requestParams.employee_id);
      }

      // Add query parameters
      if (currentEndpoint.queryParams.length > 0) {
        const queryParams = new URLSearchParams();
        
        currentEndpoint.queryParams.forEach(param => {
          if (requestParams[param.name]) {
            queryParams.append(param.name, requestParams[param.name]);
          }
        });
        
        const queryString = queryParams.toString();
        if (queryString) {
          apiUrl += `?${queryString}`;
        }
      }

      // Create headers for the request
      const headers: {[key: string]: string} = {
        ...requestHeaders,
        'X-API-KEY': apiKey,
      };

      // Prepare request options
      const options: RequestInit = {
        method: currentEndpoint.method,
        headers
      };

      // Add body for POST, PUT methods
      if (['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method)) {
        if (bodyType === 'raw' && rawBody) {
          options.body = rawBody;
        } else {
          const bodyData: {[key: string]: any} = {};
          
          if (currentEndpoint.bodyParams) {
            currentEndpoint.bodyParams.forEach(param => {
              if (requestParams[param.name]) {
                // Convert numbers to number type
                if (param.type === 'number' || param.type === 'integer') {
                  bodyData[param.name] = Number(requestParams[param.name]);
                } else {
                  bodyData[param.name] = requestParams[param.name];
                }
              }
            });
          }
          
          options.body = JSON.stringify(bodyData);
        }
      }

      // Display request details in console for debugging
      console.log('Request URL:', apiUrl);
      console.log('Request Options:', options);

      // Make the API call
      const response = await fetch(apiUrl, options);
      const responseData = await response.json();
      const endTime = Date.now();
      
      // Calculate response size
      const responseSize = JSON.stringify(responseData).length;
      const formattedSize = responseSize < 1024 
        ? `${responseSize} B` 
        : `${(responseSize / 1024).toFixed(2)} KB`;

      // Set response details
      setResponseDetails({
        status: response.status,
        statusText: response.statusText,
        time: endTime - startTime,
        size: formattedSize
      });

      // Set the response
      setApiResponse(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('API call error:', error);
      const endTime = Date.now();
      
      setResponseDetails({
        status: 0,
        statusText: 'Failed',
        time: endTime - startTime,
        size: '0 B'
      });
      
      setApiError(error instanceof Error ? error.message : 'An error occurred during the API call');
      setIsLoading(false);
    }
  };

  // Initialize request params with example values
  const initializeRequestParams = () => {
    const params: {[key: string]: string} = {};
    
    // Add path parameter
    if (currentEndpoint.url.includes('{employee_id}')) {
      params.employee_id = 'EMP001';
    }
    
    // Add query parameters
    currentEndpoint.queryParams.forEach(param => {
      if (param.example) {
        const exampleValue = param.example.replace('Example: ', '');
        params[param.name] = exampleValue;
      }
    });
    
    // Add body parameters
    if (currentEndpoint.bodyParams) {
      currentEndpoint.bodyParams.forEach(param => {
        if (param.example) {
          const exampleValue = param.example.replace('Example: ', '');
          params[param.name] = exampleValue;
        }
      });
      
      // Set raw body JSON
      const bodyObject = Object.fromEntries(
        currentEndpoint.bodyParams.map(param => [
          param.name,
          param.example ? param.example.replace('Example: ', '') : ''
        ])
      );
      setRawBody(JSON.stringify(bodyObject, null, 2));
    }
    
    setRequestParams(params);
  };

  // Add a header
  const addRequestHeader = (key: string, value: string) => {
    setRequestHeaders(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Remove a header
  const removeRequestHeader = (key: string) => {
    setRequestHeaders(prev => {
      const newHeaders = { ...prev };
      delete newHeaders[key];
      return newHeaders;
    });
  };

  // Open the Try It modal
  const openTryItModal = () => {
    initializeRequestParams();
    setApiResponse(null);
    setApiError('');
    setResponseDetails(null);
    setActiveRequestTab('params');
    setBodyType('form');
    
    // Set initial headers based on current endpoint
    const initialHeaders: {[key: string]: string} = {
      'Content-Type': 'application/json'
    };
    
    currentEndpoint.headerParams.forEach(param => {
      if (param.name !== 'X-API-KEY') { // API key is handled separately
        initialHeaders[param.name] = param.example ? param.example.replace('Example: ', '') : '';
      }
    });
    
    setRequestHeaders(initialHeaders);
    
    // Set API key from environment if available
    const env = environments.find(e => e.name === activeEnvironment);
    if (env && env.variables.apiKey) {
      setApiKey(env.variables.apiKey);
    } else {
      setApiKey('');
    }
    
    setShowTryItModal(true);
  };

  // Update a single request parameter
  const updateRequestParam = (paramName: string, value: string) => {
    setRequestParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Toggle environment modal
  const toggleEnvironmentModal = () => {
    setShowEnvironmentModal(!showEnvironmentModal);
  };

  // Select an environment
  const selectEnvironment = (envName: string) => {
    setActiveEnvironment(envName);
    const env = environments.find(e => e.name === envName);
    if (env && env.variables.apiKey) {
      setApiKey(env.variables.apiKey);
    }
    setShowEnvironmentModal(false);
  };

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

  // Function to copy code to clipboard
  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
  };

  // Update the response schema component to match the example data
  const renderResponseSchema = () => {
    return (
      <div className="response-schema">
        <div className="response-type-header">application/json</div>
        
        <div className="schema-row">
          <div className="field-key">employee_id</div>
          <div className="field-type">string</div>
          <div className="field-required">required</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">first_name</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">last_name</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">email</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">phone_number</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">hire_date</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">job_title</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">job_id</div>
          <div className="field-type">integer</div>
          <div className="field-required">optional</div>
        </div>
        
        <div className="schema-row">
          <div className="field-key">department</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>

        <div className="schema-row">
          <div className="field-key">status</div>
          <div className="field-type">string</div>
          <div className="field-required">optional</div>
        </div>
      </div>
    );
  };

  // Update response example to match the screenshot
  const renderResponseExample = () => {
    return (
      <pre className="json-example">
        <div dangerouslySetInnerHTML={{ 
          __html: `{
  <span class="property">"employee_id"</span>: <span class="string">"EMP001"</span>,
  <span class="property">"first_name"</span>: <span class="string">"John"</span>,
  <span class="property">"last_name"</span>: <span class="string">"Smith"</span>,
  <span class="property">"email"</span>: <span class="string">"john.smith@example.com"</span>,
  <span class="property">"phone_number"</span>: <span class="string">"+1 123-456-7890"</span>,
  <span class="property">"hire_date"</span>: <span class="string">"2019-06-15"</span>,
  <span class="property">"job_title"</span>: <span class="string">"Senior Developer"</span>,
  <span class="property">"job_id"</span>: <span class="number">5</span>,
  <span class="property">"department"</span>: <span class="string">"Engineering"</span>,
  <span class="property">"status"</span>: <span class="string">"active"</span>
}`
        }} />
      </pre>
    );
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

  // Toggle theme function
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply theme classes to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  };

  // Apply theme class on component mount
  useEffect(() => {
    // Initialize with dark theme
    document.documentElement.classList.add('dark-theme');
  }, []);

  // Add search filter function
  const getFilteredEndpoints = (category: string) => {
    if (!searchTerm) {
      // If no search term, return all endpoints for this category
      return Object.keys(endpointData).filter(key => endpointData[key].breadcrumb.toLowerCase() === category.toLowerCase());
    }
    
    // Filter endpoints by search term and category
    return Object.keys(endpointData).filter(key => {
      const endpoint = endpointData[key];
      return endpoint.breadcrumb.toLowerCase() === category.toLowerCase() && 
        (endpoint.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         key.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
    
    // If search is not empty, open all categories to show search results
    if (searchText) {
      setOpenCategories(['employee', 'salary', 'payroll']);
    }
  };

  // Add a function to highlight search matches
  const highlightMatch = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight-match">$1</span>');
  };

  return (
    <div className={`api-doc-container ${mobileMenuOpen ? 'mobile-menu-open' : ''} ${darkMode ? 'dark-theme' : 'light-theme'}`}>
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
            <img src="/logo.svg" alt="ai logo" width="20" height="20" />
          </div>
          <h3 className="logo-text">employee-api</h3>
          <div className="theme-toggle" onClick={toggleTheme}>
            <img src={darkMode ? "/moon.svg" : "/sun.svg"} alt={darkMode ? "light mode" : "dark mode"} width="16" height="16" />
          </div>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search endpoints..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="search-clear-button" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('employee') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('employee')}
            data-category="employee"
          >
            <span>Employee Management</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('employee') ? 'visible' : 'hidden'}`}>
            {getFilteredEndpoints('employee').map(endpointKey => (
              <li 
                key={endpointKey}
                className={`section-link ${activeEndpoint === endpointKey ? 'active' : ''}`}
                onClick={(event) => handleMobileEndpointClick(endpointKey, event)}
                data-endpoint={endpointKey}
              >
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(endpointData[endpointKey].title) }}></span>
                <span className={`method-tag ${getMethodClassName(endpointData[endpointKey].method)}`}>
                  {endpointData[endpointKey].method}
                </span>
              </li>
            ))}
            {getFilteredEndpoints('employee').length === 0 && searchTerm && (
              <li className="no-results">No matching endpoints found</li>
            )}
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('salary') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('salary')}
            data-category="salary"
          >
            <span>Salary Management</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('salary') ? 'visible' : 'hidden'}`}>
            {getFilteredEndpoints('salary').map(endpointKey => (
              <li 
                key={endpointKey}
                className={`section-link ${activeEndpoint === endpointKey ? 'active' : ''}`}
                onClick={(event) => handleMobileEndpointClick(endpointKey, event)}
                data-endpoint={endpointKey}
              >
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(endpointData[endpointKey].title) }}></span>
                <span className={`method-tag ${getMethodClassName(endpointData[endpointKey].method)}`}>
                  {endpointData[endpointKey].method}
                </span>
              </li>
            ))}
            {getFilteredEndpoints('salary').length === 0 && searchTerm && (
              <li className="no-results">No matching endpoints found</li>
            )}
          </ul>
        </div>
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('payroll') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('payroll')}
            data-category="payroll"
          >
            <span>Payroll Management</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('payroll') ? 'visible' : 'hidden'}`}>
            {getFilteredEndpoints('payroll').map(endpointKey => (
              <li 
                key={endpointKey}
                className={`section-link ${activeEndpoint === endpointKey ? 'active' : ''}`}
                onClick={(event) => handleMobileEndpointClick(endpointKey, event)}
                data-endpoint={endpointKey}
              >
                <span dangerouslySetInnerHTML={{ __html: highlightMatch(endpointData[endpointKey].title) }}></span>
                <span className={`method-tag ${getMethodClassName(endpointData[endpointKey].method)}`}>
                  {endpointData[endpointKey].method}
                </span>
              </li>
            ))}
            {getFilteredEndpoints('payroll').length === 0 && searchTerm && (
              <li className="no-results">No matching endpoints found</li>
            )}
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
          <button className="try-it-button" onClick={openTryItModal}>Try it</button>
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
            <button 
              className={`copy-button ${copiedCode ? 'copied' : ''}`} 
              onClick={() => copyCodeToClipboard(renderCodeSample(activeTab))}
            >
              {copiedCode ? 'Copied!' : 'Copy'}
            </button>
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
                    {renderResponseSchema()}
                  </div>
                  <div className="response-right-column">
                    <div className="example-header">Example</div>
                    {renderResponseExample()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Try It Modal */}
        {showTryItModal && (
          <div className="try-it-modal-overlay">
            <div className="try-it-modal">
              <div className="try-it-modal-header">
                <div className="try-it-title-section">
                  <span className={`endpoint-method ${getMethodClassName(currentEndpoint.method)}`}>
                    {currentEndpoint.method}
                  </span>
                  <h2>{currentEndpoint.title}</h2>
                </div>
                <div className="try-it-controls">
                  <button 
                    className="environment-selector" 
                    onClick={toggleEnvironmentModal}
                  >
                    {activeEnvironment} <span className="dropdown-arrow">▼</span>
                  </button>
                  <button 
                    className="try-it-modal-close" 
                    onClick={() => setShowTryItModal(false)}
                  >
                    &times;
                  </button>
                </div>
              </div>
              
              <div className="try-it-url-bar">
                <span className={`method-badge ${getMethodClassName(currentEndpoint.method)}`}>
                  {currentEndpoint.method}
                </span>
                <div className="url-display">
                  {currentEndpoint.url.includes('{employee_id}') 
                    ? currentEndpoint.url.replace('{employee_id}', requestParams.employee_id || '{employee_id}')
                    : currentEndpoint.url
                  }
                </div>
                <button 
                  className={`send-request-button ${isLoading ? 'loading' : ''}`} 
                  onClick={handleApiCall}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="button-spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : 'Send'}
                </button>
              </div>
              
              <div className="try-it-tabs">
                <button 
                  className={`try-it-tab ${activeRequestTab === 'params' ? 'active' : ''}`}
                  onClick={() => setActiveRequestTab('params')}
                >
                  Params
                </button>
                <button 
                  className={`try-it-tab ${activeRequestTab === 'headers' ? 'active' : ''}`}
                  onClick={() => setActiveRequestTab('headers')}
                >
                  Headers
                </button>
                {['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && (
                  <button 
                    className={`try-it-tab ${activeRequestTab === 'body' ? 'active' : ''}`}
                    onClick={() => setActiveRequestTab('body')}
                  >
                    Body
                  </button>
                )}
                <button 
                  className={`try-it-tab ${activeRequestTab === 'auth' ? 'active' : ''}`}
                  onClick={() => setActiveRequestTab('auth')}
                >
                  Authorization
                </button>
              </div>
              
              <div className="try-it-modal-content">
                {activeRequestTab === 'params' && (
                  <div className="try-it-section">
                    {currentEndpoint.url.includes('{employee_id}') && (
                      <div className="path-params-section">
                        <h3>Path Parameters</h3>
                        <div className="try-it-form-group">
                          <label htmlFor="employee-id">employee_id</label>
                          <input
                            type="text"
                            id="employee-id"
                            value={requestParams.employee_id || ''}
                            onChange={(e) => updateRequestParam('employee_id', e.target.value)}
                            placeholder="Enter employee ID (e.g. EMP001)"
                          />
                          <div className="param-description">Required path parameter for identifying the employee</div>
                        </div>
                      </div>
                    )}
                    
                    {currentEndpoint.queryParams.length > 0 && (
                      <div className="query-params-section">
                        <h3>Query Parameters</h3>
                        {currentEndpoint.queryParams.map((param, index) => (
                          <div className="try-it-form-group" key={index}>
                            <div className="param-header">
                              <label htmlFor={`param-${param.name}`}>
                                {param.name}
                              </label>
                              {param.required && <span className="required-badge">required</span>}
                            </div>
                            <input
                              type={param.type === 'integer' || param.type === 'number' ? 'number' : 'text'}
                              id={`param-${param.name}`}
                              value={requestParams[param.name] || ''}
                              onChange={(e) => updateRequestParam(param.name, e.target.value)}
                              placeholder={param.example ? `Enter ${param.name} (${param.example.replace('Example: ', '')})` : `Enter ${param.name}`}
                            />
                            <div className="param-description">{param.description || `${param.type} - Optional query parameter`}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeRequestTab === 'headers' && (
                  <div className="try-it-section">
                    <h3>HTTP Headers</h3>
                    <div className="param-description">Headers are sent with every request to authenticate and provide additional context.</div>
                    <div className="headers-table">
                      <div className="headers-row header">
                        <div className="header-key">Key</div>
                        <div className="header-value">Value</div>
                        <div className="header-actions"></div>
                      </div>
                      
                      {Object.entries(requestHeaders).map(([key, value], index) => (
                        <div className="headers-row" key={index}>
                          <div className="header-key">
                            <input 
                              type="text" 
                              value={key} 
                              onChange={(e) => {
                                const newKey = e.target.value;
                                const headers = { ...requestHeaders };
                                delete headers[key];
                                headers[newKey] = value;
                                setRequestHeaders(headers);
                              }}
                              placeholder="Header name"
                            />
                          </div>
                          <div className="header-value">
                            <input 
                              type="text" 
                              value={value} 
                              onChange={(e) => addRequestHeader(key, e.target.value)}
                              placeholder="Header value"
                            />
                          </div>
                          <div className="header-actions">
                            <button 
                              className="remove-header-btn" 
                              onClick={() => removeRequestHeader(key)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="add-header-row">
                        <button 
                          className="add-header-btn"
                          onClick={() => addRequestHeader(`Header-${Object.keys(requestHeaders).length + 1}`, '')}
                        >
                          Add Header
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeRequestTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && (
                  <div className="try-it-section">
                    <div className="body-type-selector">
                      <button 
                        className={`body-type-btn ${bodyType === 'form' ? 'active' : ''}`}
                        onClick={() => setBodyType('form')}
                      >
                        Form
                      </button>
                      <button 
                        className={`body-type-btn ${bodyType === 'raw' ? 'active' : ''}`}
                        onClick={() => setBodyType('raw')}
                      >
                        Raw JSON
                      </button>
                    </div>
                    
                    {bodyType === 'form' && currentEndpoint.bodyParams && (
                      <div className="form-body-section">
                        <h3>Body Parameters</h3>
                        <div className="param-description">These parameters will be sent in the request body as JSON.</div>
                        {currentEndpoint.bodyParams.map((param, index) => (
                          <div className="try-it-form-group" key={index}>
                            <div className="param-header">
                              <label htmlFor={`body-param-${param.name}`}>
                                {param.name}
                              </label>
                              {param.required && <span className="required-badge">required</span>}
                            </div>
                            <input
                              type={param.type === 'integer' || param.type === 'number' ? 'number' : 'text'}
                              id={`body-param-${param.name}`}
                              value={requestParams[param.name] || ''}
                              onChange={(e) => updateRequestParam(param.name, e.target.value)}
                              placeholder={param.example ? `Enter ${param.name} (${param.example.replace('Example: ', '')})` : `Enter ${param.name}`}
                            />
                            <div className="param-description">{param.description || `${param.type}${param.required ? ' - Required parameter' : ' - Optional parameter'}`}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {bodyType === 'raw' && (
                      <div className="raw-body-section">
                        <div className="raw-body-header">
                          <span>JSON</span>
                        </div>
                        <textarea
                          className="raw-body-editor"
                          value={rawBody}
                          onChange={(e) => setRawBody(e.target.value)}
                          placeholder="Enter raw JSON body"
                          rows={10}
                        />
                        <div className="param-description">Enter a valid JSON object that matches the expected request body structure.</div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeRequestTab === 'auth' && (
                  <div className="try-it-section">
                    <h3>API Key Authentication</h3>
                    <div className="try-it-form-group">
                      <label htmlFor="api-key">API Key</label>
                      <input
                        type="text"
                        id="api-key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key (required for all requests)"
                      />
                      <div className="auth-description">
                        <strong>Required for all API calls.</strong> The API key authenticates your requests and determines your access level. Add the API key as a header with the name 'X-API-KEY'.
                      </div>
                    </div>
                    <div className="environment-info">
                      <h4>Current Environment: {activeEnvironment}</h4>
                      <div className="environment-variables">
                        <div className="environment-variable">
                          <span className="env-var-name">Base URL:</span>
                          <span className="env-var-value">{environments.find(e => e.name === activeEnvironment)?.variables.baseUrl || ''}</span>
                        </div>
                      </div>
                      <button 
                        className="change-environment-btn"
                        onClick={toggleEnvironmentModal}
                      >
                        Change Environment
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Response Section */}
                {(apiResponse || apiError || isLoading) && (
                  <div className="try-it-response-section">
                    <div className="response-header">
                      <h3>Response</h3>
                      {responseDetails && (
                        <div className="response-meta">
                          <span className={`status-code ${responseDetails.status >= 200 && responseDetails.status < 300 ? 'success' : 'error'}`}>
                            {responseDetails.status} {responseDetails.statusText}
                          </span>
                          <span className="response-time">{responseDetails.time} ms</span>
                          <span className="response-size">{responseDetails.size}</span>
                        </div>
                      )}
                    </div>
                    
                    {isLoading && (
                      <div className="response-loading">
                        <div className="loading-spinner"></div>
                        <div>Fetching response...</div>
                      </div>
                    )}
                    
                    {apiError && !isLoading && (
                      <div className="response-error">
                        <h4>Error</h4>
                        <div className="error-message">{apiError}</div>
                      </div>
                    )}
                    
                    {apiResponse && !isLoading && (
                      <div className="response-body">
                        <div className="response-body-header">
                          <span>Response Body</span>
                          <button 
                            className={`copy-response-btn ${copiedCode ? 'copied' : ''}`}
                            onClick={() => copyCodeToClipboard(JSON.stringify(apiResponse, null, 2))}
                          >
                            {copiedCode ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="response-json">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Environment Selection Modal */}
        {showEnvironmentModal && (
          <div className="environment-modal">
            <div className="environment-modal-header">
              <h3>Select Environment</h3>
            </div>
            <div className="environment-list">
              {environments.map((env, index) => (
                <div 
                  key={index} 
                  className={`environment-item ${activeEnvironment === env.name ? 'active' : ''}`}
                  onClick={() => selectEnvironment(env.name)}
                >
                  {env.name}
                </div>
              ))}
            </div>
            <div className="environment-modal-footer">
              <button 
                className="close-env-modal-btn"
                onClick={toggleEnvironmentModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Custom cursor for enhanced UI effect */}
      <div className="custom-cursor"></div>
    </div>
  );
};

export default ApiDoc; 