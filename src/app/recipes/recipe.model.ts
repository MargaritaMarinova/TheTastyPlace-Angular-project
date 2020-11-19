export class Recipe {
  public name: string;
  public description: string;
  public imageUrl: string;
  public category: string;

  constructor(name: string, desc: string, image: string, category: string) {
    this.name = name;
    this.description = desc;
    this.imageUrl = image;
    this.category = category;
  }
}
