import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  timezone: string;
  barOrder: string[];
  filename: string;
  showlegend: boolean;
}

export const defaults: PanelOptions = {
  timezone: 'Europe/Berlin',
  barOrder: [],
  filename: 'save',
  showlegend: true,
};

export interface Buffer extends Vector {
  buffer: number[];
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}
