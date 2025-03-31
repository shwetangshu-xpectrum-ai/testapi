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

// Interface for employee insurance data
interface EmployeeInsuranceDataType {
  employee_id: string;
  plan_name?: string;
  insurance_plan_id?: string;
  enrollment_date?: string;
  coverage_type?: string;
  employee_contribution?: number;
  enrollment_time?: string;
}

// Interface for insurance data
interface InsuranceDataType {
  employee_id: string;
  plan_name?: string;
  insurance_plan_id?: string;
  enrollment_date?: string;
  coverage_type?: string;
  employee_contribution?: number;
  enrollment_time?: string;
  premium_per_month?: number;
}

// Interface for insurance plan
interface InsurancePlanType {
  plan_name: string;
  plan_id?: string;
  network?: string;
  deductible_individual_family?: string;
  out_of_pocket_maximum_individual_family?: string;
  coinsurance?: string;
  overall_lifetime_maximum?: string;
  rates_premium_employee_only?: number;
  rates_premium_employer_contribution_employee_only?: number;
  rates_premium_employee_contribution_employee_only?: number;
  rates_premium_employee_spouse?: number;
  rates_premium_employer_contribution_employee_spouse?: number;
  rates_premium_employee_contribution_employee_spouse?: number;
  rates_premium_employee_children?: number;
  rates_premium_employer_contribution_employee_children?: number;
  rates_premium_employee_contribution_employee_children?: number;
  rates_premium_family?: number;
  rates_premium_employer_contribution_family?: number;
  rates_premium_employee_contribution_family?: number;
}

// Interface for leave balance data
interface LeaveBalanceDataType {
  employee_id: string;
  annual_leave_balance?: number;
  sick_leave_balance?: number;
  personal_leave_balance?: number;
  unpaid_leave_taken?: number;
  leave_balance_updated_date?: string;
}

// Interface for leave requests
interface LeaveRequestsType {
  employee_id?: string;
  application_id: number;
  start_date?: string;
  total_working_days_off?: number;
  total_days_off?: number;
  end_date?: string;
  deduction_from_salary?: number;
  leave_type?: string;
  reason?: string;
  request_date?: string;
  request_time?: string;
  reviewed_by?: string;
  status?: string;
  approved_by?: string;
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
  const [openCategories, setOpenCategories] = useState<string[]>(['employee', 'salary', 'payroll', 'insurance', 'leave']);
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
    headers?: Record<string, string>;
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
  const [apiBaseUrl, setApiBaseUrl] = useState('https://hrms-api.xpectrum-ai.com/hrms/api/v1');
  const [realEmployeeId, setRealEmployeeId] = useState('EM37938');

  // Add a state for editing mode
  const [isEditingApiConfig, setIsEditingApiConfig] = useState(false);

  // Add a new state variable
  const [isResponseFromApi, setIsResponseFromApi] = useState(false);
  
  // Add state for editable URL
  const [editableUrl, setEditableUrl] = useState('');
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  // Initialize apiBaseUrl from localStorage if available
  useEffect(() => {
    const savedBaseUrl = localStorage.getItem('apiBaseUrl');
    if (savedBaseUrl) {
      setApiBaseUrl(savedBaseUrl);
    }
  }, []);
  
  // Save apiBaseUrl to localStorage whenever it changes
  useEffect(() => {
    if (apiBaseUrl) {
      localStorage.setItem('apiBaseUrl', apiBaseUrl);
    }
  }, [apiBaseUrl]);

  const endpointData: EndpointsType = {
    getAllEmployees: {
      title: 'Get All Employees',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/all_employee_data',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
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
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}',
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
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'source', type: 'string', required: false, example: 'Example: system' },
        { name: 'sync', type: 'boolean', required: false, example: 'Example: true' }
      ],
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
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'source', type: 'string', required: false, example: 'Example: system' },
        { name: 'notify', type: 'boolean', required: false, example: 'Example: true' }
      ],
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
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Employee',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'force', type: 'boolean', required: false, example: 'Example: false' },
        { name: 'archive', type: 'boolean', required: false, example: 'Example: true' }
      ],
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
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info/{employee_id}',
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
    updateSalaryInfo: {
      title: 'Update Salary Information',
      method: 'PUT',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Salary',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'backdated', type: 'boolean', required: false, example: 'Example: false' },
        { name: 'notify', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'base_salary', type: 'number', required: false, example: 'Example: 90000.00' },
        { name: 'salary_type', type: 'string', required: false, example: 'Example: annual' },
        { name: 'bonus', type: 'number', required: false, example: 'Example: 6000.00' },
        { name: 'commission', type: 'number', required: false, example: 'Example: 2000.00' },
        { name: 'currency', type: 'string', required: false, example: 'Example: USD' },
        { name: 'salary_grade', type: 'string', required: false, example: 'Example: L4' },
        { name: 'last_salary_increase_date', type: 'string', required: false, example: 'Example: 2023-05-01' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 90000.00,
  "salary_type": "annual",
  "bonus": 6000.00,
  "commission": 2000.00,
  "currency": "USD",
  "salary_grade": "L4",
  "last_salary_increase_date": "2023-05-01",
  "updated_at": "2023-05-20T14:30:45Z"
}`
      }
    },
    createSalaryInfo: {
      title: 'Create Salary Information',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info',
      badge: 'Stable',
      breadcrumb: 'Salary',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'backdated', type: 'boolean', required: false, example: 'Example: false' },
        { name: 'effective_date', type: 'string', required: false, example: 'Example: 2023-06-01' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP003' },
        { name: 'base_salary', type: 'number', required: true, example: 'Example: 75000.00' },
        { name: 'salary_type', type: 'string', required: true, example: 'Example: annual' },
        { name: 'bonus', type: 'number', required: false, example: 'Example: 2000.00' },
        { name: 'commission', type: 'number', required: false, example: 'Example: 0.00' },
        { name: 'currency', type: 'string', required: false, example: 'Example: USD' },
        { name: 'salary_grade', type: 'string', required: false, example: 'Example: L2' }
      ],
      response: {
        example: `{
  "employee_id": "EMP003",
  "base_salary": 75000.00,
  "salary_type": "annual",
  "bonus": 2000.00,
  "commission": 0.00,
  "currency": "USD",
  "salary_grade": "L2",
  "created_at": "2023-05-22T10:15:20Z"
}`
      }
    },
    getPayrollData: {
      title: 'Get Payroll Data',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [
        { name: 'month', type: 'string', required: false, example: 'Example: 2023-05' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-05",
  "salary_received_day": "2023-05-30"
}`
      }
    },
    updatePayrollData: {
      title: 'Update Payroll Data',
      method: 'PUT',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'base_salary', type: 'number', required: false, example: 'Example: 85000.00' },
        { name: 'federal_tax', type: 'number', required: false, example: 'Example: 1458.33' },
        { name: 'state_tax', type: 'number', required: false, example: 'Example: 625.00' },
        { name: 'total_tax', type: 'number', required: false, example: 'Example: 2083.33' },
        { name: 'month', type: 'string', required: true, example: 'Example: 2023-05' },
        { name: 'salary_received_day', type: 'string', required: false, example: 'Example: 2023-05-30' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-05",
  "salary_received_day": "2023-05-30",
  "updated_at": "2023-05-25T09:45:12Z"
}`
      }
    },
    createPayrollData: {
      title: 'Create Payroll Data',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll',
      badge: 'Stable',
      breadcrumb: 'Payroll',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'tax_year', type: 'string', required: false, example: 'Example: 2023' },
        { name: 'recalculate', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' },
        { name: 'base_salary', type: 'number', required: true, example: 'Example: 85000.00' },
        { name: 'federal_tax', type: 'number', required: true, example: 'Example: 1458.33' },
        { name: 'state_tax', type: 'number', required: true, example: 'Example: 625.00' },
        { name: 'total_tax', type: 'number', required: true, example: 'Example: 2083.33' },
        { name: 'month', type: 'string', required: true, example: 'Example: 2023-06' },
        { name: 'salary_received_day', type: 'string', required: true, example: 'Example: 2023-06-30' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-06",
  "salary_received_day": "2023-06-30",
  "created_at": "2023-06-01T14:30:20Z"
}`
      }
    },
    getEmployeeInsuranceData: {
      title: 'Get Employee Insurance Data',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "plan_name": "Premium Health Plan",
  "insurance_plan_id": "INS-PLAN-001",
  "enrollment_date": "2022-01-15",
  "coverage_type": "family",
  "employee_contribution": 250.00,
  "enrollment_time": "10:30:45"
}`
      }
    },
    updateEmployeeInsuranceData: {
      title: 'Update Employee Insurance Data',
      method: 'PUT',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'effective_date', type: 'string', required: false, example: 'Example: 2023-07-01' },
        { name: 'notify', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'plan_name', type: 'string', required: false, example: 'Example: Gold Health Plan' },
        { name: 'insurance_plan_id', type: 'string', required: false, example: 'Example: INS-PLAN-002' },
        { name: 'enrollment_date', type: 'string', required: false, example: 'Example: 2023-01-15' },
        { name: 'coverage_type', type: 'string', required: false, example: 'Example: employee+spouse' },
        { name: 'employee_contribution', type: 'number', required: false, example: 'Example: 180.00' },
        { name: 'enrollment_time', type: 'string', required: false, example: 'Example: 11:45:30' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "plan_name": "Gold Health Plan",
  "insurance_plan_id": "INS-PLAN-002",
  "enrollment_date": "2023-01-15",
  "coverage_type": "employee+spouse",
  "employee_contribution": 180.00,
  "enrollment_time": "11:45:30",
  "updated_at": "2023-02-10T09:15:22Z"
}`
      }
    },
    createEmployeeInsuranceData: {
      title: 'Create Employee Insurance Data',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'immediate', type: 'boolean', required: false, example: 'Example: true' },
        { name: 'notify_hr', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP003' },
        { name: 'plan_name', type: 'string', required: true, example: 'Example: Standard Health Plan' },
        { name: 'insurance_plan_id', type: 'string', required: true, example: 'Example: INS-PLAN-003' },
        { name: 'enrollment_date', type: 'string', required: true, example: 'Example: 2023-05-01' },
        { name: 'coverage_type', type: 'string', required: true, example: 'Example: employee_only' },
        { name: 'employee_contribution', type: 'number', required: true, example: 'Example: 120.00' },
        { name: 'enrollment_time', type: 'string', required: false, example: 'Example: 09:30:00' }
      ],
      response: {
        example: `{
  "employee_id": "EMP003",
  "plan_name": "Standard Health Plan",
  "insurance_plan_id": "INS-PLAN-003",
  "enrollment_date": "2023-05-01",
  "coverage_type": "employee_only",
  "employee_contribution": 120.00,
  "enrollment_time": "09:30:00",
  "created_at": "2023-05-01T09:30:00Z"
}`
      }
    },
    getInsuranceData: {
      title: 'Get Insurance Data',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "plan_name": "Premium Health Plan",
  "insurance_plan_id": "INS-PLAN-001",
  "enrollment_date": "2022-01-15",
  "coverage_type": "family",
  "employee_contribution": 250.00,
  "enrollment_time": "10:30:45",
  "premium_per_month": 950.00
}`
      }
    },
    getInsurancePlan: {
      title: 'Get Insurance Plan',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_plan/{plan_name}',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "plan_name": "Premium Health Plan",
  "plan_id": "INS-PLAN-001",
  "network": "Nationwide",
  "deductible_individual_family": "$500/$1000",
  "out_of_pocket_maximum_individual_family": "$3000/$6000",
  "coinsurance": "80/20",
  "overall_lifetime_maximum": "Unlimited",
  "rates_premium_employee_only": 500.00,
  "rates_premium_employer_contribution_employee_only": 400.00,
  "rates_premium_employee_contribution_employee_only": 100.00,
  "rates_premium_employee_spouse": 800.00,
  "rates_premium_employer_contribution_employee_spouse": 600.00,
  "rates_premium_employee_contribution_employee_spouse": 200.00,
  "rates_premium_employee_children": 750.00,
  "rates_premium_employer_contribution_employee_children": 550.00,
  "rates_premium_employee_contribution_employee_children": 200.00,
  "rates_premium_family": 1200.00,
  "rates_premium_employer_contribution_family": 950.00,
  "rates_premium_employee_contribution_family": 250.00
}`
      }
    },
    createInsurancePlan: {
      title: 'Create Insurance Plan',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_plan',
      badge: 'Stable',
      breadcrumb: 'Insurance',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'effective_date', type: 'string', required: false, example: 'Example: 2023-08-01' },
        { name: 'company_wide', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'plan_name', type: 'string', required: true, example: 'Example: Essential Health Plan' },
        { name: 'plan_id', type: 'string', required: true, example: 'Example: INS-PLAN-004' },
        { name: 'network', type: 'string', required: false, example: 'Example: Regional' },
        { name: 'deductible_individual_family', type: 'string', required: false, example: 'Example: $1000/$2000' },
        { name: 'out_of_pocket_maximum_individual_family', type: 'string', required: false, example: 'Example: $5000/$10000' },
        { name: 'coinsurance', type: 'string', required: false, example: 'Example: 70/30' },
        { name: 'overall_lifetime_maximum', type: 'string', required: false, example: 'Example: Unlimited' },
        { name: 'rates_premium_employee_only', type: 'number', required: true, example: 'Example: 350.00' },
        { name: 'rates_premium_employer_contribution_employee_only', type: 'number', required: true, example: 'Example: 250.00' },
        { name: 'rates_premium_employee_contribution_employee_only', type: 'number', required: true, example: 'Example: 100.00' },
        { name: 'rates_premium_employee_spouse', type: 'number', required: false, example: 'Example: 600.00' },
        { name: 'rates_premium_employer_contribution_employee_spouse', type: 'number', required: false, example: 'Example: 450.00' },
        { name: 'rates_premium_employee_contribution_employee_spouse', type: 'number', required: false, example: 'Example: 150.00' }
      ],
      response: {
        example: `{
  "plan_name": "Essential Health Plan",
  "plan_id": "INS-PLAN-004",
  "network": "Regional",
  "deductible_individual_family": "$1000/$2000",
  "out_of_pocket_maximum_individual_family": "$5000/$10000",
  "coinsurance": "70/30",
  "overall_lifetime_maximum": "Unlimited",
  "rates_premium_employee_only": 350.00,
  "rates_premium_employer_contribution_employee_only": 250.00,
  "rates_premium_employee_contribution_employee_only": 100.00,
  "rates_premium_employee_spouse": 600.00,
  "rates_premium_employer_contribution_employee_spouse": 450.00,
  "rates_premium_employee_contribution_employee_spouse": 150.00,
  "created_at": "2023-05-15T15:45:30Z"
}`
      }
    },
    getLeaveBalanceData: {
      title: 'Get Leave Balance Data',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "annual_leave_balance": 15,
  "sick_leave_balance": 10,
  "personal_leave_balance": 3,
  "unpaid_leave_taken": 0,
  "leave_balance_updated_date": "2023-05-01"
}`
      }
    },
    updateLeaveBalanceData: {
      title: 'Update Leave Balance Data',
      method: 'PUT',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data/{employee_id}',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'reset', type: 'boolean', required: false, example: 'Example: false' },
        { name: 'prorate', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'annual_leave_balance', type: 'integer', required: false, example: 'Example: 12' },
        { name: 'sick_leave_balance', type: 'integer', required: false, example: 'Example: 8' },
        { name: 'personal_leave_balance', type: 'integer', required: false, example: 'Example: 2' },
        { name: 'unpaid_leave_taken', type: 'integer', required: false, example: 'Example: 1' },
        { name: 'leave_balance_updated_date', type: 'string', required: false, example: 'Example: 2023-05-15' }
      ],
      response: {
        example: `{
  "employee_id": "EMP001",
  "annual_leave_balance": 12,
  "sick_leave_balance": 8,
  "personal_leave_balance": 2,
  "unpaid_leave_taken": 1,
  "leave_balance_updated_date": "2023-05-15",
  "updated_at": "2023-05-15T10:20:30Z"
}`
      }
    },
    createLeaveBalanceData: {
      title: 'Create Leave Balance Data',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'year', type: 'string', required: false, example: 'Example: 2023' },
        { name: 'prorate', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP003' },
        { name: 'annual_leave_balance', type: 'integer', required: true, example: 'Example: 20' },
        { name: 'sick_leave_balance', type: 'integer', required: true, example: 'Example: 12' },
        { name: 'personal_leave_balance', type: 'integer', required: true, example: 'Example: 5' },
        { name: 'unpaid_leave_taken', type: 'integer', required: false, example: 'Example: 0' },
        { name: 'leave_balance_updated_date', type: 'string', required: true, example: 'Example: 2023-05-01' }
      ],
      response: {
        example: `{
  "employee_id": "EMP003",
  "annual_leave_balance": 20,
  "sick_leave_balance": 12,
  "personal_leave_balance": 5,
  "unpaid_leave_taken": 0,
  "leave_balance_updated_date": "2023-05-01",
  "created_at": "2023-05-01T09:00:00Z"
}`
      }
    },
    getLeaveRequest: {
      title: 'Get Leave Request',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests/{application_id}',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "application_id": 12345,
  "employee_id": "EMP001",
  "start_date": "2023-06-10",
  "total_working_days_off": 5,
  "total_days_off": 7,
  "end_date": "2023-06-16",
  "deduction_from_salary": 0,
  "leave_type": "annual",
  "reason": "Family vacation",
  "request_date": "2023-05-15",
  "request_time": "14:30:00",
  "reviewed_by": "EMP010",
  "status": "approved",
  "approved_by": "EMP010"
}`
      }
    },
    getAllLeaveRequests: {
      title: 'Get All Leave Requests',
      method: 'GET',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'employee_id', type: 'string', required: false, example: 'Example: EMP001' },
        { name: 'status', type: 'string', required: false, example: 'Example: approved' },
        { name: 'leave_type', type: 'string', required: false, example: 'Example: annual' },
        { name: 'start_date_from', type: 'string', required: false, example: 'Example: 2023-01-01' },
        { name: 'start_date_to', type: 'string', required: false, example: 'Example: 2023-12-31' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      response: {
        example: `{
  "total": 25,
  "requests": [
    {
      "application_id": 12345,
      "employee_id": "EMP001",
      "start_date": "2023-06-10",
      "total_working_days_off": 5,
      "end_date": "2023-06-16",
      "leave_type": "annual",
      "status": "approved"
    },
    {
      "application_id": 12346,
      "employee_id": "EMP002",
      "start_date": "2023-07-05",
      "total_working_days_off": 2,
      "end_date": "2023-07-06",
      "leave_type": "sick",
      "status": "approved"
    }
  ]
}`
      }
    },
    createLeaveRequest: {
      title: 'Create Leave Request',
      method: 'POST',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'auto_approve', type: 'boolean', required: false, example: 'Example: false' },
        { name: 'notify', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'employee_id', type: 'string', required: true, example: 'Example: EMP001' },
        { name: 'start_date', type: 'string', required: true, example: 'Example: 2023-07-15' },
        { name: 'end_date', type: 'string', required: true, example: 'Example: 2023-07-19' },
        { name: 'leave_type', type: 'string', required: true, example: 'Example: annual' },
        { name: 'reason', type: 'string', required: true, example: 'Example: Family event' },
        { name: 'total_working_days_off', type: 'integer', required: false, example: 'Example: 5' },
        { name: 'total_days_off', type: 'integer', required: false, example: 'Example: 5' },
        { name: 'deduction_from_salary', type: 'integer', required: false, example: 'Example: 0' }
      ],
      response: {
        example: `{
  "application_id": 12347,
  "employee_id": "EMP001",
  "start_date": "2023-07-15",
  "total_working_days_off": 5,
  "total_days_off": 5,
  "end_date": "2023-07-19",
  "deduction_from_salary": 0,
  "leave_type": "annual",
  "reason": "Family event",
  "request_date": "2023-06-01",
  "request_time": "10:15:30",
  "status": "pending",
  "created_at": "2023-06-01T10:15:30Z"
}`
      }
    },
    updateLeaveRequest: {
      title: 'Update Leave Request',
      method: 'PUT',
      url: 'https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests/{application_id}',
      badge: 'Stable',
      breadcrumb: 'Leave',
      queryParams: [
        { name: 'api_key', type: 'string', required: true, example: 'Example: xpectrum_api_key_123@ai' },
        { name: 'notify_employee', type: 'boolean', required: false, example: 'Example: true' },
        { name: 'notify_manager', type: 'boolean', required: false, example: 'Example: true' }
      ],
      headerParams: [
        { name: 'X-API-KEY', type: 'string', required: true, example: 'Example: your_api_key' },
        { name: 'Content-Type', type: 'string', required: true, example: 'Example: application/json' },
        { name: 'Authorization', type: 'string', required: true, example: 'Example: Bearer token' }
      ],
      bodyParams: [
        { name: 'status', type: 'string', required: false, example: 'Example: approved' },
        { name: 'reviewed_by', type: 'string', required: false, example: 'Example: EMP010' },
        { name: 'approved_by', type: 'string', required: false, example: 'Example: EMP010' },
        { name: 'start_date', type: 'string', required: false, example: 'Example: 2023-07-16' },
        { name: 'end_date', type: 'string', required: false, example: 'Example: 2023-07-20' },
        { name: 'reason', type: 'string', required: false, example: 'Example: Family emergency' }
      ],
      response: {
        example: `{
  "application_id": 12347,
  "employee_id": "EMP001",
  "start_date": "2023-07-16",
  "total_working_days_off": 5,
  "total_days_off": 5,
  "end_date": "2023-07-20",
  "deduction_from_salary": 0,
  "leave_type": "annual",
  "reason": "Family emergency",
  "request_date": "2023-06-01",
  "request_time": "10:15:30",
  "reviewed_by": "EMP010",
  "status": "approved",
  "approved_by": "EMP010",
  "updated_at": "2023-06-02T14:20:15Z"
}`
      }
    }
  };

  const currentEndpoint = endpointData[activeEndpoint] || endpointData.getAllEmployees;

  // Load real employee data from the actual API
  const loadRealEmployeeData = () => {
    // Set loading state immediately for better user feedback
    setIsLoading(true);
    
    // Batch state resets for better performance
    setApiError('');
    setResponseDetails(null);
    setApiResponse(null);
    setIsResponseFromApi(true);
    
    // Get API key from current environment
    const env = environments.find(e => e.name === activeEnvironment);
    const currentApiKey = apiKey || (env?.variables.apiKey || '');
    
    // Validate API key for private endpoints
    if (!currentApiKey && currentEndpoint.headerParams.some(p => p.name === 'X-API-KEY' && p.required)) {
      setApiError('API key is required for this endpoint');
      setIsLoading(false);
      setShowTryItModal(true);
      return;
    }
    
    // Validate base URL
    if (!apiBaseUrl) {
      setApiError('API base URL is required');
      setIsLoading(false);
      setShowTryItModal(true);
      return;
    }
    
    const startTime = performance.now();
    
    let apiUrl = `${apiBaseUrl}`;
    
    // For getAllEmployees, use the specific endpoint 
    if (activeEndpoint === 'getAllEmployees') {
      apiUrl = `${apiBaseUrl}/all_employee_data?api_key=xpectrum_api_key_123@ai`;
    } 
    // For other endpoints, use the class name pattern
    else {
      // Handle insurance_plan with plan_name parameter
      if (activeEndpoint.includes('InsurancePlan')) {
        apiUrl += '/insurance_plan';
        
        // Handle path parameters
        if (currentEndpoint.url.includes('{plan_name}')) {
          // Use plan name for this specific endpoint type
          const planName = requestParams.plan_name || 'Premium Health Plan';
          apiUrl += `/${encodeURIComponent(planName)}`;
        }
      }
      // Handle other endpoints that use their respective class names
      else {
        // Map the endpoint to the correct API path based on the class name
        if (activeEndpoint.includes('Employee') && !activeEndpoint.includes('Insurance')) {
          apiUrl += '/employee_data';
        } else if (activeEndpoint.includes('Salary')) {
          apiUrl += '/salary_info';
        } else if (activeEndpoint.includes('Payroll')) {
          apiUrl += '/payroll';
        } else if (activeEndpoint.includes('Insurance') || activeEndpoint.includes('insurance')) {
          apiUrl += '/employee_insurance_data';
        } else if (activeEndpoint.includes('LeaveBalance')) {
          apiUrl += '/leave_balance_data';
        } else if (activeEndpoint.includes('LeaveRequest')) {
          apiUrl += '/leave_requests';
        }
        
        // Handle path parameters like {employee_id} or {application_id}
        if (currentEndpoint.url.includes('{employee_id}')) {
          apiUrl += `/${realEmployeeId}`;
          
          // Update request params
          setRequestParams({
            ...requestParams,
            employee_id: realEmployeeId
          });
        } else if (currentEndpoint.url.includes('{application_id}')) {
          const applicationId = requestParams.application_id || '12345';
          apiUrl += `/${applicationId}`;
        }
      }
    }
    
    // Add query parameters if any exist for this endpoint
    if (currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0) {
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
    
    // Prepare request options based on HTTP method
    const options: RequestInit = {
      method: currentEndpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': currentApiKey
      }
    };
    
    // Add body for POST, PUT, PATCH methods
    if (['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && currentEndpoint.bodyParams) {
      const bodyData: {[key: string]: any} = {};
      
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
      
      options.body = JSON.stringify(bodyData);
    }
    
    // Open the testing modal immediately for better UX
    setShowTryItModal(true);
    
    console.log(`Making ${currentEndpoint.method} request to: ${apiUrl}`);
    
    // Make the API call to the real endpoint
    fetch(apiUrl, options)
      .then(response => {
        // Check for network errors or non-JSON responses
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        return {
          response,
          status: response.status,
          statusText: response.statusText,
          time: Math.round(performance.now() - startTime)
        };
      })
      .then(({response, status, statusText, time}) => {
        return response.json().then(data => ({
          data,
          status,
          statusText,
          time
        }));
      })
      .then(({data, status, statusText, time}) => {
        // Calculate response size
        const responseSize = JSON.stringify(data).length;
        const formattedSize = responseSize < 1024 
          ? `${responseSize} B` 
          : `${(responseSize / 1024).toFixed(2)} KB`;
        
        // Set response details
        setResponseDetails({
          status,
          statusText,
          time,
          size: formattedSize,
          headers: {}
        });
        
        // Set the response
        setApiResponse(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API call error:', error);
        const endTime = performance.now();
        
        setResponseDetails({
          status: 0,
          statusText: 'Failed',
          time: Math.round(endTime - startTime),
          size: '0 B'
        });
        
        setApiError(error instanceof Error ? error.message : 'An error occurred during the API call');
        setIsLoading(false);
      });
  };

  // Function to handle API calls - updated to handle real endpoint
  const handleApiCall = () => {
    // Set loading state immediately for better user feedback
    setIsLoading(true);
    
    // Batch state resets for better performance
    setApiError('');
    setResponseDetails(null);
    setApiResponse(null);
    
    // Get API key from current environment
    const env = environments.find(e => e.name === activeEnvironment);
    const currentApiKey = apiKey || (env?.variables.apiKey || '');
    
    // Validate API key for private endpoints
    if (!currentApiKey && currentEndpoint.headerParams.some(p => p.name === 'X-API-KEY' && p.required)) {
      setApiError('API key is required for this endpoint');
      setIsLoading(false);
      return;
    }
    
    if (apiBaseUrl) {
      setIsResponseFromApi(true);
      const startTime = performance.now();
      
      // Get the current endpoint data
      const currentEndpointData = endpointData[activeEndpoint];
      
      // Use the custom URL if it was edited, otherwise construct it
      let apiUrl = editableUrl || `${apiBaseUrl}`;
      
      // Only construct the URL if no custom URL is provided
      if (!editableUrl) {
        // Map the endpoint to the correct API path
        if (activeEndpoint === 'getAllEmployees') {
          apiUrl = `${apiBaseUrl}/all_employee_data`;
        } else if (activeEndpoint.includes('Employee') && !activeEndpoint.includes('Insurance')) {
          apiUrl += '/employee_data';
        } else if (activeEndpoint.includes('Salary')) {
          apiUrl += '/salary_info';
        } else if (activeEndpoint.includes('Payroll')) {
          apiUrl += '/payroll';
        } else if (activeEndpoint.includes('InsurancePlan')) {
          apiUrl += '/insurance_plan';
        } else if (activeEndpoint.includes('Insurance') || activeEndpoint.includes('insurance')) {
          apiUrl += '/employee_insurance_data';
        } else if (activeEndpoint.includes('LeaveBalance')) {
          apiUrl += '/leave_balance_data';
        } else if (activeEndpoint.includes('LeaveRequest')) {
          apiUrl += '/leave_requests';
        }
        
        // Handle path parameters like {employee_id} or {application_id}
        if (currentEndpointData.url.includes('{employee_id}')) {
          apiUrl += `/${requestParams.employee_id || ''}`;
        } else if (currentEndpointData.url.includes('{plan_name}')) {
          const planName = requestParams.plan_name || 'Premium Health Plan';
          apiUrl += `/${encodeURIComponent(planName)}`;
        } else if (currentEndpointData.url.includes('{application_id}')) {
          apiUrl += `/${requestParams.application_id || ''}`;
        }
        
        // Add query parameters if any exist for this endpoint
        const queryParams = new URLSearchParams();
        
        // Always add API key
        queryParams.append('api_key', 'xpectrum_api_key_123@ai');
        
        if (currentEndpointData.queryParams && currentEndpointData.queryParams.length > 0) {
          currentEndpointData.queryParams.forEach(param => {
            if (requestParams[param.name] && param.name !== 'api_key') {
              queryParams.append(param.name, requestParams[param.name]);
            }
          });
        }
        
        const queryString = queryParams.toString();
        apiUrl += `?${queryString}`;
      }
      
      // Prepare request options based on HTTP method
      const options: RequestInit = {
        method: currentEndpointData.method,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': currentApiKey
        }
      };
      
      // Add body for POST, PUT, PATCH methods
      if (['POST', 'PUT', 'PATCH'].includes(currentEndpointData.method) && currentEndpointData.bodyParams) {
        const bodyData: {[key: string]: any} = {};
        
        currentEndpointData.bodyParams.forEach(param => {
          if (requestParams[param.name]) {
            // Convert numbers to number type
            if (param.type === 'number') {
              bodyData[param.name] = Number(requestParams[param.name]);
            } else {
              bodyData[param.name] = requestParams[param.name];
            }
          }
        });
        
        options.body = JSON.stringify(bodyData);
      }
      
      console.log(`Making ${currentEndpointData.method} request to: ${apiUrl}`);
      
      // Make the API call
      fetch(apiUrl, options)
        .then(response => {
          return {
            response,
            status: response.status,
            statusText: response.statusText,
            time: Math.round(performance.now() - startTime)
          };
        })
        .then(({response, status, statusText, time}) => {
          return response.json().then(data => ({
            data,
            status,
            statusText,
            time
          }));
        })
        .then(({data, status, statusText, time}) => {
          // Calculate response size
          const responseSize = JSON.stringify(data).length;
          const formattedSize = responseSize < 1024 
            ? `${responseSize} B` 
            : `${(responseSize / 1024).toFixed(2)} KB`;
          
          // Set response details
          setResponseDetails({
            status,
            statusText,
            time,
            size: formattedSize,
            headers: {}
          });
          
          // Set the response
          setApiResponse(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('API call error:', error);
          const endTime = performance.now();
          
          setResponseDetails({
            status: 0,
            statusText: 'Failed',
            time: Math.round(endTime - startTime),
            size: '0 B',
            headers: {}
          });
          
          setApiError(error instanceof Error ? error.message : 'An error occurred during the API call');
          setIsLoading(false);
        });
    } else {
      // Original mock API call logic
      setIsResponseFromApi(false);
      
      if (!apiKey && currentEndpoint.headerParams.some(p => p.name === 'X-API-KEY' && p.required)) {
        setApiError('API key is required');
        setIsLoading(false);
        return;
      }
      
      const startTime = performance.now();

      try {
        // Simulate API call with mock data
        // ... existing mock API call code ...

        // Prepare the API URL with path parameters
        let apiUrl = currentEndpoint.url;
        if (apiUrl.includes('{employee_id}') && requestParams.employee_id) {
          apiUrl = apiUrl.replace('{employee_id}', requestParams.employee_id);
        }

        // Add query parameters
        if (currentEndpoint.queryParams.length > 0) {
          const queryParams = new URLSearchParams();
          
          // Always add API key
          queryParams.append('api_key', 'xpectrum_api_key_123@ai');
          
          currentEndpoint.queryParams.forEach(param => {
            if (requestParams[param.name] && param.name !== 'api_key') {
              queryParams.append(param.name, requestParams[param.name]);
            }
          });
          
          const queryString = queryParams.toString();
          apiUrl += `?${queryString}`;
        } else {
          // If no query params defined, still add the API key
          apiUrl += '?api_key=xpectrum_api_key_123@ai';
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

        // For mock calls, reduce the timeout for faster responses
        setTimeout(() => {
          const mockResponse = JSON.parse(JSON.stringify(
            currentEndpoint.response.example
          ));
          
          const endTime = performance.now();
          
          // Calculate response size
          const responseSize = JSON.stringify(mockResponse).length;
          const formattedSize = responseSize < 1024 
            ? `${responseSize} B` 
            : `${(responseSize / 1024).toFixed(2)} KB`;

          // Set response details
          setResponseDetails({
            status: 200,
            statusText: 'OK',
            time: endTime - startTime,
            size: formattedSize
          });

          // Set the response
          setApiResponse(mockResponse);
          setIsLoading(false);
        }, 300); // Reduced from 1000ms to 300ms for faster feedback
      } catch (error) {
        console.error('API call error:', error);
        const endTime = performance.now();
        
        setResponseDetails({
          status: 0,
          statusText: 'Failed',
          time: endTime - startTime,
          size: '0 B'
        });
        
        setApiError(error instanceof Error ? error.message : 'An error occurred during the API call');
        setIsLoading(false);
      }
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
    }
    
    // Show modal immediately
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
    // Don't trigger if clicking on the "Try It" button
    if ((event.target as HTMLElement).classList.contains('try-button')) {
      return;
    }
    
    setActiveEndpoint(endpoint);
    setApiResponse(null);
    setResponseDetails(null);
    setApiError('');
    setRequestParams({});
    setEditableUrl(''); // Reset editable URL when changing endpoints
    
    // Add animation flag
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 500);
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
      setOpenCategories(['employee', 'salary', 'payroll', 'insurance', 'leave']);
    }
  };

  // Add a function to highlight search matches
  const highlightMatch = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight-match">$1</span>');
  };

  // Add a global API config modal
  const [showApiConfigModal, setShowApiConfigModal] = useState(false);
  
  // Add a function to toggle the API config modal
  const toggleApiConfigModal = () => {
    setShowApiConfigModal(!showApiConfigModal);
  };
  
  // Add a function to save the API base URL
  const saveApiBaseUrl = (url: string) => {
    setApiBaseUrl(url);
    setIsEditingApiConfig(false);
    setShowApiConfigModal(false);
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
          <div className="api-controls">
            <div className="theme-toggle" onClick={toggleTheme}>
              <img src={darkMode ? "/moon.svg" : "/sun.svg"} alt={darkMode ? "light mode" : "dark mode"} width="16" height="16" />
            </div>
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
        
        <div className="sidebar-section">
          <div 
            className={`section-header ${openCategories.includes('insurance') ? 'active' : ''}`}
            onClick={() => handleCategoryClick('insurance')}
            data-category="insurance"
          >
            <span>Insurance Management</span>
            <span className="chevron">▼</span>
          </div>
          <ul className={`section-links ${openCategories.includes('insurance') ? 'visible' : 'hidden'}`}>
            {getFilteredEndpoints('insurance').map(endpointKey => (
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
            {getFilteredEndpoints('insurance').length === 0 && searchTerm && (
              <li className="no-results">No matching endpoints found</li>
            )}
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
            {getFilteredEndpoints('leave').map(endpointKey => (
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
            {getFilteredEndpoints('leave').length === 0 && searchTerm && (
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
          <div className="endpoint-actions">
            <button 
              className="try-api-button" 
              onClick={() => {
                // Start loading immediately
                setIsLoading(true);
                // Show modal immediately
                setShowTryItModal(true);
                // Handle API call with slight delay to allow UI to update
                setTimeout(loadRealEmployeeData, 10);
              }}
            >
              Use API
            </button>
          </div>
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
                  <div className="d-flex align-items-center">
                    <h2>{activeEndpoint === 'getEmployeeById' && (apiBaseUrl || isResponseFromApi) ? 'Get Employee Data' : currentEndpoint.title}</h2>
                    {isResponseFromApi && (
                      <span className="ms-2 badge" style={{ 
                        fontSize: '0.7rem', 
                        padding: '0.35em 0.65em', 
                        backgroundColor: 'rgba(0, 180, 60, 0.8)', 
                        color: 'white',
                        borderRadius: '4px'
                      }}>
                        API
                      </span>
                    )}
                  </div>
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
                {isEditingUrl ? (
                  <div className="url-input-container">
                    <input
                      type="text"
                      className="url-input"
                      value={editableUrl}
                      onChange={(e) => setEditableUrl(e.target.value)}
                      onBlur={() => setIsEditingUrl(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setIsEditingUrl(false);
                        } else if (e.key === 'Escape') {
                          setEditableUrl('');
                          setIsEditingUrl(false);
                        }
                      }}
                      autoFocus
                    />
                    <button 
                      className="url-reset-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Construct the default URL
                        const defaultUrl = (() => {
                          let apiUrl = `${apiBaseUrl}`;
                          
                          // Map the endpoint to the correct API path
                          if (activeEndpoint.includes('Employee')) {
                            apiUrl += '/employee_data';
                          } else if (activeEndpoint.includes('Salary')) {
                            apiUrl += '/salary_data';
                          } else if (activeEndpoint.includes('Payroll')) {
                            apiUrl += '/payroll_data';
                          }
                          
                          // Handle path parameters like {employee_id}
                          if (currentEndpoint.url.includes('{employee_id}')) {
                            apiUrl += `/${requestParams.employee_id || realEmployeeId}`;
                          }
                          
                          // Add query parameters if any exist for this endpoint
                          if (currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0) {
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
                          
                          return apiUrl;
                        })();
                        
                        setEditableUrl(defaultUrl);
                      }}
                      title="Reset to default URL"
                    >
                      ↺
                    </button>
                  </div>
                ) : (
                  <div 
                    className="url-display"
                    onClick={() => {
                      // Initialize editable URL with current display URL value
                      const currentUrl = isResponseFromApi ? 
                        (() => {
                          // Construct the display URL for the API
                          let apiUrl = `${apiBaseUrl}`;
                          
                          // Map the endpoint to the correct API path
                          if (activeEndpoint.includes('Employee')) {
                            apiUrl += '/employee_data';
                          } else if (activeEndpoint.includes('Salary')) {
                            apiUrl += '/salary_data';
                          } else if (activeEndpoint.includes('Payroll')) {
                            apiUrl += '/payroll_data';
                          }
                          
                          // Handle path parameters like {employee_id}
                          if (currentEndpoint.url.includes('{employee_id}')) {
                            apiUrl += `/${requestParams.employee_id || realEmployeeId}`;
                          }
                          
                          // Add query parameters if any exist for this endpoint
                          if (currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0) {
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
                          
                          return apiUrl;
                        })()
                        : (currentEndpoint.url.includes('{employee_id}')
                          ? currentEndpoint.url.replace('{employee_id}', requestParams.employee_id || '{employee_id}')
                          : currentEndpoint.url);
                      
                      setEditableUrl(currentUrl);
                      setIsEditingUrl(true);
                    }}
                    title="Click to edit URL"
                  >
                    {isResponseFromApi ? 
                      (() => {
                        // Construct the display URL for the API
                        let apiUrl = `${apiBaseUrl}`;
                        
                        // Map the endpoint to the correct API path
                        if (activeEndpoint.includes('Employee')) {
                          apiUrl += '/employee_data';
                        } else if (activeEndpoint.includes('Salary')) {
                          apiUrl += '/salary_data';
                        } else if (activeEndpoint.includes('Payroll')) {
                          apiUrl += '/payroll_data';
                        }
                        
                        // Handle path parameters like {employee_id}
                        if (currentEndpoint.url.includes('{employee_id}')) {
                          apiUrl += `/${requestParams.employee_id || realEmployeeId}`;
                          
                          // Update request params
                          if (!requestParams.employee_id && realEmployeeId) {
                            setTimeout(() => {
                              updateRequestParam('employee_id', realEmployeeId);
                            }, 0);
                          }
                        }
                        
                        // Add query parameters if any exist for this endpoint
                        if (currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0) {
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
                        
                        return apiUrl;
                      })()
                      : (currentEndpoint.url.includes('{employee_id}')
                        ? currentEndpoint.url.replace('{employee_id}', requestParams.employee_id || '{employee_id}')
                        : currentEndpoint.url)
                    }
                  </div>
                )}
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
              
              <div className="try-it-tabs" style={{ display: 'none' }}>
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
                <div className="api-base-url-container">
                  <div className="api-base-url-label">API Base URL:</div>
                  <div className="api-base-url-value">
                    <input 
                      type="text" 
                      className="api-base-url-input" 
                      value={apiBaseUrl} 
                      onChange={(e) => setApiBaseUrl(e.target.value)}
                      placeholder="Enter API base URL"
                    />
                  </div>
                </div>

                <div className="request-tabs" style={{ display: 'none' }}>
                  <div
                    className={`request-tab ${activeRequestTab === 'params' ? 'active' : ''}`}
                    onClick={() => setActiveRequestTab('params')}
                  >
                    <span>Params</span>
                  </div>
                  <div
                    className={`request-tab ${activeRequestTab === 'headers' ? 'active' : ''}`}
                    onClick={() => setActiveRequestTab('headers')}
                  >
                    <span>Headers</span>
                  </div>
                  {['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && (
                    <div
                      className={`request-tab ${activeRequestTab === 'body' ? 'active' : ''}`}
                      onClick={() => setActiveRequestTab('body')}
                    >
                      <span>Body</span>
                    </div>
                  )}
                  <div
                    className={`request-tab ${activeRequestTab === 'auth' ? 'active' : ''}`}
                    onClick={() => setActiveRequestTab('auth')}
                  >
                    <span>Authorization</span>
                  </div>
                </div>

                {activeRequestTab === 'params' && (
                  <div className="request-tab-content">
                    {/* Add API URL config at the top of params tab */}
                    <div className="api-config-summary">
                      <div className="api-config-row">
                        <span className="api-config-label">API Base URL:</span>
                        <span className="api-config-value">{apiBaseUrl || 'Not configured'}</span>
                        <button 
                          className="small-config-button"
                          onClick={toggleApiConfigModal}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    {activeEndpoint === 'getEmployeeById' && apiBaseUrl && (
                      <div className="api-config-card">
                        <div className="api-config-header">
                          <h3>API Configuration</h3>
                          <div className="api-badge">LIVE</div>
                        </div>
                        
                        <div className="config-field-container">
                          <label className="config-field-label">
                            API Base URL
                          </label>
                          {isEditingApiConfig ? (
                            <div className="config-input-group">
                              <input
                                type="text"
                                className="config-input"
                                value={apiBaseUrl}
                                onChange={(e) => setApiBaseUrl(e.target.value)}
                                placeholder="Enter API base URL (e.g., https://hrms-api.xpectrum-ai.com/hrms/api/v1)"
                              />
                              <button
                                className="config-edit-btn save"
                                onClick={() => setIsEditingApiConfig(false)}
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="config-input-group">
                              <input
                                type="text"
                                className="config-input"
                                value={apiBaseUrl}
                                disabled
                              />
                              <button
                                className="config-edit-btn"
                                onClick={() => setIsEditingApiConfig(true)}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                          <p className="config-description">
                            Base URL for the API endpoint (without trailing slash)
                          </p>
                        </div>
                        
                        <div className="config-field-container">
                          <label className="config-field-label">Employee ID</label>
                          <div className="config-input-group">
                            <input
                              type="text"
                              className="config-input"
                              value={realEmployeeId}
                              onChange={(e) => setRealEmployeeId(e.target.value)}
                              placeholder="Enter employee ID (e.g., EM37938)"
                            />
                          </div>
                          <p className="config-description">
                            The unique identifier for the employee record to retrieve
                          </p>
                        </div>

                        <div className="config-action-container">
                          <button 
                            className="test-api-button"
                            onClick={() => {
                              // Start loading immediately
                              setIsLoading(true);
                              // Handle API call with slight delay to allow UI to update
                              setTimeout(loadRealEmployeeData, 10);
                            }}
                          >
                            <span className="test-icon">⟳</span>
                            Test API
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {currentEndpoint.url.includes('{employee_id}') && (
                      <div className="path-params-section">
                        <h3>Path Parameters</h3>
                        <div className="try-it-form-group">
                          <label htmlFor="employee-id">employee_id</label>
                          <input
                            type="text"
                            id="employee-id"
                            value={activeEndpoint === 'getEmployeeById' && apiBaseUrl ? realEmployeeId : (requestParams.employee_id || '')}
                            onChange={(e) => {
                              if (activeEndpoint === 'getEmployeeById' && apiBaseUrl) {
                                setRealEmployeeId(e.target.value);
                              }
                              updateRequestParam('employee_id', e.target.value);
                            }}
                            placeholder="Enter employee ID (e.g. EMP001)"
                          />
                          <div className="param-description">
                            {activeEndpoint === 'getEmployeeById' && apiBaseUrl 
                              ? "Employee ID from the API (e.g. EM37938)" 
                              : "Required path parameter for identifying the employee"}
                          </div>
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
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Response Body</span>
                            {isResponseFromApi && (
                              <span style={{ 
                                marginLeft: '8px',
                                fontSize: '0.7rem', 
                                padding: '0.35em 0.65em', 
                                backgroundColor: 'rgba(0, 180, 60, 0.8)', 
                                color: 'white',
                                borderRadius: '4px'
                              }}>
                                API Data
                              </span>
                            )}
                          </div>
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
      
      {/* API Configuration Modal */}
      {showApiConfigModal && (
        <div className="api-config-modal-overlay">
          <div className="api-config-modal">
            <div className="api-config-modal-header">
              <h3>API Configuration</h3>
              <button className="api-config-modal-close" onClick={toggleApiConfigModal}>×</button>
            </div>
            <div className="api-config-modal-content">
              <div className="config-field-container">
                <label className="config-field-label">API Base URL</label>
                <div className="config-input-group">
                  <input
                    type="text"
                    className="config-input"
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    placeholder="Enter API base URL (e.g., https://hrms-api.xpectrum-ai.com/hrms/api/v1)"
                  />
                </div>
                <p className="config-description">
                  Base URL for the API endpoint (without trailing slash)
                </p>
              </div>
              <div className="config-field-container">
                <label className="config-field-label">Default Employee ID</label>
                <div className="config-input-group">
                  <input
                    type="text"
                    className="config-input"
                    value={realEmployeeId}
                    onChange={(e) => setRealEmployeeId(e.target.value)}
                    placeholder="Enter employee ID (e.g., EM37938)"
                  />
                </div>
                <p className="config-description">
                  The default employee ID to use for endpoints requiring one
                </p>
              </div>
            </div>
            <div className="api-config-modal-footer">
              <button 
                className="save-config-button"
                onClick={toggleApiConfigModal}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom cursor for enhanced UI effect */}
      <div className="custom-cursor"></div>
      
      {/* Add custom CSS for the new components */}
      <style>
        {`
         .api-base-url-container {
           background-color: var(--background-secondary);
           border-radius: 4px;
           padding: 12px 16px;
           margin-bottom: 20px;
           display: flex;
           flex-direction: column;
           gap: 8px;
         }
         
         .api-base-url-label {
           font-size: 0.9rem;
           font-weight: 600;
           color: var(--text-secondary);
         }
         
         .api-base-url-value {
           position: relative;
         }
         
         .api-base-url-input {
           width: 100%;
           padding: 8px 12px;
           background-color: var(--background-primary);
           border: 1px solid var(--border-color);
           border-radius: 4px;
           color: var(--text-primary);
           font-family: monospace;
           font-size: 0.9rem;
         }
         
         .api-base-url-input:focus {
           outline: none;
           border-color: var(--accent-color);
           box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb), 0.25);
         }
         
         .api-base-url-indicator {
           background-color: var(--background-secondary);
           border-radius: 4px;
           padding: 8px 12px;
           margin-bottom: 16px;
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         
         .url-input-container {
           display: flex;
           flex-grow: 1;
           position: relative;
         }
         
         .url-input {
           flex-grow: 1;
           padding: 0.5rem 0.75rem;
           min-height: 40px;
           font-family: monospace;
           font-size: 0.9rem;
           background-color: var(--background-primary, #1e1e1e);
           color: var(--text-primary, #ffffff);
           border: none;
           outline: none;
           width: 100%;
         }
         
         .url-reset-button {
           position: absolute;
           right: 5px;
           top: 50%;
           transform: translateY(-50%);
           background: none;
           border: none;
           color: var(--text-secondary, #888888);
           cursor: pointer;
           font-size: 16px;
           padding: 0 5px;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         
         .url-reset-button:hover {
           color: var(--text-primary, #ffffff);
         }
         
         .url-display {
           cursor: text !important;
         }
         
         .url-display:hover::after {
           content: 'Click to edit URL';
           position: absolute;
           top: -30px;
           left: 50%;
           transform: translateX(-50%);
           background: var(--background-tertiary, #333333);
           color: var(--text-primary, #ffffff);
           padding: 5px 10px;
           border-radius: 4px;
           font-size: 12px;
           white-space: nowrap;
           z-index: 10;
           opacity: 0.9;
         }
         
         .current-base-url {
           display: flex;
           align-items: center;
           gap: 8px;
           font-size: 0.9rem;
         }
         
         .current-base-url code {
           background: var(--background-tertiary);
           padding: 2px 6px;
           border-radius: 4px;
           font-family: monospace;
           max-width: 300px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
         
         .edit-url-button {
           background: var(--accent-color);
           color: white;
           border: none;
           border-radius: 4px;
           padding: 2px 8px;
           font-size: 0.8rem;
           cursor: pointer;
         }
         
         .api-config-modal-overlay {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background-color: rgba(0, 0, 0, 0.5);
           display: flex;
           justify-content: center;
           align-items: center;
           z-index: 1000;
         }
         
         .api-config-modal {
           background-color: var(--background-primary);
           border-radius: 8px;
           width: 90%;
           max-width: 500px;
           max-height: 90vh;
           overflow-y: auto;
           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
         }
         
         .api-config-modal-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 16px 20px;
           border-bottom: 1px solid var(--border-color);
         }
         
         .api-config-modal-header h3 {
           margin: 0;
           font-size: 1.2rem;
           color: var(--text-primary);
         }
         
         .api-config-modal-close {
           background: none;
           border: none;
           font-size: 1.5rem;
           cursor: pointer;
           color: var(--text-secondary);
         }
         
         .api-config-modal-content {
           padding: 20px;
         }
         
         .api-config-modal-footer {
           padding: 16px 20px;
           border-top: 1px solid var(--border-color);
           display: flex;
           justify-content: flex-end;
         }
         
         .save-config-button {
           background-color: var(--accent-color);
           color: white;
           border: none;
           border-radius: 4px;
           padding: 8px 16px;
           font-size: 0.9rem;
           cursor: pointer;
         }
         
         .api-config-button {
           background: none;
           border: none;
           cursor: pointer;
           padding: 0;
           margin-right: 8px;
           font-size: 1rem;
           color: var(--text-secondary);
         }
         
         .api-controls {
           display: flex;
           align-items: center;
         }
         
         .api-url-button {
           background-color: var(--background-tertiary);
           border: none;
           border-radius: 4px;
           padding: 4px 8px;
           margin-right: 8px;
           font-size: 0.8rem;
           cursor: pointer;
           color: var(--text-secondary);
         }
         
         .api-config-summary {
           background-color: var(--background-secondary);
           border-radius: 4px;
           padding: 8px 12px;
           margin-bottom: 16px;
         }
         
         .api-config-row {
           display: flex;
           align-items: center;
           margin-bottom: 4px;
         }
         
         .api-config-label {
           font-weight: 500;
           margin-right: 8px;
         }
         
         .api-config-value {
           font-family: monospace;
           background: var(--background-tertiary);
           padding: 2px 6px;
           border-radius: 4px;
           flex: 1;
           margin-right: 8px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
         
         .small-config-button {
           background: var(--accent-color);
           color: white;
           border: none;
           border-radius: 4px;
           padding: 2px 8px;
           font-size: 0.8rem;
           cursor: pointer;
         }
        `}
      </style>
    </div>
  );
};

export default ApiDoc; 