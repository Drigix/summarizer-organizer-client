export class VerticalBarModel {
  labels?: string[];
  datasets?: VerticalBarDataModel[];

  constructor(labels?: string[], datasets?: VerticalBarDataModel[]) {
      this.labels = labels;
      this.datasets = datasets;
  }
}

export class VerticalBarDataModel {
  label?: string;
  backgroundColor?: string;
  borderColor?: string;
  data?: number[];

  constructor(label?: string, backgroundColor?: string, borderColor?: string, data?: number[]) {
      this.label = label;
      this.backgroundColor = backgroundColor;
      this.borderColor = borderColor;
      this.data = data;
  }
}
