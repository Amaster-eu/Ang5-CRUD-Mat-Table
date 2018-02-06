export interface GithubApi {
  items: GithubModel[];
  total_count: number;
}

export class GithubModel {
  id: number;
  name: string;
  owner: {
    avatar_url?: string;
  };
  html_url: string;
  description: string;
  language: string;
  created_at: string;

  constructor(params: any) {
    const model = params || {};
    this.id = model.id || 0;
    this.name = model.login || '';
    this.owner = model.user || {
      avatar_url: 'https://s18.postimg.org/8e6cashe1/no-image.jpg'
    };
    this.html_url = model.html_url || '';
    this.description = model.description || '';
    this.language = model.state || '';
    this.created_at = model.created_at || '';
  }
}
