export default class SelectComponent {
    constructor(options, type) {
        this.type = type;
        this.options = options;
        const element = this.addType('select-component');
        this.printArea = document.getElementById(element);
        this.dropdown();
    }

    dropdown = () => {
        const component = document.createElement('div');

        const input = this.createInput();
        const dropdown = this.showDropdown();

        component.appendChild(input);
        component.appendChild(dropdown);
        this.printArea.appendChild(component);
    };

    dropdownIcon = () => {
        const dropdown = document.createElement('img');
        dropdown.src = `/images/dropdown.png`;
        dropdown.classList.add('select-arrow');
        return dropdown;
    };

    createInput = () => {
        const input = document.createElement('div');
        input.classList = this.addType('select-input');
        input.addEventListener('click', this.toggleDropdown);

        const inputPlaceholder = document.createElement('div');

        const placeholder = document.createElement('p');
        placeholder.textContent = this.options[0]?.name || 'Select an option';
        placeholder.classList.add(this.addType('select-input__placeholder'));

        inputPlaceholder.appendChild(placeholder);
        inputPlaceholder.appendChild(this.dropdownIcon());
        input.appendChild(inputPlaceholder);

        return input;
    };

    showDropdown = () => {
        const structure = document.createElement('div');
        structure.classList.add(this.addType('structure'), 'hide');

        this.options.forEach(user => {
            const { id, name, price, perTime } = user;
            const option = document.createElement('div');
            option.addEventListener('click', () => this.selectOption(name));
            option.setAttribute('id', id);

            const valueTitle = document.createElement('h5');
            valueTitle.textContent = name;

            const priceValue = document.createElement('p');
            const spanPrice = document.createElement('span');
            spanPrice.textContent = `${price}`;
            const perTimeSpan = document.createElement('span');
            perTimeSpan.textContent = `${perTime}`;
            perTimeSpan.classList.add('per-time');
            priceValue.appendChild(spanPrice);
            priceValue.appendChild(perTimeSpan);

            option.appendChild(valueTitle);
            option.appendChild(priceValue);
            structure.appendChild(option);
        });
        return structure;
    };

    toggleDropdown = () => {
        const dropdown = document.querySelector(this.addType('structure', true));
        dropdown.classList.toggle('hide');

        const input = document.querySelector(this.addType('select-input', true));
        input.classList.toggle(this.addType('select-input__active'));
    };

    selectOption = name => {
        const text = document.querySelector(this.addType('select-input__placeholder', true));
        text.textContent = name;
        this.toggleDropdown();
    };

    addType = (text, withInitialDot) => {
        if (withInitialDot) {
            return '.' + this.type + '-' + text;
        } else {
            return this.type + '-' + text;
        }
    };
}
