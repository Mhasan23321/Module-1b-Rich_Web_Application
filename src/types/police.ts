export interface PoliceForce {
  id: string;
  name: string;
}

export interface PoliceForceDetails extends PoliceForce {
  telephone: string;
  url: string;
  description: string | null;
  engagement_methods: Array<{
    url: string;
    type: string;
    description: string | null;
    title: string;
  }>;
}

export interface SeniorOfficer {
  bio: string | null;
  name: string;
  rank: string;
}

export interface CrimeCategory {
  url: string;
  name: string;
}

export interface CrimeStreetIncident {
  category: string;
  location_type: string;
  location: {
    latitude: string;
    longitude: string;
    street: {
      id: number;
      name: string;
    };
  };
  context: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
}

export interface StopAndSearchIncident {
  type: string;
  involved_person: boolean;
  datetime: string;
  operation: boolean | null;
  operation_name: string | null;
  location: {
    latitude: string;
    longitude: string;
    street: {
      id: number;
      name: string;
    };
  } | null;
  gender: string | null;
  age_range: string | null;
  self_defined_ethnicity: string | null;
  officer_defined_ethnicity: string | null;
  legislation: string | null;
  object_of_search: string | null;
  outcome: string | null;
  outcome_linked_to_object_of_search: boolean | null;
  removal_of_more_than_outer_clothing: boolean | null;
}
