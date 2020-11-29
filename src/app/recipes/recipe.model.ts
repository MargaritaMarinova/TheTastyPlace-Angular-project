export class Recipe {
  public name: string;
  public imageUrl: string;
  public description: string;
  public category: string;
  public id?: string;

  constructor(name: string, image: string, desc: string, category: string) {
    this.name = name;
    this.imageUrl = image;
    this.description = desc;    
    this.category = category;
    
    
  }
}
