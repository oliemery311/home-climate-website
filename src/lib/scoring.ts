interface LeadInput {

  budget?: string;
  timeframe?: string;
  numberOfUnits?: number;
  notes?: string;
  uploads?: number;

}


export function calculateLeadScore(
  lead: LeadInput
) {

  let score = 0;


  if (
    lead.budget === "£4,000+"
  ) {
    score += 30;
  }


  if (
    lead.timeframe === "ASAP"
  ) {
    score += 30;
  }


  if (
    lead.numberOfUnits &&
    lead.numberOfUnits > 1
  ) {
    score += 20;
  }


  if (
    lead.uploads &&
    lead.uploads > 0
  ) {
    score += 10;
  }


  if (
    lead.notes &&
    lead.notes.length > 50
  ) {
    score += 10;
  }


  let temperature = "COLD";


  if(score >= 70)
    temperature = "HOT";

  else if(score >= 40)
    temperature = "WARM";


  return {
    score,
    temperature
  };

}