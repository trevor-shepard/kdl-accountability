import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { KDLFormSubmitData, NatureOfTheOffense } from "./types";
import styled from "styled-components";
import "./styles/index.css";
import Loader from "react-loader-spinner";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [happen_to_you, setHappen_to_you] = useState<
    | "yes"
    | "no but i was a bystander"
    | "no I have the consent of the person who was harmed to submit this report"
    | null
  >(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [
    sexual_misconduct_or_consent_violation,
    setSexual_misconduct_or_consent_violation,
  ] = useState(false);
  const [boundary_violation, setBoundary_violation] = useState(false);
  const [
    intimidating_or_threatening_behavior,
    setIntimidating_or_threatening_behavior,
  ] = useState(false);
  const [
    damage_to_personal_or_krewe_property,
    setDamage_to_personal_or_krewe_property,
  ] = useState(false);
  const [predatory_behavior, setPredatory_behavior] = useState(false);
  const [misuse_of_position_or_authority, setMisuse_of_position_or_authority] =
    useState(false);
  const [
    theft_or_misuse_of_personal_or_krewe_property,
    setTheft_or_misuse_of_personal_or_krewe_property,
  ] = useState(false);
  const [discrimination_or_harassment, setDiscrimination_or_harassment] =
    useState(false);
  const [history_of_prior_misconduct, setHistory_of_prior_misconduct] =
    useState(false);
  const [other, setOther] = useState(false);

  const [who_are_you_reporting, setWho_are_you_reporting] = useState("");
  const [date_time_location, setDate_time_location] = useState("");
  const [bystanders, setBystanders] = useState("");
  const [narrative, setNarrative] = useState("");
  const [desired_outcome, setDesired_outcome] = useState("");
  const [background, setBackground] = useState("");
  const [council_legal_agreement, setCouncil_legal_agreement] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [follow_up, setFollow_up] = useState(false);

  const generateNatureOfOffense = () => {
    const nature_of_the_offense: NatureOfTheOffense[] = [];
    if (sexual_misconduct_or_consent_violation)
      nature_of_the_offense.push("sexual_misconduct_or_consent_violation");
    if (boundary_violation) nature_of_the_offense.push("boundary_violation");
    if (intimidating_or_threatening_behavior)
      nature_of_the_offense.push("intimidating_or_threatening_behavior");
    if (damage_to_personal_or_krewe_property)
      nature_of_the_offense.push("damage_to_personal_or_krewe_property");
    if (predatory_behavior) nature_of_the_offense.push("predatory_behavior");
    if (misuse_of_position_or_authority)
      nature_of_the_offense.push("misuse_of_position_or_authority");
    if (theft_or_misuse_of_personal_or_krewe_property)
      nature_of_the_offense.push(
        "theft_or_misuse_of_personal_or_krewe_property"
      );
    if (discrimination_or_harassment)
      nature_of_the_offense.push("discrimination_or_harassment");
    if (history_of_prior_misconduct)
      nature_of_the_offense.push("history_of_prior_misconduct");
    if (intimidating_or_threatening_behavior)
      nature_of_the_offense.push("intimidating_or_threatening_behavior");
    if (other) nature_of_the_offense.push("other");

    return nature_of_the_offense;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!happen_to_you)
        return setError("please specify who this occurred to");

      const nature_of_the_offense: NatureOfTheOffense[] =
        generateNatureOfOffense();

      if (nature_of_the_offense.length === 0)
        return setError("please select nature of the offense");

      if (!council_legal_agreement)
        return setError("please agree to the council legal agreement");

      const data: KDLFormSubmitData = {
        name,
        happen_to_you,
        email,
        phone,
        nature_of_the_offense,
        who_are_you_reporting,
        date_time_location,
        bystanders,
        narrative,
        desired_outcome,
        background,
        council_legal_agreement,
        anonymous,
        follow_up,
      };

      await axios.post(
        // @ts-ignore
        process.env.REACT_APP_SHEET_API,
        data
      );

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      setError(error as string);
      setLoading(false);
    }
  };

  if (submitted)
    return (
      <AppContainer>
        <CardContainer>
          <h1>Thank you for your submission</h1>
        </CardContainer>
      </AppContainer>
    );

  return (
    <AppContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>KDL Accountability</title>
        <link rel="canonical" href="https://kdl-accountability.vercel.app/" />
      </Helmet>
      <CardContainer>
        <h1>KDL Accountability Incident Reporting Form</h1>
        <p>
          Use this form to report an instance where you have seen or experienced
          harm or behavior that might transgress Krewe de Lune’s code of
          conduct.
        </p>
        <p>
          Please complete this form with as much detail as you feel comfortable
          sharing.
        </p>
        <p>
          ANONYMOUS REPORTS: You can submit an anonymous report if you’d prefer.
          The accountability process typically begins by communicating with the
          person who experienced or witnessed the incident. As such, anonymous
          reports normally won’t result in any further action. However,
          anonymous reports can be useful to corroborate other reports or
          demonstrate patterns of behavior. To submit an anonymous report,
          complete as much of this form as you'd like, then check the very last
          box on the form under Anonymous Reporting. When you request anonymity,
          we will respect that request by making no attempt to contact you.
        </p>
        <p>
          WHO SEES THE REPORTS? Anything submitted by this form goes directly to
          a secure file accessible only to members of the accountability
          council. The details of your report are confidential and will not be
          disclosed to anyone without your express permission. That said, it is
          possible that this report or any other communication with the
          accountability could be subpoenaed under certain circumstances.
        </p>
        <p>
          WHAT IF I'M UNCOMFORTABLE WITH SOMEONE ON THE ACCOUNTABILITY COUNCIL?
          The council acts collectively and no single member’s opinion is
          weighted more heavily than any other’s. Every member of the council
          has agreed to recuse themself from any process where their
          participation could undermine the outcome. If you don’t trust a member
          of the accountability council to participate ethically in your process, 
          please contact any other member of the council to let them know.
        </p>
        <p>
          WHAT HAPPENS AFTER MY REPORT IS SUBMITTED? An council member will
          contact you once your report is reviewed and assigned (unless you
          request no follow-up or anonymity).
        </p>
        <p>
          Please be advised that the initial assignment process may take a
          little time as we work through establishing our internal processes and
          conducting other inquiries. If there is something about your report
          that warrants additional urgency, please be sure to include that
          information.
        </p>
        <p>
          It may be helpful in expediting the process to include contact
          information for any other parties involved if available. It may also
          be helpful, if feasible, to have bystanders prepare a statement if we
          are likely to be contacting them as part of the inquiry.
        </p>
        <p>
          WHO SEES THE REPORTS? Anything submitted by this form goes directly to a secure file accessible only to members of the accountability council. The details of your report are confidential and will not be disclosed to anyone without your express permission. That said, it is possible that this report or any other communication with the accountability could be subpoenaed under certain circumstances.
        </p>
        <p>
          A step-by-step overview of the process is available here: Code of
          Conduct link
        </p>
        {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <QuestionContainer>
            <Left>
              <Left>
                <QuestionLabel htmlFor="name">Name</QuestionLabel>
              </Left>
            </Left>
            <Right>
              <QuestionInput
                id="name"
                type="text"
                width="90%"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Right>
          </QuestionContainer>
          <QuestionContainer>
            <Left>
              <QuestionLabel>Did this happen to you</QuestionLabel>
            </Left>
            <Right>
              <OptionsContainer>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={happen_to_you === "yes"}
                    name="yes"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setHappen_to_you("yes");
                      } else {
                        setHappen_to_you(null);
                      }
                    }}
                  />
                  <label htmlFor="yes">yes</label>
                </Option>
                <Option>
                  <input
                    type="checkbox"
                    name="no but i was a bystander"
                    checked={happen_to_you === "no but i was a bystander"}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setHappen_to_you("no but i was a bystander");
                      } else {
                        setHappen_to_you(null);
                      }
                    }}
                  />
                  <label htmlFor="no but i was a bystander">
                    no i was a bystander
                  </label>
                </Option>

                <Option>
                  <input
                    type="checkbox"
                    checked={
                      happen_to_you ===
                      "no I have the consent of the person who was harmed to submit this report"
                    }
                    name={
                      "no I have the consent of the person who was harmed to submit this report"
                    }
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setHappen_to_you(
                          "no I have the consent of the person who was harmed to submit this report"
                        );
                      } else {
                        setHappen_to_you(null);
                      }
                    }}
                  />
                  <label htmlFor="no I have the consent of the person who was harmed to submit this report">
                    no I have the consent of the person who was harmed to submit
                    this report
                  </label>
                </Option>
              </OptionsContainer>
            </Right>
          </QuestionContainer>
          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="email">Email</QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                id="email"
                type="text"
                width="90%"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Right>
          </QuestionContainer>
          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="phone">Phone</QuestionLabel>
            </Left>

            <Right>
              <QuestionInput
                id="phone"
                type="text"
                width="90%"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel>
                What is the nature of the offense you wish to report? *
              </QuestionLabel>
            </Left>

            <Right>
              <OptionsContainer>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={sexual_misconduct_or_consent_violation}
                    name="sexual_misconduct_or_consent_violation"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setSexual_misconduct_or_consent_violation(true);
                      } else {
                        setSexual_misconduct_or_consent_violation(false);
                      }
                    }}
                  />
                  <label htmlFor="sexual_misconduct_or_consent_violation">
                    sexual misconduct or consent violation
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={boundary_violation}
                    name="boundary_violation"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setBoundary_violation(true);
                      } else {
                        setBoundary_violation(false);
                      }
                    }}
                  />
                  <label htmlFor="boundary_violation">boundary violation</label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={intimidating_or_threatening_behavior}
                    name="intimidating_or_threatening_behavior"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setIntimidating_or_threatening_behavior(true);
                      } else {
                        setIntimidating_or_threatening_behavior(false);
                      }
                    }}
                  />
                  <label htmlFor="intimidating_or_threatening_behavior">
                    intimidating or threatening behavior
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={damage_to_personal_or_krewe_property}
                    name="damage_to_personal_or_krewe_property"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setDamage_to_personal_or_krewe_property(true);
                      } else {
                        setDamage_to_personal_or_krewe_property(false);
                      }
                    }}
                  />
                  <label htmlFor="damage_to_personal_or_krewe_property">
                    damage to personal or krewe property
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={predatory_behavior}
                    name="predatory_behavior"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setPredatory_behavior(true);
                      } else {
                        setPredatory_behavior(false);
                      }
                    }}
                  />
                  <label htmlFor="predatory_behavior">predatory behavior</label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={misuse_of_position_or_authority}
                    name="misuse_of_position_or_authority"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setMisuse_of_position_or_authority(true);
                      } else {
                        setMisuse_of_position_or_authority(false);
                      }
                    }}
                  />
                  <label htmlFor="misuse_of_position_or_authority">
                    misuse of position or authority
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={theft_or_misuse_of_personal_or_krewe_property}
                    name="theft_or_misuse_of_personal_or_krewe_property"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setTheft_or_misuse_of_personal_or_krewe_property(true);
                      } else {
                        setTheft_or_misuse_of_personal_or_krewe_property(false);
                      }
                    }}
                  />
                  <label htmlFor="theft_or_misuse_of_personal_or_krewe_property">
                    theft or misuse of personal or krewe property
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={discrimination_or_harassment}
                    name="discrimination_or_harassment"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setDiscrimination_or_harassment(true);
                      } else {
                        setDiscrimination_or_harassment(false);
                      }
                    }}
                  />
                  <label htmlFor="discrimination_or_harassment">
                    discrimination or harassment
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={history_of_prior_misconduct}
                    name="history_of_prior_misconduct"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setHistory_of_prior_misconduct(true);
                      } else {
                        setHistory_of_prior_misconduct(false);
                      }
                    }}
                  />
                  <label htmlFor="history_of_prior_misconduct">
                    history of prior misconduct
                  </label>
                </Option>
                <Option>
                  <QuestionInput
                    type="checkbox"
                    checked={other}
                    name="other"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setOther(true);
                      } else {
                        setOther(false);
                      }
                    }}
                  />
                  <label htmlFor="other">other</label>
                </Option>
              </OptionsContainer>
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="who_are_you_reporting">
                Who are you reporting
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                id="who_are_you_reporting"
                type="text"
                width="90%"
                value={who_are_you_reporting}
                onChange={(e) => setWho_are_you_reporting(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="date_time_location">
                Date time location
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                id="date_time_location"
                type="text"
                width="90%"
                value={date_time_location}
                onChange={(e) => setDate_time_location(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="Bystanders">Bystanders</QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                id="bystanders"
                type="text"
                width="90%"
                value={bystanders}
                onChange={(e) => setBystanders(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="narrative">Narrative</QuestionLabel>
            </Left>
            <Right>
              <QuestionTextArea
                id="narrative"
                height="200px"
                width="90%"
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="desired_outcome">
                Desired outcome
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                id="desired_outcome"
                type="text"
                width="90%"
                value={desired_outcome}
                onChange={(e) => setDesired_outcome(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="background">Background</QuestionLabel>
            </Left>
            <Right>
              <QuestionTextArea
                id="background"
                width="90%"
                height="200px"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </Right>
          </QuestionContainer>

          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="council_legal_agreement">
                The accountability council will not pursue legal action, however if you or someone
                else pursues legal action regarding this incident, it is
                possible that communication with the accountability council (including this report)
                could be subpoenaed under certain circumstances.
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                type="checkbox"
                checked={council_legal_agreement}
                name="council_legal_agreement"
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setCouncil_legal_agreement(true);
                  } else {
                    setCouncil_legal_agreement(false);
                  }
                }}
              />
            </Right>
          </QuestionContainer>
          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="anonymous">
                Do you wish to remain anonymous?
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                type="checkbox"
                checked={anonymous}
                name="anonymous"
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setAnonymous(true);
                  } else {
                    setAnonymous(false);
                  }
                }}
              />
            </Right>
          </QuestionContainer>
          <QuestionContainer>
            <Left>
              <QuestionLabel htmlFor="follow_up">
                Do you wish to be followed up with?
              </QuestionLabel>
            </Left>
            <Right>
              <QuestionInput
                type="checkbox"
                checked={follow_up}
                name="follow_up"
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setFollow_up(true);
                  } else {
                    setFollow_up(false);
                  }
                }}
              />
            </Right>
          </QuestionContainer>

          {loading ? (
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          ) : (
            <button type="submit">Submit</button>
          )}
        </Form>
      </CardContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const CardContainer = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 20px;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 2%;
  box-sizing: border-box;
  background-color: #C4C4CE;
  border: 1px solid transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ErrorMessage = styled.div`
  font-weight: bold;
  color: red;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
`;
const QuestionLabel = styled.label``;

const QuestionInput = styled.input<{ height?: string; width?: string }>`
  height: ${({ height }) => (height ? height : "auto")};
  width: ${({ width }) => (width ? width : "auto")};
  padding: 2px;
`;
const QuestionTextArea = styled.textarea<{ height?: string; width?: string }>`
  height: ${({ height }) => (height ? height : "auto")};
  width: ${({ width }) => (width ? width : "auto")};
  padding: 2px;
`;
const OptionsContainer = styled.div``;
const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const Right = styled.div`
  width: 50%;
  padding-left: 5%;
`;
const Left = styled.div`
  width: 50%;
`;

export default App;
