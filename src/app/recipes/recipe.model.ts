export class Recipe {
  public name: string;
  public imageUrl: string;
  public description: string;
  public ingredients: string;
  public category: string;
  public id?: string;

  constructor(name: string, image: string, desc: string, ingredients: string, category: string) {
    this.name = name;
    this.imageUrl = image;
    this.description = desc;
    this.ingredients = ingredients;
    this.category = category;
  }
}
