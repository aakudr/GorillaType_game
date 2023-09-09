interface SessionStats {
  wpm: number;
  kpm: number;
  accuracy: number;
  mistakes: number;
  strokes: number;
}

export class Session {
  constructor(
    public id: number,
    public text: string,
    private startTime: number = Date.now(),
    public currentCharacter: number = 0,
    public stats: SessionStats = {
      wpm: 0,
      kpm: 0,
      accuracy: 0,
      mistakes: 0,
      strokes: 0,
    }
  ) {}

  public get currentCharacterIsLast(): boolean {
    return this.currentCharacter === this.text.length - 1;
  }

  public get sessionStats(): SessionStats {
    return this.stats;
  }

  private get sessionTimeElapsed(): number {
    return Date.now() - this.startTime;
  }

  private get minutesElapsed(): number {
    return this.sessionTimeElapsed / 60000;
  }

  private get kpm(): number {
    return Math.round(this.currentCharacter / this.minutesElapsed);
  }

  private get wordPosition(): number {
    return this.text
      .slice(0, this.currentCharacter)
      .split("")
      .reduce((acc, curr) => {
        if (curr === " ") acc++;
        return acc;
      }, 0);
  }

  private get wpm(): number {
    return Math.round(this.wordPosition / this.minutesElapsed);
  }

  public keyStroke(key: string): void {
    this.stats.strokes++;
    if (key !== this.text[this.currentCharacter]) {
      this.stats.mistakes++;
    }
    this.stats.kpm = this.kpm;
    this.stats.wpm = this.wpm;
    this.stats.accuracy = Math.round(
      (1 - this.stats.mistakes / this.stats.strokes) * 100
    );
    this.currentCharacter++;
  }
}
