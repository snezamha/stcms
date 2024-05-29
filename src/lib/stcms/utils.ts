export class FreePlanLimitError extends Error {
  constructor(message = 'Upgrade your plan!') {
    super(message);
  }
}
