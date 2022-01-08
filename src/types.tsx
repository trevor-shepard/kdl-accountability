export interface KDLFormFields {
  name: string;
  happen_to_you:
    | "yes"
    | "no but i was a bystander"
    | "no I have the consent of the person who was harmed to submit this report";
  // how_would_you_like_the_council_to_contact_you:
  email: string;
  phone: string;
  nature_of_the_offense: NatureOfTheOffenseDict;
  who_are_you_reporting: string;
  date_time_location: string;
  bystanders: string;
  narrative: string;
  desired_outcome: string;
  background: string;
  council_legal_agreement: boolean;
  anonymous: boolean;
  follow_up: boolean;
}

export type NatureOfTheOffense =
  | "sexual_misconduct_or_consent_violation"
  | "boundary_violation"
  | "intimidating_or_threatening_behavior"
  | "damage_to_personal_or_krewe_property"
  | "predatory_behavior"
  | "misuse_of_position_or_authority"
  | "theft_or_misuse_of_personal_or_krewe_property"
  | "discrimination_or_harassment"
  | "history_of_prior_misconduct"
  | "other";

export type NatureOfTheOffenseDict = {
  sexual_misconduct_or_consent_violation: boolean;
  boundary_violation: boolean;
  intimidating_or_threatening_behavior: boolean;
  damage_to_personal_or_krewe_property: boolean;
  predatory_behavior: boolean;
  misuse_of_position_or_authority: boolean;
  theft_or_misuse_of_personal_or_krewe_property: boolean;
  discrimination_or_harassment: boolean;
  history_of_prior_misconduct: boolean;
  other: boolean;
};

export interface KDLFormSubmitData {
  name: string;
  happen_to_you:
    | "yes"
    | "no but i was a bystander"
    | "no I have the consent of the person who was harmed to submit this report";
  // how_would_you_like_the_council_to_contact_you:
  email: string;
  phone: string;
  nature_of_the_offense: NatureOfTheOffense[];
  who_are_you_reporting: string;
  date_time_location: string;
  bystanders: string;
  narrative: string;
  desired_outcome: string;
  background: string;
  council_legal_agreement: boolean;
  anonymous: boolean;
  follow_up: boolean;
}
