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

// Add request body model interfaces after the existing interfaces
interface EmployeeDataModel {
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

interface EmployeeInsuranceDataModel {
  employee_id: string;
  plan_name?: string;
  insurance_plan_id?: string;
  enrollment_date?: string;
  coverage_type?: string;
  employee_contribution?: number;
  enrollment_time?: string;
}

interface InsurancePlanModel {
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

interface LeaveBalanceDataModel {
  employee_id: string;
  annual_leave_balance?: number;
  sick_leave_balance?: number;
  personal_leave_balance?: number;
  unpaid_leave_taken?: number;
  leave_balance_updated_date?: string;
}

interface LeaveRequestsModel {
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

interface PayrollModel {
  employee_id: string;
  base_salary?: number;
  federal_tax?: number;
  state_tax?: number;
  total_tax?: number;
  month?: string;
  salary_received_day?: string;
}

interface SalaryInfoModel {
  employee_id: string;
  base_salary?: number;
  salary_type?: string;
  bonus?: number;
  commission?: number;
  currency?: string;
  salary_grade?: string;
  last_salary_increase_date?: string;
}

interface HarassmentReportsModel {
  complaint_id?: number;
  victim_employee_id?: number;
  harasser_employee_id?: number;
  harassment_level?: string;
  description?: string;
  status?: string;
  review_body?: string;
  incident_date?: string;
  incident_time?: string;
  reported_date?: string;
  reported_time?: string;
  level?: string;
}

const ApiDoc: React.FC = (): JSX.Element => {
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

  // Add validation helper function
  const validateEmployeeData = (data: any) => {
    const requiredFields = ['employee_id'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate field types
    if (data.job_id && typeof data.job_id !== 'number') {
      throw new Error('job_id must be a number');
    }
    
    return true;
  };

  // Single handleApiCall function with validation
  const handleApiCall = () => {
    setIsLoading(true);
    setApiError('');
    setResponseDetails(null);
    setApiResponse(null);
    
    try {
      // Validate request body for POST/PUT methods
      if (['POST', 'PUT'].includes(currentEndpoint.method)) {
        const bodyData = bodyType === 'raw' ? JSON.parse(rawBody) : requestParams;
        
        if (currentEndpoint.url.includes('employee_data')) {
          validateEmployeeData(bodyData);
        }
      }
      
      if (!apiBaseUrl) {
        setApiError('API base URL is required');
        setIsLoading(false);
        return;
      }
      
      setIsResponseFromApi(true);
      const startTime = performance.now();
      
      let apiUrl = `${apiBaseUrl}`;
      
      // Map the endpoint to the correct API path
      if (activeEndpoint === 'getAllEmployees') {
        apiUrl = `${apiBaseUrl}/all_employee_data`;
      } else if (activeEndpoint.includes('Employee')) {
        apiUrl += '/employee_data';
      } else if (activeEndpoint.includes('Salary')) {
        apiUrl += '/salary_info';
      } else if (activeEndpoint.includes('Payroll')) {
        apiUrl += '/payroll';
      } else if (activeEndpoint.includes('Insurance')) {
        apiUrl += '/employee_insurance_data';
      } else if (activeEndpoint.includes('LeaveBalance')) {
        apiUrl += '/leave_balance_data';
      } else if (activeEndpoint.includes('LeaveRequest')) {
        apiUrl += '/leave_requests';
      }
      
      // Handle path parameters
      if (currentEndpoint.url.includes('{employee_id}')) {
        apiUrl += `/${requestParams.employee_id || realEmployeeId}`;
      }
      
      // Add query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('api_key', 'xpectrum_api_key_123@ai');
      
      if (currentEndpoint.queryParams && currentEndpoint.queryParams.length > 0) {
        currentEndpoint.queryParams.forEach(param => {
          if (requestParams[param.name] && param.name !== 'api_key') {
            queryParams.append(param.name, requestParams[param.name]);
          }
        });
      }
      
      const queryString = queryParams.toString();
      if (queryString) {
        apiUrl += `?${queryString}`;
      }
      
      // Prepare request options
      const options: RequestInit = {
        method: currentEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey || (environments.find(e => e.name === activeEnvironment)?.variables.apiKey || ''),
          ...requestHeaders
        }
      };
      
      // Handle request body for POST and PUT methods
      if (['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method)) {
        if (bodyType === 'raw' && rawBody) {
          try {
            // Parse and validate the raw JSON body
            const parsedBody = JSON.parse(rawBody);
            options.body = JSON.stringify(parsedBody);
          } catch (error) {
            throw new Error('Invalid JSON in request body: ' + (error instanceof Error ? error.message : String(error)));
          }
        } else {
          // Use form data if not using raw JSON
          const bodyData: {[key: string]: any} = {};
          if (currentEndpoint.bodyParams) {
            currentEndpoint.bodyParams.forEach(param => {
              // Only include parameters that have values
              if (requestParams[param.name] !== undefined && requestParams[param.name] !== '') {
                // Convert values to appropriate types
                if (param.type === 'number' || param.type === 'integer') {
                  bodyData[param.name] = Number(requestParams[param.name]);
                } else if (param.type === 'boolean') {
                  bodyData[param.name] = requestParams[param.name] === 'true';
                } else if (param.type === 'object' || param.type === 'array') {
                  // Try to parse as JSON if it's an object or array
                  try {
                    bodyData[param.name] = JSON.parse(requestParams[param.name]);
                  } catch (error) {
                    bodyData[param.name] = requestParams[param.name];
                  }
                } else {
                  bodyData[param.name] = requestParams[param.name];
                }
              }
            });
          }
          options.body = JSON.stringify(bodyData);
        }
      }
      
      console.log(`Making ${currentEndpoint.method} request to: ${apiUrl}`);
      console.log('Request options:', options);
      console.log('Request body:', options.body);
      
      // Make the API call
      fetch(apiUrl, options)
        .then(response => {
          // Extract headers to display in response
          const headers: {[key: string]: string} = {};
          response.headers.forEach((value, key) => {
            headers[key] = value;
          });
          
          // Return response data even if status code indicates error
          return {
            response,
            status: response.status,
            statusText: response.statusText,
            time: Math.round(performance.now() - startTime),
            headers
          };
        })
        .then(({response, status, statusText, time, headers}) => {
          // Try to parse as JSON, but gracefully handle non-JSON responses
          return response.text().then(text => {
            let data;
            try {
              data = text && text.trim() ? JSON.parse(text) : {};
            } catch (error) {
              // If response is not valid JSON, use raw text
              data = { rawResponse: text };
            }
            
            return {
            data,
            status,
            statusText,
              time,
              headers
            };
          });
        })
        .then(({data, status, statusText, time, headers}) => {
          const responseSize = JSON.stringify(data).length;
          const formattedSize = responseSize < 1024 
            ? `${responseSize} B` 
            : `${(responseSize / 1024).toFixed(2)} KB`;
          
          setResponseDetails({
            status,
            statusText,
            time,
            size: formattedSize,
            headers
          });
          
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
    } catch (error) {
      console.error('Validation error:', error);
      setApiError(error instanceof Error ? error.message : 'Invalid request data');
      setIsLoading(false);
    }
  };

  // Generate a JSON template based on the current endpoint
  const generateJsonTemplate = () => {
    if (!currentEndpoint.bodyParams || currentEndpoint.bodyParams.length === 0) {
      return '{}';
    }
    
    let templateJson: {[key: string]: any} = {};
    
    // Include all fields for POST and PUT requests to make template complete
    const shouldIncludeAllFields = currentEndpoint.method === 'PUT' || currentEndpoint.method === 'POST';
    
    // For employee-related endpoints
    if (activeEndpoint.toLowerCase().includes('employee') && !activeEndpoint.toLowerCase().includes('insurance') && !activeEndpoint.toLowerCase().includes('leave')) {
      const employeeFields: (keyof EmployeeDataModel)[] = [
        'employee_id', 'first_name', 'last_name', 'email', 'phone_number', 'hire_date', 
        'job_title', 'job_id', 'gov_id', 'hiring_manager_id', 'hr_manager_id', 
        'marital_status', 'state', 'emergency_contact_name', 'emergency_contact_phone',
        'sex', 'department', 'date_of_birth', 'status'
      ];
      
      employeeFields.forEach(field => {
        // Include field if it's in bodyParams or if it's a PUT request (to show all possible fields)
        if (shouldIncludeAllFields || currentEndpoint.bodyParams?.some(param => param.name === field)) {
          if (field === 'job_id') {
            templateJson[field] = 0;
          } else {
            templateJson[field] = "";
          }
        }
      });
    } else if (activeEndpoint.toLowerCase().includes('salary')) {
      // For salary-related endpoints
      const salaryFields: (keyof SalaryInfoModel)[] = [
        'employee_id', 'base_salary', 'salary_type', 'bonus', 'commission',
        'currency', 'salary_grade', 'last_salary_increase_date'
      ];
      
      salaryFields.forEach(field => {
        if (shouldIncludeAllFields || currentEndpoint.bodyParams?.some(param => param.name === field)) {
          if (field === 'base_salary' || field === 'bonus' || field === 'commission') {
            templateJson[field] = 0;
          } else {
            templateJson[field] = "";
          }
        }
      });
    } else if (activeEndpoint.toLowerCase().includes('insurance')) {
      // For insurance-related endpoints
      const insuranceFields: (keyof InsurancePlanModel)[] = [
        'plan_name', 'plan_id', 'network', 'deductible_individual_family',
        'out_of_pocket_maximum_individual_family', 'coinsurance', 'overall_lifetime_maximum',
        'rates_premium_employee_only', 'rates_premium_employer_contribution_employee_only',
        'rates_premium_employee_contribution_employee_only', 'rates_premium_employee_spouse',
        'rates_premium_employer_contribution_employee_spouse', 'rates_premium_employee_contribution_employee_spouse',
        'rates_premium_employee_children', 'rates_premium_employer_contribution_employee_children',
        'rates_premium_employee_contribution_employee_children', 'rates_premium_family',
        'rates_premium_employer_contribution_family', 'rates_premium_employee_contribution_family'
      ];
      
      insuranceFields.forEach(field => {
        if (shouldIncludeAllFields || currentEndpoint.bodyParams?.some(param => param.name === field)) {
          if (field.includes('premium') || field.includes('contribution')) {
            templateJson[field] = 0;
          } else {
            templateJson[field] = "";
          }
        }
      });
    } else if (activeEndpoint.toLowerCase().includes('leave')) {
      // For leave-related endpoints
      const leaveFields: (keyof LeaveRequestsModel)[] = [
        'employee_id', 'application_id', 'start_date', 'total_working_days_off',
        'total_days_off', 'end_date', 'deduction_from_salary', 'leave_type',
        'reason', 'request_date', 'request_time', 'reviewed_by', 'status', 'approved_by'
      ];
      
      leaveFields.forEach(field => {
        if (shouldIncludeAllFields || currentEndpoint.bodyParams?.some(param => param.name === field)) {
          if (field.includes('days_off') || field.includes('deduction') || field === 'application_id') {
            templateJson[field] = 0;
          } else {
            templateJson[field] = "";
          }
        }
      });
    }
    
    // If the template is empty (no model matched), use all bodyParams
    if (Object.keys(templateJson).length === 0) {
      currentEndpoint.bodyParams.forEach(param => {
        if (param.type === 'number' || param.type === 'integer') {
          templateJson[param.name] = 0;
        } else if (param.type === 'boolean') {
          templateJson[param.name] = false;
        } else if (param.type === 'array') {
          templateJson[param.name] = [];
        } else if (param.type === 'object') {
          templateJson[param.name] = {};
        } else {
          templateJson[param.name] = "";
        }
      });
    }
    
    console.log('Generated template for endpoint:', activeEndpoint, templateJson);
    return JSON.stringify(templateJson, null, 2);
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
      
      // Set raw body JSON with template
      const templateJson = generateJsonTemplate();
      setRawBody(templateJson);
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
    
    // Set 'body' as active tab if the endpoint has body parameters
    if (currentEndpoint.bodyParams && currentEndpoint.bodyParams.length > 0 && 
        ['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method)) {
      setActiveRequestTab('body');
      
      // Always regenerate the JSON template when opening the modal
      const templateJson = generateJsonTemplate();
      console.log('Generated template:', templateJson);
      setRawBody(templateJson);
    } else {
      setActiveRequestTab('params');
    }
    
    setBodyType('raw');
    
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
    setRawBody(''); // Reset raw body when changing endpoints
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
    if (!apiResponse) {
    return (
        <pre className="response-example-empty">
          {JSON.stringify(JSON.parse(currentEndpoint.response.example), null, 2)}
      </pre>
    );
    }
    
    // Format the JSON response
    try {
      // Clone the apiResponse to avoid modifying the original
      const formattedResponse = JSON.parse(JSON.stringify(apiResponse));
      
      // If the response has a rawResponse property (non-JSON responses), display it as text
      if (formattedResponse.rawResponse) {
        return (
          <pre className="response-example">
            {formattedResponse.rawResponse}
          </pre>
        );
      }
      
      // Format arrays for better readability
      Object.keys(formattedResponse).forEach(key => {
        if (Array.isArray(formattedResponse[key]) && formattedResponse[key].length > 0) {
          // If it's a large array, limit display but show the full length
          if (formattedResponse[key].length > 20) {
            const totalLength = formattedResponse[key].length;
            formattedResponse[key] = formattedResponse[key].slice(0, 20);
            formattedResponse[key].push(`... ${totalLength - 20} more items (truncated for display)`);
          }
        }
      });
      
      return (
        <pre className="response-example">
          {JSON.stringify(formattedResponse, null, 2)}
        </pre>
      );
    } catch (error) {
      console.error('Error formatting response:', error);
      return (
        <pre className="response-example">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      );
    }
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

  // Add click outside handler
  const apiPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (apiPanelRef.current && !apiPanelRef.current.contains(event.target as Node)) {
        setShowTryItModal(false);
      }
    };

    if (showTryItModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTryItModal]);

  return (
    <div className={`api-doc-container ${mobileMenuOpen ? 'mobile-menu-open' : ''} ${darkMode ? 'dark-theme' : 'light-theme'} ${showTryItModal ? 'with-api-panel' : ''}`}>
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
      <main className={`api-content ${showTryItModal ? 'with-api-panel' : ''}`}>
        <div className="api-header">
          <div className="api-breadcrumb">{currentEndpoint.breadcrumb}</div>
          <h1 className="api-title">
            {currentEndpoint.title} <span className="api-badge">{currentEndpoint.badge}</span>
          </h1>
        </div>

        <style>
          {`
            /* Remove any fixed positioning from headers */
            .api-header {
              padding: 20px;
              background: var(--background-primary);
              position: relative; /* Change from fixed/sticky to relative */
              z-index: 1;
            }

            .api-content {
              overflow-y: auto;
              height: 100%;
              position: relative;
            }

            /* Update the try-it-modal-header to not be sticky */
            .try-it-modal-header {
              background: var(--background-primary);
              padding-bottom: 16px;
              border-bottom: 1px solid var(--border-color);
              position: relative; /* Change from sticky to relative */
              z-index: 1;
            }

            /* Ensure proper scrolling for the panel content */
            .api-testing-panel-content {
              height: 100%;
              overflow-y: auto;
              position: relative;
            }

            /* Remove any fixed positioning from other header elements */
            .endpoint-method,
            .endpoint-url,
            .endpoint-actions {
              position: relative;
            }

            .api-doc-container {
              height: 100vh;
              display: flex;
            }

            .api-sidebar {
              height: 100%;
              overflow-y: auto;
            }

            /* Ensure the main content area scrolls properly */
            main.api-content {
              flex: 1;
              overflow-y: auto;
              height: 100vh;
            }

            /* Update panel styling to ensure proper scrolling */
            .api-testing-panel {
              position: fixed;
              top: 0;
              right: 0;
              width: 600px;
              height: 100vh;
              overflow-y: auto;
              background: #1a1a1a;
            }
          `}
        </style>

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
          <div className="api-testing-panel">
            <div className="api-testing-panel-content">
              <div className="try-it-modal-header">
                <div className="try-it-title-section">
                  <span className={`endpoint-method ${getMethodClassName(currentEndpoint.method)}`}>
                    {currentEndpoint.method}
                  </span>
                  <div className="d-flex align-items-center">
                    <h2>{activeEndpoint === 'getEmployeeById' && (apiBaseUrl || isResponseFromApi) ? 'Get Employee Data' : currentEndpoint.title}</h2>
                    {isResponseFromApi && (
                      <span className="ms-2 badge">API</span>
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

                <div className="request-tabs">
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

                {/* Add styles for the request tabs */}
                <style>
                {`
                  .request-tabs {
                    display: flex;
                    gap: 2px;
                    margin-bottom: 16px;
                    border-bottom: 1px solid var(--border-color);
                    background: var(--background-secondary);
                    padding: 4px;
                    border-radius: 4px;
                  }

                  .request-tab {
                    padding: 8px 16px;
                    cursor: pointer;
                    border-radius: 4px 4px 0 0;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                    position: relative;
                    border-bottom: 3px solid transparent;
                    margin-bottom: -1px;
                  }

                  @keyframes tabActivate {
                    0% { transform: translateY(2px); opacity: 0.7; }
                    100% { transform: translateY(0); opacity: 1; }
                  }

                  .request-tab:hover {
                    background: var(--background-tertiary);
                    color: var(--text-primary);
                  }

                  .request-tab.active {
                    background: var(--background-tertiary);
                    color: var(--accent-color);
                    font-weight: 600;
                    box-shadow: 0 -2px 8px rgb(255 255 255 / 70%);
                    animation: tabActivate 0.3s ease forwards;
                  }
                  
                  .request-tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background-color: var(--accent-color);
                    border-radius: 3px 3px 0 0;
                  }
                  
                  .light-theme .request-tab {
                    color: var(--text-muted);
                  }
                  
                  .light-theme .request-tab:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: var(--text-color);
                  }
                  
                  .light-theme .request-tab.active {
                    background: rgba(0, 0, 0, 0.03);
                    color: var(--primary-purple);
                    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
                  }
                  
                  .light-theme .request-tab.active::after {
                    background-color: var(--primary-purple);
                  }
                  
                  .request-tab-content {
                    animation: fadeIn 0.3s ease;
                  }

                  .try-it-section {
                    padding: 16px;
                    background: var(--background-primary);
                    border-radius: 4px;
                    margin-bottom: 16px;
                  }

                  .body-type-selector {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 16px;
                  }

                  .body-type-btn {
                    padding: 6px 12px;
                    border: 1px solid var(--border-color);
                    background: var(--background-secondary);
                    color: var(--text-primary);
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                  }

                  .body-type-btn.active {
                    background: var(--accent-color);
                    color: white;
                    border-color: var(--accent-color);
                  }

                  .raw-body-section {
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                  }

                  .raw-body-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 12px;
                    background: var(--background-secondary);
                    border-bottom: 1px solid var(--border-color);
                  }

                  .format-json-btn {
                    padding: 4px 8px;
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                  }

                  .raw-body-editor {
                    width: 100%;
                    min-height: 300px;
                    padding: 12px;
                    background: var(--background-primary);
                    color: var(--text-primary);
                    border: none;
                    font-family: monospace;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    resize: vertical;
                  }

                  .raw-body-editor:focus {
                    outline: none;
                  }
                `}
                </style>

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
                    <h3>Request Body</h3>
                    <div className="body-type-selector">
                      <button 
                        className={`body-type-btn ${bodyType === 'form' ? 'active' : ''}`}
                        onClick={() => setBodyType('form')}
                      >
                        Form
                      </button>
                      <button 
                        className={`body-type-btn ${bodyType === 'raw' ? 'active' : ''}`}
                        onClick={() => {
                          setBodyType('raw');
                          
                          // Generate a default template when switching to raw mode
                          if (!rawBody || rawBody.trim() === '') {
                            const templateJson = generateJsonTemplate();
                            setRawBody(templateJson);
                          }
                        }}
                      >
                        Raw
                      </button>
                    </div>
                    
                    {bodyType === 'form' && (
                      <div className="params-table">
                        <div className="param-row header">
                          <div className="param-name">Parameter</div>
                          <div className="param-value">Value</div>
                          <div className="param-type">Type</div>
                          <div className="param-required">Required</div>
                          </div>
                        {currentEndpoint.bodyParams && currentEndpoint.bodyParams.map((param, index) => (
                          <div className="param-row" key={index}>
                            <div className="param-name">
                                {param.name}
                              {param.required && <span className="required-badge">*</span>}
                            </div>
                            <div className="param-value">
                              <input
                                type={param.type === 'password' ? 'password' : 'text'}
                                className="param-input"
                                value={requestParams[param.name] || ''}
                                onChange={(e) => updateRequestParam(param.name, e.target.value)}
                                placeholder={param.example || `Enter ${param.name}`}
                              />
                              </div>
                            <div className="param-type">{param.type}</div>
                            <div className="param-required">{param.required ? 'Yes' : 'No'}</div>
                            {param.description && (
                              <div className="param-description">
                                <span className="info-icon" title={param.description}>ℹ️</span>
                                <div className="param-description-tooltip">{param.description}</div>
                              </div>
                            )}
                            </div>
                          ))}
                      </div>
                    )}
                    
                    {bodyType === 'raw' && (
                      <div className="raw-body-editor">
                        <div className="raw-body-hint" style={{
                          marginBottom: "8px",
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          padding: "8px 12px",
                          backgroundColor: "var(--background-secondary)",
                          borderRadius: "4px",
                          border: "1px solid var(--border-color)"
                        }}>
                          <strong>Tip:</strong> Fill in the values between quotes for the fields you want to include in your request.
                          <button 
                            style={{
                              marginLeft: "10px",
                              padding: "3px 8px",
                              fontSize: "12px",
                              backgroundColor: "var(--accent-color)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              const templateJson = generateJsonTemplate();
                              setRawBody(templateJson);
                            }}
                          >
                            Generate Template
                          </button>
                        </div>
                        <textarea
                          className="raw-body-textarea"
                          value={rawBody}
                          onChange={(e) => setRawBody(e.target.value)}
                          placeholder="Enter raw JSON body"
                          spellCheck="false"
                          style={{
                            minHeight: "350px",
                            fontSize: "14px",
                            fontFamily: "'Fira Code', monospace",
                            lineHeight: "1.5",
                            padding: "15px",
                            width: "100%",
                            border: "1px solid var(--border-color)",
                            borderRadius: "4px",
                            backgroundColor: "var(--input-bg)",
                            color: "var(--text-color)",
                            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)"
                          }}
                        />
                        <div className="raw-body-format-btn" onClick={() => {
                          try {
                            const formatted = JSON.stringify(JSON.parse(rawBody), null, 2);
                            setRawBody(formatted);
                          } catch (error) {
                            // If JSON is invalid, don't format
                            console.error('Invalid JSON:', error);
                          }
                        }}>
                          Format
                        </div>
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
         
         .raw-body-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 8px 12px;
           background-color: var(--background-secondary);
           border-top-left-radius: 4px;
           border-top-right-radius: 4px;
         }
         
         .format-json-btn {
           background-color: var(--accent-color);
           color: white;
           border: none;
           border-radius: 4px;
           padding: 4px 8px;
           font-size: 0.8rem;
           cursor: pointer;
         }
         
         .format-json-btn:hover {
           background-color: var(--accent-color-hover);
         }
         
         .raw-body-editor {
           width: 100%;
           min-height: 300px;
           padding: 12px;
           font-family: monospace;
           font-size: 0.9rem;
           line-height: 1.4;
           background-color: var(--background-primary);
           color: var(--text-primary);
           border: 1px solid var(--border-color);
           border-top: none;
           resize: vertical;
         }
         
         .raw-body-editor:focus {
           outline: none;
           border-color: var(--accent-color);
         }

         .try-it-section {
           padding: 20px;
           background: var(--background-primary);
           border-radius: 8px;
           margin-bottom: 20px;
         }

         .body-type-selector {
           display: flex;
           gap: 8px;
           margin-bottom: 16px;
         }

         .body-type-btn {
           padding: 8px 16px;
           border: 1px solid var(--border-color);
           background: var(--background-secondary);
           color: var(--text-primary);
           border-radius: 4px;
           cursor: pointer;
           font-size: 0.9rem;
           transition: all 0.2s ease;
         }

         .body-type-btn.active {
           background: var(--accent-color);
           color: white;
           border-color: var(--accent-color);
         }

         .raw-body-section {
           border: 1px solid var(--border-color);
           border-radius: 4px;
           overflow: hidden;
         }

         .raw-body-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 8px 12px;
           background: var(--background-secondary);
           border-bottom: 1px solid var(--border-color);
         }

         .content-type-selector {
           display: flex;
           align-items: center;
         }

         .content-type-select {
           padding: 4px 8px;
           background: var(--background-primary);
           color: var(--text-primary);
           border: 1px solid var(--border-color);
           border-radius: 4px;
           font-size: 0.9rem;
         }

         .format-json-btn {
           padding: 4px 8px;
           background: var(--accent-color);
           color: white;
           border: none;
           border-radius: 4px;
           font-size: 0.8rem;
           cursor: pointer;
           transition: background 0.2s ease;
         }

         .format-json-btn:hover {
           background: var(--accent-color-hover);
         }

         .editor-container {
           position: relative;
           background: var(--background-primary);
         }

         .raw-body-editor {
           width: 100%;
           min-height: 300px;
           padding: 12px;
           background: var(--background-primary);
           color: var(--text-primary);
           border: none;
           font-family: monospace;
           font-size: 0.9rem;
           line-height: 1.5;
           resize: vertical;
           tab-size: 2;
         }

         .raw-body-editor:focus {
           outline: none;
         }

         .form-body-section {
           padding: 16px;
           border: 1px solid var(--border-color);
           border-radius: 4px;
         }

         .form-body-fields {
           display: flex;
           flex-direction: column;
           gap: 16px;
         }

         .form-field {
           display: flex;
           flex-direction: column;
           gap: 4px;
         }

         .form-field-label {
           display: flex;
           align-items: center;
           gap: 8px;
           font-weight: 500;
           color: var(--text-primary);
         }

         .required-badge {
           font-size: 0.7rem;
           padding: 2px 6px;
           background: var(--accent-color);
           color: white;
           border-radius: 4px;
           font-weight: normal;
         }

         .form-field-input {
           padding: 8px 12px;
           background: var(--background-primary);
           border: 1px solid var(--border-color);
           border-radius: 4px;
           color: var(--text-primary);
           font-size: 0.9rem;
           width: 100%;
         }

         .form-field-input:focus {
           outline: none;
           border-color: var(--accent-color);
         }

         .form-field-description {
           font-size: 0.8rem;
           color: var(--text-secondary);
         }

         .api-doc-container {
           display: flex;
           position: relative;
           height: 100vh;
           transition: all 0.3s ease;
         }

         .api-doc-container.with-api-panel .api-content {
           width: calc(100% - 600px);
           transition: width 0.3s ease;
         }

         .api-testing-panel {
           position: fixed;
           top: 0;
           right: 0;
           width: 600px;
           height: 100vh;
           background: var(--background-primary);
           border-left: 1px solid var(--border-color);
           overflow-y: auto;
           z-index: 100;
           animation: slideIn 0.3s ease;
         }

         .api-testing-panel-content {
           padding: 20px;
           height: 100%;
           overflow-y: auto;
         }

         @keyframes slideIn {
           from {
             transform: translateX(100%);
           }
           to {
             transform: translateX(0);
           }
         }

         .api-content {
           flex: 1;
           transition: width 0.3s ease;
           width: 100%;
         }

         .api-content.with-api-panel {
           width: calc(100% - 600px);
         }

         /* Adjust responsive behavior */
         @media (max-width: 1200px) {
           .api-testing-panel {
             width: 500px;
           }
           
           .api-doc-container.with-api-panel .api-content {
             width: calc(100% - 500px);
           }
         }

         @media (max-width: 992px) {
           .api-testing-panel {
             width: 100%;
             position: fixed;
             top: 0;
             left: 0;
             right: 0;
             bottom: 0;
             z-index: 1000;
           }
           
           .api-doc-container.with-api-panel .api-content {
             width: 100%;
           }
         }

         /* Update existing modal styles for the panel */
         .try-it-modal-header {
           position: sticky;
           top: 0;
           background: var(--background-primary);
           z-index: 10;
           padding-bottom: 16px;
           border-bottom: 1px solid var(--border-color);
         }

         .try-it-modal-close {
           padding: 4px 8px;
           background: none;
           border: none;
           font-size: 20px;
           cursor: pointer;
           color: var(--text-secondary);
         }

         .try-it-modal-close:hover {
           color: var(--text-primary);
         }

         .api-panel-overlay {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background-color: rgba(0, 0, 0, 0.75);
           z-index: 99;
           animation: fadeIn 0.3s ease;
         }

         .api-testing-panel {
           position: fixed;
           top: 0;
           right: 0;
           width: 600px;
           height: 100vh;
           background: var(--background-primary);
           border-left: 1px solid var(--border-color);
           overflow-y: auto;
           z-index: 100;
           animation: slideIn 0.3s ease;
         }

         @keyframes fadeIn {
           from {
             opacity: 0;
           }
           to {
             opacity: 1;
           }
         }

         /* Update the slideIn animation to work with the overlay */
         @keyframes slideIn {
           from {
             transform: translateX(100%);
             opacity: 0;
           }
           to {
             transform: translateX(0);
             opacity: 1;
           }
         }

         /* Prevent scrolling of main content when panel is open */
         .api-doc-container.with-api-panel {
           overflow: hidden;
         }

         /* Ensure the panel content is on top of the overlay */
         .api-testing-panel-content {
           position: relative;
           z-index: 101;
           background: var(--background-primary);
         }

         /* Make sure the background stays dark in both themes */
         .light-theme .api-panel-overlay,
         .dark-theme .api-panel-overlay {
           background-color: rgba(0, 0, 0, 0.75);
         }

         /* Ensure the panel has a dark background */
         .api-testing-panel {
           background: #1a1a1a;
         }

         /* Add a subtle shadow to the panel */
         .api-testing-panel {
           box-shadow: -4px 0 15px rgba(0, 0, 0, 0.5);
         }
        `}
      </style>

      {/* API Testing Panel with Overlay */}
      {showTryItModal && (
        <>
          <div className="api-panel-overlay"></div>
          <div className="api-testing-panel" ref={apiPanelRef}>
            <div className="api-testing-panel-content">
              <div className="try-it-modal-header">
                <div className="try-it-title-section">
                  <span className={`endpoint-method ${getMethodClassName(currentEndpoint.method)}`}>
                    {currentEndpoint.method}
                  </span>
                  <div className="d-flex align-items-center">
                    <h2>{activeEndpoint === 'getEmployeeById' && (apiBaseUrl || isResponseFromApi) ? 'Get Employee Data' : currentEndpoint.title}</h2>
                    {isResponseFromApi && (
                      <span className="ms-2 badge">API</span>
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

                <div className="request-tabs">
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

                {/* Add styles for the request tabs */}
                <style>
                {`
                  .request-tabs {
                    display: flex;
                    gap: 2px;
                    margin-bottom: 16px;
                    border-bottom: 1px solid var(--border-color);
                    background: var(--background-secondary);
                    padding: 4px;
                    border-radius: 4px;
                  }

                  .request-tab {
                    padding: 8px 16px;
                    cursor: pointer;
                    border-radius: 4px 4px 0 0;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                    position: relative;
                    border-bottom: 3px solid transparent;
                    margin-bottom: -1px;
                  }

                  @keyframes tabActivate {
                    0% { transform: translateY(2px); opacity: 0.7; }
                    100% { transform: translateY(0); opacity: 1; }
                  }

                  .request-tab:hover {
                    background: var(--background-tertiary);
                    color: var(--text-primary);
                  }

                  .request-tab.active {
                    background: var(--background-tertiary);
                    color: var(--accent-color);
                    font-weight: 600;
                    box-shadow: 0 -2px 8px rgb(255 255 255 / 70%);
                    animation: tabActivate 0.3s ease forwards;
                  }
                  
                  .request-tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background-color: var(--accent-color);
                    border-radius: 3px 3px 0 0;
                  }
                  
                  .light-theme .request-tab {
                    color: var(--text-muted);
                  }
                  
                  .light-theme .request-tab:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: var(--text-color);
                  }
                  
                  .light-theme .request-tab.active {
                    background: rgba(0, 0, 0, 0.03);
                    color: var(--primary-purple);
                    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
                  }
                  
                  .light-theme .request-tab.active::after {
                    background-color: var(--primary-purple);
                  }
                  
                  .request-tab-content {
                    animation: fadeIn 0.3s ease;
                  }

                  .try-it-section {
                    padding: 16px;
                    background: var(--background-primary);
                    border-radius: 4px;
                    margin-bottom: 16px;
                  }

                  .body-type-selector {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 16px;
                  }

                  .body-type-btn {
                    padding: 6px 12px;
                    border: 1px solid var(--border-color);
                    background: var(--background-secondary);
                    color: var(--text-primary);
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                  }

                  .body-type-btn.active {
                    background: var(--accent-color);
                    color: white;
                    border-color: var(--accent-color);
                  }

                  .raw-body-section {
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                  }

                  .raw-body-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 12px;
                    background: var(--background-secondary);
                    border-bottom: 1px solid var(--border-color);
                  }

                  .format-json-btn {
                    padding: 4px 8px;
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                  }

                  .raw-body-editor {
                    width: 100%;
                    min-height: 300px;
                    padding: 12px;
                    background: var(--background-primary);
                    color: var(--text-primary);
                    border: none;
                    font-family: monospace;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    resize: vertical;
                  }

                  .raw-body-editor:focus {
                    outline: none;
                  }
                `}
                </style>

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
                    <h3>Request Body</h3>
                    <div className="body-type-selector">
                      <button 
                        className={`body-type-btn ${bodyType === 'form' ? 'active' : ''}`}
                        onClick={() => setBodyType('form')}
                      >
                        Form
                      </button>
                      <button 
                        className={`body-type-btn ${bodyType === 'raw' ? 'active' : ''}`}
                        onClick={() => {
                          setBodyType('raw');
                          
                          // Generate a default template when switching to raw mode
                          if (!rawBody || rawBody.trim() === '') {
                            const templateJson = generateJsonTemplate();
                            setRawBody(templateJson);
                          }
                        }}
                      >
                        Raw
                      </button>
                    </div>
                    
                    {bodyType === 'form' && (
                      <div className="params-table">
                        <div className="param-row header">
                          <div className="param-name">Parameter</div>
                          <div className="param-value">Value</div>
                          <div className="param-type">Type</div>
                          <div className="param-required">Required</div>
                          </div>
                        {currentEndpoint.bodyParams && currentEndpoint.bodyParams.map((param, index) => (
                          <div className="param-row" key={index}>
                            <div className="param-name">
                                {param.name}
                              {param.required && <span className="required-badge">*</span>}
                            </div>
                            <div className="param-value">
                              <input
                                type={param.type === 'password' ? 'password' : 'text'}
                                className="param-input"
                                value={requestParams[param.name] || ''}
                                onChange={(e) => updateRequestParam(param.name, e.target.value)}
                                placeholder={param.example || `Enter ${param.name}`}
                              />
                              </div>
                            <div className="param-type">{param.type}</div>
                            <div className="param-required">{param.required ? 'Yes' : 'No'}</div>
                            {param.description && (
                              <div className="param-description">
                                <span className="info-icon" title={param.description}>ℹ️</span>
                                <div className="param-description-tooltip">{param.description}</div>
                              </div>
                            )}
                            </div>
                          ))}
                      </div>
                    )}
                    
                    {bodyType === 'raw' && (
                      <div className="raw-body-editor">
                        <div className="raw-body-hint" style={{
                          marginBottom: "8px",
                          fontSize: "13px",
                          color: "var(--text-muted)",
                          padding: "8px 12px",
                          backgroundColor: "var(--background-secondary)",
                          borderRadius: "4px",
                          border: "1px solid var(--border-color)"
                        }}>
                          <strong>Tip:</strong> Fill in the values between quotes for the fields you want to include in your request.
                          <button 
                            style={{
                              marginLeft: "10px",
                              padding: "3px 8px",
                              fontSize: "12px",
                              backgroundColor: "var(--accent-color)",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              const templateJson = generateJsonTemplate();
                              setRawBody(templateJson);
                            }}
                          >
                            Generate Template
                          </button>
                        </div>
                        <textarea
                          className="raw-body-textarea"
                          value={rawBody}
                          onChange={(e) => setRawBody(e.target.value)}
                          placeholder="Enter raw JSON body"
                          spellCheck="false"
                          style={{
                            minHeight: "350px",
                            fontSize: "14px",
                            fontFamily: "'Fira Code', monospace",
                            lineHeight: "1.5",
                            padding: "15px",
                            width: "100%",
                            border: "1px solid var(--border-color)",
                            borderRadius: "4px",
                            backgroundColor: "var(--input-bg)",
                            color: "var(--text-color)",
                            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)"
                          }}
                        />
                        <div className="raw-body-format-btn" onClick={() => {
                          try {
                            const formatted = JSON.stringify(JSON.parse(rawBody), null, 2);
                            setRawBody(formatted);
                          } catch (error) {
                            // If JSON is invalid, don't format
                            console.error('Invalid JSON:', error);
                          }
                        }}>
                          Format
                        </div>
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
        </>
      )}

      <style>
        {`
          .api-panel-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.75);
            z-index: 99;
            animation: fadeIn 0.3s ease;
          }

          .api-testing-panel {
            position: fixed;
            top: 0;
            right: 0;
            width: 600px;
            height: 100vh;
            background: #1a1a1a;
            border-left: 1px solid var(--border-color);
            overflow-y: auto;
            z-index: 100;
            animation: slideIn 0.3s ease;
            box-shadow: -4px 0 15px rgba(0, 0, 0, 0.5);
          }

          .api-testing-panel-content {
            position: relative;
            z-index: 101;
            background: #1a1a1a;
            padding: 20px;
            height: 100%;
            overflow-y: auto;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Prevent scrolling of main content when panel is open */
          .api-doc-container.with-api-panel {
            overflow: hidden;
          }

          /* Make sure the background stays dark in both themes */
          .light-theme .api-panel-overlay,
          .dark-theme .api-panel-overlay {
            background-color: rgba(0, 0, 0, 0.75);
          }

          /* Adjust responsive behavior */
          @media (max-width: 1200px) {
            .api-testing-panel {
              width: 500px;
            }
            
            .api-doc-container.with-api-panel .api-content {
              width: calc(100% - 500px);
            }
          }

          @media (max-width: 992px) {
            .api-testing-panel {
              width: 100%;
            }
            
            .api-doc-container.with-api-panel .api-content {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ApiDoc; 