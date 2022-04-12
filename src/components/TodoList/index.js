import { BaseComponent } from '@symbiotejs/symbiote';
import TodoItem from '../TodoItem';

class TodoList extends BaseComponent {
  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
    heading: 'List heading:',
    addItem: () => {
      this.ref.list_wrapper.appendChild(new TodoItem());
    },
    clearChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.clear();
        }
      });
    },
    removeChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.remove();
        }
      });
    },
  };

  initCallback() {
    // Add first item:
    this.$.addItem();
  }
}

TodoList.template = /* html */ `
    <h2>{{heading}}</h2>
    <div ref="list_wrapper"></div>
    <div class="toolbar">
    <button set="onclick: addItem">Add Item</button>
    <button set="onclick: clearChecked">Clear Checked</button>
    <button set="onclick: removeChecked">Remove Checked</button>
    </div>
`;
TodoList.reg('todo-list');

export default TodoList;
