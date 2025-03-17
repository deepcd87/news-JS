import './sources.css';
/*global document*/
class Sources {

    draw(data: {
        id: string,
        name: string
        }[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        let currentLetter: string = '';

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (sourceName) {
                sourceName.textContent = item.name;
            }
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);

            

        });
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }

}

export default Sources;
