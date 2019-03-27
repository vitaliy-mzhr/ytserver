import { Injectable } from '@nestjs/common';

@Injectable()
export class MemStorageService {

  private readonly memStorage: object;

  constructor() {
    this.memStorage = {};
  }

  /**
   * If it does not already exist, adds value to the array for a certain sessionId
   * @param {string} sessionId
   * @param {string} value
   * @returns {boolean} - returns true, if value was added, false otherwise
   */
  public putUnique(sessionId: string, value: string): boolean {
    if (this.memStorage[sessionId] === undefined) {
      this.memStorage[sessionId] = [];
      this.memStorage[sessionId].push(value);
      return true;
    }
    const index = this.memStorage[sessionId].findIndex(item => item === value);
    if (index < 0) {
      this.memStorage[sessionId].push(value);
      return true;
    }
    return false;
  }

  /**
   * Gets all values, stored by a certain sessionId
   * @param {string} sessionId
   * @returns {string[]}
   */
  public take(sessionId: string): string[] {
    return this.memStorage[sessionId] || [];
  }

  /**
   * Removes a certain value from array for a given sessionId
   * @param {string} sessionId
   * @param {string} value - returns true if value removed, false otherwise
   */
  public remove(sessionId: string, value: string): boolean {
    if (this.memStorage[sessionId] === undefined) { return false; }
    const index = this.memStorage[sessionId].findIndex(item => item === value);
    this.memStorage[sessionId].splice(index, 1);
    return true;
  }

}
