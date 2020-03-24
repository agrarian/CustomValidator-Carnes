declare global {
  interface String {
      isNullOrEmpty: (this: string) => boolean;
  }
}


String.prototype.isNullOrEmpty = function (this: string): boolean {
  if (this === undefined || this === null || this.trim() === '') {
      return true;
  }
  return false;
};

export {};
