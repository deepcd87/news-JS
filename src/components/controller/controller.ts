import AppLoader from './appLoader';
import {SourcesData, NewsData} from '../app/Interfaces/interfaces';
import {ApiResponse} from '../app/Interfaces/interfaces';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesData) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsData) => void): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        let currentTarget: HTMLElement | null = target;

        while (currentTarget && currentTarget !== newsContainer) {
            if (currentTarget.classList.contains('source__item')) {
                const sourceId = currentTarget.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            currentTarget = currentTarget.parentElement;
        }

    }
}

export default AppController;
