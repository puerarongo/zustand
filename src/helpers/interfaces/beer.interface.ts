interface IVolume {
  value: number;
  unit: string;
}

interface IMethod {
  mash_temp: {
    temp: IVolume;
    duration: number;
  }[];
  fermentation: {
    temp: IVolume;
  };
  twist: string | null;
}

interface IMalt {
  name: string;
  amount: IVolume;
}

interface IHops {
  name: string;
  amount: IVolume;
  add: string;
  attribute: string;
}

interface IIngredients {
  malt: IMalt[];
  hops: IHops[];
  yeast: string;
}

interface IBeer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: IVolume;
  boil_volume: IVolume;
  method: IMethod;
  ingredients: IIngredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export default IBeer;
