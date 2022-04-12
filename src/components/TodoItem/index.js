import { BaseComponent } from '@symbiotejs/symbiote';

class TodoItem extends BaseComponent {
  init$ = {
    text: '',
    remove: () => {
      this.remove();
    },
  };

  get checked() {
    return this.ref.checkbox.checked;
  }

  clear = () => {
    this.$.text = '';
  };

  initCallback() {
    this.ref.edit.focus();
  }
}

TodoItem.template = /* html */ `
    <input ref="checkbox" type="checkbox">
    <div ref="edit" contenteditable="true" set="textContent: text"></div>
    <button set="onclick: remove">Remove Item</button>
  `;
TodoItem.reg('todo-item');

export default TodoItem;
