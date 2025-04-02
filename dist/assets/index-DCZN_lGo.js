import{r as o,a as ea,B as aa,R as ra,b as Ie}from"./react-vendor-ByUpW5QV.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))_(c);new MutationObserver(c=>{for(const b of c)if(b.type==="childList")for(const l of b.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&_(l)}).observe(document,{childList:!0,subtree:!0});function S(c){const b={};return c.integrity&&(b.integrity=c.integrity),c.referrerPolicy&&(b.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?b.credentials="include":c.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function _(c){if(c.ep)return;c.ep=!0;const b=S(c);fetch(c.href,b)}})();var Ae={exports:{}},se={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ta=o,sa=Symbol.for("react.element"),na=Symbol.for("react.fragment"),ia=Object.prototype.hasOwnProperty,la=ta.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,oa={key:!0,ref:!0,__self:!0,__source:!0};function $e(y,u,S){var _,c={},b=null,l=null;S!==void 0&&(b=""+S),u.key!==void 0&&(b=""+u.key),u.ref!==void 0&&(l=u.ref);for(_ in u)ia.call(u,_)&&!oa.hasOwnProperty(_)&&(c[_]=u[_]);if(y&&y.defaultProps)for(_ in u=y.defaultProps,u)c[_]===void 0&&(c[_]=u[_]);return{$$typeof:sa,type:y,key:b,ref:l,props:c,_owner:la.current}}se.Fragment=na;se.jsx=$e;se.jsxs=$e;Ae.exports=se;var e=Ae.exports,Le,Te=ea;Le=Te.createRoot,Te.hydrateRoot;const ma=()=>{var Ce;const[y,u]=o.useState("shell"),[S,_]=o.useState(!0),[c,b]=o.useState(["employee","salary","payroll","insurance","leave"]),[l,Z]=o.useState("getAllEmployees"),[ca,Re]=o.useState(!1),[O,ce]=o.useState(!1),[V,Me]=o.useState(!0),[f,ue]=o.useState(""),xe=o.useRef(null),[ua,xa]=o.useState({top:0,left:0,width:0}),[Oe,Q]=o.useState(!1),ye=o.useRef(null),[ne,he]=o.useState(""),[T,U]=o.useState(null),[A,v]=o.useState(!1),[Ue,D]=o.useState(!1),[ie,k]=o.useState(""),[d,le]=o.useState({}),[W,ge]=o.useState(!1),[j,w]=o.useState("params"),[$,L]=o.useState(null),[ee,oe]=o.useState({"Content-Type":"application/json",Authorization:"Bearer token123"}),[B,be]=o.useState(""),[R,_e]=o.useState("form"),[fe,ve]=o.useState(!1),[z,ya]=o.useState([{name:"Development",variables:{baseUrl:"https://dev-api.employeedb.com/v1",apiKey:"dev_api_key_123"}},{name:"Production",variables:{baseUrl:"https://api.employeedb.com/v1",apiKey:"prod_api_key_456"}}]),[M,De]=o.useState("Development"),[x,ae]=o.useState("https://hrms-api.xpectrum-ai.com/hrms/api/v1"),[E,me]=o.useState("EM37938"),[Be,je]=o.useState(!1),[X,Ee]=o.useState(!1),[ze,J]=o.useState(""),[Xe,re]=o.useState(!1);o.useEffect(()=>{const a=localStorage.getItem("apiBaseUrl");a&&ae(a)},[]),o.useEffect(()=>{x&&localStorage.setItem("apiBaseUrl",x)},[x]);const h={getAllEmployees:{title:"Get All Employees",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/all_employee_data",badge:"Stable",breadcrumb:"Employee",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"department",type:"string",required:!1,example:"Example: Engineering"},{name:"status",type:"string",required:!1,example:"Example: active"},{name:"page",type:"integer",required:!1,example:"Example: 1"},{name:"limit",type:"integer",required:!1,example:"Example: 10"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
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
}`}},getEmployeeById:{title:"Get Employee by ID",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}",badge:"Stable",breadcrumb:"Employee",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
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
}`}},createEmployee:{title:"Create Employee",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data",badge:"Stable",breadcrumb:"Employee",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"source",type:"string",required:!1,example:"Example: system"},{name:"sync",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"first_name",type:"string",required:!0,example:"Example: John"},{name:"last_name",type:"string",required:!0,example:"Example: Smith"},{name:"email",type:"string",required:!0,example:"Example: john.smith@example.com"},{name:"phone_number",type:"string",required:!1,example:"Example: +1 123-456-7890"},{name:"hire_date",type:"string",required:!0,example:"Example: 2023-05-15"},{name:"job_title",type:"string",required:!0,example:"Example: Software Developer"},{name:"job_id",type:"integer",required:!1,example:"Example: 3"},{name:"hiring_manager_id",type:"string",required:!1,example:"Example: EMP005"},{name:"hr_manager_id",type:"string",required:!1,example:"Example: EMP010"},{name:"department",type:"string",required:!0,example:"Example: Engineering"}],response:{example:`{
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
}`}},updateEmployee:{title:"Update Employee",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}",badge:"Stable",breadcrumb:"Employee",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"source",type:"string",required:!1,example:"Example: system"},{name:"notify",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"first_name",type:"string",required:!1,example:"Example: John"},{name:"last_name",type:"string",required:!1,example:"Example: Smith"},{name:"email",type:"string",required:!1,example:"Example: john.smith@example.com"},{name:"phone_number",type:"string",required:!1,example:"Example: +1 123-456-7890"},{name:"job_title",type:"string",required:!1,example:"Example: Senior Developer"},{name:"job_id",type:"integer",required:!1,example:"Example: 5"},{name:"department",type:"string",required:!1,example:"Example: Engineering"},{name:"status",type:"string",required:!1,example:"Example: inactive"}],response:{example:`{
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
}`}},deleteEmployee:{title:"Delete Employee",method:"DELETE",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_data/{employee_id}",badge:"Stable",breadcrumb:"Employee",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"force",type:"boolean",required:!1,example:"Example: false"},{name:"archive",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "success": true,
  "message": "Employee with ID EMP001 has been successfully deleted",
  "deleted_at": "2023-05-22T10:15:20Z"
}`}},getSalaryInfo:{title:"Get Salary Information",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info/{employee_id}",badge:"Stable",breadcrumb:"Salary",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "salary_type": "annual",
  "bonus": 5000.00,
  "commission": 0.00,
  "currency": "USD",
  "salary_grade": "L3",
  "last_salary_increase_date": "2023-01-01"
}`}},updateSalaryInfo:{title:"Update Salary Information",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info/{employee_id}",badge:"Stable",breadcrumb:"Salary",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"backdated",type:"boolean",required:!1,example:"Example: false"},{name:"notify",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"base_salary",type:"number",required:!1,example:"Example: 90000.00"},{name:"salary_type",type:"string",required:!1,example:"Example: annual"},{name:"bonus",type:"number",required:!1,example:"Example: 6000.00"},{name:"commission",type:"number",required:!1,example:"Example: 2000.00"},{name:"currency",type:"string",required:!1,example:"Example: USD"},{name:"salary_grade",type:"string",required:!1,example:"Example: L4"},{name:"last_salary_increase_date",type:"string",required:!1,example:"Example: 2023-05-01"}],response:{example:`{
  "employee_id": "EMP001",
  "base_salary": 90000.00,
  "salary_type": "annual",
  "bonus": 6000.00,
  "commission": 2000.00,
  "currency": "USD",
  "salary_grade": "L4",
  "last_salary_increase_date": "2023-05-01",
  "updated_at": "2023-05-20T14:30:45Z"
}`}},createSalaryInfo:{title:"Create Salary Information",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/salary_info",badge:"Stable",breadcrumb:"Salary",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"backdated",type:"boolean",required:!1,example:"Example: false"},{name:"effective_date",type:"string",required:!1,example:"Example: 2023-06-01"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"employee_id",type:"string",required:!0,example:"Example: EMP003"},{name:"base_salary",type:"number",required:!0,example:"Example: 75000.00"},{name:"salary_type",type:"string",required:!0,example:"Example: annual"},{name:"bonus",type:"number",required:!1,example:"Example: 2000.00"},{name:"commission",type:"number",required:!1,example:"Example: 0.00"},{name:"currency",type:"string",required:!1,example:"Example: USD"},{name:"salary_grade",type:"string",required:!1,example:"Example: L2"}],response:{example:`{
  "employee_id": "EMP003",
  "base_salary": 75000.00,
  "salary_type": "annual",
  "bonus": 2000.00,
  "commission": 0.00,
  "currency": "USD",
  "salary_grade": "L2",
  "created_at": "2023-05-22T10:15:20Z"
}`}},getPayrollData:{title:"Get Payroll Data",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll/{employee_id}",badge:"Stable",breadcrumb:"Payroll",queryParams:[{name:"month",type:"string",required:!1,example:"Example: 2023-05"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-05",
  "salary_received_day": "2023-05-30"
}`}},updatePayrollData:{title:"Update Payroll Data",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll/{employee_id}",badge:"Stable",breadcrumb:"Payroll",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"base_salary",type:"number",required:!1,example:"Example: 85000.00"},{name:"federal_tax",type:"number",required:!1,example:"Example: 1458.33"},{name:"state_tax",type:"number",required:!1,example:"Example: 625.00"},{name:"total_tax",type:"number",required:!1,example:"Example: 2083.33"},{name:"month",type:"string",required:!0,example:"Example: 2023-05"},{name:"salary_received_day",type:"string",required:!1,example:"Example: 2023-05-30"}],response:{example:`{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-05",
  "salary_received_day": "2023-05-30",
  "updated_at": "2023-05-25T09:45:12Z"
}`}},createPayrollData:{title:"Create Payroll Data",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/payroll",badge:"Stable",breadcrumb:"Payroll",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"tax_year",type:"string",required:!1,example:"Example: 2023"},{name:"recalculate",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"employee_id",type:"string",required:!0,example:"Example: EMP001"},{name:"base_salary",type:"number",required:!0,example:"Example: 85000.00"},{name:"federal_tax",type:"number",required:!0,example:"Example: 1458.33"},{name:"state_tax",type:"number",required:!0,example:"Example: 625.00"},{name:"total_tax",type:"number",required:!0,example:"Example: 2083.33"},{name:"month",type:"string",required:!0,example:"Example: 2023-06"},{name:"salary_received_day",type:"string",required:!0,example:"Example: 2023-06-30"}],response:{example:`{
  "employee_id": "EMP001",
  "base_salary": 85000.00,
  "federal_tax": 1458.33,
  "state_tax": 625.00,
  "total_tax": 2083.33,
  "month": "2023-06",
  "salary_received_day": "2023-06-30",
  "created_at": "2023-06-01T14:30:20Z"
}`}},getEmployeeInsuranceData:{title:"Get Employee Insurance Data",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data/{employee_id}",badge:"Stable",breadcrumb:"Insurance",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "employee_id": "EMP001",
  "plan_name": "Premium Health Plan",
  "insurance_plan_id": "INS-PLAN-001",
  "enrollment_date": "2022-01-15",
  "coverage_type": "family",
  "employee_contribution": 250.00,
  "enrollment_time": "10:30:45"
}`}},updateEmployeeInsuranceData:{title:"Update Employee Insurance Data",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data/{employee_id}",badge:"Stable",breadcrumb:"Insurance",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"effective_date",type:"string",required:!1,example:"Example: 2023-07-01"},{name:"notify",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"plan_name",type:"string",required:!1,example:"Example: Gold Health Plan"},{name:"insurance_plan_id",type:"string",required:!1,example:"Example: INS-PLAN-002"},{name:"enrollment_date",type:"string",required:!1,example:"Example: 2023-01-15"},{name:"coverage_type",type:"string",required:!1,example:"Example: employee+spouse"},{name:"employee_contribution",type:"number",required:!1,example:"Example: 180.00"},{name:"enrollment_time",type:"string",required:!1,example:"Example: 11:45:30"}],response:{example:`{
  "employee_id": "EMP001",
  "plan_name": "Gold Health Plan",
  "insurance_plan_id": "INS-PLAN-002",
  "enrollment_date": "2023-01-15",
  "coverage_type": "employee+spouse",
  "employee_contribution": 180.00,
  "enrollment_time": "11:45:30",
  "updated_at": "2023-02-10T09:15:22Z"
}`}},createEmployeeInsuranceData:{title:"Create Employee Insurance Data",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/employee_insurance_data",badge:"Stable",breadcrumb:"Insurance",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"immediate",type:"boolean",required:!1,example:"Example: true"},{name:"notify_hr",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"employee_id",type:"string",required:!0,example:"Example: EMP003"},{name:"plan_name",type:"string",required:!0,example:"Example: Standard Health Plan"},{name:"insurance_plan_id",type:"string",required:!0,example:"Example: INS-PLAN-003"},{name:"enrollment_date",type:"string",required:!0,example:"Example: 2023-05-01"},{name:"coverage_type",type:"string",required:!0,example:"Example: employee_only"},{name:"employee_contribution",type:"number",required:!0,example:"Example: 120.00"},{name:"enrollment_time",type:"string",required:!1,example:"Example: 09:30:00"}],response:{example:`{
  "employee_id": "EMP003",
  "plan_name": "Standard Health Plan",
  "insurance_plan_id": "INS-PLAN-003",
  "enrollment_date": "2023-05-01",
  "coverage_type": "employee_only",
  "employee_contribution": 120.00,
  "enrollment_time": "09:30:00",
  "created_at": "2023-05-01T09:30:00Z"
}`}},getInsuranceData:{title:"Get Insurance Data",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_data/{employee_id}",badge:"Stable",breadcrumb:"Insurance",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "employee_id": "EMP001",
  "plan_name": "Premium Health Plan",
  "insurance_plan_id": "INS-PLAN-001",
  "enrollment_date": "2022-01-15",
  "coverage_type": "family",
  "employee_contribution": 250.00,
  "enrollment_time": "10:30:45",
  "premium_per_month": 950.00
}`}},getInsurancePlan:{title:"Get Insurance Plan",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_plan/{plan_name}",badge:"Stable",breadcrumb:"Insurance",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
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
}`}},createInsurancePlan:{title:"Create Insurance Plan",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/insurance_plan",badge:"Stable",breadcrumb:"Insurance",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"effective_date",type:"string",required:!1,example:"Example: 2023-08-01"},{name:"company_wide",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"plan_name",type:"string",required:!0,example:"Example: Essential Health Plan"},{name:"plan_id",type:"string",required:!0,example:"Example: INS-PLAN-004"},{name:"network",type:"string",required:!1,example:"Example: Regional"},{name:"deductible_individual_family",type:"string",required:!1,example:"Example: $1000/$2000"},{name:"out_of_pocket_maximum_individual_family",type:"string",required:!1,example:"Example: $5000/$10000"},{name:"coinsurance",type:"string",required:!1,example:"Example: 70/30"},{name:"overall_lifetime_maximum",type:"string",required:!1,example:"Example: Unlimited"},{name:"rates_premium_employee_only",type:"number",required:!0,example:"Example: 350.00"},{name:"rates_premium_employer_contribution_employee_only",type:"number",required:!0,example:"Example: 250.00"},{name:"rates_premium_employee_contribution_employee_only",type:"number",required:!0,example:"Example: 100.00"},{name:"rates_premium_employee_spouse",type:"number",required:!1,example:"Example: 600.00"},{name:"rates_premium_employer_contribution_employee_spouse",type:"number",required:!1,example:"Example: 450.00"},{name:"rates_premium_employee_contribution_employee_spouse",type:"number",required:!1,example:"Example: 150.00"}],response:{example:`{
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
}`}},getLeaveBalanceData:{title:"Get Leave Balance Data",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data/{employee_id}",badge:"Stable",breadcrumb:"Leave",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
  "employee_id": "EMP001",
  "annual_leave_balance": 15,
  "sick_leave_balance": 10,
  "personal_leave_balance": 3,
  "unpaid_leave_taken": 0,
  "leave_balance_updated_date": "2023-05-01"
}`}},updateLeaveBalanceData:{title:"Update Leave Balance Data",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data/{employee_id}",badge:"Stable",breadcrumb:"Leave",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"reset",type:"boolean",required:!1,example:"Example: false"},{name:"prorate",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"annual_leave_balance",type:"integer",required:!1,example:"Example: 12"},{name:"sick_leave_balance",type:"integer",required:!1,example:"Example: 8"},{name:"personal_leave_balance",type:"integer",required:!1,example:"Example: 2"},{name:"unpaid_leave_taken",type:"integer",required:!1,example:"Example: 1"},{name:"leave_balance_updated_date",type:"string",required:!1,example:"Example: 2023-05-15"}],response:{example:`{
  "employee_id": "EMP001",
  "annual_leave_balance": 12,
  "sick_leave_balance": 8,
  "personal_leave_balance": 2,
  "unpaid_leave_taken": 1,
  "leave_balance_updated_date": "2023-05-15",
  "updated_at": "2023-05-15T10:20:30Z"
}`}},createLeaveBalanceData:{title:"Create Leave Balance Data",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_balance_data",badge:"Stable",breadcrumb:"Leave",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"year",type:"string",required:!1,example:"Example: 2023"},{name:"prorate",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"employee_id",type:"string",required:!0,example:"Example: EMP003"},{name:"annual_leave_balance",type:"integer",required:!0,example:"Example: 20"},{name:"sick_leave_balance",type:"integer",required:!0,example:"Example: 12"},{name:"personal_leave_balance",type:"integer",required:!0,example:"Example: 5"},{name:"unpaid_leave_taken",type:"integer",required:!1,example:"Example: 0"},{name:"leave_balance_updated_date",type:"string",required:!0,example:"Example: 2023-05-01"}],response:{example:`{
  "employee_id": "EMP003",
  "annual_leave_balance": 20,
  "sick_leave_balance": 12,
  "personal_leave_balance": 5,
  "unpaid_leave_taken": 0,
  "leave_balance_updated_date": "2023-05-01",
  "created_at": "2023-05-01T09:00:00Z"
}`}},getLeaveRequest:{title:"Get Leave Request",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests/{application_id}",badge:"Stable",breadcrumb:"Leave",queryParams:[],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
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
}`}},getAllLeaveRequests:{title:"Get All Leave Requests",method:"GET",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests",badge:"Stable",breadcrumb:"Leave",queryParams:[{name:"employee_id",type:"string",required:!1,example:"Example: EMP001"},{name:"status",type:"string",required:!1,example:"Example: approved"},{name:"leave_type",type:"string",required:!1,example:"Example: annual"},{name:"start_date_from",type:"string",required:!1,example:"Example: 2023-01-01"},{name:"start_date_to",type:"string",required:!1,example:"Example: 2023-12-31"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],response:{example:`{
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
}`}},createLeaveRequest:{title:"Create Leave Request",method:"POST",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests",badge:"Stable",breadcrumb:"Leave",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"auto_approve",type:"boolean",required:!1,example:"Example: false"},{name:"notify",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"employee_id",type:"string",required:!0,example:"Example: EMP001"},{name:"start_date",type:"string",required:!0,example:"Example: 2023-07-15"},{name:"end_date",type:"string",required:!0,example:"Example: 2023-07-19"},{name:"leave_type",type:"string",required:!0,example:"Example: annual"},{name:"reason",type:"string",required:!0,example:"Example: Family event"},{name:"total_working_days_off",type:"integer",required:!1,example:"Example: 5"},{name:"total_days_off",type:"integer",required:!1,example:"Example: 5"},{name:"deduction_from_salary",type:"integer",required:!1,example:"Example: 0"}],response:{example:`{
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
}`}},updateLeaveRequest:{title:"Update Leave Request",method:"PUT",url:"https://hrms-api.xpectrum-ai.com/hrms/api/v1/leave_requests/{application_id}",badge:"Stable",breadcrumb:"Leave",queryParams:[{name:"api_key",type:"string",required:!0,example:"Example: xpectrum_api_key_123@ai"},{name:"notify_employee",type:"boolean",required:!1,example:"Example: true"},{name:"notify_manager",type:"boolean",required:!1,example:"Example: true"}],headerParams:[{name:"X-API-KEY",type:"string",required:!0,example:"Example: your_api_key"},{name:"Content-Type",type:"string",required:!0,example:"Example: application/json"},{name:"Authorization",type:"string",required:!0,example:"Example: Bearer token"}],bodyParams:[{name:"status",type:"string",required:!1,example:"Example: approved"},{name:"reviewed_by",type:"string",required:!1,example:"Example: EMP010"},{name:"approved_by",type:"string",required:!1,example:"Example: EMP010"},{name:"start_date",type:"string",required:!1,example:"Example: 2023-07-16"},{name:"end_date",type:"string",required:!1,example:"Example: 2023-07-20"},{name:"reason",type:"string",required:!1,example:"Example: Family emergency"}],response:{example:`{
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
}`}}},t=h[l]||h.getAllEmployees,Ne=()=>{v(!0),k(""),L(null),U(null),Ee(!0);const a=z.find(i=>i.name===M),r=ne||(a==null?void 0:a.variables.apiKey)||"";if(!r&&t.headerParams.some(i=>i.name==="X-API-KEY"&&i.required)){k("API key is required for this endpoint"),v(!1),D(!0);return}if(!x){k("API base URL is required"),v(!1),D(!0);return}const s=performance.now();let m=`${x}`;if(l==="getAllEmployees")m=`${x}/all_employee_data?api_key=xpectrum_api_key_123@ai`;else if(l.includes("InsurancePlan")){if(m+="/insurance_plan",t.url.includes("{plan_name}")){const i=d.plan_name||"Premium Health Plan";m+=`/${encodeURIComponent(i)}`}}else if(l.includes("Employee")&&!l.includes("Insurance")?m+="/employee_data":l.includes("Salary")?m+="/salary_info":l.includes("Payroll")?m+="/payroll":l.includes("Insurance")||l.includes("insurance")?m+="/employee_insurance_data":l.includes("LeaveBalance")?m+="/leave_balance_data":l.includes("LeaveRequest")&&(m+="/leave_requests"),t.url.includes("{employee_id}"))m+=`/${E}`,le({...d,employee_id:E});else if(t.url.includes("{application_id}")){const i=d.application_id||"12345";m+=`/${i}`}if(t.queryParams&&t.queryParams.length>0){const i=new URLSearchParams;t.queryParams.forEach(p=>{d[p.name]&&i.append(p.name,d[p.name])});const n=i.toString();n&&(m+=`?${n}`)}const g={method:t.method,headers:{"Content-Type":"application/json","X-API-KEY":r}};if(["POST","PUT","PATCH"].includes(t.method)&&t.bodyParams){const i={};t.bodyParams.forEach(n=>{d[n.name]&&(n.type==="number"||n.type==="integer"?i[n.name]=Number(d[n.name]):i[n.name]=d[n.name])}),g.body=JSON.stringify(i)}D(!0),console.log(`Making ${t.method} request to: ${m}`),fetch(m,g).then(i=>{if(!i.ok)throw new Error(`HTTP error! Status: ${i.status}`);const n=i.headers.get("content-type");if(!n||!n.includes("application/json"))throw new Error("Response is not JSON");return{response:i,status:i.status,statusText:i.statusText,time:Math.round(performance.now()-s)}}).then(({response:i,status:n,statusText:p,time:P})=>i.json().then(N=>({data:N,status:n,statusText:p,time:P}))).then(({data:i,status:n,statusText:p,time:P})=>{const N=JSON.stringify(i).length,F=N<1024?`${N} B`:`${(N/1024).toFixed(2)} KB`;L({status:n,statusText:p,time:P,size:F,headers:{}}),U(i),v(!1)}).catch(i=>{console.error("API call error:",i);const n=performance.now();L({status:0,statusText:"Failed",time:Math.round(n-s),size:"0 B"}),k(i instanceof Error?i.message:"An error occurred during the API call"),v(!1)})},Je=a=>{const s=["employee_id"].filter(m=>!a[m]);if(s.length>0)throw new Error(`Missing required fields: ${s.join(", ")}`);if(a.job_id&&typeof a.job_id!="number")throw new Error("job_id must be a number");return!0},He=()=>{var a;v(!0),k(""),L(null),U(null);try{if(["POST","PUT"].includes(t.method)){const n=R==="raw"?JSON.parse(B):d;t.url.includes("employee_data")&&Je(n)}if(!x){k("API base URL is required"),v(!1);return}Ee(!0);const r=performance.now();let s=`${x}`;l==="getAllEmployees"?s=`${x}/all_employee_data`:l.includes("Employee")?s+="/employee_data":l.includes("Salary")?s+="/salary_info":l.includes("Payroll")?s+="/payroll":l.includes("Insurance")?s+="/employee_insurance_data":l.includes("LeaveBalance")?s+="/leave_balance_data":l.includes("LeaveRequest")&&(s+="/leave_requests"),t.url.includes("{employee_id}")&&(s+=`/${d.employee_id||E}`);const m=new URLSearchParams;m.append("api_key","xpectrum_api_key_123@ai"),t.queryParams&&t.queryParams.length>0&&t.queryParams.forEach(n=>{d[n.name]&&n.name!=="api_key"&&m.append(n.name,d[n.name])});const g=m.toString();g&&(s+=`?${g}`);const i={method:t.method,headers:{"Content-Type":"application/json","X-API-KEY":ne||((a=z.find(n=>n.name===M))==null?void 0:a.variables.apiKey)||"",...ee}};if(["POST","PUT","PATCH"].includes(t.method))if(R==="raw"&&B)try{const n=JSON.parse(B);i.body=JSON.stringify(n)}catch(n){throw new Error("Invalid JSON in request body: "+(n instanceof Error?n.message:String(n)))}else{const n={};t.bodyParams&&t.bodyParams.forEach(p=>{if(d[p.name]!==void 0&&d[p.name]!=="")if(p.type==="number"||p.type==="integer")n[p.name]=Number(d[p.name]);else if(p.type==="boolean")n[p.name]=d[p.name]==="true";else if(p.type==="object"||p.type==="array")try{n[p.name]=JSON.parse(d[p.name])}catch{n[p.name]=d[p.name]}else n[p.name]=d[p.name]}),i.body=JSON.stringify(n)}console.log(`Making ${t.method} request to: ${s}`),console.log("Request options:",i),console.log("Request body:",i.body),fetch(s,i).then(n=>{const p={};return n.headers.forEach((P,N)=>{p[N]=P}),{response:n,status:n.status,statusText:n.statusText,time:Math.round(performance.now()-r),headers:p}}).then(({response:n,status:p,statusText:P,time:N,headers:F})=>n.text().then(I=>{let K;try{K=I&&I.trim()?JSON.parse(I):{}}catch{K={rawResponse:I}}return{data:K,status:p,statusText:P,time:N,headers:F}})).then(({data:n,status:p,statusText:P,time:N,headers:F})=>{const I=JSON.stringify(n).length,K=I<1024?`${I} B`:`${(I/1024).toFixed(2)} KB`;L({status:p,statusText:P,time:N,size:K,headers:F}),U(n),v(!1)}).catch(n=>{console.error("API call error:",n);const p=performance.now();L({status:0,statusText:"Failed",time:Math.round(p-r),size:"0 B",headers:{}}),k(n instanceof Error?n.message:"An error occurred during the API call"),v(!1)})}catch(r){console.error("Validation error:",r),k(r instanceof Error?r.message:"Invalid request data"),v(!1)}},qe=(a,r)=>{oe(s=>({...s,[a]:r}))},Ye=a=>{oe(r=>{const s={...r};return delete s[a],s})},te=(a,r)=>{le(s=>({...s,[a]:r}))},de=()=>{ve(!fe)},Ge=a=>{De(a);const r=z.find(s=>s.name===a);r&&r.variables.apiKey&&he(r.variables.apiKey),ve(!1)},H=a=>{if(Oe)return;Q(!0),b(s=>s.includes(a)?s.filter(m=>m!==a):[...s,a]);const r=document.querySelector(`.section-header[data-category="${a}"]`);r&&(r.classList.add("pulse-animation"),setTimeout(()=>{r.classList.remove("pulse-animation"),Q(!1)},300)),a==="employee"&&!l.includes("Employee")&&Z("getAllEmployees"),a==="salary"&&!l.includes("Salary")&&Z("getSalaryInfo"),a==="payroll"&&!l.includes("Payroll")&&Z("getPayroll")},Fe=(a,r)=>{r.target.classList.contains("try-button")||(Z(a),U(null),L(null),k(""),le({}),J(""),Q(!0),setTimeout(()=>{Q(!1)},500))},C=a=>(a=a.toLowerCase(),a==="get"?"get":a==="post"?"post":a==="put"?"put":a==="delete"?"delete":a==="patch"?"patch":""),Pe=a=>a==="objective-c"?"#import <Foundation/Foundation.h>":a==="all"?"Select a language to see code examples":a==="shell"?`curl --location --request ${t.method} '${t.url}' \\
--header 'X-SOURCE: admin' \\
--header 'X-LANG: en' \\
--header 'X-REQUEST-ID: stacktics' \\
--header 'X-DEVICE-ID: stacktics_device' \\
--header 'x-api-key: your_api_key' \\
--header 'Content-Type: application/json'${t.method!=="GET"&&t.bodyParams?` \\
--data-raw '${JSON.stringify({...Object.fromEntries(t.bodyParams.map(r=>[r.name,r.example.includes("Example: ")?r.example.replace("Example: ",""):""]))},null,2)}'`:""}`:a==="javascript"?`const options = {
  method: '${t.method}',
  headers: {
    'X-SOURCE': 'admin',
    'X-LANG': 'en',
    'X-REQUEST-ID': 'stacktics',
    'X-DEVICE-ID': 'stacktics_device',
    'x-api-key': 'your_api_key',
    'Content-Type': 'application/json'
  }${t.method!=="GET"&&t.bodyParams?`,
  body: JSON.stringify(${JSON.stringify(Object.fromEntries(t.bodyParams.map(r=>[r.name,r.example.includes("Example: ")?r.example.replace("Example: ",""):""])),null,2)})`:""}
};

fetch('${t.url}', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`:a==="python"?`import requests

url = "${t.url}"
headers = {
    "X-SOURCE": "admin",
    "X-LANG": "en",
    "X-REQUEST-ID": "stacktics",
    "X-DEVICE-ID": "stacktics_device",
    "x-api-key": "your_api_key",
    "Content-Type": "application/json"
}${t.method!=="GET"&&t.bodyParams?`

payload = ${JSON.stringify(Object.fromEntries(t.bodyParams.map(r=>[r.name,r.example.includes("Example: ")?r.example.replace("Example: ",""):""])),null,2)}`:""}

response = requests.${t.method.toLowerCase()}(url, headers=headers${t.method!=="GET"&&t.bodyParams?", json=payload":""})
data = response.json()
print(data)`:`// ${a.charAt(0).toUpperCase()+a.slice(1)} example would go here`,ke=a=>{navigator.clipboard.writeText(a).then(()=>{ge(!0),setTimeout(()=>ge(!1),2e3)}).catch(r=>{console.error("Failed to copy code: ",r)})},Ke=()=>e.jsxs("div",{className:"response-schema",children:[e.jsx("div",{className:"response-type-header",children:"application/json"}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"employee_id"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"required"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"first_name"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"last_name"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"email"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"phone_number"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"hire_date"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"job_title"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"job_id"}),e.jsx("div",{className:"field-type",children:"integer"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"department"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]}),e.jsxs("div",{className:"schema-row",children:[e.jsx("div",{className:"field-key",children:"status"}),e.jsx("div",{className:"field-type",children:"string"}),e.jsx("div",{className:"field-required",children:"optional"})]})]}),Ze=()=>{if(!T)return e.jsx("pre",{className:"response-example-empty",children:JSON.stringify(JSON.parse(t.response.example),null,2)});try{const a=JSON.parse(JSON.stringify(T));return a.rawResponse?e.jsx("pre",{className:"response-example",children:a.rawResponse}):(Object.keys(a).forEach(r=>{if(Array.isArray(a[r])&&a[r].length>0&&a[r].length>20){const s=a[r].length;a[r]=a[r].slice(0,20),a[r].push(`... ${s-20} more items (truncated for display)`)}}),e.jsx("pre",{className:"response-example",children:JSON.stringify(a,null,2)}))}catch(a){return console.error("Error formatting response:",a),e.jsx("pre",{className:"response-example",children:JSON.stringify(T,null,2)})}};o.useEffect(()=>{const a=r=>{xe.current&&!xe.current.contains(r.target)&&ye.current&&!ye.current.contains(r.target)&&Re(!1)};return document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[]),o.useEffect(()=>{const a=document.querySelector(".api-sidebar");return a&&(a.addEventListener("mousemove",r=>{const s=r;if(!document.querySelector(".custom-cursor")){const i=document.createElement("div");i.classList.add("custom-cursor"),document.body.appendChild(i)}const g=document.querySelector(".custom-cursor");g&&(g.style.left=`${s.clientX}px`,g.style.top=`${s.clientY}px`,g.style.opacity="1")}),a.addEventListener("mouseleave",()=>{const r=document.querySelector(".custom-cursor");r&&(r.style.opacity="0")})),()=>{const r=document.querySelector(".custom-cursor");r&&r.remove()}},[]);const Se=()=>{ce(!O)},Y=(a,r)=>{Fe(a,r),window.innerWidth<=768&&ce(!1)},Ve=()=>{const a=!V;Me(a),a?(document.documentElement.classList.add("dark-theme"),document.documentElement.classList.remove("light-theme")):(document.documentElement.classList.add("light-theme"),document.documentElement.classList.remove("dark-theme"))};o.useEffect(()=>{document.documentElement.classList.add("dark-theme")},[]);const q=a=>f?Object.keys(h).filter(r=>{const s=h[r];return s.breadcrumb.toLowerCase()===a.toLowerCase()&&(s.title.toLowerCase().includes(f.toLowerCase())||r.toLowerCase().includes(f.toLowerCase()))}):Object.keys(h).filter(r=>h[r].breadcrumb.toLowerCase()===a.toLowerCase()),Qe=a=>{const r=a.target.value;ue(r),r&&b(["employee","salary","payroll","insurance","leave"])},G=a=>{if(!f||f.length<2)return a;const r=new RegExp(`(${f})`,"gi");return a.replace(r,'<span class="highlight-match">$1</span>')},[we,We]=o.useState(!1),pe=()=>{We(!we)};return e.jsxs("div",{className:`api-doc-container ${O?"mobile-menu-open":""} ${V?"dark-theme":"light-theme"}`,children:[e.jsx("div",{className:"mobile-menu-toggle",onClick:Se,children:e.jsxs("div",{className:`hamburger ${O?"active":""}`,children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})}),e.jsxs("aside",{className:`api-sidebar ${O?"mobile-open":""}`,children:[e.jsxs("div",{className:"api-brand",children:[e.jsx("div",{className:"api-logo",children:e.jsx("img",{src:"/logo.svg",alt:"ai logo",width:"20",height:"20"})}),e.jsx("h3",{className:"logo-text",children:"employee-api"}),e.jsx("div",{className:"api-controls",children:e.jsx("div",{className:"theme-toggle",onClick:Ve,children:e.jsx("img",{src:V?"/moon.svg":"/sun.svg",alt:V?"light mode":"dark mode",width:"16",height:"16"})})})]}),e.jsxs("div",{className:"search-bar",children:[e.jsx("input",{type:"text",placeholder:"Search endpoints...",value:f,onChange:Qe}),f&&e.jsx("button",{className:"search-clear-button",onClick:()=>ue(""),"aria-label":"Clear search",children:"×"})]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:`section-header ${c.includes("employee")?"active":""}`,onClick:()=>H("employee"),"data-category":"employee",children:[e.jsx("span",{children:"Employee Management"}),e.jsx("span",{className:"chevron",children:"▼"})]}),e.jsxs("ul",{className:`section-links ${c.includes("employee")?"visible":"hidden"}`,children:[q("employee").map(a=>e.jsxs("li",{className:`section-link ${l===a?"active":""}`,onClick:r=>Y(a,r),"data-endpoint":a,children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:G(h[a].title)}}),e.jsx("span",{className:`method-tag ${C(h[a].method)}`,children:h[a].method})]},a)),q("employee").length===0&&f&&e.jsx("li",{className:"no-results",children:"No matching endpoints found"})]})]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:`section-header ${c.includes("salary")?"active":""}`,onClick:()=>H("salary"),"data-category":"salary",children:[e.jsx("span",{children:"Salary Management"}),e.jsx("span",{className:"chevron",children:"▼"})]}),e.jsxs("ul",{className:`section-links ${c.includes("salary")?"visible":"hidden"}`,children:[q("salary").map(a=>e.jsxs("li",{className:`section-link ${l===a?"active":""}`,onClick:r=>Y(a,r),"data-endpoint":a,children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:G(h[a].title)}}),e.jsx("span",{className:`method-tag ${C(h[a].method)}`,children:h[a].method})]},a)),q("salary").length===0&&f&&e.jsx("li",{className:"no-results",children:"No matching endpoints found"})]})]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:`section-header ${c.includes("payroll")?"active":""}`,onClick:()=>H("payroll"),"data-category":"payroll",children:[e.jsx("span",{children:"Payroll Management"}),e.jsx("span",{className:"chevron",children:"▼"})]}),e.jsxs("ul",{className:`section-links ${c.includes("payroll")?"visible":"hidden"}`,children:[q("payroll").map(a=>e.jsxs("li",{className:`section-link ${l===a?"active":""}`,onClick:r=>Y(a,r),"data-endpoint":a,children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:G(h[a].title)}}),e.jsx("span",{className:`method-tag ${C(h[a].method)}`,children:h[a].method})]},a)),q("payroll").length===0&&f&&e.jsx("li",{className:"no-results",children:"No matching endpoints found"})]})]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:`section-header ${c.includes("insurance")?"active":""}`,onClick:()=>H("insurance"),"data-category":"insurance",children:[e.jsx("span",{children:"Insurance Management"}),e.jsx("span",{className:"chevron",children:"▼"})]}),e.jsxs("ul",{className:`section-links ${c.includes("insurance")?"visible":"hidden"}`,children:[q("insurance").map(a=>e.jsxs("li",{className:`section-link ${l===a?"active":""}`,onClick:r=>Y(a,r),"data-endpoint":a,children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:G(h[a].title)}}),e.jsx("span",{className:`method-tag ${C(h[a].method)}`,children:h[a].method})]},a)),q("insurance").length===0&&f&&e.jsx("li",{className:"no-results",children:"No matching endpoints found"})]})]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:`section-header ${c.includes("leave")?"active":""}`,onClick:()=>H("leave"),"data-category":"leave",children:[e.jsx("span",{children:"Leave Management"}),e.jsx("span",{className:"chevron",children:"▼"})]}),e.jsxs("ul",{className:`section-links ${c.includes("leave")?"visible":"hidden"}`,children:[q("leave").map(a=>e.jsxs("li",{className:`section-link ${l===a?"active":""}`,onClick:r=>Y(a,r),"data-endpoint":a,children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:G(h[a].title)}}),e.jsx("span",{className:`method-tag ${C(h[a].method)}`,children:h[a].method})]},a)),q("leave").length===0&&f&&e.jsx("li",{className:"no-results",children:"No matching endpoints found"})]})]})]}),e.jsx("div",{className:`mobile-overlay ${O?"active":""}`,onClick:Se}),e.jsxs("main",{className:"api-content",children:[e.jsxs("div",{className:"api-header animate-fadeIn",children:[e.jsx("div",{className:"api-breadcrumb",children:t.breadcrumb}),e.jsxs("h1",{className:"api-title",children:[t.title," ",e.jsx("span",{className:"api-badge",children:t.badge})]})]}),e.jsxs("div",{className:"api-endpoint animate-slideIn",children:[e.jsx("div",{className:`endpoint-method ${C(t.method)}`,children:t.method}),e.jsx("div",{className:"endpoint-url",children:t.url}),e.jsx("div",{className:"endpoint-actions",children:e.jsx("button",{className:"try-api-button",onClick:()=>{v(!0),D(!0),setTimeout(Ne,10)},children:"Use API"})})]}),e.jsxs("div",{className:"api-section",children:[e.jsx("h2",{className:"section-title",children:"Request"}),t.queryParams&&t.queryParams.length>0&&e.jsxs("div",{className:"params-section",children:[e.jsx("h3",{className:"params-title",children:"Query Params"}),e.jsxs("div",{className:"params-table",children:[e.jsxs("div",{className:"params-table-header",children:[e.jsx("div",{className:"param-col name",children:"Parameter"}),e.jsx("div",{className:"param-col type",children:"Type"}),e.jsx("div",{className:"param-col required",children:"Required"})]}),t.queryParams.map((a,r)=>e.jsxs("div",{className:"params-table-row",children:[e.jsx("div",{className:"param-col name",children:e.jsx("span",{className:"param-name",children:a.name})}),e.jsx("div",{className:"param-col type",children:e.jsx("span",{className:"param-type",children:a.type})}),e.jsx("div",{className:"param-col required",children:e.jsx("span",{className:"param-required",children:a.required?"required":"optional"})}),e.jsx("div",{className:"param-example-row",children:e.jsx("div",{className:"param-example",children:a.example})})]},r))]})]}),t.headerParams&&t.headerParams.length>0&&e.jsxs("div",{className:"params-section",children:[e.jsx("h3",{className:"params-title",children:"Header Params"}),e.jsx("div",{className:"generate-code-link",children:e.jsx("span",{children:"Generate Code"})}),e.jsxs("div",{className:"params-table",children:[e.jsxs("div",{className:"params-table-header",children:[e.jsx("div",{className:"param-col name",children:"Parameter"}),e.jsx("div",{className:"param-col type",children:"Type"}),e.jsx("div",{className:"param-col required",children:"Required"})]}),t.headerParams.map((a,r)=>e.jsxs("div",{className:"params-table-row",children:[e.jsxs("div",{className:"param-col name",children:[e.jsx("span",{className:"param-name",children:a.name}),e.jsx("div",{className:"param-description",children:a.description||a.example.replace("Example: ","")})]}),e.jsx("div",{className:"param-col type",children:e.jsx("span",{className:"param-type",children:a.type})}),e.jsx("div",{className:"param-col required",children:e.jsx("span",{className:`param-required ${a.required?"yes":"no"}`,children:a.required?"required":"optional"})})]},r))]})]}),t.bodyParams&&t.bodyParams.length>0&&e.jsxs("div",{className:"params-section",children:[e.jsx("h3",{className:"params-title",children:"Body Params"}),e.jsxs("div",{className:"params-table",children:[e.jsxs("div",{className:"params-table-header",children:[e.jsx("div",{className:"param-col name",children:"Parameter"}),e.jsx("div",{className:"param-col type",children:"Type"}),e.jsx("div",{className:"param-col required",children:"Required"})]}),t.bodyParams.map((a,r)=>e.jsxs("div",{className:"params-table-row",children:[e.jsxs("div",{className:"param-col name",children:[e.jsx("span",{className:"param-name",children:a.name}),e.jsx("div",{className:"param-description",children:a.description||a.example.replace("Example: ","")})]}),e.jsx("div",{className:"param-col type",children:e.jsx("span",{className:"param-type",children:a.type})}),e.jsx("div",{className:"param-col required",children:e.jsx("span",{className:`param-required ${a.required?"yes":"no"}`,children:a.required?"required":"optional"})})]},r))]})]})]}),e.jsxs("div",{className:"api-section",children:[e.jsx("h2",{className:"section-title",children:"Request samples"}),e.jsx("div",{className:"language-tabs-container",children:e.jsxs("div",{className:"language-tabs",children:[e.jsxs("button",{className:`language-tab all-tab ${y==="all"?"active":""}`,onClick:()=>u("all"),children:[e.jsx("div",{className:"language-icon all-icon",children:"]"}),e.jsx("span",{children:"all"})]}),e.jsxs("button",{className:`language-tab javascript-tab ${y==="javascript"?"active":""}`,onClick:()=>u("javascript"),children:[e.jsx("div",{className:"language-icon js-icon",children:"JS"}),e.jsx("span",{children:"JavaScript"})]}),e.jsxs("button",{className:`language-tab java-tab ${y==="java"?"active":""}`,onClick:()=>u("java"),children:[e.jsx("div",{className:"language-icon java-icon",children:"J"}),e.jsx("span",{children:"Java"})]}),e.jsxs("button",{className:`language-tab swift-tab ${y==="swift"?"active":""}`,onClick:()=>u("swift"),children:[e.jsx("div",{className:"language-icon swift-icon",children:"S"}),e.jsx("span",{children:"Swift"})]}),e.jsxs("button",{className:`language-tab go-tab ${y==="go"?"active":""}`,onClick:()=>u("go"),children:[e.jsx("div",{className:"language-icon go-icon",children:"Go"}),e.jsx("span",{children:"Go"})]}),e.jsxs("button",{className:`language-tab php-tab ${y==="php"?"active":""}`,onClick:()=>u("php"),children:[e.jsx("div",{className:"language-icon php-icon",children:"P"}),e.jsx("span",{children:"PHP"})]}),e.jsxs("button",{className:`language-tab python-tab ${y==="python"?"active":""}`,onClick:()=>u("python"),children:[e.jsx("div",{className:"language-icon python-icon",children:"Py"}),e.jsx("span",{children:"Python"})]}),e.jsxs("button",{className:`language-tab http-tab ${y==="http"?"active":""}`,onClick:()=>u("http"),children:[e.jsx("div",{className:"language-icon http-icon",children:"{}"}),e.jsx("span",{children:"HTTP"})]}),e.jsxs("button",{className:`language-tab c-tab ${y==="c"?"active":""}`,onClick:()=>u("c"),children:[e.jsx("div",{className:"language-icon c-icon",children:"C"}),e.jsx("span",{children:"C"})]}),e.jsxs("button",{className:`language-tab csharp-tab ${y==="csharp"?"active":""}`,onClick:()=>u("csharp"),children:[e.jsx("div",{className:"language-icon csharp-icon",children:"C#"}),e.jsx("span",{children:"C#"})]}),e.jsxs("button",{className:`language-tab objective-c-tab ${y==="objective-c"?"active":""}`,onClick:()=>u("objective-c"),children:[e.jsx("div",{className:"language-icon objc-icon",children:"[C]"}),e.jsx("span",{children:"Objective-C"})]}),e.jsxs("button",{className:`language-tab ruby-tab ${y==="ruby"?"active":""}`,onClick:()=>u("ruby"),children:[e.jsx("div",{className:"language-icon ruby-icon",children:"R"}),e.jsx("span",{children:"Ruby"})]}),e.jsxs("button",{className:`language-tab ocaml-tab ${y==="ocaml"?"active":""}`,onClick:()=>u("ocaml"),children:[e.jsx("div",{className:"language-icon ocaml-icon",children:"ML"}),e.jsx("span",{children:"OCaml"})]})]})}),e.jsxs("div",{className:"code-sample",children:[e.jsx("button",{className:`copy-button ${W?"copied":""}`,onClick:()=>ke(Pe(y)),children:W?"Copied!":"Copy"}),e.jsx("pre",{className:"code-block",children:Pe(y)})]})]}),e.jsxs("div",{className:"api-section",children:[e.jsx("h2",{className:"section-title",children:"Responses"}),e.jsxs("div",{className:"response-item success",children:[e.jsxs("div",{className:"response-header",onClick:()=>_(!S),children:[e.jsxs("div",{className:"response-status",children:[e.jsx("div",{className:"status-circle success"}),e.jsx("span",{className:"status-code",children:"200"}),e.jsx("span",{className:"status-text",children:"Success"})]}),e.jsx("div",{className:"response-toggle",children:S?"▼":"▶"})]}),S&&e.jsxs("div",{className:"response-content",children:[e.jsx("div",{className:"response-type",children:"application/json"}),e.jsxs("div",{className:"response-columns",children:[e.jsx("div",{className:"response-left-column",children:Ke()}),e.jsxs("div",{className:"response-right-column",children:[e.jsx("div",{className:"example-header",children:"Example"}),Ze()]})]})]})]})]}),Ue&&e.jsx("div",{className:"try-it-modal-overlay",children:e.jsxs("div",{className:"try-it-modal",children:[e.jsxs("div",{className:"try-it-modal-header",children:[e.jsxs("div",{className:"try-it-title-section",children:[e.jsx("span",{className:`endpoint-method ${C(t.method)}`,children:t.method}),e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("h2",{children:l==="getEmployeeById"&&(x||X)?"Get Employee Data":t.title}),X&&e.jsx("span",{className:"ms-2 badge",style:{fontSize:"0.7rem",padding:"0.35em 0.65em",backgroundColor:"rgba(0, 180, 60, 0.8)",color:"white",borderRadius:"4px"},children:"API"})]})]}),e.jsxs("div",{className:"try-it-controls",children:[e.jsxs("button",{className:"environment-selector",onClick:de,children:[M," ",e.jsx("span",{className:"dropdown-arrow",children:"▼"})]}),e.jsx("button",{className:"try-it-modal-close",onClick:()=>D(!1),children:"×"})]})]}),e.jsxs("div",{className:"try-it-url-bar",children:[e.jsx("span",{className:`method-badge ${C(t.method)}`,children:t.method}),Xe?e.jsxs("div",{className:"url-input-container",children:[e.jsx("input",{type:"text",className:"url-input",value:ze,onChange:a=>J(a.target.value),onBlur:()=>re(!1),onKeyDown:a=>{a.key==="Enter"?re(!1):a.key==="Escape"&&(J(""),re(!1))},autoFocus:!0}),e.jsx("button",{className:"url-reset-button",onClick:a=>{a.preventDefault(),a.stopPropagation();const r=(()=>{let s=`${x}`;if(l.includes("Employee")?s+="/employee_data":l.includes("Salary")?s+="/salary_data":l.includes("Payroll")&&(s+="/payroll_data"),t.url.includes("{employee_id}")&&(s+=`/${d.employee_id||E}`),t.queryParams&&t.queryParams.length>0){const m=new URLSearchParams;t.queryParams.forEach(i=>{d[i.name]&&m.append(i.name,d[i.name])});const g=m.toString();g&&(s+=`?${g}`)}return s})();J(r)},title:"Reset to default URL",children:"↺"})]}):e.jsx("div",{className:"url-display",onClick:()=>{const a=X?(()=>{let r=`${x}`;if(l.includes("Employee")?r+="/employee_data":l.includes("Salary")?r+="/salary_data":l.includes("Payroll")&&(r+="/payroll_data"),t.url.includes("{employee_id}")&&(r+=`/${d.employee_id||E}`),t.queryParams&&t.queryParams.length>0){const s=new URLSearchParams;t.queryParams.forEach(g=>{d[g.name]&&s.append(g.name,d[g.name])});const m=s.toString();m&&(r+=`?${m}`)}return r})():t.url.includes("{employee_id}")?t.url.replace("{employee_id}",d.employee_id||"{employee_id}"):t.url;J(a),re(!0)},title:"Click to edit URL",children:X?(()=>{let a=`${x}`;if(l.includes("Employee")?a+="/employee_data":l.includes("Salary")?a+="/salary_data":l.includes("Payroll")&&(a+="/payroll_data"),t.url.includes("{employee_id}")&&(a+=`/${d.employee_id||E}`,!d.employee_id&&E&&setTimeout(()=>{te("employee_id",E)},0)),t.queryParams&&t.queryParams.length>0){const r=new URLSearchParams;t.queryParams.forEach(m=>{d[m.name]&&r.append(m.name,d[m.name])});const s=r.toString();s&&(a+=`?${s}`)}return a})():t.url.includes("{employee_id}")?t.url.replace("{employee_id}",d.employee_id||"{employee_id}"):t.url}),e.jsx("button",{className:`send-request-button ${A?"loading":""}`,onClick:He,disabled:A,children:A?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"button-spinner"}),e.jsx("span",{children:"Sending..."})]}):"Send"})]}),e.jsxs("div",{className:"try-it-tabs",style:{display:"none"},children:[e.jsx("button",{className:`try-it-tab ${j==="params"?"active":""}`,onClick:()=>w("params"),children:"Params"}),e.jsx("button",{className:`try-it-tab ${j==="headers"?"active":""}`,onClick:()=>w("headers"),children:"Headers"}),["POST","PUT","PATCH"].includes(t.method)&&e.jsx("button",{className:`try-it-tab ${j==="body"?"active":""}`,onClick:()=>w("body"),children:"Body"}),e.jsx("button",{className:`try-it-tab ${j==="auth"?"active":""}`,onClick:()=>w("auth"),children:"Authorization"})]}),e.jsxs("div",{className:"try-it-modal-content",children:[e.jsxs("div",{className:"api-base-url-container",children:[e.jsx("div",{className:"api-base-url-label",children:"API Base URL:"}),e.jsx("div",{className:"api-base-url-value",children:e.jsx("input",{type:"text",className:"api-base-url-input",value:x,onChange:a=>ae(a.target.value),placeholder:"Enter API base URL"})})]}),e.jsxs("div",{className:"request-tabs",children:[e.jsx("div",{className:`request-tab ${j==="params"?"active":""}`,onClick:()=>w("params"),children:e.jsx("span",{children:"Params"})}),e.jsx("div",{className:`request-tab ${j==="headers"?"active":""}`,onClick:()=>w("headers"),children:e.jsx("span",{children:"Headers"})}),["POST","PUT","PATCH"].includes(t.method)&&e.jsx("div",{className:`request-tab ${j==="body"?"active":""}`,onClick:()=>w("body"),children:e.jsx("span",{children:"Body"})}),e.jsx("div",{className:`request-tab ${j==="auth"?"active":""}`,onClick:()=>w("auth"),children:e.jsx("span",{children:"Authorization"})})]}),e.jsx("style",{children:`
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
                    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
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
                `}),j==="params"&&e.jsxs("div",{className:"request-tab-content",children:[e.jsx("div",{className:"api-config-summary",children:e.jsxs("div",{className:"api-config-row",children:[e.jsx("span",{className:"api-config-label",children:"API Base URL:"}),e.jsx("span",{className:"api-config-value",children:x||"Not configured"}),e.jsx("button",{className:"small-config-button",onClick:pe,children:"Edit"})]})}),l==="getEmployeeById"&&x&&e.jsxs("div",{className:"api-config-card",children:[e.jsxs("div",{className:"api-config-header",children:[e.jsx("h3",{children:"API Configuration"}),e.jsx("div",{className:"api-badge",children:"LIVE"})]}),e.jsxs("div",{className:"config-field-container",children:[e.jsx("label",{className:"config-field-label",children:"API Base URL"}),Be?e.jsxs("div",{className:"config-input-group",children:[e.jsx("input",{type:"text",className:"config-input",value:x,onChange:a=>ae(a.target.value),placeholder:"Enter API base URL (e.g., https://hrms-api.xpectrum-ai.com/hrms/api/v1)"}),e.jsx("button",{className:"config-edit-btn save",onClick:()=>je(!1),children:"Save"})]}):e.jsxs("div",{className:"config-input-group",children:[e.jsx("input",{type:"text",className:"config-input",value:x,disabled:!0}),e.jsx("button",{className:"config-edit-btn",onClick:()=>je(!0),children:"Edit"})]}),e.jsx("p",{className:"config-description",children:"Base URL for the API endpoint (without trailing slash)"})]}),e.jsxs("div",{className:"config-field-container",children:[e.jsx("label",{className:"config-field-label",children:"Employee ID"}),e.jsx("div",{className:"config-input-group",children:e.jsx("input",{type:"text",className:"config-input",value:E,onChange:a=>me(a.target.value),placeholder:"Enter employee ID (e.g., EM37938)"})}),e.jsx("p",{className:"config-description",children:"The unique identifier for the employee record to retrieve"})]}),e.jsx("div",{className:"config-action-container",children:e.jsxs("button",{className:"test-api-button",onClick:()=>{v(!0),setTimeout(Ne,10)},children:[e.jsx("span",{className:"test-icon",children:"⟳"}),"Test API"]})})]}),t.url.includes("{employee_id}")&&e.jsxs("div",{className:"path-params-section",children:[e.jsx("h3",{children:"Path Parameters"}),e.jsxs("div",{className:"try-it-form-group",children:[e.jsx("label",{htmlFor:"employee-id",children:"employee_id"}),e.jsx("input",{type:"text",id:"employee-id",value:l==="getEmployeeById"&&x?E:d.employee_id||"",onChange:a=>{l==="getEmployeeById"&&x&&me(a.target.value),te("employee_id",a.target.value)},placeholder:"Enter employee ID (e.g. EMP001)"}),e.jsx("div",{className:"param-description",children:l==="getEmployeeById"&&x?"Employee ID from the API (e.g. EM37938)":"Required path parameter for identifying the employee"})]})]}),t.queryParams.length>0&&e.jsxs("div",{className:"query-params-section",children:[e.jsx("h3",{children:"Query Parameters"}),t.queryParams.map((a,r)=>e.jsxs("div",{className:"try-it-form-group",children:[e.jsxs("div",{className:"param-header",children:[e.jsx("label",{htmlFor:`param-${a.name}`,children:a.name}),a.required&&e.jsx("span",{className:"required-badge",children:"required"})]}),e.jsx("input",{type:a.type==="integer"||a.type==="number"?"number":"text",id:`param-${a.name}`,value:d[a.name]||"",onChange:s=>te(a.name,s.target.value),placeholder:a.example?`Enter ${a.name} (${a.example.replace("Example: ","")})`:`Enter ${a.name}`}),e.jsx("div",{className:"param-description",children:a.description||`${a.type} - Optional query parameter`})]},r))]})]}),j==="headers"&&e.jsxs("div",{className:"try-it-section",children:[e.jsx("h3",{children:"HTTP Headers"}),e.jsx("div",{className:"param-description",children:"Headers are sent with every request to authenticate and provide additional context."}),e.jsxs("div",{className:"headers-table",children:[e.jsxs("div",{className:"headers-row header",children:[e.jsx("div",{className:"header-key",children:"Key"}),e.jsx("div",{className:"header-value",children:"Value"}),e.jsx("div",{className:"header-actions"})]}),Object.entries(ee).map(([a,r],s)=>e.jsxs("div",{className:"headers-row",children:[e.jsx("div",{className:"header-key",children:e.jsx("input",{type:"text",value:a,onChange:m=>{const g=m.target.value,i={...ee};delete i[a],i[g]=r,oe(i)},placeholder:"Header name"})}),e.jsx("div",{className:"header-value",children:e.jsx("input",{type:"text",value:r,onChange:m=>qe(a,m.target.value),placeholder:"Header value"})}),e.jsx("div",{className:"header-actions",children:e.jsx("button",{className:"remove-header-btn",onClick:()=>Ye(a),children:"Remove"})})]},s)),e.jsx("div",{className:"add-header-row",children:e.jsx("button",{className:"add-header-btn",onClick:()=>qe(`Header-${Object.keys(ee).length+1}`,""),children:"Add Header"})})]})]}),j==="body"&&["POST","PUT","PATCH"].includes(t.method)&&e.jsxs("div",{className:"try-it-section",children:[e.jsx("h3",{children:"Request Body"}),e.jsxs("div",{className:"body-type-selector",children:[e.jsx("button",{className:`body-type-btn ${R==="form"?"active":""}`,onClick:()=>_e("form"),children:"Form"}),e.jsx("button",{className:`body-type-btn ${R==="raw"?"active":""}`,onClick:()=>_e("raw"),children:"Raw"})]}),R==="form"&&e.jsxs("div",{className:"params-table",children:[e.jsxs("div",{className:"param-row header",children:[e.jsx("div",{className:"param-name",children:"Parameter"}),e.jsx("div",{className:"param-value",children:"Value"}),e.jsx("div",{className:"param-type",children:"Type"}),e.jsx("div",{className:"param-required",children:"Required"})]}),t.bodyParams&&t.bodyParams.map((a,r)=>e.jsxs("div",{className:"param-row",children:[e.jsxs("div",{className:"param-name",children:[a.name,a.required&&e.jsx("span",{className:"required-badge",children:"*"})]}),e.jsx("div",{className:"param-value",children:e.jsx("input",{type:a.type==="password"?"password":"text",className:"param-input",value:d[a.name]||"",onChange:s=>te(a.name,s.target.value),placeholder:a.example||`Enter ${a.name}`})}),e.jsx("div",{className:"param-type",children:a.type}),e.jsx("div",{className:"param-required",children:a.required?"Yes":"No"}),a.description&&e.jsxs("div",{className:"param-description",children:[e.jsx("span",{className:"info-icon",title:a.description,children:"ℹ️"}),e.jsx("div",{className:"param-description-tooltip",children:a.description})]})]},r))]}),R==="raw"&&e.jsxs("div",{className:"raw-body-editor",children:[e.jsx("textarea",{className:"raw-body-textarea",value:B,onChange:a=>be(a.target.value),placeholder:"Enter raw JSON body",spellCheck:"false"}),e.jsx("div",{className:"raw-body-format-btn",onClick:()=>{try{const a=JSON.stringify(JSON.parse(B),null,2);be(a)}catch(a){console.error("Invalid JSON:",a)}},children:"Format"})]})]}),j==="auth"&&e.jsxs("div",{className:"try-it-section",children:[e.jsx("h3",{children:"API Key Authentication"}),e.jsxs("div",{className:"try-it-form-group",children:[e.jsx("label",{htmlFor:"api-key",children:"API Key"}),e.jsx("input",{type:"text",id:"api-key",value:ne,onChange:a=>he(a.target.value),placeholder:"Enter your API key (required for all requests)"}),e.jsxs("div",{className:"auth-description",children:[e.jsx("strong",{children:"Required for all API calls."})," The API key authenticates your requests and determines your access level. Add the API key as a header with the name 'X-API-KEY'."]})]}),e.jsxs("div",{className:"environment-info",children:[e.jsxs("h4",{children:["Current Environment: ",M]}),e.jsx("div",{className:"environment-variables",children:e.jsxs("div",{className:"environment-variable",children:[e.jsx("span",{className:"env-var-name",children:"Base URL:"}),e.jsx("span",{className:"env-var-value",children:((Ce=z.find(a=>a.name===M))==null?void 0:Ce.variables.baseUrl)||""})]})}),e.jsx("button",{className:"change-environment-btn",onClick:de,children:"Change Environment"})]})]}),(T||ie||A)&&e.jsxs("div",{className:"try-it-response-section",children:[e.jsxs("div",{className:"response-header",children:[e.jsx("h3",{children:"Response"}),$&&e.jsxs("div",{className:"response-meta",children:[e.jsxs("span",{className:`status-code ${$.status>=200&&$.status<300?"success":"error"}`,children:[$.status," ",$.statusText]}),e.jsxs("span",{className:"response-time",children:[$.time," ms"]}),e.jsx("span",{className:"response-size",children:$.size})]})]}),A&&e.jsxs("div",{className:"response-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("div",{children:"Fetching response..."})]}),ie&&!A&&e.jsxs("div",{className:"response-error",children:[e.jsx("h4",{children:"Error"}),e.jsx("div",{className:"error-message",children:ie})]}),T&&!A&&e.jsxs("div",{className:"response-body",children:[e.jsxs("div",{className:"response-body-header",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{children:"Response Body"}),X&&e.jsx("span",{style:{marginLeft:"8px",fontSize:"0.7rem",padding:"0.35em 0.65em",backgroundColor:"rgba(0, 180, 60, 0.8)",color:"white",borderRadius:"4px"},children:"API Data"})]}),e.jsx("button",{className:`copy-response-btn ${W?"copied":""}`,onClick:()=>ke(JSON.stringify(T,null,2)),children:W?"Copied!":"Copy"})]}),e.jsx("pre",{className:"response-json",children:JSON.stringify(T,null,2)})]})]})]})]})}),fe&&e.jsxs("div",{className:"environment-modal",children:[e.jsx("div",{className:"environment-modal-header",children:e.jsx("h3",{children:"Select Environment"})}),e.jsx("div",{className:"environment-list",children:z.map((a,r)=>e.jsx("div",{className:`environment-item ${M===a.name?"active":""}`,onClick:()=>Ge(a.name),children:a.name},r))}),e.jsx("div",{className:"environment-modal-footer",children:e.jsx("button",{className:"close-env-modal-btn",onClick:de,children:"Close"})})]})]}),we&&e.jsx("div",{className:"api-config-modal-overlay",children:e.jsxs("div",{className:"api-config-modal",children:[e.jsxs("div",{className:"api-config-modal-header",children:[e.jsx("h3",{children:"API Configuration"}),e.jsx("button",{className:"api-config-modal-close",onClick:pe,children:"×"})]}),e.jsxs("div",{className:"api-config-modal-content",children:[e.jsxs("div",{className:"config-field-container",children:[e.jsx("label",{className:"config-field-label",children:"API Base URL"}),e.jsx("div",{className:"config-input-group",children:e.jsx("input",{type:"text",className:"config-input",value:x,onChange:a=>ae(a.target.value),placeholder:"Enter API base URL (e.g., https://hrms-api.xpectrum-ai.com/hrms/api/v1)"})}),e.jsx("p",{className:"config-description",children:"Base URL for the API endpoint (without trailing slash)"})]}),e.jsxs("div",{className:"config-field-container",children:[e.jsx("label",{className:"config-field-label",children:"Default Employee ID"}),e.jsx("div",{className:"config-input-group",children:e.jsx("input",{type:"text",className:"config-input",value:E,onChange:a=>me(a.target.value),placeholder:"Enter employee ID (e.g., EM37938)"})}),e.jsx("p",{className:"config-description",children:"The default employee ID to use for endpoints requiring one"})]})]}),e.jsx("div",{className:"api-config-modal-footer",children:e.jsx("button",{className:"save-config-button",onClick:pe,children:"Save & Close"})})]})}),e.jsx("div",{className:"custom-cursor"}),e.jsx("style",{children:`
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
        `})]})},da=()=>e.jsx("div",{children:"Error Page"});function pa(){return e.jsx(e.Fragment,{children:e.jsx(aa,{children:e.jsxs(ra,{children:[e.jsx(Ie,{path:"/",Component:ma}),e.jsx(Ie,{path:"*",Component:da})]})})})}Le(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(pa,{})}));
//# sourceMappingURL=index-DCZN_lGo.js.map
