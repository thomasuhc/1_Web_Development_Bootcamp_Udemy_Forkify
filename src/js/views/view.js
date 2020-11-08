import { Array } from 'core-js';
import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data) {

        if(!data || (Array.isArray(data) && data.length == 0 )) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data) {

      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);

      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll("*"));
   

      newElements.forEach((newEl, i) => {
        const curlEl = curElements[i];
        //console.log(curlEl, newEl.isEqualNode(curlEl));

        if(!newEl.isEqualNode(curlEl) && newEl.firstChild?.nodeValue.trim() !== "") {
          curlEl.textContent = newEl.textContent;
        }

        if(!newEl.isEqualNode(curlEl)) 
          Array.from(newEl.attributes).forEach(attr => curlEl.setAttribute(attr.name, attr.value));
        
      });
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner = function() {
        const markup = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
      };
      

      renderError (message = this._erroMessage) {
        const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
      }

      renderMessage (message = this._message) {
        const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
      }
    
}