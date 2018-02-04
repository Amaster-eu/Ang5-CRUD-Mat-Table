export interface GithubModelFake {
  items: GithubModel[];
  total_count: number;
}

export class GithubModel {
  id: number;
  title: string;
  user: {
    login: string;
    avatar_url?: string;
    html_url: string;
  };
  created_at: string;

  constructor(params: any) {
    const model = params || {};
    this.id = model.id || 0;
    this.title = model.login || '';
    this.user = model.user || {
      login: '',
      avatar_url: 'https://s18.postimg.org/8e6cashe1/no-image.jpg',
      html_url: ''
    };
    this.created_at = model.created_at || '';
  }
}
