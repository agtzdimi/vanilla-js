export default class FeaturesComponent {
    constructor(featuresArr, type) {
        this.type = type;
        this.featuresArr = featuresArr;
        const element = this.addType('features');
        this.printArea = document.getElementById(element);
        this.features();
    }

    features = () => {
        this.featuresArr.forEach(feature => {
            const component = document.createElement('li');
            const icon = this.createIcon();
            const featureText = this.featureText(feature);

            component.appendChild(icon);
            component.appendChild(featureText);
            this.printArea.appendChild(component);
        });
    };

    createIcon = () => {
        const span = document.createElement('span');
        span.classList.add('icon-container');
        span.appendChild(this.checkImg());
        return span;
    };

    checkImg = () => {
        const img = document.createElement('img');
        img.src = `/images/check.png`;
        img.classList.add('icon');
        return img;
    };

    featureText = text => {
        const span = document.createElement('span');
        span.classList.add('list-name');
        span.innerHTML = text;
        return span;
    };

    addType = (text, withInitialDot) => {
        if (withInitialDot) {
            return '.' + this.type + '-' + text;
        } else {
            return this.type + '-' + text;
        }
    };
}
