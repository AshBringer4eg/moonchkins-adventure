export interface Config {
  debug: boolean
  resolution: ResolutionInnerItem
  get width(): number
  get height(): number
}

export type Resolutions = {
  HighDefinition: ResolutionInnerItem
  FullHD: ResolutionInnerItem
  QuadHD: ResolutionInnerItem
};


export type ResolutionInnerItem = {
  width: number
  height: number
};

export type Parameter = {
  name: string
  value: string | number | boolean
};