export interface MovieCredit {
  id: number;
  cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      origianal_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
  }[];
  crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      origianal_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      order: number;
  }[];
}