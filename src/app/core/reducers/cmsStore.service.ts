import { Injectable } from '@angular/core';
import { CmsStore, CoreCurrencyModel, CoreModuleModel, CoreSiteModel, ErrorExceptionResult, InfoEnumModel } from 'ntk-cms-api';
import { ConnectionStatusModel } from '../models/connectionStatusModel';
import { ProcessInfoModel } from '../models/progressSpinnerModel';
import { ReducerCmsStore } from './reducer.factory';
const initialState: ReducerCmsStore = {
    CoreSiteResultStore: new ErrorExceptionResult<CoreSiteModel>(),
    CoreModuleResultStore: new ErrorExceptionResult<CoreModuleModel>(),
    EnumRecordStatusResultStore: new ErrorExceptionResult<InfoEnumModel>(),
    CurrencyResultStore: new ErrorExceptionResult<CoreCurrencyModel>(),
    processInfo: new Map<string, ProcessInfoModel>(),
    connectionStatus: new ConnectionStatusModel()
};
@Injectable({
    providedIn: 'root',
})
export class CmsStoreService extends CmsStore<ReducerCmsStore> {
    constructor() {
        super(initialState)
    }
}
