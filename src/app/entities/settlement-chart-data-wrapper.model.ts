import { DoughnutChartModel } from "./doughnut-chart.model";
import { ProfitLineChartModel } from "./profit-line-chart.model";
import { VerticalBarModel } from "./vertical-bar.model";

export class SettlementChartDataWrapperModel {
      summarizeSavingSettlements?: DoughnutChartModel;
      summarizeYearChartDataset?: VerticalBarModel;
      summarizeActionsPricesChartDataset?: VerticalBarModel;
      summarizeGoldPricesChartDataset?: VerticalBarModel;
      summarizeSilverPricesChartDataset?: VerticalBarModel;
      summarizeCryptoPricesChartDataset?: VerticalBarModel;
      profitBondsAndDepositsChartDataset?: ProfitLineChartModel;
}