import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store/store';
import { Action as AuthActions } from '../actionTypes/authActionTypes';
import { Action as CustomerActions } from '../actionTypes/customerActionTypes';
import { Action as UserActions } from '../actionTypes/userActionTypes';
import { Action as ContractActions } from '../actionTypes/contractActionTypes';
import { Action as ReportDateActions } from '../actionTypes/reportDateActionType';
import { Action as ContractInfoActions } from '../actionTypes/contractInfoActionTypes';
import { Action as AddendumActions } from '../actionTypes/addendumActionTypes';

import { Action as FinancialInfoActions } from '../actionTypes/financialInfoActionTypes';
import { Action as HseActions } from '../actionTypes/hseActionTypes';
import { Action as ProgressStateActions } from '../actionTypes/progressStateActionTypes';
import { Action as TimeProgressStateActions } from '../actionTypes/timeProgressStateActionTypes';
import { Action as InvoiceActions } from '../actionTypes/invoiceActionTypes';
import { Action as FinancialInvoiceActions } from '../actionTypes/financialInvoiceActionTypes';

import { Action as WorkVolumeActions } from '../actionTypes/workVolumeActionTypes';
import { Action as PmsProgressActions } from '../actionTypes/pmsProgressActionTypes';
import { Action as BudgetCostActions } from '../actionTypes/budgetCostActionTypes';
import { Action as MachineryActions } from '../actionTypes/machineryActionTypes';
import { Action as ProjectPersonalActions } from '../actionTypes/projectPersonalActionTypes';
import { Action as ProblemActions } from '../actionTypes/problemActionTypes';
import { Action as CriticalActionActions } from '../actionTypes/criticalActionActionTypes';

import { Action as ApprovedInvoiceDoxActions } from '../actionTypes/approvedInvoiceDoxActionTypes';
import { Action as ContractorDoxActions } from '../actionTypes/contractorDoxActionTypes';
import { Action as HseReportDoxActions } from '../actionTypes/hseReportDocActionTypes';
import { Action as ProjectDoxActions } from '../actionTypes/projectDoxActionTypes';
import { Action as ProjectMonthlyDoxActions } from '../actionTypes/projectMonthlyDoxActionTypes';
import { Action as ZoneImageActions } from '../actionTypes/zoneImageActionTypes';

import { ICustomer as Customer } from '../../models/customer';
import { IUser as User } from '../../models/user';
import { IContract as Contract } from '../../models/contract';
import { IReportDate as ReportDate } from '../../models/reportDate';
import { IAddendum as Addendum } from '../../models/addendum';

import { IFinancialInfo as FinancialInfo } from '../../models/financialInfo';
import { IHse as Hse } from '../../models/hse';
import { IProgressState as ProgressState } from '../../models/progressState';
import { ITimeProgressState as TimeProgressState } from '../../models/timeProgressState';
import { IInvoice as Invoice } from '../../models/invoice';
import { IFinancialInvoice as FinancialInvoice } from '../../models/financialInvoice';
import { IWorkVolume as WorkVolume } from '../../models/workVolume';
import { IPmsProgress as PmsProgress } from '../../models/pmsProgress';
import { IBudgetCost as BudgetCost } from '../../models/budgetCost';
import { IMachinery as Machinery } from '../../models/machinery';
import { IProjectPersonal as ProjectPersonal } from '../../models/projectPersonal';
import { IProblem as Problem } from '../../models/problem';
import { ICriticalAction as CriticalAction } from '../../models/criticalAction';

import { IApprovedInvoiceDoc as ApprovedInvoiceDoc } from '../../models/approvedInvoiceDox';
import { IContractorDoc as ContractorDoc } from '../../models/contractorDox';
import { IHseReportDoc as HseReportDoc } from '../../models/hseReportDox';
import { IProjectDoc as ProjectDoc } from '../../models/projectDox';
import { IProjectMonthlyDoc as ProjectMonthlyDoc } from '../../models/projectMonthlyDox';
import { IZoneImage as ZoneImage } from '../../models/zoneImage';

// import { IGroup as Group } from '../../models/group';
// import { IPermission as Permission } from '../../models/permission';
// import { IContractType as ContractType } from '../../models/contractType';
// import { ICurrency as Currency } from '../../models/currency';

export type RootActions = 
    | AuthActions
    | UserActions
    | CustomerActions
    | ContractActions
    | ReportDateActions
    | ContractInfoActions
    | AddendumActions
    | FinancialInfoActions
    | HseActions
    | ProgressStateActions
    | TimeProgressStateActions
    | InvoiceActions
    | FinancialInvoiceActions
    | WorkVolumeActions
    | PmsProgressActions
    | BudgetCostActions
    | MachineryActions
    | ProjectPersonalActions
    | ProblemActions
    | CriticalActionActions
    | ApprovedInvoiceDoxActions
    | ContractorDoxActions
    | HseReportDoxActions
    | ProjectDoxActions
    | ProjectMonthlyDoxActions
    | ZoneImageActions
    ;

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export interface MultiRecordResponse
{
    financialInfo: FinancialInfo[],
    hse: Hse[],
    progressState: ProgressState[],
    timeProgressState: TimeProgressState[],
    invoice: Invoice[],
    financialInvoice: FinancialInvoice[],
    workVolume: WorkVolume[],
    pmsProgress: PmsProgress[],
    budgetCost: BudgetCost[],
    machinery: Machinery[],
    projectPersonal: ProjectPersonal[],
    problem: Problem[],
    criticalAction: CriticalAction[],
    addendumAction: Addendum[],

    approvedInvoiceDox: ApprovedInvoiceDoc[],
    contractorDox: ContractorDoc[],
    hseReportDox: HseReportDoc[],
    projectDox: ProjectDoc[],
    projectMonthlyDox: ProjectMonthlyDoc[],
    ZoneImage: ZoneImage[],
    
    reportDates: ReportDate[],
    contracts: Contract[],
    customers: Customer[],
    users: User[],
    success: boolean,
    message: string,
    errors: string[]
}
