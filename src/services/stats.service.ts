import { TsFolder } from '../models/ts-folder.model';
import { TsFolderStats } from '../models/ts-folder-stats.interface';
import { TsFile } from '../models/ts-file.model';
import { TsFileStats } from '../models/ts-file-stats.interface';

export abstract class StatsService {

    protected abstract _stats: TsFolderStats | TsFileStats = undefined;
    protected abstract calculateStats(fileOrFolder: TsFile | TsFolder): void;


    getStats(fileOrFolder: TsFile): TsFileStats;
    getStats(fileOrFolder: TsFolder): TsFolderStats;
    getStats(fileOrFolder: any): TsFolderStats | TsFileStats {
        if (this._stats) {
            return this._stats
        } else {
            this._stats = this.isFolder(fileOrFolder) ? new TsFolderStats() : new TsFileStats();
            this.calculateStats(fileOrFolder);
            this._stats.addPercentages();
            this._stats.cumulateComplexities();
            this.sortBarCharts();
            return this._stats;
        }
    }


    sortBarCharts() {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    }


    isFolder(fileOrFolder: TsFile | TsFolder): boolean {
        return !!fileOrFolder?.['tsFolderService'];
    }
}
