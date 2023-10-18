import { combineReducers } from 'redux';

import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './authReducer';

import { UserReducer, IUsersState as UserState } from './userReducer';
import { CustomerReducer, ICustomersState as CustomersState } from './customerReducer';
import { ContractReducer, IContractsState as ContractsState } from './contractReducer';
import { ReportDateReducer, IReportDatesState as ReportDatesState } from './reportDateReducer';
import { ContractInfoReducer, IContractInfoState as ContractInfoState } from './contractInfoReducer'
import { ContractConsultantReducer, IContractConsultantsState as ContractConsultantsState } from './contractConsultantReducer'
import { ContractCorporationReducer, IContractCorporationsState as ContractCorporationsState } from './contractCorporationReducer'
import { AddendumReducer, IAddendumsState as AddendumsState } from './addendumReducer'

import { FinancialInfoReducer, IFinancialInfoState as FinancialInfoState } from './financialInfoReducer'
import { HseReducer, IHseState as HseState } from './hseReducer'
import { TimeProgressStateReducer, ITimeProgressStatesState as TimeProgressStatesState } from './timeProgressStateReducer'
import { ProgressStateReducer, IProgressStatesState as ProgressStatesState } from './progressStateReducer'
import { InvoiceReducer, IInvoicesState as InvoicesState } from './invoiceReducer'
import { FinancialInvoiceReducer, IFinancialInvoicesState as FinancialInvoicesState } from './financialInvoiceReducer'
import { WorkVolumeReducer, IWorkVolumesState as WorkVolumesState } from './workVolumeReducer'
import { PmsProgressReducer, IPmsProgressesState as PmsProgressesState } from './pmsProgressReducer'
import { BudgetCostReducer, IBudgetCostsState as BudgetCostsState } from './budgetCostReducer'
import { MachineryReducer, IMachineriesState as MachineriesState } from './machineryReducer'
import { ProjectPersonalReducer, IProjectPersonalsState as ProjectPersonalsState } from './projectPersonalReducer'
import { ProblemReducer, IProblemsState as ProblemsState } from './problemReducer'
import { CriticalActionReducer, ICriticalActionsState as CriticalActionsState } from './criticalActionReducer'

import { ApprovedInvoiceDoxReducer, IApprovedInvoiceDoxState as ApprovedInvoiceDoxState } from './approvedInvoiceDoxReducer'
import { ContractorDoxReducer, IContractorDoxState as ContractorDoxState } from './contractorDoxReducer'
import { HseReportDoxReducer, IHseReportDoxState as HseReportDoxState } from './hseReportDocReducer'
import { ProjectDoxReducer, IProjectDoxState as ProjectDoxState } from './projectDoxReducer'
import { ProjectMonthlyDoxReducer, IProjectMonthlyDoxState as ProjectMonthlyDoxState } from './projectMonthlyDoxReducer'
import { ZoneImageReducer, IZoneImageState as ZoneImageState } from './zoneImageReducer'

interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;

    readonly users: UserState;
    readonly customers: CustomersState;
    readonly contracts: ContractsState;
    readonly reportDates: ReportDatesState;
    readonly contractInfo: ContractInfoState;
    readonly contractConsultants: ContractConsultantsState;
    readonly contractCorporations: ContractCorporationsState;
    readonly addendums: AddendumsState;

    readonly financialInfo: FinancialInfoState;
    readonly hse: HseState;
    readonly progressStates: ProgressStatesState;
    readonly timeProgressStates: TimeProgressStatesState;
    readonly invoices: InvoicesState;
    readonly financialInvoices: FinancialInvoicesState;
    readonly workVolumes: WorkVolumesState;
    readonly pmsProgresses: PmsProgressesState;
    readonly budgetCosts: BudgetCostsState;
    readonly machineries: MachineriesState;
    readonly projectPersonals: ProjectPersonalsState;
    readonly problems: ProblemsState;
    readonly criticalActions: CriticalActionsState;

    readonly approvedInvoiceDox: ApprovedInvoiceDoxState;
    readonly contractorDox: ContractorDoxState;
    readonly hseReportDox: HseReportDoxState;
    readonly projectDox: ProjectDoxState;
    readonly projectMonthlyDox: ProjectMonthlyDoxState;
    readonly zoneImages: ZoneImageState;
}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,

    users: UserReducer,
    customers: CustomerReducer,
    contracts: ContractReducer,
    reportDates: ReportDateReducer,
    contractInfo: ContractInfoReducer,
    contractConsultants: ContractConsultantReducer,
    contractCorporations: ContractCorporationReducer,
    addendums: AddendumReducer,

    financialInfo: FinancialInfoReducer,
    hse: HseReducer,
    progressStates: ProgressStateReducer,
    timeProgressStates: TimeProgressStateReducer,
    invoices: InvoiceReducer,
    financialInvoices: FinancialInvoiceReducer,
    workVolumes: WorkVolumeReducer,
    pmsProgresses: PmsProgressReducer,
    budgetCosts: BudgetCostReducer,
    machineries: MachineryReducer,
    projectPersonals: ProjectPersonalReducer,
    problems: ProblemReducer,
    criticalActions: CriticalActionReducer,

    approvedInvoiceDox: ApprovedInvoiceDoxReducer,
    contractorDox: ContractorDoxReducer,
    hseReportDox: HseReportDoxReducer,
    projectDox: ProjectDoxReducer,
    projectMonthlyDox: ProjectMonthlyDoxReducer,
    zoneImages: ZoneImageReducer,
});

export default rootReducer;


