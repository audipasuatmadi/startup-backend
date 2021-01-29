export interface RegisterRequestBody {
  name: string;
  username: string;
  password: string;
}

export interface ImproperInputResponse {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export interface RegisterValidationFailed {
  isImproperInput: boolean;
  improperInputDetails: ImproperInputResponse;
}
