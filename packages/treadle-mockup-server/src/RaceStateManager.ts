export interface RaceStateManagerConstructorOptions {
  energyLeft: number;
  racerDurability: number;
  racerWare: number;
  racerEfficiency: number;
  racerComfort: number;
}

export class RaceStateManager {
  private distanceTravelled: number;  // measured in (kilometre), accuracy is (up to 2 decimal places)
  private tokensEarned: number;       // measured in (units), accuracy is (up to 2 decimal places)
  private energyLeft: number;         // measured in (units), accuracy is (up to 2 decimal places)
  private racerDurability: number;    // measured in (units), accuracy is (up to 2 decimal places)
  private racerWare: number;          // measured in (durability * kilometre ^ -1), accuracy is (up to 2 decimal places)
  private racerEfficiency: number;    // measured in (tokens * kilometre ^ -1), accuracy is (up to 2 decimal places)
  private racerComfort: number;       // measured in (energy * kilometre ^ -1), accuracy is (up to 2 decimal places)

  constructor(options: RaceStateManagerConstructorOptions) {
    this.distanceTravelled = 0;
    this.energyLeft = options.energyLeft;
    this.tokensEarned = 0;
    this.racerDurability = options.racerDurability;
    this.racerWare = options.racerWare;
    this.racerEfficiency = options.racerEfficiency;
    this.racerComfort = options.racerComfort;
  }

  incrementTotalDistanceTravelled() {
    this.distanceTravelled += 1;

    this.energyLeft -= this.racerComfort;
    this.racerDurability -= this.racerWare;
    this.tokensEarned += this.racerEfficiency;

    if (this.energyLeft < 0) {
      throw new Error("NOT ENOUGH ENERGY");
    }

    if (this.racerDurability < 0) {
      throw new Error("RACER IS BROKEN");
    }
  }

  state() {
    return {
      distanceTravelled: this.distanceTravelled,
      tokensEarned: this.tokensEarned,     
      energyLeft: this.energyLeft,        
      racerDurability: this.racerDurability,  
      racerWare: this.racerWare,         
      racerEfficiency: this.racerComfort,   
      racerComfort: this.racerComfort,
    }
  }
}