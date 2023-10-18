// import { Dashboard } from "@mui/icons-material";
import async from "../components/utilities/Async";
import { IRoute } from "../types/RouteType";


// const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const Contract = async(() => import("../pages/baseInfo/contract/contract"));
const Customer = async(() => import("../pages/baseInfo/customer/customer"));
const ProjectManager = async(() => import("../pages/baseInfo/projectManager/projectManager"));

const SignIn = async(() => import("../pages/security/authentication/signIn"))
const ChangePassword = async(() => import("../pages/security/authentication/changePassword"))
const Page404 = async(() => import("../pages/security/authentication/Page404"))

const GeneralProjectInfo = async(() => import("../pages/projectInfo/generalProjectInfo/generalContractInfo"))
const Budget = async(() => import("../pages/projectInfo/budgetCost/budgetCost"))
const CriticalActions = async(() => import("../pages/projectInfo/criticalActions/index"))
const FinancialInfo = async(() => import("../pages/projectInfo/financialInfo/financialInfo"))
const HSE = async(() => import("../pages/projectInfo/hse/hse"))
const Invoice = async(() => import("../pages/projectInfo/invoice/invoice"))
const InvoiceFinancial = async(() => import("../pages/projectInfo/financialInvoice/financialInvoice"))
const Machinery = async(() => import("../pages/projectInfo/machinery/machinery"))
const Personal = async(() => import("../pages/projectInfo/projectPersonal/projectPersonal"))
const PMSProgress = async(() => import("../pages/projectInfo/pmsProgress/pmsProgress"))
const Problems = async(() => import("../pages/projectInfo/problems/problem"))
const ProgressState = async(() => import("../pages/projectInfo/progressState/progressState"))
const TimeProgress = async(() => import("../pages/projectInfo/timeProgressState/timeProgressState"))
const WorkVolume = async(() => import("../pages/projectInfo/workVolume/workVolume"))

const ConstructionImages = async(() => import("../pages/documents/constructionImages/constructionImages"))
const DurationDocuments = async(() => import("../pages/documents/durationDocuments/durationDocuments"))
const ProjectDocuments = async(() => import("../pages/documents/projectDocuments/projectDocuments"))
const ConstructionImagesReport = async(() => import("../pages/Reports/constructionImagesReport/constructionImagesReport"))
const ManagementReport = async(() => import("../pages/Reports/managementReports/managementReport"))
const ManagementReport_fc = async(() => import("../pages/Reports/managementReports/managementReport_fc"))
const SiteVisitReport = async(() => import("../pages/Reports/siteVisitReport/siteVisitReport"))

const Dashboard = async(() => import("../pages/baseInfo/test"))

export const routes: Array<IRoute> = [
    {
        key: 'dashboard-route',
        title: 'Dashboard',
        path: 'dashboard',
        enabled: true,
        component: Dashboard
    },
    // ------------------Base Info---------------------
    {
        key: 'contract-route',
        title: 'Contract',
        path: 'baseinfo/contract',
        enabled: true,
        component: Contract
    },
    {
        key: 'customer-route',
        title: 'Customer',
        path: 'baseinfo/customer',
        enabled: true,
        component: Customer
    },
    {
        key: 'projectManager-route',
        title: 'ProjectManager',
        path: 'baseinfo/projectManager',
        enabled: true,
        component: ProjectManager
    },
    //-------------Security Authentication-------------
    {
        key: 'changepassword-route',
        title: 'ChangePassword',
        path: 'auth/changepassword',
        enabled: true,
        component: ChangePassword
    },
    {
        key: 'page404-route',
        title: 'Page404',
        path: '*',
        enabled: true,
        component: Page404
    },    
    //-------------Project Information-------------
    {
        key: 'generalProjectInfo-route',
        title: 'General Project Information',
        path: '/',
        enabled: true,
        component: GeneralProjectInfo
    },
    {
        key: 'budget-route',
        title: 'Budget',
        path: 'project/budget',
        enabled: true,
        component: Budget
    },
    {
        key: 'financialInfo-route',
        title: 'FinancialInfo',
        path: 'project/financialInfo',
        enabled: true,
        component: FinancialInfo
    },
    {
        key: 'hse-route',
        title: 'HSE',
        path: 'project/hse',
        enabled: true,
        component: HSE
    },
    {
        key: 'criticalActions-route',
        title: 'CriticalActions',
        path: 'project/criticalActions',
        enabled: true,
        component: CriticalActions
    },
    {
        key: 'problems-route',
        title: 'Problems',
        path: 'project/problems',
        enabled: true,
        component: Problems
    },
    {
        key: 'invoice-route',
        title: 'Invoice',
        path: 'project/invoice',
        enabled: true,
        component: Invoice
    },
    {
        key: 'invoiceFinancial-route',
        title: 'InvoiceFinancial',
        path: 'project/invoiceFinancial',
        enabled: true,
        component: InvoiceFinancial
    },
    {
        key: 'pmsProgress-route',
        title: 'PmsProgress',
        path: 'project/pmsProgress',
        enabled: true,
        component: PMSProgress
    },
    {
        key: 'progressState-route',
        title: 'ProgressState',
        path: 'project/progressState',
        enabled: true,
        component: ProgressState
    },
    {
        key: 'timeProgress-route',
        title: 'TimeProgress',
        path: 'project/timeProgress',
        enabled: true,
        component: TimeProgress
    },
    {
        key: 'personal-route',
        title: 'Personal',
        path: 'project/personal',
        enabled: true,
        component: Personal
    },
    {
        key: 'machinery-route',
        title: 'Machinery',
        path: 'project/machinery',
        enabled: true,
        component: Machinery
    },
    {
        key: 'workVolume-route',
        title: 'WorkVolume',
        path: 'project/workVolume',
        enabled: true,
        component: WorkVolume
    },
    //---------------Documents-----------------
    {
        key: 'constructionImages-route',
        title: 'ConstructionImages',
        path: 'documents/constructionImages',
        enabled: true,
        component: ConstructionImages
    },
    {
        key: 'durationDocuments-route',
        title: 'DurationDocuments',
        path: 'documents/durationDocuments',
        enabled: true,
        component: DurationDocuments
    },
    {
        key: 'projectDocuments-route',
        title: 'ProjectDocuments',
        path: 'documents/projectDocuments',
        enabled: true,
        component: ProjectDocuments
    },
    //----------------Reports------------------
    {
        key: 'constructionImagesReport-route',
        title: 'ConstructionImagesReport',
        path: 'report/constructionImagesReport',
        enabled: true,
        component: ConstructionImagesReport
    },
    {
        key: 'managementReport-route',
        title: 'ManagementReport',
        path: 'report/managementReport',
        enabled: true,
        component: ManagementReport
    },
    {
        key: 'managementReport_fc-route',
        title: 'ManagementReport_fc',
        path: 'report/managementReport_fc',
        enabled: true,
        component: ManagementReport_fc
    },
    {
        key: 'siteVisitReport-route',
        title: 'SiteVisitReport',
        path: 'report/siteVisitReport',
        enabled: true,
        component: SiteVisitReport
    },
]

export const authRoutes: Array<IRoute> = [
    //-------------Security Authentication-------------
    {
         key: 'signin-route',
         title: 'SignIn',
         path: '/auth/sign-in',
         enabled: true,
         component: SignIn
     },
    //  {
    //      key: 'page404-route',
    //      title: 'Page404',
    //      path: '*',
    //      enabled: true,
    //      component: Page404
    //  },    
 ]