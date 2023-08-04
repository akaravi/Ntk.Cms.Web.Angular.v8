import { CoreCurrencyModel, CoreModuleModel, CoreSiteModel, ErrorExceptionResult, InfoEnumModel } from 'ntk-cms-api';
import { ProcessInfoModel } from '../models/progressSpinnerModel';

export interface ReducerCmsStore {
  CoreSiteResultStore: ErrorExceptionResult<CoreSiteModel>;
  CoreModuleResultStore: ErrorExceptionResult<CoreModuleModel>;
  EnumRecordStatusResultStore: ErrorExceptionResult<InfoEnumModel>;
  CurrencyResultStore: ErrorExceptionResult<CoreCurrencyModel>;
  processInfo: Map<string, ProcessInfoModel>;
}
