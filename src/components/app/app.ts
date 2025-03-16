import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {ApiResponse} from '../app/Interfaces/interfaces';
import {NewsData, SourcesData} from './Interfaces/interfaces';


class App {
    private controller: AppController;
    private view: AppView;
    
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const newsContainer = document.querySelector<HTMLElement>('.sources');

        if (newsContainer) {
            newsContainer.addEventListener('click', (e: Event) => this.controller.getNews(
                    e, (data: NewsData) => this.view.drawNews(data))
            );

            this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
        }
    }
}

export default App;
