/* name: sel-el 
This is a custom HTML component (a web component) that will allow for dynamic addition of options in the select list. 
Usage: <select is="sel-el" name="yourown" id="yourown" class="your class names" ></select> 
Or if used in a Razor view, you can even add data using the asp-items attribute, like this:
Usage: <select is="sel-el" name="yourown" id="yourown" class="your class names" asp-items="someobject"></select> 

no copyrights
Courtesy of Finansdrift AS, Oslo, Norway
*/
class selel extends HTMLSelectElement {
static formAssociated = true;
    constructor() {
    super();
    let codeCustom; 
    let codeCustomCreated = false; 
    this.addEventListener('keydown', function(ev1) {
    if (ev1.key === 'ArrowUp' || ev1.key === 'ArrowDown' || ev1.key === 'Alt' || ev1.key === 'Tab' || ev1.key === 'Escape') {
        ev1.stopPropagation(); 
        }
        else { 
            if (!codeCustomCreated) {
                this.style.display = 'none';
                codeCustom = document.createElement('input');
                codeCustom.id = 'CodeCustom';
                codeCustom.name = 'CodeCustom';
                codeCustom.style.border = 'none';
                codeCustom.style.backgroundColor = '#eeeeee';
                codeCustom.style.fontSize = '1rem';
                codeCustom.style.display = 'block';
                codeCustom.style.position = 'relative';
                codeCustom.value = '';
                codeCustom.placeholder = 'Enter new option or escape';
                this.insertAdjacentElement('afterend', codeCustom);
                codeCustom.focus();
                codeCustomCreated = true; 
                codeCustom.addEventListener("keydown", (ev2) => handleKeyDown(ev1, ev2,this));
                } 
        } 
    });  

    function checkIfOptionExist(selectElement, optionValue) {
        if (selectElement.options) {
            return Array.from(selectElement.options).some(option => option.value === optionValue);
        }
        return false;
    }

    const handleKeyDown = function(ev1, ev2,select) {
        if (ev2.key === 'Escape') {
            codeCustom.style.display = 'none';
            select.style.display = 'block';
            codeCustomCreated = false; 
        } else if (ev2.key === 'Enter') {
            const lokalverdi = codeCustom.value;
            select.style.display = 'block';
            ev1.stopImmediatePropagation(); 
            ev2.stopImmediatePropagation(); 
            if (!checkIfOptionExist(select, lokalverdi)) {
                addNewOption(select, lokalverdi);
            }
            codeCustom.removeEventListener("keydown", handleKeyDown);
            codeCustom.remove();
            codeCustomCreated = false;
            }
    };

        function addNewOption(obj, value) {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        option.selected = true;
        option.setAttribute('selected', 'selected');
        obj.appendChild(option);
        }

} // constructor end

    get form() { return this._internals.form; }
    get name() { return this.getAttribute('name'); }
    get type() { return this.localName; }

    render() { 
        // this.class=this.getAttribute('class')
        // this.options=this.getAttribute('options')
    }

    connectedCallback() {
        if (!this.rendered) {
        this.render();
        this.rendered = true;
        }
    }

    static get observedAttributes() { 
        return ['class','options'];
    }

    attributeChangedCallback(name, oldValue, newValue) { 
    this.render();
    }
}

customElements.define('sel-el', selel, {extends: 'select'});